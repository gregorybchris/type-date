import { parseDsl } from "./dsl";
import type {
  DateSpec,
  Parsed,
  Point,
  RecSpec,
  Resolved,
  ResolveOptions,
  ResolvedPoint,
  ResolvedRecurrence,
  TimeSpec,
  OffUnit,
  Unit,
  Weekday,
} from "./types";
import { WEEKDAYS } from "./types";

// ---- calendar helpers (floating dates, UTC math) ----

const DAY_MS = 86_400_000;
const p2 = (n: number) => String(n).padStart(2, "0");

export function toDays(s: string): number {
  const [y, m, d] = s.split("-").map(Number) as [number, number, number];
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
}
export function fromDays(n: number): string {
  const dt = new Date(n * DAY_MS);
  return `${dt.getUTCFullYear()}-${p2(dt.getUTCMonth() + 1)}-${p2(dt.getUTCDate())}`;
}
export function weekdayOf(s: string): number {
  return new Date(toDays(s) * DAY_MS).getUTCDay();
}
const wdIndex = (wd: Weekday) => WEEKDAYS.indexOf(wd);
export function isLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
export function daysInMonth(y: number, m: number): number {
  return [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1] as number;
}
const ymd = (y: number, m: number, d: number) => `${y}-${p2(m)}-${p2(d)}`;
const parts = (s: string) => s.split("-").map(Number) as [number, number, number];

export function addDays(s: string, n: number): string {
  return fromDays(toDays(s) + n);
}
export function addMonths(s: string, n: number): string {
  const [y, m, d] = parts(s);
  const idx = y * 12 + (m - 1) + n;
  const ny = Math.floor(idx / 12);
  const nm = (idx % 12) + 1;
  return ymd(ny, nm, Math.min(d, daysInMonth(ny, nm)));
}

const isWeekend = (s: string) => weekdayOf(s) % 6 === 0;

/** Move `n` business days (Mon-Fri). From a weekend, +1b is the next Monday and -1b the previous Friday. +0b rolls forward. */
export function addBusinessDays(s: string, n: number): string {
  let d = s;
  if (n === 0) {
    while (isWeekend(d)) d = addDays(d, 1);
    return d;
  }
  const step = n < 0 ? -1 : 1;
  for (let left = Math.abs(n); left > 0; ) {
    d = addDays(d, step);
    if (!isWeekend(d)) left--;
  }
  return d;
}

function applyOffset(s: string, n: number, u: OffUnit): string {
  if (u === "d") return addDays(s, n);
  if (u === "w") return addDays(s, n * 7);
  if (u === "m") return addMonths(s, n);
  if (u === "y") return addMonths(s, n * 12);
  return addBusinessDays(s, n);
}

export function localToday(): string {
  const n = new Date();
  return ymd(n.getFullYear(), n.getMonth() + 1, n.getDate());
}

/** First date on or after `from` with the given weekday. */
function nextWeekday(from: string, wd: Weekday): string {
  const diff = (wdIndex(wd) - weekdayOf(from) + 7) % 7;
  return addDays(from, diff);
}

function nthWeekdayOfMonth(y: number, m: number, wd: Weekday, nth: number): string | null {
  if (nth > 0) {
    const first = ymd(y, m, 1);
    const day = addDays(nextWeekday(first, wd), (nth - 1) * 7);
    return parts(day)[1] === m ? day : null;
  }
  const last = ymd(y, m, daysInMonth(y, m));
  const back = (weekdayOf(last) - wdIndex(wd) + 7) % 7;
  return addDays(last, -back);
}

interface DateRange {
  start: string;
  end: string;
}

function quarter(y: number, q: number): DateRange {
  const m = (q - 1) * 3 + 1;
  return { start: ymd(y, m, 1), end: ymd(y, m + 2, daysInMonth(y, m + 2)) };
}

function weekRange(today: string, n: number, weekStart: 0 | 1): DateRange {
  const back = (weekdayOf(today) - weekStart + 7) % 7;
  const start = addDays(today, -back + n * 7);
  return { start, end: addDays(start, 6) };
}

/** Resolve a date spec. `ref` is the date that "on or after" rules use. */
export function resolveDate(
  spec: DateSpec,
  today: string,
  ref: string = today,
  weekStart: 0 | 1 = 0,
): DateRange | null {
  const single = (s: string): DateRange => ({ start: s, end: s });
  switch (spec.k) {
    case "abs": {
      if (spec.y !== null) return single(ymd(spec.y, spec.m, spec.d));
      if (spec.past) {
        const [ty] = parts(today);
        for (let y = ty; y >= ty - 8; y--) {
          if (spec.d > daysInMonth(y, spec.m)) continue;
          const cand = ymd(y, spec.m, spec.d);
          if (toDays(cand) <= toDays(today)) return single(cand);
        }
        return null;
      }
      const [ry] = parts(ref);
      for (let y = ry; y <= ry + 8; y++) {
        if (spec.d > daysInMonth(y, spec.m)) continue;
        const cand = ymd(y, spec.m, spec.d);
        if (toDays(cand) >= toDays(ref)) return single(cand);
      }
      return null;
    }
    case "off":
      return single(applyOffset(today, spec.n, spec.u));
    case "anc": {
      const base = resolveDate(spec.base, today, ref, weekStart);
      return base ? single(applyOffset(base.start, spec.n, spec.u)) : null;
    }
    case "wd": {
      if (spec.n === 0 && spec.past) {
        const back = (weekdayOf(today) - wdIndex(spec.wd) + 7) % 7;
        return single(addDays(today, -back));
      }
      if (spec.n === 0) return single(nextWeekday(ref, spec.wd));
      if (spec.n > 0) {
        return single(addDays(nextWeekday(addDays(today, 1), spec.wd), (spec.n - 1) * 7));
      }
      const back = ((weekdayOf(today) - wdIndex(spec.wd) + 6) % 7) + 1; // 1..7 days back
      return single(addDays(today, -back - (-spec.n - 1) * 7));
    }
    case "nth": {
      const [ry] = parts(ref);
      for (let y = ry; y <= ry + 2; y++) {
        const cand = nthWeekdayOfMonth(y, spec.month, spec.wd, spec.nth);
        if (cand && toDays(cand) >= toDays(ref)) return single(cand);
      }
      return null;
    }
    case "per": {
      if (spec.u === "w") return weekRange(today, spec.n, weekStart);
      const [y, m] = parts(today);
      if (spec.u === "q") {
        const idx = y * 4 + Math.floor((m - 1) / 3) + spec.n;
        return quarter(Math.floor(idx / 4), (idx % 4 + 4) % 4 + 1);
      }
      if (spec.u === "m") {
        const idx = y * 12 + (m - 1) + spec.n;
        const ny = Math.floor(idx / 12);
        const nm = (idx % 12) + 1;
        return { start: ymd(ny, nm, 1), end: ymd(ny, nm, daysInMonth(ny, nm)) };
      }
      return { start: ymd(y + spec.n, 1, 1), end: ymd(y + spec.n, 12, 31) };
    }
    case "qtr": {
      const [ry] = parts(ref);
      for (let y = ry; y <= ry + 1; y++) {
        const q = quarter(y, spec.q);
        if (toDays(q.end) >= toDays(ref)) return q;
      }
      return null;
    }
    case "mon": {
      if (spec.past) {
        const [ty, tm] = parts(today);
        const y = spec.month <= tm ? ty : ty - 1;
        return { start: ymd(y, spec.month, 1), end: ymd(y, spec.month, daysInMonth(y, spec.month)) };
      }
      const [ry] = parts(ref);
      for (let y = ry; y <= ry + 1; y++) {
        const end = ymd(y, spec.month, daysInMonth(y, spec.month));
        if (toDays(end) >= toDays(ref)) return { start: ymd(y, spec.month, 1), end };
      }
      return null;
    }
    case "yr":
      return { start: ymd(spec.year, 1, 1), end: ymd(spec.year, 12, 31) };
    case "dom": {
      // Months with fewer days are skipped. 4 years of months always contain a 31st and a leap 29th.
      const [ry, rm] = parts(ref);
      for (let i = 0; i < 60; i++) {
        const idx = ry * 12 + (rm - 1) + i;
        const y = Math.floor(idx / 12);
        const m = (idx % 12) + 1;
        if (spec.d > daysInMonth(y, m)) continue;
        const cand = ymd(y, m, spec.d);
        if (toDays(cand) >= toDays(ref)) return single(cand);
      }
      return null;
    }
  }
}

// ---- times ----

function ruleHour24(t: TimeSpec): number {
  if (!t.amb) return t.h;
  if (t.h === 12) return 12;
  return t.h >= 7 ? t.h : t.h + 12; // 7-11 AM, 1-6 PM
}
const hm = (h: number, m: number) => `${p2(h)}:${p2(m)}`;

function resolveStartTime(t: TimeSpec): string {
  return hm(ruleHour24(t), t.m);
}

/** Resolve the end time of a range given the resolved start time (HH:MM). */
function resolveEndTime(t: TimeSpec, start: string | undefined): string {
  if (!t.amb || !start) return resolveStartTime(t);
  const sMin = Number(start.slice(0, 2)) * 60 + Number(start.slice(3));
  const startPm = Number(start.slice(0, 2)) >= 12;
  const base = t.h % 12;
  const inherit = base + (startPm ? 12 : 0);
  const flip = base + (startPm ? 0 : 12);
  for (const h of [inherit, flip]) {
    if (h * 60 + t.m > sMin) return hm(h, t.m);
  }
  return hm(inherit, t.m);
}

// ---- recurrence ----

function firstOccurrence(rec: RecSpec, from: string, weekStart: 0 | 1): string {
  // Find the first match ignoring interval, count, and until.
  const loose = { ...toResolvedRec({ ...rec, count: undefined, until: undefined }, from, from) };
  loose.interval = 1;
  return occurrencesFrom(loose, from, 1, weekStart, true)[0] ?? from;
}

function toResolvedRec(rec: RecSpec, dtstart: string, today: string): ResolvedRecurrence {
  const out: ResolvedRecurrence = { freq: rec.freq, interval: rec.interval, dtstart };
  if (rec.days) out.days = rec.days;
  if (rec.monthDays) out.monthDays = rec.monthDays;
  if (rec.nth) {
    out.nth = rec.nth[0]!;
    if (rec.nth.length > 1) out.nths = rec.nth;
  }
  if (rec.months) out.months = rec.months;
  if (rec.yearDay) out.yearDay = rec.yearDay;
  if (rec.count) out.count = rec.count;
  if (rec.until) {
    const u = resolveDate(rec.until, today, dtstart);
    if (u) out.until = u.end;
  }
  return out;
}

/**
 * Generate occurrence dates. `from` is the lower bound. If `anchored` is true the
 * returned dates start at or after `from` but the series is counted from dtstart.
 */
function occurrencesFrom(
  r: ResolvedRecurrence,
  from: string,
  limit: number,
  weekStart: 0 | 1,
  firstOnly = false,
): string[] {
  const out: string[] = [];
  const startN = toDays(r.dtstart);
  const fromN = Math.max(toDays(from), startN);
  const untilN = r.until ? toDays(r.until) : Number.POSITIVE_INFINITY;
  const maxCount = r.count ?? Number.POSITIVE_INFINITY;
  let produced = 0;
  const horizon = startN + 366 * 30;
  const dayOk = (n: number): boolean => {
    const s = fromDays(n);
    const [y, m, d] = parts(s);
    if (r.months && !r.months.includes(m)) return false;
    if (r.freq === "d") {
      if ((n - startN) % r.interval !== 0) return false;
      return !r.days || r.days.includes(WEEKDAYS[weekdayOf(s)] as Weekday);
    }
    if (r.freq === "w") {
      const wk = (x: number) => Math.floor((x - startN + ((weekdayOf(r.dtstart) - weekStart + 7) % 7)) / 7);
      if (wk(n) % r.interval !== 0) return false;
      const days = r.days ?? [WEEKDAYS[weekdayOf(r.dtstart)] as Weekday];
      return days.includes(WEEKDAYS[weekdayOf(s)] as Weekday);
    }
    if (r.freq === "m") {
      const [sy, sm] = parts(r.dtstart);
      if (((y - sy) * 12 + (m - sm)) % r.interval !== 0) return false;
      const nths = r.nths ?? (r.nth ? [r.nth] : null);
      if (nths) return nths.some((x) => nthWeekdayOfMonth(y, m, x.wd, x.k) === s);
      const mds = r.monthDays ?? [parts(r.dtstart)[2]];
      return mds.some((md) => (md === -1 ? d === daysInMonth(y, m) : d === md));
    }
    // yearly
    const [sy] = parts(r.dtstart);
    if ((y - sy) % r.interval !== 0) return false;
    const yd = r.yearDay ?? { m: parts(r.dtstart)[1], d: parts(r.dtstart)[2] };
    return m === yd.m && d === yd.d;
  };
  for (let n = startN; n <= Math.min(untilN, horizon); n++) {
    if (!dayOk(n)) continue;
    produced++;
    if (produced > maxCount) break;
    if (n >= fromN) {
      out.push(fromDays(n));
      if (out.length >= limit || firstOnly) break;
    }
  }
  return out;
}

/** List occurrence dates of a resolved recurrence. */
export function occurrences(r: ResolvedRecurrence, limit = 10, weekStart: 0 | 1 = 0): string[] {
  return occurrencesFrom(r, r.dtstart, limit, weekStart);
}

const RR_DAY: Record<Weekday, string> = {
  su: "SU",
  mo: "MO",
  tu: "TU",
  we: "WE",
  th: "TH",
  fr: "FR",
  sa: "SA",
};
const RR_FREQ: Record<Unit, string> = { d: "DAILY", w: "WEEKLY", m: "MONTHLY", y: "YEARLY" };

/** Export an RFC 5545 RRULE string (without DTSTART). */
export function toRRule(r: ResolvedRecurrence): string {
  const p = [`FREQ=${RR_FREQ[r.freq]}`];
  if (r.interval > 1) p.push(`INTERVAL=${r.interval}`);
  if (r.days) p.push(`BYDAY=${r.days.map((d) => RR_DAY[d]).join(",")}`);
  const nths = r.nths ?? (r.nth ? [r.nth] : []);
  if (nths.length) p.push(`BYDAY=${nths.map((x) => `${x.k}${RR_DAY[x.wd]}`).join(",")}`);
  if (r.months) p.push(`BYMONTH=${r.months.join(",")}`);
  if (r.monthDays) p.push(`BYMONTHDAY=${r.monthDays.join(",")}`);
  if (r.yearDay) p.push(`BYMONTH=${r.yearDay.m}`, `BYMONTHDAY=${r.yearDay.d}`);
  if (r.count) p.push(`COUNT=${r.count}`);
  if (r.until) p.push(`UNTIL=${r.until.replaceAll("-", "")}`);
  return p.join(";");
}

// ---- top level ----

function resolvePoint(
  p: Point,
  today: string,
  ref: string,
  weekStart: 0 | 1,
  opts: { startTime?: string; inheritDate?: string; isEnd?: boolean },
): { point: ResolvedPoint; range?: DateRange; amb: boolean } | null {
  const out: ResolvedPoint = {};
  let range: DateRange | undefined;
  if (p.date) {
    const r = resolveDate(p.date, today, ref, weekStart);
    if (!r) return null;
    out.date = r.start;
    if (r.start !== r.end) range = r;
  } else if (opts.inheritDate) {
    out.date = opts.inheritDate;
  }
  let amb = false;
  if (p.time) {
    amb = p.time.amb;
    out.time = opts.isEnd
      ? resolveEndTime(p.time, opts.startTime)
      : resolveStartTime(p.time);
  }
  return { point: out, range, amb };
}

export function resolveParsed(parsed: Parsed, options: ResolveOptions = {}): Resolved {
  const today = options.today ?? localToday();
  const weekStart = options.weekStart ?? 0;
  if (parsed.mode === "x") return { mode: "x", kind: "none", ambiguous: false };
  const mode = parsed.mode;

  if (parsed.kind === "recurrence") {
    const rec = parsed.rec;
    const startRef = rec.start ? resolveDate(rec.start, today, today, weekStart)?.start : undefined;
    const from = startRef ?? today;
    const dtstart = firstOccurrence({ ...rec }, from, weekStart);
    const rr = toResolvedRec(rec, startRef ?? from, today);
    // the series anchor is the first match, so interval counting starts there
    rr.dtstart = dtstart;
    if (startRef) rr.from = startRef;
    if (rec.time) {
      const s = resolveStartTime(rec.time.start);
      let e = rec.time.end ? resolveEndTime(rec.time.end, s) : undefined;
      if (rec.time.dur) {
        const mins = rec.time.dur.u === "h" ? rec.time.dur.n * 60 : rec.time.dur.n;
        const total = (Number(s.slice(0, 2)) * 60 + Number(s.slice(3)) + mins) % 1440;
        e = hm(Math.floor(total / 60), total % 60);
      }
      rr.time = e ? { start: s, end: e } : { start: s };
    }
    const amb = !!(rec.time?.start.amb || rec.time?.end?.amb);
    return { mode, kind: "recurrence", recurrence: rr, ambiguous: amb };
  }

  if (parsed.kind === "open") {
    if (parsed.open === "end") {
      const s = resolvePoint(parsed.start, today, today, weekStart, {});
      if (!s) return { mode: "x", kind: "none", ambiguous: false };
      const start = s.range ? { ...s.point, date: s.range.start } : s.point;
      return { mode, kind: "range", open: "end", start, ambiguous: s.amb };
    }
    const e = resolvePoint(parsed.end, today, today, weekStart, { isEnd: true });
    if (!e) return { mode: "x", kind: "none", ambiguous: false };
    const end = e.range ? { ...e.point, date: e.range.end } : e.point;
    return { mode, kind: "range", open: "start", end, ambiguous: e.amb };
  }

  if (parsed.kind === "duration") {
    const s = resolvePoint(parsed.start, today, today, weekStart, {});
    if (!s || !s.point.time) return { mode: "x", kind: "none", ambiguous: false };
    const start = s.range ? { ...s.point, date: s.range.start } : s.point;
    const mins = parsed.duration.u === "h" ? parsed.duration.n * 60 : parsed.duration.n;
    const total = Number(start.time!.slice(0, 2)) * 60 + Number(start.time!.slice(3)) + mins;
    const days = Math.floor(total / 1440);
    const end: ResolvedPoint = { time: hm(Math.floor((total % 1440) / 60), total % 60) };
    if (start.date) end.date = addDays(start.date, days);
    return {
      mode,
      kind: "range",
      start,
      end,
      durationMin: mins,
      ...(!start.date && days > 0 ? { endNextDay: true as const } : {}),
      ambiguous: s.amb,
    };
  }

  if (parsed.kind === "list") {
    const set = new Set<string>();
    for (const spec of parsed.dates) {
      const x = resolveDate(spec, today, today, weekStart);
      if (!x) return { mode: "x", kind: "none", ambiguous: false };
      set.add(x.start);
    }
    const dates = [...set].sort();
    if (!parsed.time) return { mode, kind: "list", dates, ambiguous: false };
    return { mode, kind: "list", dates, time: resolveStartTime(parsed.time), ambiguous: parsed.time.amb };
  }

  const start = resolvePoint(parsed.start, today, today, weekStart, {});
  if (!start) return { mode: "x", kind: "none", ambiguous: false };
  if (parsed.kind === "single") {
    if (start.range) {
      return {
        mode,
        kind: "range",
        start: { date: start.range.start },
        end: { date: start.range.end },
        ambiguous: start.amb,
      };
    }
    return { mode, kind: "single", start: start.point, ambiguous: start.amb };
  }
  const end = resolvePoint(parsed.end, today, start.point.date ?? today, weekStart, {
    startTime: start.point.time,
    inheritDate: start.point.date,
    isEnd: true,
  });
  if (!end) return { mode: "x", kind: "none", ambiguous: false };
  const startPoint = start.range ? { ...start.point, date: start.range.start } : start.point;
  const endPoint = end.range ? { ...end.point, date: end.range.end } : end.point;
  return {
    mode,
    kind: "range",
    start: startPoint,
    end: endPoint,
    ambiguous: start.amb || end.amb,
  };
}

/** Parse a DSL line and resolve it. */
export function resolveDsl(dsl: string, options: ResolveOptions = {}): Resolved {
  return resolveParsed(parseDsl(dsl), options);
}
