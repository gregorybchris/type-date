import type { DateSpec, Duration, OffUnit, Parsed, Point, RecSpec, TimeSpec, Unit, Weekday } from "./types";
import { WEEKDAYS } from "./types";

const WD_RE = "(?:su|mo|tu|we|th|fr|sa)";
const isWd = (s: string): s is Weekday => (WEEKDAYS as string[]).includes(s);

function inRange(n: number, lo: number, hi: number): boolean {
  return Number.isInteger(n) && n >= lo && n <= hi;
}

function validMonthDay(m: number, d: number): boolean {
  if (!inRange(m, 1, 12)) return false;
  const max = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1] ?? 31;
  return inRange(d, 1, max);
}

function validNth(wd: string, nth: number): boolean {
  if (nth === 0) return false;
  return wd === "b" ? nth === -1 || inRange(nth, 1, 23) : inRange(nth, -1, 5);
}

/** Forms that name one day. Lists and anchors accept only these. */
function isSingleDay(d: DateSpec): boolean {
  return d.k === "abs" || d.k === "off" || d.k === "wd" || d.k === "nth" || d.k === "wdom" || d.k === "dom" || d.k === "pdom" || d.k === "anc";
}

export function parseDate(s: string): DateSpec | null {
  let m: RegExpMatchArray | null;
  if (s.includes("~")) {
    if (!(m = s.match(/^([^~]+)~([+-]\d+)([dwmyb])$/))) return null;
    const base = parseDate(m[1]!);
    return base && base.k !== "anc" && isSingleDay(base) ? { k: "anc", base, n: +m[2]!, u: m[3] as OffUnit } : null;
  }
  if ((m = s.match(/^(\d{2})-(\d{2})<$/))) {
    const [mo, d] = [+m[1]!, +m[2]!];
    return validMonthDay(mo, d) ? { k: "abs", y: null, m: mo, d, past: true } : null;
  }
  if ((m = s.match(new RegExp(`^(${WD_RE})<$`)))) return { k: "wd", wd: m[1] as Weekday, n: 0, past: true };
  if ((m = s.match(/^M@(\d{2})<$/))) {
    return inRange(+m[1]!, 1, 12) ? { k: "mon", month: +m[1]!, past: true } : null;
  }
  if ((m = s.match(/^Q@(\d)$/))) return inRange(+m[1]!, 1, 4) ? { k: "qtr", q: +m[1]! } : null;
  if ((m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/))) {
    const [y, mo, d] = [+m[1]!, +m[2]!, +m[3]!];
    return validMonthDay(mo, d) ? { k: "abs", y, m: mo, d } : null;
  }
  if ((m = s.match(/^(\d{2})-(\d{2})$/))) {
    const [mo, d] = [+m[1]!, +m[2]!];
    return validMonthDay(mo, d) ? { k: "abs", y: null, m: mo, d } : null;
  }
  if ((m = s.match(/^([+-]\d+)([dwmyb])$/))) {
    return { k: "off", n: +m[1]!, u: m[2] as OffUnit };
  }
  if ((m = s.match(new RegExp(`^(${WD_RE})$`)))) {
    return { k: "wd", wd: m[1] as Weekday, n: 0 };
  }
  if ((m = s.match(new RegExp(`^(${WD_RE})([+-]\\d+)$`)))) {
    const n = +m[2]!;
    return n === 0 ? null : { k: "wd", wd: m[1] as Weekday, n };
  }
  if ((m = s.match(new RegExp(`^(${WD_RE}|b)#(-?\\d+)@(\\d{2})$`)))) {
    const [nth, month] = [+m[2]!, +m[3]!];
    if (!inRange(month, 1, 12) || !validNth(m[1]!, nth)) return null;
    return { k: "nth", wd: m[1] as Weekday | "b", nth, month };
  }
  if ((m = s.match(new RegExp(`^(${WD_RE}|b)#(-?\\d+)@M([+-]\\d+)$`)))) {
    const [nth, rel] = [+m[2]!, +m[3]!];
    if (!validNth(m[1]!, nth)) return null;
    return { k: "nth", wd: m[1] as Weekday | "b", nth, month: 0, rel };
  }
  if ((m = s.match(new RegExp(`^(${WD_RE})&D(\\d{2})$`)))) {
    const d = +m[2]!;
    return inRange(d, 1, 31) ? { k: "wdom", wd: m[1] as Weekday, d } : null;
  }
  if ((m = s.match(/^([WMYQ])([+-]\d+)$/))) {
    return { k: "per", u: m[1]!.toLowerCase() as "w" | "m" | "y" | "q", n: +m[2]! };
  }
  if ((m = s.match(/^M@(\d{2})$/))) {
    return inRange(+m[1]!, 1, 12) ? { k: "mon", month: +m[1]! } : null;
  }
  if ((m = s.match(/^Y@(\d{4})$/))) return { k: "yr", year: +m[1]! };
  if ((m = s.match(/^D(\d{1,2})@M([+-]\d+)$/))) return inRange(+m[1]!, 1, 31) ? { k: "pdom", d: +m[1]!, n: +m[2]! } : null;
  if ((m = s.match(/^D@(\d{1,2})$/))) return inRange(+m[1]!, 1, 31) ? { k: "dom", d: +m[1]! } : null;
  return null;
}

export function parseTime(s: string): TimeSpec | null {
  let m: RegExpMatchArray | null;
  if ((m = s.match(/^(\d{2}):(\d{2})$/))) {
    const [h, mi] = [+m[1]!, +m[2]!];
    return inRange(h, 0, 23) && inRange(mi, 0, 59) ? { h, m: mi, amb: false } : null;
  }
  if ((m = s.match(/^(\d{1,2})(?::(\d{2}))?\?$/))) {
    const [h, mi] = [+m[1]!, m[2] ? +m[2] : 0];
    return inRange(h, 1, 12) && inRange(mi, 0, 59) ? { h, m: mi, amb: true } : null;
  }
  return null;
}

function parsePointTokens(tokens: string[]): Point | null {
  if (tokens.length === 0 || tokens.length > 2) return null;
  const p: Point = {};
  for (const t of tokens) {
    const time = parseTime(t);
    if (time) {
      if (p.time) return null;
      p.time = time;
      continue;
    }
    const date = parseDate(t);
    if (date) {
      if (p.date || p.time) return null; // date comes first
      p.date = date;
      continue;
    }
    return null;
  }
  return p;
}

function parseDays(tok: string, rec: RecSpec): boolean {
  let m: RegExpMatchArray | null;
  if (new RegExp(`^${WD_RE}(,${WD_RE})*$`).test(tok)) {
    rec.days = tok.split(",") as Weekday[];
    return true;
  }
  if (/^M@\d{2}(,M@\d{2})*$/.test(tok)) {
    const months = tok.split(",").map((x) => +x.slice(2));
    if (!months.every((x) => inRange(x, 1, 12))) return false;
    rec.months = months;
    return true;
  }
  if (new RegExp(`^${WD_RE}#-?\\d+(,${WD_RE}#-?\\d+)*$`).test(tok)) {
    const nth = tok.split(",").map((x) => {
      const [wd, k] = x.split("#");
      return { wd: wd as Weekday, k: +k! };
    });
    if (nth.length > 7 || !nth.every((n) => n.k !== 0 && inRange(n.k, -1, 5))) return false;
    rec.nth = nth;
    return true;
  }
  if (/^d-?\d+(,d-?\d+)*$/.test(tok)) {
    const days = tok.split(",").map((x) => +x.slice(1));
    if (!days.every((d) => d === -1 || inRange(d, 1, 31))) return false;
    rec.monthDays = days;
    return true;
  }
  if ((m = tok.match(/^(\d{2})-(\d{2})$/))) {
    if (!validMonthDay(+m[1]!, +m[2]!)) return false;
    rec.yearDay = { m: +m[1]!, d: +m[2]! };
    return true;
  }
  return false;
}

function parseRecurrence(tokens: string[]): RecSpec | null {
  // tokens exclude the leading "R"
  const head = tokens[0]?.match(/^([dwmy])\/(\d+)$/);
  if (!head) return null;
  const interval = +head[2]!;
  if (!inRange(interval, 1, 99)) return null;
  const rec: RecSpec = { freq: head[1] as Unit, interval };
  for (const tok of tokens.slice(1)) {
    let m: RegExpMatchArray | null;
    if ((m = tok.match(/^n(\d+)$/))) {
      if (!inRange(+m[1]!, 1, 999)) return null;
      rec.count = +m[1]!;
    } else if (tok.startsWith("u")) {
      const until = parseDate(tok.slice(1));
      if (!until) return null;
      rec.until = until;
    } else if (tok.startsWith("s") && tok.length > 2 && parseDate(tok.slice(1))) {
      rec.start = parseDate(tok.slice(1)) as DateSpec; // "sa" and "su" are weekdays, not starts
    } else if (tok.includes(">") || parseTime(tok)) {
      const [a, b, ...rest] = tok.split(">");
      const ta = a ? parseTime(a) : null;
      const dur = b ? parseDuration(b) : null;
      const tb = b && !dur ? parseTime(b) : null;
      if (!ta || rest.length || (b !== undefined && !tb && !dur)) return null;
      rec.time = dur ? { start: ta, dur } : tb ? { start: ta, end: tb } : { start: ta };
    } else if (!parseDays(tok, rec)) {
      return null;
    }
  }
  if (rec.nth && rec.nth.length > 1 && rec.freq !== "m") return null;
  return rec;
}

function parseList(mode: string, tokens: string[]): Parsed {
  if (tokens.length > 2 || (mode !== "d" && mode !== "dt")) return { mode: "x" };
  const parts = tokens[0]!.split(",");
  if (parts.length < 2 || parts.length > 31) return { mode: "x" };
  const dates: DateSpec[] = [];
  for (const p of parts) {
    const spec = parseDate(p);
    if (!spec || !isSingleDay(spec)) return { mode: "x" };
    dates.push(spec);
  }
  if (mode === "d") return tokens.length === 1 ? { mode, kind: "list", dates } : { mode: "x" };
  const time = tokens[1] ? parseTime(tokens[1]) : null;
  return time ? { mode, kind: "list", dates, time } : { mode: "x" };
}

/** Parse a model output line. Returns `{mode: "x"}` for anything invalid. */
export function parseDsl(input: string): Parsed {
  const line = input.trim().replace(/\s+/g, " ");
  if (line === "x" || line === "") return { mode: "x" };
  const tokens = line.split(" ");
  const mode = tokens[0];
  if (mode !== "d" && mode !== "t" && mode !== "dt") return { mode: "x" };
  const rest = tokens.slice(1);
  if (rest[0] === "R") {
    const rec = parseRecurrence(rest.slice(1));
    if (!rec) return { mode: "x" };
    if (mode === "d" && rec.time) return { mode: "x" };
    if (mode === "dt" && !rec.time) return { mode: "x" };
    if (mode === "t") return { mode: "x" };
    return { mode, kind: "recurrence", rec };
  }
  if (rest[0]?.includes(",") && !line.includes(">")) return parseList(mode, rest);
  // split on ">" between points. A point may contain spaces.
  const joined = rest.join(" ");
  const halves = joined.split(">");
  if (halves.length > 2) return { mode: "x" };
  const toks = (s: string | undefined) => (s ?? "").trim().split(" ").filter(Boolean);
  const left = toks(halves[0]);
  if (halves.length === 1) {
    const start = parsePointTokens(left);
    if (!start || !modeMatches(mode, start)) return { mode: "x" };
    return { mode, kind: "single", start };
  }
  const right = toks(halves[1]);
  if (!left.length && !right.length) return { mode: "x" };
  if (!left.length) {
    const end = parsePointTokens(right);
    if (!end || !modeMatches(mode, end)) return { mode: "x" };
    return { mode, kind: "open", open: "start", end };
  }
  const start = parsePointTokens(left);
  if (!start || !modeMatches(mode, start)) return { mode: "x" };
  if (!right.length) return { mode, kind: "open", open: "end", start };
  // `+Nm` is also a month offset, so `d 10-05>+1m` stays a v1 date range. In t and dt it is minutes.
  const dur = right.length === 1 ? right[0]!.match(/^\+\d+([hm])$/) : null;
  if (dur && (mode !== "d" || dur[1] === "h")) {
    const duration = mode === "d" ? null : parseDuration(right[0]!);
    return duration && mode !== "d" ? { mode, kind: "duration", start, duration } : { mode: "x" };
  }
  const end = parsePointTokens(right);
  if (!end) return { mode: "x" };
  return { mode, kind: "range", start, end };
}

function parseDuration(s: string): Duration | null {
  const m = s.match(/^\+([1-9]\d*)([hm])$/);
  if (!m) return null;
  const n = +m[1]!;
  const u = m[2] as "h" | "m";
  return inRange(n, 1, u === "h" ? 48 : 1440) ? { n, u } : null;
}

function modeMatches(mode: "d" | "t" | "dt", p: Point): boolean {
  if (mode === "d") return !!p.date && !p.time;
  if (mode === "t") return !p.date && !!p.time;
  return !!p.time && !!p.date; // dt: start point needs a date and a time
}

function fmtTime(t: TimeSpec): string {
  const mm = String(t.m).padStart(2, "0");
  if (t.amb) return t.m ? `${t.h}:${mm}?` : `${t.h}?`;
  return `${String(t.h).padStart(2, "0")}:${mm}`;
}

function fmtDate(d: DateSpec): string {
  const p2 = (n: number) => String(n).padStart(2, "0");
  switch (d.k) {
    case "abs":
      return d.y === null ? `${p2(d.m)}-${p2(d.d)}${d.past ? "<" : ""}` : `${d.y}-${p2(d.m)}-${p2(d.d)}`;
    case "off":
      return `${d.n >= 0 ? "+" : ""}${d.n}${d.u}`;
    case "wd":
      return d.n === 0 ? `${d.wd}${d.past ? "<" : ""}` : `${d.wd}${d.n > 0 ? "+" : ""}${d.n}`;
    case "nth":
      return `${d.wd}#${d.nth}@${d.rel !== undefined ? `M${d.rel >= 0 ? "+" : ""}${d.rel}` : p2(d.month)}`;
    case "wdom":
      return `${d.wd}&D${p2(d.d)}`;
    case "per":
      return `${d.u.toUpperCase()}${d.n >= 0 ? "+" : ""}${d.n}`;
    case "mon":
      return `M@${p2(d.month)}${d.past ? "<" : ""}`;
    case "qtr":
      return `Q@${d.q}`;
    case "anc":
      return `${fmtDate(d.base)}~${d.n >= 0 ? "+" : ""}${d.n}${d.u}`;
    case "yr":
      return `Y@${d.year}`;
    case "dom":
      return `D@${p2(d.d)}`;
    case "pdom":
      return `D${p2(d.d)}@M${d.n >= 0 ? "+" : ""}${d.n}`;
  }
}

function fmtPoint(p: Point): string {
  return [p.date ? fmtDate(p.date) : "", p.time ? fmtTime(p.time) : ""].filter(Boolean).join(" ");
}

/** Serialize to the canonical DSL form. `parseDsl(serialize(p))` equals `p`. */
export function serializeDsl(p: Parsed): string {
  if (p.mode === "x") return "x";
  if (p.kind === "single") return `${p.mode} ${fmtPoint(p.start)}`;
  if (p.kind === "range") return `${p.mode} ${fmtPoint(p.start)}>${fmtPoint(p.end)}`;
  if (p.kind === "list") {
    return `${p.mode} ${p.dates.map(fmtDate).join(",")}${p.time ? ` ${fmtTime(p.time)}` : ""}`;
  }
  if (p.kind === "open") {
    return p.open === "end" ? `${p.mode} ${fmtPoint(p.start)}>` : `${p.mode} >${fmtPoint(p.end)}`;
  }
  if (p.kind === "duration") return `${p.mode} ${fmtPoint(p.start)}>+${p.duration.n}${p.duration.u}`;
  const r = p.rec;
  const parts = ["R", `${r.freq}/${r.interval}`];
  if (r.days) parts.push(r.days.join(","));
  if (r.nth) parts.push(r.nth.map((n) => `${n.wd}#${n.k}`).join(","));
  if (r.monthDays) parts.push(r.monthDays.map((d) => `d${d}`).join(","));
  if (r.yearDay) {
    parts.push(`${String(r.yearDay.m).padStart(2, "0")}-${String(r.yearDay.d).padStart(2, "0")}`);
  }
  if (r.months) parts.push(r.months.map((x) => `M@${String(x).padStart(2, "0")}`).join(","));
  if (r.count) parts.push(`n${r.count}`);
  if (r.until) parts.push(`u${fmtDate(r.until)}`);
  if (r.time) {
    parts.push(
      r.time.dur
        ? `${fmtTime(r.time.start)}>+${r.time.dur.n}${r.time.dur.u}`
        : r.time.end
          ? `${fmtTime(r.time.start)}>${fmtTime(r.time.end)}`
          : fmtTime(r.time.start),
    );
  }
  if (r.start) parts.push(`s${fmtDate(r.start)}`);
  return `${p.mode} ${parts.join(" ")}`;
}

export { isWd };
