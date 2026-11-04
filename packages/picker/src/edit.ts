import type { Resolved, ResolvedPoint } from "@type-date/core";
import { flip12, fmtDate, fmtTime, describeRecurrence } from "./dates";

export type Target = "start" | "end";

/** Apply a clicked day. Returns the new value and the new range anchor. */
export function pickDate(r: Resolved | null, date: string, anchor: string | null): [Resolved, string | null] {
  const mode = !r || r.mode === "x" ? "d" : r.mode === "t" ? "dt" : r.mode;
  if (r?.kind === "range") {
    if (anchor) {
      const [lo, hi] = anchor <= date ? [anchor, date] : [date, anchor];
      return [{ ...r, mode, ambiguous: r.ambiguous, start: { ...r.start, date: lo }, end: { ...r.end, date: hi } }, null];
    }
    return [{ ...r, mode, start: { ...r.start, date }, end: { ...r.end, date } }, date];
  }
  const time = r?.kind === "recurrence" ? r.recurrence?.time?.start : r?.start?.time;
  const start: ResolvedPoint = time ? { date, time } : { date };
  return [{ mode: time ? "dt" : mode === "dt" ? "d" : mode, kind: "single", start, ambiguous: false }, null];
}

export function pickTime(r: Resolved, time: string, target: Target): Resolved {
  if (r.kind === "recurrence" && r.recurrence) {
    const t = r.recurrence.time;
    return { ...r, ambiguous: false, recurrence: { ...r.recurrence, time: { ...t, start: time } } };
  }
  const key = r.kind === "range" ? target : "start";
  const mode = r.mode === "x" ? "t" : r.mode;
  return { ...r, mode, ambiguous: false, [key]: { ...r[key], time } };
}

export function flipMeridiem(r: Resolved): Resolved {
  const f = (p?: ResolvedPoint) => (p?.time ? { ...p, time: flip12(p.time) } : p);
  const rec = r.recurrence;
  const t = rec?.time;
  return {
    ...r,
    ambiguous: false,
    start: f(r.start),
    end: f(r.end),
    recurrence: rec && t ? { ...rec, time: { start: flip12(t.start), ...(t.end ? { end: flip12(t.end) } : {}) } } : rec,
  };
}

/** Plain-text summary used for the live region. */
export function summarize(r: Resolved | null): string {
  if (!r || r.mode === "x") return "No date or time";
  if (r.kind === "recurrence" && r.recurrence) return describeRecurrence(r.recurrence);
  const pt = (p?: ResolvedPoint) => [p?.date && fmtDate(p.date), p?.time && fmtTime(p.time)].filter(Boolean).join(" ");
  if (r.kind === "range") {
    const a = r.start;
    const b = r.end;
    if (a?.date && b?.date && a.date === b.date && a.time && b.time) return `${fmtDate(a.date)}, ${fmtTime(a.time)} to ${fmtTime(b.time)}`;
    return `${pt(a)} to ${pt(b)}`;
  }
  return pt(r.start);
}
