import { beforeAll, describe, expect, it } from "vitest";
import { resolveDsl } from "@type-date/core";
import { loadH17, parseH17 } from "../src";

const TODAY = "2026-11-21";

// [text, expected DSL]. Policy: specs/dsl.md, "Past holidays".
const cases: [string, string][] = [
  ["last purim", "d L:purim+0<"],
  ["previous purim", "d L:purim+0<"],
  ["this past purim", "d L:purim+0<"],
  ["the most recent purim", "d L:purim+0<"],
  ["last christmas", "d 12-25<"],
  ["previous christmas", "d 12-25<"],
  ["last christmas eve", "d 12-24<"],
  ["last easter", "d E+0<"],
  ["last good friday", "d E-2<"],
  ["last thanksgiving", "d th#4@11<"],
  ["last black friday", "d th#4@11<~+1d"],
  ["last mothers day", "d su#2@05<"],
  ["last hanukkah", "d L:hanukkah+0<>L:hanukkah+7"],
  ["last ramadan", "d L:ramadan+0<>L:eidfitr-1"],
  ["last chinese new year", "d L:lny+0<"],
  ["last diwali at 7pm", "dt L:diwali+0< 19:00"],
  ["since last eid", "d L:eid+0<>"],
  ["photos from last halloween", "d 10-31<"],
  // unchanged
  ["purim", "d L:purim+0"],
  ["next purim", "d L:purim+0"],
  ["last friday", "d fr-1"],
  ["last dec 25", "d 12-25<"],
  ["last march", "d M@03<"],
  ["the last day of hanukkah", "d L:hanukkah+7"],
  ["last night of hanukkah", "d L:hanukkah+6"],
  ["last week", "d W-1"],
  ["last weekend", "d WKND-1"],
  ["last year's diwali", "x"],
];

describe("h17 past holidays", () => {
  beforeAll(async () => {
    await loadH17();
  });
  for (const [text, want] of cases) it(text, () => expect(parseH17(text, TODAY)).toBe(want));
  it("resolves to the most recent one", () => {
    expect(resolveDsl(parseH17("last purim", TODAY), { today: TODAY })).toMatchObject({ start: { date: "2026-03-03" } });
    expect(resolveDsl(parseH17("last thanksgiving", TODAY), { today: TODAY })).toMatchObject({ start: { date: "2025-11-27" } });
  });
});
