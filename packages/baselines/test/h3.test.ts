import { describe, expect, it } from "vitest";
import { h3, parseH2, parseH3 } from "../src";

// Phrases h2 handles must not change.
const same = ["oct 2 to oct 5", "last friday", "every other sunday", "4 to 4:30", "tomorrow at 3pm", "next monday 9am to 5pm", "in 2 weeks", "first monday of march", "monthly on the 15th", "every other friday until dec 31", "nextwednesday2Pm", "oct 2 t", "every tu", "asdf", "buy milk", "mondays are the worst", "may i ask", "5 stars"];

const cases: [string, string][] = [
  // unknown words around the phrase
  ["pls book fri 3pm", "dt fr 15:00"],
  ["remind me tmrw at 7", "dt +1d 7?"],
  ["can u do thurs at 7am?", "dt th 07:00"],
  ["hi can we meet next thursday at 4", "dt th+1 4?"],
  ["dentist thurs 3pm", "dt th 15:00"],
  ["note to self gas on thursday", "d th"],
  ["ugh ok tuesday then, 8:30", "dt tu 8:30?"],
  ["bridal shower aug 9", "d 08-09"],
  ["spring break mar 14 - 22", "d 03-14>03-22"],
  ["standup every weekday at 9:15 sharp", "dt R d/1 mo,tu,we,th,fr 9:15?"],
  // day parts: date only without a clock time, am/pm with one
  ["tonight", "d +0d"],
  ["tonite at 10pm", "dt +0d 22:00"],
  ["this evening", "d +0d"],
  ["call mom sat morning", "d sa"],
  ["sat morning at 9:30", "dt sa 09:30"],
  ["tonight at 11", "dt +0d 23:00"],
  ["every morning at 7", "dt R d/1 07:00"],
  // one-letter meridiem, o'clock, spelled times
  ["7a to 3p", "t 07:00>15:00"],
  ["sat 9:30a", "dt sa 09:30"],
  ["ten o'clock tonight", "dt +0d 22:00"],
  ["quarter to eight tonight", "dt +0d 19:45"],
  ["ten past eight tonight", "dt +0d 20:10"],
  ["at 6 and 30", "t 6:30?"],
  ["lights out at ten", "t 10?"],
  // weekday with an explicit date
  ["Fri, Nov 6", "d 11-06"],
  ["tues 14 oct", "d 10-14"],
  ["Thu Nov 12 3pm", "dt 11-12 15:00"],
  ["wed jan 7", "d 01-07"],
  // offsets, periods, recurrences
  ["send invites 8 wks out", "d +8w"],
  ["nxt wk mon", "d mo+1"],
  ["week of oct 14", "d 10-14"],
  ["bi-weekly fridays", "d R w/2 fr"],
  ["every fortnight on friday", "d R w/2 fr"],
  ["the 1st and 15th every month", "d R m/1 d1,d15"],
  ["pickup at 3:20 weekdays", "dt R d/1 mo,tu,we,th,fr 3:20?"],
  ["canada day", "d 07-01"],
  // not dates
  ["family day", "x"],
  ["room 214 b", "x"],
  ["mondays random", "x"],
];

describe("h3", () => {
  for (const t of same) it(`keeps ${t}`, () => expect(parseH3(t)).toBe(parseH2(t)));
  for (const [text, dsl] of cases) it(`${text} -> ${dsl}`, () => expect(parseH3(text)).toBe(dsl));
  it("implements the Engine interface", async () => {
    await h3.load({ baseUrl: "" });
    expect((await h3.predict("Oct   2")).dsl).toBe("d 10-02");
  });
});
