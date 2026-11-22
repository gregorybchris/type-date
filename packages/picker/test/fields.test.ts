import type { Resolved } from "@type-date/core";
import { describe, expect, it } from "vitest";
import { setFormats } from "../src/dates";
import { fieldModel } from "../src/fields";
import type { FieldModel } from "../src/fields";

setFormats("12h", "mdy");

/** A compact view of the model: boxes as "to? [a | b – c]", segments marked * when active and + for next day. */
function show(m: FieldModel): string {
  const boxes = m.boxes.map((b) => {
    const segs = b.segs.map((s, i) => `${i - 1 === b.dashAfter ? "– " : i > 0 ? "| " : ""}${s.label}${s.nextDay ? "+" : ""}${s.active ? "*" : ""}`);
    const body = b.boxed ? `[${segs.join(" ")}]` : segs.join(" ");
    return `${b.to ? "to " : ""}${body}`;
  });
  return (m.stack ? "stack: " : "") + boxes.join(" ");
}

const r = (x: Partial<Resolved>): Resolved => ({ mode: "dt", kind: "single", ambiguous: false, ...x });

describe("fieldModel", () => {
  it("is empty without a result", () => {
    expect(fieldModel(null, "start", 0)).toEqual({ stack: false, boxes: [] });
  });

  it("single date, single date-time", () => {
    expect(show(fieldModel(r({ mode: "d", start: { date: "2026-11-22" } }), "start", 0))).toBe("[Nov 22, 2026*]");
    expect(show(fieldModel(r({ start: { date: "2026-11-22", time: "15:00" } }), "start", 0))).toBe("[Nov 22, 2026 | 3:00 PM*]");
  });

  it("one-day time range: one box, date | start – end; the target moves the mark", () => {
    const one = r({ kind: "range", start: { date: "2026-11-22", time: "15:00" }, end: { date: "2026-11-22", time: "16:00" } });
    expect(show(fieldModel(one, "start", 0))).toBe("[Nov 22, 2026 | 3:00 PM* – 4:00 PM]");
    expect(show(fieldModel(one, "end", 0))).toBe("[Nov 22, 2026 | 3:00 PM – 4:00 PM*]");
  });

  it("multi-day date-time range: two stacked boxes", () => {
    const m = r({ kind: "range", start: { date: "2026-11-22", time: "14:00" }, end: { date: "2026-11-27", time: "16:00" } });
    expect(show(fieldModel(m, "start", 0))).toBe("stack: [Nov 22, 2026 | 2:00 PM*] to [Nov 27, 2026 | 4:00 PM]");
  });

  it("date range: two boxes joined by 'to', not stacked", () => {
    const m = r({ mode: "d", kind: "range", start: { date: "2027-10-02" }, end: { date: "2027-10-05" } });
    expect(show(fieldModel(m, "start", 0))).toBe("[Oct 2, 2027] to [Oct 5, 2027]");
  });

  it("time-only range; overnight marks the next day with or without the resolver flag", () => {
    const t = (start: string, end: string, x: Partial<Resolved> = {}) =>
      show(fieldModel(r({ mode: "t", kind: "range", start: { time: start }, end: { time: end }, ...x }), "start", 0));
    expect(t("16:00", "16:30")).toBe("[4:00 PM* – 4:30 PM]");
    expect(t("23:00", "01:00")).toBe("[11:00 PM* – 1:00 AM+]");
    expect(t("23:00", "01:00", { endNextDay: true, durationMin: 120 })).toBe("[11:00 PM* – 1:00 AM+]");
  });

  it("one-sided ranges: only the side they have, no 'to'", () => {
    expect(show(fieldModel(r({ mode: "d", kind: "range", open: "end", start: { date: "2027-10-02" } }), "start", 0))).toBe("[Oct 2, 2027]");
    expect(show(fieldModel(r({ mode: "d", kind: "range", open: "start", end: { date: "2027-10-02" } }), "start", 0))).toBe("[Oct 2, 2027]");
  });

  it("list of dates, with and without a shared time", () => {
    const dates = ["2026-11-23", "2026-11-25"];
    expect(show(fieldModel(r({ mode: "d", kind: "list", dates }), "start", 0))).toBe("[2 dates*]");
    expect(show(fieldModel(r({ kind: "list", dates, time: "09:00" }), "start", 0))).toBe("[2 dates | 9:00 AM*]");
  });

  it("recurrence: the rule, plus weekday chips when each weekday has its own time", () => {
    const base = { freq: "w" as const, interval: 1, dtstart: "2026-11-24" };
    expect(show(fieldModel(r({ kind: "recurrence", recurrence: { ...base, days: ["mo", "tu", "we", "th", "fr"], time: { start: "09:00" } } }), "start", 0))).toBe(
      "Every weekday at 9:00 AM*",
    );
    const dayTimes = [
      { wd: "tu" as const, start: "13:30" },
      { wd: "th" as const, start: "15:00" },
    ];
    const rec = r({ kind: "recurrence", recurrence: { ...base, days: ["tu", "th"], dayTimes, time: { start: "13:30" } } });
    expect(show(fieldModel(rec, "start", 1))).toBe("Every week on Tue at 1:30 PM, Thu at 3:00 PM* Tue 1:30 PM | Thu 3:00 PM*");
  });
});
