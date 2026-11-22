// Records the demo while typing the phrases. Usage: node scripts/demo-video.mjs <outDir> [baseUrl]
// Start the demo on a spare port first: pnpm exec vite --port 5301
import { chromium } from "playwright";
import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import { findTheme, themeVars } from "../themes.ts";

const out = process.argv[2] ?? "video";
const base = process.argv[3] ?? "http://localhost:5301";
await mkdir(out, { recursive: true });

// "~" before a character types the next character wrong, pauses, then backspaces and fixes it.
const phrases = [
  "oct 2 to oct 5",
  "next mon 9am to 5pm",
  "9am tokyo time fri",
  "half past nine the day after tomorrow",
  "last fri of the month",
  "MWTh @ noon",
  "tmrw 1-2",
  "every wkday at 9",
  "tomorrow 3pm est",
  "four score and seven years ago",
  "next pi day",
  "may the fourth be with you",
];

// Each phrase gets the next demo theme, alternating light and dark.
const LOOKS = ["paper", "dracula", "latte", "nord", "solarized-light", "mocha", "github-light", "tokyo-night", "rose-dawn", "gruvbox-dark", "everforest-light", "rose-pine"];
// The demo derives every page and picker color from the --t-* inputs, so registering and fading those fades everything.
const FADE = "0.7s";
const INPUTS = ["page", "card", "fg", "accent", "on-accent"];
const FADE_CSS = `${INPUTS.map((t) => `@property --t-${t} { syntax: "<color>"; inherits: true; initial-value: #888 }`).join("\n")}
.demo { transition: ${INPUTS.map((t) => `--t-${t} ${FADE} ease`).join(", ")} !important }`;

async function applyLook(page, i) {
  const t = findTheme(LOOKS[i % LOOKS.length]);
  const vars = themeVars(t);
  await page.evaluate(`(() => {
    const main = document.querySelector("main.demo");
    main.setAttribute("data-theme", ${JSON.stringify(t.mode)});
    document.querySelector(".td-root").setAttribute("data-theme", ${JSON.stringify(t.mode)});
    for (const [k, v] of Object.entries(${JSON.stringify(vars)})) main.style.setProperty(k, v);
    return 0;
  })()`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);

async function type(page, text) {
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "~") {
      const next = text[++i];
      await page.keyboard.type(next === "i" ? "o" : "x");
      await sleep(rnd(350, 550));
      await page.keyboard.press("Backspace");
      await sleep(rnd(120, 220));
      await page.keyboard.type(next);
    } else {
      await page.keyboard.type(c);
    }
    // Slower at word boundaries, quicker inside words.
    await sleep(c === " " ? rnd(140, 260) : rnd(55, 140));
  }
}

const browser = await chromium.launch();
const PAD = 32;
// Frame page: only the picker, top-aligned, with the same padding on every side.
const CSS = `.demo-try, .demo-note, .demo-gear, .demo-brand, .demo-confirmed { display: none !important }
.demo { padding: ${PAD}px !important; justify-content: flex-start !important; align-items: center !important }`;
const url = (q = "") => `${base}/?theme=light&ws=0${q ? `&q=${encodeURIComponent(q)}` : ""}`;

// Probe: size of the largest card across the phrases, so the frame fits all of them.
const probe = await browser.newPage({ viewport: { width: 900, height: 1000 } });
let w = 0;
let h = 0;
for (const p of phrases) {
  await probe.goto(url(p.replace("~", "")), { waitUntil: "domcontentloaded" });
  await probe.addStyleTag({ content: CSS });
  await sleep(1200);
  const box = await probe.locator(".td-card").first().boundingBox();
  w = Math.max(w, box.width);
  h = Math.max(h, box.height);
}
await probe.close();
const size = { width: Math.round(w + 2 * PAD), height: Math.round(h + 2 * PAD) };
console.log("frame", size);

// Frames are lossless PNG screenshots at device pixels (2x), taken in a loop (about 30 fps) while typing.
// Playwright's recordVideo and the CDP screencast both give CSS-pixel frames, and recordVideo adds
// low-bitrate VP8, which made the README GIF blurry.
const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(url(), { waitUntil: "networkidle" });
await page.addStyleTag({ content: CSS });
await page.addStyleTag({ content: FADE_CSS });
await page.evaluate("document.fonts.ready.then(() => 0)");
await page.getByRole("textbox", { name: "Date and time" }).click();
await page.evaluate("window.scrollTo(0, 0)");
await sleep(1000);

const framesDir = `${out}/frames`;
await mkdir(framesDir, { recursive: true });
for (const f of await readdir(framesDir)) if (f.endsWith(".png")) await unlink(`${framesDir}/${f}`);
const frames = []; // [file, seconds since start]; a frame equal to the previous one is skipped
const writes = [];
const cdp = await ctx.newCDPSession(page);
let capturing = true;
const t0 = Date.now();
const capture = (async () => {
  let prev = "";
  while (capturing) {
    const t = (Date.now() - t0) / 1000;
    const { data } = await cdp.send("Page.captureScreenshot", { format: "png", optimizeForSpeed: true, clip: { x: 0, y: 0, ...size, scale: 2 } });
    if (data === prev) continue;
    prev = data;
    const file = `${String(frames.length).padStart(5, "0")}.png`;
    frames.push([file, t]);
    writes.push(writeFile(`${framesDir}/${file}`, Buffer.from(data, "base64")));
  }
})();
await applyLook(page, 0);
for (const [i, p] of phrases.entries()) {
  await type(page, p);
  await sleep(1800);
  console.log("scrollY", await page.evaluate("window.scrollY"), p);
  // Reset and the next look change together, so the clear and the 0.7 s fade overlap.
  await page.keyboard.press("Escape");
  if (i + 1 < phrases.length) await applyLook(page, i + 1);
  await sleep(750);
}
await sleep(500);
capturing = false;
await capture;
await Promise.all(writes);
// ffconcat list: each frame lasts until the next one.
const end = frames[frames.length - 1][1] + 1;
const lines = ["ffconcat version 1.0"];
frames.forEach(([file, t], i) => lines.push(`file frames/${file}`, `duration ${((frames[i + 1]?.[1] ?? end) - t).toFixed(4)}`));
lines.push(`file frames/${frames[frames.length - 1][0]}`);
await writeFile(`${out}/demo.ffconcat`, lines.join("\n") + "\n");
await browser.close();
console.log(`${out}/demo.ffconcat`, frames.length, "frames");
