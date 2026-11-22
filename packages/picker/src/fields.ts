import type { Resolved } from "@type-date/core";
import { WD_LABEL, describeRecurrence, fmtDate, fmtTime } from "./dates";
import type { Target } from "./edit";

/** What the picker shows for a result: which panels, which times, which date each endpoint has. */
export interface Derived {
  mode: "d" | "t" | "dt";
  showCal: boolean;
  showTime: boolean;
  isRange: boolean;
  isList: boolean;
  /** The time the start and end controls edit. With a time per weekday, the selected weekday's time. */
  startTime?: string;
  endTime?: string;
  /** The endpoint the time list edits. A one-sided range edits the side it has. */
  tgt: Target;
  startDate?: string;
  endDate?: string;
}

export function derive(r: Resolved | null, target: Target, dayIdx: number): Derived {
  const mode = r && r.mode !== "x" ? r.mode : "d";
  const rec = r?.recurrence;
  const isList = r?.kind === "list";
  const dayTime = rec?.dayTimes?.[dayIdx];
  return {
    mode,
    showCal: mode !== "t",
    showTime: mode !== "d",
    isRange: r?.kind === "range",
    isList,
    startTime: rec ? (dayTime ?? rec.time)?.start : isList ? r?.time : r?.start?.time,
    endTime: rec ? (dayTime ?? rec.time)?.end : r?.end?.time,
    tgt: r?.open === "start" ? "end" : r?.open === "end" ? "start" : target,
    startDate: r?.start?.date ?? r?.dates?.[0],
    endDate: r?.end?.date,
  };
}

/** What a click on a field does: move to an endpoint's month, pick which time the list edits, or pick a weekday. */
export type FieldAction = { type: "jump"; target: Target } | { type: "time"; target: Target } | { type: "day"; idx: number };

export interface FieldSeg {
  key: string;
  kind: "date" | "time" | "text";
  label: string;
  active: boolean;
  action: FieldAction;
  /** The time is on the day after the start. */
  nextDay?: boolean;
}

export interface FieldBox {
  key: string;
  /** Segments in one bordered box (date | time). False: each segment is its own button (recurrences). */
  boxed: boolean;
  segs: FieldSeg[];
  /** A "to" label before the box. */
  to?: boolean;
  /** A dash after this segment index (a one-day range: date | start – end). */
  dashAfter?: number;
  /** Weekday chips for a recurrence with a time per weekday. */
  days?: boolean;
}

export interface FieldModel {
  /** Two boxes, start above end, with aligned columns (a multi-day date-time range). */
  stack: boolean;
  boxes: FieldBox[];
}

/**
 * The fields above the calendar, as data. One box per endpoint ([date | time]). A range within one day, or a
 * time-only range, is a single box [date | start – end]. A multi-day date-time range is two stacked boxes.
 */
export function fieldModel(r: Resolved | null, target: Target, dayIdx: number): FieldModel {
  if (!r) return { stack: false, boxes: [] };
  const d = derive(r, target, dayIdx);
  const rec = r.recurrence;

  if (r.kind === "recurrence" && rec) {
    const boxes: FieldBox[] = [
      { key: "rule", boxed: false, segs: [{ key: "rule", kind: "text", label: describeRecurrence(rec), active: true, action: { type: "jump", target: "start" } }] },
    ];
    if (rec.dayTimes && d.showTime) {
      boxes.push({
        key: "days",
        boxed: false,
        days: true,
        segs: rec.dayTimes.map((t, i) => ({
          key: t.wd,
          kind: "text" as const,
          label: `${WD_LABEL[t.wd]} ${fmtTime(t.start)}`,
          active: i === dayIdx,
          action: { type: "day" as const, idx: i },
        })),
      });
    }
    return { stack: false, boxes };
  }

  if (d.isList && r.dates) {
    const segs: FieldSeg[] = [
      { key: "date", kind: "date", label: `${r.dates.length} dates`, active: !d.showTime, action: { type: "jump", target: "start" } },
    ];
    if (d.showTime && d.startTime) segs.push({ key: "time", kind: "time", label: fmtTime(d.startTime), active: true, action: { type: "time", target: "start" } });
    return { stack: false, boxes: [{ key: "start", boxed: true, segs }] };
  }

  const open = r.open;
  const endDate = d.isRange && open !== "end" ? d.endDate : undefined;
  const oneDay = d.isRange && !open && d.showTime && !!d.endTime && (!d.showCal || !endDate || endDate === d.startDate);
  const stack = d.isRange && !open && !oneDay && d.showCal && d.showTime;
  // The end is on the next day: flagged by the resolver, or a time-only range that ends before it starts.
  const nextDay = !!r.endNextDay || (d.isRange && !d.showCal && !!d.startTime && !!d.endTime && d.endTime < d.startTime);
  const endTimeSeg = (): FieldSeg => ({
    key: "end-time",
    kind: "time",
    label: fmtTime(d.endTime!),
    active: d.tgt === "end",
    action: { type: "time", target: "end" },
    nextDay,
  });

  const start: FieldBox = { key: "start", boxed: true, segs: [] };
  if (d.showCal && d.startDate) {
    start.segs.push({ key: "start-date", kind: "date", label: fmtDate(d.startDate), active: d.mode === "d" && !d.isRange, action: { type: "jump", target: "start" } });
  }
  if (d.showTime && d.startTime) {
    start.segs.push({ key: "start-time", kind: "time", label: fmtTime(d.startTime), active: d.tgt === "start", action: { type: "time", target: "start" } });
  }
  if (oneDay) {
    start.dashAfter = start.segs.length - 1;
    start.segs.push(endTimeSeg());
  }
  const boxes = [start];

  if (d.isRange && open !== "end" && !oneDay) {
    const end: FieldBox = { key: "end", boxed: true, to: !open, segs: [] };
    if (d.showCal && endDate) end.segs.push({ key: "end-date", kind: "date", label: fmtDate(endDate), active: false, action: { type: "jump", target: "end" } });
    if (d.showTime && d.endTime) end.segs.push(endTimeSeg());
    boxes.push(end);
  }
  return { stack, boxes: boxes.filter((b) => b.segs.length > 0 || b.to) };
}
