import { expect } from "@playwright/test";
import type { Page, TestInfo } from "@playwright/test";

/** A fixed "today" so dates, month grids and screenshots do not change from day to day. Nov 1 2026 is a Sunday. */
export const TODAY = "2026-11-21";

/** Open the demo with text in the picker and wait for the parse to land. */
export async function open(page: Page, text = "", opts: { theme?: "light" | "dark"; ws?: 0 | 1 } = {}) {
  const u = new URLSearchParams({ today: TODAY, ws: String(opts.ws ?? 0), theme: opts.theme ?? "light", tf: "12h", df: "mdy" });
  if (text) u.set("q", text);
  await page.goto(`/?${u}`);
  const root = page.locator(".td-root");
  await expect(root).toBeVisible();
  if (text) await expect(root).not.toHaveAttribute("data-kind", "none");
  await expect(root).not.toHaveAttribute("data-pending", /.*/);
  await settled(page);
}

/** Wait for fonts and for the time list's scroll position to stop changing (it centers the selected time). */
export async function settled(page: Page) {
  await page.evaluate("document.fonts.ready");
  await page.waitForFunction(`new Promise((done) => {
    const pos = () => Array.from(document.querySelectorAll(".td-list")).map((e) => e.scrollTop + "," + e.scrollLeft).join();
    const a = pos();
    requestAnimationFrame(() => requestAnimationFrame(() => done(pos() === a)));
  })`);
}

export const isTouch = (info: TestInfo) => !!info.project.use.hasTouch;

/** Bounding boxes of all matches, in document order. */
export async function boxes(page: Page, selector: string) {
  return page.locator(selector).evaluateAll((els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom, text: (e.textContent ?? "").trim() };
    }),
  );
}

/** A horizontal touch swipe through the DevTools protocol (Playwright has no swipe gesture). */
export async function swipe(page: Page, selector: string, dx: number) {
  const box = await page.locator(selector).boundingBox();
  if (!box) throw new Error(`no box for ${selector}`);
  const cdp = await page.context().newCDPSession(page);
  const x0 = box.x + box.width / 2 - dx / 2;
  const y = box.y + box.height / 2;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x0, y }] });
  for (let i = 1; i <= 8; i++) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x0 + (dx * i) / 8, y }] });
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}
