import type { DateSpec, Parsed, Point, RecSpec, TimeSpec, Unit, Weekday } from "./types";
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

export function parseDate(s: string): DateSpec | null {
  let m: RegExpMatchArray | null;
  if ((m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/))) {
    const [y, mo, d] = [+m[1]!, +m[2]!, +m[3]!];
    return validMonthDay(mo, d) ? { k: "abs", y, m: mo, d } : null;
  }
  if ((m = s.match(/^(\d{2})-(\d{2})$/))) {
    const [mo, d] = [+m[1]!, +m[2]!];
    return validMonthDay(mo, d) ? { k: "abs", y: null, m: mo, d } : null;
  }
  if ((m = s.match(/^([+-]\d+)([dwmy])$/))) {
    return { k: "off", n: +m[1]!, u: m[2] as Unit };
  }
  if ((m = s.match(new RegExp(`^(${WD_RE})$`)))) {
    return { k: "wd", wd: m[1] as Weekday, n: 0 };
  }
  if ((m = s.match(new RegExp(`^(${WD_RE})([+-]\\d+)$`)))) {
    const n = +m[2]!;
    return n === 0 ? null : { k: "wd", wd: m[1] as Weekday, n };
  }
  if ((m = s.match(new RegExp(`^(${WD_RE})#(-?\\d+)@(\\d{2})$`)))) {
    const [nth, month] = [+m[2]!, +m[3]!];
    if (!inRange(month, 1, 12) || nth === 0 || !inRange(nth, -1, 5)) return null;
    return { k: "nth", wd: m[1] as Weekday, nth, month };
  }
  if ((m = s.match(/^([WMY])([+-]\d+)$/))) {
    return { k: "per", u: m[1]!.toLowerCase() as "w" | "m" | "y", n: +m[2]! };
  }
  if ((m = s.match(/^M@(\d{2})$/))) {
    return inRange(+m[1]!, 1, 12) ? { k: "mon", month: +m[1]! } : null;
  }
  if ((m = s.match(/^Y@(\d{4})$/))) return { k: "yr", year: +m[1]! };
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
  if ((m = tok.match(new RegExp(`^(${WD_RE})#(-?\\d+)$`)))) {
    const k = +m[2]!;
    if (k === 0 || !inRange(k, -1, 5)) return false;
    rec.nth = { wd: m[1] as Weekday, k };
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
    } else if (tok.startsWith("s") && tok.length > 1) {
      const start = parseDate(tok.slice(1));
      if (!start) return null;
      rec.start = start;
    } else if (tok.includes(">") || parseTime(tok)) {
      const [a, b, ...rest] = tok.split(">");
      const ta = a ? parseTime(a) : null;
      const tb = b ? parseTime(b) : null;
      if (!ta || rest.length || (b !== undefined && !tb)) return null;
      rec.time = tb ? { start: ta, end: tb } : { start: ta };
    } else if (!parseDays(tok, rec)) {
      return null;
    }
  }
  return rec;
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
  // split on ">" between points. A point may contain spaces.
  const joined = rest.join(" ");
  const halves = joined.split(">");
  if (halves.length > 2) return { mode: "x" };
  const start = parsePointTokens((halves[0] ?? "").trim().split(" ").filter(Boolean));
  if (!start) return { mode: "x" };
  if (!modeMatches(mode, start)) return { mode: "x" };
  if (halves.length === 1) return { mode, kind: "single", start };
  const end = parsePointTokens((halves[1] ?? "").trim().split(" ").filter(Boolean));
  if (!end) return { mode: "x" };
  return { mode, kind: "range", start, end };
}

function modeMatches(mode: "d" | "t" | "dt", p: Point): boolean {
  if (mode === "d") return !!p.date && !p.time;
  if (mode === "t") return !p.date && !!p.time;
  return !!p.time; // dt: time required, date required on the start point
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
      return d.y === null ? `${p2(d.m)}-${p2(d.d)}` : `${d.y}-${p2(d.m)}-${p2(d.d)}`;
    case "off":
      return `${d.n >= 0 ? "+" : ""}${d.n}${d.u}`;
    case "wd":
      return d.n === 0 ? d.wd : `${d.wd}${d.n > 0 ? "+" : ""}${d.n}`;
    case "nth":
      return `${d.wd}#${d.nth}@${p2(d.month)}`;
    case "per":
      return `${d.u.toUpperCase()}${d.n >= 0 ? "+" : ""}${d.n}`;
    case "mon":
      return `M@${p2(d.month)}`;
    case "yr":
      return `Y@${d.year}`;
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
  const r = p.rec;
  const parts = ["R", `${r.freq}/${r.interval}`];
  if (r.days) parts.push(r.days.join(","));
  if (r.nth) parts.push(`${r.nth.wd}#${r.nth.k}`);
  if (r.monthDays) parts.push(r.monthDays.map((d) => `d${d}`).join(","));
  if (r.yearDay) {
    parts.push(`${String(r.yearDay.m).padStart(2, "0")}-${String(r.yearDay.d).padStart(2, "0")}`);
  }
  if (r.count) parts.push(`n${r.count}`);
  if (r.until) parts.push(`u${fmtDate(r.until)}`);
  if (r.time) {
    parts.push(
      r.time.end ? `${fmtTime(r.time.start)}>${fmtTime(r.time.end)}` : fmtTime(r.time.start),
    );
  }
  if (r.start) parts.push(`s${fmtDate(r.start)}`);
  return `${p.mode} ${parts.join(" ")}`;
}

export { isWd };
