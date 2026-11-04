import { addDays, weekdayOf } from "@type-date/core";
import type { ResolvedRecurrence, Weekday } from "@type-date/core";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
export const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WD_LABEL: Record<Weekday, string> = {
  su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat",
};

const p2 = (n: number) => String(n).padStart(2, "0");
export const ymd = (y: number, m: number, d: number) => `${y}-${p2(m)}-${p2(d)}`;
export const parts = (s: string) => s.split("-").map(Number) as [number, number, number];

export interface View {
  y: number;
  m: number;
}

export const viewOf = (date: string): View => {
  const [y, m] = parts(date);
  return { y, m };
};
export const viewIndex = (v: View) => v.y * 12 + v.m - 1;
export const fromIndex = (i: number): View => ({ y: Math.floor(i / 12), m: (i % 12) + 1 });

export const fmtDate = (s: string) => {
  const [y, m, d] = parts(s);
  return `${MON[m - 1]} ${d}, ${y}`;
};
export const fmtShort = (s: string) => {
  const [, m, d] = parts(s);
  return `${MON[m - 1]} ${d}`;
};
export const monthLabel = (v: View) => `${MONTH[v.m - 1]} ${v.y}`;

export const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number) as [number, number];
  return `${h % 12 || 12}:${p2(m)} ${h < 12 ? "AM" : "PM"}`;
};

/** 42 dates (6 weeks) covering the month, starting on the week start. */
export function gridDays(v: View, weekStart: 0 | 1): string[] {
  const first = ymd(v.y, v.m, 1);
  const offset = (weekdayOf(first) - weekStart + 7) % 7;
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

/** Half-hour steps, plus any extra times (for example 4:15). */
export function timeOptions(extra: (string | undefined)[]): string[] {
  const set = new Set<string>();
  for (let i = 0; i < 48; i++) set.add(`${p2(i >> 1)}:${i % 2 ? "30" : "00"}`);
  for (const t of extra) if (t) set.add(t);
  return [...set].sort();
}

/** Shift a HH:MM time by 12 hours. */
export const flip12 = (t: string) => {
  const [h, m] = t.split(":").map(Number) as [number, number];
  return `${p2((h + 12) % 24)}:${p2(m)}`;
};

const ord = (n: number) => {
  const v = n % 100;
  const s = ["th", "st", "nd", "rd"];
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
};

export function describeRecurrence(r: ResolvedRecurrence): string {
  const unit = { d: "day", w: "week", m: "month", y: "year" }[r.freq];
  let s = r.interval > 1 ? `Every ${r.interval} ${unit}s` : `Every ${unit}`;
  if (r.days?.length) s += ` on ${r.days.map((d) => WD_LABEL[d]).join(", ")}`;
  if (r.monthDays?.length)
    s += ` on the ${r.monthDays.map((d) => (d < 0 ? "last day" : ord(d))).join(", ")}`;
  if (r.nth) s += ` on the ${r.nth.k < 0 ? "last" : ord(r.nth.k)} ${WD_LABEL[r.nth.wd]}`;
  if (r.yearDay) s += ` on ${MON[r.yearDay.m - 1]} ${r.yearDay.d}`;
  if (r.time) s += ` at ${fmtTime(r.time.start)}${r.time.end ? ` to ${fmtTime(r.time.end)}` : ""}`;
  if (r.count) s += `, ${r.count} times`;
  if (r.until) s += ` until ${fmtDate(r.until)}`;
  return s;
}
