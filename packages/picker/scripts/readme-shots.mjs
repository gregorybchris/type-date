// Renders picker cards for the README. Usage: node scripts/readme-shots.mjs <outDir> [baseUrl]
// Start the demo on a spare port first: pnpm exec vite --config demo/vite.config.ts --port 5301
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const out = process.argv[2] ?? "shots";
const base = process.argv[3] ?? "http://localhost:5301";
await mkdir(out, { recursive: true });
const cases = [
  ["oct 2 to oct 5", "range"],
  ["every other friday until dec 31", "recurrence"],
  ["next monday 9am to 5pm", "datetime"],
];
const browser = await chromium.launch();
for (const theme of ["light", "dark"]) {
  const page = await browser.newPage({ viewport: { width: 520, height: 760 }, deviceScaleFactor: 2 });
  for (const [q, name] of cases) {
    await page.goto(`${base}/?theme=${theme}&q=${encodeURIComponent(q)}&ws=1&today=2026-09-14&engine=h11`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);
    await page.locator(".td-card").first().screenshot({ path: `${out}/${theme}-${name}.png` });
  }
  await page.close();
}
await browser.close();
