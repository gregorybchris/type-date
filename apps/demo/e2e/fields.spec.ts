import { expect, test } from "@playwright/test";
import { boxes, open } from "./helpers";

// The result fields above the calendar: one segmented box per endpoint.

test("a one-day time range is one box: date | start – end", async ({ page }) => {
  await open(page, "3-4pm tomorrow");
  const segs = page.locator(".td-fields .td-seg");
  await expect(segs).toHaveCount(1);
  await expect(segs.locator(".td-field")).toHaveText(["Nov 22, 2026", "3:00 PM", "4:00 PM"]);
  await expect(segs.locator(".td-dash")).toHaveCount(1);
});

test("a time-only range is one box: start – end", async ({ page }) => {
  await open(page, "4 to 4:30");
  await expect(page.locator(".td-fields .td-seg .td-field")).toHaveText(["4:00 PM", "4:30 PM"]);
});

test("an overnight time range marks the next day", async ({ page }) => {
  await open(page, "11pm to 1am");
  await expect(page.locator(".td-fields .td-field").nth(1)).toHaveText("1:00 AM+1 day");
});

test("a multi-day date-time range is two stacked boxes with aligned columns", async ({ page }) => {
  await open(page, "from 2pm tomorrow to 4pm friday");
  await expect(page.locator(".td-fields")).toHaveAttribute("data-stack", "true");
  const [a, b] = await boxes(page, ".td-fields .td-seg");
  expect(b!.y).toBeGreaterThanOrEqual(a!.bottom);
  expect(b!.x).toBeCloseTo(a!.x, 0);
  expect(b!.w).toBeCloseTo(a!.w, 0);
  const times = await boxes(page, ".td-fields .td-field[data-time]");
  expect(times[1]!.x).toBeCloseTo(times[0]!.x, 0);
  await expect(page.locator(".td-fields .td-to")).toBeHidden();
});

test("a date range is two boxes joined by 'to'", async ({ page }) => {
  await open(page, "oct 2 to oct 5");
  await expect(page.locator(".td-fields .td-seg")).toHaveCount(2);
  await expect(page.locator(".td-fields .td-to")).toBeVisible();
  const [a, b] = await boxes(page, ".td-fields .td-seg");
  expect(b!.y).toBeCloseTo(a!.y, 0);
});

test("the edited segment is marked and its box takes the ring", async ({ page }) => {
  await open(page, "3-4pm tomorrow");
  const fields = page.locator(".td-fields .td-field");
  await expect(fields.nth(1)).toHaveAttribute("data-active", "true");
  await fields.nth(2).click();
  await expect(fields.nth(2)).toHaveAttribute("data-active", "true");
  await expect(fields.nth(1)).not.toHaveAttribute("data-active", /.*/);
});

test("recurrence text names weekday sets", async ({ page }) => {
  await open(page, "every weekday at 9");
  await expect(page.locator(".td-fields .td-field").first()).toHaveText("Every weekday at 9:00 AM");
});
