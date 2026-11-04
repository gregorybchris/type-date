// Screenshots every view in light and dark. Needs the dev server on :5173 (pnpm dev).
// Output: $SHOTS_DIR or ./.shots. Usage: pnpm shots
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.BASE_URL ?? "http://localhost:5173";
const out = process.env.SHOTS_DIR ?? path.resolve(".shots");
fs.mkdirSync(out, { recursive: true });

const views: Array<[string, string]> = [
  ["experiments", "#/experiments"],
  ["detail", "#/experiments/exp-012"],
  ["pareto", "#/pareto"],
  ["errors", "#/errors/exp-012"],
  ["playground", "#/playground?exp=exp-012"],
  ["data", "#/data"],
];

const browser = await chromium.launch();
for (const theme of ["light", "dark"] as const) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: theme });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.log("pageerror", e.message));
  page.on("console", (m) => m.type() === "error" && console.log("console", m.text()));
  await page.addInitScript((t) => localStorage.setItem("td-theme", t), theme);
  for (const [name, hash] of views) {
    await page.goto(`${base}/${hash}`);
    await page.waitForTimeout(1400);
    if (name === "playground") {
      await page.getByRole("button", { name: "Load", exact: true }).click();
      await page.waitForTimeout(900);
      const input = page.locator("input[placeholder='oct 2 to oct 5']");
      await input.fill("oct 2 to oct 5");
      await page.waitForTimeout(700);
    }
    await page.screenshot({ path: path.join(out, `${name}-${theme}.png`) });
  }
  await page.goto(`${base}/#/experiments`);
  await page.waitForTimeout(500);
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(out, `palette-${theme}.png`) });
  await ctx.close();
}
await browser.close();
console.log("done", out);
