// exp-003: broad hand-written parser, no dependencies.
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
  st?: boolean; // hint that a time is meant (sharp, ish)
  po?: boolean; // preceded by a dropped "on"
  am?: boolean; // a month word that is also an ordinary word (may, march)
  hm?: boolean; // time typed as bare digits (830, 1240)
  gap?: boolean; // an unknown word stood before this token
  pw?: string[]; // the unknown words before this token
  cm?: boolean; // a comma stood before this token
  the?: boolean; // "the" stood before this token
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
LEX.get("may")!.am = true;
LEX.get("march")!.am = true;
LEX.get("mar")!.am = true;
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
def("from", { k: "from", s: "from" });
def("starting beginning begins", { k: "from", s: "start" });
def("between", { k: "between" });
def("at", { k: "at" });
def("in", { k: "in" });
def("of", { k: "of" });
def("for", { k: "for" });
def("ago back prior", { k: "ago" });
def("now", { k: "now" });
def("after ahead", { k: "after" });
def("before", { k: "before" });
def("every each ev ea", { k: "every" });
def("hence later", { k: "hence" });
def("weekends", { k: "wkds" });
def("except", { k: "except" });

def("other alternate alt", { k: "other" });
def("a an", { k: "a" });
def("am", { k: "mer", s: "am" });
def("pm", { k: "mer", s: "pm" });
def("noon midday", { k: "noon" });
def("midnight", { k: "mid" });
def("morning", { k: "part", s: "am" });
def("afternoon evening", { k: "part", s: "pm" });
def("night", { k: "part", s: "night" });
def("today tdy tday", { k: "rel", v: 0 });
def("tomorrow tomoz tmrw tmr tmw", { k: "rel", v: 1 });
def("overmorrow", { k: "rel", v: 2 });
def("yesterday yday", { k: "rel", v: -1 });
def("next nxt ned ensuing upcoming", { k: "mod", v: 1 });
def("gone passed", { k: "gone" });
def("prev", { k: "mod", v: -1 });
def("coming", { k: "mod", v: 1, s: "coming" });
def("last lst previous", { k: "mod", v: -1 });
def("this", { k: "mod", v: 0 });
def("weekend wknd", { k: "wknd" });
def("weekdays weekday workdays workday wkdays", { k: "wkd" });
def("work business biz working", { k: "work" });
def("rest remainder remaining", { k: "rest" });
def("since", { k: "since" });
def("b4", { k: "before" });
def("by", { k: "before", s: "by" });
def("daily everyday", { k: "daily" });
def("weekly", { k: "weekly" });
def("biweekly fortnightly", { k: "biweekly" });
def("monthly", { k: "monthly" });
def("yearly annually", { k: "yearly" });
def("times time x occurrences", { k: "times" });
def("end", { k: "end" });
def("half", { k: "half" });
def("thousand", { k: "thousand" });
def("martin luther row single jr all thanks", { k: "skip" });
def("up", { k: "up" });
def("past", { k: "mod", v: -1, s: "past" });
def("eve", { k: "eve" });
def("new", { k: "new" });
def("oclock", { k: "oclock" });
def("oh", { k: "oh" });
def("tonight tonite", { k: "tonight" });
def("nite even", { k: "part", s: "night" });
def("nightly", { k: "daily", s: "night" });
def("sharp ish exactly", { k: "skip", st: true });
def("cob eod", { k: "skip" });
def("hour hours hr hrs minute minutes mins min bday birthday there where when then than their these those fine mine line nice fire more tone tune once bone done lone zone note", { k: "?" });
def("late", { k: "skip" });
def("out", { k: "out" });
def("couple", { k: "n", v: 2, w: true });
def("fortnight", { k: "biweekly", s: "fn" });
def("fortnightly", { k: "biweekly" });
def("arvo", { k: "part", s: "pm" });
def("yest", { k: "rel", v: -1 });
def("nx", { k: "mod", v: 1 });
def("following", { k: "mod", v: 1, s: "following" });
def("final", { k: "mod", v: -1, s: "final" });
def("wkly", { k: "weekly" });
def("bimonthly", { k: "bimonthly" });
def("quarter", { k: "quarter" });
def("quarterly", { k: "quarter", s: "ly" });
def("onwards onward only roughly abt maybe", { k: "skip" });
// words that carry no meaning
"the on during around about approx sometime pls please plz us st de just".split(" ").forEach((w) => def(w, { k: "skip", s: w }));
// holidays: head word -> date, or [month, weekday#k] rules
const HOL: Record<string, string> = {
  christmas: "12-25", xmas: "12-25", halloween: "10-31", valentines: "02-14", val: "02-14", mums: "su#2@05", mum: "su#2@05", moms: "su#2@05", dads: "su#3@06", dad: "su#3@06", valentine: "02-14", juneteenth: "06-19",
  nye: "12-31", patricks: "03-17", cinco: "05-05", independence: "07-04",
  thanksgiving: "th#4@11", canada: "07-01", boxing: "12-26", memorial: "mo#-1@05", labor: "mo#1@09", mlk: "mo#3@01", ny: "01-01", paddys: "03-17", mem: "mo#-1@05", turkey: "th#4@11", king: "mo#3@01", presidents: "mo#3@02",
  mothers: "su#2@05", mother: "su#2@05", fathers: "su#3@06", father: "su#3@06", columbus: "mo#2@10",
};
for (const h in HOL) def(h, { k: "h", s: HOL[h] });
def("mayo", { k: "mayo" });
// these need the word "day" after them
"canada boxing valentines valentine mums mum moms dads dad patricks independence presidents mlk king ny paddys mem turkey mothers mother fathers father columbus memorial labor".split(" ").forEach((h) => (LEX.get(h)!.z = true));

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

const ABBR = new Set("sept tues thur thurs weds yest tday tomoz yday tmrw tmw tdy couple hence half ensuing except passed later gone back".split(" "));
const LONG = [...LEX.keys()].filter((w) => w.length >= 4 && !ABBR.has(w) && LEX.get(w)!.k !== "?");

/**
 * Closest lexicon word within edit distance 1 (2 for words of 8+ letters). Ties go to the word closest in length, then the longer one.
 * Words of 3 letters only match a 4-letter word with the same first letter.
 */
const fuzzyCache = new Map<string, Tok | undefined>();
function fuzzy(w: string): Tok | undefined {
  if (!fuzzyCache.has(w)) {
    if (fuzzyCache.size > 3000) fuzzyCache.clear();
    fuzzyCache.set(w, fuzzy1(w));
  }
  return fuzzyCache.get(w);
}
function fuzzy1(w: string): Tok | undefined {
  if (w.length < 3) return undefined;
  if (w.endsWith("s") && LEX.get(w.slice(0, -1))?.k === "part") return undefined; // "3 nights"
  const max = w.length >= 6 ? 2 : 1;
  let best: string | undefined;
  let bd = max + 1;
  for (const k of LONG) {
    if (LEX.get(k)?.k === "rest") continue;
    if (k.length - w.length > max + 1 || w.length - k.length > max + 1) continue;
    if (w.length === 3 && (k.length !== 4 || k[0] !== w[0])) continue;
    const d = dist(w, k, max);
    if (LEX.get(k)!.k === "n" && k.length !== w.length) {
      // "severe" is not "seven"; but "thrree" (doubled letter) and "firt" (missing letter) are typos
      const dbl = w.length === k.length + 1 && [...w].some((c, q) => c === w[q + 1] && w.slice(0, q) + w.slice(q + 1) === k);
      const miss = (k.length >= 6 || LEX.get(k)!.o) && w.length + 1 === k.length && k[0] === w[0] && [...w].every((c, q) => k.indexOf(c, q) >= q) ;
      if (!dbl && !miss) continue;
    }
    if (k[0] !== w[0]) continue;
    if (d === 2 && k.length < 6) continue;
    if (d === 2 && (k[0] !== w[0] || (Math.abs(k.length - w.length) > 1 && !(k.length >= 8 && w.length >= 7 && (LEX.get(k)!.k === "w" || LEX.get(k)!.k === "m"))))) continue;
    // ties: same first letter, then month and weekday names, then closest length, then longer
    const rank = (x: string) => [x[0] === w[0] ? 0 : 1, LEX.get(x)!.k === "w" || LEX.get(x)!.k === "m" ? 0 : 1, Math.abs(x.length - w.length), -x.length];
    const less = (x: string, y: string) => {
      const [a, b] = [rank(x), rank(y)];
      for (let q = 0; q < a.length; q++) if (a[q] !== b[q]) return a[q]! < b[q]!;
      return false;
    };
    if (d < bd || (d === bd && best && less(k, best))) (bd = d), (best = k);
  }
  const tok = best ? LEX.get(best) : undefined;
  return tok && tok.k === "w" && w.endsWith("s") && !best!.endsWith("s") ? { ...tok, pl: true } : tok;
}

function exact(w: string): Tok | undefined {
  const t = LEX.get(w);
  if (t) return t;
  if (w.length >= 4 && w.endsWith("s") && w !== "thus") {
    const b = LEX.get(w.slice(0, -1));
    if (b && b.k === "w") return { ...b, pl: true };
  }
  if (w.length >= 4 && w.endsWith("s")) {
    const b = LEX.get(w.slice(0, -1));
    if (b && b.k === "m") return b;
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
      let t = sub.length === 2 && !"to at of in on am pm st de".includes(sub) ? undefined : exact(sub);
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

let scanBad = false; // the text holds an impossible date or time ("feb 30", "25:00")
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const dim = (y: number | null, m: number) => (m === 2 ? (y !== null && !isLeap(y) ? 28 : 29) : [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]!);
const yy2 = (n: number) => (n < 50 ? 2000 + n : 1900 + n);
const MON3 = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ");
/** A full date as text, or null (and the scan is marked bad) when the day does not exist. */
function ymd(y: number, m: number, d: number): string | null {
  if (m < 1 || m > 12 || d < 1 || d > dim(y, m)) return (scanBad = true), null;
  return `${y}-${p2(m)}-${p2(d)}`;
}
let trailingSkip = false; // the input ended with a dropped word such as "on" or "the"

export function scan(s: string): Tok[] {
  scanBad = false;
  s = s
    .replace(/(?<![a-z])([ap])\.\s?m\b\.?/g, "$1m")
    .replace(/[–—−]/g, "-")
    .replace(/\b(mon|tues?|wed(nes)?|thu(rs?)?|fri|sat(ur)?|sun)(day)?'s\b/g, "$1$5")
    .replace(/'(\d\d)\b/g, " §$1 ")
    .replace(/'/g, "")
    .replace(/\bnegative (\d+) (day|week|month|year)s?\b/g, "$1 $2 ago")
    .replace(/(^|\s)-(\d+) ?(d|w|y|mo|m|days?|wks?|weeks?|months?|yrs?|years?)\b/g, (_, a, n, u) => (+n === 0 ? `${a}in 0 ${u}` : `${a}${n} ${u} ago`))
    .replace(/(^|\s)\+(\d+) ?(d|w|y|mo|m|days?|wks?|weeks?|months?|yrs?|years?)\b/g, (_, a, n, u) => `${a}in ${n} ${u === "m" ? "months" : u}`)
    .replace(/\ba fortnight\b/g, "2 weeks")
    .replace(/\b(\d+|two|three|four) fortnights\b/g, (_, n) => `${2 * (({ two: 2, three: 3, four: 4 } as Record<string, number>)[n] ?? +n)} weeks`)
    .replace(/\ba week today\b/g, "in 1 week")
    .replace(/(\d)T(\d)/g, "$1 $2")
    .replace(/\d\d:\d\d:\d\d(\.\d+)?(z|[+-]\d\d:?\d\d)\b/g, (m) => m.replace(/(z|[+-]\d\d:?\d\d)$/, ""))
    .replace(/(?<![\d.])\d+\.\d{3,}(?![.\d])/g, " zzq")
    .replace(/\bhalf a year\b/g, "6 months")
    .replace(/\blater (today|tonight|this)\b/g, "$1")
    .replace(/\b(the )?(next|following) day\b/g, "tomorrow")
    .replace(/\b(the )?(previous|prior) day\b|\blast night\b/g, "yesterday")
    .replace(/\bthis day next (week|month|year)\b/g, "in 1 $1")
    .replace(/\bthis day last (week|month|year)\b/g, "1 $1 ago")
    .replace(/(?<!\d )((?:the )?day (?:after|following) (?:the )?)+(tomorrow|today|yesterday)/g, (m, _a, b) => `in ${(m.match(/day (?:after|following)/g) ?? []).length + ({ tomorrow: 1, today: 0, yesterday: -1 } as Record<string, number>)[b]!} days`)
    .replace(/\b(i'?m|im|i am|we are|were|youre|hes|shes) at (\d)/g, " zzq $2")
    .replace(/\b2(morrow|moro|mrw)\b/g, "tomorrow")
    .replace(/\b(can|could|shall) we (do|have|meet|make it|say)\b|\blet(s| us)( do| meet)?\b|\bhow about\b/g, " ")
    .replace(/\b2day\b/g, "today")
    .replace(/\bbi-weekly\b/g, "biweekly")
    .replace(/\bonce a month\b/g, "monthly")
    .replace(/\b(week|wk|w\/c) (of|beginning|commencing|starting)\b/g, " ")
    .replace(/\ball of\b/g, "in")
    .replace(/\bin too\b/g, "in 2")
    .replace(/\ba couple( of)?\b/g, "couple")
    .replace(/\bthe mor(n|ra)\b/g, "tomorrow")
    .replace(/\bat (\d{1,2}) and (15|30|45)\b/g, "at $1:$2")
    .replace(/\b(\d+)\s*wkly\b/g, "$1 wkly")
    .replace(/\b(moved|rescheduled|changed|pushed|postponed)\b[^.;]*?\bto\b/g, " ")
    .replace(/\binstead of \d{1,2}(:\d\d)?( ?[ap]m)?/g, " ")
    .replace(/\b(gate|room|rm|seat|apt|unit|ext|order|flight|train|route|suite|ste|level|floor|bldg|building|lane|track|platform|pier|dock|studio|version|page|row|bed|bus|coach|amtrak|number|invoice|ticket|confirmation|ref|table for|no|id|ages?|grades?|limit|max|seats|guests|cabin)\b[ .#:]*(?!\d{1,2}(?::\d\d)?\s?[ap]\.?m\b)[a-z]?-?\d[\w-]*/g, "$1 zzq")
    .replace(/#[a-z]?-?\d[\w-]*/g, " zzq")
    .replace(/\$\d[\d,.]*/g, " zzq")
    .replace(/\b\d{1,4}(-\d{2,4}){2,3}\b/g, (m) => (/^(\d{4}-\d{1,2}-\d{1,2}|\d{1,2}-\d{1,2}-(\d{2}|\d{4}))$/.test(m) ? m : " zzq"))
    .replace(/\b(call|phone|tel|text|fax|ph|dial|contact|office)\b([^0-9.]{0,15})\d{3}-\d{4}\b/g, "$1 zzq")
    .replace(/\bm-f\b/g, "mon-fri")
    .replace(/\ball day\b/g, " ")
    .replace(/\bschool ?days?\b/g, "weekday")
    .replace(/\b1\/2 past\b/g, "half past")
    .replace(/-ish\b/g, "ish")
    .replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)-(fifteen|thirty|forty-five|forty five)\b/g, "$1 $2")
    .replace(/(?<![a-z\d])((?:mo|tu|we|th|fr|sa|su|m|w|f)(?:[\/+&,-]| and | )){1,}(?:mo|tu|we|th|fr|sa|su|m|w|f)(?![a-z])/g, (m) => m.split(/[\/+&,-]| and | /).filter(Boolean).map((d) => ({ m: "mon", mo: "mon", tu: "tue", w: "wed", we: "wed", th: "thu", f: "fri", fr: "fri", sa: "sat", su: "sun" } as Record<string, string>)[d]).join(" and ") + " ")
    .replace(/(?<![a-z\d])(tu|th|su|sa|mo|we|fr)(?= ?\d)/g, (d) => ({ mo: "mon", tu: "tue", we: "wed", th: "thu", fr: "fri", sa: "sat", su: "sun" } as Record<string, string>)[d]!)
    .replace(/\bo ?clock\b/g, "oclock");
  const out: Tok[] = [];
  const commas: number[] = [];
  let i = 0;
  const prevIsNum = () => out[out.length - 1]?.k === "n";
  while (i < s.length) {
    const r = s.slice(i);
    let m: RegExpMatchArray | null;
    const mon = (w: string) => MON3.indexOf(w.slice(0, 3)) + 1;
    if (r[0] === "§") {
      m = r.match(/^§(\d\d)/)!;
      out.push({ k: "n", v: yy2(+m[1]!), len: 4 });
    } else if ((m = r.match(/^(\d{4})([-\/.])(\d{1,2})\2(\d{1,2})(?!\d)/))) {
      const d = ymd(+m[1]!, +m[3]!, +m[4]!);
      out.push(d ? { k: "D", s: d, v: 1 } : { k: "?", s: m[0] });
    } else if ((m = r.match(/^(\d{1,2})([-\/])([a-z]{3,9})\2(\d{2}|\d{4})(?!\d)/)) && mon(m[3]!) && MONTHS.some((x) => x.startsWith(m![3]!.slice(0, 3)))) {
      const d = ymd(+m[4]! < 100 ? yy2(+m[4]!) : +m[4]!, mon(m[3]!), +m[1]!);
      out.push(d ? { k: "D", s: d, v: 1 } : { k: "?", s: m[0] });
    } else if ((m = r.match(/^([a-z]{3,9})-(\d{1,2})-(\d{4})(?!\d)/)) && mon(m[1]!) && MONTHS.some((x) => x.startsWith(m![1]!.slice(0, 3)))) {
      const d = ymd(+m[3]!, mon(m[1]!), +m[2]!);
      out.push(d ? { k: "D", s: d, v: 1 } : { k: "?", s: m[0] });
    } else if ((m = r.match(/^(\d{4})-([a-z]{3,9})-(\d{1,2})(?!\d)/)) && mon(m[2]!)) {
      const d = ymd(+m[1]!, mon(m[2]!), +m[3]!);
      out.push(d ? { k: "D", s: d, v: 1 } : { k: "?", s: m[0] });
    } else if ((m = r.match(/^(\d{1,2})([\/.-])(\d{1,2})\2(\d{4}|\d{2})(?!\d)/))) {
      let [a, b] = [+m[1]!, +m[3]!];
      if (a > 12 && b <= 12) [a, b] = [b, a];
      const d = ymd(+m[4]! < 100 ? yy2(+m[4]!) : +m[4]!, a, b);
      out.push(d ? { k: "D", s: d, v: 1 } : { k: "?", s: m[0] });
    } else if ((m = r.match(/^(\d{4})(\d\d)(\d\d)(?!\d)/)) && +m[1]! >= 1900 && +m[1]! <= 2100 && +m[2]! >= 1 && +m[2]! <= 12 && +m[3]! >= 1 && +m[3]! <= 31) {
      const d = ymd(+m[1]!, +m[2]!, +m[3]!);
      out.push(d ? { k: "D", s: d, v: 1 } : { k: "?", s: m[0] });
    } else if ((m = r.match(/^(\d{1,2})\.(\d{2})(?!\d)/)) && +m[1]! < 24 && +m[2]! < 60 && (+m[2]! > 31 || m[2] === "00" || /^\s?([ap]m|-)/.test(r.slice(m[0].length)) || (!/\d:\d\d/.test(s) && /\d\s?([ap]m)\b|morning|afternoon|evening|arvo|night/.test(s)) || /^\s?(to|till|til|until|through|thru|-)\s?\d{1,2}\.\d\d\b/.test(r.slice(m[0].length)) || ["m", "w", "D", "rel", "u", "ago", "at"].includes(out[out.length - 1]?.k ?? "") || (out[out.length - 1]?.k === "sep" && out[out.length - 2]?.k === "t"))) {
      out.push({ k: "t", v: +m[1]!, m: +m[2]!, z: m[1]!.length === 2 && m[1]![0] === "0" });
    } else if ((m = r.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?!\d)/))) {
      if (+m[1]! > 23 || +m[2]! > 59 || (m[3] && +m[3] > 59)) scanBad = true;
      out.push({ k: "t", v: +m[1]!, m: +m[2]!, z: m[1]!.length === 2 && m[1]![0] === "0" });
    } else if ((m = r.match(/^(\d{1,2})\/(\d{1,2})(?!\d|:\d)/)) && /^\s?(cup|cups|gb|mb|kb|tb|lbs?|kg|oz|ml|km|mph|x|ft|inch|pts?|points)\b/.test(r.slice(m[0].length))) {
      out.push({ k: "n", v: +m[1]!, len: m[1]!.length });
      i += m[1]!.length;
      continue;
    } else if ((m = r.match(/^(\d{1,2})\/(\d{1,2})(?!\d|:\d)/)) && !validMD(...(+m[1]! > 12 ? [+m[2]!, +m[1]!] : [+m[1]!, +m[2]!]) as [number, number])) {
      scanBad = true;
      out.push({ k: "?", s: m[0] });
    } else if ((m = r.match(/^(\d{1,2})\/(\d{1,2})(?!\d|:\d)/)) && validMD(...(+m[1]! > 12 ? [+m[2]!, +m[1]!] : [+m[1]!, +m[2]!]) as [number, number])) {
      const [a, b] = +m[1]! > 12 ? [+m[2]!, +m[1]!] : [+m[1]!, +m[2]!];
      out.push({ k: "D", s: `${p2(a)}-${p2(b)}`, v: 0 });
    } else if ((m = r.match(/^(\d{1,2})-(\d{1,2})(?![\d:]|\s?[ap]m)/)) && +m[2]! > 12 && validMD(+m[1]!, +m[2]!) && out[out.length - 1]?.k !== "m" && !/^\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/.test(r.slice(m[0].length))) {
      out.push({ k: "D", s: `${p2(+m[1]!)}-${p2(+m[2]!)}`, v: 0 });
    } else if ((m = r.match(/^(\d+)(st|nd|rd|th)/)) && (ordSuffix(+m[1]!, m[2]!) || !/^[a-z]/.test(r.slice(m[0].length)))) {
      out.push({ k: "n", v: +m[1]!, o: true, len: m[1]!.length });
    } else if ((m = r.match(/^\d{3,4}(?!\d)/)) && !(m[0].length === 4 && +m[0] >= 1900 && +m[0] <= 2100) && +m[0].slice(0, -2) <= 23 && +m[0].slice(-2) < 60 && (m[0].length === 4 || +m[0].slice(-2) > 0)) {
      const h = +m[0].slice(0, -2);
      out.push({ k: "t", v: h, m: +m[0].slice(-2), z: m[0][0] === "0", hm: true });
    } else if ((m = r.match(/^\d+/))) {
      out.push({ k: "n", v: +m[0], len: m[0].length });
    } else if ((m = r.match(/^[a-z]+/))) {
      const w = m[0];
      const last = i + w.length >= s.trimEnd().length;
      let t: Tok | undefined;
      if (w === "mos") t = { k: "u", s: "m" };
      else if (w === "mon" && prevIsNum() && /^\s*(from|ago|later|hence)/.test(s.slice(i + 3))) t = { k: "u", s: "m" };
      else if (w === "mo") t = prevIsNum() || out[out.length - 1]?.k === "a" ? { k: "u", s: "m" } : exact("monday");
      else if ((w === "d" || w === "w" || w === "y") && prevIsNum()) t = { k: "u", s: w };
      else if (w === "back" && out[out.length - 1]?.k !== "u") t = { k: "skip", s: w };
      else if (w === "non" && s[i + 3] === "-") t = { k: "?", s: w };
      else if ((w === "weekday" || w === "workday") && out[out.length - 1]?.k !== "every") t = { k: "?", s: w };
      else if ((w === "a" || w === "p") && (prevIsNum() || out[out.length - 1]?.k === "t")) t = { k: "mer", s: w === "a" ? "am" : "pm" };
      else t = exact(w);
      if (t) out.push(t);
      else if (last && ["week", "year", "month"].some((u) => u.startsWith(w) && w.length >= 3)) out.push({ k: "skip", p: true });
      else if (last && w.length >= 4 && "tonight".startsWith(w)) out.push({ k: "tonight" });
      else if (last && (t = prefix(w)) && t.k !== "skip") out.push(t);
      else if (w.length >= 4 && (t = prefix(w)) && (t.k === "m" || t.k === "w")) out.push(last ? t : { ...t, p: undefined });
      else if ((t = fuzzy(w))) out.push(t);
      else if (w.length >= 6 && w.endsWith("s") && (t = fuzzy(w.slice(0, -1))) && t.k === "w") out.push({ ...t, pl: true });
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
    } else if (r[0] === "+") {
      out.push({ k: "and" });
      i++;
      continue;
    } else if (/^[%$#*=<~^]/.test(r)) {
      out.push({ k: "?", s: r[0] });
      i++;
      continue;
    } else if (r[0] === "-") {
      out.push({ k: "sep", s: "-" });
      i++;
      continue;
    } else if (r[0] === ",") {
      commas.push(out.length);
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
  for (const q of commas) if (out[q]) out[q] = { ...out[q]!, cm: true };
  const res: Tok[] = [];
  let afterOn = false;
  let afterThe = false;
  trailingSkip = out[out.length - 1]?.k === "skip" && !out[out.length - 1]!.p;
  for (let j = 0; j < out.length; j++) {
    let t = out[j]!;
    if (t.k === "skip" && !t.p) {
      afterOn = t.s === "on";
      afterThe = t.s === "the";
      if (t.st && res.length) res[res.length - 1] = { ...res[res.length - 1]!, st: true };
      continue;
    }
    if (afterThe) out[j] = t = { ...t, the: true };
    if (afterOn) out[j] = t = { ...t, po: true };
    afterThe = false;
    afterOn = false;
    // "twelve noon"
    if (t.k === "n" && t.v === 12 && (out[j + 1]?.k === "noon" || out[j + 1]?.k === "mid")) continue;
    if (t.k === "noon" && out[j - 1]?.k === "t" && out[j - 1]!.v === 12) continue; // "12:00 noon"
    if (t.k === "a" && out[j + 1]?.k === "quarter") continue;
    // "ten past noon", "quarter after seven", "ten till two", "a quarter to midnight", "half past noon"
    {
      const q = t.k === "quarter" ? 15 : t.k === "half" ? 30 : t.k === "n" && t.w && !t.o && t.v! % 5 === 0 && t.v! >= 5 && t.v! <= 25 ? t.v! : 0;
      const cn = out[j + 1];
      const hv = out[j + 2];
      const past = cn?.k === "after" || (cn?.k === "mod" && cn.s === "past");
      const to = (cn?.k === "sep" && /^(until|to)$/.test(cn.s!) && (cn.s === "until" || q === 15 || q >= 20 || hv?.k === "mid" || hv?.k === "noon" || (t.w && hv?.w && out[j + 3]?.k !== "mer"))) || cn?.k === "before";
      const hh = hv?.k === "noon" ? 12 : hv?.k === "mid" ? 0 : hv?.k === "n" && !hv.o && hv.v! >= 1 && hv.v! <= 12 ? hv.v! : -1;
      if (q && hh >= 0 && (past || (to && q !== 30)) && (hv!.k !== "n" || q !== 30 || past)) {
        const known = hv!.k !== "n";
        const h = past ? hh : (hh + 23) % 24;
        const m = past ? q : 60 - q;
        res.push({ k: "t", v: h, m, z: known });
        j += 2;
        continue;
      }
    }
    // "twenty to six", "quarter to eight" are times (a spelled five or ten to is still a range)
    if (t.k === "n" && t.w && (t.v === 20 || t.v === 25) && out[j + 1]?.k === "sep" && out[j + 1]!.s === "to" && out[j + 2]?.k === "n" && out[j + 2]!.v! >= 1 && out[j + 2]!.v! <= 12) {
      const h = out[j + 2]!.v!;
      res.push({ k: "t", v: h === 1 ? 12 : h - 1, m: 60 - t.v });
      j += 2;
      continue;
    }
    // "twenty first", "thirty-first"
    const q = t.s === "tens" && out[j + 1]?.s === "-" ? j + 2 : j + 1;
    const nx = out[q];
    if (t.s === "tens" && nx && nx.k === "n" && nx.w && nx.v! < 10) {
      res.push({ k: "n", v: t.v! + nx.v!, o: nx.o, w: true, the: t.the, po: t.po });
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
    // "seven oh five" -> 7:05
    if (t.k === "n" && t.w && !t.o && t.v! >= 1 && t.v! <= 12 && nx?.k === "oh" && out[j + 2]?.w && out[j + 2]!.v! < 10) {
      res.push({ k: "t", v: t.v, m: out[j + 2]!.v });
      j += 2;
      continue;
    }
    // "5 30", "11 30 pm", "19 10" -> 5:30, 11:30, 19:10
    if (t.k === "n" && !t.w && !t.o && (t.len ?? 9) <= 2 && t.v! <= 23 && nx?.k === "n" && !nx.w && !nx.o && nx.len === 2 && nx.v! % 5 === 0 && nx.v! < 60 && !["m", "in", "every", "for", "n", "mod"].includes(res[res.length - 1]?.k ?? "") && !["u", "m", "times"].includes(out[j + 2]?.k ?? "")) {
      res.push({ k: "t", v: t.v, m: nx.v, z: t.v! >= 13, hm: true });
      j++;
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
  // a day that does not exist in the named month makes the whole text a non-date ("feb 30", "sept 31", "oct 0")
  res.forEach((t, j) => {
    const nx = res[j + 1];
    const pv = res[j - 1];
    const yr = (q: Tok | undefined) => (q?.k === "n" && q.len === 4 && !q.o ? q.v! : null);
    if (t.k === "m" && !t.p && pv?.k !== "n" && nx?.k === "n" && (nx.len ?? 9) <= 2 && !nx.w && res[j + 2]?.k !== "mer" && !(nx.po)) {
      const d = nx.v!;
      if (d < 1 || d > 31 || d > dim(yr(res[j + 2]), t.v!)) scanBad = true;
    }
    if (t.k === "n" && !t.w && (t.len ?? 9) <= 2 && nx?.k === "m" && !nx.p && pv?.k !== "m" && !nx.po) {
      if (t.v! < 1 || t.v! > 31 || t.v! > dim(yr(res[j + 2]), nx.v!)) scanBad = true;
    }
  });
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
  hol?: boolean; // a holiday date
  s: string; // DSL date text
  k: string; // md | mon | day | yr | other
  d?: number;
  mo?: number;
}
interface Pt {
  part?: string;
  date?: DV;
  time?: TV;
  num?: number;
}

const WEEKDAY5 = "mo,tu,we,th,fr";
const MDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let spanMode = false; // parsing spans inside longer text: "4th thursday" alone means monthly
let refToday = "2026-11-03"; // reference day for phrases that need the calendar ("fri the 13th")
/** The next MM-DD on or after today with day-of-month d (and weekday wd, 0 = Sunday), or only in month today+off. */
function domDate(d: number, wd?: number, off?: number): string | undefined {
  const [y, m, td] = refToday.split("-").map(Number) as [number, number, number];
  for (let k = off ?? 0; k < (off === undefined ? 3 : off + 1); k++) {
    const dt = new Date(Date.UTC(y, m - 1 + k, d));
    if (dt.getUTCDate() !== d) continue;
    if (k === 0 && off === undefined && d < td) continue;
    if (wd !== undefined && dt.getUTCDay() !== wd) continue;
    return `${p2(dt.getUTCMonth() + 1)}-${p2(d)}`;
  }
  return undefined;
}
const addMD = (mo: number, d: number, n: number) => {
  const dt = new Date(Date.UTC(2027, mo - 1, d + n));
  return `${p2(dt.getUTCMonth() + 1)}-${p2(dt.getUTCDate())}`;
};
const monthEnd = (mo: number) => `${p2(mo)}-${MDAYS[mo - 1]}`;
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
  let lastPart: string | undefined; // day part implied by the date just read ("tonight")
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
      r = { h: t.v!, m: t.m!, mer, kn: !!t.z || t.v! >= 13 || t.v === 0 , num: !!t.z || t.v! >= 13 || t.v === 0 || !!mer, col: true };
      if (mer && (t.v! > 12 || t.v === 0)) r = undefined;
    } else if (t.k === "n" && !t.o && is("mer", 1) && t.v! >= 1 && t.v! <= 12) {
      i += 2;
      r = { h: t.v!, m: 0, mer: T[i - 1]!.s, kn: false, num: true };
    } else if (t.k === "n" && !t.o && t.v! >= 1 && t.v! <= 12 && (t.w || (t.len ?? 9) <= 2) && (is("part", 1) || ((is("in", 1) || is("at", 1)) && (is("part", 2) || is("mer", 2))))) {
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
    if (T[k]?.k === "mer" && !r.mer && k > i) {
      r = { ...r, mer: T[k]!.s, num: true };
      i = k + 1;
    } else if (T[k]?.k === "part" && !r.mer) {
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
    if (t?.k !== "n" || t.o) return undefined;
    if (t.len === 4 && t.v! >= 1000 && t.v! <= 2999) return i++, t.v;
    // "Dec 31 99": a two-digit number above 31 right after a date is a year
    if (t.len === 2 && t.v! > 31 && !is("mer", 1) && !is("u", 1) && !is("t", 1)) return i++, yy2(t.v!);
    return undefined;
  }
  function mdDate(mo: number, d: number, y?: number, sh?: boolean): DV {
    return { s: y ? `${y}-${p2(mo)}-${p2(d)}` : `${p2(mo)}-${p2(d)}`, k: y ? "other" : "md", d, mo, sh };
  }
  function readDate(): DV | undefined {
    const j = i;
    while (is("skip") && !T[i]!.p) i++;
    if (is("in") && (is("m", 1) || (is("n", 1) && T[i + 1]!.len === 4))) i++;
    while (is("mod") && T[i]!.v === 0 && is("mod", 1)) i++; // "this coming friday"
    const t = T[i];
    if (!t) return (i = j), undefined;
    let r: DV | undefined;
    let n: Tok | undefined;
    if (t.k === "tonight") {
      i++;
      lastPart = "night";
      r = { s: "+0d", k: "other" };
    } else if (t.k === "mod" && t.v === 0 && is("part", 1)) {
      lastPart = T[i + 1]!.s;
      i += 2;
      r = { s: "+0d", k: "other" };
    } else if (t.k === "mod" && t.v === 0 && is("eve", 1)) {
      lastPart = "pm";
      i += 2;
      r = { s: "+0d", k: "other" };
    } else if (t.k === "w" && is("n", 1) && T[i + 1]!.o && !T[i + 1]!.w && !is("m", 2) && !(is("of", 2) && is("m", 3)) && domDate(T[i + 1]!.v!, WDC.indexOf(t.s!))) {
      const s2 = domDate(T[i + 1]!.v!, WDC.indexOf(t.s!))!;
      r = { s: s2, k: "md", mo: +s2.slice(0, 2), d: +s2.slice(3) };
      i += 2;
    } else if (t.k === "n" && t.o && is("of", 1) && is("mod", 2) && is("u", 3) && T[i + 3]!.s === "m" && T[i + 2]!.v! >= 0 && domDate(t.v!, undefined, T[i + 2]!.v!)) {
      const s2 = domDate(t.v!, undefined, T[i + 2]!.v!)!;
      r = { s: s2, k: "md", mo: +s2.slice(0, 2), d: +s2.slice(3) };
      i += 4;
    } else if (t.k === "w" && is("after", 1) && is("mod", 2) && T[i + 2]!.v === 1) {
      r = { s: `${t.s}+2`, k: "other" };
      i += 3;
    } else if (t.k === "w" && is("of", 1) && is("mod", 2) && is("u", 3) && T[i + 3]!.s === "w") {
      const v = T[i + 2]!.v!;
      r = { s: t.s + (v > 0 ? "+1" : v < 0 ? "-1" : ""), k: "other" };
      i += 4;
    } else if (t.k === "mod" && t.v !== -1 && is("m", 1) && !dayNum(T[i + 2])) {
      r = { s: `M@${p2(T[i + 1]!.v!)}`, k: "mon", mo: T[i + 1]!.v };
      i += 2;
    } else if (t.k === "a" && is("biweekly", 1) && T[i + 1]!.s === "fn" && is("from", 2) && (is("now", 3) || is("rel", 3))) {
      r = { s: "+2w", k: "other" };
      i += 4;
    } else if (t.k === "after" && is("n", 1) && is("u", 2) && !T[i + 1]!.o) {
      r = { s: `+${T[i + 1]!.v}${T[i + 2]!.s}`, k: "other" };
      i += 3;
    } else if ((((t.k === "n" || t.k === "a") && is("u", 1) && T[i + 1]!.s === "d" && (is("after", 2) || is("before", 2))) || (t.k === "u" && t.s === "d" && (is("after", 1) || is("before", 1)))) && !is("rel", t.k === "u" ? 2 : 3) && !is("now", t.k === "u" ? 2 : 3)) {
      // "two days after the 1st of december", "the day before christmas eve"
      const un = t.k === "u";
      const cnt = un || t.k === "a" ? 1 : t.v!;
      const sign = T[i + (un ? 1 : 2)]!.k === "after" ? 1 : -1;
      i += un ? 2 : 3;
      const d = readDate();
      if (d && d.k === "md" && d.mo) r = { s: addMD(d.mo, d.d!, sign * cnt), k: "md", mo: +addMD(d.mo, d.d!, sign * cnt).slice(0, 2), d: +addMD(d.mo, d.d!, sign * cnt).slice(3) };
    } else if (t.k === "D") {
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
      if (is("times") && T[i]!.s === undefined) i++;
    } else if ((t.k === "n" || t.k === "a") && is("u", 1) && is("times", 2) && T[i + 2]!.s === undefined && (t.k === "a" || t.v === 1 || !T[i + 1]!.sg)) {
      r = { s: `+${t.k === "a" ? 1 : t.v}${T[i + 1]!.s}`, k: "other" };
      i += 3;
    } else if ((t.k === "n" || t.k === "a") && is("u", 1) && (is("ago", 2) || is("hence", 2) || (is("mod", 2) && T[i + 2]!.s === "past") || ((is("from", 2) || is("after", 2) || is("before", 2)) && (is("now", 3) || is("rel", 3))))) {
      const sign = is("ago", 2) || is("before", 2) || is("mod", 2) ? "-" : "+";
      if ((is("from", 2) || is("after", 2) || is("before", 2)) && is("rel", 3) && T[i + 3]!.v !== 0 && "dw".includes(T[i + 1]!.s!)) {
        // "a week from tomorrow", "2 day after tomorrow", "a week before yesterday"
        const amt = (t.k === "a" ? 1 : t.v!) * (T[i + 1]!.s === "w" ? 7 : 1) * (is("before", 2) ? -1 : 1);
        const tot = amt + T[i + 3]!.v!;
        r = { s: `${tot >= 0 ? "+" : ""}${tot}d`, k: "other" };
        i += 4;
      } else {
      r = { s: `${sign}${t.k === "a" ? 1 : t.v}${T[i + 1]!.s}`, k: "other" };
      i += is("ago", 2) || is("mod", 2) || is("hence", 2) ? 3 : 4;
      }
    } else if ((t.k === "n" || t.k === "a") && is("u", 1) && is("out", 2)) {
      r = { s: `+${t.k === "a" ? 1 : t.v}${T[i + 1]!.s}`, k: "other" };
      i += 3;
    } else if (t.k === "n" && t.s === "+" && is("u", 1)) {
      r = { s: `+${t.v}${T[i + 1]!.s}`, k: "other" };
      i += 2;
    } else if (t.k === "u" && t.s !== "d" && (is("gone", 1) || is("before", 1) || is("after", 1) || (is("mod", 1) && T[i + 1]!.v !== 0)) && !is("rel", 2)) {
      r = { s: `${t.s!.toUpperCase()}${is("after", 1) || T[i + 1]!.v === 1 ? "+1" : "-1"}`, k: "other" };
      i += 2;
    } else if (t.k === "u" && t.s === "w" && i === 0 && T.length === 1) {
      i++;
      r = { s: "W+0", k: "other" };
    } else if (t.k === "mod" && t.v !== 0 && is("u", 1) && T[i + 1]!.s === "w" && is("w", 2)) {
      r = { s: `${T[i + 2]!.s}${t.v! > 0 ? "+1" : "-1"}`, k: "other" };
      i += 3;
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
      if ((is("m") && dayNum(T[i + 1])) || is("D") || (is("n") && is("m", 1) && !T[i + 1]!.po)) {
        // "next monday, nov 9": the date wins
        const keep = i;
        const d2 = readDate();
        if (d2 && d2.k !== "mon" && d2.k !== "day") r = d2;
        else i = keep;
      }
      if (is("mod") && T[i]!.s === "coming") i++;
    } else if (t.k === "w" && (is("m", 1) || is("D", 1) || (is("n", 1) && (is("m", 2) || (is("of", 2) && is("m", 3))) && !T[i + 2]!.po)) && (i++, (n = undefined), (r = readDate()))) {
      /* weekday plus date ("fri 2 oct", "wed jan 7"): the date wins */
    } else if (t.k === "w" && !(is("n", 1) && !T[i + 1]!.o && (is("in", 2) || is("of", 2)) && is("m", 3))) {
      if (T[i] === t) i++;
      const post = T[i];
      if (is("mod") && T[i]!.v === 0 && is("u", 1) && T[i + 1]!.s === "w") i += 2; // "wednesday this week"
      let suf = eat("gone") ? "-1" : "";
      if (!suf && is("before") && !is("rel", 1)) (suf = "-1"), i++;
      else if (post?.k === "mod" && post.s === "coming" && !is("w", 1) && !is("u", 1)) i++;
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
      const hy = /^\d\d-/.test(s) ? readYear() : undefined;
      r = /^\d\d-/.test(s) ? (hy ? { s: `${hy}-${s}`, k: "other" } : { s, k: "md", mo: +s.slice(0, 2), d: +s.slice(3), hol: true }) : { s, k: "other" };
    } else if (t.k === "new" && is("u", 1) && T[i + 1]!.s === "y" && (!T[i + 1]!.sg || is("eve", 2) || (is("u", 2) && T[i + 2]!.s === "d"))) {
      i += 2;
      const eve = eat("eve");
      if (!eve && is("u") && T[i]!.s === "d") i++;
      r = { s: eve ? "12-31" : "01-01", k: "md", mo: eve ? 12 : 1, d: eve ? 31 : 1 };
    } else if (t.k === "m" && ((T[i + 1]?.k === "n" && (T[i + 1]!.o || T[i + 1]!.w)) || (T[i + 1]?.k === "mod" && T[i + 1]!.v === -1)) && is("w", 2)) {
      r = { s: `${T[i + 2]!.s}#${T[i + 1]!.k === "mod" ? -1 : T[i + 1]!.v}@${p2(t.v!)}`, k: "other" };
      i += 3;
    } else if (t.k === "w" && is("n", 1) && !T[i + 1]!.o && T[i + 1]!.v! >= 1 && T[i + 1]!.v! <= 5 && (is("in", 2) || is("of", 2)) && is("m", 3)) {
      r = { s: `${t.s}#${T[i + 1]!.v}@${p2(T[i + 3]!.v!)}`, k: "other" };
      i += 4;
    } else if (t.k === "m") {
      i++;
      if (dayNum(T[i])) {
        const d = T[i++]!.v!;
        const y = readYear();
        r = validMD(t.v!, d) ? mdDate(t.v!, d, y, true) : undefined;
      } else r = { s: `M@${p2(t.v!)}`, k: "mon", mo: t.v };
    } else if (t.k === "n" && dayNum(t) && ((is("m", 1) && !T[i + 1]!.po) || (is("of", 1) && is("m", 2)))) {
      i += is("m", 1) ? 1 : 2;
      const mo = T[i++]!.v!;
      let y = readYear();
      // "5 Nov 18": a two-digit number after day and month is the year
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
    lastPart = undefined;
    for (;;) {
      if (!pt.date && !(pt.num !== undefined && is("n") && T[i]!.len === 4)) {
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
      if (pt.date && pt.date.k !== "other" && is("w")) {
        i++; // "Dec 24, Thursday": the weekday adds nothing
        continue;
      }
      if (pt.date && pt.date.hol && (is("m") || is("D"))) {
        const keep = i;
        const d2 = readDate();
        if (d2 && d2.k === "md") {
          pt.date = d2; // "Christmas Eve, Dec 24"
          continue;
        }
        i = keep;
      }
      if (is("part") && !pt.part && (pt.date || pt.time || pt.num !== undefined)) {
        pt.part = T[i++]!.s;
        continue;
      }
      if ((is("before") || is("after")) && (pt.date || pt.time) && (is("n", 1) || is("t", 1) || is("noon", 1))) {
        // "after 1 PM" keeps the time, "before noon" is an end limit and gives no time
        const wasAfter = is("after");
        i++;
        const tm = readTime(true);
        if (tm && wasAfter && !pt.time) pt.time = tm;
        else if (!tm) break;
        continue;
      }
      if (is("at") || is("in") || is("from") || is("between")) {
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
    pt.part ??= lastPart;
    // a day part word gives an unmarked hour its am/pm ("sat morning at 9:30", "tonight at 10")
    if (pt.part && pt.date && pt.num !== undefined && !pt.time) asHour(pt);
    if (pt.part && pt.time && !pt.time.mer) {
      const r = pt.time;
      if (pt.part === "night") pt.time = r.h === 12 ? { h: 0, m: r.m, kn: true } : { ...r, mer: r.h >= 6 ? "pm" : "am", num: true };
      else if (r.h <= 12) pt.time = { ...r, mer: pt.part, num: true };
    }
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
      } else if (y.date?.mo && !y.time) return null;
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
    if (a.date && b.date) {
      // "Aug 7 - Aug 14, 2027": one year serves both ends
      const ya = /^\d{4}-/.test(a.date.s);
      const yb = /^\d{4}-/.test(b.date.s);
      if (!ya && yb && /^\d\d-\d\d$/.test(a.date.s)) a.date = { ...a.date, s: b.date.s.slice(0, 5) + a.date.s };
    }
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
    // a time before the pattern: "standup 9:15 every weekday", "pickup at 3:20 weekdays"
    let pre: string | undefined;
    if (is("from") && (is("n", 1) || is("t", 1))) i++;
    if (is("at") || is("t") || is("noon") || is("mid") || (is("n") && (is("mer", 1) || (is("sep", 1) && (is("n", 2) || is("t", 2)))))) {
      const save = i;
      pre = readTimeRange(true);
      if (!pre) i = save;
    }
    let plain = false;
    let rp: string | undefined; // day part of the recurrence ("every morning")
    let startPre: string | undefined;
    if ((is("m") || is("D")) && T.some((x) => x.k === "w")) {
      const save = i;
      const d0 = readDate();
      if (d0 && d0.k !== "mon" && d0.k !== "day") startPre = d0.s;
      else i = save;
    }
    let ev = !!eat("every");
    while (is("skip")) i++;
    let lead: number | undefined;
    if (is("n") && !T[i]!.o && (T[i + 1]?.pl || is("wkd", 1))) lead = T[i++]!.v;
    else if (is("n") && !T[i]!.o && is("times", 1) && T[i + 1]!.s === undefined) (lead = T[i]!.v), (i += 2);
    const t = T[i];
    if (!t) return null;
    const isNthWd = (o: number) => (T[i + o]?.k === "n" && (T[i + o]!.o || T[i + o]!.w) || (T[i + o]?.k === "mod" && T[i + o]!.v === -1)) && is("w", o + 1);
    if (t.k === "daily") (i++, (f = "d"), (rp = t.s));
    else if (ev && t.k === "u" && t.s === "d") (i++, (f = "d"));
    else if (ev && t.k === "part") (rp = t.s), i++, (f = "d");
    else if (t.k === "wkd") (i++, (f = "d"), (days = WEEKDAY5.split(",")));
    else if (t.k === "wkds") (i++, (f = "w"), (days = ["sa", "su"]));
    else if (t.k === "work" && is("u", 1)) (i += 2, (f = "d"), (days = WEEKDAY5.split(",")));
    else if (t.k === "w" && is("sep", 1) && T[i + 1]!.s === "until" && is("w", 2)) {
      const a0 = WDC.indexOf(t.s!);
      const b0 = WDC.indexOf(T[i + 2]!.s!);
      const out: string[] = [];
      for (let q = a0; ; q = (q + 1) % 7) {
        out.push(WDC[q]!);
        if (q === b0 || out.length > 7) break;
      }
      (i += 3), (f = out.join() === WEEKDAY5 ? "d" : "w"), (days = out);
    } else if (t.k === "w" && is("sep", 1) && t.s === "mo" && T[i + 2]?.s === "fr") (i += 3, (f = "d"), (days = WEEKDAY5.split(",")));
    else if (t.k === "other" && is("u", 1)) {
      (f = T[i + 1]!.s!), (n = 2), (i += 2);
    } else if (t.k === "other" && is("w", 1)) (i++, (f = "w"), (n = 2), (days = [T[i++]!.s!]));
    else if (t.k === "n" && is("weekly", 1)) (f = "w"), (n = t.v!), (i += 2);
    else if (t.k === "bimonthly") (i++, (f = "m"), (n = 2));
    else if (t.k === "quarter") (i++, (f = "m"), (n = 3));
    else if (t.k === "u" && t.s === "m" && is("end", 1)) (i += 2, (f = "m"), (mdays = "d-1"));
    else if (ev && t.k === "n" && is("u", 1) && "dwm".includes(T[i + 1]!.s!) && !isNthWd(0) && !(T[i + 1]!.sg && !t.o && t.v !== 1)) (f = T[i + 1]!.s!), (n = t.v!), (i += 2), (plain = true);
    else if (t.k === "biweekly") (i++, (f = "w"), (n = 2));
    else if (t.k === "weekly") (i++, (f = "w"));
    else if (t.k === "monthly") (i++, (f = "m"));
    else if (t.k === "yearly" || (ev && t.k === "u" && t.s === "y")) (i++, (f = "y"));
    else if (ev && t.k === "u" && t.s === "w") (i++, (f = "w"), (plain = true));
    else if (ev && t.k === "u" && t.s === "m") (i++, (f = "m"), (plain = true));
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
    } else if (t.k === "w" || isNthWd(0) || (t.k === "n" && (is("of", 1) || is("every", 1) || (is("and", 1) && is("n", 2)) || (ev && t.o && !is("u", 1))) && !is("w", 1))) {
      if (isNthWd(0)) {
        const k = T[i]!.k === "mod" ? -1 : T[i]!.v!;
        const wd = T[i + 1]!.s!;
        let q = i + 2;
        if (T[q]?.k === "of") q++;
        while (T[q]?.k === "every" || T[q]?.k === "skip") q++;
        if (T[q]?.k === "u" && T[q]!.s === "m") {
          i = q + 1;
          (f = "m"), (nth = `${wd}#${k}`);
        } else if (ev && T[i]!.k === "n" && T[i]!.w && k !== 2) {
          i += 2;
          (f = "m"), (nth = `${wd}#${k}`);
        } else if (spanMode && !ev && T[i]!.k === "n") {
          i += 2;
          (f = "m"), (nth = `${wd}#${k}`);
        } else if (T.some((x) => x.k === "monthly")) {
          i += 2;
          (f = "m"), (nth = `${wd}#${k}`);
        } else if (ev && T[i]!.k === "n") (n = k), (i += 1), (f = "w"), (days = readWdList());
        else return null;
      } else if (t.k === "w") {
        f = "w";
        days = readWdList();
      } else if (t.k === "n") {
        // "on the 15th of every month", "the 1st and 15th every month"
        let d = `${t.v}`;
        i++;
        while (is("and") && is("n", 1)) d += `,d${T[i + 1]!.v}`, (i += 2);
        if (is("of")) i++;
        eat("every");
        if (!eat("u") && !(ev && t.o)) return null;
        (f = "m"), (mdays = `d${d}`);
      }
    } else if ((ev || T.some((x) => x.k === "every")) && t.k === "m") {
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
    let start: string | undefined = startPre;
    let time: string | undefined;
    while (!done()) {
      const c = T[i]!;
      if (c.k === "skip" && !c.p) i++;
      else if (c.k === "between") i++;
      else if (c.k === "except") {
        i++;
        const ex = readWdList();
        if (ex.length) days = WDC.filter((d) => !ex.includes(d));
      } else if (c.k === "in" && is("m", 1) && !(is("n", 2) && !is("mer", 3))) {
        const mo = T[i + 1]!.v!;
        start = `${p2(mo)}-01`;
        until = monthEnd(mo);
        i += 2;
      } else if (c.k === "m" || c.k === "D" || (c.k === "n" && c.len !== undefined && (is("m", 1) || is("of", 1)))) {
        // "June 6 through July 25", "September through October 25th": start and end of a bounded recurrence
        const a = readDate();
        if (!a || a.k === "day") return null;
        if (is("sep")) {
          i++;
          const b = readDate();
          if (!b || b.k === "day") return null;
          if (a.k === "mon" && b.k === "mon") continue; // "September to May"
          if (a.k !== "mon") start = a.s;
          until = b.k === "mon" ? monthEnd(b.mo!) : b.s;
        } else start = a.s;
      } else if (c.k === "part" || (c.k === "u" && T[i - 1]?.k === "of")) (rp ??= c.s), i++;
      else if (c.k === "w" && is("sep", 1) && is("w", 2) && (f === "d" || f === "w") && !days) {
        // "Monday through Friday"
        const a0 = WDC.indexOf(c.s!);
        const b0 = WDC.indexOf(T[i + 2]!.s!);
        const out: string[] = [];
        for (let q = a0; ; q = (q + 1) % 7) {
          out.push(WDC[q]!);
          if (q === b0 || out.length > 7) break;
        }
        days = out;
        if (out.join() === WEEKDAY5) f = "d";
        i += 3;
      } else if (c.k === "w" && f === "w" && !days) days = readWdList();
      else if (c.k === "weekly" || c.k === "daily" || c.k === "wkd" || c.k === "monthly" || c.k === "yearly") i++;
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
      } else if (c.k === "for" && is("mod", 1) && T[i + 1]!.v === 1 && numOf(T[i + 2]) !== undefined && (is("u", 3) || is("times", 3))) {
        count = numOf(T[i + 2])! * (T[i + 3]!.s === "w" ? (days ? days.length : f === "d" ? 7 : 1) : 1);
        i += 4;
      } else if (c.k === "for" && numOf(T[i + 1]) !== undefined && (is("u", 2) || is("times", 2))) {
        count = numOf(T[i + 1])! * (T[i + 2]!.s === "w" ? (days ? (f === "d" && days.length === 5 ? 5 : days.length) : f === "d" ? 7 : 1) : 1);
        i += 3;
      } else if (c.k === "for" && is("n", 1) && !is("u", 2) && !is("m", 2) && !is("mer", 2) && !T[i + 1]!.o && !T[i + 1]!.w) {
        count = T[i + 1]!.v;
        i += 2;
      } else if (c.k === "times" && c.s === undefined && is("n", 1)) {
        count = T[i + 1]!.v;
        i += 2;
      } else if ((c.k === "sep" && c.s === "until") || (c.k === "up" && is("sep", 1))) {
        if (c.k === "up") i++;
        i++;
        if (is("end") && is("of", 1)) {
          i += 2;
          if (is("u") && T[i]!.s === "y") (i++, (until = "12-31"));
          else {
            const d = readDate();
            if (!d || d.k !== "mon") return null;
            until = monthEnd(d.mo!);
          }
        } else {
          const d = readDate();
          if (!d || d.k === "day") return null;
          if (d.k === "mon" && !spanMode) return null;
          until = d.k === "mon" ? monthEnd(d.mo!) : d.s;
        }
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
    if (!time && pre) time = pre;
    // "every morning at 7": the day part gives unmarked hours their am/pm
    if (time && rp) time = time.replace(/(\d{1,2})(?::(\d\d))?\?/g, (_, h, mm = "00") => `${p2(rp === "night" ? (+h === 12 ? 0 : +h >= 6 ? +h + 12 : +h) : (+h % 12) + (rp === "pm" ? 12 : 0))}:${mm}`);
    if (!(plain && !trailingSkip) && ((f === "m" && !nth && !mdays) || (f === "y" && !yday) || (f === "w" && !days && n < 2 && !count))) return null;
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
    T.some((t, j) => ["every", "other", "daily", "weekly", "monthly", "yearly", "biweekly", "bimonthly", "quarter", "wkd", "wkds"].includes(t.k) && !(t.k === "biweekly" && t.s === "fn" && T[j + 1]?.k === "from") || (t.k === "w" && (t.pl || (T[j + 1]?.k === "and" && T[j + 2]?.k === "w" && !T.some((x) => x.k === "between")))) || (t.k === "u" && t.s === "m" && T[j - 1]?.k === "of" && T[j + 1]?.k !== "m")) ||
    (T[0]?.k === "w" && T.some((t, j) => (t.k === "for" && T[j + 1]?.k === "n" && (T[j + 2]?.k === "times" || T[j + 2]?.k === "u")) || (t.k === "sep" && t.s === "until" && ["m", "D"].includes(T[j + 1]?.k ?? "")))) ||
    (spanMode && T.some((t) => t.k === "mer" || t.k === "t") && T.some((t, j) => t.k === "w" && T[j + 1]?.k === "sep" && T[j + 1]!.s === "until" && T[j + 2]?.k === "w")) ||
    (spanMode && T.some((t, j) => t.k === "n" && t.o && t.v! <= 5 && T[j + 1]?.k === "w") && !T.some((t) => t.k === "m")) ||
    T.some((t, j) => t.k === "times" && t.s === undefined && T[j + 1]?.k === "n" && T.some((x) => x.k === "w")) ||
        T.some((t, j) => t.k === "w" && T[j + 1]?.k === "w" && !T.slice(0, j).some((x) => x.k === "sep" || x.k === "between"));
  if (wantsRec) {
    // "from 6th may every 3 wks": move the leading start date to the end
    if (is("from")) {
      i = 1;
      if (readDate()) T = [...T.slice(i), ...T.slice(0, i)];
      i = 0;
    }
    return recurrence();
  }
  while (is("from") || is("between") || is("at") || is("for") || is("part") || (is("skip") && !T[i]!.p)) i++;
  const a = readPoint();
  if (!a) return null;
  if (done()) return single(a);
  if (!(is("sep") || is("and"))) return null;
  i++;
  const b = readPoint();
  if (!b) return null;
  const yr = !done() ? readYear() : undefined;
  if (!done()) return null;
  const rr = range(a, b);
  // "July 10 - 12, 2026": the year after the end belongs to both dates
  return yr && rr ? rr.replace(/(^|[ >])(\d\d-\d\d)(?=[ >]|$)/g, `$1${yr}-$2`) : rr;
}

/** Parse the longest parsable prefix of the tokens. Returns the DSL line and how many tokens it used. */
function prefixParse(toks: Tok[]): { r: string; end: number } | null {
  let top = toks.length;
  // a number followed by a partial word is an unfinished date ("13th oct - 17 ma"): drop the number too
  const last = toks[top - 1];
  const prev = toks[top - 2];
  if (last?.p && last.k !== "m" && prev?.k === "n" && !prev.o && toks[top - 3]?.k !== "m") top -= 1;
  for (let end = top; end > 0; end--) {
    const r = parse(toks.slice(0, end));
    if (r) {
      const tail = toks[end];
      const w = toks[end - 1];
      const b = toks[end - 2];
      // "last friday of", "sat to": the start of a longer phrase, not a date yet
      if (tail && w?.k === "w" && ((["of", "in", "every"].includes(tail.k) && ((b?.k === "mod" && b.v === -1) || (b?.k === "n" && (b.o || b.w)))) || (tail.k === "and" && end <= 2) || (end === 1 && w.s === "sa" && tail.k === "sep" && tail.s === "to"))) return null;
      if (end === 1 && end < toks.length && toks[0]!.k === "n" && !toks[0]!.o && (tail!.p || ["u", "w", "m"].includes(tail!.k))) return null;
      // "13th oct - 17 ma": a range end that is only a day number is unfinished when more text was dropped
      if (!spanMode && end === toks.length - 1 && toks[end - 1]?.k === "n" && (toks[end - 2]?.k === "sep" || toks[end - 2]?.k === "and") && (tail!.p || tail!.k === "of" || tail!.k === "in")) {
        end -= 1;
        continue;
      }
      return { r, end };
    }
  }
  return null;
}

/** Tokens that show a date or time is meant. A bare number or a lone month word is not enough. */
const STRONG = new Set(["rel", "w", "D", "mer", "noon", "mid", "part", "h", "wknd", "tonight", "ago", "out", "daily", "weekly", "every", "wkd", "biweekly", "monthly", "yearly", "bimonthly", "quarter", "mod", "oclock", "u"]);

/**
 * Text with unknown words around the date phrase: drop the unknown words and find the longest span
 * that parses. The span needs a strong token. A lone month needs "in" before it. A bare number
 * that was separated from the next token by an unknown word is not joined to it.
 */
function span(all: Tok[]): string {
  const hint = all.some((t) => t.st || t.k === "at" || t.k === "between");
  const toks: Tok[] = [];
  let gap = false;
  let words: string[] = [];
  for (let j = 0; j < all.length; j++) {
    const t = all[j]!;
    const nx = all[j + 1];
    const weak = t.k === "?" || (t.k === "quarter" && t.s === "ly" && !(nx && (nx.k === "n" || nx.k === "w" || nx.k === "every"))) || (t.k === "skip" && !t.p) || (t.k === "work" && nx?.k !== "u") || (t.k === "new" && nx?.k !== "u") || (t.k === "up" && nx?.k !== "sep") || (t.k === "end" && nx?.k !== "of" && all[j - 1]?.k !== "u") || (t.k === "h" && t.z && !(nx?.k === "u" && nx.s === "d"));
    if (weak || (t.k === "n" && t.w && !t.o && nx?.k === "?" && all[j - 1]?.k !== "at") || ((t.k === "n" || (t.k === "t" && t.hm)) && !t.o && !t.w && nx?.k === "?" && (t.k === "t" || (t.len ?? 9) <= 2) && !["at", "in", "from", "sep", "and", "m"].includes(all[j - 1]?.k ?? "") && !(all[j + 2]?.k === "mer"))) {
      gap = true;
      words.push(t.s ?? t.k);
      continue;
    }
    toks.push(gap ? { ...t, gap: true, pw: words } : t);
    gap = false;
    words = [];
  }
  /** The longest parsable span inside a list of tokens. */
  const find = (list: Tok[], base: number): { r: string; n: number; a: number } | undefined => {
    let best: { r: string; n: number; a: number } | undefined;
    for (let a = 0; a < list.length; a++) {
      if (best && best.n >= list.length - a) break; // nothing later can be longer
      if (["mer", "sep", "and", "of", "ago", "out"].includes(list[a]!.k)) continue;
      const p = prefixParse(list.slice(a));
      if (!p) continue;
      const used = list.slice(a, a + p.end);
      if (used.some((t, j) => j > 0 && t.gap && used[j - 1]!.k === "n" && !(t.k === "mer" || t.k === "sep"))) continue;
      if (used.some((t, j) => j > 0 && t.gap && (used[j - 1]!.k === "and" || used[j - 1]!.k === "sep"))) continue;
      const bareRange = used.length === 3 && used[0]!.k === "n" && used[1]!.k === "sep" && used[2]!.k === "n" && used[0]!.v! <= 24 && used[2]!.v! <= 24 && (used[2]!.v! > used[0]!.v! || used[1]!.s === "to");
      const strong = bareRange || used.some((t) => (STRONG.has(t.k) && !(t.k === "u" && used.length < 2)) || (t.k === "t" && !t.hm) || (t.k === "m" && (used.length > 1 || !t.am)));
      if (!strong && !(hint && used.some((t) => t.k === "n" || t.k === "t"))) continue;
      if (used.every((t) => t.k === "skip" || t.k === "at")) continue;
      if (used.length === 1 && (used[0]!.k === "m" || used[0]!.k === "w") && used[0]!.am) continue;
      // a lone plural weekday or a recurrence without "every" or a time is too weak next to unknown words
      if (p.r.includes(" R ") && !p.r.startsWith("dt") && !used.some((t) => t.k === "every" || t.k === "daily" || t.k === "wkd" || t.k === "other" || t.k === "biweekly")) continue;
      if (!best || p.end > best.n) best = { r: p.r, n: p.end, a: a + base };
    }
    return best;
  };
  spanMode = true;
  const whole = find(toks, 0);
  // every span found, left to right: the best span in a stretch of known tokens, then what is left of it
  const runs: { r: string; cue: string[]; hol: boolean }[] = [];
  const collect = (lo: number, hi: number) => {
    if (lo >= hi) return;
    const f = find(toks.slice(lo, hi), lo);
    if (!f) return;
    collect(lo, f.a);
    const first = toks[f.a]!;
    const used = toks.slice(f.a, f.a + f.n);
    const lead = used.filter((t) => t.k === "from" || t.k === "sep").map((t) => (t.k === "from" ? "from" : t.s!));
    runs.push({ r: f.r, cue: [...(f.a > lo ? toks.slice(Math.max(lo, f.a - 2), f.a).map((t) => t.s ?? t.k) : first.pw ?? []), ...lead], hol: used.some((t) => t.k === "h" || t.k === "new") });
    collect(f.a + f.n, hi);
  };
  let lo = 0;
  for (let q = 1; q <= toks.length; q++) {
    if (q < toks.length && !toks[q]!.gap) continue;
    collect(lo, q);
    lo = q;
  }
  spanMode = false;
  if (runs.length < 2) return whole ? whole.r : "x";
  return compose(runs, all) ?? (whole ? whole.r : "x");
}

const RANGE_CUE = new Set(["return", "returns", "arr", "arrive", "arrives", "dropoff", "ends", "end", "back", "checkout", "out"]);
const DATE_END_CUE = new Set(["ends", "end", "depart", "departs", "departure", "dropoff", "return", "returns", "checkout", "leave", "leaves", "ending"]);
const UNTIL_CUE = new Set(["ends", "end", "until", "through", "thru", "by", "till", "ending", "expires", "to"]);
const START_CUE = new Set(["starts", "start", "begins", "begin", "beginning", "starting", "from", "session"]);
const absDate = (d: string) => /^(\d{4}-)?\d\d-\d\d(>(\d{4}-)?\d\d-\d\d)?$/.test(d);
const ALLWD = ["mo", "tu", "we", "th", "fr", "sa", "su"];

/** Give unmarked hours in a DSL time string the am/pm of a day part. */
function partTime(t: string, part: string): string {
  return t.replace(/(\d{1,2})(?::(\d\d))?\?/g, (_, h, mm = "00") => `${p2(part === "night" ? (+h === 12 ? 0 : +h >= 6 ? +h + 12 : +h) : (+h % 12) + (part === "pm" ? 12 : 0))}:${mm}`);
}

/** Combine the date and time spans found in a longer message into one DSL line. */
function compose(runs: { r: string; cue: string[]; hol: boolean }[], all: Tok[]): string | null {
  const kind = (r: string) => (r.startsWith("t ") ? "T" : r.includes(" R ") ? "R" : "D");
  // how specific a span is: a recurrence, then a dated time, then a numeric date, then anything else
  const score = (r: string, hol = false) => (hol ? 2 : kind(r) === "R" ? (r.split(" ").length <= 3 ? 1 : 5 + (/\d:\d\d|\d\?/.test(r) ? 1 : 0)) : r.startsWith("dt") && /dt (\d{4}-)?\d\d-\d\d/.test(r) ? 4 : /^d? ?(\d{4}-)?\d\d-\d\d/.test(r.replace(/^dt? /, "")) ? 3 : r.startsWith("dt") ? 2 : 1);
  let pi = -1;
  runs.forEach((x, j) => {
    if (kind(x.r) !== "T" && (pi < 0 || score(x.r, x.hol) > score(runs[pi]!.r, runs[pi]!.hol))) pi = j;
  });
  if (pi < 0) return runs[0]!.r;
  const prim = runs[pi]!;
  const others = runs.filter((_, j) => j !== pi);
  const part = all.find((t) => t.k === "part")?.s ?? (all.some((t) => t.k === "tonight") ? "night" : undefined);
  const times = others.filter((x) => kind(x.r) === "T").map((x) => ({ ...x, r: part && x.r.includes("?") ? "t " + partTime(x.r.slice(2), part) : x.r }));
  const dates = others.filter((x) => kind(x.r) === "D");
  let r = prim.r;
  const wd = /^dt? (mo|tu|we|th|fr|sa|su)( |$)/.exec(r)?.[1];
  if (kind(r) === "D" && wd && all.some((t) => t.k === "weekly")) {
    const tm = r.split(" ")[2] ?? times[0]?.r.slice(2);
    r = `${tm ? "dt" : "d"} R w/1 ${wd}${tm ? " " + tm : ""}`;
  }
  if (kind(r) === "D") {
    const [mode, ...rest] = r.split(" ");
    const body = rest.join(" ");
    if (mode === "d" && !body.includes(">") && times.length) {
      // times: a range, one time, or two times joined by a range cue ("depart 9:15, return 1:30")
      const t0 = times[0]!.r.slice(2);
      if (t0.includes(">") || times.length === 1) r = `dt ${body} ${t0}`;
      else if (times.length === 2 && times[1]!.cue.some((w) => RANGE_CUE.has(w)) && !times[1]!.r.includes(">") && !times[1]!.r.includes("?")) r = `dt ${body} ${t0}>${times[1]!.r.slice(2)}`;
    } else if (mode === "dt" && !body.includes(">") && times.length === 1 && times[0]!.cue.some((w) => RANGE_CUE.has(w)) && !times[0]!.r.includes(">")) {
      r = `${r}>${times[0]!.r.slice(2)}`;
    }
    // a second absolute date with an end cue makes a range
    const sec = undefined as (typeof dates)[number] | undefined; // several dates: the first one is the label
    if (sec && !r.includes(">") && absDate(r.split(" ")[1] ?? "")) {
      const [m2, ...r2] = sec.r.split(" ");
      const [m1, ...r1] = r.split(" ");
      let a1 = r1[0]!;
      let a2 = r2[0]!;
      const ya = /^\d{4}-/.test(a1);
      const yb = /^\d{4}-/.test(a2);
      if (!ya && yb) a1 = a2.slice(0, 5) + a1;
      if (m1 === "dt" && m2 === "dt") r = `dt ${a1} ${r1[1]}>${a2} ${r2[1]}`;
      else if (m1 === "d" && m2 === "d") r = `d ${a1}>${a2}`;
    }
  } else {
    // recurrence: add a time, a start or an end from the other spans
    const parts = r.split(" ");
    const isT = (x: string) => /^\d{1,2}(:\d\d)?\??(>|$)/.test(x) || /^\d\d:\d\d/.test(x);
    let time = parts.find((x, j) => j > 2 && isT(x));
    let u = parts.find((x) => /^u\d/.test(x));
    let st = parts.find((x) => /^s\d/.test(x));
    if (!time && times.length) time = times[0]!.r.slice(2);
    // two dates joined by a dash or "until" ("Feb 18 - Apr 3 4:30 PM") are the start and the end
    const joined = new Set<(typeof runs)[number]>();
    others.forEach((o, j) => {
      const prev = others[j - 1];
      if (kind(o.r) === "T" || !prev || kind(prev.r) !== "D" || !o.cue.some((w) => ["-", "to", "until", "through", "thru"].includes(w))) return;
      const [pa, ob] = [prev.r.split(" ")[1] ?? "", o.r.split(" ")] as const;
      if (!absDate(pa) || pa.includes(">") || !absDate(ob[1] ?? "") || (ob[1] ?? "").includes(">")) return;
      st ??= `s${pa}`;
      u ??= `u${ob[1]}`;
      if (ob[0] === "dt" && !time) time = ob[2];
      joined.add(o), joined.add(prev);
    });
    for (const d of dates.filter((x) => !joined.has(x))) {
      const v = d.r.split(" ")[1] ?? "";
      if (!absDate(v)) continue;
      if (v.includes(">")) {
        const [v1, v2] = v.split(">");
        st ??= `s${v1}`;
        u ??= `u${v2}`;
        continue;
      }
      if (d.cue.some((w) => UNTIL_CUE.has(w))) u ??= `u${v}`;
      else if (d.cue.some((w) => START_CUE.has(w))) st ??= `s${v}`;
    }
    // "8 weeks" somewhere in the message bounds the recurrence
    let cnt = parts.find((x) => /^n\d/.test(x));
    if (!cnt) {
      const j0 = all.findIndex((t, j) => t.k === "n" && !t.o && !t.w && all[j + 1]?.k === "u" && "wd".includes(all[j + 1]!.s!) && !["every", "in", "mod"].includes(all[j - 1]?.k ?? ""));
      if (j0 >= 0) {
        const nd = (parts[3] ?? "").split(",").length;
        cnt = `n${all[j0]!.v! * (all[j0 + 1]!.s === "w" ? (/^(mo|tu|we|th|fr|sa|su)/.test(parts[3] ?? "") ? nd : 1) : 1)}`;
      }
    }
    r = `${time ? "dt" : "d"} R ${[...parts.slice(2).filter((x) => x !== cnt && x !== time && x !== u && x !== st), cnt, u, time, st].filter(Boolean).join(" ")}`;
  }
  return r;
}


/** Parse a token list the way the whole text is parsed: unknown words around the date are dropped. */
function parseToks(toks: Tok[]): string {
  if (toks.length === 1 && toks[0]!.k === "n" && toks[0]!.w && !toks[0]!.st) return "x";
  if (toks.some((t) => t.k === "?")) return span(toks);
  const pp = prefixParse(toks);
  if (pp) return pp.r;
  return ["after", "before", "sep", "work"].includes(toks[0]?.k ?? "") ? span(toks) : "x";
}

function parseBase(text: string, today?: string): string {
  refToday = today ?? "2026-11-03";
  const toks = scan(norm(text));
  if (scanBad) return "x";
  return parseToks(toks);
}

// ---------------------------------------------------------------- DSL v2 layer
// Families the v1 grammar cannot say: open ranges, durations, day of month, date lists, counted
// occurrences, bounded recurrences, month filters, anchored and business-day offsets, windows, quarters.
// Each handler returns a DSL line or null. They run before the base parser.

const WD7 = ["mo", "tu", "we", "th", "fr", "sa", "su"];
const sortWd = (a: string[]) => [...new Set(a)].sort((x, y) => WD7.indexOf(x) - WD7.indexOf(y));
const sp = (r: string): [string, string] => {
  const k = r.indexOf(" ");
  return k < 0 ? [r, ""] : [r.slice(0, k), r.slice(k + 1)];
};
const plain = (b: string) => b !== "" && !b.includes(">") && !b.includes(",") && !b.includes("<") && !/^R /.test(b);
const NUMWORD: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, fifteen: 15, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, ninety: 90 };
const AMT = "\\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|sixty|ninety";
const amt = (w: string) => (/^\d+$/.test(w) ? +w : NUMWORD[w] ?? 1);
const MONRE = "(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\\b\\.?";
const monN = (w: string) => MON3.indexOf(w.slice(0, 3)) + 1;
const WDRE7 = "(?:mon(?:day)?s?|tues?(?:day)?s?|wed(?:s|nesday)?s?|thu(?:r|rs)?(?:sday)?s?|fri(?:day)?s?|sat(?:urday)?s?|sun(?:day)?s?)";
const WDCODE: Record<string, string> = { mon: "mo", tue: "tu", wed: "we", thu: "th", fri: "fr", sat: "sa", sun: "su" };
const wdCode = (w: string) => WDCODE[w.slice(0, 3)]!;

let compactStyle = "";
/** Words made of day letters (mwf, tth, w/th/f, m t w th) become weekday names. */
function expandCompact(s: string): string {
  compactStyle = "";
  const ITEM = /th|tu|sa|su|mo|we|fr|m|t|w|f|s/y;
  const items = (w: string): string[] | null => {
    const out: string[] = [];
    for (const part of w.split(/[\/+&]/)) {
      if (!part) return null;
      ITEM.lastIndex = 0;
      let pos = 0;
      while (pos < part.length) {
        ITEM.lastIndex = pos;
        const m = ITEM.exec(part);
        if (!m) return null;
        out.push(m[0]);
        pos = ITEM.lastIndex;
      }
    }
    return out;
  };
  const assign = (list: string[]): string[] | null => {
    let prev = 0;
    const out: string[] = [];
    for (const it of list) {
      const cand = it === "m" || it === "mo" ? [1] : it === "t" ? [2, 4] : it === "tu" ? [2] : it === "w" || it === "we" ? [3] : it === "th" ? [4] : it === "f" || it === "fr" ? [5] : it === "s" ? [6, 7] : it === "sa" ? [6] : [7];
      const c = cand.find((x) => x > prev);
      if (!c) return null;
      prev = c;
      out.push(WD7[c - 1]!);
    }
    return out;
  };
  const words = s.split(" ");
  const out: string[] = [];
  for (let i = 0; i < words.length; ) {
    // a run of words that are all day letters
    let j = i;
    const all: string[] = [];
    while (j < words.length) {
      const w = words[j]!.replace(/[.,!?]+$/, "");
      const it = /^[a-z\/+&]+$/.test(w) ? items(w) : null;
      if (!it) break;
      all.push(...it);
      j++;
    }
    const run = words.slice(i, j).join(" ");
    const days = all.length >= 2 && (j - i >= 2 || all.length >= 3 || /^(mw|wf|mt)$/.test(run)) ? assign(all) : null;
    if (days && !/^(we|so|us|to|at|it|is|of|on|or|as|an|am|if|in|my|me|by|do|go|no|up|oh)$/.test(run)) {
      compactStyle = j - i > 1 ? "spaced" : /[\/+&]/.test(run) ? "slash" : "compact";
      out.push(days.map((d) => ({ mo: "mon", tu: "tue", we: "wed", th: "thu", fr: "fri", sa: "sat", su: "sun" } as Record<string, string>)[d]!).join(" and "));
      i = j;
    } else {
      out.push(words[i]!);
      i++;
    }
  }
  let r = out.join(" ");
  // single-letter or two-letter ranges: m-f, m-th
  r = r.replace(/(?<![a-z\d])(m|mo|t|tu|w|we|th|f|fr|s|sa|su)-(m|mo|t|tu|w|we|th|f|fr|s|sa|su)(?![a-z\d])/g, (m, a, b) => {
    const d = (x: string) => ({ m: "mon", mo: "mon", t: "tue", tu: "tue", w: "wed", we: "wed", th: "thu", f: "fri", fr: "fri", s: "sat", sa: "sat", su: "sun" } as Record<string, string>)[x]!;
    return `${d(a)}-${d(b)}`;
  });
  return r.replace(/\b(\d{1,2}) (st|nd|rd|th)\b/g, "$1$2").replace(/\btha\b/g, "the");
}

/** Parse tokens, and read "the 5th" as a day of month when nothing else gives a date. */
function pp(T: Tok[]): string {
  const d = domOf(T);
  if (d) {
    const r = parseToks([...T.slice(0, d[0]), ...T.slice(d[0] + 1)].filter((t) => t.k !== "h"));
    const [rm, rb] = sp(r);
    const tm = rm === "t" ? rb : rm === "dt" ? rb.split(" ").slice(1).join(" ") : "";
    return tm ? `dt D@${p2(d[1])} ${tm}` : `d D@${p2(d[1])}`;
  }
  return parseToks(T);
}

/** Day of month in "the 15th", "on the 3rd", "the tenth", when no month, weekday or recurrence word is near. */
function domOf(T: Tok[]): [number, number] | null {
  if (T[T.length - 1]?.k === "of") return null;
  if (T.some((t) => ["w", "every", "weekly", "monthly", "daily", "wkd", "wkds", "ago", "hence", "rel", "D"].includes(t.k) || (t.k === "m" && !(t.am && T[T.indexOf(t) - 1]?.k !== "of")))) return null;
  for (let j = 0; j < T.length; j++) {
    const t = T[j]!;
    if (t.k !== "n" || t.v! < 1 || t.v! > 31 || (t.len !== undefined && t.len > 2)) continue;
    const pv = T[j - 1];
    const nx = T[j + 1];
    if (T[j - 1]?.k === "sep" || T[j + 1]?.k === "sep" || T[j - 1]?.k === "m" || T[j + 1]?.k === "m" || (T[j + 1]?.k === "of" && T[j + 2]?.k === "m")) continue;
    const lead = t.the || t.po || (pv?.k === "?" && ["due", "is", "for", "was", "will"].includes(pv.s ?? ""));
    if (t.o && lead && !(nx?.k === "?" && false)) return [j, t.v!];
    if (!t.o && t.the && (!nx || ["mer", "t", "at", "part", "noon", "mid", "in"].includes(nx.k))) return [j, t.v!];
  }
  return null;
}

function unsupported(s: string): boolean {
  return (
    /\b(twice|thrice)\b|\b(\d+|once|two|three|four|five) times (a|per|each|every) (day|week|month|year)\b|\bevery (few|couple of|couple) (days|weeks|months)\b|\bseveral times\b/.test(s) ||
    /\b(summer|winter|spring|autumn|fall)\b (break|term|semester|holidays?|vacation)|(?<!\d)\b(christmas|thanksgiving|easter|new year'?s?|xmas|holiday|memorial day|labor day) (week|weekend|season|break|period)\b(?!.*\d)|\b(first|second|1st|2nd) half of\b|\b(last|final) business day of\b|\b(first|second|third|fourth|1st|2nd|3rd|4th|last) week of\b/.test(s) ||
    /\b(in|within|after|for) (an? |\d+ |half an? |a couple of )?(minutes?|mins?|hours?|hrs?|seconds?)\b.*\b(from now|ago|later)\b|\b\d+ ?(minutes?|mins?|hours?|hrs?) (from now|ago|later)\b|\bin (\d+|an?|half an?|one|two|three|four|five|ten|fifteen|twenty|thirty) ?(minutes?|mins?|hours?|hrs?)\b(?! (on|at))/.test(s)
  );
}

// ---- counted occurrences: "last 3 fridays", "next 2 weekends", "past 5 working days"
function counted(T: Tok[]): string | null {
  for (let i = 0; i + 2 < T.length; i++) {
    const m = T[i]!;
    if (m.k !== "mod" || !m.v) continue;
    const n = T[i + 1]!;
    const g = T[i + 2]!;
    if (n.k !== "n" || n.o || n.v! < 1 || n.v! > 60) continue;
    const dir = m.v > 0 ? "+" : "-";
    const N = n.v!;
    let items: string[] | null = null;
    let used = 3;
    if (g.k === "w") items = Array.from({ length: N }, (_, q) => `${g.s}${dir}${q + 1}`);
    else if (g.k === "wkds") items = Array.from({ length: N }, (_, q) => [`sa${dir}${q + 1}`, `su${dir}${q + 1}`]).flat();
    else if (g.k === "wkd" || (g.k === "work" && T[i + 3]?.k === "u" && T[i + 3]!.s === "d")) {
      items = Array.from({ length: N }, (_, q) => `${dir}${q + 1}b`);
      if (g.k === "work") used = 4;
    }
    if (!items) continue;
    const rest = [...T.slice(0, i), ...T.slice(i + used)];
    const tm = parseToks(rest);
    if (g.k !== "w" && tm.startsWith("t ") && dir === "+") {
      // "the next 5 weekdays at 7am": a counted recurrence
      const cnt = g.k === "wkds" ? 2 * N : N;
      return `dt R ${g.k === "wkds" ? "w" : "d"}/1 ${g.k === "wkds" ? "sa,su" : WEEKDAY5} n${cnt} ${tm.slice(2)}`;
    }
    return tm.startsWith("t ") ? `dt ${items.join(",")} ${tm.slice(2)}` : `d ${items.join(",")}`;
  }
  return null;
}

// ---- anchored offsets: "3 days before oct 15", "the monday after thanksgiving", "5 business days after oct 1"
function anchored(T: Tok[]): string | null {
  for (let c = 1; c < T.length; c++) {
    const mk = T[c]!;
    const back = mk.k === "before" || (mk.k === "ago" && T[c + 1]?.k === "sep" && T[c + 1]!.s === "to");
    const fwd = mk.k === "after" || (mk.k === "from" && mk.s === "from" && c > 0) || (mk.k === "of" && T[c - 1]?.k === "u" && T[c - 2]?.k === "work");
    if (T.slice(0, c).some((t) => t.k === "every")) continue;
    if (!back && !fwd) continue;
    let a = c + 1 + (mk.k === "ago" ? 1 : 0);
    if (T[a]?.k === "from") a++; // "on from"
    let pi = c - 1;
    let N = 1;
    let unit = "";
    const pv = T[pi]!;
    if (pv.k === "u") {
      unit = pv.s!;
      if (T[pi - 1]?.k === "work") (unit = "b"), pi--;
      const nm = T[pi - 1];
      if (nm && (nm.k === "n" || nm.k === "a") && !nm.o) N = nm.k === "a" ? 1 : nm.v!;
    } else if (pv.k === "work" || (pv.k === "wkd" && false)) continue;
    else if (pv.k === "part") (unit = "d"), (N = 1);
    else if (pv.k === "w") unit = "wd";
    else continue;
    const rest = T.slice(a);
    if (!rest.length || ["rel", "now", "after", "before"].includes(rest[0]!.k)) continue;
    if (rest.some((t) => t.k === "rel")) continue;
    const r = pp(rest);
    const [mode, body] = sp(r);
    if (mode !== "d" || !plain(body) || /^[+-]\d+[dwmy]$/.test(body)) continue;
    const sign = back ? "-" : "+";
    if (unit === "wd") {
      const m = /^(mo|tu|we|th|fr|sa|su)(?:#-?\d@\d\d|[+-]\d+)?$/.exec(body);
      if (!m) continue;
      const ai = WD7.indexOf(m[1]!);
      const ti = WD7.indexOf(pv.s!);
      const diff = back ? (((ai - ti + 7) % 7) || 7) : (((ti - ai + 7) % 7) || 7);
      return `d ${body}~${sign}${diff % 7 === 0 ? `${diff / 7}w` : `${diff}d`}`;
    }
    if (/^M@/.test(body)) return "x";
    return `d ${body}~${sign}${N}${unit}`;
  }
  return null;
}

// ---- business days without an anchor: "next business day", "3 working days from now"
function businessDays(T: Tok[]): string | null {
  if (T.some((t) => ["every", "daily", "weekly"].includes(t.k))) return null;
  for (let i = 0; i + 1 < T.length; i++) {
    if (T[i]!.k !== "work" || !(T[i + 1]!.k === "u" && T[i + 1]!.s === "d")) continue;
    if (T[i - 1]?.k === "n" && T[i - 2]?.k === "sep" && T[i - 3]?.k === "n") return "x";
    const pv = T[i - 1];
    let N = 1;
    let sign = "+";
    if (pv && (pv.k === "n" || pv.k === "a") && !pv.o) N = pv.k === "a" ? 1 : pv.v!;
    else if (pv && pv.k === "mod") sign = pv.v! < 0 ? "-" : "+";
    if (T.slice(i + 2).some((t) => t.k === "ago")) sign = "-";
    else if (pv && pv.k === "n" && T.slice(i + 2).some((t) => t.k === "before")) sign = "-";
    return `d ${sign}${N}b`;
  }
  return null;
}

// ---- windows, rest of a period, quarters
function windows(T: Tok[], s: string): string | null {
  let m: RegExpMatchArray | null;
  if ((m = s.match(/\b(month|year|quarter|week) to date\b|\bytd\b/))) return `d ${m[1] === "year" || s.includes("ytd") ? "Y" : m[1] === "month" ? "M" : m[1] === "week" ? "W" : "Q"}+0>+0d`;
  if ((m = s.match(/\b(rest|remainder|remaining)\b.*?\b(week|month|year|quarter)\b/))) return `d +0d>${m[2] === "year" ? "Y" : m[2] === "month" ? "M" : m[2] === "week" ? "W" : "Q"}+0`;
  if ((m = s.match(/\b(this|current|next|following|last|previous|past) quarter\b/)) && !/\bto date\b/.test(s)) return `d Q${/^(this|current)/.test(m[1]!) ? "+0" : /^(next|following)/.test(m[1]!) ? "+1" : "-1"}`;
  if ((m = s.match(/\bq([1-4])\b/))) return `d Q@${m[1]}`;
  if ((m = s.match(/\b(first|second|third|fourth|1st|2nd|3rd|4th) quarter\b/))) return `d Q@${({ first: 1, second: 2, third: 3, fourth: 4, "1st": 1, "2nd": 2, "3rd": 3, "4th": 4 } as Record<string, number>)[m[1]!]}`;
  if (T.some((t) => ["w", "wkd", "wkds", "every", "daily"].includes(t.k))) return null;
  for (let i = 0; i < T.length; i++) {
    const t = T[i]!;
    if (t.k !== "mod" || !t.v) continue;
    const n = T[i + 1];
    const u = n?.k === "n" ? T[i + 2] : n;
    if (u?.k === "biweekly" && u.s === "fn") return t.v < 0 ? "d -2w>+0d" : "d +0d>+2w";
    if (u?.k !== "u") continue;
    if (n!.k === "n" && !n!.o) return t.v < 0 ? `d -${n!.v}${u.s}>+0d` : `d +0d>+${n!.v}${u.s}`;
    if (t.s === "past" && n!.k === "u") return `d -1${u.s}>+0d`;
    if (n!.k === "u" && t.v > 0 && /\b(over|within|during|throughout|for) the (next|coming|following|upcoming)\b/.test(s)) return `d +0d>+1${u.s}`;
  }
  return null;
}

// ---- recurrences with bounds, month filters and exceptions
const UNITRE = "days?|weeks?|months?|years?|weekends?";
const unitOf = (u: string) => (u.startsWith("day") ? "d" : u.startsWith("month") ? "m" : u.startsWith("year") ? "y" : "w");
function recBounded(s0: string): string | null {
  let t = ` ${s0} `
    .replace(/\bwk ?ends?\b/g, "weekends")
    .replace(/\bwk ?days?\b/g, "weekdays")
    .replace(/\b(?:business|working|biz) days?\b|\bworkdays?\b/g, "weekdays")
    .replace(/\bmon-fri\b/g, "weekdays");
  const hasNth = new RegExp(`\\b${NTHP} +(?:\\w+ +)?${WDRE7}\\b`).test(t);
  if (!hasNth && /\b(?:every|each|the) month\b|\bof (?:the |each |every )?month\b/.test(t) || (t.match(new RegExp(`${MONRE} \\d|\\d(?:st|nd|rd|th)? ${MONRE}`, "g")) ?? []).length >= 2) return null;
  const lim = { u: "", s: "", mf: "", n: 0, any: false };
  const cut = (re: RegExp, f: (m: RegExpMatchArray) => void) => {
    const m = t.match(re);
    if (!m) return false;
    f(m);
    t = t.replace(re, " ");
    return true;
  };
  // exceptions
  let ex: string[] = [];
  let hasEx = false;
  const DL = `(?:weekends?|weekdays?|${WDRE7})`;
  cut(new RegExp(`\\b(?:except(?: for| on)?|but not|but|other than|sans|apart from|excluding|not on|minus)\\s+(?:the |on )?(${DL}(?:\\s*(?:,|and|or|&)\\s*(?:the )?${DL})*)`), (m) => {
    hasEx = true;
    for (const w of m[1]!.split(/\s*(?:,|and|or|&)\s*/)) {
      const x = w.replace(/^the /, "").trim();
      if (/^weekends?/.test(x)) ex.push("sa", "su");
      else if (/^weekdays?/.test(x)) ex.push(...WEEKDAY5.split(","));
      else if (x) ex.push(wdCode(x));
    }
  });
  // year flag for month filters
  const yearly = cut(/\b(?:every|each) year\b/, () => {});
  // rolling windows
  let wk = false;
  const win = (sign: number) => (m: RegExpMatchArray) => {
    const N = amt(m[1]!);
    const u = unitOf(m[2]!);
    if (/^weekend/.test(m[2]!)) {
      wk = true;
      if (sign > 0) lim.n = 2 * N;
      else (lim.u = "+0d"), (lim.s = `-${N}w`);
      return;
    }
    if (sign > 0) (lim.u = `+${N}${u}`), (lim.s = "+0d");
    else (lim.u = "+0d"), (lim.s = `-${N}${u}`);
  };
  const FOR = "(?:(?:for|over|during|in|within|across|throughout) )?(?:the )?";
  if (cut(new RegExp(`\\b${FOR}(?:next|coming|following|upcoming) (${AMT}) (${UNITRE})\\b`), win(1))) lim.any = true;
  else if (cut(new RegExp(`\\b${FOR}(?:past|last|previous) (${AMT}) (${UNITRE})\\b`), win(-1))) lim.any = true;
  else if (hasEx && cut(new RegExp(`\\bfor (${AMT}) (weeks?|months?|days?)\\b`), win(1))) lim.any = true;
  const per = (rel: string, u: string) => `${u === "week" ? "W" : u === "month" ? "M" : u === "quarter" ? "Q" : "Y"}${/^(this|current)/.test(rel) ? "+0" : /^(next|coming|following)/.test(rel) ? "+1" : "-1"}`;
  if (!lim.any && cut(new RegExp(`\\b(?:(?:for|in|during|over|throughout|of) )?(?:the )?(this|current|next|coming|following|last|past|previous) (week|month|quarter|year)\\b`), (m) => {
    const p = per(m[1]!, m[2]!);
    lim.u = `u${p}`;
    lim.s = `s${p}`;
  })) lim.any = true;
  if (!lim.any) {
    if (cut(new RegExp(`\\bsince (?:the )?(${MONRE})(?: (\\d{1,2})(?:st|nd|rd|th)?)?`), (m) => {
      lim.u = "u+0d";
      lim.s = m[2] ? `s${p2(monN(m[1]!))}-${p2(+m[2])}<` : `sM@${p2(monN(m[1]!))}<`;
    })) lim.any = true;
    else if (cut(new RegExp(`\\bsince (\\d{1,2})(?:st|nd|rd|th)? (${MONRE})`), (m) => {
      lim.u = "u+0d";
      lim.s = `s${p2(monN(m[2]!))}-${p2(+m[1]!)}<`;
    })) lim.any = true;
  }
  if (!lim.any && cut(new RegExp(`\\b(?:until|till|through|thru|up to|by|to)\\s+(?:the )?(?:end of )?(?:${"(?:the )?"})?(${MONRE})(?: (\\d{1,2})(?:st|nd|rd|th)?)?(?![. ]*(?:\\d|(?:twenty|thirty|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|[a-z]+teenth)\\b))`), (m) => {
    lim.u = m[2] ? `u${p2(monN(m[1]!))}-${p2(+m[2])}` : `uM@${p2(monN(m[1]!))}`;
  })) lim.any = true;
  if (!lim.any && cut(new RegExp(`\\b(?:until|through|thru|till) (\\d{1,2})(?:st|nd|rd|th)? (${MONRE})`), (m) => {
    lim.u = `u${p2(monN(m[2]!))}-${p2(+m[1]!)}`;
  })) lim.any = true;
  if (cut(new RegExp(`\\b(?:from|starting|beginning|since) (${MONRE})(?: (?:onwards?|on))?(?![. ]*(?:\\d|(?:twenty|thirty|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|[a-z]+teenth)\\b))`), (m) => {
    lim.s = `sM@${p2(monN(m[1]!))}`;
  })) lim.any = true;
  // month filter ("every august") versus one period ("in august")
  const months: string[] = [];
  if (yearly) {
    t = t.replace(new RegExp(`\\b(?:in|during|of)?\\s*(${MONRE})(?: and (${MONRE}))?`, "g"), (m, a, b) => {
      if (!a) return m;
      months.push(`M@${p2(monN(a))}`);
      if (b) months.push(`M@${p2(monN(b))}`);
      return " ";
    });
  } else {
    cut(new RegExp(`\\b(?:every|each) (${MONRE})(?! \\d)`), (m) => {
      months.push(`M@${p2(monN(m[1]!))}`);
    });
  }
  lim.mf = months.join(",");
  if (!lim.any && !months.length && cut(new RegExp(`\\b(?:in|during|throughout|for) (?:the month of )?(${MONRE})(?: (20\\d\\d))?(?! \\d)`), (m) => {
    lim.u = `uM@${p2(monN(m[1]!))}`;
    lim.s = `sM@${p2(monN(m[1]!))}`;
  })) lim.any = true;
  if (!lim.any && !months.length && cut(/\bin (20\d\d)\b/, (m) => {
    lim.u = `u${m[1]}-12-31`;
    lim.s = `s${m[1]}-01-01`;
  })) lim.any = true;
  if (!lim.any && !months.length && hasEx && cut(new RegExp(`^\\s*(${MONRE})\\s`), (m) => {
    lim.u = `uM@${p2(monN(m[1]!))}`;
    lim.s = `sM@${p2(monN(m[1]!))}`;
  })) lim.any = true;
  if (!lim.any && !months.length && !hasEx) return null;
  // days: read from the tokens of what is left, so typos still count
  let days: string[] = [];
  let fq = "w";
  const T2 = scan(t.replace(/\s+/g, " ").trim());
  let plural = false;
  let nd = 0;
  for (const k of T2) {
    if (k.k === "wkd") (days.push(...WEEKDAY5.split(",")), (fq = "d"), (plural = true));
    else if (k.k === "wkds") (days.push("sa", "su"), (plural = true));
    else if (k.k === "w") (days.push(k.s!), nd++, k.pl && (plural = true));
  }
  let interval = 1;
  const IVN: Record<string, number> = { other: 2, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, two: 2, three: 3, four: 4, five: 5, six: 6 };
  const ivm = new RegExp(`\\bevery (other|second|2nd|third|3rd|fourth|4th|two|three|four|five|six|\\d+)(?: (?:weeks?|wks?)\\b| (?=${WDRE7}))`).exec(t);
  if (ivm) interval = IVN[ivm[1]!] ?? +ivm[1]!;
  const nthm = new RegExp(`\\b(${NTHP}(?:(?:,| and|,? and|&|,) +(?:the )?${NTHP})*) +(${WDRE7})\\b`).exec(t);
  let nthDays: string[] = [];
  if (nthm) {
    const wd = wdCode(nthm[2]!);
    nthDays = nthm[1]!.match(new RegExp(NTHP, "g"))!.map((o) => `${wd}#${NTH[o]}`);
  }
  const everyDay = /\b(every ?day|daily|each day|all days|all week|every single day|every other day|each and every day)\b/.test(t);
  const cue = /\b(every|each|all)\b/.test(t);
  if (/\bevery other day\b/.test(t)) interval = 2;
  if (!days.length && (everyDay || hasEx)) (days = [...WD7]), (fq = "d");
  if (nthDays.length && !/\bmonth(?:ly)?\b|\bmonths\b/.test(t)) return null;
  if (nthDays.length) days = [];
  if (!days.length && !nthDays.length) return null;
  if (!nthDays.length && !(plural || cue || everyDay || hasEx || new Set(days).size >= 2)) return null;
  if (!lim.any && !months.length && !hasEx) return null;
  let set = nthDays.length ? nthDays : sortWd(days).filter((d) => !ex.includes(d));
  if (nthDays.length) fq = "m";
  if (hasEx && fq === "w" && days.length === 7) fq = "d";
  if (hasEx && ex.length && fq === "w" && !plural) fq = "d";
  // time
  let time = "";
  const tre = /(?:\bat\s+|\bfrom\s+|@\s*)?(\d{1,2}(?::\d\d)?\s*(?:am|pm|a|p)?\s*(?:-|to|until|till)\s*\d{1,2}(?::\d\d)?\s*(?:am|pm|a|p)?|\d{1,2}(?::\d\d)?\s*(?:am|pm|a|p)\b|\d{1,2}:\d\d|\bat\s+\d{1,2}\b|\bat (?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b(?: ?(?:am|pm))?|\bnoon\b|\bmidnight\b)/;
  const tm = t.match(tre);
  if (tm) {
    const r = parseBase(tm[0] + (/^ in the (?:morning|afternoon|evening|night)/.exec(t.slice(tm.index! + tm[0].length))?.[0] ?? ""));
    if (r.startsWith("t ")) time = r.slice(2);
  }
  const f = fq === "d" && interval === 2 && /\bevery other day\b/.test(t) ? "d/2" : `${fq}/${fq === "w" ? interval : 1}`;
  const parts = ["R", f];
  if (!(set.length === 7 && !hasEx)) parts.push(set.join(","));
  if (lim.mf) parts.push(lim.mf);
  if (lim.n) parts.push(`n${lim.n}`);
  const u = lim.u.startsWith("u") ? lim.u : lim.u ? `u${lim.u}` : "";
  const st = lim.s.startsWith("s") ? lim.s : lim.s ? `s${lim.s}` : "";
  if (u) parts.push(u);
  if (time) parts.push(time);
  if (st) parts.push(st);
  void wk;
  return `${time ? "dt" : "d"} ${parts.join(" ")}`;
}

// ---- date lists: "oct 2, oct 9 and oct 16", "the 1st and 15th", "dec 1, 8 and 15"
function dateList(T: Tok[]): string | null {
  if (T.some((t) => t.k === "between")) return null;
  type El = { s: string };
  let best: { els: string[]; end: number; start: number } | null = null;
  for (let i = 0; i < T.length; i++) {
    const els: string[] = [];
    let mo = 0;
    let j = i;
    let first = true;
    const dom = (x: Tok) => x.k === "n" && x.v! >= 1 && x.v! <= 31 && (x.len ?? 9) <= 2 && !x.w;
    while (j < T.length) {
      const t = T[j]!;
      const sep = !first && (t.k === "and" || t.cm);
      let q = j;
      if (!first && t.k === "and") q++;
      else if (!first && !t.cm) break;
      const e = T[q]!;
      if (!e) break;
      if (e.k === "D" && !e.s!.startsWith("0000")) {
        els.push(e.s!);
        const mm = /^(?:\d{4}-)?(\d\d)-/.exec(e.s!);
        if (mm) mo = +mm[1]!;
        j = q + 1;
      } else if (e.k === "m" && !e.p && T[q + 1] && dom(T[q + 1]!) && !(T[q + 2]?.k === "mer") && !(T[q + 2]?.k === "t")) {
        mo = e.v!;
        els.push(`${p2(mo)}-${p2(T[q + 1]!.v!)}`);
        j = q + 2;
      } else if (!first && mo && dom(e) && !T[q + 1]?.k.match(/^(mer|t|u|sep)$/) && (sep || e.o || t.cm)) {
        els.push(`${p2(mo)}-${p2(e.v!)}`);
        j = q + 1;
      } else if (!first && !mo && e.k === "n" && e.o && dom(e)) {
        els.push(`D@${p2(e.v!)}`);
        j = q + 1;
      } else if (first && e.k === "n" && e.o && dom(e) && (e.the || e.po) && !T.some((x) => x.k === "m")) {
        els.push(`D@${p2(e.v!)}`);
        j = q + 1;
      } else break;
      first = false;
    }
    if (els.length >= 2 && (!best || els.length > best.els.length)) best = { els, end: j, start: i };
  }
  if (!best) return null;
  // reject if a range word sits in the run
  if (T.slice(best.start, best.end).some((t) => t.k === "sep")) return null;
  const rest = [...T.slice(0, best.start), ...T.slice(best.end)];
  const r = parseToks(rest);
  void ({} as El);
  return r.startsWith("t ") ? `dt ${best.els.join(",")} ${r.slice(2)}` : `d ${best.els.join(",")}`;
}

// ---- open ranges: "after 2pm", "before noon", "until friday", "from monday on", "since monday", "by 9pm"
function openRange(T: Tok[], s: string): string | null {
  const recCue = T.some((t) => ["every", "daily", "weekly", "monthly", "wkd", "wkds"].includes(t.k));
  for (let c = 0; c < T.length; c++) {
    const k = T[c]!;
    const isUntil = k.k === "before" || (k.k === "sep" && k.s === "until");
    const isFrom =
      k.k === "after" ||
      k.k === "since" ||
      (k.k === "from" && k.s === "from" && /\b(on|onwards?|forward)\b/.test(s) && !/\b(to|until|till|through|thru)\b/.test(s)) ||
      (k.k === "from" && k.s === "start" && /\b(starting|beginning)\b/.test(s) && !recCue && !T.slice(c).some((t) => t.k === "sep" && t.s !== "to"));
    if (!isUntil && !isFrom) continue;
    const nx = T[c + 1];
    if (!nx || ["?", "work", "skip", "u", "part", "now", "after", "before"].includes(nx.k)) continue;
    if (nx.k === "n" && !nx.o && T[c + 2]?.k === "?" && k.k !== "from") continue;
    if (k.k === "from" && k.s === "from" && T.slice(c + 1).some((t) => t.pl)) return null;
    const pv = T[c - 1];
    if (pv && (pv.k === "u" || pv.k === "w" || pv.k === "part" || pv.k === "hence" || pv.k === "ago")) continue;
    const pre = T.slice(0, c);
    const rest = T.slice(c + 1).map((t) => (t.pl ? { ...t, pl: false } : t));
    let r = pp(rest);
    let [mode, body] = sp(r);
    // a bare hour right after "from ... on", "before 5"
    if ((mode === "x" || mode === "d") && nx.k === "n" && !nx.o && nx.v! >= 1 && nx.v! <= 12 && (nx.len ?? 9) <= 2 && !["m", "u", "mer", "t"].includes(T[c + 2]?.k ?? "")) (mode = "t"), (body = `${nx.v}?`);
    const em = s.match(/\bend of (?:the |this )?(month|week|year)\b/);
    if (em) (mode = "d"), (body = `${em[1] === "month" ? "M" : em[1] === "week" ? "W" : "Y"}+0`);
    if (!plain(body) && !/^[WMY]\+0$/.test(body)) continue;
    if (mode === "x") continue;
    if (k.s === "by" && mode === "t" && /^\d{1,2}(:\d\d)?\?$/.test(body) && !rest.some((t) => t.k === "mer" || t.k === "t" || t.k === "noon")) continue;
    if (isUntil && body.endsWith("?") && pre.some((t) => t.k === "m" || t.k === "D") && rest.length === 1 && rest[0]!.k === "n") return null;
    let head = "";
    const pr = pre.length ? pp(pre) : "x";
    if (pr !== "x") {
      const [pm, pb] = sp(pr);
      if (pm === "d" && plain(pb) && mode === "t") (head = `${pb} `), (mode = "dt");
      else return null;
    }
    if (k.k === "since") {
      if (/^(mo|tu|we|th|fr|sa|su)$/.test(body)) return `d ${body}<>`;
      return `${mode} ${head}${body}>`;
    }
    return isUntil ? (head ? `dt >${head}${body}` : `${mode} >${body}`) : `${mode} ${head}${body}>`;
  }
  return null;
}

// ---- durations: "3pm for 2 hours", "9am (45 min)", "tomorrow 9am for 90 minutes"
function duration(s0: string): string | null {
  const s = s0.replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[ -](one|two|three|four|five|six|seven|eight|nine)\b/g, (_, a, b) => String(({ twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 } as Record<string, number>)[a]! + ({ one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 } as Record<string, number>)[b]!));
  const W = AMT.replace("\\d+|", "");
  const re = new RegExp(`(?:\\b(?:for|lasting|lasts?|takes?|taking|runs?|running)\\s+(?:like |about |around |roughly )?(?:an? )?|\\()?\\b(an hour and a half|half an hour|half hour|an hour|(?:(\\d+(?:\\.\\d+)?|${W})\\s*(?:hours?|hrs?)\\b|(\\d+(?:\\.\\d+)?)\\s*h\\b)(?:\\s*(?:and\\s*)?(\\d+)\\s*(?:minutes?|mins?|m)\\b)?|(?:(\\d+|${W})\\s*(?:minutes?|mins?)\\b|(\\d+)\\s*m\\b))\\)?`);
  const m = s.match(re);
  if (!m) return null;
  const before = s.slice(0, m.index);
  const after = s.slice(m.index! + m[0].length);
  if (/\b(in|within|after|every|past|last|next|over)\s*$/.test(before) || /^\s*(ago|from now|later|before|after|of)\b/.test(after)) return null;
  let tok: string;
  const g = m[1]!;
  if (g === "an hour and a half") tok = "+90m";
  else if (g === "half an hour" || g === "half hour") tok = "+30m";
  else if (g === "an hour") tok = "+1h";
  else if (m[2] || m[3]) {
    const w = (m[2] ?? m[3])!;
    const h = /^\d/.test(w) ? +w : amt(w);
    if (m[4]) tok = `+${Math.round(h * 60 + +m[4])}m`;
    else if (!Number.isInteger(h)) tok = `+${Math.round(h * 60)}m`;
    else tok = `+${h}h`;
  } else tok = `+${/^\d/.test((m[5] ?? m[6])!) ? (m[5] ?? m[6]) : amt((m[5] ?? m[6])!)}m`;
  const n = +tok.slice(1, -1);
  if ((tok.endsWith("h") && (n < 1 || n > 48)) || (tok.endsWith("m") && (n < 1 || n > 1440))) return null;
  if (!/\b(?:for|lasting|lasts?|takes?|taking|runs?|running)\s+(?:like |about |around |roughly )?(?:an? )?$|\($/.test(before) && !/(?:\d|am|pm|noon|midnight|[ap]\.?m\.?|o\'?clock|ish)\s*$/.test(before.trim() + " ") && !/\b(?:for|lasting|lasts?|takes?|taking|runs?|running)\b/.test(m[0])) return null;
  const rem = (before + " " + after).replace(/\s+/g, " ").trim();
  let r = pp(scan(rem));
  if (r === "x") {
    const hm = rem.match(/\b(1[0-2]|[1-9])\b(?![:.]\d)/);
    if (hm) r = `t ${hm[1]}?`;
  }
  const [mode, body] = sp(r);
  if (mode === "x" || body.includes(">") || /,/.test(body)) return null;
  if (body.startsWith("R ")) {
    const parts = body.split(" ");
    const ti = parts.findIndex((x, j) => j > 1 && /^\d{1,2}(:\d\d)?\??$|^\d\d:\d\d$/.test(x));
    if (ti < 0) return null;
    parts[ti] = parts[ti] + ">" + tok;
    return `${mode} ${parts.join(" ")}`;
  }
  if (mode === "d") return null;
  return `${mode} ${body}>${tok}`;
}

// ---- weekday lists without a recurrence cue: "mon wed fri", "sat and sun", "m t w th"
const NTH: Record<string, number> = { first: 1, "1st": 1, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, fifth: 5, "5th": 5, last: -1 };
const NTHP = "(?:first|second|third|fourth|fifth|last|[1-5](?:st|nd|rd|th))";

/** "1st and 3rd fridays", "last friday of every month at 5pm" -> monthly nth-weekday recurrence. */
function nthRec(s: string): string | null {
  const m = new RegExp(`\\b(?:the |every |each )?(${NTHP}(?:(?:,| and|,? and|&|,) +(?:the )?${NTHP})*) +(mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat|sun)[a-z]*\\b`).exec(s);
  if (!m) return null;
  const wd = WD7.find((w) => m[2]!.startsWith(w === "mo" ? "mon" : w === "tu" ? "tue" : w === "we" ? "wed" : w === "th" ? "thu" : w === "fr" ? "fri" : w === "sa" ? "sat" : "sun"));
  if (!wd) return null;
  const ords = m[1]!.match(new RegExp(NTHP, "g"))!.map((o) => NTH[o]!);
  const monthly = /\b(?:every|each) month\b|\bmonthly\b|\bof the month\b/.test(s) || (ords.length > 1 && /\b\w+s\b/.test(m[0]));
  if (!monthly) return null;
  if (/\b(until|till|through|since|from|for the|in |times?|x\d|start\w*|begin\w*|stsrt\w*|end(?:ing|s)?)\b|\d+\/\d+/.test(s)) return null;
  const rest = (s.slice(0, m.index) + " " + s.slice(m.index + m[0].length)).replace(/\b(of|every|each|month|monthly|the)\b/g, " ").replace(/\s+/g, " ").trim();
  const days = ords.map((o) => `${wd}#${o}`).join(",");
  if (!rest) return `d R m/1 ${days}`;
  const r = parseToks(scan(rest));
  const [rm, rb] = sp(r);
  return rm === "t" ? `dt R m/1 ${days} ${rb}` : null;
}

function weekdayList(T: Tok[], sRaw: string): string | null {
  const wd = T.filter((t) => t.k === "w" && !t.p).map((t) => t.s!);
  if (new Set(wd).size < 2) return null;
  if (T.some((t) => ["every", "daily", "weekly", "wkd", "wkds", "m", "D", "rel", "mod", "u", "sep", "other", "monthly"].includes(t.k))) return null;
  const rest = T.filter((t) => !(t.k === "w" || t.k === "and" || t.k === "skip"));
  const r = rest.length ? parseToks(rest) : "x";
  const days = sortWd(wd).join(",");
  const style = compactStyle || (/[a-z]\s*[\/+]\s*(mon|tue|wed|thu|fri|sat|sun)/.test(sRaw) ? "slash" : "");
  const hasMer = rest.some((t) => t.k === "mer");
  const rec = (style === "compact" && (wd.length >= 3 || rest.length > 0)) || (style === "slash" && (wd.length >= 3 || rest.length > 0)) || (style === "spaced" && hasMer) || (T.some((t) => t.k === "w" && t.pl) && false);
  if (rec) return null;
  if (r.startsWith("t ")) return rec ? `dt R w/1 ${days} ${r.slice(2)}` : `dt ${days} ${r.slice(2)}`;
  if (rest.length && r !== "x") return null;
  if (rest.some((t) => t.k === "?")) return null;
  return rec ? `d R w/1 ${days}` : `d ${days}`;
}

/** The whole parser: v2 families first, then the base grammar. */
export function parseFull(text: string, today?: string): string {
  refToday = today ?? "2026-11-03";
  const s1 = expandCompact(norm(text))
    .replace(/\bb4\b/g, "before")
    .replace(/\bno later than\b|\bnot later than\b|\bnot after\b/g, "before")
    .replace(/\b(no earlier than|not before|no sooner than|not until|earliest(?: is| would be)?)\b/g, "after")
    .replace(/\bno later (?:than|then)\b/g, "before")
    .replace(/\bend of (?:the )?(?:day|business)\b|\bend of business day\b/g, " ")
    .replace(/\b(anytime|any time|sometime|some time)\b/g, " ");
  if (/^(?:from |on )?(?:the )?(?:first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|[a-z]+teenth|twenty[ -]?[a-z]*|thirty[ -]?[a-z]*) ?of(?: [a-z]{1,2})?[!.?]*$/.test(s1.trim()) || /^(?:from |on )?(?:the )?\d{1,2}(?:st|nd|rd|th) ?of(?: [a-z]{1,2})?[!.?]*$/.test(s1.trim())) return "x";
  const my = /^(?:in )?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.? (\d{4})$/.exec(s1.trim());
  if (my && +my[2]! >= 1900) {
    const mo = monN(my[1]!);
    return `d ${my[2]}-${p2(mo)}-01>${my[2]}-${p2(mo)}-${p2(dim(+my[2]!, mo))}`;
  }
  const T = scan(s1);
  if (scanBad) return "x";
  if (unsupported(s1)) return "x";
  const hs: (() => string | null)[] = [
    () => nthRec(s1),
    () => counted(T),
    () => recBounded(s1),
    () => anchored(T),
    () => businessDays(T),
    () => windows(T, s1),
    () => dateList(T),
    () => duration(s1),
    () => openRange(T, s1),
    () => weekdayList(T, s1),
  ];
  for (const h of hs) {
    const r = h();
    if (r) return r;
  }
  const T3 = T.filter((t) => t.k !== "rest");
  const base = domOf(T3) ? pp(T3) : parseToks(T3);
  const wi = T3.findIndex((t, i) => t.k === "w" && !t.p && T3[i + 1]?.k === "sep" && T3[i + 2]?.k === "w" && !T3[i + 2]!.p && t.s !== T3[i + 2]!.s);
  if (wi >= 0 && T3.some((t) => ["n", "t", "noon", "mid", "mer"].includes(t.k)) && !T3.some((t, i) => t.k === "m" || t.k === "D" || (t.k === "w" && i !== wi && i !== wi + 2))) {
    const a0 = WD7.indexOf(T3[wi]!.s!);
    const b0 = WD7.indexOf(T3[wi + 2]!.s!);
    const days = a0 <= b0 ? WD7.slice(a0, b0 + 1) : [...WD7.slice(a0), ...WD7.slice(0, b0 + 1)];
    if (days.join() === WEEKDAY5) {
      const T4 = [...T3.slice(0, wi), { k: "wkd" } as Tok, ...T3.slice(wi + 3)];
      const r4 = parseToks(T4);
      if (r4.startsWith("dt R")) return r4;
    }
    const r = parseToks(T3.filter((_, i) => i < wi || i > wi + 2));
    const [rm, rb] = sp(r);
    if (rm === "t") return `dt R ${days.join() === WEEKDAY5 ? "d" : "w"}/1 ${days.join(",")} ${rb}`;
  }
  return base;
}

export const heuristicFull6 = makeEngine("heuristic-full-6", parseFull);
export default heuristicFull6;
