// Renders the demo in both themes for a few phrases. Usage: node scripts/shots.mjs <outDir>
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";

const out = process.argv[2] ?? "shots";
await mkdir(out, { recursive: true });
const server = spawn("pnpm", ["exec", "vite", "--config", "demo/vite.config.ts"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 2500));
const browser = await chromium.launch();
const cases = [
  ["sep 21 10am to 12pm", "datetime"],
  ["oct 2 to oct 5", "range"],
  ["jan 10 to jan 16 2027", "range-multi"],
  ["4 to 4:30", "time-range"],
  ["every other sunday", "recurrence"],
  ["every weekday at 9", "recurrence-time"],
  ["tomorrow at 3pm", "single-dt"],
];
for (const theme of ["light", "dark"]) {
  const page = await browser.newPage({ viewport: { width: 760, height: 640 }, deviceScaleFactor: 2 });
  for (const [q, name] of cases) {
    await page.goto(`http://localhost:5199/?theme=${theme}&q=${encodeURIComponent(q)}&ws=1`, { waitUntil: "domcontentloaded" });
    await page.locator("input").focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/${theme}-${name}.png` });
  }
  await page.close();
}
await browser.close();
server.kill();
