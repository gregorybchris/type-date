// Records the demo while typing five phrases. Usage: node scripts/demo-video.mjs <outDir> [baseUrl]
// Start the demo on a spare port first: pnpm exec vite --config demo/vite.config.ts --port 5301
import { chromium } from "playwright";
import { mkdir, rename } from "node:fs/promises";

const out = process.argv[2] ?? "video";
const base = process.argv[3] ?? "http://localhost:5301";
await mkdir(out, { recursive: true });

// "~" before a character types the next character wrong, pauses, then backspaces and fixes it.
const phrases = [
  "oct 2 to oct 5",
  "every other fr~i until dec 31",
  "next mon 9am to 5pm",
  "half past nine the day after tomorrow",
  "last fri of the month",
  "feb 12 to mar 2",
  "every wkday at 9",
  "four score and seven years ago",
  "next pi day",
  "may the fourth be with you",
];

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
const url = (q = "") => `${base}/?theme=light&ws=1&engine=h11${q ? `&q=${encodeURIComponent(q)}` : ""}`;

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
const page = await ctx.newPage();
await page.goto(url(), { waitUntil: "domcontentloaded" });
await page.addStyleTag({ content: CSS });
await page.getByRole("textbox", { name: "Date and time" }).click();
await page.evaluate("window.scrollTo(0, 0)");
await sleep(1200);
for (const p of phrases) {
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
