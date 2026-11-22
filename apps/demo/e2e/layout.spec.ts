import { expect, test } from "@playwright/test";
import { boxes, isTouch, open } from "./helpers";

// One input per result shape the picker draws.
const INPUTS = [
  "",
  "tomorrow at 3pm",
  "3-4pm tomorrow",
  "from 2pm tomorrow to 4pm friday",
  "oct 2 to oct 5",
  "4 to 4:30",
  "11pm to 1am",
  "every weekday at 9",
  "tuesdays at 1:30 and thursdays at 3",
  "from oct 2",
  "next friday 3pm tokyo time",
];

// One page load per input: every layout check runs on it.
for (const text of INPUTS) {
  test(`layout: "${text || "(empty)"}"`, async ({ page }, info) => {
    await open(page, text);

    // No horizontal scroll; the card is inside the viewport.
    expect(await page.evaluate("document.documentElement.scrollWidth - window.innerWidth")).toBe(0);
    const [card] = await boxes(page, ".td-card");
    expect(card!.x).toBeGreaterThanOrEqual(0);
    expect(card!.right).toBeLessThanOrEqual(page.viewportSize()!.width);

    // Every field box is one line and inside the card.
    for (const seg of await boxes(page, ".td-fields .td-seg")) {
      expect(seg.h, `"${seg.text}" wraps`).toBeLessThan(50);
      expect(seg.right).toBeLessThanOrEqual(card!.right);
    }
    for (const f of await boxes(page, ".td-fields .td-field")) {
      expect(f.right, `"${f.text}" overflows the card`).toBeLessThanOrEqual(card!.right);
    }

    // Tap targets are at least 44px on touch screens.
    if (isTouch(info)) {
      const small = await page.locator(".td-root").evaluate((root) =>
        Array.from(root.querySelectorAll<HTMLElement>("button, [role=option]"))
          .filter((e) => e.offsetParent && !e.closest("[inert]") && !e.hidden)
          .map((e) => ({ e, r: e.getBoundingClientRect() }))
          .filter(({ r }) => r.width > 0 && r.height > 0 && (r.height < 43.5 || r.width < 30))
          .map(({ e, r }) => `${e.className || e.tagName} "${(e.textContent || e.getAttribute("aria-label") || "").trim()}" ${Math.round(r.width)}x${Math.round(r.height)}`),
      );
      expect(small, "tap targets under 44px").toEqual([]);
    }
  });
}

test("keyboard hints show on desktop and hide on touch or narrow screens", async ({ page }, info) => {
  await open(page, "tomorrow");
  const narrow = page.viewportSize()!.width <= 520;
  await expect(page.locator(".td-foot")).toBeVisible({ visible: !isTouch(info) && !narrow });
});
