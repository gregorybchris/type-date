// exp-002: small heuristic. About 40 regex rules, no dependencies, no fuzzy matching.
// Covers the common phrases: dates, relative days, weekdays, offsets, times, ranges, simple recurrences.
import { makeEngine, norm } from "./engine";

const MON = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ");
const WD = "su mo tu we th fr sa".split(" ");
const WDN = "sun mon tue wed thu fri sat";
const p2 = (n: number | string) => String(n).padStart(2, "0");
const ORD = "first second third fourth fifth sixth seventh eighth ninth tenth".split(" ");
const NUM: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };

const mi = (s: string) => MON.indexOf(s.slice(0, 3)) + 1;
const wi = (s: string) => WD[WDN.split(" ").indexOf(s.slice(0, 3))]!;
const num = (s: string) => (/^\d+$/.test(s) ? +s : NUM[s] ?? 0);
const MONRE = "(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?";
const WDRE = "(?!month)(sun|mon|tue|wed|thu|fri|sat)[a-z]*\\.?";
const DAYRE = "(\\d{1,2})(?:st|nd|rd|th)?";

type Rule = [RegExp, (m: RegExpMatchArray) => string];

/** Date phrases. The whole (trimmed) string must match. */
const DATES: Rule[] = [
  [/^(\d{4})[-/](\d\d)[-/](\d\d)$/, (m) => `${m[1]}-${m[2]}-${m[3]}`],
  [/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{2,4})$/, (m) => `${+m[3]! < 100 ? 2000 + +m[3]! : m[3]}-${p2(m[1]!)}-${p2(m[2]!)}`],
  [/^(\d{1,2})[\/.](\d{1,2})$/, (m) => (+m[1]! > 12 ? `${p2(m[2]!)}-${p2(m[1]!)}` : `${p2(m[1]!)}-${p2(m[2]!)}`)],
  [new RegExp(`^${MONRE} ${DAYRE},? (\\d{4})$`), (m) => `${m[3]}-${p2(mi(m[1]!))}-${p2(m[2]!)}`],
  [new RegExp(`^${MONRE} ${DAYRE}$`), (m) => `${p2(mi(m[1]!))}-${p2(m[2]!)}`],
  [new RegExp(`^${DAYRE} (?:of )?${MONRE},? (\\d{4})$`), (m) => `${m[3]}-${p2(mi(m[2]!))}-${p2(m[1]!)}`],
  [new RegExp(`^${DAYRE} (?:of )?${MONRE}$`), (m) => `${p2(mi(m[2]!))}-${p2(m[1]!)}`],
  [/^(today|tdy|now)$/, () => "+0d"],
  [/^(tomorrow|tmrw|tmr)$/, () => "+1d"],
  [/^(yesterday|yday)$/, () => "-1d"],
  [/^day after tomorrow$/, () => "+2d"],
  [new RegExp(`^(?:on |this )?${WDRE}$`), (m) => wi(m[1]!)],
  [new RegExp(`^(?:next|nxt) ${WDRE}$`), (m) => `${wi(m[1]!)}+1`],
  [new RegExp(`^(?:last|past|previous) ${WDRE}$`), (m) => `${wi(m[1]!)}-1`],
  [/^(next|nxt|this|last) (week|month|year)$/, (m) => `${m[2]![0]!.toUpperCase()}${m[1] === "this" ? "+0" : m[1]!.startsWith("n") ? "+1" : "-1"}`],
  [/^(?:in )?(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten) (day|wk|week|mo|month|yr|year)s?(?: from now)?$/, (m) => `+${num(m[1]!)}${m[2]![0]}`],
  [/^(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten) (day|wk|week|mo|month|yr|year)s? ago$/, (m) => `-${num(m[1]!)}${m[2]![0]}`],
  [/^(?:this |the )?weekend$/, () => "sa>su"],
  [new RegExp(`^(first|second|third|fourth|last|\\d)(?:st|nd|rd|th)? ${WDRE} (?:of |in )?${MONRE}$`), (m) => `${wi(m[2]!)}#${m[1] === "last" ? -1 : num(m[1]!) || ORD.indexOf(m[1]!) + 1}@${p2(mi(m[3]!))}`],
  [new RegExp(`^(?:in |during |the ?month of )?${MONRE}$`), (m) => `M@${p2(mi(m[1]!))}`],
  [/^(?:in |year )?(20\d\d)$/, (m) => `Y@${m[1]}`],
  [/^(christmas|xmas) eve$/, () => "12-24"],
  [/^(christmas|xmas)( day)?$/, () => "12-25"],
  [/^(new years|ny)( day)?$/, () => "01-01"],
  [/^(new years|ny) eve$/, () => "12-31"],
  [/^valentines( day)?$/, () => "02-14"],
  [/^(independence day|fourth of july)$/, () => "07-04"],
  [/^halloween$/, () => "10-31"],
  [/^thanksgiving( day)?$/, () => "th#4@11"],
  [/^memorial day$/, () => "mo#-1@05"],
  [/^labor day$/, () => "mo#1@09"],
  [/^mothers day$/, () => "su#2@05"],
  [/^fathers day$/, () => "su#3@06"],
];

interface T {
  h: number;
  m: number;
  mer?: string;
  known: boolean;
}

/** One time: 3pm, 3:30 pm, 15:00, noon, midnight, bare 3. */
function time(s: string): T | undefined {
  s = s.replace(/^(at|@) ?/, "").replace(/\b([ap])\.m\.?/, "$1m");
  if (s === "noon") return { h: 12, m: 0, known: true };
  if (s === "midnight") return { h: 0, m: 0, known: true };
  const m = s.match(/^(\d{1,2})(?::(\d\d))? ?(am|pm)?$/);
  if (!m) return undefined;
  const h = +m[1]!;
  const mm = +(m[2] ?? 0);
  if (h > 23 || mm > 59) return undefined;
  if (m[3]) return h >= 1 && h <= 12 ? { h, m: mm, mer: m[3], known: true } : undefined;
  return { h, m: mm, known: h > 12 || h === 0 || /^0/.test(s) };
}
const h24 = (t: T) => (t.mer ? (t.h % 12) + (t.mer === "pm" ? 12 : 0) : t.h) * 60 + t.m;
function fmt(t: T): string {
  if (t.known) return `${p2((h24(t) / 60) | 0)}:${p2(t.m)}`;
  return t.m ? `${t.h}:${p2(t.m)}?` : `${t.h}?`;
}

/** Format a time range. A trailing meridiem carries back to a start hour without one. */
function range(a: T, b: T, s: string): string {
  if (/\b(1[3-9]|2\d|0\d):\d\d/.test(s) && !b.mer) (a = { ...a, known: true }), (b = { ...b, known: true });
  if (!a.mer && b.mer && !a.known && a.h <= 12) {
    a = { ...a, mer: b.mer, known: true };
    if (h24(a) >= h24(b)) a = { ...a, mer: b.mer === "pm" ? "am" : "pm" };
  }
  return `${fmt(a)}>${fmt(b)}`;
}

function date(s: string): string | undefined {
  for (const [re, f] of DATES) {
    const m = s.match(re);
    if (m) return f(m);
  }
  return undefined;
}

interface P {
  d?: string;
  t?: T;
}

/** A point: date, time, or both ("tomorrow at 3pm", "3pm tomorrow", "oct 5 3:30"). */
function point(s: string): P | undefined {
  s = s.replace(/^(on|at|@) /, "").trim();
  const whole = date(s);
  if (whole) return { d: whole };
  const t = time(s);
  if (t) return { t };
  let m = s.match(/^(.+?) (?:at |@ |on )?(\d{1,2}(?::\d\d)? ?(?:am|pm)?|noon|midnight)$/);
  if (m && date(m[1]!) && time(m[2]!)) return { d: date(m[1]!), t: time(m[2]!) };
  m = s.match(/^(\d{1,2}(?::\d\d)? ?(?:am|pm)?|noon|midnight) (?:on )?(.+)$/);
  if (m && date(m[2]!) && time(m[1]!)) return { d: date(m[2]!), t: time(m[1]!) };
  return undefined;
}

function recurrence(s: string): string | undefined {
  let m: RegExpMatchArray | null;
  let body: string | undefined;
  let rest = s;
  let t = "";
  let tail = "";
  let mm: RegExpMatchArray | null;
  let weeks = false;
  if ((mm = rest.match(/ (?:for )?(\d+) (times|days|weeks)$/)) || (mm = rest.match(/ x(\d+)$/))) (tail += ` n${mm[1]}`), (weeks = mm[2] === "weeks"), (rest = rest.slice(0, mm.index));
  if ((mm = rest.match(/ (?:until|till|through|ending) (.+)$/)) && date(mm[1]!)) (tail += ` u${date(mm[1]!)}`), (rest = rest.slice(0, mm.index));
  if ((mm = rest.match(/ (?:starting|beginning|from) (.+)$/)) && date(mm[1]!)) (tail += ` s${date(mm[1]!)}`), (rest = rest.slice(0, mm.index));
  s = rest;
  const TR = "\\d{1,2}(?::\\d\\d)? ?(?:am|pm)?|noon|midnight";
  const tm = s.match(new RegExp(` (?:at |@ |from )?(${TR})(?: ?- ?| to |to)(${TR})$`)) ?? s.match(new RegExp(` (?:at |@ )?(${TR})$`));
  const t1 = tm && time(tm[1]!);
  const t2 = tm?.[2] ? time(tm[2]) : undefined;
  if (t1 && (!tm[2] || t2)) (t = t2 ? range(t1, t2, s) : fmt(t1)), (rest = s.slice(0, tm.index));
  if (/^(every ?day|daily|each day)$/.test(rest)) body = "d/1";
  else if (/^(every weekday|weekdays|every work ?day)$/.test(rest)) body = "d/1 mo,tu,we,th,fr";
  else if ((m = rest.match(/^every (\d+|two|three|four) days?$/))) body = `d/${num(m[1]!)}`;
  else if ((m = rest.match(new RegExp(`^(?:every|each) ${WDRE}$`)))) body = `w/1 ${wi(m[1]!)}`;
  else if ((m = rest.match(new RegExp(`^${WDRE}s$`)))) body = `w/1 ${wi(m[1]!)}`;
  else if ((m = rest.match(new RegExp(`^every (?:other|second) ${WDRE}$`)))) body = `w/2 ${wi(m[1]!)}`;
  else if ((m = rest.match(/^every (?:other|second) week$/))) body = "w/2";
  else if ((m = rest.match(new RegExp(`^every (\\d+|two|three|four) weeks? (?:on )?${WDRE}$`)))) body = `w/${num(m[1]!)} ${wi(m[2]!)}`;
  else if ((m = rest.match(new RegExp(`^(?:monthly|every month)(?: on)?( ?)${DAYRE}$`)))) body = `m/1 d${+m[2]!}`;
  else if ((m = rest.match(new RegExp(`^every (\\d+) months?(?: on)? ${DAYRE}$`)))) body = `m/${m[1]} d${+m[2]!}`;
  else if ((m = rest.match(new RegExp(`^every (?:year )?${MONRE} ${DAYRE}$`)))) body = `y/1 ${p2(mi(m[1]!))}-${p2(m[2]!)}`;
  else if ((m = rest.match(new RegExp(`^(?:every )?(first|second|third|fourth|last|\\d)(?:st|nd|rd|th)? ${WDRE} (?:of )?(?:every )?(?:month|the month)$`)))) body = `m/1 ${wi(m[2]!)}#${m[1] === "last" ? -1 : num(m[1]!) || ORD.indexOf(m[1]!) + 1}`;
  if (!body) return undefined;
  const [f, ...r] = body.split(" ");
  if (weeks && f === "d/1") tail = tail.replace(/n(\d+)/, (_, n) => `n${n * 7}`);
  const [cnt, un, st] = [/ n\d+/.exec(tail)?.[0], / u\S+/.exec(tail)?.[0], / s\S+/.exec(tail)?.[0]];
  return `${t ? "dt" : "d"} R ${[f, ...r].join(" ")}${cnt ?? ""}${un ?? ""}${t ? " " + t : ""}${st ?? ""}`;
}

const UNITS = "one two three four five six seven eight nine".split(" ");
const OW = "first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" ");
const CW = "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split(" ");

/** Synonyms and spelled-out numbers to the forms the rules expect. */
function canon(s: string): string {
  s = s
    .replace(/[\u2019']/g, "")
    .replace(/\b(single|just)\b ?/g, "")
    .replace(/\bmidday\b/g, "noon")
    .replace(/\b(nxt)\b/g, "next")
    .replace(/\bcoming\b/g, "this")
    .replace(/\b(lst|past|previous|prev)\b/g, "last")
    .replace(/\b(each|annually|yearly)\b/g, "every")
    .replace(/\b(business|work) ?days?\b/g, "weekday")
    .replace(/\b(on|the|during|for|of the|around|about)\b ?/g, (w, x) => (x === "of the" ? "of " : x === "for" ? "for " : ""))
    .replace(/\b(twenty|thirty)[ -]?(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|one|two|three|four|five|six|seven|eight|nine)\b/g, (_, t, u) => `${t === "twenty" ? 2 : 3}${(OW.indexOf(u) + 1 || UNITS.indexOf(u) + 1) % 10}`)
    .replace(/\b(twentieth|thirtieth)\b/g, (w) => (w[0] === "t" && w[1] === "w" ? "20" : "30"))
    .replace(new RegExp(`\\b(${OW.join("|")})\\b(?! ${WDRE})`, "g"), (w) => String(OW.indexOf(w) + 1))
    .replace(new RegExp(`\\b(${CW.join("|")})\\b`, "g"), (w) => String(CW.indexOf(w) + 1));
  return s.replace(/\bevery weekday\b/, "every weekday");
}

/** Parse a date/time phrase (or range) to a DSL line. Returns `x` when nothing matches. */
export function parseSmall(text: string): string {
  const s0 = canon(
    norm(text)
      .replace(/(\d) (?:in the|at) (morning|afternoon|evening|night)/g, (_, d, p) => `${d} ${p === "morning" ? "am" : "pm"}`)
      .replace(/\b([ap])\.m\b\.?/g, "$1m")
      .replace(/(\d{4})-(\d\d)-(\d\d)|^(\d{1,2})-(\d{1,2})$/, (_, a, b, c, d, e) => (a ? `${a}/${b}/${c}` : `${d}/${e}`)),
  )
    .replace(/[.,!?]+$/, "")
    .replace(/ (to|until|till|through|thru|at|on|from|and|-|for|in)$/, "");
  if (/\b(every|daily|weekly|monthly|weekdays?|biweekly|mon-?fri)\b|^\w+s$|of month$/.test(s0)) {
    const r = recurrence(s0.replace(/\bmon-?fri\b/, "weekdays"));
    if (r) return r;
  }
  const s = s0
    .replace(/\s*[–—]\s*/g, "-")
    .replace(/(?<=[a-z0-9])\s*-\s*(?=[a-z0-9])|\s+-\s+/g, " to ")
    .replace(/\b(til|till|until|thru|through)\b/g, "to")
    .replace(/^(from|between) /, "");
  const one = point(s.replace(/\bfrom (?!now|today)/g, ""));
  if (one) return one.d && one.t ? `dt ${one.d} ${fmt(one.t)}` : one.d ? `d ${one.d}` : `t ${fmt(one.t!)}`;
  const parts = s.replace(/\bfrom (?!now|today)/g, "").split(/ (?:to|and) /);
  if (parts.length !== 2) return "x";
  const a = point(parts[0]!);
  let b = point(parts[1]!);
  // "oct 2 to 5": the end is a day number in the start month
  if (a?.d && !a.t && /^\d{1,2}(st|nd|rd|th)?$/.test(parts[1]!.trim()) && /^\d\d-\d\d$/.test(a.d)) b = { d: `${a.d.slice(0, 3)}${p2(parseInt(parts[1]!))}` };
  const am = parts[0]!.match(/^(?:the )?(\d{1,2})(?:st|nd|rd|th)?$/);
  if (!a && am && b?.d && /^\d\d-\d\d$/.test(b.d)) return `d ${b.d.slice(0, 3)}${p2(am[1]!)}>${b.d}`;
  if (!a || !b) return "x";
  if (a.t && b.t) {
    const [ta, tb] = range(a.t, b.t, s).split(">");
    if (!a.d && !b.d) return `t ${ta}>${tb}`;
    if (a.d && !b.d) return `dt ${a.d} ${ta}>${tb}`;
    return a.d && b.d ? `dt ${a.d} ${ta}>${b.d} ${tb}` : "x";
  }
  if (a.d && b.d && !a.t && !b.t) return `d ${a.d}>${b.d}`;
  return "x";
}

export default makeEngine("heuristic-small", parseSmall);
