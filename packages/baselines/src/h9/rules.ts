// h9 rules that run in front of h8 (specs/engines/h9.md). Each rule returns a DSL line or null.
import { relMonth } from "../h8/relmonth";

type P = (s: string) => string;

const WDC: Record<string, string> = { mon: "mo", tue: "tu", wed: "we", thu: "th", fri: "fr", sat: "sa", sun: "su" };
const WD = "(?:mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?|sun)(?:day)?";
const SIMPLE_REST = /^(?:at |@ )?(?:\d{1,2}(?::\d\d)?\s?(?:[ap]\.?m\.?)?|noon|midnight)$/;
const wd = (w: string) => WDC[w.slice(0, 3)]!;
const ORDK: Record<string, number> = { last: -1, first: 1, "1st": 1, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, fifth: 5, "5th": 5 };
Object.assign(ORDK, { final: -1, secnd: 2, thrid: 3, frist: 1, fisrt: 1, forth: 4 });
const ORDS = Object.keys(ORDK).join("|");
const MP = "(?:the|this|current) month|next month|last month|previous month";
const mrel = (m: string) => (/^next/.test(m) ? "+1" : /^(last|previous)/.test(m) ? "-1" : "+0");
const WDS = "mo,tu,we,th,fr,sa,su".split(",");
const WORDNUM = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
const TENS: Record<string, number> = { twenty: 20, thirty: 30, forty: 40, fifty: 50 };

const isT = (x: string) => /^(?:\d{1,2}(?::\d\d)?\?|\d\d:\d\d)(?:>.*)?$/.test(x);
const isSBound = (x: string) => /^s(?:\d{2}-|\d{4}-|[+-]\d|[WMYQD]|[a-z]{2}[+-<])/.test(x);
/** One-day DSL date (no range, list or recurrence). */
const oneDay = (d: string): string | null => {
  const m = /^d (\S+)$/.exec(d);
  return m && !/[>,]|^R$/.test(m[1]!) ? m[1]! : null;
};

/** Add a time from the rest of the text: `t X` -> `dt <date> X`. */
function withTime(date: string, rest: string | undefined, p: P): string | null {
  const r = (rest ?? "").trim();
  if (!r) return `d ${date}`;
  const m = /^t (\S+)$/.exec(p(r));
  return m ? `dt ${date} ${m[1]}` : null;
}

const HOL: Record<string, string> = {
  "bastille day": "07-14", "australia day": "01-26", "guy fawkes night": "11-05", "bonfire night": "11-05", "armistice day": "11-11",
  "remembrance day": "11-11", "st davids day": "03-01", "st stephens day": "12-26", "national day of germany": "10-03", "german unity day": "10-03",
  "anzac day": "04-25", "st georges day": "04-23", "burns night": "01-25", "pearl harbor day": "12-07", "may day": "05-01", "leap day": "02-29",
  "pi day": "03-14", "tau day": "06-28", "star wars day": "05-04", "dia de los muertos": "11-02", "st andrews day": "11-30",
};
const HOLRE = new RegExp(`^(?:(?:on|the|next) )*(${Object.keys(HOL).join("|")})(?:,? (?:at )?(.+))?$`);
/** Fixed phrases: named dates, leap day, Friday the 13th. With `p`, holidays may carry a time. */
export function named(s: string, p?: P): string | null {
  let m: RegExpExecArray | null;
  if (p && (m = HOLRE.exec(s.replace(/['\u2019]/g, "")))) return withTime(HOL[m[1]!]!, m[2], p);
  if ((m = /^(?:the )?ides? of (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*$/.exec(s))) {
    const i = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ").indexOf(m[1]!) + 1;
    return `d ${String(i).padStart(2, "0")}-${[3, 5, 7, 10].includes(i) ? 15 : 13}`;
  }
  if (!p && /^(?:on )?(?:the )?(?:next )?pi day$/.test(s)) return "d 03-14";
  if (!p && /^(?:on )?(?:the )?(?:next )?leap (?:day|year day)$/.test(s)) return "d 02-29";
  if ((m = new RegExp(`^(?:(?:on|the) )?(?:next )?friday the (?:13th|thirteenth)$`).exec(s))) return "d fr&D13";
  return null;
}

/** Nth or last weekday (or business day) of this, next or last month: `fr#-1@M+0`, `b#-1@M+0`. */
export function nthOfMonth(s: string, p: P): string | null {
  let m = new RegExp(`^(?:(?:on|for|by) )?(?:the )?(${ORDS}) (${WD}) (?:of|in) (${MP})(?:,? (.+))?$`).exec(s);
  if (m) {
    if (m[4] && !SIMPLE_REST.test(m[4])) return null;
    return withTime(`${wd(m[2]!)}#${ORDK[m[1]!]}@M${mrel(m[3]!)}`, m[4], p);
  }
  m = new RegExp(`^(?:(?:on|for|by) )?(?:the )?(${ORDS}) (?:week ?day|business day|working day|work ?day) (?:of|in) (${MP})(?:,? (.+))?$`).exec(s);
  if (m && [-1, 1].includes(ORDK[m[1]!]!) && (!m[3] || SIMPLE_REST.test(m[3]))) return withTime(`b#${ORDK[m[1]!]}@M${mrel(m[2]!)}`, m[3], p);
  return null;
}

/** `every last friday` -> monthly last weekday. */
export function everyLast(s: string, p: P): string | null {
  const m = new RegExp(`^every last (${WD})s?\\b(.*)$`).exec(s);
  if (!m) return null;
  const r = p(`every first ${m[1]}${m[2]}`);
  const tok = `${wd(m[1]!)}#1`;
  return r.includes(tok) ? r.replace(tok, `${wd(m[1]!)}#-1`) : null;
}

const CONN = "(?:to|until|till|through|thru|-|–)";
/** `the first of next month until the 15th` -> both ends in the same relative month. */
export function relMonthRange(s: string): string | null {
  const m = new RegExp(`^(.+?) ${CONN} (?:the )?(\\d{1,2})(?:st|nd|rd|th)?(?: of (?:that|the same) month)?$`).exec(s);
  if (!m) return null;
  const l = relMonth(m[1]!);
  if (!l || l.rest) return null;
  const end = +m[2]!;
  const start = +/^D(\d+)/.exec(l.tok)![1]!;
  if (end < 1 || end > 31 || end <= start) return null;
  return `d ${l.tok}>${l.tok.replace(/^D\d+/, "D" + String(end).padStart(2, "0"))}`;
}

/** `this weekend through monday` -> `sa>mo`. */
export function weekendThrough(s: string, p: P): string | null {
  const m = new RegExp(`^(.+?) ${CONN} (?:the )?(?:following |next )?(${WD})$`).exec(s);
  if (!m) return null;
  const f = new RegExp(`^(${WD}) ${CONN} (?:the )?following (${WD})$`).exec(s);
  if (f) return `d ${wd(f[1]!)}>${wd(f[2]!)}`;
  const l = /^d (sa|fr|th|we|tu|mo|su)>(sa|fr|th|we|tu|mo|su)$/.exec(p(m[1]!));
  return l && /weekend/.test(m[1]!) ? `d ${l[1]}>${wd(m[2]!)}` : null;
}

/** Recurrence phrase `from A to B`: add both bounds. */
export function boundedRec(s: string, p: P): string | null {
  const m = /^(.+?) (?:from|between|beginning|starting|starting on|starting from) (.+?) (?:to|until|till|through|thru|and|-|–) (.+)$/.exec(s);
  if (!m) return null;
  const pre = p(m[1]!.replace(/\b(?:business|working|work) days?\b/, "weekdays"));
  if (!/^(?:d|dt) R /.test(pre)) return null;
  const t = pre.split(" ");
  if (t.some((x) => /^u/.test(x) || isSBound(x))) return null;
  const a = new RegExp(`^(?:this |next |last )?${WD}$`).test(m[2]!) ? null : oneDay(p(m[2]!));
  const b = oneDay(p(m[3]!));
  if (!a || !b) return null;
  const ti = t.findIndex((x, i) => i > 2 && isT(x));
  t.splice(ti < 0 ? t.length : ti, 0, `u${b}`);
  t.push(`s${a}`);
  return t.join(" ");
}

/** `weekdays but skip friday`, `every day except sundays`, `all week but sunday`. */
export function exclusion(s: string): string | null {
  const m = new RegExp(`^(every ?day|everyday|daily|every weekday|weekdays?|all week|every week|each day|all days) (?:but|except|besides|apart from|excluding|other than|minus|without)(?: for)? (?:skip )?((?:(?:${WD}|weekends?)s?(?:,? ?(?:and |or |&)? ?)?)+)$`).exec(s);
  if (!m) return null;
  const base = /weekday/.test(m[1]!) ? WDS.slice(0, 5) : [...WDS];
  const drop = new Set<string>();
  for (const w of m[2]!.matchAll(new RegExp(`${WD}|weekends?`, "g"))) /^weekend/.test(w[0]) ? (drop.add("sa"), drop.add("su")) : drop.add(wd(w[0]));
  const days = base.filter((d) => !drop.has(d));
  if (!days.length || days.length === base.length) return null;
  return `d R d/1 ${days.join(",")}${/^all week$/.test(m[1]!) ? " uW+0 sW+0" : ""}`;
}

/** `twenty-eight minutes to seven` -> `6:32`. */
export function minutesTo(s: string): string {
  const num = "(?:\\d{1,2}|(?:twenty|thirty|forty|fifty)(?:[- ](?:one|two|three|four|five|six|seven|eight|nine))?|" + WORDNUM.slice(1).join("|") + ")";
  const re = new RegExp(`\\b(${num}) (minutes?|mins?) (to|before|of|past|after) (\\d{1,2}|${WORDNUM.slice(1, 13).join("|")})\\b(?! ?(?:[ap]m|:))`);
  return s.replace(re, (all, n: string, _u, dir: string, h: string) => {
    const [t, o] = n.split(/[- ]/);
    const mins = /^\d+$/.test(n) ? +n : (TENS[t!] ?? WORDNUM.indexOf(t!)) + (o ? WORDNUM.indexOf(o) : 0);
    let hr = /^\d+$/.test(h) ? +h : WORDNUM.indexOf(h);
    if (mins < 1 || mins > 59 || hr < 1 || hr > 12) return all;
    if (/^(to|before|of)$/.test(dir)) return `${hr === 1 ? 12 : hr - 1}:${String(60 - mins).padStart(2, "0")}`;
    return `${hr}:${String(mins).padStart(2, "0")}`;
  });
}

// Two dated points joined by a cue word that h7 does not read as a range ("arrival ..., departure ...").
const CUE = /^(.+?)[,;]? (?:and )?(?:ends?|end date|departure|departs?|dropoff|drop-off|drop off|check-?out|returns?|return date|finish(?:es)?) (?:on |is )?(.+)$/;
const FULL = /^(d|dt) (\d{4}-)?(\d\d-\d\d)(?: (\S+))?$/;
export function cueRange(s: string, p: P): string | null {
  const m = CUE.exec(s);
  if (!m) return null;
  const a = FULL.exec(p(m[1]!));
  const b = FULL.exec(p(m[2]!));
  if (!a || !b || a[1] !== b[1]) return null;
  const yl = a[2] ?? b[2] ?? "";
  const yr = b[2] ?? (a[2] && b[3]! >= a[3]! ? a[2] : "");
  return `${a[1]} ${yl}${a[3]}${a[4] ? " " + a[4] : ""}>${yr}${b[3]}${b[4] ? " " + b[4] : ""}`;
}

/** `d 2027-01-03>01-10` -> `d 2027-01-03>2027-01-10` when the end is not before the start. */
export function sameYear(r: string): string {
  const m = /^(d|dt) (\d{4})-(\d\d-\d\d)( \d\d:\d\d)?>(\d\d-\d\d)( \d\d:\d\d)?$/.exec(r);
  return m && m[1] === "d" && m[5]! >= m[3]! ? `${m[1]} ${m[2]}-${m[3]}${m[4] ?? ""}>${m[2]}-${m[5]}${m[6] ?? ""}` : r;
}

/** Clean-up in front of everything: tags, codes, reference words that carry no date. */
export function clean(s: string): string {
  let r = s;
  if (/[@#]/.test(r)) r = r.replace(/(?<![\w])[@#][a-z][\w-]*/g, (w) => (/^@(?:every|each|daily|weekly|monthly|today|tomorrow|tmrw|tonight|yesterday|next|last|this|mon|tue|wed|thu|fri|sat|sun|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|noon|midnight)/.test(w) ? w.slice(1) : "")).replace(/\bp[1-4]\b/g, "");
  r = r.replace(/^@/, "").replace(/(?<=\s)@(?=\w)/g, "");
  r = r.replace(/(?<![-\w.\/:])(?!at\d)[a-hj-pr-wyz]{1,2}\d{2,4}(?=\s|$)/g, (w) => (/^(?:th|st|nd|rd)\d/.test(w) ? w : ""));
  r = r.replace(/(?<!the )\b(?:morning|afternoon|evening|night) of (?=\S)/g, "");
  r = r.replace(/\b(?:isbn|form(?= \d{3,})|invoice|ticket|room|suite|apt|unit|flight|boxe?s?|gate|route|highway|hwy|exit|chapter|pages?|section|terminal|building|bldg|rm|ste|bus|channel|platform|track) #?[a-z]?\d[\d.-]*(?: (?:through|to|-) \d+)?\b/g, "");
  r = r.replace(/\b\d+(?:st|nd|rd|th) (?:grade|floor|roundabout|row|street|avenue|ave|exit|inning|gear|generation|edition|amendment)\b/g, "");
  r = r.replace(/(?<![:.\d])\b(?:\d+ x \d+|\d+x\d+)\b/g, "");
  r = r.replace(/^(\d{1,2}) for (\d{1,2})(?! ?(?:min|hour|hr|day|week|month|sec|h\b|m\b))\b/, "");
  // "4-10 at 13:45": month-day followed by a time
  r = r.replace(/^(\d{1,2})-(\d{1,2})(?= (?:at )?(?:\d{1,2}:\d\d|\d{1,2} ?[ap]\.?m\b|\d{1,2}$))/, (all, a: string, b: string) => (+a <= 12 && +b >= 1 && +b <= 31 ? `${a}/${b}` : all));
  // "1-12 to jan 17": month-day start of a date range
  r = r.replace(/^(\d{1,2})-(\d{1,2})(?= (?:to|until|through|till|-|–) (?:the )?(?:\d{1,2}(?:st|nd|rd|th)?\/|\d{1,2}-\d{1,2}\b|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|\d{1,2}(?:st|nd|rd|th)? (?:of )?(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)))/, (all, a: string, b: string) => (+a <= 12 && +b >= 1 && +b <= 31 ? `${a}/${b}` : all));
  return r.replace(/\s+/g, " ").trim();
}

const HW = WORDNUM.slice(1, 13);
const HALIAS: Record<string, string> = { nien: "nine", nnie: "nine", nin: "nine", fiev: "five", fvie: "five", thre: "three", thee: "three", tweleve: "twelve", twleve: "twelve" };
const near = (a: string, b: string): boolean => {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  const [x, y] = [a.slice(i), b.slice(i)];
  return x.slice(1) === y.slice(1) || x.slice(1) === y || x === y.slice(1) || (x.length > 1 && x[0] === y[1] && x[1] === y[0] && x.slice(2) === y.slice(2));
};

/** A lone hour word ("three", "nine oclock", "nien") is a time with unknown meridiem: `t 3?`. */
export function loneHour(s: string): string | null {
  const m = /^([a-z]+)(?: o'?clock)?$/.exec(s);
  if (!m) return null;
  const w = HALIAS[m[1]!] ?? m[1]!;
  if (/th$/.test(w)) return null;
  const i = HW.findIndex((h) => h === w || (h.length >= 5 && w.length >= 4 && near(w, h)));
  return i < 0 ? null : `t ${i + 1}?`;
}

/** Small recurrence and range forms h8 misses. */
export function misc(s: string, p: P): string | null {
  let m: RegExpExecArray | null;
  // "every 2 fridays" = every other friday
  if ((m = new RegExp(`^(?:every|each) (\\d+|two|three|four) (${WD})s(?: (.+))?$`).exec(s))) {
    const n = /^\d+$/.test(m[1]!) ? +m[1]! : WORDNUM.indexOf(m[1]!);
    if (n >= 2 && n <= 12) {
      const r = p(`every ${n} weeks on ${m[2]}${m[3] ? " " + m[3] : ""}`);
      if (r.startsWith("d R") || r.startsWith("dt R")) return r;
    }
  }
  // a recurrence typed up to a dangling "on" is incomplete
  if (/^every (?:\d+|two|three|four|five|six) (?:days?|weeks?|months?|years?) on(?: the)?$/.test(s)) return "x";
  // "monday to saturdays"
  if ((m = new RegExp(`^(${WD})s? ${CONN} (${WD})s$`).exec(s))) return `d ${wd(m[1]!)}>${wd(m[2]!)}`;
  // "jog weekly"
  if ((m = /^(?:[a-z]+ ){1,3}(daily|weekly|monthly|yearly)$/.exec(s)) && p(s) === "x") return `d R ${{ daily: "d", weekly: "w", monthly: "m", yearly: "y" }[m[1]!]}/1`;
  // "2020年12月31日"
  if ((m = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/.exec(s))) return `d ${m[1]}-${m[2]!.padStart(2, "0")}-${m[3]!.padStart(2, "0")}`;
  return null;
}

const ORDW = "first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth".split(" ");
/** Day of month from "5th", "twenty first", "fifth"; null if none. */
function dayOrd(w: string): number | null {
  let m: RegExpExecArray | null;
  if ((m = /^(\d{1,2})(?:st|nd|rd|th)$/.exec(w))) return +m[1]! >= 1 && +m[1]! <= 31 ? +m[1]! : null;
  if (ORDW.includes(w)) return ORDW.indexOf(w) + 1;
  if ((m = /^twenty[- ](first|second|third|fourth|fifth|sixth|seventh|eighth|ninth)$/.exec(w))) return 20 + ORDW.indexOf(m[1]!) + 1;
  return w === "thirtieth" ? 30 : /^thirty[- ]first$/.test(w) ? 31 : null;
}
const DAYW = "(?:\\d{1,2}(?:st|nd|rd|th)|(?:twenty[- ])?(?:first|second|third|fourth|fifth|sixth|seventh|eighth|ninth)|(?:ten|eleven|twelf|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twentie|thirtie)th|thirty[- ]first)";
const dd = (n: number) => String(n).padStart(2, "0");

/** "the next tuesday the 1st", "first sunday that is the 7th", "thursday the 19th this month" -> `tu&D01`. */
export function wdayDom(s: string, p: P): string | null {
  const m = new RegExp(`^(?:the )?(next |nxt |soonest |first |upcoming |coming )?(${WD}) (?:that is |that's |which is |on )?the (${DAYW})( this month)?(?:,? (.+))?$`).exec(s);
  if (!m) return null;
  const day = dayOrd(m[3]!);
  if (!day) return null;
  const q = m[1] || /that|which/.test(s) || m[4];
  if (!q && !(day === 13 && /^friday/.test(m[2]!))) return null;
  const rest = m[5]?.trim();
  if (rest && /^(?:morning|afternoon|evening|night)$/.test(rest)) return `d ${wd(m[2]!)}&D${dd(day)}`;
  return withTime(`${wd(m[2]!)}&D${dd(day)}`, rest, p);
}

const CNT: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, twelve: 12 };
const UN: Record<string, string> = { day: "d", week: "w", month: "m", year: "y", "business day": "b", "working day": "b", weekday: "b" };
/** "3 weeks from tomorrow" -> `+1d~+3w`. Only for tomorrow, yesterday and the day after tomorrow. */
export function chained(s: string): string | null {
  const m = /^(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten|twelve) (days?|weeks?|months?|years?|business days?|working days?|weekdays?) (from|after|before|past|following) (the day after tomorrow|the day before yesterday)$/.exec(s);
  if (!m) return null;
  const n = /^\d+$/.test(m[1]!) ? +m[1]! : CNT[m[1]!]!;
  const a = { tomorrow: "+1d", yesterday: "-1d", "the day after tomorrow": "+2d", "the day before yesterday": "-2d" }[m[4]!]!;
  return `d ${a}~${m[3] === "before" ? "-" : "+"}${n}${UN[m[2]!.replace(/s$/, "")]}`;
}

/** "the week after next" -> `W+2`; "the sunday before last" -> `su-2`. */
export function afterNext(s: string): string | null {
  let m = /^(?:the )?(week|month|year) after next$/.exec(s);
  if (m) return `d ${m[1]![0]!.toUpperCase()}+2`;
  m = new RegExp(`^(?:the )?(${WD}) before last$`).exec(s);
  return m ? `d ${wd(m[1]!)}-2` : null;
}

const PERIOD = "(?:the )?end of (this|the|next) (week|month|year)";
const per = (a: string, b: string) => `${b[0]!.toUpperCase()}${a === "next" ? "+1" : "+0"}`;
/** Ranges whose ends are days of the month or periods. */
export function domRange(s: string, p: P): string | null {
  let m: RegExpExecArray | null;
  if (/\b(?:every|each|daily|weekly|monthly|weekdays?|business|working|weekends?)\b/.test(s)) return null;
  if ((m = new RegExp(`^from (the )?(${DAYW}) ${CONN} (the )?(${DAYW}) of next month$`).exec(s)))
    return `d D${dd(dayOrd(m[2]!)!)}@M+1>D${dd(dayOrd(m[4]!)!)}@M+1`;
  if ((m = new RegExp(`^(?:until|through|thru|till) ${PERIOD}$`).exec(s))) return `d >${per(m[1]!, m[2]!)}`;
  m = new RegExp(`^(?:from )?(.+?) ${CONN} (.+)$`).exec(s);
  if (!m || (!/^from /.test(s) && !new RegExp(`^(?:the )?${DAYW}\\b`).test(s))) return null;
  const side = (x: string): string => {
    const pm = new RegExp(`^${PERIOD}$`).exec(x);
    return pm ? `d ${per(pm[1]!, pm[2]!)}` : /^(?:now|today)$/.test(x) ? "d +0d" : p(x);
  };
  const a = side(m[1]!);
  const b = side(m[2]!);
  if (/[>,]|R/.test(a + b)) return null;
  const A = /^(d|dt) (.+)$/.exec(a);
  const B = /^(d|dt) (.+)$/.exec(b);
  if (!A || !B || /^\d{2,4}-/.test(A[2]!) || /^\d{2,4}-/.test(B[2]!)) return null;
  const key = (x: string) => /^D@|^[WMYQ][+-]\d$/.test(x.split(" ")[0]!);
  if (!key(A[2]!) && !key(B[2]!) && !(A[1] === "dt" && B[1] === "d" && /(?:morning|afternoon|evening|night)$/.test(m[2]!))) return null;
  const at = A[2]!.split(" ");
  const bt = B[2]!.split(" ");
  if (A[1] === "d" && B[1] === "dt") return `dt ${at[0]} ${bt[1]}>${bt[0]}`;
  if (A[1] === "dt" && B[1] === "d") return `dt ${A[2]}>${B[2]}`;
  if (A[1] === "dt" || B[1] === "dt") return null;
  return `d ${A[2]}>${B[2]}`;
}

const RANK = (x: string): number => (/^n\d/.test(x) ? 0 : /^u/.test(x) ? 1 : isT(x) ? 2 : isSBound(x) ? 3 : -1);
/** Insert a token into a recurrence line in canonical order (count, until, time, start). */
function insertTok(line: string, tok: string): string {
  const t = line.split(" ");
  const r = RANK(tok);
  let i = t.length;
  for (let k = 2; k < t.length; k++) if (RANK(t[k]!) > r) { i = k; break; }
  t.splice(i, 0, tok);
  return t.join(" ");
}
const hasTok = (line: string, kind: number) => line.split(" ").slice(2).some((x) => RANK(x) === kind);

/** Recurrence bounds: until the 20th, until the end of the month, for the rest of the week, starting the 5th, N times, counts. */
export function recBounds(s: string, p: P): string | null {
  let m: RegExpExecArray | null;
  const base = (x: string) => p(x.replace(/\b(?:business|working|work) days?\b/, "weekdays"));
  const isRec = (x: string) => /^(?:d|dt) R /.test(x);
  if ((m = new RegExp(`^(.+?) (?:until|through|thru|till|to) (?:the )?(${DAYW})$`).exec(s)) && /\b(?:every|each|weekdays?|business|working|daily)\b/.test(m[1]!)) {
    const pre = base(m[1]!);
    const d = dayOrd(m[2]!);
    if (d && isRec(pre) && !hasTok(pre, 1)) return insertTok(pre, `uD@${dd(d)}`);
  }
  if ((m = new RegExp(`^(.+?) (?:until|through|thru|till|to) ${PERIOD}$`).exec(s))) {
    const pre = base(m[1]!);
    if (isRec(pre)) {
      const tok = per(m[2]!, m[3]!);
      const line = pre.split(" ").filter((x) => !(isSBound(x) && x.slice(1) === tok)).join(" ");
      return hasTok(line, 1) ? null : insertTok(line, `u${tok}`);
    }
  }
  if ((m = /^(.+?) for the rest of the (week|month|year)$/.exec(s))) {
    const pre = base(m[1]!);
    if (isRec(pre)) return insertTok(pre, `u${m[2]![0]!.toUpperCase()}+0`);
  }
  if ((m = new RegExp(`^(.+?),? (?:starting|beginning|starting on|from) the (${DAYW})(?:,? (\\d+|${Object.keys(CNT).join("|")}) times)?$`).exec(s))) {
    const pre = base(m[1]!);
    const d = dayOrd(m[2]!);
    if (d && isRec(pre) && !hasTok(pre, 3)) {
      let r = insertTok(pre, `sD@${dd(d)}`);
      if (m[3] && !hasTok(r, 0)) r = insertTok(r, `n${/^\d+$/.test(m[3]) ? m[3] : CNT[m[3]]}`);
      return r;
    }
  }
  // "every other day for 12 days": the count is occurrences, not days
  if ((m = /^(.+?) for (\d+|a|one|two|three|four|five|six|seven|eight|nine|ten|twelve) (days?|weeks?|months?)$/.exec(s))) {
    const pre = base(m[1]!);
    const rm = /^(?:d|dt) R ([dwm])\/(\d+)(?: (.*))?$/.exec(pre);
    if (rm && !hasTok(pre, 0) && !hasTok(pre, 1)) {
      const N = /^\d+$/.test(m[2]!) ? +m[2]! : CNT[m[2]!]!;
      const k = +rm[2]!;
      const u = m[3]![0]!;
      const nth = /[a-z]{2}#-?\d(?:,[a-z]{2}#-?\d)*/.exec(rm[3] ?? "");
      let n = 0;
      if (u === rm[1] && nth) n = N * nth[0].split(",").length;
      else if (u === rm[1] && k > 1 && /\bevery (?:other|second)\b/.test(s)) n = Math.ceil(N / k);
      else if (u === "w" && rm[1] === "d" && k > 1) n = Math.ceil((N * 7) / k);
      if (n) return insertTok(pre, `n${n}`);
    }
  }
  return null;
}

/** "one week before the 1st of next month" -> `D01@M+1~-1w`. */
export function relAnchor(s: string): string | null {
  const m = /^(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten|twelve) (days?|weeks?|months?|years?) (before|after|from) (.+)$/.exec(s);
  if (!m) return null;
  const r = relMonth(m[4]!);
  if (!r || r.rest) return null;
  const n = /^\d+$/.test(m[1]!) ? +m[1]! : CNT[m[1]!]!;
  return `d ${r.tok}~${m[3] === "before" ? "-" : "+"}${n}${UN[m[2]!.replace(/s$/, "")]}`;
}
