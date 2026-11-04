import { describe, expect, it } from "vitest";
import { occurrences, parseDsl, resolveDsl, serializeDsl, toRRule } from "../src";

// Tuesday 2026-11-03, week starts Sunday.
const opts = { today: "2026-11-03", weekStart: 0 as const };
const r = (dsl: string) => resolveDsl(dsl, opts);

describe("parse and serialize", () => {
  const lines = [
    "d 10-02>10-05",
    "d fr-1",
    "d R w/2 su",
    "t 4?>4:30?",
    "dt +1d 15:00",
    "dt mo+1 09:00>17:00",
    "d 12-25",
    "d +2w",
    "dt R d/1 mo,tu,we,th,fr 9?",
    "d mo#1@03",
    "d R m/1 d15",
    "dt +1d 14:00>fr 16:00",
    "d 2027-03-03",
    "t 12:00",
    "d W+1",
    "d M@10",
    "d R w/2 fr u12-31",
    "d R d/1 n14",
    "dt 01-05 19:00",
    "x",
  ];
  for (const l of lines) {
    it(`round trips: ${l}`, () => {
      const p = parseDsl(l);
      expect(p.mode).not.toBe(l === "x" ? "d" : "x");
      expect(serializeDsl(p)).toBe(l);
    });
  }
  it("rejects invalid", () => {
    for (const bad of ["", "d", "d 13-45", "t 25:00", "dt 4?", "q fr", "d R w/0 su", "d fr>"]) {
      expect(parseDsl(bad).mode).toBe("x");
    }
  });
});

describe("resolve", () => {
  it("absolute range without year uses the next occurrence", () => {
    expect(r("d 10-02>10-05")).toMatchObject({
      kind: "range",
      start: { date: "2027-10-02" },
      end: { date: "2027-10-05" },
    });
  });
  it("last friday", () => {
    expect(r("d fr-1").start?.date).toBe("2026-10-30");
  });
  it("last tuesday is a week back, not today", () => {
    expect(r("d tu-1").start?.date).toBe("2026-10-27");
  });
  it("bare weekday is on or after today", () => {
    expect(r("d tu").start?.date).toBe("2026-11-03");
    expect(r("d fr").start?.date).toBe("2026-11-06");
  });
  it("next monday", () => {
    expect(r("d mo+1").start?.date).toBe("2026-11-09");
  });
  it("offsets and month clamp", () => {
    expect(r("d +2w").start?.date).toBe("2026-11-17");
    expect(resolveDsl("d +1m", { today: "2026-01-31" }).start?.date).toBe("2026-02-28");
  });
  it("ambiguous time range 4 to 4:30", () => {
    expect(r("t 4?>4:30?")).toMatchObject({
      start: { time: "16:00" },
      end: { time: "16:30" },
      ambiguous: true,
    });
  });
  it("9 to 5 becomes 09:00 to 17:00", () => {
    const x = r("t 9?>5?");
    expect(x.start?.time).toBe("09:00");
    expect(x.end?.time).toBe("17:00");
  });
  it("datetime", () => {
    expect(r("dt +1d 15:00")).toMatchObject({ start: { date: "2026-11-04", time: "15:00" } });
  });
  it("datetime range with weekday end", () => {
    expect(r("dt +1d 14:00>fr 16:00")).toMatchObject({
      start: { date: "2026-11-04", time: "14:00" },
      end: { date: "2026-11-06", time: "16:00" },
    });
  });
  it("end inherits start date", () => {
    expect(r("dt mo+1 09:00>17:00")).toMatchObject({
      start: { date: "2026-11-09", time: "09:00" },
      end: { date: "2026-11-09", time: "17:00" },
    });
  });
  it("nth weekday of month", () => {
    expect(r("d mo#1@03").start?.date).toBe("2027-03-01");
    expect(r("d th#-1@11").start?.date).toBe("2026-11-26");
  });
  it("periods expand to ranges", () => {
    expect(r("d W+1")).toMatchObject({
      kind: "range",
      start: { date: "2026-11-08" },
      end: { date: "2026-11-14" },
    });
    expect(r("d M@11")).toMatchObject({
      start: { date: "2026-11-01" },
      end: { date: "2026-11-30" },
    });
    expect(r("d M@10").start?.date).toBe("2027-10-01");
    expect(r("d Y@2028").end?.date).toBe("2028-12-31");
  });
  it("week start monday", () => {
    expect(resolveDsl("d W+0", { ...opts, weekStart: 1 }).start?.date).toBe("2026-11-02");
  });
  it("invalid gives none", () => {
    expect(r("hello")).toMatchObject({ kind: "none", mode: "x" });
  });
});

describe("recurrence", () => {
  it("every other sunday starts at the next sunday", () => {
    const x = r("d R w/2 su");
    expect(x.recurrence?.dtstart).toBe("2026-11-08");
    expect(occurrences(x.recurrence!, 3)).toEqual(["2026-11-08", "2026-11-22", "2026-12-06"]);
    expect(toRRule(x.recurrence!)).toBe("FREQ=WEEKLY;INTERVAL=2;BYDAY=SU");
  });
  it("weekdays at 9", () => {
    const x = r("dt R d/1 mo,tu,we,th,fr 9?");
    expect(x.recurrence?.time?.start).toBe("09:00");
    expect(occurrences(x.recurrence!, 4)).toEqual([
      "2026-11-03",
      "2026-11-04",
      "2026-11-05",
      "2026-11-06",
    ]);
  });
  it("monthly on the 15th", () => {
    const x = r("d R m/1 d15");
    expect(occurrences(x.recurrence!, 2)).toEqual(["2026-11-15", "2026-12-15"]);
  });
  it("last day of month", () => {
    const x = r("d R m/1 d-1");
    expect(occurrences(x.recurrence!, 2)).toEqual(["2026-11-30", "2026-12-31"]);
  });
  it("first monday monthly", () => {
    const x = r("d R m/1 mo#1");
    expect(occurrences(x.recurrence!, 2)).toEqual(["2026-12-07", "2027-01-04"]);
  });
  it("count and until", () => {
    expect(occurrences(r("d R d/1 n14").recurrence!, 99)).toHaveLength(14);
    const u = r("d R w/2 fr u12-31").recurrence!;
    expect(u.until).toBe("2026-12-31");
    expect(occurrences(u, 99).at(-1)).toBe("2026-12-18");
  });
  it("yearly", () => {
    const x = r("d R y/1 10-02");
    expect(occurrences(x.recurrence!, 2)).toEqual(["2027-10-02", "2028-10-02"]);
  });
});
