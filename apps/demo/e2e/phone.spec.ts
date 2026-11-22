import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { boxes, isTouch, open, swipe } from "./helpers";

// Touch-phone behavior: clear button, the calendar while typing, swipe between months, drag for a range,
// compact grid.

test.beforeEach(async ({}, info) => {
  test.skip(!isTouch(info), "touch phones only");
});

test("the clear button empties the input in one tap and keeps focus", async ({ page }) => {
  await open(page, "oct 2 to oct 5");
  const input = page.locator(".td-search input");
  await input.focus();
  await page.locator(".td-clear").tap();
  await expect(input).toHaveValue("");
  await expect(input).toBeFocused();
  await expect(page.locator(".td-root")).toHaveAttribute("data-kind", "none");
  await expect(page.locator(".td-clear")).toBeHidden();
});

test("a tap on the search icon focuses the input", async ({ page }) => {
  await open(page);
  await page.locator(".td-search svg").first().tap();
  await expect(page.locator(".td-search input")).toBeFocused();
});

test("the calendar stays visible while typing", async ({ page }) => {
  await open(page, "next monday 9am to 5pm");
  const cal = page.locator(".td-panel-cal");
  const before = (await cal.boundingBox())!.height;
  expect(before).toBeGreaterThan(200);
  await page.locator(".td-search input").focus();
  await page.waitForTimeout(400);
  expect((await cal.boundingBox())!.height).toBe(before);
  await expect(page.locator(".td-fields .td-seg").first()).toBeVisible();
  await page.locator(".td-search input").press("Enter");
  await expect(page.locator(".td-search input")).not.toBeFocused();
  expect((await cal.boundingBox())!.height).toBe(before);
});

test("a horizontal swipe on the month name changes month; a short one does not", async ({ page }) => {
  await open(page, "");
  const month = page.locator(".td-month");
  await expect(month).toHaveText("November 2026");
  // 150px: the label is about 200px wide on a 360px phone, and the chevrons' hit areas reach past its ends.
  await swipe(page, ".td-month", -150);
  await expect(month).toHaveText("December 2026");
  await swipe(page, ".td-month", 150);
  await expect(month).toHaveText("November 2026");
  await swipe(page, ".td-month", 20);
  await expect(month).toHaveText("November 2026");
});

/** A touch drag from one day to another through the DevTools protocol. */
async function touchDrag(page: Page, from: string, to: string) {
  const a = (await page.locator(`[data-date="${from}"]`).boundingBox())!;
  const b = (await page.locator(`[data-date="${to}"]`).boundingBox())!;
  const p0 = { x: a.x + a.width / 2, y: a.y + a.height / 2 };
  const p1 = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [p0] });
  for (let i = 1; i <= 10; i++) {
    const pt = { x: p0.x + ((p1.x - p0.x) * i) / 10, y: p0.y + ((p1.y - p0.y) * i) / 10 };
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [pt] });
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}

const selectedDays = (page: Page) =>
  page.locator(".td-weeks .td-cell[aria-selected=true] button").evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.date));

test("a touch drag across days selects a range and does not change month", async ({ page }) => {
  await open(page, "");
  await touchDrag(page, "2026-11-10", "2026-11-19");
  await expect.poll(() => selectedDays(page)).toEqual(Array.from({ length: 10 }, (_, i) => `2026-11-${String(10 + i).padStart(2, "0")}`));
  await expect(page.locator(".td-month")).toHaveText("November 2026");
  // A horizontal drag along a week is a range too, not a month swipe.
  await touchDrag(page, "2026-11-16", "2026-11-20");
  await expect.poll(() => selectedDays(page)).toEqual(["2026-11-16", "2026-11-17", "2026-11-18", "2026-11-19", "2026-11-20"]);
  await expect(page.locator(".td-month")).toHaveText("November 2026");
  // A tap still picks one day. Wait first: on Linux CI, Chromium dropped the click of a tap sent about 50ms after the
  // drag's touchEnd (a finger cannot lift and tap again that fast).
  await page.waitForTimeout(300);
  await page.locator('[data-date="2026-11-25"]').tap();
  await expect.poll(() => selectedDays(page)).toEqual(["2026-11-25"]);
});

test("after the clear button, a tap on an example selects it", async ({ page }) => {
  await open(page, "oct 2 to oct 5");
  await page.locator(".td-search input").focus();
  await page.locator(".td-clear").tap();
  await expect(page.locator(".td-search input")).toBeFocused();
  // Wait until the example stops moving, so it is measured where it will be tapped: the fields close, and focusing the
  // input starts a smooth scroll of the picker into view after 250ms (useSoftKeyboard). A finger stays down about
  // 100ms; Playwright's tap() releases at once.
  const chipLoc = page.locator(".demo-chip", { hasText: "every other sunday" });
  await page.waitForTimeout(300);
  await page.waitForFunction(`new Promise((done) => {
    const el = [...document.querySelectorAll(".demo-chip")].find((e) => e.textContent === "every other sunday");
    const y = () => el.getBoundingClientRect().y + "," + scrollY;
    const a = y();
    setTimeout(() => done(y() === a), 300);
  })`);
  const chip = (await chipLoc.boundingBox())!;
  const pt = { x: chip.x + chip.width / 2, y: chip.y + chip.height / 2 };
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [pt] });
  await page.waitForTimeout(150);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(page.locator(".td-search input")).toHaveValue("every other sunday");
  await expect(page.locator(".td-root")).toHaveAttribute("data-kind", "recurrence");
});

test("the grid shows only the weeks the month needs", async ({ page }) => {
  await open(page, "");
  // November 2026 starts on a Sunday: 5 weeks with Sunday first.
  await expect(page.locator(".td-weeks [role=row]")).toHaveCount(5);
});

test("short placeholder", async ({ page }) => {
  await open(page);
  await expect(page.locator(".td-search input")).toHaveAttribute("placeholder", "Try “next friday 3pm”");
});

test("time range in the strip is one band", async ({ page }) => {
  await open(page, "next monday 9am to 5pm");
  const opts = await boxes(page, ".td-panel-time [data-range]");
  expect(opts.length).toBeGreaterThan(2);
  // Tiles in the band have no border, so the band reads as one shape.
  const borders = await page
    .locator(".td-panel-time [data-range]")
    .evaluateAll((els) => els.map((e) => getComputedStyle(e).borderTopColor));
  expect(new Set(borders)).toEqual(new Set(["rgba(0, 0, 0, 0)"]));
});
