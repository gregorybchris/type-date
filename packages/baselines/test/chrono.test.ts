import { describe, expect, it } from "vitest";
import { chronoEngine, chronoToDsl } from "../src";

// Reference day: Tuesday 2026-11-03.
const TODAY = "2026-11-03";
const cases: [string, string][] = [
  ["oct 2 to oct 5", "d 10-02>10-05"],
  ["last friday", "d fr-1"],
  ["next friday", "d fr+1"],
  ["4 to 4:30", "t 4?>4:30?"],
  ["tomorrow at 3pm", "dt +1d 15:00"],
  ["next monday 9am to 5pm", "dt mo+1 09:00>17:00"],
  ["dec 25", "d 12-25"],
  ["in 2 weeks", "d +2w"],
  ["3 days ago", "d -3d"],
  ["from 2pm tomorrow to 4pm friday", "dt +1d 14:00>fr 16:00"],
  ["march 3 2027", "d 2027-03-03"],
  ["noon", "t 12:00"],
  ["next week", "d W+1"],
  ["last month", "d M-1"],
  ["october", "d M@10"],
  ["jan 5 at 7pm", "dt 01-05 19:00"],
  ["2027-03-14", "d 2027-03-14"],
  ["12/25/2027", "d 2027-12-25"],
  ["3/15", "d 03-15"],
  ["yesterday", "d -1d"],
  ["today", "d +0d"],
  ["this weekend", "d sa>su"],
  ["friday 2-4pm", "dt fr 14:00>16:00"],
  ["9am", "t 09:00"],
  ["15:30", "t 15:30"],
  ["midnight", "t 00:00"],
  ["tuesday", "d tu"],
  ["dec 25 2026 9:30pm", "dt 2026-12-25 21:30"],
  ["5 to 9:00am", "t 05:00>09:00"],
  ["buy milk", "x"],
  // chrono has no recurrence support: these output x
  ["every other sunday", "x"],
  ["every weekday at 9", "x"],
  ["monthly on the 15th", "x"],
];

describe("chrono adapter", () => {
  for (const [text, dsl] of cases) {
    it(`${text} -> ${dsl}`, () => expect(chronoToDsl(text, TODAY)).toBe(dsl));
  }

  it("depends on the reference day", () => {
    expect(chronoToDsl("oct 2", "2026-11-03")).toBe("d 10-02");
    expect(chronoToDsl("tomorrow", "2028-02-29")).toBe("d +1d");
  });

  it("implements the Engine interface", async () => {
    await chronoEngine.load({ baseUrl: "" });
    const r = await chronoEngine.predict("Tomorrow  at 3PM", undefined, { today: TODAY });
    expect(r.dsl).toBe("dt +1d 15:00");
    expect(r.ms).toBeGreaterThanOrEqual(0);
  });
});
