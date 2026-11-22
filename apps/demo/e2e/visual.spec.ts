import { expect, test } from "@playwright/test";
import { open } from "./helpers";

// Screenshot comparisons of the picker card. macOS only (see playwright.config.ts). After an intended visual change,
// look at the new images and update the baselines: pnpm --filter @type-date/demo e2e:update
const INPUTS = [
  ["empty", ""],
  ["datetime", "tomorrow at 3pm"],
  ["one-day-range", "3-4pm tomorrow"],
  ["multi-day-range", "from 2pm tomorrow to 4pm friday"],
  ["date-range", "oct 2 to oct 5"],
  ["time-range", "4 to 4:30"],
  ["recurrence", "every weekday at 9"],
  ["ambiguous", "tomorrow at 3"],
] as const;

for (const theme of ["light", "dark"] as const) {
  for (const [name, text] of INPUTS) {
    test(`${theme} ${name}`, async ({ page }) => {
      await open(page, text, { theme });
      // The caret blinks; hide it.
      await page.addStyleTag({ content: "input { caret-color: transparent !important; }" });
      // The time list centers the selected time, and that lands 1px differently between loads. Pin it to whole
      // pixels from the first selected option so the image is the same every run.
      await page.evaluate(`document.querySelectorAll(".td-list").forEach((l) => {
        const sel = l.querySelector("[aria-selected=true]");
        if (!sel) return;
        l.scrollTop = Math.max(0, sel.offsetTop - 96);
        l.scrollLeft = Math.max(0, sel.offsetLeft - 96);
      })`);
      await expect(page.locator(".td-card")).toHaveScreenshot(`${theme}-${name}.png`);
    });
  }
}
