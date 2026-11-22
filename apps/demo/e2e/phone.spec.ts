import { expect, test } from "@playwright/test";
import { boxes, isTouch, open, swipe } from "./helpers";

// Touch-phone behavior: clear button, folding the calendar while typing, swipe between months, compact grid.

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

test("the calendar folds while typing and comes back after Enter", async ({ page }) => {
  await open(page, "next monday 9am to 5pm");
  const cal = page.locator(".td-panel-cal");
  expect((await cal.boundingBox())!.height).toBeGreaterThan(200);
  await page.locator(".td-search input").focus();
  await expect(page.locator(".td-root")).toHaveAttribute("data-typing", "true");
  await expect.poll(async () => (await cal.boundingBox())!.height).toBeLessThan(2);
  // The fields stay visible above the (folded) calendar.
  await expect(page.locator(".td-fields .td-seg").first()).toBeVisible();
  await page.locator(".td-search input").press("Enter");
  await expect(page.locator(".td-search input")).not.toBeFocused();
  await expect.poll(async () => (await cal.boundingBox())!.height).toBeGreaterThan(200);
});

test("a horizontal swipe changes month; a short one does not", async ({ page }) => {
  await open(page, "");
  const month = page.locator(".td-month");
  await expect(month).toHaveText("November 2026");
  await swipe(page, ".td-weeks", -200);
  await expect(month).toHaveText("December 2026");
  await swipe(page, ".td-weeks", 200);
  await expect(month).toHaveText("November 2026");
  await swipe(page, ".td-weeks", 20);
  await expect(month).toHaveText("November 2026");
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
