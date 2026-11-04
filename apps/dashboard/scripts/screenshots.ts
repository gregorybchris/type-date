// Screenshots every view in light and dark at several widths. Needs a dev server (BASE_URL, default :5173).
// Output: $SHOTS_DIR or ./.shots. Env: WIDTHS=360,390,768,1024,1440 to choose widths. Usage: pnpm shots
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.BASE_URL ?? "http://localhost:5173";
const out = process.env.SHOTS_DIR ?? path.resolve(".shots");
const widths = (process.env.WIDTHS ?? "1440").split(",").map(Number);
fs.mkdirSync(out, { recursive: true });

const views: Array<[string, string]> = [
  ["engines", "#/engines"],
  ["detail", "#/engines/h8"],
  ["compare", "#/compare"],
  ["pareto", "#/pareto"],
  ["errors", "#/errors/h8"],
  ["playground", "#/playground?engine=h8"],
  ["data", "#/data"],
];

const browser = await chromium.launch();
for (const width of widths) {
  const phone = width < 768;
  for (const theme of ["light", "dark"] as const) {
    const ctx = await browser.newContext({
      viewport: { width, height: phone ? 780 : 900 },
      deviceScaleFactor: phone ? 2 : 1,
      hasTouch: phone,
      isMobile: phone,
      colorScheme: theme,
    });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => console.log("pageerror", e.message));
    page.on("console", (m) => m.type() === "error" && console.log("console", m.text()));
    await page.addInitScript((t) => localStorage.setItem("td-theme", t), theme);
    for (const [name, hash] of views) {
      await page.goto(`${base}/${hash}`);
      await page.waitForTimeout(1300);
      if (name === "playground") {
        await page.locator("input[placeholder='oct 2 to oct 5']").fill("oct 2 to oct 5");
        await page.waitForTimeout(700);
      }
      // Horizontal overflow check on the page and on the scroller.
      const over = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth - innerWidth, body: document.body.scrollWidth - innerWidth }));
      if (over.doc > 0 || over.body > 0) console.log("OVERFLOW", width, theme, name, over);
      await page.screenshot({ path: path.join(out, `${name}-${theme}-${width}.png`) });
    }
    await ctx.close();
  }
}
await browser.close();
console.log("done", out);
