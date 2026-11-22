import { expect, test } from "@playwright/test";
import { boxes, isTouch, open } from "./helpers";

// Window resizes and the soft keyboard. The picker sizes itself to the visual viewport and scrolls into view when
// the keyboard opens; a plain window resize must never scroll the page.

test("resizing the window narrow and back does not scroll the page", async ({ page }, info) => {
  test.skip(isTouch(info), "desktop windows only");
  await page.setViewportSize({ width: 1200, height: 800 });
  await open(page, "from 2pm tomorrow to 4pm friday");
  await page.locator(".td-search input").focus();
  const top0 = (await boxes(page, ".td-card"))[0]!.y;
  for (const w of [900, 600, 450, 380, 450, 700, 1200]) {
    await page.setViewportSize({ width: w, height: 800 });
    expect(await page.evaluate("window.scrollY"), `scrolled at ${w}px`).toBe(0);
  }
  expect((await boxes(page, ".td-card"))[0]!.y).toBeCloseTo(top0, 0);
});

test("the card is never taller than the viewport on a phone", async ({ page }) => {
  test.skip(page.viewportSize()!.width > 520, "phone widths");
  await open(page, "every weekday at 9");
  const [card] = await boxes(page, ".td-card");
  expect(card!.h).toBeLessThanOrEqual(page.viewportSize()!.height);
});
