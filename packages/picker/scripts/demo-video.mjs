// Records the demo while typing five phrases. Usage: node scripts/demo-video.mjs <outDir> [baseUrl]
// Start the demo on a spare port first: pnpm exec vite --config demo/vite.config.ts --port 5301
import { chromium } from "playwright";
import { mkdir, rename, writeFile } from "node:fs/promises";

const out = process.argv[2] ?? "video";
const base = process.argv[3] ?? "http://localhost:5301";
await mkdir(out, { recursive: true });

// "~" before a character types the next character wrong, pauses, then backspaces and fixes it.
const phrases = [
  "oct 2 to oct 5",
  "next mon 9am to 5pm",
  "half past nine the day after tomorrow",
  "last fri of the month",
  "tmrw 1-2",
  "february 12 to march 2",
  "every wkday at 9",
  "four score and seven years ago",
  "next pi day",
  "may the fourth be with you",
];

// VARY=1: each phrase gets the other theme and a new highlight color.
const VARY = !!process.env.VARY;
const LOOKS = [
  ["light", "#4f46e5"],
  ["dark", "#fb7185"],
  ["light", "#059669"],
  ["dark", "#38bdf8"],
  ["light", "#e11d48"],
  ["dark", "#a3e635"],
  ["light", "#7c3aed"],
  ["dark", "#fb923c"],
  ["light", "#0d9488"],
  ["dark", "#e879f9"],
];
// Registered color properties animate, so every var(--td-*) user fades together.
const FADE = "0.7s";
const TOKENS = ["bg", "bg-2", "fg", "fg-2", "fg-3", "border", "dotted", "hover", "sel", "accent", "on-accent", "range", "today-ring", "ring"];
const FADE_CSS = `${TOKENS.map((t) => `@property --td-${t} { syntax: "<color>"; inherits: true; initial-value: #888 }`).join("\n")}
.td-root { transition: ${TOKENS.map((t) => `--td-${t} ${FADE} ease`).join(", ")} !important }
.demo { transition: background-color ${FADE} ease, color ${FADE} ease !important }`;

async function applyLook(page, i) {
  const [theme, accent] = LOOKS[i % LOOKS.length];
  const dark = theme === "dark";
  await page.evaluate(`(() => {
    const dark = ${dark};
    document.querySelector("main.demo")?.setAttribute("data-theme", ${JSON.stringify(theme)});
    const root = document.querySelector(".td-root");
    root.setAttribute("data-theme", ${JSON.stringify(theme)});
    root.style.setProperty("--td-accent", ${JSON.stringify(accent)});
    root.style.setProperty("--td-on-accent", dark ? "#1c1c1c" : "#fff");
    root.style.setProperty("--td-range", "color-mix(in srgb, ${accent} " + (dark ? 18 : 12) + "%, transparent)");
    root.style.setProperty("--td-ring", "color-mix(in srgb, ${accent} 22%, transparent)");
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
const CSS = `.demo-try, .demo-note, .demo-gear, .demo-confirmed { display: none !important }
.demo { padding: ${PAD}px !important; justify-content: flex-start !important; align-items: center !important }`;
const url = (q = "") => `${base}/?theme=light&ws=0&engine=h11${q ? `&q=${encodeURIComponent(q)}` : ""}`;

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

const ctx = await browser.newContext({
  viewport: size,
  deviceScaleFactor: 2,
  recordVideo: { dir: out, size },
});
// The recording starts when the page is created. Hide the extras before first paint, wait for the page to settle,
// and write how many seconds of loading to cut from the start (demo.trim).
await ctx.addInitScript(`document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = ${JSON.stringify(CSS)}; document.head.appendChild(s); }, { once: true })`);
const t0 = Date.now();
const page = await ctx.newPage();
await page.goto(url(), { waitUntil: "networkidle" });
await page.addStyleTag({ content: CSS });
if (VARY) await page.addStyleTag({ content: FADE_CSS });
await page.evaluate("document.fonts.ready.then(() => 0)");
await page.getByRole("textbox", { name: "Date and time" }).click();
await page.evaluate("window.scrollTo(0, 0)");
await sleep(1000);
await writeFile(`${out}/demo.trim`, String(Math.max(0, (Date.now() - t0) / 1000 - 0.6).toFixed(2)));
for (const [i, p] of phrases.entries()) {
  if (VARY) {
    await applyLook(page, i);
    await sleep(i === 0 ? 0 : 900); // let the 0.7 s fade finish before typing
  }
  await type(page, p);
  await sleep(2200);
  console.log("scrollY", await page.evaluate("window.scrollY"), p);
  await page.keyboard.press("Escape");
  await sleep(900);
}
const video = page.video();
await ctx.close();
await rename(await video.path(), `${out}/demo.webm`);
await browser.close();
console.log(`${out}/demo.webm`);
