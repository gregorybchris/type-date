// h11 rules that rewrite text (or return a DSL line) in front of h10. Each rule is narrow and takes the lowercased text.
import { parseH10 } from "../h10";

type P = (s: string) => string;
const WD = ["su", "mo", "tu", "we", "th", "fr", "sa"];
const WD_NAME: Record<string, string> = { su: "sunday", mo: "monday", tu: "tuesday", we: "wednesday", th: "thursday", fr: "friday", sa: "saturday" };
const WD_RE = "(?:mon(?:day)?|tue(?:s(?:day)?)?|wed(?:nes(?:day)?|s)?|thu(?:r(?:s(?:day)?)?)?|fri(?:day)?|sat(?:urday)?|sun(?:day)?)";
const MONTH_RE = "(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const wdOf = (w: string): string => {
  const k = w.slice(0, 2);
  return k === "tu" || k === "th" ? k : k === "mo" ? "mo" : k === "we" ? "we" : k === "fr" ? "fr" : k === "sa" ? "sa" : "su";
};

// ---------------------------------------------------------------- weekday codes

const TOKEN: Record<string, string> = {
  m: "mo", t: "tu", w: "we", r: "th", f: "fr", s: "sa", u: "su", th: "th", tu: "tu", mo: "mo", we: "we", fr: "fr", sa: "sa", su: "su",
  mon: "mo", tue: "tu", tues: "tu", wed: "we", weds: "we", thu: "th", thur: "th", thurs: "th", fri: "fr", sat: "sa", sun: "su",
};
const SEP_TOKENS = new RegExp(`^((?:[mtwrfsu]|th|tu|mo|we|fr|sa|su|mon|tues?|weds?|thu(?:rs?)?|fri|sat|sun)(?:\\s*[/+&,]\\s*|\\s+)){1,6}(?:[mtwrfsu]|th|tu|mo|we|fr|sa|su|mon|tues?|weds?|thu(?:rs?)?|fri|sat|sun)(?=\\s|$)`);

/** Split a joined code such as "mwf", "tth", "mtwtf" into weekdays in order, or null. */
function joined(code: string): string[] | null {
  const out: string[] = [];
  for (let i = 0; i < code.length; ) {
    const two = code.slice(i, i + 2);
    let wd: string | undefined;
    if (two === "th" || two === "tu" || two === "sa" || two === "su" || two === "mo" || two === "we" || two === "fr") {
      // "tu"/"su"/"sa" only when the letters cannot be read as single codes in order
      wd = TOKEN[two];
      i += 2;
    } else {
      const c = code[i]!;
      wd = c === "t" ? (out.includes("tu") ? "th" : "tu") : TOKEN[c];
      i += 1;
    }
    if (!wd) return null;
    out.push(wd);
  }
  const idx = out.map((d) => WD.indexOf(d));
  const ok = idx.every((v, i) => i === 0 || (v === 0 ? false : (idx[i - 1] === 0 ? true : v > idx[i - 1]!)));
  return ok && new Set(out).size === out.length ? out : null;
}

const JOINED_OK = /^(?:mwf|mw|wf|mf|mtwtf|mtwrf|mtwr|mtw|tth|mwth|mtth|mtf|mwr|mtwthf|mtwthfs|mtwthfsu|sas?u|sasu|tuth|mowefr)$/;

/** Meeting patterns written as weekday codes at the start of the text: "MWF 10-10:50", "t/th 2pm", "mon wed fri at 7am". */
export function weekdayCodes(s: string, p: P): string | null {
  let m = s.match(/^([a-z]{2,8})(?=\s|$)/);
  let days: string[] | null = null;
  let rest = "";
  if (m && JOINED_OK.test(m[1]!)) {
    days = joined(m[1]!);
    rest = s.slice(m[0].length);
  } else if ((m = s.match(SEP_TOKENS))) {
    const toks = m[0].trim().split(/\s*[/+&,]\s*|\s+/);
    const mapped = toks.map((t) => TOKEN[t]);
    // all tokens must be short codes or abbreviations (not a plain list of full names), with at least two distinct days
    if (mapped.every(Boolean) && new Set(mapped).size >= 2 && toks.every((t) => t.length <= 5) && toks.some((t) => t.length <= 3)) {
      // "mon tue" etc. are weekdays; a lone pair of single words is common speech, so require a separator or 3+ tokens or a short code
      const hasSep = /[/+&,]/.test(m[0]);
      if (hasSep || toks.length >= 3 || toks.some((t) => t.length === 1)) {
        days = [...new Set(mapped as string[])].sort((a, b) => WD.indexOf(a) - WD.indexOf(b));
        rest = s.slice(m[0].length);
      }
    }
  }
  if (!days || days.length < 2 || !rest.trim()) return null;
  const names = days.map((d) => WD_NAME[d]!);
  const head = names.length === 1 ? names[0]! : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  const out = p(`every ${head}${rest ? " " + rest.replace(/^\s*(?:at|@)\s+/, "at ") : ""}`);
  return out;
}

// ---------------------------------------------------------------- weekday of a relative week

const WEEK_MOD = "(next|this|last|coming|upcoming|previous|past)";
const wkN = (m: string) => (m === "next" || m === "coming" || m === "upcoming" ? 1 : m === "this" ? 0 : -1);

/** Calendar for the compatibility check: does the old form (`mo+1`, `fr`, `we-1`) give the same day as `WD@W+n`? */
function legacyForm(wd: string, n: number, today: string | undefined): string | null {
  if (!today) return null;
  const t = Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10));
  const tw = new Date(t).getUTCDay();
  const w = WD.indexOf(wd);
  const inWeek = (w - 0 + 7) % 7; // week starts Sunday
  const target = t + ((n * 7) - tw + inWeek) * 86400000;
  const day = Math.round((target - t) / 86400000);
  if (n === 0) return day >= 0 ? wd : null;
  if (n === 1) {
    // first such weekday strictly after today
    const after = ((w - tw + 6) % 7) + 1;
    return after === day ? `${wd}+1` : null;
  }
  const before = ((tw - w + 6) % 7) + 1;
  return -before === day && n === -1 ? `${wd}-1` : null;
}

export interface Ph {
  add(form: string): string;
}

/** "tuesday of next week", "next week tuesday", "friday this week": the weekday inside a relative week. */
export function weekdayOfWeek(s: string, ph: Ph, today?: string): string {
  if (new RegExp(`${WD_RE}\\b[\\s,/&+]*(?:and\\s+)?${WD_RE}\\s+(?:of\\s+)?${WEEK_MOD}\\s+week|\\b(?:except|but|excluding|besides|without|minus|not|other than)\\s+${WD_RE}`).test(s)) return s;
  const form = (wdw: string, mod: string): string => {
    const wd = wdOf(wdw);
    const n = wkN(mod);
    return ph.add(legacyForm(wd, n, today) ?? `${wd}@W${n >= 0 ? "+" : ""}${n}`);
  };
  // "tuesday to thursday next week": the start is in that week, the end is the bare weekday after it
  s = s.replace(new RegExp(`\\b(${WD_RE})\\s*(?:to|-|\u2013|through|thru|until|till)\\s*(${WD_RE})\\s+(?:of\\s+)?${WEEK_MOD}\\s+week\\b`, "g"), (_m, a: string, b: string, mod: string) => ` ${form(a, mod)} to ${b} `);
  // British "friday week", "monday fortnight", "a week on friday"
  s = s.replace(new RegExp(`\\b(${WD_RE})\\s+(week|fortnight)\\b`, "g"), (_m, wd: string, u: string) => ` ${ph.add(`${wdOf(wd)}~+${u === "week" ? 1 : 2}w`)} `);
  s = s.replace(new RegExp(`\\b(?:a|one)\\s+(week|fortnight)\\s+(?:on|from|next)\\s+(${WD_RE})\\b`, "g"), (_m, u: string, wd: string) => ` ${ph.add(`${wdOf(wd)}~+${u === "week" ? 1 : 2}w`)} `);
  s = s.replace(new RegExp(`\\b(${WD_RE})\\s+(?:of|in|on|during|from)?\\s*${WEEK_MOD}\\s+week\\b`, "g"), (_m, wd: string, mod: string) => ` ${form(wd, mod)} `);
  s = s.replace(new RegExp(`\\b${WEEK_MOD}\\s+week[,']?s?\\s+(?:on\\s+)?(${WD_RE})\\b`, "g"), (_m, mod: string, wd: string) => ` ${form(wd, mod)} `);
  s = s.replace(new RegExp(`\\b${WEEK_MOD}\\s+week\\s+(?:on\\s+)?(${WD_RE})\\b`, "g"), (_m, mod: string, wd: string) => ` ${form(wd, mod)} `);
  return s.replace(/\s+/g, " ").trim();
}

// ---------------------------------------------------------------- small direct rules

/** Bare "N-M" with a valid month and day is a date ("11-03", "3-14", "10-3"). */
export function monthDash(s: string): string | null {
  const m = s.match(/^(\d{1,2})-(\d{1,2})$/);
  if (!m) return null;
  const [mo, d] = [+m[1]!, +m[2]!];
  const max = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mo - 1];
  if (!max || d < 1 || d > max) return null;
  if (mo >= 6 && mo < d && d <= 12) return null; // "6-8", "9-10": an hour range
  return `d ${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** "24/7" is not a date. */
export function notDates(s: string): string | null {
  if (/^24\s*[/x]\s*7$/.test(s)) return "x";
  return null;
}

/** "from now until X", "from now to X": the range starts today. */
export function fromNow(s: string): string | null {
  const m = s.match(/^(?:from\s+)?now\s+(?:until|till|til|to|through|thru)\s+(.+)$/);
  if (!m) return null;
  if (parseH10(s).includes("+0d>")) return null;
  const out = parseH10(`today until ${m[1]}`);
  return out.includes("+0d>") ? out : null;
}

// ---------------------------------------------------------------- frequency words

export function frequency(s: string): string | null {
  if (/^(?:yearly|annually|annual|once a year)$/.test(s)) return "d R y/1";
  if (/^(?:weekly|every week|each week|once a week)$/.test(s)) return "d R w/1";
  if (/^(?:monthly|every month|each month|once a month)$/.test(s)) return "d R m/1";
  if (/^(?:daily|everyday|every day|each day|once a day|twice daily|twice a day|nightly|every night|each night|every evening|every morning|every afternoon|each morning|each evening)$/.test(s)) return "d R d/1";
  if (/^(?:mornings?|afternoons?|evenings?|nights?|days?)$/.test(s)) return "x";
  return null;
}

// ---------------------------------------------------------------- self-correction

const CORRECT = /(?:^|[\s,;-])(?:no wait|no no|no,|no(?= (?:\d|mon|tue|wed|thu|fri|sat|sun|tomorrow|today|next|the\b))|actually|i mean|sorry|wait|make that|scratch that|correction|oops|nah make it|make it)\s+(?=\S)/;

/** "tuesday no wednesday at ten": the part after the correction word replaces what it corrects. */
export function correction(s: string, p: P): string | null {
  const m = s.match(CORRECT);
  if (!m || m.index === undefined) return null;
  const before = s.slice(0, m.index).replace(/[,;\s]+$/, "");
  const after = s.slice(m.index + m[0].length);
  if (!before || !after) return null;
  // "no" must be followed by something date-like: a weekday, a month, a number or a day word
  if (!/\b(?:\d|mon|tue|wed|thu|fri|sat|sun|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|today|tomorrow|tonight|noon|midnight|next|this)/.test(after)) return null;
  const a = p(before);
  const b = p(after);
  if (b === "x" || a === "x") return null;
  const tm = (d: string) => d.match(/^(?:t|dt) (?:\S+ )?(\S+?)(?:>\S*)?$/);
  if (/^d /.test(b) && /^dt /.test(a) && !b.includes(">")) {
    const t = a.match(/^dt \S+ (\d{1,2}(?::\d\d)?\??|\d\d:\d\d)$/);
    if (t) return `dt ${b.slice(2)} ${t[1]}`;
  }
  if (/^t /.test(b) && /^dt /.test(a) && !a.includes(">")) {
    const d = a.match(/^dt (\S+) /);
    if (d) return `dt ${d[1]} ${b.slice(2)}`;
  }
  void tm;
  return b;
}

// ---------------------------------------------------------------- slash and dotted numeric dates

/** Dotted dates with a first number over 12 are day-first ("13.04.2021"). h10 handles slashes. */
export function dotted(s: string): string | null {
  const m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4}|\d{2})(?:[\s,t]+(.+))?$/);
  if (!m) return null;
  const [a, b] = [+m[1]!, +m[2]!];
  const yr = m[3]!.length === 2 ? (+m[3]! >= 70 ? 1900 + +m[3]! : 2000 + +m[3]!) : +m[3]!;
  if (a > 12 && b <= 12) {
    const date = `${yr}-${String(b).padStart(2, "0")}-${String(a).padStart(2, "0")}`;
    return parseH10(m[4] ? `${date} ${m[4]}` : date);
  }
  return null;
}

// ---------------------------------------------------------------- weekday range inside a relative week

/** "mon to thu next week": the end is a bare weekday on or after the start, as in the labels. */
export function weekdayRange(s: string, today?: string): string | null {
  const m = s.match(new RegExp(`^(?:from\\s+)?(${WD_RE})\\s*(?:to|-|\u2013|through|thru|until|till)\\s*(${WD_RE})\\s+(?:of\\s+)?${WEEK_MOD}\\s+week$`));
  if (!m) return null;
  const [a, b] = [wdOf(m[1]!), wdOf(m[2]!)];
  const n = wkN(m[3]!);
  const start = legacyForm(a, n, today) ?? `${a}@W${n >= 0 ? "+" : ""}${n}`;
  return `d ${start}>${b}`;
}

// ---------------------------------------------------------------- relative whole periods

export function periods(s: string): string | null {
  let m: RegExpMatchArray | null;
  if ((m = s.match(/^(?:the|this|current) (week|month|year)$/))) return `d ${m[1]![0]!.toUpperCase()}+0`;
  if ((m = s.match(/^all (?:of )?(?:the )?(last|next|this|previous|coming) (week|month|year)$/))) {
    const n = m[1] === "last" || m[1] === "previous" ? "-1" : m[1] === "this" ? "+0" : "+1";
    return `d ${m[2]![0]!.toUpperCase()}${n}`;
  }
  if ((m = s.match(/^(?:a |one |1 )?(week|month|year|fortnight) from (?:today|now)$/))) return `d +${m[1] === "fortnight" ? 2 : 1}${m[1] === "fortnight" ? "w" : m[1]![0]}`;
  if ((m = s.match(/^(?:within|inside)(?: the next)? (\d+|a|an|one|two|three|four|five|six|seven|ten) (day|week|month)s?$/))) {
    const N: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, ten: 10 };
    const n = /^\d/.test(m[1]!) ? +m[1]! : N[m[1]!]!;
    return `d +0d>+${n}${m[2]![0]}`;
  }
  return null;
}

// ---------------------------------------------------------------- durations stated before the start

const DUR_N: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, twelve: 12, fifteen: 15, twenty: 20, thirty: 30, forty: 40, "forty five": 45, sixty: 60 };
const DUR_RE = /\b(half an hour|half hour|an hour and a half|(?:\d+(?:\.\d+)?|a|an|one|two|three|four|five|six|seven|eight|nine|ten|twelve|fifteen|twenty|thirty|forty[ -]five|forty|sixty)[ -]?(hours?|hrs?|h|minutes?|mins?|'))(?![a-z\d])/;

/** "block 90 minutes on tuesday starting at 10", "7p 1h": a duration next to a start gives `>+N`. */
export function durationWith(s: string, p: P): string | null {
  const m = s.match(DUR_RE);
  if (!m || m.index === undefined) return null;
  const before = s.slice(0, m.index);
  const after = s.slice(m.index + m[0].length);
  // not an offset or a frequency
  if (/\b(?:in|within|after|every|each|ago|next|over|past|last|every other|than|early|late|before|at)\s*$/.test(before) || /^\s*(?:ago|later|from now|before|after|early|late|earlier|away|notice|per|a day|a week)\b/.test(after)) return null;
  if (/\(\s*(?:duration:?\s*|approx\.?\s*|about\s*)?$/.test(before)) return null;
  const adjacentToTime = /(?:\d\s*(?:a|p|am|pm)|\d:\d\d|\bnoon|\bmidnight)\s*$/.test(before.trimEnd());
  const cued = /\b(?:block|reserve|hold|book|need|needs|takes?|taking|lasts?|lasting|runs?|running|duration|for|expect\w*|plan on|set aside|allow|about|around|approx\w*|roughly|of)\s+(?:about |around |roughly )?$/.test(before) || adjacentToTime;
  if (!cued) return null;
  const rest = (before.replace(/\b(?:for|about|around|approx\w*|roughly|of)\s*$/, "") + " " + after.replace(/^\s*(?:long|each|total)\b/, "")).replace(/\s+/g, " ").trim();
  const q = p(rest);
  const mt = q.match(/^(t|dt) (.*?)(>)?$/);
  if (!mt || q.includes(">") && !q.endsWith(">")) return null;
  if (!/(\d\d:\d\d|\d\?)$|\d{1,2}(?::\d\d)?\?$/.test(mt[2]!)) return null;
  const w = m[1]!;
  let n: number;
  let u: "h" | "m";
  if (/^half/.test(w)) [n, u] = [30, "m"];
  else if (/^an hour and a half/.test(w)) [n, u] = [90, "m"];
  else {
    const num = w.match(/^(\d+(?:\.\d+)?|[a-z]+(?:[ -]five)?)/)![1]!.replace("-", " ");
    const v = /^\d/.test(num) ? parseFloat(num) : DUR_N[num];
    if (v === undefined) return null;
    const unit = m[2]![0]!;
    if (unit === "h") [n, u] = v % 1 ? [Math.round(v * 60), "m"] : [v, "h"];
    else [n, u] = [v, "m"];
  }
  if (u === "h" ? n < 1 || n > 48 : n < 1 || n > 1440) return null;
  return `${mt[1]} ${mt[2]}>+${n}${u}`;
}

// ---------------------------------------------------------------- two points joined by opening and closing words

const POINT = "(?:\\d|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|mon|tue|wed|thu|fri|sat|sun|noon|midnight|today|tomorrow|tonight)";
const OPEN_W = "(?:opens?|starts?|begins?|beginning|starting|commences?|launch(?:es)?)";
const CLOSE_W = "(?:closes?|ends?|finish(?:es|ed)?|closing|ending|expires?|stops?)";

/** "opens 1 january and closes 31 january", "begins at 8 and finish at 10:00": a range from the opening to the closing point. */
export function cuePair(s: string, p: P): string | null {
  const ad = s.match(new RegExp(`\\b(?:arriv\\w+|check[- ]?in)\\W+(?:on |at |is |date )?\\s*(${POINT}[^,;]*)[,;]\\s*(?:depart\\w*|departure|check[- ]?out|return\\w*|leav\\w*)\\W+(?:on |at |is |date )?\\s*(${POINT}[^,;]*)`));
  if (ad) {
    const out = p(`${ad[1]} to ${ad[2]}`);
    if (out.includes(">")) return out;
  }
  const m = s.match(new RegExp(`\\b${OPEN_W}\\s+(?:at |on |in |by |the )*(${POINT}.*?)\\s*(?:,|;|\\band\\b|\\bthen\\b)\\s*(?:and |then )?${CLOSE_W}\\s+(?:at |on |by |the )*(${POINT}.*)$`));
  if (!m) return null;
  const out = p(`${m[1]} to ${m[2]}`);
  return out.includes(">") ? out : null;
}

// ---------------------------------------------------------------- end of day deadlines

/** "by the end of the day", "by the close of business on friday": an open start up to that day. Abbreviations (eod, cob) are left to h10. */
export function endOfDay(s: string, p: P): string | null {
  const m = s.match(/^(.*?)\b(?:by|before|until|till)\s+(?:the\s+)?(?:close of business|end of (?:the )?(?:business |working )?day|end of business|end of play)(?:\s+(?:on|of))?\s*(.*)$/);
  if (!m) return null;
  const rest = `${m[1]} ${m[2]}`.replace(/\s+/g, " ").trim();
  if (!rest || /^(?:please|pls|kindly|plz)$/.test(rest)) return "d >+0d";
  const r = p(rest);
  return /^d \S+$/.test(r) && !r.includes(">") && !r.includes(",") ? `d >${r.slice(2)}` : null;
}

// ---------------------------------------------------------------- monthly day lists and weekday-in-months lists

const NTH: Record<string, number> = { first: 1, "1st": 1, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, fifth: 5, "5th": 5, last: -1 };
const mnum = (m: string) => ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(m.slice(0, 3)) + 1;
const p2 = (n: number) => String(n).padStart(2, "0");

/** "1,2,3 of month 07:00" and "1st monday of sep,oct,nov 09:00": a monthly recurrence with a list of days or a month filter. */
export function monthLists(s: string, p: P): string | null {
  let m = s.match(/^((?:\d{1,2}(?:st|nd|rd|th)?\s*(?:,|and|&)\s*)+\d{1,2}(?:st|nd|rd|th)?)\s+of\s+(?:the\s+|each\s+|every\s+)?month\b\s*(.*)$/);
  if (m) {
    const days = m[1]!.split(/\s*(?:,|and|&)\s*/).map((d) => parseInt(d, 10));
    if (days.some((d) => d < 1 || d > 31)) return null;
    const rest = m[2]!.trim() ? p(m[2]!) : "x";
    const t = rest.match(/^t (\S+)$/);
    return `${t ? "dt" : "d"} R m/1 ${days.map((d) => `d${d}`).join(",")}${t ? ` ${t[1]}` : ""}`;
  }
  m = s.match(new RegExp(`^(?:(?:every|each)\\s+(?:year\\s+)?(?:on\\s+)?)?(?:the\\s+)?(first|second|third|fourth|fifth|last|1st|2nd|3rd|4th|5th)\\s+(${WD_RE})\\s+(?:of|in)\\s+((?:${MONTH_RE})(?:\\s*(?:,|and|&)\\s*(?:${MONTH_RE}))${/every|each/.test(s) ? "*" : "+"})\\s*(.*)$`));
  if (m) {
    const months = [...new Set(m[3]!.match(new RegExp(MONTH_RE, "g"))!.map(mnum))].sort((a, b) => a - b);
    const rest = m[4]!.trim() ? p(m[4]!) : "x";
    const t = rest.match(/^t (\S+)$/);
    return `${t ? "dt" : "d"} R m/1 ${wdOf(m[2]!)}#${NTH[m[1]!]} ${months.map((x) => `M@${p2(x)}`).join(",")}${t ? ` ${t[1]}` : ""}`;
  }
  return null;
}
