// Screenshots at phone and desktop widths. Usage: node scripts/mobile-shots.mjs <outDir>
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";

const out = process.argv[2] ?? "shots-mobile";
await mkdir(out, { recursive: true });
const server = spawn("pnpm", ["exec", "vite", "--config", "demo/vite.config.ts"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 2500));
const browser = await chromium.launch();
const cases = [
  ["sep 21 10am to 12pm", "dt-range"],
  ["from 2pm tomorrow to 4pm friday", "dt-range-2day"],
  ["oct 2 to oct 5", "range"],
  ["4 to 4:30", "time-range"],
  ["every weekday at 9", "recurrence"],
];
let bad = 0;
for (const w of [360, 390, 768, 1024]) {
  for (const theme of ["light", "dark"]) {
    const touch = w < 500;
    const ctx = await browser.newContext({ viewport: { width: w, height: touch ? 780 : 900 }, deviceScaleFactor: 2, hasTouch: touch, isMobile: touch });
    const page = await ctx.newPage();
    for (const [q, name] of cases) {
      await page.goto(`http://localhost:5199/?theme=${theme}&q=${encodeURIComponent(q)}&ws=1`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1600);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const small = await page.evaluate(() =>
        [...document.querySelectorAll(".td-root button, .td-root [role=option]")]
          .filter((e) => e.offsetParent && !e.closest("[inert]"))
          .map((e) => e.getBoundingClientRect())
          .filter((r) => r.width > 0 && (r.height < 43.5 || r.width < 30)).length);
      if (over > 0 || (touch && small)) { bad++; console.log(`${w} ${theme} ${name}: overflow ${over}, small targets ${small}`); }
      await page.screenshot({ path: `${out}/${w}-${theme}-${name}.png` });
    }
    await ctx.close();
  }
}
await browser.close();
server.kill();
console.log(bad ? `${bad} problems` : "no overflow, no small targets");
