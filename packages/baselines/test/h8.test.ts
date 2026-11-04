import { beforeAll, describe, expect, it } from "vitest";
import { h8, loadH7Lazy, parseH7, parseH8 } from "../src";
import { scoreDozen } from "../src/h8/score";
import { normalize } from "../src/h8/normalize";

// Text h8 must leave alone, and parse as h7 does.
const same = ["oct 2 to oct 5", "last friday", "tomorrow at 3pm", "buy milk", "5 stars", "room 214 b", "every other sunday", "10:30 pst today", "non-refundable fee", "submit the form by friday", "yeah sat works", "mon-fri 9 to 5", "friday9am", "meet at 5 next month", "tomnight", "reminder: call mom", "from jan 5 on", "3 months ago", "monday at 11:50 am to months ago"];

// [typo, clean]: both must give the same DSL.
const pairs: [string, string][] = [
  ["tomorow at 3pm", "tomorrow at 3pm"],
  ["Thrsdy 3pm", "Thursday 3pm"],
  ["next wensday", "next wednesday"],
  ["mndy at 9", "monday at 9"],
  ["every thrus", "every thurs"],
  ["every wends", "every wed"],
  ["agu 3rd", "aug 3rd"],
  ["mai 31", "may 31"],
  ["novmber 4", "november 4"],
  ["marhc 3", "march 3"],
  ["tom evning", "tom evening"],
  ["lst June 13", "last June 13"],
  ["pst 2 wknds", "past 2 weekends"],
  ["all of last mnth", "all of last month"],
  ["frm now to mnth end", "from now to month end"],
  ["wkdays for the nxt 4 wks", "weekdays for the next 4 weeks"],
  ["weekdays ovr teh coming 3 wks", "weekdays over the coming 3 weeks"],
  ["28 mins to seven", "28 minutes to seven"],
  ["today 4pm 2 today 4:30pm", "today 4pm to today 4:30pm"],
  ["from 9 2 11 on sat", "from 9 to 11 on saturday"],
  ["2nd n 4th friday ea month", "2nd and 4th friday each month"],
  ["evry friday til christmas", "every friday until christmas"],
  ["tuesdays every septmber annualy", "tuesdays every september annually"],
  ["dentist 2:30 fr 45 minutes", "dentist 2:30 for 45 minutes"],
  ["pls send 4 the rest of the mth", "pls send for the rest of the month"],
  ["tonite 2nite", "tonite tonight"],
  ["1200 dys ago", "1200 days ago"],
  ["saturdys 9am weekly", "saturdays 9am weekly"],
  ["9 thirty tomorow", "nine thirty tomorrow"],
  ["@ 11:10am every dy", "at 11:10am every day"],
];

beforeAll(async () => {
  await loadH7Lazy();
});

describe("h8", () => {
  for (const t of same) it(`leaves ${JSON.stringify(t)} as h7 does`, () => expect(parseH8(t)).toBe(parseH7(t)));
  for (const [typo, clean] of pairs) it(`${JSON.stringify(typo)} parses as ${JSON.stringify(clean)}`, () => expect(parseH8(typo)).toBe(parseH8(clean)));
  it("does not rewrite an unfinished last word", () => {
    expect(normalize("every thu")).toBe("every thu");
    expect(normalize("tomorr")).toBe("tomorr");
  });
  it("keeps plural weekdays and units", () => {
    expect(normalize("saturdys")).toBe("saturdays");
    expect(normalize("3 weaks")).toBe("3 weeks");
  });
  it("returns the clean text unchanged", () => {
    for (const t of same) expect(normalize(t)).toBe(t);
  });
  const rel: [string, string][] = [
    ["13th of last month", "d D13@M-1"],
    ["the 15th of next month", "d D15@M+1"],
    ["last month on the 3rd", "d D03@M-1"],
    ["the 1st of this month", "d D01@M+0"],
    ["3rd of last month at 3pm", "dt D03@M-1 15:00"],
    ["13th of lst mnth", "d D13@M-1"],
    ["the 15th of nxt mth", "d D15@M+1"],
    ["the 1st of ths month", "d D01@M+0"],
    ["the 6th, this month", "d D06@M+0"],
    ["the 17th of the month before last", "d D17@M-2"],
    ["the 22nd of two months from now", "d D22@M+2"],
    ["next month, the 9th", "d D09@M+1"],
    ["19 next month", "d D19@M+1"],
    ["thirtieth of last month", "d D30@M-1"],
    ["the 12th next month at 5:30pm", "dt D12@M+1 17:30"],
    ["24th of a month ago", "d D24@M-1"],
  ];
  for (const [t, d] of rel) it(`${JSON.stringify(t)} -> ${d}`, () => expect(parseH8(t)).toBe(d));
  const sc: [string, string][] = [
    ["four score and seven years ago", "d -87y"],
    ["three score and ten years ago", "d -70y"],
    ["a dozen days ago", "d -12d"],
    ["two dozen days ago", "d -24d"],
    ["half a dozen days ago", "d -6d"],
    ["a score of years ago", "d -20y"],
    ["in four score and seven years", "d +87y"],
    ["2 score weeks ago", "d -40w"],
    ["a fortnight ago", "d -2w"],
  ];
  for (const [t, d] of sc) it(`${JSON.stringify(t)} -> ${d}`, () => expect(parseH8(t)).toBe(d));
  it("leaves other uses of score and dozen alone", () => {
    for (const t of ["final score at 7pm", "score 3 days", "the score was 4 to 2 at 5pm", "a dozen eggs tomorrow", "dozen donuts friday 3pm", "four score", "score and seven years ago"]) expect(scoreDozen(t)).toBe(t);
  });
  it("is an engine", async () => {
    const r = await h8.predict("tomorow at 3pm");
    expect(r.dsl).toBe(parseH7("tomorrow at 3pm"));
  });
});
