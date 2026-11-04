import { describe, expect, it } from "vitest";
import { parseDsl, resolveDsl } from "@type-date/core";
import { h1, parseH1 } from "../src";

const cases: [string, string][] = [
  ["oct 2 to oct 5", "d 10-02>10-05"],
  ["oct 2 to 5", "d 10-02>10-05"],
  ["3 to 6 jun", "d 06-03>06-06"],
  ["last friday", "d fr-1"],
  ["every other sunday", "d R w/2 su"],
  ["4 to 4:30", "t 4?>4:30?"],
  ["1 to 3 pm", "t 13:00>15:00"],
  ["tomorrow at 3pm", "dt +1d 15:00"],
  ["next monday 9am to 5pm", "dt mo+1 09:00>17:00"],
  ["dec 25", "d 12-25"],
  ["in 2 weeks", "d +2w"],
  ["a week from now", "d +1w"],
  ["every weekday at 9", "dt R d/1 mo,tu,we,th,fr 9?"],
  ["first monday of march", "d mo#1@03"],
  ["the last friday of october", "d fr#-1@10"],
  ["monthly on the 15th", "d R m/1 d15"],
  ["from 2pm tomorrow to 4pm friday", "dt +1d 14:00>fr 16:00"],
  ["march 3 2027", "d 2027-03-03"],
  ["twenty first april 9:10am", "dt 04-21 09:10"],
  ["noon", "t 12:00"],
  ["next week", "d W+1"],
  ["october", "d M@10"],
  ["every other friday until dec 31", "d R w/2 fr u12-31"],
  ["every day for 2 weeks", "d R d/1 n14"],
  ["every two weeks on wed at 1:30 pm starting aug 8", "dt R w/2 we 13:30 s08-08"],
  ["labor day", "d mo#1@09"],
  ["thanksgiving", "d th#4@11"],
  ["tmrw 8:30pm", "dt +1d 20:30"],
  ["asdf", "x"],
  ["to", "x"],
  // typos, glued words, casing
  ["nexr saturday", "d sa+1"],
  ["nextwednesday2Pm", "dt we+1 14:00"],
  ["LAST  FRIDAT", "d fr-1"],
  ["decenber 16", "d 12-16"],
  // partial input: the committed part
  ["oct 2 t", "d 10-02"],
  ["oct 2 to", "d 10-02"],
  ["every tu", "d R w/1 tu"],
];

describe("h1", () => {
  for (const [text, dsl] of cases) {
    it(`${text} -> ${dsl}`, () => {
      expect(parseH1(text)).toBe(dsl);
    });
  }

  it("emits valid DSL", () => {
    for (const [text] of cases) expect(parseDsl(parseH1(text)).mode, text).toBeDefined();
    expect(resolveDsl(parseH1("tomorrow at 3pm"), { today: "2026-11-03" }).start?.date).toBe("2026-11-04");
  });

  it("implements the Engine interface", async () => {
    await h1.load({ baseUrl: "" });
    expect((await h1.predict("Oct   2")).dsl).toBe("d 10-02");
  });
});
