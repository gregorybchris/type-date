import { beforeAll, describe, expect, it } from "vitest";
import { loadH9Lazy, parseH8, parseH9 } from "../src";
import { resolveDsl } from "../../core/src";

beforeAll(async () => {
  await loadH9Lazy();
});

const today = "2026-11-04";
// [text, expected DSL, resolved start date for today 2026-11-04 (or "" when not a single date)]
const phrases: [string, string, string][] = [
  ["the ides of march", "d 03-15", "2027-03-15"],
  ["may the fourth", "d 05-04", "2027-05-04"],
  ["pi day", "d 03-14", "2027-03-14"],
  ["next leap day", "d 02-29", "2028-02-29"],
  ["next friday the 13th", "d fr&D13", "2026-11-13"],
  ["last friday of the month", "d fr#-1@M+0", "2026-11-27"],
  ["every other sunday", "d R w/2 su", ""],
  ["every weekday for two weeks", "d R d/1 mo,tu,we,th,fr n10", ""],
  ["the day after the day after tomorrow", "d +3d", "2026-11-07"],
  ["a couple weeks from next tuesday", "d tu+1~+2w", "2026-11-24"],
  ["half past nine the day after tomorrow", "dt +2d 9:30?", "2026-11-06"],
  ["this weekend through monday", "d sa>mo", "2026-11-07"],
  ["the first of next month until the 15th", "d D01@M+1>D15@M+1", "2026-12-01"],
  ["business days from nov 2 to nov 20", "d R d/1 mo,tu,we,th,fr u11-20 s11-02", ""],
  ["weekdays from nov 2 to nov 20", "d R d/1 mo,tu,we,th,fr u11-20 s11-02", ""],
  ["the last weekday of the month", "d b#-1@M+0", "2026-11-30"],
  ["every first friday", "d R m/1 fr#1", ""],
];

describe("h9 phrases", () => {
  for (const [t, d, date] of phrases) {
    it(`${JSON.stringify(t)} -> ${d}`, () => {
      expect(parseH9(t)).toBe(d);
      if (date) expect(resolveDsl(d, { today }).start?.date).toBe(date);
    });
  }
});

describe("h9 more forms", () => {
  const cases: [string, string][] = [
    ["every last friday", "d R m/1 fr#-1"],
    ["the first monday of next month", "d mo#1@M+1"],
    ["second monday of the month", "d mo#2@M+0"],
    ["last friday of this month at 5pm", "dt fr#-1@M+0 17:00"],
    ["first business day of next month", "d b#1@M+1"],
    ["the ides of october", "d 10-15"],
    ["the ides of june", "d 06-13"],
    ["leap day at noon", "dt 02-29 12:00"],
    ["bastille day", "d 07-14"],
    ["the next tuesday the 1st", "d tu&D01"],
    ["the next saturday the 30th at 9pm", "dt sa&D30 21:00"],
    ["the week after next", "d W+2"],
    ["the sunday before last", "d su-2"],
    ["five days after the day after tomorrow", "d +2d~+5d"],
    ["from the 3rd to the 9th", "d D@03>D@09"],
    ["from friday until the end of the month", "d fr>M+0"],
    ["from the 18th to the 22nd of next month", "d D18@M+1>D22@M+1"],
    ["business days until the 20th", "d R d/1 mo,tu,we,th,fr uD@20"],
    ["every tuesday and thursday until the end of the month", "d R w/1 tu,th uM+0"],
    ["every other day for 12 days", "d R d/2 n6"],
    ["every tuesday for 3 weeks starting the 10th", "d R w/1 tu n3 sD@10"],
    ["weekdays but skip friday", "d R d/1 mo,tu,we,th"],
    ["twenty minutes to seven", "t 6:40?"],
    ["A380 tomorrow", "d +1d"],
    ["@every friday", "d R w/1 fr"],
    ["13 de junio de 2003", "d 2003-06-13"],
    ["jan 3rd 2027 till jan 10th", "d 2027-01-03>2027-01-10"],
    ["every 2 fridays", "d R w/2 fr"],
  ];
  for (const [t, d] of cases) it(`${JSON.stringify(t)} -> ${d}`, () => expect(parseH9(t)).toBe(d));
});

describe("h9 lone hour words", () => {
  const ok: [string, string][] = [
    ["one", "t 1?"], ["two", "t 2?"], ["three", "t 3?"], ["nine", "t 9?"], ["ten", "t 10?"], ["eleven", "t 11?"], ["twelve", "t 12?"],
    ["Nine.", "t 9?"], ["  Three ", "t 3?"], ["nien", "t 9?"], ["thre", "t 3?"], ["elevn", "t 11?"], ["three oclock", "t 3?"], ["three o'clock", "t 3?"],
    ["tomorrow three", "dt +1d 3?"], ["at three", "t 3?"], ["3", "t 3?"],
  ];
  for (const [t, d] of ok) it(`${JSON.stringify(t)} -> ${d}`, () => expect(parseH9(t)).toBe(d));
  // not hours: other lone words, digits outside 1-12, ordinals, words in sentences
  for (const t of ["no", "to", "fine", "tent", "eighth", "thirteen", "0", "13", "14", "18", "23", "24", "one of these days", "ten percent"]) {
    it(`${JSON.stringify(t)} is not a lone hour`, () => expect(parseH9(t)).toBe(parseH8(t)));
  }
});

describe("h9 leaves ordinary text alone", () => {
  for (const t of ["oct 2 to oct 5", "last friday", "tomorrow at 3pm", "buy milk", "every other sunday", "mon-fri 9 to 5", "room 214 b", "first monday of march"]) {
    it(JSON.stringify(t), () => expect(parseH9(t)).toBe(parseH8(t)));
  }
});
