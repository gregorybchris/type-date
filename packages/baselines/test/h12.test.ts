import { beforeAll, describe, expect, it } from "vitest";
import { parseDsl, resolveDsl, serializeDsl } from "@type-date/core";
import { loadH12, parseH11, parseH12 } from "../src";

const TODAY = "2026-11-03"; // Tuesday

// [text, expected DSL]. Phrases added by h12: nth-weekday conjunctions, a time per weekday, start and until clauses.
const cases: [string, string][] = [
  // nth weekdays of different weekdays
  ["every third tuesday and second monday of each month", "d R m/1 mo#2,tu#3"],
  ["first and third tuesday of every month", "d R m/1 tu#1,tu#3"],
  ["every first monday and last friday of the month", "d R m/1 mo#1,fr#-1"],
  ["second tuesday and fourth thursday of every month", "d R m/1 tu#2,th#4"],
  ["first monday and third friday of every month at 3pm", "dt R m/1 mo#1,fr#3 15:00"],
  ["1st & 3rd saturday monthly", "d R m/1 sa#1,sa#3"],
  ["2nd wednesdays", "d R m/1 we#2"],
  ["every third tuesday and second monday of each month until june", "d R m/1 mo#2,tu#3 bM@06"],
  // a separate time per weekday
  ["tuesdays at 1:30 and thursdays at 3", "dt R w/1 tu@1:30?,th@3?"],
  ["every tuesday at 9am and thursday at 2pm", "dt R w/1 tu@09:00,th@14:00"],
  ["tuesdays at 1:30 and thursdays at 3pm until dec 31", "dt R w/1 tu@1:30?,th@15:00 u12-31"],
  ["mondays at 9, wednesdays at 10:30 and fridays at noon", "dt R w/1 mo@9?,we@10:30?,fr@12:00"],
  ["tuesdays at 3 and thursdays at 3", "dt R w/1 tu,th 3?"],
  ["every tue and thu at 6 and sat at 9am", "dt R w/1 tu@6?,th@6?,sa@09:00"],
  ["mon 6pm for 90 min and fri 12pm for 45 min weekly", "dt R w/1 mo@18:00>+90m,fr@12:00>+45m"],
  ["wed 0900-1030 sat 1300-1400 each week thru june", "dt R w/1 we@09:00>10:30,sa@13:00>14:00 u06-30"],
  ["every other fri at 4pm and mon at noon til april", "dt R w/2 mo@12:00,fr@16:00 bM@04"],
  ["wed at 5 and sat at noon for 7 weeks", "dt R w/1 we@5?,sa@12:00 n14"],
  // registrar codes
  ["MW 10:50 AM 12:10 PM", "dt R w/1 mo,we 10:50>12:10"],
  ["TR 8 - 9:15 am", "dt R w/1 tu,th 08:00>09:15"],
  ["mw 10:50 am 12:10 pm", "dt R w/1 mo,we 10:50>12:10"], // the picker lowercases its input
  ["tr 8 - 9:15 am", "dt R w/1 tu,th 08:00>09:15"],
  ["mr smith 3pm", "t 15:00"], // "mr" is a title, not a weekday code
  // start and until bounds
  ["every wednesday starting in june", "d R w/1 we sM@06"],
  ["every other wed starting last week", "d R w/2 we sW-1"],
  ["every third wednesday starting in june", "d R m/1 we#3 sM@06"], // h11 reads "every third wednesday" as monthly; the spec marks it ambiguous
  ["every weekday starting monday", "d R d/1 mo,tu,we,th,fr smo"],
  ["monthly on the 15th starting in june", "d R m/1 d15 sM@06"],
  ["mondays starting next week", "d R w/1 mo sW+1"],
  ["every monday until april", "d R w/1 mo bM@04"],
  ["every monday through april", "d R w/1 mo u04-30"],
  ["every other friday until jan", "d R w/2 fr bM@01"],
  ["every friday until the end of may", "d R w/1 fr uM@05"],
  ["every friday until jan 15", "d R w/1 fr u01-15"],
  ["every monday until next week", "d R w/1 mo bW+1"],
  ["daily until 2027", "d R d/1 bY@2027"],
  ["daily through 2027", "d R d/1 uY@2027"],
  ["every 8 weeks starting thursday", "d R w/8 th"],
  ["every friday at 2pm starting next month until the end of the year", "dt R w/1 fr uY+0 14:00 sM+1"],
  ["every monday and wednesday starting next week until the end of next month", "d R w/1 mo,we uM+1 sW+1"],
  ["mondays from september to december", "d R w/1 mo uM@12 sM@09"],
  // weekday ranges and plural lists
  ["mondays through wednesdays", "d R w/1 mo,tu,we"],
  ["every mon thru fri at 8", "dt R d/1 mo,tu,we,th,fr 8?"],
  ["tuesdays and fridays at 5:30pm", "dt R w/1 tu,fr 17:30"],
  // guards: unchanged behavior
  ["monday to saturdays", "d mo>sa"],
  ["mon 9am and wed 2pm", "dt mo 09:00"],
  ["fortnight from today", "d +2w"],
  ["tuesday", "d tu"],
  ["weds 11a", "dt we 11:00"],
  ["TMRW AT 5:15", "dt +1d 5:15?"],
  ["weekends since oct", "d R w/1 sa,su u+0d sM@10<"],
  ["every other day starting monday", "d R d/2 smo"],
];

describe("h12", () => {
  beforeAll(async () => {
    await loadH12();
  });

  it.each(cases)("%s", (text, dsl) => {
    expect(parseH12(text, TODAY)).toBe(dsl);
  });

  it("every output parses and round-trips", () => {
    for (const [text] of cases) {
      const out = parseH12(text, TODAY);
      expect(parseDsl(out).mode, `${text} -> ${out}`).not.toBe("x");
      expect(serializeDsl(parseDsl(out)), text).toBe(out);
    }
  });

  it("per-weekday times resolve to one time per weekday", () => {
    const r = resolveDsl(parseH12("tuesdays at 1:30 and thursdays at 3", TODAY), { today: TODAY });
    expect(r.recurrence?.dayTimes).toEqual([
      { wd: "tu", start: "13:30" },
      { wd: "th", start: "15:00" },
    ]);
  });

  it("h11 behavior is unchanged for phrases without conjunctions or bounds", () => {
    for (const t of ["oct 2 to oct 5", "every other sunday", "last friday", "4 to 4:30", "tomorrow at 3pm", "christmas"]) {
      expect(parseH12(t, TODAY), t).toBe(parseH11(t, TODAY));
    }
  });
});
