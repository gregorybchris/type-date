import { beforeAll, describe, expect, it } from "vitest";
import { parseDsl, resolveDsl, serializeDsl } from "@type-date/core";
import { loadH13, parseH12, parseH13 } from "../src";

const TODAY = "2026-11-03"; // Tuesday

// [text, expected DSL]. Zone rules: specs/dsl.md, "Time zones".
const cases: [string, string][] = [
  // abbreviations, generic letters, UTC
  ["3pm EST", "t 15:00 @America/New_York"],
  ["9am PT tomorrow", "dt +1d 09:00 @America/Los_Angeles"],
  ["noon UTC", "t 12:00 @UTC"],
  ["14:00 GMT", "t 14:00 @UTC"],
  ["0330Z november 21", "dt 11-21 03:30 @UTC"],
  ["5pmEST maintenance", "t 17:00 @America/New_York"],
  ["8pm P.S.T. tonight", "dt +0d 20:00 @America/Los_Angeles"],
  ["9am JST", "t 09:00 @Asia/Tokyo"],
  // offsets and ISO
  ["5pm UTC+5:30", "t 17:00 @+05:30"],
  ["9am GMT-8", "t 09:00 @-08:00"],
  ["2026-11-30T14:00:00-08:00", "dt 2026-11-30 14:00 @-08:00"],
  ["2010-02-04T21:00:57+0800", "dt 2010-02-04 21:00 @+08:00"],
  ["2016-09-23T02:54:32.845Z", "dt 2016-09-23 02:54 @UTC"],
  ["23:59 AoE", "t 23:59 @-12:00"],
  // zone words, places, IANA
  ["9am Pacific Time", "t 09:00 @America/Los_Angeles"],
  ["10 central", "t 10? @America/Chicago"],
  ["noon London time", "t 12:00 @Europe/London"],
  ["9am in Tokyo", "t 09:00 @Asia/Tokyo"],
  ["america/los_angeles 9am dec 1", "dt 12-01 09:00 @America/Los_Angeles"],
  // several zones: the first pair is the label
  ["10:00 PST (18:00 GMT)", "t 10? @America/Los_Angeles"],
  ["9am PT / 12pm ET / 5pm UTC", "t 09:00 @America/Los_Angeles"],
  ["maint 02:00 UTC = 21:00 EST Fri = 10:00 JST", "t 02:00 @UTC"],
  ["5pm IST in EST?", "t 17:00 @Asia/Kolkata"],
  ["9am PT to 12pm ET", "x"],
  // recurrences and ranges keep one zone
  ["every monday 9-10am PT", "dt R w/1 mo 09:00>10:00 @America/Los_Angeles"],
  ["tuesdays at 1:30 and thursdays at 3 CET", "dt R w/1 tu@1:30?,th@3? @Europe/Berlin"],
  // disambiguation by words in the text
  ["5pm CST (China)", "t 17:00 @Asia/Shanghai"],
  ["7pm BST (British Summer Time)", "t 19:00 @Europe/London"],
  ["9am IST", "t 09:00 @Asia/Kolkata"],
  // no zone: speaker-relative words, venues, lookalikes, dates only
  ["ceremony 4pm local time", "t 16:00"],
  ["can we do 11 your time tmrw", "dt +1d 11?"],
  ["meet in london at 3pm", "t 15:00"],
  ["pacific rim brunch 11am", "t 11:00"],
  ["central park at 3pm", "t 15:00"],
  ["mountain view 2pm", "t 14:00"],
  ["cat vet appt 5pm", "t 17:00"],
  ["tomorrow PST", "d +1d"],
  ["EST not EDT please", "x"],
  // h12 behavior is unchanged without a zone
  ["every other friday until jan", "d R w/2 fr bM@01"],
  ["tuesdays at 1:30 and thursdays at 3", "dt R w/1 tu@1:30?,th@3?"],
];

describe("h13", () => {
  beforeAll(async () => {
    await loadH13();
  });

  it.each(cases)("%s", (text, dsl) => {
    expect(parseH13(text, TODAY)).toBe(dsl);
  });

  it("every output parses and round-trips", () => {
    for (const [text] of cases) {
      const out = parseH13(text, TODAY);
      expect(serializeDsl(parseDsl(out)), `${text} -> ${out}`).toBe(out);
    }
  });

  it("an ambiguous abbreviation follows the user's zone, then locale, then the default", () => {
    expect(parseH13("9am IST", TODAY)).toBe("t 09:00 @Asia/Kolkata");
    expect(parseH13("9am IST", TODAY, { zone: "Europe/Dublin" })).toBe("t 09:00 @Europe/Dublin");
    expect(parseH13("9am IST", TODAY, { zone: "Asia/Jerusalem" })).toBe("t 09:00 @Asia/Jerusalem");
    expect(parseH13("9am IST", TODAY, { locale: "en-IE" })).toBe("t 09:00 @Europe/Dublin");
    expect(parseH13("5pm CST", TODAY, { locale: "zh-CN" })).toBe("t 17:00 @Asia/Shanghai");
    expect(parseH13("5pm CST", TODAY, { zone: "America/Mexico_City" })).toBe("t 17:00 @America/Mexico_City");
    expect(parseH13("5pm CST (Cuba)", TODAY, { zone: "Asia/Kolkata" })).toBe("t 17:00 @America/Havana"); // the text wins
    expect(parseH13("3pm PST", TODAY, { zone: "Asia/Manila" })).toBe("t 15:00 @Asia/Manila");
  });

  it("the zone passes through resolution without converting times", () => {
    const r = resolveDsl(parseH13("tomorrow 9am PT", TODAY), { today: TODAY });
    expect(r.zone).toBe("America/Los_Angeles");
    expect(r.start).toEqual({ date: "2026-11-04", time: "09:00" });
  });

  it("is h12 for phrases without a zone word", () => {
    for (const t of ["oct 2 to oct 5", "every other sunday", "tomorrow at 3pm", "first monday and third friday of every month", "4 to 4:30"]) {
      expect(parseH13(t, TODAY), t).toBe(parseH12(t, TODAY));
    }
  });
});
