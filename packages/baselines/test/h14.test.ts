import { beforeAll, describe, expect, it } from "vitest";
import { resolveDsl } from "@type-date/core";
import { loadH14, parseH13, parseH14 } from "../src";

const TODAY = "2026-11-21"; // Saturday

// [text, expected DSL]. Policy: specs/dsl.md, "Date range with a shared time".
const cases: [string, string][] = [
  // a date range with one shared time window is a daily recurrence bounded by the two days
  ["tomorrow to friday 3-4pm", "dt R d/1 ufr 15:00>16:00 s+1d"],
  ["3-4pm tomorrow to friday", "dt R d/1 ufr 15:00>16:00 s+1d"],
  ["tomorrow to friday from 3-4pm", "dt R d/1 ufr 15:00>16:00 s+1d"],
  ["tomorrow through friday, 3pm to 4pm", "dt R d/1 ufr 15:00>16:00 s+1d"],
  ["from 3 to 4pm tomorrow through friday", "dt R d/1 ufr 15:00>16:00 s+1d"],
  ["between tomorrow and friday 3-4pm", "dt R d/1 ufr 15:00>16:00 s+1d"],
  ["tomorrow to friday at 3pm", "dt R d/1 ufr 15:00 s+1d"],
  ["dec 1 to dec 5 3-4pm", "dt R d/1 u12-05 15:00>16:00 s12-01"],
  ["3-4pm dec 1 to dec 5", "dt R d/1 u12-05 15:00>16:00 s12-01"],
  ["nov 27-29 3-4pm", "dt R d/1 u11-29 15:00>16:00 s11-27"],
  ["jan 3 to jan 10 at noon", "dt R d/1 u01-10 12:00 s01-03"],
  ["tomorrow to friday 3-4pm est", "dt R d/1 ufr 15:00>16:00 s+1d @America/New_York"],
  // a time on each end is one span (h13 unchanged)
  ["3pm tomorrow to 4pm friday", "dt +1d 15:00>fr 16:00"],
  ["tomorrow 3pm to friday 4pm", "dt +1d 15:00>fr 16:00"],
  ["from noon friday until monday morning", "dt fr 12:00>mo"],
  ["6am dec 5 to 7am", "dt 12-05 06:00>07:00"],
  // not a shared time (h13 unchanged)
  ["tomorrow to friday", "d +1d>fr"],
  ["monday to friday 3-4pm", "dt R d/1 mo,tu,we,th,fr 15:00>16:00"],
  ["16:30 4 jul 2025", "dt 2025-07-04 16:30"],
  ["between 1 and 12 july 2026", "d 2026-07-01>2026-07-12"],
  ["dec 1 to dec 5 2027", "d 2027-12-01>2027-12-05"],
  ["nov 27-29 (check-in 4pm, check-out noon)", "d 11-27>11-29"],
];

describe("h14", () => {
  beforeAll(loadH14);
  it.each(cases)("%s", (text, dsl) => {
    expect(parseH14(text, TODAY)).toBe(dsl);
  });

  it("covers the same days as the date range", () => {
    for (const today of ["2026-11-21", "2026-11-24", "2026-11-27"]) {
      const rec = resolveDsl(parseH14("next mon to wed 9am-5pm", today), { today, weekStart: 0 });
      const range = resolveDsl(parseH13("next mon to wed", today), { today, weekStart: 0 });
      expect([rec.recurrence?.dtstart, rec.recurrence?.until]).toEqual([range.start?.date, range.end?.date]);
    }
  });
});
