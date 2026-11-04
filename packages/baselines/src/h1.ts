// h1: broad hand-written parser, no dependencies.
// Pipeline: normalize -> scan into typed tokens (lexicon, fuzzy match, glued-word split) ->
// recursive-descent readers for dates, times, points, ranges and recurrences -> DSL line.
// If the whole input does not parse, the longest parsable prefix is used (partial typing).
import { makeEngine, norm } from "./engine";

interface Tok {
  k: string; // token kind
  v?: number;
  s?: string;
  m?: number; // minutes for colon times
  o?: boolean; // ordinal
  w?: boolean; // spelled-out number
  z?: boolean; // leading zero on a time
  len?: number; // digit count
  pl?: boolean; // plural weekday
  sg?: boolean; // singular unit word (day, week, month, year)
  p?: boolean; // partial word at end of input
}

const p2 = (n: number) => String(n).padStart(2, "0");

// ---------------------------------------------------------------- lexicon

const LEX = new Map<string, Tok>();
const def = (words: string, t: Tok) => words.split(" ").forEach((w) => LEX.set(w, t));
const MONTHS = "january february march april may june july august september october november december".split(" ");
MONTHS.forEach((m, i) => {
  def(m, { k: "m", v: i + 1 });
  def(m.slice(0, 3), { k: "m", v: i + 1 });
});
def("sept", { k: "m", v: 9 });
const WDN = "sunday monday tuesday wednesday thursday friday saturday".split(" ");
const WDC = ["su", "mo", "tu", "we", "th", "fr", "sa"];
WDN.forEach((d, i) => def(d + (i === 4 ? " thur thurs thu" : i === 2 ? " tues tue" : i === 3 ? " weds wed" : " " + d.slice(0, 3)), { k: "w", s: WDC[i] }));
const ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
ONES.forEach((w, i) => i && def(w, { k: "n", v: i, w: true }));
"twenty thirty forty fifty".split(" ").forEach((w, i) => def(w, { k: "n", v: 20 + 10 * i, w: true, s: "tens" }));
const ORDS = "first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" ");
ORDS.forEach((w, i) => def(w, { k: "n", v: i + 1, o: true, w: true }));
def("thirtieth", { k: "n", v: 30, o: true, w: true });
def("fortieth", { k: "n", v: 40, o: true, w: true });
def("day", { k: "u", s: "d", sg: true });
def("days", { k: "u", s: "d" });
def("week", { k: "u", s: "w", sg: true });
def("weeks wk wks", { k: "u", s: "w" });
def("month", { k: "u", s: "m", sg: true });
def("months mth mos mths", { k: "u", s: "m" });
def("year", { k: "u", s: "y", sg: true });
def("years yr yrs", { k: "u", s: "y" });
def("to >", { k: "sep", s: "to" });
def("until till til through thru ending", { k: "sep", s: "until" });
def("and n", { k: "and" });
def("from starting beginning begins", { k: "from" });
def("between", { k: "between" });
def("at", { k: "at" });
def("in", { k: "in" });
def("of", { k: "of" });
def("for", { k: "for" });
def("ago back", { k: "ago" });
def("now", { k: "now" });
def("after ahead", { k: "after" });
def("before", { k: "before" });
def("every each", { k: "every" });
def("other alternate alt", { k: "other" });
def("a an", { k: "a" });
def("am", { k: "mer", s: "am" });
def("pm", { k: "mer", s: "pm" });
def("noon midday", { k: "noon" });
def("midnight", { k: "mid" });
def("morning", { k: "part", s: "am" });
def("afternoon evening", { k: "part", s: "pm" });
def("night", { k: "part", s: "night" });
def("today tdy", { k: "rel", v: 0 });
def("tomorrow tmrw tmr tmw", { k: "rel", v: 1 });
def("overmorrow", { k: "rel", v: 2 });
def("yesterday yday", { k: "rel", v: -1 });
def("next nxt", { k: "mod", v: 1 });
def("gone passed", { k: "gone" });
def("prev", { k: "mod", v: -1 });
def("coming", { k: "mod", v: 1, s: "coming" });
def("last lst previous", { k: "mod", v: -1 });
def("this", { k: "mod", v: 0 });
def("weekend wknd", { k: "wknd" });
def("weekdays weekday workdays workday wkdays", { k: "wkd" });
def("work business", { k: "work" });
def("daily everyday", { k: "daily" });
def("weekly", { k: "weekly" });
def("biweekly fortnightly", { k: "biweekly" });
def("monthly", { k: "monthly" });
def("yearly annually", { k: "yearly" });
def("times time x occurrences", { k: "times" });
def("end", { k: "end" });
def("half", { k: "half" });
def("quarter", { k: "quarter" });
def("thousand", { k: "thousand" });
def("martin luther row single", { k: "skip" });
def("up", { k: "up" });
def("past", { k: "mod", v: -1, s: "past" });
def("eve", { k: "eve" });
def("new", { k: "new" });
def("oclock", { k: "oclock" });
// words that carry no meaning
"the on during around about approx sometime pls please plz us st de ish just".split(" ").forEach((w) => def(w, { k: "skip" }));
// holidays: head word -> date, or [month, weekday#k] rules
const HOL: Record<string, string> = {
  christmas: "12-25", xmas: "12-25", halloween: "10-31", valentines: "02-14", valentine: "02-14", juneteenth: "06-19",
  nye: "12-31", patricks: "03-17", cinco: "05-05", independence: "07-04",
  thanksgiving: "th#4@11", memorial: "mo#-1@05", labor: "mo#1@09", mlk: "mo#3@01", ny: "01-01", paddys: "03-17", mem: "mo#-1@05", turkey: "th#4@11", king: "mo#3@01", presidents: "mo#3@02",
  mothers: "su#2@05", mother: "su#2@05", fathers: "su#3@06", father: "su#3@06", columbus: "mo#2@10",
};
for (const h in HOL) def(h, { k: "h", s: HOL[h] });
def("mayo", { k: "mayo" });
// these need the word "day" after them
"valentines valentine patricks independence presidents mlk king ny paddys mem turkey mothers mother fathers father columbus memorial labor".split(" ").forEach((h) => (LEX.get(h)!.z = true));

// ---------------------------------------------------------------- fuzzy matching

/** Edit distance with adjacent transposition, capped at `max` (returns max+1 when larger). */
function dist(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    d[i] = [i];
    for (let j = 1; j <= b.length; j++) {
      if (!i) d[i]![j] = j;
      else {
        let v = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, d[i - 2]![j - 2]! + 1);
        d[i]![j] = v;
      }
    }
  }
  return d[a.length]![b.length]!;
}

const ABBR = new Set("sept tues thur thurs weds".split(" "));
const LONG = [...LEX.keys()].filter((w) => w.length >= 4 && !ABBR.has(w));

/**
 * Closest lexicon word within edit distance 1 (2 for words of 8+ letters). Ties go to the word closest in length, then the longer one.
 * Words of 3 letters only match a 4-letter word with the same first letter.
 */
function fuzzy(w: string): Tok | undefined {
  if (w.length < 3) return undefined;
  const max = w.length >= 8 ? 2 : 1;
  let best: string | undefined;
  let bd = max + 1;
  for (const k of LONG) {
    if (w.length === 3 && (k.length !== 4 || k[0] !== w[0])) continue;
    const d = dist(w, k, max);
    const gap = (x: string) => Math.abs(x.length - w.length);
    if (d < bd || (d === bd && best && (gap(k) < gap(best) || (gap(k) === gap(best) && k.length > best.length)))) (bd = d), (best = k);
  }
  return best ? LEX.get(best) : undefined;
}

function exact(w: string): Tok | undefined {
  const t = LEX.get(w);
  if (t) return t;
  if (w.length >= 4 && w.endsWith("s") && w !== "thus") {
    const b = LEX.get(w.slice(0, -1));
    if (b && b.k === "w") return { ...b, pl: true };
  }
  return undefined;
}

/** A prefix of a month (3+ letters) or weekday (2+ letters) name, or of any other lexicon word. */
function prefix(w: string): Tok | undefined {
  if (w.length >= 3) {
    const i = MONTHS.findIndex((m) => m.startsWith(w));
    if (i >= 0) return { k: "m", v: i + 1, p: true };
  }
  if (w.length >= 2) {
    const i = WDN.findIndex((d) => d.startsWith(w));
    if (i >= 0) return { k: "w", s: WDC[i], p: true };
  }
  for (const k of LEX.keys()) if (k.startsWith(w) && k.length > w.length) return { k: "skip", p: true };
  return undefined;
}

/** Split a run of letters into lexicon words (for glued input like "nextfriday2pm"). */
function split(w: string, last: boolean): Tok[] | undefined {
  const n = w.length;
  const best: ({ c: number; t: Tok[] } | undefined)[] = [{ c: 0, t: [] }];
  for (let i = 0; i < n; i++) {
    const b = best[i];
    if (!b) continue;
    for (let j = i + 2; j <= n; j++) {
      const sub = w.slice(i, j);
      let t = sub.length === 2 && !"to at of in on am pm".includes(sub) ? undefined : exact(sub);
      let c = 1;
      if (!t && j - i >= 5) (t = fuzzy(sub)), (c = 3);
      if (!t && last && j === n && sub.length >= 3) (t = prefix(sub)), (c = 3);
      if (t && (!best[j] || b.c + c < best[j]!.c)) best[j] = { c: b.c + c, t: [...b.t, { ...t, s: t.s }] };
    }
  }
  return best[n]?.t;
}

// ---------------------------------------------------------------- scanner

const validMD = (m: number, d: number) => m >= 1 && m <= 12 && d >= 1 && d <= [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]!;
const ordSuffix = (n: number, s: string) => s === (n % 100 >= 11 && n % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th");

export function scan(s: string): Tok[] {
  s = s
    .replace(/(?<![a-z])([ap])\.\s?m\b\.?/g, "$1m")
    .replace(/[–—−]/g, "-")
    .replace(/'/g, "")
    .replace(/\b2(morrow|moro|mrw)\b/g, "tomorrow")
    .replace(/\bo ?clock\b/g, "oclock");
  const out: Tok[] = [];
  let i = 0;
  const prevIsNum = () => out[out.length - 1]?.k === "n";
  while (i < s.length) {
    const r = s.slice(i);
    let m: RegExpMatchArray | null;
    if ((m = r.match(/^(\d{4})-(\d{2})-(\d{2})(?!\d)/)) && validMD(+m[2]!, +m[3]!)) {
      out.push({ k: "D", s: m[0], v: 1 });
    } else if ((m = r.match(/^(\d{1,2})([\/.-])(\d{1,2})\2(\d{4}|\d{2})(?!\d)/))) {
      let [a, b] = [+m[1]!, +m[3]!];
      if (a > 12 && b <= 12) [a, b] = [b, a];
      const y = +m[4]! < 100 ? 2000 + +m[4]! : +m[4]!;
      if (validMD(a, b)) out.push({ k: "D", s: `${y}-${p2(a)}-${p2(b)}`, v: 1 });
      else out.push({ k: "?", s: m[0] });
    } else if ((m = r.match(/^(\d{1,2})\.(\d{2})(?!\d)/)) && +m[1]! < 24 && +m[2]! < 60 && (+m[2]! > 31 || m[2] === "00" || /^\s?([ap]m|-)/.test(r.slice(m[0].length)) || /^\s?(in|morning|evening|afternoon|night)\b/.test(r.slice(m[0].length)) || (+m[2]! % 5 === 0 && /^\s?(to|till|til|until|through|thru)\s?\d{1,2}\.\d\d\b/.test(r.slice(m[0].length))) || ["m", "w", "D", "rel", "u", "ago", "at"].includes(out[out.length - 1]?.k ?? ""))) {
      out.push({ k: "t", v: +m[1]!, m: +m[2]!, z: m[1]!.length === 2 && m[1]![0] === "0" });
    } else if ((m = r.match(/^(\d{1,2}):(\d{2})(?!\d)/))) {
      out.push({ k: "t", v: +m[1]!, m: +m[2]!, z: m[1]!.length === 2 && m[1]![0] === "0" });
    } else if ((m = r.match(/^(\d{1,2})([\/.])(\d{1,2})(?![\d:])/)) && validMD(...(+m[1]! > 12 ? [+m[3]!, +m[1]!] : [+m[1]!, +m[3]!]) as [number, number])) {
      const [a, b] = +m[1]! > 12 ? [+m[3]!, +m[1]!] : [+m[1]!, +m[3]!];
      out.push({ k: "D", s: `${p2(a)}-${p2(b)}`, v: 0 });
    } else if ((m = r.match(/^(\d{1,2})-(\d{1,2})(?![\d:]|\s?[ap]m)/)) && +m[2]! > 12 && validMD(+m[1]!, +m[2]!) && out[out.length - 1]?.k !== "m" && !/^\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/.test(r.slice(m[0].length))) {
      out.push({ k: "D", s: `${p2(+m[1]!)}-${p2(+m[2]!)}`, v: 0 });
    } else if ((m = r.match(/^(\d+)(st|nd|rd|th)/)) && (ordSuffix(+m[1]!, m[2]!) || !/^[a-z]/.test(r.slice(m[0].length)))) {
      out.push({ k: "n", v: +m[1]!, o: true, len: m[1]!.length });
    } else if ((m = r.match(/^\d{3,4}(?!\d)/)) && !(m[0].length === 4 && +m[0] >= 1900 && +m[0] <= 2100) && +m[0].slice(0, -2) <= 23 && +m[0].slice(-2) < 60 && (m[0].length === 4 || +m[0].slice(-2) > 0)) {
      const h = +m[0].slice(0, -2);
      out.push({ k: "t", v: h, m: +m[0].slice(-2), z: m[0][0] === "0" });
    } else if ((m = r.match(/^\d+/))) {
      out.push({ k: "n", v: +m[0], len: m[0].length });
    } else if ((m = r.match(/^[a-z]+/))) {
      const w = m[0];
      const last = i + w.length >= s.trimEnd().length;
      let t: Tok | undefined;
      if (w === "mos") t = { k: "u", s: "m" };
      else if (w === "mo") t = prevIsNum() || out[out.length - 1]?.k === "a" ? { k: "u", s: "m" } : exact("monday");
      else if ((w === "d" || w === "w" || w === "y") && prevIsNum()) t = { k: "u", s: w };
      else t = exact(w);
      if (t) out.push(t);
      else if (last && ["week", "year", "month"].some((u) => u.startsWith(w) && w.length >= 3)) out.push({ k: "skip", p: true });
      else if (last && (t = prefix(w)) && t.k !== "skip") out.push(t);
      else if ((t = fuzzy(w))) out.push(t);
      else if (last && (t = prefix(w))) out.push(t);
      else {
        const parts = split(w, last);
        if (parts) out.push(...parts);
        else out.push({ k: "?", s: w });
      }
      i += w.length;
      continue;
    } else if ((m = r.match(/^\+(\d+)(?=\s?[a-z])/))) {
      out.push({ k: "n", v: +m[1]!, len: m[1]!.length, s: "+" });
    } else if (/^[%$#&*+=<~^]/.test(r)) {
      out.push({ k: "?", s: r[0] });
      i++;
      continue;
    } else if (r[0] === "-") {
      out.push({ k: "sep", s: "-" });
      i++;
      continue;
    } else if (r[0] === "@") {
      out.push({ k: "at" });
      i++;
      continue;
    } else if (r[0] === "/" || r[0] === "&") {
      out.push({ k: "and" });
      i++;
      continue;
    } else {
      i++;
      continue;
    }
    i += m![0].length;
  }
  const res: Tok[] = [];
  for (let j = 0; j < out.length; j++) {
    const t = out[j]!;
    if (t.k === "skip" && !t.p) continue;
    // "twenty first", "thirty-first"
    const q = t.s === "tens" && out[j + 1]?.s === "-" ? j + 2 : j + 1;
    const nx = out[q];
    if (t.s === "tens" && nx && nx.k === "n" && nx.w && nx.v! < 10) {
      res.push({ k: "n", v: t.v! + nx.v!, o: nx.o, w: true });
      j = q;
      continue;
    }
    // "half four", "half past 7" -> 4:30
    if (t.k === "half") {
      const h = out[j + 1]?.s === "past" ? j + 2 : j + 1;
      const hv = out[h];
      if (hv && hv.k === "n" && hv.v! >= 1 && hv.v! <= 12) {
        res.push({ k: "t", v: hv.v, m: 30 });
        j = h;
        continue;
      }
    }
    // "twenty twenty six", "two thousand twenty eight" -> 2026, 2028
    if (t.k === "n" && t.w && ((t.v === 20 && nx && nx.k === "n" && nx.w && nx.v! >= 20 && nx.v! < 40) || (t.v === 2 && nx?.k === "thousand" && out[j + 2]?.w))) {
      const yv = nx!.k === "thousand" ? out[j + 2]!.v! : nx!.v!;
      let jj = nx!.k === "thousand" ? j + 2 : j + 1;
      let y = nx!.k === "thousand" ? 2000 + yv : 2000 + yv;
      if (out[jj + 1]?.w && out[jj + 1]!.v! < 10 && yv % 10 === 0) y += out[++jj]!.v!;
      res.push({ k: "n", v: y, len: 4 });
      j = jj;
      continue;
    }
    // "quarter past two", "twenty past eight", "quarter to nine"
    if (t.k === "quarter" || (t.k === "n" && t.v! % 5 === 0 && t.v! >= 5 && t.v! <= 55 && nx?.k === "mod" && nx.s === "past")) {
      const toWord = t.k === "quarter" && out[j + 1]?.k === "sep";
      const pastWord = nx?.s === "past";
      const hv = out[j + 2];
      if ((toWord || pastWord) && hv?.k === "n" && hv.v! >= 1 && hv.v! <= 12) {
        res.push(toWord ? { k: "t", v: hv.v! === 1 ? 12 : hv.v! - 1, m: 45 } : { k: "t", v: hv.v, m: t.k === "quarter" ? 15 : t.v });
        j += 2;
        continue;
      }
    }
    // "five forty five" -> 5:45
    if (t.k === "n" && t.w && !t.o && t.v! >= 1 && t.v! <= 12 && nx?.s === "tens" && out[j + 2]?.w && !out[j + 2]!.o && out[j + 2]!.v! < 10 && out[j + 2]!.v! % 5 === 0) {
      res.push({ k: "t", v: t.v, m: nx.v! + out[j + 2]!.v! });
      j += 2;
      continue;
    }
    // "eight thirty" -> 8:30
    if (t.k === "n" && t.w && !t.o && t.v! >= 1 && t.v! <= 12 && nx && nx.k === "n" && nx.w && !nx.o && nx.v! >= 10 && nx.v! < 60 && nx.v! % 5 === 0) {
      res.push({ k: "t", v: t.v, m: nx.v });
      j++;
      continue;
    }
    res.push(t);
  }
  return res;
}

// ---------------------------------------------------------------- parser

interface TV {
  h: number;
  m: number;
  mer?: string;
  kn: boolean; // 24h value known
  num?: boolean; // typed as digits with a leading zero, or hour >= 13, or meridiem: explicit 24h evidence
  col?: boolean; // typed with a colon
}
interface DV {
  sh?: boolean; // month-first form ("oct 5"): a following bare day shares the month
  s: string; // DSL date text
  k: string; // md | mon | day | yr | other
  d?: number;
  mo?: number;
}
interface Pt {
  date?: DV;
  time?: TV;
  num?: number;
}

const WEEKDAY5 = "mo,tu,we,th,fr";
const fmtT = (t: TV): string => {
  if (t.mer) return `${p2((t.h % 12) + (t.mer === "pm" ? 12 : 0))}:${p2(t.m)}`;
  if (t.kn) return `${p2(t.h)}:${p2(t.m)}`;
  return t.m ? `${t.h}:${p2(t.m)}?` : `${t.h}?`;
};
const h24 = (t: TV) => ((t.mer ? (t.h % 12) + (t.mer === "pm" ? 12 : 0) : t.h) * 60 + t.m);

/** Resolve the two times of a range: a meridiem or 24h evidence on one end carries to the other. */
function pair(a: TV, b: TV, sameDay: boolean): [TV, TV] {
  if (a.mer && !b.mer && !b.kn && b.h >= 1 && b.h <= 12 && sameDay) {
    b = { ...b, mer: a.mer };
    if (h24(b) <= h24(a)) b = { ...b, mer: a.mer === "pm" ? "am" : "pm" };
  }
  if (a.num && !b.mer && !b.kn) b = { ...b, kn: true };
  else if (b.num && !b.mer && a.col && !a.mer && !a.kn) a = { ...a, kn: true };
  if (!a.mer && b.mer && a.h <= 12 && !a.kn) {
    a = { ...a, mer: b.mer };
    if (h24(a) >= h24(b)) a = { ...a, mer: b.mer === "pm" ? "am" : "pm" };
  }
  return [a, b];
}

function parse(T: Tok[]): string | null {
  let i = 0;
  const is = (k: string, o = 0) => T[i + o]?.k === k;
  const eat = (k: string) => (T[i]?.k === k ? T[i++] : undefined);
  const done = () => i >= T.length;

  // ---- times
  function readTime(bare: boolean): TV | undefined {
    const j = i;
    eat("at");
    const t = T[i];
    let r: TV | undefined;
    if (!t) r = undefined;
    else if (t.k === "noon") (i++, (r = { h: 12, m: 0, kn: true }));
    else if (t.k === "mid") (i++, (r = { h: 0, m: 0, kn: true }));
    else if (t.k === "t") {
      i++;
      const mer = eat("mer")?.s;
      r = { h: t.v!, m: t.m!, mer, kn: !!t.z || t.v! >= 13 || t.v === 0 || (t.m === 0 && t.v! >= 10 && !mer), num: !!t.z || t.v! >= 13 || !!mer, col: true };
      if (mer && (t.v! > 12 || t.v === 0)) r = undefined;
    } else if (t.k === "n" && !t.o && is("mer", 1) && t.v! >= 1 && t.v! <= 12) {
      i += 2;
      r = { h: t.v!, m: 0, mer: T[i - 1]!.s, kn: false, num: true };
    } else if (t.k === "n" && !t.o && t.v! >= 1 && t.v! <= 12 && (t.w || (t.len ?? 9) <= 2) && (is("part", 1) || ((is("in", 1) || is("at", 1)) && is("part", 2)))) {
      i++;
      r = { h: t.v!, m: 0, kn: false };
    } else if (t.k === "n" && !t.o && is("oclock", 1) && t.v! >= 1 && t.v! <= 12) {
      i += 2;
      r = { h: t.v!, m: 0, mer: eat("mer")?.s, kn: false };
    } else if (bare && t.k === "n" && !t.o && t.v! >= 1 && t.v! <= 12 && (t.w || (t.len ?? 9) <= 2) && !is("u", 1) && !is("m", 1)) {
      i++;
      r = { h: t.v!, m: 0, kn: false };
    }
    if (!r) return (i = j), undefined;
    // "9 in the morning", "2:30 at night"
    let k = i;
    if (is("in") || is("at")) k++;
    if (T[k]?.k === "part" && !r.mer) {
      const part = T[k]!.s!;
      i = k + 1;
      if (part === "night") {
        if (r.h === 12) r = { h: 0, m: r.m, kn: true };
        else if (r.h >= 6) r = { ...r, mer: "pm" };
        else r = { ...r, mer: "am" };
      } else if (r.h <= 12) r = { ...r, mer: part };
    }
    return r;
  }

  // ---- dates
  function dayNum(t: Tok | undefined): boolean {
    return !!t && t.k === "n" && t.v! >= 1 && t.v! <= 31 && (t.w || (t.len ?? 9) <= 2) && !(T[T.indexOf(t) + 1]?.k === "mer");
  }
  /** The month token after "of"/"in" (or directly) at position q. */
  function nthMonth(q: number): Tok | undefined {
    if (T[q]?.k === "of" || T[q]?.k === "in") q++;
    return T[q]?.k === "m" ? T[q] : undefined;
  }
  function readYear(): number | undefined {
    const t = T[i];
    if (t?.k === "n" && t.len === 4 && t.v! >= 1900 && t.v! <= 2100 && !t.o) return i++, t.v;
    return undefined;
  }
  function mdDate(mo: number, d: number, y?: number, sh?: boolean): DV {
    return { s: y ? `${y}-${p2(mo)}-${p2(d)}` : `${p2(mo)}-${p2(d)}`, k: y ? "other" : "md", d, mo, sh };
  }
  function readDate(): DV | undefined {
    const j = i;
    while (is("skip") && !T[i]!.p) i++;
    if (is("in") && (is("m", 1) || (is("n", 1) && T[i + 1]!.len === 4))) i++;
    const t = T[i];
    if (!t) return (i = j), undefined;
    let r: DV | undefined;
    let n: Tok | undefined;
    if (t.k === "D") {
      i++;
      r = t.v ? { s: t.s!, k: "other" } : { s: t.s!, k: "md", mo: +t.s!.slice(0, 2), d: +t.s!.slice(3) };
    } else if (t.k === "rel") {
      i++;
      r = { s: `${t.v! >= 0 ? "+" : ""}${t.v}d`, k: "other" };
    } else if (t.k === "u" && t.s === "d" && (is("after", 1) || is("before", 1)) && is("rel", 2)) {
      const sign = T[i + 1]!.k === "after" ? 1 : -1;
      r = { s: `${sign * 2 > 0 ? "+" : "-"}2d`, k: "other" };
      i += 3;
    } else if (t.k === "in" && (is("n", 1) || is("a", 1)) && is("u", 2) && (is("a", 1) || T[i + 1]!.v === 1 || !T[i + 2]!.sg)) {
      r = { s: `+${is("a", 1) ? 1 : T[i + 1]!.v}${T[i + 2]!.s}`, k: "other" };
      i += 3;
    } else if ((t.k === "n" || t.k === "a") && is("u", 1) && (is("ago", 2) || ((is("from", 2) || is("after", 2) || is("before", 2)) && (is("now", 3) || is("rel", 3))))) {
      const sign = is("ago", 2) || is("before", 2) ? "-" : "+";
      r = { s: `${sign}${t.k === "a" ? 1 : t.v}${T[i + 1]!.s}`, k: "other" };
      i += is("ago", 2) ? 3 : 4;
    } else if (t.k === "n" && t.s === "+" && is("u", 1)) {
      r = { s: `+${t.v}${T[i + 1]!.s}`, k: "other" };
      i += 2;
    } else if (t.k === "u" && t.s !== "d" && (is("gone", 1) || is("before", 1) || is("after", 1)) && !is("rel", 2)) {
      r = { s: `${t.s!.toUpperCase()}${is("after", 1) ? "+1" : "-1"}`, k: "other" };
      i += 2;
    } else if (t.k === "u" && t.s === "w" && i === 0 && T.length === 1) {
      i++;
      r = { s: "W+0", k: "other" };
    } else if (t.k === "mod" && is("u", 1) && T[i + 1]!.s !== "d") {
      const v = t.v!;
      r = { s: `${T[i + 1]!.s!.toUpperCase()}${v >= 0 ? "+" : ""}${v}`, k: "other" };
      i += 2;
    } else if ((t.k === "mod" && t.v === 0 && is("wknd", 1)) || t.k === "wknd") {
      i += t.k === "wknd" ? 1 : 2;
      r = { s: "sa>su", k: "other" };
    } else if (((t.k === "n" && (t.o || t.w)) || (t.k === "mod" && t.v === -1)) && is("w", 1) && (n = nthMonth(i + 2))) {
      r = { s: `${T[i + 1]!.s}#${t.k === "mod" ? -1 : t.v}@${p2(n.v!)}`, k: "other" };
      i = T.indexOf(n, i + 2) + 1;
    } else if (t.k === "mod" && is("w", 1)) {
      r = { s: `${T[i + 1]!.s}${t.v === 0 || t.s === "coming" ? "" : t.v! > 0 ? "+1" : "-1"}`, k: "other" };
      i += 2;
    } else if (t.k === "w") {
      i++;
      const post = T[i];
      let suf = eat("gone") ? "-1" : "";
      if (!suf && post?.k === "mod" && post.v !== 0 && post.s !== "coming" && !is("w", 1) && !is("u", 1) && !is("m", 1)) (suf = post.v! > 0 ? "+1" : "-1"), i++;
      r = { s: t.s! + suf, k: "other" };
    } else if (t.k === "h") {
      i++;
      let s = t.s!;
      if (s === "05-05") {
        while (is("skip")) i++;
        if (!eat("mayo")) return (i = j), undefined;
      } else if (eat("eve")) {
        if (s === "12-25") s = "12-24";
      } else if (is("u") && T[i]!.s === "d") i++;
      else if (t.z) return (i = j), undefined;
      r = /^\d\d-/.test(s) ? { s, k: "md", mo: +s.slice(0, 2), d: +s.slice(3) } : { s, k: "other" };
    } else if (t.k === "new" && is("u", 1) && T[i + 1]!.s === "y") {
      i += 2;
      const eve = eat("eve");
      if (!eve && is("u") && T[i]!.s === "d") i++;
      r = { s: eve ? "12-31" : "01-01", k: "md", mo: eve ? 12 : 1, d: eve ? 31 : 1 };
    } else if (t.k === "m" && (T[i + 1]?.o || T[i + 1]?.w) && T[i + 1]!.k === "n" && is("w", 2)) {
      r = { s: `${T[i + 2]!.s}#${T[i + 1]!.v}@${p2(t.v!)}`, k: "other" };
      i += 3;
    } else if (t.k === "m") {
      i++;
      if (dayNum(T[i])) {
        const d = T[i++]!.v!;
        const y = readYear();
        r = validMD(t.v!, d) ? mdDate(t.v!, d, y, true) : undefined;
      } else r = { s: `M@${p2(t.v!)}`, k: "mon", mo: t.v };
    } else if (t.k === "n" && dayNum(t) && (is("m", 1) || (is("of", 1) && is("m", 2)))) {
      i += is("m", 1) ? 1 : 2;
      const mo = T[i++]!.v!;
      const y = readYear();
      r = validMD(mo, t.v!) ? mdDate(mo, t.v!, y) : undefined;
    } else if (t.k === "n" && t.len === 4 && !t.o && is("m", 1) && dayNum(T[i + 2])) {
      const mo = T[i + 1]!.v!;
      const d = T[i + 2]!.v!;
      r = validMD(mo, d) ? mdDate(mo, d, t.v) : undefined;
      i += 3;
    } else if (t.k === "u" && t.s === "m" && is("of", 1) && is("m", 2)) {
      r = { s: `M@${p2(T[i + 2]!.v!)}`, k: "mon", mo: T[i + 2]!.v };
      i += 3;
    } else if (t.k === "u" && t.s === "y" && is("n", 1) && T[i + 1]!.len === 4) {
      r = { s: `Y@${T[i + 1]!.v}`, k: "yr" };
      i += 2;
    } else if (t.k === "n" && t.len === 4 && t.v! >= 1900 && t.v! <= 2100 && !t.o && !is("mer", 1)) {
      i++;
      r = { s: `Y@${t.v}`, k: "yr" };
    } else if (t.k === "n" && t.o && t.v! <= 31) {
      i++;
      r = { s: String(t.v), k: "day", d: t.v };
    }
    if (!r) i = j;
    return r;
  }

  // ---- points and ranges
  function readPoint(): Pt | undefined {
    const pt: Pt = {};
    const j = i;
    for (;;) {
      if (!pt.date) {
        const d = readDate();
        if (d) {
          pt.date = d;
          continue;
        }
      }
      if (!pt.time && pt.num === undefined) {
        const t = readTime(false);
        if (t) {
          pt.time = t;
          continue;
        }
      }
      const t = T[i];
      if (pt.num === undefined && !pt.time && t?.k === "n" && !t.o && t.v! <= 31 && (t.w || (t.len ?? 9) <= 2)) {
        pt.num = t.v;
        i++;
        continue;
      }
      if (is("at") || is("in") || is("from")) {
        if (pt.date || pt.time || pt.num !== undefined) {
          const save = i;
          i++;
          if (!(is("n") || is("t") || is("noon") || is("mid") || is("part"))) i = save;
          if (i !== save) continue;
        }
      }
      break;
    }
    if (!pt.date && !pt.time && pt.num === undefined) return (i = j), undefined;
    return pt;
  }

  /** Give a bare number the role of hour, merging into the point. */
  function asHour(p: Pt, mer?: string): void {
    if (p.num === undefined) return;
    if (p.num >= 1 && p.num <= 12) p.time = { h: p.num, m: 0, mer, kn: false };
    else if (p.num >= 13 && p.num <= 23) p.time = { h: p.num, m: 0, kn: true, num: true };
    p.num = undefined;
  }

  function range(a: Pt, b: Pt): string | null {
    // bare numbers: days when the other side is a month date, hours otherwise
    for (const [x, y] of [[a, b], [b, a]] as [Pt, Pt][]) {
      if (x.num === undefined) continue;
      if (x.date) asHour(x);
      else if (y.date && y.date.mo && !y.time && x.num >= 1 && (x === a || y.date.sh)) {
        x.date = validMD(y.date.mo, x.num) ? mdDate(y.date.mo, x.num) : undefined;
        x.num = undefined;
        if (!x.date) return null;
      } else if (y.date && !y.time) return null;
      else asHour(x);
    }
    // ordinals alone take the month of the other side
    for (const [x, y] of [[a, b], [b, a]] as [Pt, Pt][]) {
      if (x.date?.k === "day") {
        if (!y.date?.mo || (x === b && !y.date.sh)) return null;
        if (!validMD(y.date.mo, x.date.d!)) return null;
        x.date = mdDate(y.date.mo, x.date.d!);
      }
    }
    if (a.date && b.date && (a.date.k === "mon") !== (b.date.k === "mon")) return null;
    if (a.date && b.date && (a.date.k === "yr") !== (b.date.k === "yr")) return null;
    let ta = a.time;
    let tb = b.time;
    const da = a.date;
    const db = b.date;
    if (ta && tb) [ta, tb] = pair(ta, tb, !(da && db));
    if (ta && tb) {
      if (!da && !db) return `t ${fmtT(ta)}>${fmtT(tb)}`;
      if (da && !db) return `dt ${da.s} ${fmtT(ta)}>${fmtT(tb)}`;
      if (!da && db) return `dt ${db.s} ${fmtT(ta)}>${fmtT(tb)}`;
      return `dt ${da!.s} ${fmtT(ta)}>${db!.s} ${fmtT(tb)}`;
    }
    if (!ta && !tb && da && db) return `d ${da.s}>${db.s}`;
    return null;
  }

  function single(p: Pt): string | null {
    if (p.num !== undefined) {
      if (p.date && p.date.k !== "day") asHour(p);
      else if (!p.date) {
        if (p.num < 1 || p.num > 12) return null;
        asHour(p);
      } else return null;
    }
    if (p.date?.k === "day") return null;
    if (p.date?.k === "mon") return `d ${p.date.s}`;
    if (p.date && p.time) return `dt ${p.date.s} ${fmtT(p.time)}`;
    if (p.date) return `d ${p.date.s}`;
    if (p.time) return `t ${fmtT(p.time)}`;
    return null;
  }

  function readTimeRange(bare: boolean): string | undefined {
    const a = readTime(bare);
    if (!a) return undefined;
    const j = i;
    if (is("sep") || is("and")) {
      i++;
      const b = readTime(bare);
      if (b) {
        const [ta, tb] = pair(a, b, true);
        return `${fmtT(ta)}>${fmtT(tb)}`;
      }
      i = j;
    }
    return fmtT(a);
  }

  // ---- recurrence
  function readWdList(): string[] {
    const out: string[] = [];
    while (is("w")) {
      out.push(T[i++]!.s!);
      if (is("and") && is("w", 1)) i++;
    }
    return out;
  }
  const canon = (d: string[]) => [...new Set(d)].sort((a, b) => (WDC.indexOf(a) + 6) % 7 - (WDC.indexOf(b) + 6) % 7);
  const numOf = (t: Tok | undefined) => (t?.k === "n" ? t.v : t?.k === "a" ? 1 : undefined);

  function recurrence(): string | null {
    let f = "";
    let n = 1;
    let days: string[] | undefined;
    let nth: string | undefined;
    let mdays: string | undefined;
    let yday: string | undefined;
    let ev = !!eat("every");
    while (is("skip")) i++;
    let lead: number | undefined;
    if (is("n") && !T[i]!.o && (T[i + 1]?.pl || is("wkd", 1))) lead = T[i++]!.v;
    const t = T[i];
    if (!t) return null;
    const isNthWd = (o: number) => (T[i + o]?.k === "n" && (T[i + o]!.o || T[i + o]!.w) || (T[i + o]?.k === "mod" && T[i + o]!.v === -1)) && is("w", o + 1);
    if (t.k === "daily") (i++, (f = "d"));
    else if (t.k === "u" && t.s === "d") (i++, (f = "d"));
    else if (t.k === "wkd") (i++, (f = "d"), (days = WEEKDAY5.split(",")));
    else if (t.k === "work" && is("u", 1)) (i += 2, (f = "d"), (days = WEEKDAY5.split(",")));
    else if (t.k === "w" && is("sep", 1) && T[i + 1]!.s === "-" && t.s === "mo" && T[i + 2]?.s === "fr") (i += 3, (f = "d"), (days = WEEKDAY5.split(",")));
    else if (t.k === "other" && is("u", 1)) {
      (f = T[i + 1]!.s!), (n = 2), (i += 2);
    } else if (t.k === "other" && is("w", 1)) (i++, (f = "w"), (n = 2), (days = [T[i++]!.s!]));
    else if (ev && t.k === "n" && is("u", 1) && "dwm".includes(T[i + 1]!.s!) && !isNthWd(0) && !(T[i + 1]!.sg && t.v !== 1)) (f = T[i + 1]!.s!), (n = t.v!), (i += 2);
    else if (t.k === "biweekly") (i++, (f = "w"), (n = 2));
    else if (t.k === "weekly") (i++, (f = "w"));
    else if (t.k === "monthly") (i++, (f = "m"));
    else if (t.k === "yearly" || (ev && t.k === "u" && t.s === "y")) (i++, (f = "y"));
    else if (ev && t.k === "u" && t.s === "w") (i++, (f = "w"));
    else if (ev && t.k === "u" && t.s === "m") (i++, (f = "m"));
    else if (t.k === "mod" && t.v === -1 && is("u", 1) && T[i + 1]!.s === "d") {
      i += 2;
      if (is("of")) i++;
      while (is("every") || is("skip")) i++;
      if (!eat("u")) return null;
      (f = "m"), (mdays = "d-1");
    } else if (t.k === "end" && is("of", 1)) {
      i += 2;
      eat("every");
      if (!eat("u")) return null;
      (f = "m"), (mdays = "d-1");
    } else if (t.k === "w" || isNthWd(0) || (t.k === "n" && is("of", 1) && !is("w", 1))) {
      if (isNthWd(0)) {
        const k = T[i]!.k === "mod" ? -1 : T[i]!.v!;
        const wd = T[i + 1]!.s!;
        let q = i + 2;
        if (T[q]?.k === "of") q++;
        while (T[q]?.k === "every" || T[q]?.k === "skip") q++;
        if (T[q]?.k === "u" && T[q]!.s === "m") {
          i = q + 1;
          (f = "m"), (nth = `${wd}#${k}`);
        } else if (ev && T[i]!.k === "n") (n = k), (i += 1), (f = "w"), (days = readWdList());
        else return null;
      } else if (t.k === "w") {
        f = "w";
        days = readWdList();
      } else if (t.k === "n") {
        // "on the 15th of every month", "5th" with monthly
        const d = t.v!;
        i++;
        if (is("of")) i++;
        eat("every");
        if (!eat("u")) return null;
        (f = "m"), (mdays = `d${d}`);
      }
    } else if (ev && (t.k === "m")) {
      f = "y";
    } else return null;

    // details after the core
    ev = true;
    if (f === "d" && !days) {
      /* plain daily */
    }
    if (f === "w") {
      if (!days && (is("w") || (is("skip") && is("w", 1)))) days = readWdList();
      if (!days && isNthWd(0)) return null;
    }
    if (f === "m" && !nth && !mdays) {
      while (is("skip")) i++;
      if (isNthWd(0)) {
        const k = T[i]!.k === "mod" ? -1 : T[i]!.v!;
        nth = `${T[i + 1]!.s}#${k}`;
        i += 2;
      } else if (is("n") && !is("m", 1) && !is("mer", 1) && T[i]!.v! <= 31 && !is("t", 0)) {
        mdays = `d${T[i++]!.v}`;
        if (is("of")) i++;
        if (is("every")) i++;
        eat("u");
      } else if (is("mod") && T[i]!.v === -1 && is("u", 1)) {
        mdays = "d-1";
        i += 2;
        if (is("of")) i += 2;
      }
    }
    if (f === "y") {
      const d = readDate();
      if (!d || d.k !== "md") return null;
      yday = d.s;
    }
    let count: number | undefined = lead;
    let until: string | undefined;
    let start: string | undefined;
    let time: string | undefined;
    while (!done()) {
      const c = T[i]!;
      if (c.k === "skip" && !c.p) i++;
      else if (c.k === "weekly" || c.k === "daily" || c.k === "wkd") i++;
      else if (c.k === "every" && numOf(T[i + 1]) !== undefined && is("u", 2)) {
        n = numOf(T[i + 1])!;
        i += 3;
      } else if (c.k === "every" && is("u", 1)) {
        i += 2;
      } else if (c.k === "every" && is("other", 1) && is("u", 2)) {
        n = 2;
        i += 3;
      } else if (c.k === "n" && !c.o && (is("times", 1) || (is("u", 1) && !count && T[i + 1]!.s === (f === "w" ? "w" : "d")))) {
        count = c.v;
        i += 2;
      } else if (c.k === "for" && numOf(T[i + 1]) !== undefined && (is("u", 2) || is("times", 2))) {
        count = numOf(T[i + 1])! * (f === "d" && T[i + 2]!.s === "w" ? 7 : 1);
        i += 3;
      } else if (c.k === "times" && c.s === undefined && is("n", 1)) {
        count = T[i + 1]!.v;
        i += 2;
      } else if ((c.k === "sep" && c.s === "until") || (c.k === "up" && is("sep", 1))) {
        if (c.k === "up") i++;
        i++;
        const d = readDate();
        if (!d || d.k === "day" || d.k === "mon") return null;
        until = d.s;
      } else if (c.k === "from") {
        i++;
        const save = i;
        const d = readDate();
        if (d && d.k !== "day" && d.k !== "mon") start = d.s;
        else {
          i = save;
          time = readTimeRange(true);
          if (!time) return null;
        }
      } else if (c.k === "from" || (c.k === "sep" && c.s === "to")) return null;
      else if (!time && (c.k === "at" || c.k === "t" || c.k === "noon" || c.k === "mid" || (c.k === "n" && !c.o && c.v! <= 12 && (c.w || (c.len ?? 9) <= 2) && !is("m", 1)) || (c.k === "n" && is("mer", 1)))) {
        time = readTimeRange(true);
        if (!time) return null;
      } else if (c.k === "of" || c.k === "in" || c.k === "every" || c.k === "a") i++;
      else return null;
    }
    if ((f === "m" && !nth && !mdays) || (f === "y" && !yday) || (f === "w" && !days && n < 2)) return null;
    const parts = ["R", `${f}/${n}`];
    if (days) parts.push(canon(days).join(","));
    if (nth) parts.push(nth);
    if (mdays) parts.push(mdays);
    if (yday) parts.push(yday);
    if (count) parts.push(`n${count}`);
    if (until) parts.push(`u${until}`);
    if (time) parts.push(time);
    if (start) parts.push(`s${start}`);
    return `${time ? "dt" : "d"} ${parts.join(" ")}`;
  }

  // ---- entry
  const wantsRec =
    T.some((t, j) => ["every", "other", "daily", "weekly", "monthly", "yearly", "biweekly", "wkd"].includes(t.k) || (t.k === "w" && (t.pl || (T[j + 1]?.k === "and" && T[j + 2]?.k === "w" && !T.some((x) => x.k === "between")))) || (t.k === "u" && t.s === "m" && T[j - 1]?.k === "of" && T[j + 1]?.k !== "m")) ||
    (T[0]?.s === "mo" && T[1]?.k === "sep" && T[1].s === "-" && T[2]?.s === "fr");
  if (wantsRec) return recurrence();
  while (is("from") || is("between") || is("at") || is("for") || (is("skip") && !T[i]!.p)) i++;
  const a = readPoint();
  if (!a) return null;
  if (done()) return single(a);
  if (!(is("sep") || is("and"))) return null;
  i++;
  const b = readPoint();
  if (!b || !done()) return null;
  return range(a, b);
}

export function parseH1(text: string): string {
  const toks = scan(norm(text));
  if (toks.some((t) => t.k === "?") || (toks.length === 1 && toks[0]!.k === "n" && toks[0]!.w)) return "x";
  let top = toks.length;
  // a number followed by a partial word is an unfinished date ("13th oct - 17 ma"): drop the number too
  const last = toks[top - 1];
  const prev = toks[top - 2];
  if (last?.p && prev?.k === "n" && !prev.o && toks[top - 3]?.k !== "m") top -= 1;
  for (let end = top; end > 0; end--) {
    const r = parse(toks.slice(0, end));
    if (r) {
      const tail = toks[end];
      const w = toks[end - 1];
      const b = toks[end - 2];
      // "last friday of", "sat to": the start of a longer phrase, not a date yet
      if (tail && w?.k === "w" && ((["of", "in"].includes(tail.k) && ((b?.k === "mod" && b.v === -1) || (b?.k === "n" && (b.o || b.w)))) || (end === 1 && w.s === "sa" && tail.k === "sep" && tail.s === "to"))) return "x";
      if (end === 1 && end < toks.length && toks[0]!.k === "n" && !toks[0]!.o && (tail!.p || ["u", "w", "m"].includes(tail!.k))) return "x";
      return r;
    }
  }
  return "x";
}

export const h1 = makeEngine("h1", parseH1);
export default h1;
