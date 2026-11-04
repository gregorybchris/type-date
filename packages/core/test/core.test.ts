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
    for (const bad of ["", "d", "d 13-45", "t 25:00", "dt 4?", "q fr", "d R w/0 su"]) {
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

describe("v2 round trips", () => {
  const lines = [
    "t 14:00>",
    "t >12:00",
    "t 2?>",
    "t >5:30?",
    "d 10-05>",
    "d >fr",
    "d 2027-01-01>",
    "d W+1>",
    "dt 10-05 14:00>",
    "dt >fr 16:00",
    "dt +1d 09:00>",
    "d D@15",
    "d D@05",
    "d D@31>D@05",
    "d D13@M-1",
    "d D05@M+1",
    "dt D13@M-1 15:00",
    "t 15:00>+2h",
    "t 3?>+30m",
    "t 10:00>+1440m",
    "t 10:00>+48h",
    "dt +1d 09:00>+90m",
    "dt 12-31 23:00>+2h",
  ];
  for (const l of lines) {
    it(`round trips: ${l}`, () => {
      const p = parseDsl(l);
      expect(p.mode).not.toBe("x");
      expect(serializeDsl(p)).toBe(l);
    });
  }
  it("parses to the expected shapes", () => {
    expect(parseDsl("t 14:00>")).toMatchObject({ kind: "open", open: "end" });
    expect(parseDsl("t >12:00")).toMatchObject({ kind: "open", open: "start" });
    expect(parseDsl("t 15:00>+2h")).toMatchObject({ kind: "duration", duration: { n: 2, u: "h" } });
    expect(parseDsl("d D@15")).toMatchObject({ kind: "single", start: { date: { k: "dom", d: 15 } } });
  });
  it("normalizes spacing", () => {
    expect(serializeDsl(parseDsl("t  14:00 >"))).toBe("t 14:00>");
    expect(serializeDsl(parseDsl("dt +1d 09:00 > +90m"))).toBe("dt +1d 09:00>+90m");
  });
  it("rejects invalid v2 lines", () => {
    const bad = [
      "t >",
      "d >",
      "x >",
      ">",
      "t 15:00>+0h",
      "t 15:00>+0m",
      "t 15:00>+49h",
      "t 15:00>+1441m",
      "t 15:00>+2",
      "t 15:00>+2.5h",
      "t 15:00>+02h",
      "t 15:00>-2h",
      "t 15:00>+2h>",
      "t 15:00>>",
      "t >>12:00",
      "t >+2h",
      "d 10-05>+2h",
      "d D@15>+2h",
      "t +2h",
      "d D@32",
      "d D@00",
            "d D@015",
      "d D@4x",
      "d D@ab",
      "t D@15",
      "dt D@15",
      "t 14:00>12:00>",
      "t >25:00",
      "d >13-45",
      "t >12:00 14:00",
      "dt 10-05>",
      "dt >10-05",
      "t 10-05>",
      "d 14:00>",
      "d R w/1 mo>",
    ];
    for (const b of bad) expect(parseDsl(b), b).toEqual({ mode: "x" });
  });
  it("keeps v1 range behavior", () => {
    expect(parseDsl("t 4?>4:30?")).toMatchObject({ kind: "range" });
    expect(parseDsl("d 10-02>10-05")).toMatchObject({ kind: "range" });
  });
});

describe("open ranges", () => {
  it("after 2pm", () => {
    const x = r("t 14:00>");
    expect(x).toMatchObject({ mode: "t", kind: "range", open: "end", start: { time: "14:00" }, ambiguous: false });
    expect(x.end).toBeUndefined();
  });
  it("before noon", () => {
    const x = r("t >12:00");
    expect(x).toMatchObject({ kind: "range", open: "start", end: { time: "12:00" } });
    expect(x.start).toBeUndefined();
  });
  it("unknown meridiem uses the usual rule and is flagged", () => {
    expect(r("t 2?>")).toMatchObject({ start: { time: "14:00" }, ambiguous: true, open: "end" });
    expect(r("t >9?")).toMatchObject({ end: { time: "09:00" }, ambiguous: true, open: "start" });
    expect(r("t >5?").end?.time).toBe("17:00");
  });
  it("dates", () => {
    const a = r("d 10-05>");
    expect(a).toMatchObject({ open: "end", start: { date: "2027-10-05" } });
    expect(a.end).toBeUndefined();
    expect(r("d >fr")).toMatchObject({ open: "start", end: { date: "2026-11-06" } });
    expect(r("d >fr").start).toBeUndefined();
    expect(r("d +3d>").start?.date).toBe("2026-11-06");
  });
  it("periods use the near edge of the range", () => {
    expect(r("d W+1>").start?.date).toBe("2026-11-08");
    expect(r("d >W+1").end?.date).toBe("2026-11-14");
    expect(r("d M@12>").start?.date).toBe("2026-12-01");
  });
  it("datetimes", () => {
    expect(r("dt 11-05 14:00>")).toMatchObject({
      open: "end",
      start: { date: "2026-11-05", time: "14:00" },
    });
    expect(r("dt >fr 16:00")).toMatchObject({
      open: "start",
      end: { date: "2026-11-06", time: "16:00" },
    });
  });
  it("closed ranges have no open flag", () => {
    expect(r("d 11-05>11-07").open).toBeUndefined();
    expect(r("d M@11").open).toBeUndefined();
  });
});

describe("day of month", () => {
  const at = (dsl: string, today: string) => resolveDsl(dsl, { today }).start?.date;
  it("is today when today has that day", () => {
    expect(at("d D@15", "2026-11-15")).toBe("2026-11-15");
  });
  it("later this month", () => {
    expect(at("d D@15", "2026-11-03")).toBe("2026-11-15");
  });
  it("next month once passed", () => {
    expect(at("d D@15", "2026-11-16")).toBe("2026-12-15");
    expect(at("d D@01", "2026-11-03")).toBe("2026-12-01");
  });
  it("rolls into the next year", () => {
    expect(at("d D@10", "2026-12-20")).toBe("2027-01-10");
  });
  it("skips months without the day", () => {
    expect(at("d D@31", "2026-04-10")).toBe("2026-05-31");
    expect(at("d D@31", "2026-11-03")).toBe("2026-12-31");
    expect(at("d D@31", "2026-12-31")).toBe("2026-12-31");
    expect(at("d D@31", "2027-01-31")).toBe("2027-01-31");
    expect(at("d D@31", "2026-06-01")).toBe("2026-07-31");
    expect(at("d D@30", "2027-01-31")).toBe("2027-03-30");
  });
  it("february and leap years", () => {
    expect(at("d D@29", "2027-02-01")).toBe("2027-03-29");
    expect(at("d D@29", "2028-02-01")).toBe("2028-02-29");
    expect(at("d D@29", "2028-03-01")).toBe("2028-03-29");
    expect(at("d D@30", "2028-02-01")).toBe("2028-03-30");
    expect(at("d D@29", "2027-12-30")).toBe("2028-01-29");
  });
  it("is a single result", () => {
    expect(r("d D@15")).toMatchObject({ kind: "single", mode: "d", ambiguous: false });
  });
  it("works in ranges and open ranges", () => {
    expect(r("d D@15>D@20")).toMatchObject({ start: { date: "2026-11-15" }, end: { date: "2026-11-20" } });
    expect(r("d D@20>D@05")).toMatchObject({ start: { date: "2026-11-20" }, end: { date: "2026-12-05" } });
    expect(r("d D@15>")).toMatchObject({ open: "end", start: { date: "2026-11-15" } });
    expect(r("d >D@31")).toMatchObject({ open: "start", end: { date: "2026-12-31" } });
  });
  it("works with a time", () => {
    expect(r("dt D@15 09:00")).toMatchObject({ start: { date: "2026-11-15", time: "09:00" } });
  });
});

describe("duration ends", () => {
  it("3pm for 2 hours", () => {
    const x = r("t 15:00>+2h");
    expect(x).toMatchObject({ mode: "t", kind: "range", start: { time: "15:00" }, end: { time: "17:00" }, durationMin: 120 });
    expect(x.end?.date).toBeUndefined();
    expect(x.endNextDay).toBeUndefined();
    expect(x.open).toBeUndefined();
  });
  it("minutes", () => {
    expect(r("t 10:00>+45m").end?.time).toBe("10:45");
    expect(r("t 10:30>+30m").end?.time).toBe("11:00");
    expect(r("t 10:30>+1m").end?.time).toBe("10:31");
    expect(r("t 00:00>+1440m")).toMatchObject({ end: { time: "00:00" }, endNextDay: true });
  });
  it("datetime", () => {
    expect(r("dt +1d 09:00>+90m")).toMatchObject({
      start: { date: "2026-11-04", time: "09:00" },
      end: { date: "2026-11-04", time: "10:30" },
      durationMin: 90,
    });
  });
  it("ends exactly at midnight move to the next day", () => {
    expect(r("dt 11-05 22:00>+2h")).toMatchObject({ end: { date: "2026-11-06", time: "00:00" } });
    expect(r("t 22:00>+2h")).toMatchObject({ end: { time: "00:00" }, endNextDay: true });
  });
  it("crosses midnight", () => {
    const d = r("dt 11-05 23:00>+2h");
    expect(d).toMatchObject({ start: { date: "2026-11-05" }, end: { date: "2026-11-06", time: "01:00" } });
    expect(d.endNextDay).toBeUndefined();
    const t = r("t 23:00>+2h");
    expect(t).toMatchObject({ end: { time: "01:00" }, endNextDay: true });
    expect(t.end?.date).toBeUndefined();
  });
  it("crosses month and year ends", () => {
    expect(r("dt 12-31 23:00>+2h").end?.date).toBe("2027-01-01");
    expect(resolveDsl("dt 02-28 23:30>+60m", { today: "2028-01-10" }).end).toEqual({ date: "2028-02-29", time: "00:30" });
    expect(resolveDsl("dt 02-28 23:30>+60m", { today: "2027-01-10" }).end).toEqual({ date: "2027-03-01", time: "00:30" });
  });
  it("long durations", () => {
    expect(r("dt 11-05 10:00>+48h").end).toEqual({ date: "2026-11-07", time: "10:00" });
    expect(r("dt 11-05 10:00>+1440m").end).toEqual({ date: "2026-11-06", time: "10:00" });
    expect(r("t 10:00>+25h")).toMatchObject({ end: { time: "11:00" }, endNextDay: true });
  });
  it("unknown meridiem start uses the usual rule then adds the offset", () => {
    expect(r("t 3?>+2h")).toMatchObject({ start: { time: "15:00" }, end: { time: "17:00" }, ambiguous: true });
    expect(r("t 9?>+3h")).toMatchObject({ start: { time: "09:00" }, end: { time: "12:00" }, ambiguous: true });
    expect(r("t 11?>+2h")).toMatchObject({ start: { time: "11:00" }, end: { time: "13:00" } });
    expect(r("t 12?>+1h")).toMatchObject({ start: { time: "12:00" }, end: { time: "13:00" } });
    expect(r("t 6:30?>+90m")).toMatchObject({ start: { time: "18:30" }, end: { time: "20:00" } });
    expect(r("t 11?>+13h")).toMatchObject({ end: { time: "00:00" }, endNextDay: true });
  });
  it("known times are not ambiguous", () => {
    expect(r("t 15:00>+2h").ambiguous).toBe(false);
  });
  it("period start uses its first day", () => {
    expect(r("dt W+1 09:00>+1h").start?.date).toBe("2026-11-08");
  });
});

describe("v1 unchanged", () => {
  it("single and range resolutions carry no v2 fields", () => {
    for (const l of ["d 10-05", "t 12:00", "dt +1d 15:00", "d 10-02>10-05", "t 4?>4:30?", "d W+1"]) {
      const x = r(l);
      expect(x.open).toBeUndefined();
      expect(x.durationMin).toBeUndefined();
      expect(x.endNextDay).toBeUndefined();
    }
  });
});

// ---- v2 part B ----

const at = (dsl: string, today = "2026-11-03") => resolveDsl(dsl, { today });
const date = (dsl: string, today?: string) => at(dsl, today).start?.date;

describe("part B round trips", () => {
  const lines = [
    "d 10-02,10-09,10-16",
    "dt 10-02,10-09 15:00",
    "dt 10-02,10-09 3?",
    "d fr-1,fr-2,fr-3",
    "d D@01,D@15",
    "d fr,mo#1@03",
    "d 10-05<",
    "d fr<",
    "d M@10<",
    "d R w/1 tu uM@03 sM@03",
    "d R w/1 sa,su u+0d sM@10<",
    "d R w/1 mo,tu,we u+0d s-6w",
    "d R w/1 fr uM+0 sM+0",
    "d R d/1 mo,tu,we,th,fr uW+1 sW+1",
    "d R m/1 tu#1,tu#3",
    "d R m/1 mo#-1,fr#2 n6",
    "d R d/1 mo,tu,we,th,fr M@08",
    "d R d/1 M@06,M@07 n10",
    "dt R w/1 tu M@03 u+3m 9? s+1w",
    "d Q+0",
    "d Q-1",
    "d Q+2",
    "d Q@3",
    "d 10-15~-3d",
    "d 12-25~+2d",
    "d fr+1~+1w",
    "d 2026-10-15~-1y",
    "d 01-31~+1m",
    "d 10-15<~+1d",
    "d +1b",
    "d -3b",
    "d +0b",
    "d fr~+1b",
    "d +1w>+3b",
    "dt +3b 09:00",
  ];
  for (const l of lines) {
    it(`round trips: ${l}`, () => {
      const p = parseDsl(l);
      expect(p.mode, l).not.toBe("x");
      expect(serializeDsl(p)).toBe(l);
    });
  }
  it("canonical order of recurrence tokens", () => {
    expect(serializeDsl(parseDsl("dt R d/1 mo s-2w M@08 u+0d 9? n5"))).toBe("dt R d/1 mo M@08 n5 u+0d 9? s-2w");
  });
});

describe("date lists", () => {
  it("resolves and sorts", () => {
    expect(at("d 10-16,10-02,10-09")).toMatchObject({
      mode: "d",
      kind: "list",
      dates: ["2027-10-02", "2027-10-09", "2027-10-16"],
      ambiguous: false,
    });
    const x = at("d 10-16,10-02");
    expect(x.start).toBeUndefined();
    expect(x.end).toBeUndefined();
    expect(x.time).toBeUndefined();
  });
  it("shared time", () => {
    expect(at("dt 10-02,10-09 15:00")).toMatchObject({ kind: "list", time: "15:00", ambiguous: false });
    expect(at("dt 11-05,11-12 3?")).toMatchObject({ dates: ["2026-11-05", "2026-11-12"], time: "15:00", ambiguous: true });
  });
  it("last 3 fridays", () => {
    expect(at("d fr-1,fr-2,fr-3").dates).toEqual(["2026-10-16", "2026-10-23", "2026-10-30"]);
  });
  it("day-of-month elements are each next from today", () => {
    expect(at("d D@01,D@15").dates).toEqual(["2026-11-15", "2026-12-01"]);
    expect(at("d D@31,D@15", "2026-04-10").dates).toEqual(["2026-04-15", "2026-05-31"]);
    expect(at("d D@31,D@30", "2026-04-10").dates).toEqual(["2026-04-30", "2026-05-31"]);
    expect(at("d D@31,D@31").dates).toEqual(["2026-12-31"]);
  });
  it("mixed single-day forms", () => {
    expect(at("d +1d,fr,12-25~+2d,+2b").dates).toEqual(["2026-11-04", "2026-11-05", "2026-11-06", "2026-12-27"]);
  });
  it("removes duplicates", () => {
    expect(at("d 11-05,11-05,fr").dates).toEqual(["2026-11-05", "2026-11-06"]);
  });
  it("accepts 2 to 31 items", () => {
    const n = (k: number) => Array.from({ length: k }, (_, i) => `+${i}d`).join(",");
    expect(at(`d ${n(2)}`).dates).toHaveLength(2);
    expect(at(`d ${n(31)}`).dates).toHaveLength(31);
    expect(parseDsl(`d ${n(32)}`)).toEqual({ mode: "x" });
  });
  it("rejects invalid lists", () => {
    const bad = [
      "d 10-02,",
      "d ,10-02",
      "d 10-02,,10-09",
      "d 10-02,10-32",
      "d 10-02,W+1",
      "d 10-02,M@10",
      "d 10-02,Y@2027",
      "d 10-02,Q+0",
      "d 10-02,M@10<",
      "d 10-02,10-05>10-09",
      "d 10-02,10-09>",
      "d >10-02,10-09",
      "d 10-02,10-09 15:00",
      "dt 10-02,10-09",
      "dt 10-02,10-09 15:00 16:00",
      "t 10-02,10-09",
      "t 15:00,16:00",
      "d R w/1 mo,10-02",
      "dt 10-02,10-09 15:00>16:00",
      "d 10-02, 10-09 x",
    ];
    for (const b of bad) expect(parseDsl(b), b).toEqual({ mode: "x" });
  });
});

describe("past marker", () => {
  it("MM-DD<", () => {
    expect(date("d 10-05<")).toBe("2026-10-05");
    expect(date("d 12-25<")).toBe("2025-12-25");
  });
  it("today counts", () => {
    expect(date("d 11-03<")).toBe("2026-11-03");
    expect(date("d tu<")).toBe("2026-11-03");
    expect(at("d M@11<")).toMatchObject({ start: { date: "2026-11-01" }, end: { date: "2026-11-30" } });
  });
  it("one day after the date is past", () => {
    expect(date("d 11-04<")).toBe("2025-11-04");
  });
  it("bare weekday<", () => {
    expect(date("d fr<")).toBe("2026-10-30");
    expect(date("d mo<")).toBe("2026-11-02");
    expect(date("d we<")).toBe("2026-10-28");
  });
  it("M@MM<", () => {
    expect(at("d M@10<")).toMatchObject({ kind: "range", start: { date: "2026-10-01" }, end: { date: "2026-10-31" } });
    expect(at("d M@12<")).toMatchObject({ start: { date: "2025-12-01" }, end: { date: "2025-12-31" } });
    expect(date("d M@01<", "2026-01-15")).toBe("2026-01-01");
  });
  it("Feb 29 goes to the last leap year", () => {
    expect(date("d 02-29<")).toBe("2024-02-29");
    expect(date("d 02-29<", "2028-02-29")).toBe("2028-02-29");
    expect(date("d 02-29<", "2028-02-28")).toBe("2024-02-29");
  });
  it("is invalid on other forms", () => {
    for (const bad of ["d 2026-10-05<", "d fr+1<", "d fr-1<", "d +1d<", "d W+0<", "d Y@2026<", "d 13-01<", "d 02-30<", "d D@15<", "d fr#1@03<", "d <10-05", "d 10-05<<", "d M@13<", "t 10:00<"]) {
      expect(parseDsl(bad), bad).toEqual({ mode: "x" });
    }
  });
  it("works as a range end and in lists", () => {
    expect(at("d 10-05<>11-03")).toMatchObject({ start: { date: "2026-10-05" }, end: { date: "2026-11-03" } });
    expect(at("d fr<,fr").dates).toEqual(["2026-10-30", "2026-11-06"]);
  });
});

describe("recurrence period bounds and offset bounds", () => {
  const rec = (l: string, today?: string) => at(l, today).recurrence!;
  it("tuesdays in march", () => {
    const x = rec("d R w/1 tu sM@03 uM@03");
    expect(x.dtstart).toBe("2027-03-02");
    expect(x.until).toBe("2027-03-31");
    expect(occurrences(x, 99)).toEqual(["2027-03-02", "2027-03-09", "2027-03-16", "2027-03-23", "2027-03-30"]);
  });
  it("this month: the u bound is the last day of the period", () => {
    const x = rec("d R w/1 fr sM+0 uM+0");
    expect(x.dtstart).toBe("2026-11-06");
    expect(occurrences(x, 99)).toEqual(["2026-11-06", "2026-11-13", "2026-11-20", "2026-11-27"]);
  });
  it("next week weekdays", () => {
    const x = rec("d R d/1 mo,tu,we,th,fr sW+1 uW+1");
    expect(occurrences(x, 99)).toEqual(["2026-11-09", "2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13"]);
  });
  it("weekends since october", () => {
    const x = rec("d R w/1 sa,su sM@10< u+0d");
    expect(x.dtstart).toBe("2026-10-03");
    expect(x.until).toBe("2026-11-03");
    const all = occurrences(x, 99);
    expect(all[0]).toBe("2026-10-03");
    expect(all.at(-1)).toBe("2026-11-01");
    expect(all).toHaveLength(10);
  });
  it("exposes the s bound as from", () => {
    expect(rec("d R w/1 tu sM@03 uM@03").from).toBe("2027-03-01");
    expect(rec("d R w/1 tu").from).toBeUndefined();
  });
  it("past s bound: dtstart is before today", () => {
    const x = rec("d R w/1 mo,tu,we s-6w u+0d");
    expect(x.from).toBe("2026-09-22");
    expect(x.dtstart).toBe("2026-09-22");
    expect(x.until).toBe("2026-11-03");
    const all = occurrences(x, 99);
    expect(all[0]).toBe("2026-09-22");
    expect(all.at(-1)).toBe("2026-11-03");
    expect(all).toHaveLength(19);
    expect(all.every((d) => ["1", "2", "3"].includes(String(new Date(d + "T00:00:00Z").getUTCDay())))).toBe(true);
  });
  it("past s with first match before the s weekday", () => {
    // s-1d is Monday Nov 2; the first Sunday on or after is Nov 8
    expect(rec("d R w/1 su s-1d").dtstart).toBe("2026-11-08");
    expect(rec("d R w/1 mo s-1d").dtstart).toBe("2026-11-02");
  });
  it("u in the past lists only past dates", () => {
    const x = rec("d R w/1 mo s2026-09-01 u2026-09-30");
    expect(x.dtstart).toBe("2026-09-07");
    expect(occurrences(x, 99)).toEqual(["2026-09-07", "2026-09-14", "2026-09-21", "2026-09-28"]);
    const y = rec("d R d/1 sM@10< uM@10<");
    expect(y.dtstart).toBe("2026-10-01");
    expect(occurrences(y, 99)).toHaveLength(31);
    expect(occurrences(y, 99).at(-1)).toBe("2026-10-31");
  });
  it("u before the first match gives no dates", () => {
    expect(occurrences(rec("d R w/1 mo s+1w u+2d"), 9)).toEqual([]);
  });
  it("offset bounds", () => {
    expect(rec("d R d/1 u+3m").until).toBe("2027-02-03");
    expect(rec("d R d/1 s+1w u+2w").dtstart).toBe("2026-11-10");
    expect(rec("d R d/1 s+1b u+3b n2").dtstart).toBe("2026-11-04");
    expect(rec("d R d/1 u+0d").until).toBe("2026-11-03");
  });
  it("quarter bounds", () => {
    const x = rec("d R m/1 d1 sQ+1 uQ+1");
    expect(occurrences(x, 99)).toEqual(["2027-01-01", "2027-02-01", "2027-03-01"]);
  });
  it("weekday tokens sa and su are not s bounds", () => {
    expect(rec("d R w/1 sa,su").days).toEqual(["sa", "su"]);
  });
});

describe("nth list", () => {
  it("first and third tuesday", () => {
    const x = at("d R m/1 tu#1,tu#3").recurrence!;
    expect(x.nths).toEqual([{ wd: "tu", k: 1 }, { wd: "tu", k: 3 }]);
    expect(x.nth).toEqual({ wd: "tu", k: 1 });
    expect(occurrences(x, 4)).toEqual(["2026-11-03", "2026-11-17", "2026-12-01", "2026-12-15"]);
    expect(toRRule(x)).toBe("FREQ=MONTHLY;BYDAY=1TU,3TU");
  });
  it("mixed weekdays and last", () => {
    const x = at("d R m/1 mo#-1,fr#2").recurrence!;
    expect(occurrences(x, 4)).toEqual(["2026-11-13", "2026-11-30", "2026-12-11", "2026-12-28"]);
  });
  it("single nth keeps the v1 shape", () => {
    const x = at("d R m/1 mo#1").recurrence!;
    expect(x.nths).toBeUndefined();
    expect(x.nth).toEqual({ wd: "mo", k: 1 });
  });
  it("every other month", () => {
    expect(occurrences(at("d R m/2 tu#1,tu#3").recurrence!, 4)).toEqual(["2026-11-03", "2026-11-17", "2027-01-05", "2027-01-19"]);
  });
  it("rejects invalid lists", () => {
    for (const bad of ["d R w/1 tu#1,tu#3", "d R y/1 tu#1,tu#3", "d R m/1 tu#0,tu#3", "d R m/1 tu#6,tu#3", "d R m/1 tu#1,", "d R m/1 tu#1,mo", "d R m/1 ,tu#1"]) {
      expect(parseDsl(bad), bad).toEqual({ mode: "x" });
    }
  });
});

describe("month filter", () => {
  it("every august", () => {
    const x = at("d R d/1 mo,tu,we,th,fr M@08").recurrence!;
    expect(x.months).toEqual([8]);
    expect(x.dtstart).toBe("2027-08-02");
    expect(occurrences(x, 3)).toEqual(["2027-08-02", "2027-08-03", "2027-08-04"]);
    expect(toRRule(x)).toBe("FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR;BYMONTH=8");
    expect(x.until).toBeUndefined();
  });
  it("starts today when today is in the month", () => {
    expect(at("d R d/1 M@11").recurrence!.dtstart).toBe("2026-11-03");
    expect(at("d R d/1 M@06,M@07", "2026-05-31").recurrence!.dtstart).toBe("2026-06-01");
  });
  it("continues across years with a limit", () => {
    const x = at("d R m/1 d15 M@06,M@07").recurrence!;
    expect(occurrences(x, 4)).toEqual(["2027-06-15", "2027-07-15", "2028-06-15", "2028-07-15"]);
    expect(toRRule(x)).toBe("FREQ=MONTHLY;BYMONTH=6,7;BYMONTHDAY=15");
  });
  it("combines with count and u bounds", () => {
    expect(occurrences(at("d R d/1 M@12 n3").recurrence!, 9)).toEqual(["2026-12-01", "2026-12-02", "2026-12-03"]);
    const x = at("d R w/1 mo M@11,M@12 u+2m").recurrence!;
    expect(occurrences(x, 99).at(-1)).toBe("2026-12-28");
  });
  it("combines with nth lists and years", () => {
    expect(occurrences(at("d R m/1 tu#1,tu#3 M@12").recurrence!, 3)).toEqual(["2026-12-01", "2026-12-15", "2027-12-07"]);
    expect(occurrences(at("d R y/1 10-02 M@10").recurrence!, 2)).toEqual(["2027-10-02", "2028-10-02"]);
  });
  it("excludes a month filter that never matches the day", () => {
    expect(occurrences(at("d R y/1 10-02 M@11").recurrence!, 2)).toEqual([]);
  });
  it("with time", () => {
    const x = at("dt R d/1 M@08 9?").recurrence!;
    expect(x.time?.start).toBe("09:00");
    expect(x.months).toEqual([8]);
  });
  it("rejects invalid filters", () => {
    for (const bad of ["d R d/1 M@13", "d R d/1 M@00", "d R d/1 M@8", "d R d/1 M@08,", "d R d/1 M@08,M@", "d R d/1 M@08<", "d M@08,M@09"]) {
      expect(parseDsl(bad), bad).toEqual({ mode: "x" });
    }
  });
});

describe("quarters", () => {
  it("relative", () => {
    expect(at("d Q+0")).toMatchObject({ kind: "range", start: { date: "2026-10-01" }, end: { date: "2026-12-31" } });
    expect(at("d Q+1")).toMatchObject({ start: { date: "2027-01-01" }, end: { date: "2027-03-31" } });
    expect(at("d Q-1")).toMatchObject({ start: { date: "2026-07-01" }, end: { date: "2026-09-30" } });
    expect(at("d Q-4").start?.date).toBe("2025-10-01");
    expect(at("d Q+5")).toMatchObject({ start: { date: "2028-01-01" } });
  });
  it("quarter edges", () => {
    expect(at("d Q+0", "2026-01-01")).toMatchObject({ start: { date: "2026-01-01" }, end: { date: "2026-03-31" } });
    expect(at("d Q+0", "2026-03-31").end?.date).toBe("2026-03-31");
    expect(at("d Q+0", "2026-04-01").start?.date).toBe("2026-04-01");
    expect(at("d Q+0", "2028-06-30").end?.date).toBe("2028-06-30");
    expect(at("d Q-1", "2026-02-10")).toMatchObject({ start: { date: "2025-10-01" }, end: { date: "2025-12-31" } });
  });
  it("named quarter is the nearest on or after today", () => {
    expect(at("d Q@4")).toMatchObject({ start: { date: "2026-10-01" }, end: { date: "2026-12-31" } });
    expect(at("d Q@3")).toMatchObject({ start: { date: "2027-07-01" }, end: { date: "2027-09-30" } });
    expect(at("d Q@1").start?.date).toBe("2027-01-01");
    expect(at("d Q@4", "2026-12-31").start?.date).toBe("2026-10-01");
    expect(at("d Q@4", "2027-01-01").start?.date).toBe("2027-10-01");
  });
  it("as range start or end", () => {
    expect(at("d +0d>Q+0")).toMatchObject({ start: { date: "2026-11-03" }, end: { date: "2026-12-31" } });
    expect(at("d Q+1>").start?.date).toBe("2027-01-01");
    expect(at("d >Q+0").end?.date).toBe("2026-12-31");
  });
  it("rejects invalid quarters", () => {
    for (const bad of ["d Q@0", "d Q@5", "d Q@12", "d Q", "d Q+", "d Q+0,Q+1", "d Q+0~+1d", "d Q@3<", "d Q3"]) {
      expect(parseDsl(bad), bad).toEqual({ mode: "x" });
    }
  });
});

describe("anchored offsets", () => {
  it("before and after a date", () => {
    expect(date("d 10-15~-3d")).toBe("2027-10-12");
    expect(date("d 12-25~+2d")).toBe("2026-12-27");
    expect(date("d 2026-12-25~-1w")).toBe("2026-12-18");
    expect(date("d 2026-12-25~+0d")).toBe("2026-12-25");
  });
  it("anchor in the past", () => {
    expect(date("d 2026-10-15~+3d")).toBe("2026-10-18");
    expect(date("d 10-15<~+3d")).toBe("2026-10-18");
    expect(date("d fr-1~+1d")).toBe("2026-10-31");
    expect(date("d 2020-02-29~+1y")).toBe("2021-02-28");
  });
  it("month-end clamp", () => {
    expect(date("d 01-31~+1m", "2026-01-10")).toBe("2026-02-28");
    expect(date("d 2028-01-31~+1m")).toBe("2028-02-29");
    expect(date("d 2026-03-31~-1m")).toBe("2026-02-28");
    expect(date("d 2026-05-31~+1m")).toBe("2026-06-30");
    expect(date("d 2028-02-29~+1y")).toBe("2029-02-28");
    expect(date("d 2028-02-29~+4y")).toBe("2032-02-29");
    expect(date("d 2026-12-31~+2m")).toBe("2027-02-28");
  });
  it("any single-day anchor", () => {
    expect(date("d fr~+1d")).toBe("2026-11-07");
    expect(date("d fr+1~+1w")).toBe("2026-11-13");
    expect(date("d mo#1@03~-1d")).toBe("2027-02-28");
    expect(date("d D@15~+1d")).toBe("2026-11-16");
    expect(date("d +1w~+1d")).toBe("2026-11-11");
  });
  it("anchor ref is today for MM-DD", () => {
    expect(date("d 11-03~+1d")).toBe("2026-11-04");
    expect(date("d 11-02~+1d")).toBe("2027-11-03");
  });
  it("works in ranges and lists", () => {
    expect(at("d 12-25~-3d>12-25")).toMatchObject({ start: { date: "2026-12-22" }, end: { date: "2026-12-25" } });
    expect(at("d 12-25~-1d,12-25~+1d").dates).toEqual(["2026-12-24", "2026-12-26"]);
  });
  it("rejects invalid anchors", () => {
    for (const bad of ["d 10-15~", "d ~-3d", "d 10-15~3d", "d 10-15~-3", "d 10-15~-3h", "d 10-15~-3x", "d W+1~+1d", "d M@10~+1d", "d Y@2026~+1d", "d Q+0~+1d", "d 10-15~-3d~+1d", "d 10-15~+1d~", "d 13-15~+1d", "d 10-15~+1d,", "d M@10<~+1d", "d D@32~+1d", "t 10-15~+1d"]) {
      expect(parseDsl(bad), bad).toEqual({ mode: "x" });
    }
  });
});

describe("business days", () => {
  // 2026-11-03 is a Tuesday. Nov 6 Fri, Nov 7 Sat, Nov 8 Sun, Nov 9 Mon.
  it("offsets from today", () => {
    expect(date("d +1b")).toBe("2026-11-04");
    expect(date("d +3b")).toBe("2026-11-06");
    expect(date("d +4b")).toBe("2026-11-09");
    expect(date("d +5b")).toBe("2026-11-10");
    expect(date("d +10b")).toBe("2026-11-17");
    expect(date("d -1b")).toBe("2026-11-02");
    expect(date("d -2b")).toBe("2026-10-30");
    expect(date("d -5b")).toBe("2026-10-27");
  });
  it("+0b is today on a weekday and the next Monday on a weekend", () => {
    expect(date("d +0b")).toBe("2026-11-03");
    expect(date("d +0b", "2026-11-07")).toBe("2026-11-09");
    expect(date("d +0b", "2026-11-08")).toBe("2026-11-09");
  });
  it("from a weekend", () => {
    expect(date("d +1b", "2026-11-07")).toBe("2026-11-09");
    expect(date("d +1b", "2026-11-08")).toBe("2026-11-09");
    expect(date("d -1b", "2026-11-07")).toBe("2026-11-06");
    expect(date("d -1b", "2026-11-08")).toBe("2026-11-06");
    expect(date("d +1b", "2026-11-06")).toBe("2026-11-09");
    expect(date("d -1b", "2026-11-09")).toBe("2026-11-06");
  });
  it("never lands on a weekend", () => {
    for (let n = -30; n <= 30; n++) {
      const d = date(`d ${n >= 0 ? "+" : ""}${n}b`, "2026-11-07")!;
      const wd = new Date(`${d}T00:00:00Z`).getUTCDay();
      expect([0, 6]).not.toContain(wd);
    }
  });
  it("across month and year ends", () => {
    expect(date("d +1b", "2026-12-31")).toBe("2027-01-01");
    expect(date("d +2b", "2026-12-31")).toBe("2027-01-04");
    expect(date("d -1b", "2027-01-04")).toBe("2027-01-01");
  });
  it("anchored", () => {
    expect(date("d 2026-12-25~+1b")).toBe("2026-12-28");
    expect(date("d 2026-12-25~-1b")).toBe("2026-12-24");
    expect(date("d 2026-12-26~+0b")).toBe("2026-12-28");
    expect(date("d 12-25~+3b")).toBe("2026-12-30");
  });
  it("in ranges and with a time", () => {
    expect(at("d +0d>+5b")).toMatchObject({ start: { date: "2026-11-03" }, end: { date: "2026-11-10" } });
    expect(at("dt +3b 09:00").start).toEqual({ date: "2026-11-06", time: "09:00" });
  });
  it("is a single date", () => {
    expect(at("d +1b")).toMatchObject({ kind: "single", mode: "d" });
  });
});

describe("validate-data helpers", () => {
  it("v1 lines keep the same resolved shape", () => {
    const x = at("d R m/1 mo#1").recurrence!;
    expect(Object.keys(x).sort()).toEqual(["dtstart", "freq", "interval", "nth"]);
    expect(Object.keys(at("d R w/2 su").recurrence!).sort()).toEqual(["days", "dtstart", "freq", "interval"]);
  });
});

describe("v2 labeling-feedback rules", () => {
  it("D@ is canonicalized to two digits", () => {
    expect(serializeDsl(parseDsl("d D@4"))).toBe("d D@04");
    expect(serializeDsl(parseDsl("d D@15"))).toBe("d D@15");
    expect(serializeDsl(parseDsl("d D@1,D@15"))).toBe("d D@01,D@15");
    expect(date("d D@4", "2026-11-03")).toBe("2026-11-04");
    expect(date("d D@4", "2026-11-05")).toBe("2026-12-04");
    for (const bad of ["d D@", "d D@0", "d D@00", "d D@32", "d D@123", "d D@-1"]) expect(parseDsl(bad), bad).toEqual({ mode: "x" });
  });
  it("recurrence time with a duration", () => {
    for (const l of ["dt R d/1 09:30>+15m", "dt R w/1 mo 06:00>+45m", "dt R d/1 9?>+1h", "dt R w/1 mo,we n3 10:00>+48h s+1w"]) {
      expect(serializeDsl(parseDsl(l)), l).toBe(l);
    }
    const x = at("dt R d/1 09:30>+15m").recurrence!;
    expect(x.time).toEqual({ start: "09:30", end: "09:45" });
    expect(at("dt R w/1 mo 06:00>+45m").recurrence!.time).toEqual({ start: "06:00", end: "06:45" });
    expect(at("dt R d/1 23:30>+60m").recurrence!.time).toEqual({ start: "23:30", end: "00:30" });
    expect(at("dt R d/1 3?>+2h")).toMatchObject({ ambiguous: true });
    expect(at("dt R d/1 3?>+2h").recurrence!.time).toEqual({ start: "15:00", end: "17:00" });
    for (const bad of ["dt R d/1 09:30>+0m", "dt R d/1 09:30>+49h", "dt R d/1 09:30>+1441m", "dt R d/1 09:30>+15", "dt R d/1 >+15m", "d R d/1 09:30>+15m", "dt R d/1 09:30>+15m>", "dt R d/1 09:30>+015m", "dt R d/1 09:30>+2d"]) {
      expect(parseDsl(bad), bad).toEqual({ mode: "x" });
    }
  });
  it("open start with a date and time", () => {
    expect(at("dt >+0d 21:00")).toMatchObject({ kind: "range", open: "start", end: { date: "2026-11-03", time: "21:00" } });
    expect(at("dt >+0d 21:00").start).toBeUndefined();
    expect(at("d >+0d")).toMatchObject({ open: "start", end: { date: "2026-11-03" } });
    expect(serializeDsl(parseDsl("dt >+0d 21:00"))).toBe("dt >+0d 21:00");
    expect(serializeDsl(parseDsl("d >+0d"))).toBe("d >+0d");
    expect(at("dt >+0d 9?").end).toEqual({ date: "2026-11-03", time: "09:00" });
  });
});

describe("day of a relative month (D13@M-1)", () => {
  const today = "2026-11-04";
  it("resolves last, this and next month", () => {
    expect(resolveDsl("d D13@M-1", { today }).start?.date).toBe("2026-10-13");
    expect(resolveDsl("d D13@M+0", { today }).start?.date).toBe("2026-11-13");
    expect(resolveDsl("d D01@M+2", { today }).start?.date).toBe("2027-01-01");
    expect(resolveDsl("d D15@M-11", { today }).start?.date).toBe("2025-12-15");
  });
  it("keeps the time", () => {
    const r = resolveDsl("dt D13@M-1 15:00", { today });
    expect([r.start?.date, r.start?.time]).toEqual(["2026-10-13", "15:00"]);
  });
  it("is invalid when the month lacks the day", () => {
    expect(resolveDsl("d D31@M-1", { today: "2026-05-04" }).mode).toBe("x"); // April has 30 days
    expect(resolveDsl("d D31@M-1", { today }).start?.date).toBe("2026-10-31");
    expect(resolveDsl("d D29@M+3", { today }).mode).toBe("x"); // February 2027
  });
  it("normalizes one-digit days", () => {
    expect(serializeDsl(parseDsl("d D5@M-1")!)).toBe("d D05@M-1");
  });
});
