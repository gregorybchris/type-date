import { addDays, weekdayOf } from "@type-date/core";
import type { ResolvedRecurrence, Weekday } from "@type-date/core";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
export const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const WD_LABEL: Record<Weekday, string> = {
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

export type TimeFormat = "12h" | "24h";
/** mdy: Oct 2, 2027. dmy: 2 Oct 2027. iso: 2027-10-02. */
export type DateFormat = "mdy" | "dmy" | "iso";

// Display formats. The picker sets them on every render, before any child formats text.
let timeFormat: TimeFormat = "12h";
let dateFormat: DateFormat = "mdy";
export function setFormats(time: TimeFormat, date: DateFormat) {
  timeFormat = time;
  dateFormat = date;
}

export const fmtDate = (s: string) => {
  const [y, m, d] = parts(s);
  if (dateFormat === "iso") return s;
  return dateFormat === "dmy" ? `${d} ${MON[m - 1]} ${y}` : `${MON[m - 1]} ${d}, ${y}`;
};
/** Date without the year: Oct 2, 2 Oct, or 10-02. */
export const fmtShort = (s: string) => {
  const [, m, d] = parts(s);
  if (dateFormat === "iso") return `${p2(m)}-${p2(d)}`;
  return dateFormat === "dmy" ? `${d} ${MON[m - 1]}` : `${MON[m - 1]} ${d}`;
};
export const monthLabel = (v: View) => `${MONTH[v.m - 1]} ${v.y}`;

export const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number) as [number, number];
  if (timeFormat === "24h") return `${p2(h)}:${p2(m)}`;
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

/** "9:30 - 9:45 AM", or "11:30 AM - 1:00 PM" across noon. */
export const fmtSpan = (a: string, b: string) => {
  const fa = fmtTime(a);
  const fb = fmtTime(b);
  if (timeFormat === "24h") return `${fa} - ${fb}`;
  return fa.slice(-2) === fb.slice(-2) ? `${fa.slice(0, -3)} - ${fb}` : `${fa} - ${fb}`;
};

/** 45 min, 2 h, 1 h 30 min. */
export const fmtDuration = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(" ");
};

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

/** "August", "June, July". */
export const monthNames = (months: number[]) => months.map((m) => MONTH[m - 1]).join(", ");

export function describeRecurrence(r: ResolvedRecurrence): string {
  const unit = { d: "day", w: "week", m: "month", y: "year" }[r.freq];
  let s = r.interval > 1 ? `Every ${r.interval} ${unit}s` : `Every ${unit}`;
  // Named day sets read shorter: "Every weekday" instead of "Every day on Mon, Tue, Wed, Thu, Fri".
  const set = !r.dayTimes?.length && r.days?.length && r.interval === 1 && (r.freq === "d" || r.freq === "w") ? [...r.days].sort().join() : "";
  const named = ({ "fr,mo,th,tu,we": "Every weekday", "sa,su": "Every weekend", "fr,mo,sa,su,th,tu,we": "Every day" } as Record<string, string>)[set];
  if (named) s = named;
  // a time per weekday: "on Tue at 1:30 PM, Thu at 3:00 PM"
  else if (r.dayTimes?.length) {
    s += ` on ${r.dayTimes.map((d) => `${WD_LABEL[d.wd]} at ${d.end ? fmtSpan(d.start, d.end) : fmtTime(d.start)}`).join(", ")}`;
  } else if (r.days?.length) s += ` on ${r.days.map((d) => WD_LABEL[d]).join(", ")}`;
  if (r.monthDays?.length)
    s += ` on the ${r.monthDays.map((d) => (d < 0 ? "last day" : ord(d))).join(", ")}`;
  for (const [i, n] of (r.nths ?? (r.nth ? [r.nth] : [])).entries()) {
    s += `${i ? "," : " on the"} ${n.k < 0 ? "last" : ord(n.k)} ${WD_LABEL[n.wd]}`;
  }
  if (r.months) s += ` in ${monthNames(r.months)}`;
  if (r.yearDay) s += ` on ${fmtShort(ymd(2000, r.yearDay.m, r.yearDay.d))}`;
  if (r.time && !r.dayTimes) s += ` at ${r.time.end ? fmtSpan(r.time.start, r.time.end) : fmtTime(r.time.start)}`;
  if (r.count) s += `, ${r.count} times`;
  if (r.until) s += ` until ${fmtDate(r.until)}`;
  return s;
}


// ---- time zones ----

/** Minutes east of UTC for a zone at an instant, or null for a name the browser does not know. */
export function zoneOffsetMin(zone: string, at: Date): number | null {
  const m = zone.match(/^([+-])(\d{2}):(\d{2})$/);
  if (m) return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]));
  if (zone === "UTC") return 0;
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: zone, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric",
    }).formatToParts(at);
    const v = (t: string) => Number(parts.find((p) => p.type === t)!.value);
    return Math.round((Date.UTC(v("year"), v("month") - 1, v("day"), v("hour"), v("minute"), v("second")) - Math.floor(at.getTime() / 1000) * 1000) / 60000);
  } catch {
    return null;
  }
}

/** The instant of a wall-clock date and time in a zone. */
export function zonedInstant(date: string, time: string, zone: string): Date | null {
  const [y, mo, d] = parts(date);
  const [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const off = zoneOffsetMin(zone, new Date(guess));
  if (off === null) return null;
  let inst = guess - off * 60000;
  const off2 = zoneOffsetMin(zone, new Date(inst));
  if (off2 !== null && off2 !== off) inst = guess - off2 * 60000; // across a daylight saving change
  return new Date(inst);
}

/** A wall-clock date and time in `zone`, shown in `userZone`. Null when either zone is unknown. */
export function inUserZone(date: string, time: string, zone: string, userZone: string): { date: string; time: string } | null {
  const inst = zonedInstant(date, time, zone);
  const off = inst && zoneOffsetMin(userZone, inst);
  if (!inst || off === null || off === undefined) return null;
  const local = new Date(inst.getTime() + off * 60000);
  const p2n = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${local.getUTCFullYear()}-${p2n(local.getUTCMonth() + 1)}-${p2n(local.getUTCDate())}`,
    time: `${p2n(local.getUTCHours())}:${p2n(local.getUTCMinutes())}`,
  };
}

/** A short label for a zone: "PST", "UTC", "UTC+5:30", or the city for names without an abbreviation. */
export function zoneLabel(zone: string, date?: string): string {
  const m = zone.match(/^([+-])(\d{2}):(\d{2})$/);
  if (m) return `UTC${m[1]}${Number(m[2])}${m[3] === "00" ? "" : ":" + m[3]}`;
  if (zone === "UTC") return "UTC";
  try {
    const at = date ? new Date(`${date}T12:00:00Z`) : new Date();
    const name = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "short" }).formatToParts(at).find((p) => p.type === "timeZoneName")?.value;
    if (name && !name.startsWith("GMT")) return name;
    if (name) return name.replace("GMT", "UTC");
  } catch {
    /* unknown zone */
  }
  return zone.split("/").pop()!.replace(/_/g, " ");
}
