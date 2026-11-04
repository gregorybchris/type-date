import { beforeAll, describe, expect, it } from "vitest";
import { h10, loadH10, parseH10 } from "../src";

const TODAY = "2026-11-03";
const cases: [string, string][] = [
  ["yesterday at 9m to tomorrow 3pm", "dt -1d 09:00>+1d 15:00"],
  ["yesterday at 9am to tomorrow 3pm", "dt -1d 09:00>+1d 15:00"],
  ["tomorrow 3:30m", "dt +1d 3:30?"],
  // untouched
  ["in 9 months", "d +9m"],
  ["every 9m", "x"],
  ["5m ago", "x"],
  ["in 5m", "x"],
];

describe("h10", () => {
  beforeAll(async () => {
    await loadH10();
  });
  for (const [t, e] of cases) it(`"${t}"`, () => expect(parseH10(t, TODAY)).toBe(e));
  it("is registered as an engine", async () => {
    expect((await h10.predict("pi day", undefined, { today: TODAY })).dsl).toBe("d 03-14");
  });
});
