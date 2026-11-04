import { describe, expect, it } from "vitest";
import { parseFull5, parseFull6 } from "../src";

const same = ["oct 2 to oct 5", "last friday", "tomorrow at 3pm", "pls book fri 3pm", "buy milk", "5 stars", "room 214 b", "February 30, 2014", "29-FEB-2016"];

const cases: [string, string][] = [
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

describe("heuristic-full-6", () => {
  for (const t of same) it(`keeps v5 on "${t}"`, () => expect(parseFull6(t, "2026-11-03")).toBe(parseFull5(t, "2026-11-03")));
  for (const [t, e] of cases) it(`"${t}"`, () => expect(parseFull6(t, "2026-11-03")).toBe(e));
});
