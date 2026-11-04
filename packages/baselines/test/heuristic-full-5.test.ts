import { describe, expect, it } from "vitest";
import { heuristicFull5, parseFull4, parseFull5 } from "../src";

const same = ["oct 2 to oct 5", "last friday", "every other sunday", "tomorrow at 3pm", "pls book fri 3pm", "Saturdays 10-11 a.m., June 6 through July 25", "a week from tomorrow", "friday after next", "buy milk", "5 stars", "room 214 b"];

const cases: [string, string][] = [
  // formats
  ["2001/9/3", "d 2001-09-03"],
  ["2014-12-28", "d 2014-12-28"],
  ["20241228", "d 2024-12-28"],
  ["28.12.2024", "d 2024-12-28"],
  ["12-31-1999 23:59", "dt 1999-12-31 23:59"],
  ["29-FEB-2016", "d 2016-02-29"],
  ["8/Oct/2012", "d 2012-10-08"],
  ["2018-Nov-05", "d 2018-11-05"],
  ["3 Aug 96", "d 1996-08-03"],
  ["Dec 31 99", "d 1999-12-31"],
  ["Aug 9 '96", "d 1996-08-09"],
  ["31/12/99", "d 1999-12-31"],
  ["12/28/24", "d 2024-12-28"],
  ["July 4, 1776", "d 1776-07-04"],
  ["10:00:00", "t 10?"],
  ["1:05:09 am", "t 01:05"],
  ["2022-11-15T18:30:00+02:00", "dt 2022-11-15 18:30"],
  // impossible dates and times are not dates
  ["February 30, 2014", "x"],
  ["2024-13-01", "x"],
  ["Due 2023-02-29 per the spreadsheet", "x"],
  ["Feb 29 2023", "x"],
  ["Feb 29 2024", "d 2024-02-29"],
  ["Sept 31", "x"],
  ["Oct 0", "x"],
  ["11/31", "x"],
  ["25:00", "x"],
  ["Meeting at 25:70 tomorrow", "x"],
  // not dates
  ["Mile 26.2", "x"],
  ["Release 2.5 notes", "x"],
  ["1/2 cup", "x"],
  ["Download 250 MB by 12/28/24", "d 2024-12-28"],
  ["I'm at 10", "x"],
  ["Take 2 tablets at 11p", "t 23:00"],
  // relative
  ["2 days later", "d +2d"],
  ["next day", "d +1d"],
  ["a week before yesterday", "d -8d"],
  ["2 day after tomorrow", "d +3d"],
  ["two days after yesterday", "d +1d"],
  ["the day after the day after tomorrow", "d +3d"],
  ["-10d", "d -10d"],
  ["+6m", "d +6m"],
  ["3w later", "d +3w"],
  ["a fortnight ago", "d -2w"],
  ["1 mon from now", "d +1m"],
  ["last night", "d -1d"],
  ["ten to seven", "t 6:50?"],
];

describe("heuristic-full-5", () => {
  for (const t of same) it(`keeps ${t}`, () => expect(parseFull5(t)).toBe(parseFull4(t)));
  for (const [text, dsl] of cases) it(`${text} -> ${dsl}`, () => expect(parseFull5(text)).toBe(dsl));
  it("implements the Engine interface", async () => {
    await heuristicFull5.load({ baseUrl: "" });
    expect((await heuristicFull5.predict("Oct   2")).dsl).toBe("d 10-02");
  });
});
