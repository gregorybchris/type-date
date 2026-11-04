import { describe, expect, it } from "vitest";
import { heuristicSmall, parseSmall } from "../src";

const cases: [string, string][] = [
  ["oct 2 to oct 5", "d 10-02>10-05"],
  ["oct 2 to 5", "d 10-02>10-05"],
  ["last friday", "d fr-1"],
  ["next monday", "d mo+1"],
  ["every other sunday", "d R w/2 su"],
  ["4 to 4:30", "t 4?>4:30?"],
  ["tomorrow at 3pm", "dt +1d 15:00"],
  ["next monday 9am to 5pm", "dt mo+1 09:00>17:00"],
  ["dec 25", "d 12-25"],
  ["in 2 weeks", "d +2w"],
  ["3 days ago", "d -3d"],
  ["every weekday at 9", "dt R d/1 mo,tu,we,th,fr 9?"],
  ["first monday of march", "d mo#1@03"],
  ["monthly on the 15th", "d R m/1 d15"],
  ["from 2pm tomorrow to 4pm friday", "dt +1d 14:00>fr 16:00"],
  ["march 3 2027", "d 2027-03-03"],
  ["noon", "t 12:00"],
  ["next week", "d W+1"],
  ["october", "d M@10"],
  ["every other friday until dec 31", "d R w/2 fr u12-31"],
  ["every day for 2 weeks", "d R d/1 n14"],
  ["jan 5 at 7pm", "dt 01-05 19:00"],
  ["2027-03-14", "d 2027-03-14"],
  ["3/15", "d 03-15"],
  ["this weekend", "d sa>su"],
  ["friday 2-4pm", "dt fr 14:00>16:00"],
  ["5 to 9am", "t 05:00>09:00"],
  ["christmas", "d 12-25"],
  ["asdf", "x"],
  ["buy milk", "x"],
];

describe("heuristic-small", () => {
  for (const [text, dsl] of cases) {
    it(`${text} -> ${dsl}`, () => expect(parseSmall(text)).toBe(dsl));
  }

  it("lowercases and collapses whitespace itself", () => {
    expect(parseSmall("  OCT   2 TO OCT 5 ")).toBe("d 10-02>10-05");
  });

  it("implements the Engine interface", async () => {
    await heuristicSmall.load({ baseUrl: "" });
    expect((await heuristicSmall.predict("tomorrow")).dsl).toBe("d +1d");
  });
});
