import { beforeAll, describe, expect, it } from "vitest";
import { resolveDsl } from "@type-date/core";
import { loadH16, parseH16 } from "../src";

const TODAY = "2026-11-21";

// [text, expected DSL]. Policy: specs/dsl.md, "Lunar and lunisolar holidays".
const cases: [string, string][] = [
  ["diwali", "d L:diwali+0"],
  ["on diwali", "d L:diwali+0"],
  ["next diwali", "d L:diwali+0"],
  ["this coming diwali", "d L:diwali+0"],
  ["Chinese New Year", "d L:lny+0"],
  ["cny", "d L:lny+0"],
  ["tet", "d L:lny+0"],
  ["mid autumn festival", "d L:midautumn+0"],
  ["chuseok", "d L:midautumn+0"],
  ["dragon boat festival", "d L:dragonboat+0"],
  ["holi", "d L:holi+0"],
  ["eid", "d L:eid+0"],
  ["eid al fitr", "d L:eidfitr+0"],
  ["Eid ul-Adha", "d L:eidadha+0"],
  ["bakrid", "d L:eidadha+0"],
  ["hari raya puasa", "d L:eidfitr+0"],
  ["rosh hashanah", "d L:roshhashanah+0"],
  ["yom kippur", "d L:yomkippur+0"],
  ["purim", "d L:purim+0"],
  ["eid al adha at 9am", "dt L:eidadha+0 09:00"],
  ["diwali puja 6:45pm", "dt L:diwali+0 18:45"],
  // periods
  ["ramadan", "d L:ramadan+0>L:eidfitr-1"],
  ["during ramadan", "d L:ramadan+0>L:eidfitr-1"],
  ["over hanukkah", "d L:hanukkah+0>L:hanukkah+7"],
  ["passover", "d L:passover+0>L:passover+7"],
  ["during pesach", "d L:passover+0>L:passover+7"],
  // eves, nights, days
  ["erev yom kippur", "d L:yomkippur-1"],
  ["yom kippur eve", "d L:yomkippur-1"],
  ["first night of hanukkah", "d L:hanukkah-1"],
  ["third night of hanukkah", "d L:hanukkah+1"],
  ["first seder", "d L:passover-1"],
  ["second day of rosh hashanah", "d L:roshhashanah+1"],
  ["last day of ramadan", "d L:eidfitr-1"],
  ["end of ramadan", "d L:eidfitr-1"],
  ["chinese new year's eve", "d L:lny-1"],
  ["first day of ramadan", "d L:ramadan+0"],
  ["the day after eid", "d L:eid+0~+1d"],
  ["3 days before diwali", "d L:diwali+0~-3d"],
  // years
  ["diwali 2027", "d 2027-10-29"],
  ["ramadan 2028", "d 2028-01-28>2028-02-25"],
  ["hanukkah '27", "d 2027-12-25>2028-01-01"],
  ["rosh hashanah 5788", "d 2027-10-02"],
  ["diwali 2040", "x"],
  // bounds and ranges
  ["until eid", "d >L:eid+0"],
  ["after passover", "d L:passover+0>"],
  ["between rosh hashanah and yom kippur", "d L:roshhashanah+0>L:yomkippur+0"],
  ["from purim to passover", "d L:purim+0>L:passover+0"],
  // x
  ["last diwali", "x"],
  ["every diwali", "x"],
  ["happy diwali", "x"],
  ["diwali sale", "x"],
  ["eid mubarak", "x"],
  ["eid holidays", "x"],
  ["diwali week", "x"],
  ["holiday", "x"],
  // a holiday next to another date is a label
  ["diwali, nov 8", "d 11-08"],
  // older forms unchanged
  ["christmas", "d 12-25"],
  ["easter monday", "d E+1"],
];

describe("h16 lunar holidays", () => {
  beforeAll(async () => {
    await loadH16();
  });
  for (const [text, want] of cases) it(text, () => expect(parseH16(text, TODAY)).toBe(want));
  it("resolves on the reference day", () => {
    expect(resolveDsl(parseH16("diwali", TODAY), { today: TODAY })).toMatchObject({ start: { date: "2027-10-29" } });
    expect(resolveDsl(parseH16("during ramadan", TODAY), { today: TODAY })).toMatchObject({ start: { date: "2027-02-08" }, end: { date: "2027-03-08" } });
  });
});
