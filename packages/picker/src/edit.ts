import type { Resolved, ResolvedPoint } from "@type-date/core";
import { addDays } from "@type-date/core";
import { flip12, fmtDate, fmtShort, fmtDuration, fmtTime, describeRecurrence } from "./dates";

export type Target = "start" | "end";

/** Apply a clicked day. Returns the new value and the new range anchor. */
export function pickDate(r: Resolved | null, date: string, anchor: string | null): [Resolved, string | null] {
  const mode = !r || r.mode === "x" ? "d" : r.mode === "t" ? "dt" : r.mode;
  if (r?.kind === "list" && r.dates) {
    const has = r.dates.includes(date);
    const dates = has ? r.dates.filter((x) => x !== date) : [...r.dates, date].sort();
    if (!dates.length) return [r, null];
    if (dates.length === 1) {
      const time = r.time;
      return [{ mode: time ? "dt" : "d", kind: "single", start: time ? { date: dates[0]!, time } : { date: dates[0]! }, ambiguous: false }, null];
    }
    return [{ ...r, dates }, null];
  }
  if (r?.open) {
    // A tap moves the known side. The range stays one-sided.
    const key = r.open === "end" ? "start" : "end";
    return [{ ...r, mode, [key]: { ...r[key], date } }, null];
  }
  if (r?.kind === "range") {
    if (anchor) {
      const [lo, hi] = anchor <= date ? [anchor, date] : [date, anchor];
      return [{ ...r, mode, ambiguous: r.ambiguous, start: { ...r.start, date: lo }, end: { ...r.end, date: hi } }, null];
    }
    const { durationMin: _d, endNextDay: _n, ...rest } = r;
    return [{ ...rest, mode, start: { ...r.start, date }, end: { ...r.end, date } }, date];
  }
  const time = r?.kind === "recurrence" ? r.recurrence?.time?.start : r?.start?.time;
  const start: ResolvedPoint = time ? { date, time } : { date };
  return [{ mode: time ? "dt" : mode === "dt" ? "d" : mode, kind: "single", start, ambiguous: false }, null];
}

/**
 * Cmd or ctrl-click: add the day to the selection as a list of dates ("oct 2, oct 9 and oct 16"). A single day becomes
 * a list of two. A list toggles the day. Any other selection (a range, a recurrence, nothing) starts over with the
 * clicked day as a single day, ready for more cmd-clicks.
 */
export function toggleListDate(r: Resolved | null, date: string): Resolved {
  if (r?.kind === "list" && r.dates) return pickDate(r, date, null)[0];
  const startTime = r?.kind === "recurrence" ? r.recurrence?.time?.start : r?.start?.time;
  const one = (r?.kind === "single" || (r?.kind === "range" && r.start?.date === r.end?.date)) && !r.open ? r.start?.date : undefined;
  if (one && one !== date) {
    return { mode: startTime ? "dt" : "d", kind: "list", dates: [one, date].sort(), ...(startTime ? { time: startTime } : {}), ambiguous: false };
  }
  if (one) return r!;
  return { mode: startTime ? "dt" : "d", kind: "single", start: startTime ? { date, time: startTime } : { date }, ambiguous: false };
}

/** Shift-click on a list of dates: add every day from `from` to `to` (either order) to the list. */
export function extendList(r: Resolved, from: string, to: string): Resolved {
  const [lo, hi] = from <= to ? [from, to] : [to, from];
  const dates = new Set(r.dates ?? []);
  for (let d = lo; d <= hi; d = addDays(d, 1)) dates.add(d);
  return { ...r, dates: [...dates].sort() };
}

/** The date a shift-click extends from: a single day, or the start of a closed range. Null for anything else. */
export function rangeAnchor(r: Resolved | null): string | null {
  if (!r || r.open) return null;
  if (r.kind === "single" || (r.kind === "range" && r.start?.date)) return r.start?.date ?? null;
  return null;
}

/** A closed range between two days, in either order. The same day gives a single day. Times carry over. */
export function pickRange(r: Resolved | null, a: string, b: string): Resolved {
  const [lo, hi] = a <= b ? [a, b] : [b, a];
  const startTime = r?.kind === "recurrence" ? r.recurrence?.time?.start : r?.kind === "list" ? r.time : r?.start?.time;
  const endTime = r?.kind === "range" ? (r.end?.time ?? startTime) : startTime;
  const point = (date: string, time?: string): ResolvedPoint => (time ? { date, time } : { date });
  if (lo === hi) {
    return { mode: startTime ? "dt" : "d", kind: "single", start: point(lo, startTime), ambiguous: false };
  }
  return {
    mode: startTime || endTime ? "dt" : "d",
    kind: "range",
    start: point(lo, startTime),
    end: point(hi, endTime),
    ambiguous: false,
  };
}

export function pickTime(r: Resolved, time: string, target: Target, day = 0): Resolved {
  if (r.kind === "recurrence" && r.recurrence?.dayTimes?.[day]) {
    // a time per weekday: only the chosen weekday changes
    const dayTimes = r.recurrence.dayTimes.map((d, i) => (i === day ? { ...d, start: time } : d));
    const first = dayTimes[0]!;
    return { ...r, ambiguous: false, recurrence: { ...r.recurrence, dayTimes, time: { start: first.start, ...(first.end ? { end: first.end } : {}) } } };
  }
  if (r.kind === "recurrence" && r.recurrence) {
    const t = r.recurrence.time;
    return { ...r, ambiguous: false, recurrence: { ...r.recurrence, time: { ...t, start: time } } };
  }
  if (r.kind === "list") return { ...r, mode: "dt", ambiguous: false, time };
  const key = r.open === "start" ? "end" : r.kind === "range" && !r.open ? target : "start";
  const mode = r.mode === "x" ? "t" : r.mode;
  if (r.durationMin) {
    // Moving the start keeps the length. Moving the end ends the duration form.
    if (key === "start") return withDuration({ ...r, ambiguous: false, start: { ...r.start, time } }, r.durationMin);
    const { durationMin: _d, endNextDay: _n, ...rest } = r;
    return { ...rest, mode, ambiguous: false, end: { ...r.end, time } };
  }
  return { ...r, mode, ambiguous: false, [key]: { ...r[key], time } };
}

/** Recompute the end of a duration range from its start. */
function withDuration(r: Resolved, min: number): Resolved {
  const st = r.start?.time;
  if (!st) return r;
  const total = Number(st.slice(0, 2)) * 60 + Number(st.slice(3)) + min;
  const days = Math.floor(total / 1440);
  const t = total % 1440;
  const time = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  const { endNextDay: _n, ...rest } = r;
  const end: ResolvedPoint = r.start?.date ? { date: addDays(r.start.date, days), time } : { time };
  return { ...rest, end, ...(!r.start?.date && days > 0 ? { endNextDay: true as const } : {}) };
}

export function flipMeridiem(r: Resolved): Resolved {
  if (r.kind === "list" && r.time) return { ...r, ambiguous: false, time: flip12(r.time) };
  if (r.durationMin) {
    const s = r.start?.time;
    return withDuration({ ...r, ambiguous: false, start: { ...r.start, time: s ? flip12(s) : s } }, r.durationMin);
  }
  const f = (p?: ResolvedPoint) => (p?.time ? { ...p, time: flip12(p.time) } : p);
  const flip = (t: { start: string; end?: string }) => ({ start: flip12(t.start), ...(t.end ? { end: flip12(t.end) } : {}) });
  const rec = r.recurrence;
  const t = rec?.time;
  return {
    ...r,
    ambiguous: false,
    start: f(r.start),
    end: f(r.end),
    recurrence: rec && t ? { ...rec, time: flip(t), ...(rec.dayTimes ? { dayTimes: rec.dayTimes.map((d) => ({ ...d, ...flip(d) })) } : {}) } : rec,
  };
}

/** Plain-text summary used for the live region. */
export function summarize(r: Resolved | null): string {
  if (!r || r.mode === "x") return "No date or time";
  if (r.kind === "recurrence" && r.recurrence) return describeRecurrence(r.recurrence);
  const pt = (p?: ResolvedPoint) => [p?.date && fmtDate(p.date), p?.time && fmtTime(p.time)].filter(Boolean).join(" ");
  if (r.kind === "list" && r.dates) {
    const shown = r.dates.slice(0, 4).map(fmtShort).join(", ");
    return `${r.dates.length} dates: ${shown}${r.dates.length > 4 ? ", ..." : ""}${r.time ? ` at ${fmtTime(r.time)}` : ""}`;
  }
  if (r.open) return r.open === "end" ? `After ${pt(r.start)}` : `Before ${pt(r.end)}`;
  if (r.kind === "range") {
    const a = r.start;
    const b = r.end;
    const dur = r.durationMin ? ` (${fmtDuration(r.durationMin)})` : "";
    if (a?.date && b?.date && a.date === b.date && a.time && b.time) return `${fmtDate(a.date)}, ${fmtTime(a.time)} to ${fmtTime(b.time)}${dur}`;
    return `${pt(a)} to ${pt(b)}${r.endNextDay ? " next day" : ""}${dur}`;
  }
  return pt(r.start);
}
