import { beforeAll, describe, expect, it } from "vitest";
import { resolveDsl } from "@type-date/core";
import { loadH15, parseH15 } from "../src";

const TODAY = "2026-11-21"; // Saturday

// [text, expected DSL]. Policy: specs/dsl.md, "Offsets from now, relative weekends, parts of a month".
const cases: [string, string][] = [
  // the three phrases from the request
  ["next weekend", "d WKND+1"],
  ["2 hours from now", "dt now+2h"],
  ["the last weekend of october", "d WKND#-1@10"],
  // relative weekends
  ["this weekend", "d WKND+0"],
  ["over the weekend", "d WKND+0"],
  ["last weekend", "d WKND-1"],
  ["the weekend just gone", "d WKND-1"],
  ["the weekend after next", "d WKND+2"],
  ["the weekend before last", "d WKND-2"],
  ["2 wknds ago", "d WKND-2"],
  ["nxt wknd", "d WKND+1"],
  ["this coming weekend", "d sa>su"],
  ["in 3 weekends", "d sa+3>su"],
  ["next weekend at 10am", "dt WKND+1 10:00"],
  ["sunday of next weekend", "d su@WKND+1"],
  ["next weekend sat 2-4pm", "dt sa@WKND+1 14:00>16:00"],
  ["this weekend through monday", "d WKND+0>mo"],
  ["every weekend", "d R w/1 sa,su"],
  ["over the weekend of jan 23-25", "d 01-23>01-25"],
  ["the weekend after this one", "x"],
  // offsets from now
  ["in 2 hours", "dt now+2h"],
  ["in 45 mins", "dt now+45m"],
  ["in an hour and a half", "dt now+90m"],
  ["in 1h30", "dt now+90m"],
  ["in half an hour", "dt now+30m"],
  ["remind me in twenty minutes", "dt now+20m"],
  ["in 120 minutes", "dt now+2h"],
  ["2 hrs ago", "dt now-2h"],
  ["right now", "dt now"],
  ["in 1 hour GMT", "dt now+1h"],
  ["for the next 2 hrs", "dt now>+2h"],
  ["within the next hour", "dt now>+1h"],
  ["now until 5pm", "dt now>17:00"],
  ["from now till midnight", "dt now>00:00"],
  ["until 3 hours from now", "dt >now+3h"],
  ["in 2 hrs for 30 min", "dt now+2h>+30m"],
  ["for the past 2 hours", "dt now-2h>now"],
  ["this time tomorrow", "dt now+1d"],
  ["same time next week", "dt now+1w"],
  ["in 2 days and 3 hours", "dt now+51h"],
  ["in 3 days", "d +3d"],
  ["2 hours", "x"],
  ["in a few minutes", "x"],
  ["2 hours before the meeting", "x"],
  // parts of a month
  ["first weekend of next month", "d WKND#1@M+1"],
  ["last weekend of the month", "d WKND#-1@M+0"],
  ["the 3rd weekend in june 2027", "d WKND#3@2027-06"],
  ["october's last weekend", "d WKND#-1@10"],
  ["the first week of january", "d W#1@01"],
  ["last week of next month", "d W#-1@M+1"],
  ["2nd week of next month around 10am", "dt W#2@M+1 10:00"],
  ["last week", "d W-1"],
  ["the last day of october", "d 10-31"],
  ["the last day of february", "d 03-01~-1d"],
  ["last day of the month", "d D01@M+1~-1d"],
  ["last day of feb 2028", "d 2028-02-29"],
  ["the first monday of october 2027", "d mo#1@2027-10"],
  ["every day until the last weekend of october", "d R d/1 uWKND#-1@10"],
  ["the last weekend of every month", "x"],
  ["first full week of march", "x"],
];

beforeAll(loadH15);

describe("h15", () => {
  for (const [text, dsl] of cases) {
    it(text, () => expect(parseH15(text, TODAY)).toBe(dsl));
  }
  it("leaves other phrases to h14", () => {
    expect(parseH15("tomorrow at 3pm", TODAY)).toBe("dt +1d 15:00");
  });
  it("resolves the request's phrases", () => {
    const at = (dsl: string, today: string, now?: string) => resolveDsl(dsl, { today, now });
    // Wednesday: next weekend is this week's; Thursday: the following one
    expect(at(parseH15("next weekend", TODAY), "2026-11-25").start?.date).toBe("2026-11-28");
    expect(at(parseH15("next weekend", TODAY), "2026-11-26").start?.date).toBe("2026-12-05");
    expect(at(parseH15("2 hours from now", TODAY), "2026-11-21", "2026-11-21T23:15").start).toEqual({ date: "2026-11-22", time: "01:15" });
    const oct = at(parseH15("the last weekend of october", TODAY), "2026-10-01");
    expect([oct.start?.date, oct.end?.date]).toEqual(["2026-10-31", "2026-11-01"]);
  });
});
