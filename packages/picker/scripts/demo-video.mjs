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
  "every other fr~iday until dec 31",
  "next monday 9am to 5pm",
  "half past nine the day after tomorrow",
  "last friday of the month",
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
const ctx = await browser.newContext({
  viewport: { width: 560, height: 760 },
  deviceScaleFactor: 2,
  recordVideo: { dir: out, size: { width: 560, height: 760 } },
});
const page = await ctx.newPage();
await page.goto(`${base}/?theme=light&ws=1&engine=h11`, { waitUntil: "domcontentloaded" });
await page.getByRole("textbox", { name: "Date and time" }).click();
await sleep(1200);
for (const p of phrases) {
  await type(page, p);
  await sleep(2200);
  await page.keyboard.press("Escape");
  await sleep(900);
}
const video = page.video();
await ctx.close();
await rename(await video.path(), `${out}/demo.webm`);
await browser.close();
console.log(`${out}/demo.webm`);
