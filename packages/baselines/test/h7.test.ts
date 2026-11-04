import { beforeAll, describe, expect, it } from "vitest";
import { h7, loadH7Lazy, parseH6, parseH7, parseH7Async } from "../src";

const same = ["oct 2 to oct 5", "last friday", "tomorrow at 3pm", "pls book fri 3pm", "buy milk", "5 stars", "room 214 b", "February 30, 2014", "29-FEB-2016", "every other sunday", "after 2pm", "first monday of march"];

const old: [string, string][] = [
  ["after 2pm", "t 14:00>"],
  ["Doors open after noon tomorrow", "dt +1d 12:00>"],
  ["due on the 15th", "d D@15"],
  ["the 30th at 8pm", "dt D@30 20:00"],
  ["1st and 3rd fridays of every month", "d R m/1 fr#1,fr#3"],
  ["last friday of every month at 5pm", "dt R m/1 fr#-1 17:00"],
    ["the saturday after thanksgiving", "d th#4@11~+2d"],
  ["3 business days after dec 1", "d 12-01~+3b"],
  ["2 days b4 oct 31", "d 10-31~-2d"],
  ["mon, wed, fri", "d mo,we,fr"],
  ["sat and sun", "d sa,su"],
  ["august 2027", "d 2027-08-01>2027-08-31"],
  ["every monday in 2027", "d R w/1 mo u2027-12-31 s2027-01-01"],
  ["x 99 zz", "x"],
];

const web: [string, string][] = [
  ["January 1, 1825", "d 1825-01-01"],
  ["Sunday 23 May 1856 12:09:08 AM", "dt 1856-05-23 00:09"],
  ["2011-07-03 16:11:35 -05:00", "dt 2011-07-03 16:11"],
  ["Sat Aug 17 2013 18:40:39 GMT+0900 (JST)", "dt 2013-08-17 18:40"],
  ["10:30-11:15", "t 10:30?>11:15?"],
  ["December 16, 2007 - 12:51 AM", "dt 2007-12-16 00:51"],
  ["06/16/2022-05:00 PM", "dt 2022-06-16 17:00"],
  ["At 09:46 AM, only on Monday", "dt R w/1 mo 09:46"],
  ["tom morning", "d +1d"],
  ["now - 1 day", "d -1d"],
  ["today + 12 days", "d +12d"],
  ["3d", "d +3d"],
  ["0 days ago", "d +0d"],
  ["1 monday ago", "d mo-1"],
  ["next June 13", "d 06-13"],
  ["3rd thursday this september", "d th#3@09"],
  ["starting May 13th repeat every other day", "d R d/2 s05-13"],
  ["from today", "d +0d>"],
  ["through 2014", "d >2014-12-31"],
  ["Monthly on the 2nd and 15th of the month for 10 occurrences", "d R m/1 d2,d15 n10"],
  ["Daily until December 24, 1997", "d R d/1 u1997-12-24"],
  ["03 11 2026", "d 2026-03-11"],
  ["the 1st day of March 2015", "d 2015-03-01"],
  ["twenty sixth of june nineteen eighty one", "d 1981-06-26"],
  ["dec 6th thursday", "d 12-06"],
  ["next 3 m/th/f", "d mo+1,mo+2,mo+3,th+1,th+2,th+3,fr+1,fr+2,fr+3"],
  ["next 2 mon and fri", "d mo+1,mo+2,fr+1,fr+2"],
  ["dec 6th thur twenty sixth", "d 12-06"],
];

describe("h7", () => {
  beforeAll(async () => {
    await loadH7Lazy();
  });
  for (const t of same) it(`keeps v6 on "${t}"`, () => expect(parseH7(t, "2026-11-03")).toBe(parseH6(t, "2026-11-03")));
  for (const [t, e] of old) it(`v6 case "${t}"`, () => expect(parseH7(t, "2026-11-03")).toBe(e));
  for (const [t, e] of web) it(`web "${t}"`, () => expect(parseH7(t, "2026-11-03")).toBe(e));
  it("the engine loads the lazy part on demand", async () => {
    expect((await h7.predict("every other month", undefined, { today: "2026-11-03" })).dsl).toBe("d R m/2");
    expect(await parseH7Async("tomorrow at 3pm")).toBe("dt +1d 15:00");
  });
});
