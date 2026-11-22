// h15: offsets from now ("in 2 hours", "for the next 30 min"), relative weekends ("next weekend"), and parts of a month
// ("the last weekend of october", "the first week of january", "the last day of the month", "1st monday of oct 2027").
// Policy: specs/dsl.md, "Offsets from now, relative weekends, parts of a month".
//
// Offsets from now are read here in full. Weekends and month parts are found in the text, replaced by a sentinel date
// that h14 reads (`1999-12-31`), and the sentinel in h14's answer is replaced by the new token. So h14 still handles the
// words around them: a time ("next weekend at 3pm"), a range ("this weekend through monday"), a bound ("every day until
// the last weekend of october").
import { parseDsl, serializeDsl } from "@type-date/core";

type Parse = (text: string) => string;

const SENTINEL = "1999-12-31";
const canon = (dsl: string) => serializeDsl(parseDsl(dsl) as never);
const valid = (dsl: string) => parseDsl(dsl).mode !== "x";

// ---- normalization ----

const WORD_FIX: [RegExp, string][] = [
  [/\bthisweekend\b/g, "this weekend"],
  [/\b(?:wk|wek)\b/g, "week"],
  [/\bweek[\s-]end\b/g, "weekend"],
  [/\b(?:wknd|wkend|weeknd|wekend|wkd|wkn?d|weekned)\b/g, "weekend"],
  [/\b(?:wknds|wkends|weeknds)\b/g, "weekends"],
  [/\b(?:nxt|nexte|nexy|nex|enxt)\b/g, "next"],
  [/\bthsi\b/g, "this"],
  [/\bther\b/g, "the"],
  [/\bcomming\b/g, "coming"],
  [/\baftr\b/g, "after"],
  [/\blst\b/g, "last"],
  [/\b(?:frm|frmo|fom)\b/g, "from"],
  [/\b(?:nw)\b/g, "now"],
  [/\b(?:mnth|mth|mon th)\b/g, "month"],
  [/\b(?:wks)\b/g, "weeks"],
  [/\b(?:hlf|haf|hlaf)\b/g, "half"],
  [/\b(?:tmrw|tmr|tomorow|tmrow)\b/g, "tomorrow"],
  [/\b(?:rn|rite now)\b/g, "right now"],
  [/\bsaterday\b/g, "saturday"],
  [/\b(?:hr|hrs)\b/g, "hour"],
  [/\boctobr\b/g, "october"],
  [/\bjanurary\b/g, "january"],
  [/\bnovemeber\b/g, "november"],
  [/\bjuy\b/g, "july"],
];

const NUM_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20,
  thirty: 30, forty: 40, fortyfive: 45, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};

function normalize(text: string): string {
  let t = ` ${text.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, " ").trim()} `;
  for (const [re, s] of WORD_FIX) t = t.replace(re, s);
  return t.replace(/\s+/g, " ").trim();
}

/** Durations in a normal form: "<n> days|hours|minutes". Applied only to the copy used for offsets from now. */
function normDur(t: string): string {
  let s = ` ${t} `;
  s = s.replace(/(\d)o\b/g, "$10"); // "3o min"
  s = s.replace(/\b(?:one|1|an|a) and (?:a )?half (?:hours?|hrs?)\b/g, "1.5 hours");
  // tens and units as words: "forty five", "twenty-five"
  s = s.replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[\s-](one|two|three|four|five|six|seven|eight|nine)\b/g, (_, a: string, b: string) => String(NUM_WORDS[a]! + NUM_WORDS[b]!));
  s = s.replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fortyfive|fifty|sixty|seventy|eighty|ninety)\b/g, (w: string) => String(NUM_WORDS[w]));
  s = s.replace(/(\d+)\s*h\s*(\d+)\s*m?\b/g, "$1 hours $2 minutes"); // 1h30, 1h 30m
  s = s.replace(/(\d+)\s*hr\s*(\d+)\s*m(?:in|ins)?\b/g, "$1 hours $2 minutes"); // 2hr 30m
  s = s.replace(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours|hous|hors|hourss)\b/g, "$1 hours");
  s = s.replace(/(\d+(?:\.\d+)?)\s*(?:mins|min|minute|minutes|mns|minuts)\b/g, "$1 minutes");
  s = s.replace(/(\d+)m\b/g, "$1 minutes"); // "5m" (a spaced "5 m" stays: v007 labels it x)
  s = s.replace(/(\d+(?:\.\d+)?)\s*(?:days|day)\b/g, "$1 days");
  s = s.replace(/\b(?:a couple of|a couple|couple of|couple)\b/g, "2");
  s = s.replace(/\b(?:three quarters of an hour|3\/4 (?:hours|hr|hour))\b/g, "45 minutes");
  s = s.replace(/\b(?:a quarter of an hour|a quarter hour|quarter of an hour|quarter hour|a quarter (?:hr|hours))\b/g, "15 minutes");
  s = s.replace(/\b(?:half an hour|half a hour|a half hour|half hour|half an hr|half hr|1\/2 (?:hours|hr|hour))\b/g, "30 minutes");
  s = s.replace(/\b(?:an|a) (?:hour|hr|hours)\b/g, "1 hours");
  s = s.replace(/\b(?:a|an|one) day\b/g, "1 days");
  s = s.replace(/\b(?:a|one) minute\b/g, "1 minutes");
  // "2 and a half hours", "1 and half hours", "an hour and a half", "1 hours n half"
  s = s.replace(/(\d+) (?:and a half|and half|n half|n a half) (hours|days)/g, (_, n: string, u: string) => `${+n + 0.5} ${u}`);
  s = s.replace(/(\d+) (hours|days) (?:and a half|and half|n half|n a half)\b/g, (_, n: string, u: string) => `${+n + 0.5} ${u}`);
  return s.replace(/\s+/g, " ").trim();
}

// a duration: "2 hours", "1 hours 30 minutes", "2 days and 3 hours", "1 hours 30" (minutes after hours)
const DUR = String.raw`(\d+(?:\.\d+)?) (days|hours|minutes)(?:,? (?:and )?(\d+(?:\.\d+)?) (hours|minutes))?(?:,? (?:and )?(\d+)(?: (minutes))?)?`;
const APPROX = String.raw`(?:about |around |approx\.? |approximately |roughly |like |~ ?|maybe )?`;

/** Minutes of a duration match (groups start at `i`). null when it is not whole minutes or only whole days. */
function durMinutes(m: RegExpMatchArray, i: number): number | null {
  const per = { days: 1440, hours: 60, minutes: 1 } as const;
  let total = +m[i]! * per[m[i + 1] as keyof typeof per];
  if (m[i + 2]) {
    if (m[i + 3] === m[i + 1] || (m[i + 1] === "minutes")) return null;
    total += +m[i + 2]! * per[m[i + 3] as keyof typeof per];
  }
  if (m[i + 4]) {
    // a bare number after hours is minutes ("1 hour 30"); after days it is something else ("in 2 days 9")
    const last = m[i + 3] ?? m[i + 1];
    if (last !== "hours" && !m[i + 5]) return null;
    if (m[i + 1] === "minutes" || m[i + 3] === "minutes") return null;
    total += +m[i + 4]!;
  }
  if (!Number.isInteger(total) || total <= 0) return null;
  // whole days alone are date offsets ("in 3 days" is `+3d`)
  if (m[i + 1] === "days" && !m[i + 2] && !m[i + 4] && total % 1440 === 0) return null;
  return total;
}

const off = (mins: number) => (mins % 60 === 0 ? `${mins / 60}h` : `${mins}m`);
const nowPt = (mins: number) => (mins === 0 ? "now" : `now${mins > 0 ? "+" : "-"}${off(Math.abs(mins))}`);
/** A span from now: a duration end up to 48 hours, a second now point beyond. */
const span = (start: string, mins: number) => {
  if (mins <= 2880 && (mins % 60 === 0 || mins <= 1440)) return `dt ${start}>+${off(mins)}`;
  return `dt ${start}>now+${off(mins)}`;
};

// ---- offsets from now ----

const FROM_NOW = String.raw`(?:from now|from right now|from this moment|from today|hence)`;
const AGO = String.raw`(?:ago|back|bak|before now|earlier than now)`;
const NOW_WORD = String.raw`(?:right now|just now|now|as of now|at this moment|this moment)`;

/** An end of a span from now: a time or a date (h14 reads it), or another offset from now. */
function spanEnd(rest: string, parse: Parse): string | null {
  const r = rest.replace(/^(?:the )?/, "").trim();
  const p = pointFromNow(r);
  if (p) return `now>${p}`;
  const e = parse(r);
  let m: RegExpMatchArray | null;
  if ((m = e.match(/^t (\S+)$/))) return `now>${m[1]}`;
  if ((m = e.match(/^dt (\S+ \S+)$/)) && !e.includes(">")) return `now>${m[1]}`;
  // a period end keeps the date range of the pools ("from now to month end" is `d +0d>M+0`); a day end is a span from now
  // a date end without a time is a date range from today, as the pools label it ("from now until christmas" is `d +0d>12-25`)
  if ((m = e.match(/^d (\S+)$/)) && !e.includes(">") && m[1] !== "+0d") return `d:+0d>${m[1]}`;
  return null;
}

/** "in 2 hours", "2 hours from now", "45 min ago", "after 2 hours": the point only, or null. */
function pointFromNow(t: string): string | null {
  let m: RegExpMatchArray | null;
  if ((m = t.match(new RegExp(`^(?:in|after|within) ${APPROX}${DUR}(?: ${FROM_NOW}| or so)?$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : nowPt(n);
  }
  if ((m = t.match(new RegExp(`^(?:in )?${APPROX}${DUR} ${FROM_NOW}(?: please| pls)?$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : nowPt(n);
  }
  if ((m = t.match(new RegExp(`^${APPROX}${DUR} ${AGO}$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : nowPt(-n);
  }
  if ((m = t.match(new RegExp(`^${FROM_NOW.replace("(?:", "(?:")} ${DUR}$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : nowPt(n);
  }
  if (new RegExp(`^${NOW_WORD}$`).test(t)) return "now";
  return null;
}

/** Strip words that carry no date or time ("remind me", "pls", "um", event names before "in"). */
const FILLER_HEAD = /^(?:(?:um|uh|so|ok|okay|hey|please|pls|can you|could you|remind me|set (?:a |an )?(?:reminder|timer|alarm)(?: for)?|ping me|call me|text me|call|meet|meeting|standup|busy|block me out|block|i am|i'm|we are|out|ooo|back|leave|leaving|done|ready|start|starting|let's do|lets do|do it|check|check again)\s+)+/;
const FILLER_TAIL = /(?:\s+(?:please|pls|plz|thanks|thx|ok|um|maybe|only|busy|then|again|\?|!|\.)+)+$/;

function stripFiller(t: string): string {
  return t.replace(/[?!.,]+$/g, "").replace(FILLER_HEAD, "").replace(FILLER_TAIL, "").replace(/[?!.,]+$/g, "").trim();
}

/** Words that make an offset vague or tie it to something else ("in an hour or two", "2 hours after the meeting"). */
const VAGUE = /\b(?:or|few|several|some|bit|while|less than|more than|at least|at most|before the|after the|later)\b/;
const vague = (t: string) => VAGUE.test(t.replace(/ or so\b/, ""));

/**
 * An offset from now, a span from now, or the same clock time on another day. The whole text is tried first, then
 * word windows inside it ("I'll ring you back in half an hour"), longest first. A window must hold a duration, a
 * same-time phrase or "now until ...", so a bare "now" in a sentence ("now departing at 5:55") is not read. When the
 * words outside the window hold a date of their own, the text is left to h14. null if there is none.
 */
export function fromNow(text: string, parse: Parse): string | null {
  const raw = normalize(text);
  if (/\b(?:every|each|daily|hourly)\b/.test(raw)) return null;
  // a zone after an offset from now adds nothing: the offset is from the user's clock
  let t = normDur(raw).replace(/\s+(?:gmt|utc|ist|est|pst|cst|cet|bst|edt|pdt|et|pt|ct)$/, "");
  t = stripFiller(t);
  // "to call mum", "for the meeting": trailing purpose clauses after a point
  t = t.replace(/\s+to (?:call|ring|text|email|check|send|leave|go|take|pick|start|join|book|pay)\b.*$/, "").trim();
  if (!vague(raw)) {
    const r = fromNowPhrase(t, parse);
    if (r) return r;
  }
  const words = normDur(raw).replace(/[,;:!?()"]/g, " ").replace(/\.(?=\s|$)/g, " ").split(/\s+/).filter(Boolean);
  const CUE = /\d+(?:\.\d+)? (?:days|hours|minutes)\b|\b(?:this|same) time\b|^(?:from |right )?now (?:until|till|til|to|thru)\b/;
  for (let len = Math.min(words.length - 1, 10); len >= 2; len--) {
    for (let i = 0; i + len <= words.length; i++) {
      const w = words.slice(i, i + len).join(" ");
      if (!CUE.test(w) || vague(w)) continue;
      const r = fromNowPhrase(w, parse);
      if (!r || r === "x" || !valid(r)) continue;
      const rest = [...words.slice(0, i), ...words.slice(i + len)].join(" ");
      return parse(rest) === "x" ? r : null;
    }
  }
  return null;
}

/** `t` (normalized, durations in normal form) as a whole: an offset from now, a span from now, or the same clock time. */
function fromNowPhrase(t: string, parse: Parse): string | null {
  let m: RegExpMatchArray | null;

  // same clock time on another day; a month or a weekday has no form
  if (/\b(?:this|same) time\b.*\b(?:month|year|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/.test(t)) return "x";
  const SAME = String.raw`(?:this|same|the same) time`;
  if ((m = t.match(new RegExp(`^(?:${SAME} (tomorrow|yesterday|day after tomorrow|next week|last week|(\\d+) weeks from now)|(tomorrow|yesterday) (?:at )?${SAME}|${SAME} (?:like today but |as today )?next week)$`)))) {
    const w = m[1] ?? m[3] ?? "next week";
    if (w === "tomorrow") return "dt now+1d";
    if (w === "yesterday") return "dt now-1d";
    if (w === "day after tomorrow") return "dt now+2d";
    if (w === "last week") return "dt now-1w";
    if (m[2]) return `dt now+${+m[2]}w`;
    return "dt now+1w";
  }

  // spans
  const NEXT = String.raw`(?:(?:for|over|during|in|within|upto|up to) )?(?:the )?(?:next|coming|upcoming)`;
  if ((m = t.match(new RegExp(`^${NEXT} (?:${DUR}|(hour|minute))(?: starting now)?$`)))) {
    const n = m[7] ? (m[7] === "hour" ? 60 : 1) : durMinutes(m, 1);
    return n === null ? null : span("now", n);
  }
  if ((m = t.match(new RegExp(`^(?:for )?(?:the )?next ${DUR} starting now$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : span("now", n);
  }
  if ((m = t.match(new RegExp(`^within (?:the next )?${DUR}$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : span("now", n);
  }
  if ((m = t.match(new RegExp(`^within the next (hour|minute)$`)))) return span("now", m[1] === "hour" ? 60 : 1);
  if ((m = t.match(new RegExp(`^(?:from |starting )?(?:right )?now (?:onwards |on )?for (?:the next )?${DUR}$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : span("now", n);
  }
  if ((m = t.match(new RegExp(`^(?:for|over|in|during) (?:the )?(?:past|last|previous) (?:${DUR}|(hour))$`))) || (m = t.match(new RegExp(`^(?:from )?(?:the )?(?:past|last) (?:${DUR})$`)))) {
    const n = m[7] ? 60 : durMinutes(m, 1);
    return n === null ? null : `dt ${nowPt(-n)}>now`;
  }
  if ((m = t.match(new RegExp(`^since ${DUR}(?: ${AGO})?$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : `dt ${nowPt(-n)}>`;
  }
  if ((m = t.match(new RegExp(`^(?:from )?(?:right )?now (?:until|till|til|to|thru|through|up to|upto) (?:the )?next ${DUR}$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : span("now", n);
  }
  if ((m = t.match(new RegExp(`^(?:from |starting )?(?:right )?now (?:until|till|til|to|thru|through|up to|upto|-) (.+)$`))) || (m = t.match(/^between (?:right )?now and (.+)$/))) {
    const e = spanEnd(m[1]!, parse);
    return e ? canonSpan(`dt ${e}`) : null;
  }
  if ((m = t.match(new RegExp(`^(?:until|till|til|by|before|no later than) (.+)$`)))) {
    const p = pointFromNow(m[1]!);
    return p && p !== "now" ? `dt >${p}` : null;
  }
  // "in 2 hours for 30 min", "starting in 20 minutes for one hour", "duration 90 minutes starting in 15 min"
  if ((m = t.match(new RegExp(`^(?:starting )?(?:in|after) ${DUR} for ${DUR}$`)))) {
    const a = durMinutes(m, 1), b = durMinutes(m, 7);
    return a === null || b === null ? null : span(nowPt(a), b).replace("dt now>now", "dt now>now");
  }
  if ((m = t.match(new RegExp(`^(?:for |duration )?${DUR} starting in ${DUR}$`)))) {
    const a = durMinutes(m, 7), b = durMinutes(m, 1);
    return a === null || b === null ? null : span(nowPt(a), b);
  }
  if ((m = t.match(new RegExp(`^(?:from )?(?:starting )?(?:in|after) ${DUR} (?:until|till|til|to|thru|-) (?:in )?(.+)$`)))) {
    const a = durMinutes(m, 1);
    if (a === null) return null;
    const rest = m[7]!.trim();
    const p = pointFromNow(rest) ?? pointFromNow(`in ${rest}`);
    if (p) return `dt ${nowPt(a)}>${p}`;
    const e = parse(rest);
    const tm = e.match(/^t (\S+)$/);
    return tm ? `dt ${nowPt(a)}>${tm[1]}` : null;
  }
  if ((m = t.match(new RegExp(`^starting (?:in|after) ${DUR}$`)))) {
    const n = durMinutes(m, 1);
    return n === null ? null : `dt ${nowPt(n)}`;
  }
  const p = pointFromNow(t);
  return p ? `dt ${p}` : null;
}

/** `now>now+Nh` within 48 hours is the duration form. A date end ("from now until monday") is a date range. */
function canonSpan(dsl: string): string {
  if (dsl.startsWith("dt d:")) return canon(`d ${dsl.slice(5)}`);
  const m = dsl.match(/^dt now>now\+(\d+)([hm])$/);
  if (m) return span("now", +m[1]! * (m[2] === "h" ? 60 : 1));
  return valid(dsl) ? canon(dsl) : dsl;
}

// ---- weekends and parts of a month ----

const MONTHS: [RegExp, number][] = [
  [/^(?:january|jan|janury|januray)$/, 1], [/^(?:february|feb|febuary|febraury)$/, 2], [/^(?:march|mar|marches)$/, 3],
  [/^(?:april|apr)$/, 4], [/^may$/, 5], [/^(?:june|jun)$/, 6], [/^(?:july|jul)$/, 7], [/^(?:august|aug)$/, 8],
  [/^(?:september|sept|sep)$/, 9], [/^(?:october|oct|octobers|ocotber)$/, 10], [/^(?:november|nov|novembers)$/, 11],
  [/^(?:december|dec|decembers)$/, 12],
];
const MONTH_RE = String.raw`(?:january|janury|januray|jan|february|febuary|febraury|feb|march|marches|mar|april|apr|may|june|jun|july|jul|august|aug|september|sept|sep|october|octobers|ocotber|oct|november|novembers|nov|december|decembers|dec)`;
const monthNum = (w: string) => MONTHS.find(([re]) => re.test(w.replace(/'s$/, "")))?.[1] ?? null;

const ORD: Record<string, number> = {
  first: 1, "1st": 1, second: 2, "2nd": 2, third: 3, "3rd": 3, fourth: 4, "4th": 4, fifth: 5, "5th": 5, last: -1, final: -1,
  "very first": 1, "very last": -1,
};
const ORD_RE = String.raw`(?:very first|very last|first|1st|second|2nd|third|3rd|fourth|4th|fifth|5th|last|final)`;

const WD: Record<string, string> = {
  monday: "mo", mon: "mo", tuesday: "tu", tues: "tu", tue: "tu", wednesday: "we", wed: "we", thursday: "th", thurs: "th", thu: "th",
  friday: "fr", fri: "fr", saturday: "sa", sat: "sa", sunday: "su", sun: "su",
};
const WD_RE = String.raw`(?:monday|mon|tuesday|tues|tue|wednesday|wed|thursday|thurs|thu|friday|fri|saturday|sat|sunday|sun)`;

/** A month reference after "of": a named month (and year), this, next or last month, the year. */
const MREF = String.raw`(?<ref>(?:the )?(?:this )?(?:coming )?(?:month of )?(?<mon>${MONTH_RE})(?:'s)?(?: (?<yr>\d{4}))?|(?<yo>\d{4})|(?:the |this )month|(?:the )?(?:this )?(?:coming|current) month|(?:the )?next month|next to next month|(?:the )?(?:last|previous|past) month|(?:the |this )?year)`;
/** "of" before a month; optional before this, next or last month ("2nd weekend this month") */
const OF = String.raw`(?:(?:of|in|on|from) (?:the )?(?:month of )?|(?=(?:this|next|last) month))`;

interface MonthTarget {
  /** `@10`, `@2027-10`, `@M+1`, or a year word */
  at: string;
  month?: number;
  year?: number;
  rel?: number;
  isYear?: boolean;
}

function monthTarget(g: Record<string, string | undefined>): MonthTarget | null {
  const ref = g.ref ?? "";
  const mName = g.mon;
  const year = g.yr;
  if (g.yo) return { at: "", isYear: true, year: +g.yo };
  if (mName) {
    const mo = monthNum(mName);
    if (!mo) return null;
    const p2 = String(mo).padStart(2, "0");
    return year ? { at: `@${year}-${p2}`, month: mo, year: +year } : { at: `@${p2}`, month: mo };
  }
  if (/next to next month/.test(ref)) return { at: "@M+2", rel: 2 };
  if (/next|coming/.test(ref) && !/this coming|current/.test(ref)) return { at: "@M+1", rel: 1 };
  if (/last|previous|past/.test(ref)) return { at: "@M-1", rel: -1 };
  if (/year/.test(ref)) return { at: "", isYear: true };
  return { at: "@M+0", rel: 0 };
}

const DIM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/** The DSL date for the first or last day of a month target. */
function dayOfMonth(k: 1 | -1, t: MonthTarget): string | null {
  const p2 = (n: number) => String(n).padStart(2, "0");
  if (t.isYear) return t.year ? (k === 1 ? `${t.year}-01-01` : `${t.year}-12-31`) : k === 1 ? "01-01" : "12-31";
  if (t.month) {
    const m = t.month;
    if (k === 1) return t.year ? `${t.year}-${p2(m)}-01` : `${p2(m)}-01`;
    if (t.year) return `${t.year}-${p2(m)}-${m === 2 && isLeap(t.year) ? 29 : DIM[m - 1]}`;
    return m === 2 ? "03-01~-1d" : `${p2(m)}-${DIM[m - 1]}`;
  }
  const rel = t.rel ?? 0;
  const at = (n: number) => `M${n >= 0 ? "+" : ""}${n}`;
  return k === 1 ? `D01@${at(rel)}` : `D01@${at(rel + 1)}~-1d`;
}

interface Found {
  start: number;
  end: number;
  token: string;
  /** "coming weekend" style: a token that is a range by itself (`sa>su`, `sa+2>su`) */
  pair?: [string, string];
}

const W = "weekend";
const NUMW = String.raw`(\d+|one|two|three|four|five|six|a couple of|a couple|couple of|couple)`;
const numOf = (s: string) => (/couple/.test(s) ? 2 : NUM_WORDS[s] ?? +s);

/** Find a relative weekend, a part of a month, or an nth weekday with a year in normalized text. */
function findPart(t: string): Found | "x" | null {
  const at = (re: RegExp, f: (m: RegExpExecArray) => Omit<Found, "start" | "end"> | "x" | null): Found | "x" | null => {
    const m = re.exec(t);
    if (!m) return null;
    const r = f(m);
    if (r === null || r === "x") return r;
    return { ...r, start: m.index, end: m.index + m[0].length };
  };
  const tries: (() => Found | "x" | null)[] = [
    // not covered: a recurrence of a month part, a full week or weekend, alternatives, "the weekend after this one"
    () => (new RegExp(`\\b(?:every|each) (?:the )?${ORD_RE} (?:full )?(?:${W}|week) (?:of|in)\\b|\\b${ORD_RE} (?:${W}|week)s? of (?:every|each) month\\b`).test(t) ? "x" : null),
    () => (new RegExp(`\\b${W} (?:of (?:the )?(?:\\d+(?:st|nd|rd|th)?|next week|this week|last week)|at the|ending|closest|nearest|before the (?!last)|after the (?!next)|but one)\\b|\\b${ORD_RE} (?:${W}|week) (?:after|before|closest|nearest)\\b|\\b${W}\\b[^,]* and (?:the )?${ORD_RE} (?:of|${W}|week)\\b|\\b${ORD_RE} full (?:${W}|week)\\b|\\b(?:the )?${W} after this(?: one)?\\b|\\bsecond (?:to )?last (?:${W}|week)\\b`).test(t) ? "x" : null),
    // "every weekend", "every other weekend" (h14 has no answer for these)
    () => at(new RegExp(`^(?:every|each) (other |second |2nd )?${W}$`), (m) => ({ token: m[1] ? "R w/2 sa,su" : "R w/1 sa,su" })),
    // Kth weekend or week of a month
    () => at(new RegExp(`\\b(?:the )?(${ORD_RE}) (${W}|week|day|date) ${OF}${MREF}\\b`), (m) => {
      const k = ORD[m[1]!]!;
      const tgt = monthTarget(m.groups!);
      if (!tgt) return null;
      const part = m[2]!;
      if (part === "day" || part === "date") {
        if (k !== 1 && k !== -1) return null;
        const d = dayOfMonth(k, tgt);
        return d ? { token: d } : null;
      }
      if (tgt.isYear) {
        if (k !== 1 && k !== -1) return null;
        const mm = k === 1 ? "01" : "12";
        return { token: `${part === W ? "WKND" : "W"}#${k}@${tgt.year ? `${tgt.year}-${mm}` : mm}` };
      }
      if (part === "week" && k === 5) return "x";
      return { token: `${part === W ? "WKND" : "W"}#${k}${tgt.at}` };
    }),
    // "week 2 of may", "weekend number 2 of may"
    () => at(new RegExp(`\\b(${W}|week) (?:number |no\\.? |#)?([1-5]) ${OF}${MREF}\\b`), (m) => {
      const tgt = monthTarget(m.groups!);
      const k = +m[2]!;
      if (!tgt || tgt.isYear || (m[1] === "week" && k === 5)) return null;
      return { token: `${m[1] === W ? "WKND" : "W"}#${k}${tgt.at}` };
    }),
    // "october's last weekend", "octobers last weekend", "october last weekend"
    () => at(new RegExp(`\\b(${MONTH_RE})(?:'s)? (${ORD_RE}) (${W}|week)\\b(?: of (\\d{4}))?`), (m) => {
      const tgt = monthTarget({ ref: m[1], mon: m[1], yr: m[4] });
      const k = ORD[m[2]!]!;
      if (!tgt || (m[3] === "week" && k === 5)) return null;
      return { token: `${m[3] === W ? "WKND" : "W"}#${k}${tgt.at}` };
    }),
    // an nth weekday of a month with a year: "the first monday of october 2027"
    () => at(new RegExp(`\\b(?:the )?(${ORD_RE}) (${WD_RE}) (?:of|in|on|from) (?:the )?(?:month of )?(${MONTH_RE}),? (\\d{4})\\b`), (m) => {
      const k = ORD[m[1]!]!;
      const mo = monthNum(m[3]!);
      return mo ? { token: `${WD[m[2]!]}#${k}@${m[4]}-${String(mo).padStart(2, "0")}` } : null;
    }),
    // a day of a relative weekend: "sunday of next weekend", "sat this weekend", "next weekend saturday"
    () => at(new RegExp(`\\b(?:on )?(saturday|sat|sunday|sun) (?:of |on )?(?:the )?(this|next|last|coming|this coming|upcoming) ${W}\\b`), (m) => {
      const day = m[1]!.startsWith("sat") ? "sa" : "su";
      const n = relN(m[2]!);
      if (n === "coming") return { token: day === "sa" ? "sa" : "sa~+1d" };
      return n === null ? null : { token: `${day}@WKND${n >= 0 ? "+" : ""}${n}` };
    }),
    () => at(new RegExp(`\\b(this|next|last|coming|this coming|upcoming) ${W}(?: on)? (saturday|sat|sunday|sun)\\b`), (m) => {
      const day = m[2]!.startsWith("sat") ? "sa" : "su";
      const n = relN(m[1]!);
      if (n === "coming") return { token: day === "sa" ? "sa" : "sa~+1d" };
      return n === null ? null : { token: `${day}@WKND${n >= 0 ? "+" : ""}${n}` };
    }),
    // weekend after next, before last
    () => at(new RegExp(`\\b(?:the )?(?:${W} after (?:the )?next(?: one| ${W})?|next to next ${W}|next next ${W}|next ${W} but one)\\b`), () => ({ token: "WKND+2" })),
    () => at(new RegExp(`\\b(?:the )?(?:${W} before (?:the )?last(?: one| ${W})?|last to last ${W}|(?:the )?one before last ${W}|${W} before the last one)\\b`), () => ({ token: "WKND-2" })),
    // N weekends ago, in N weekends
    () => at(new RegExp(`\\b${NUMW} ${W}s? (?:ago|back|before)\\b`), (m) => ({ token: `WKND-${numOf(m[1]!)}` })),
    () => at(new RegExp(`\\b(?:in|after) ${NUMW} ${W}s?(?: from (?:now|today))?\\b|\\b${NUMW} ${W}s? from (?:now|today)\\b`), (m) => {
      const n = numOf((m[1] ?? m[2])!);
      return n >= 1 ? { token: `sa+${n}`, pair: [`sa+${n}`, "su"] } : null;
    }),
    // this coming weekend
    () => at(new RegExp(`\\b(?:the |this )?(?:coming|upcoming|coming up) ${W}\\b|\\b${W} coming up\\b|\\bthe ${W} that comes\\b`), () => ({ token: "sa", pair: ["sa", "su"] })),
    // next, last, this weekend
    () => at(new RegExp(`\\b(?:(?:the )?following|(?:for )?(?:the )?next) ${W}\\b`), () => ({ token: "WKND+1" })),
    () => at(new RegExp(`\\b(?:the )?(?:last|past|previous|prev) ${W}\\b|\\b(?:the|this) ${W} just gone\\b`), () => ({ token: "WKND-1" })),
    () => at(new RegExp(`\\b(?:this|the|on the|over the|over this|at the|for the|this very) ${W}\\b(?!s| of\\b)`), () => ({ token: "WKND+0" })),
  ];
  for (const f of tries) {
    const r = f();
    if (r) return r;
  }
  return null;
}

function relN(w: string): number | "coming" | null {
  if (w === "this") return 0;
  if (w === "next") return 1;
  if (w === "last") return -1;
  if (/coming/.test(w)) return "coming";
  return null;
}

/** Weekends and month parts: the sentinel in h14's answer becomes the token. null leaves the text to h14. */
export function withParts(text: string, parse: Parse): string | null {
  const t = normalize(text);
  // left to h14: a recurrence of a day ("every last day of the month"), "first to last day of 2008", "except the weekend"
  if (new RegExp(`\\b(?:every|each) (?:the )?${ORD_RE} day\\b|\\bfirst to last day\\b|\\b(?:except|but not|excluding|not) (?:on )?(?:the )?${W}`).test(t)) return null;
  const f = findPart(t);
  if (f === null) return null;
  if (f === "x") return "x";
  // the weekend word is not a weekend phrase when it names a thing ("weekend plans", "weekend rate")
  const rest = (t.slice(0, f.start) + " " + SENTINEL + " " + t.slice(f.end)).replace(/\s+/g, " ").trim();
  const out = parse(rest);
  let dsl: string;
  if (!out.includes(SENTINEL)) {
    // h14 dropped the sentinel: when the other words hold a date of their own ("sat 11am and sun 2pm this weekend"),
    // keep h14's answer for the whole text
    const other = (t.slice(0, f.start) + " " + t.slice(f.end)).replace(/\s+/g, " ").trim();
    if (other && parse(other) !== "x") return null;
    dsl = f.pair ? `d ${f.pair[0]}>${f.pair[1]}` : `d ${f.token}`;
  } else if (f.pair && out === `d ${SENTINEL}`) {
    dsl = `d ${f.pair[0]}>${f.pair[1]}`;
  } else {
    dsl = out.replaceAll(SENTINEL, f.token);
  }
  return valid(dsl) ? canon(dsl) : f.pair ? `d ${f.pair[0]}>${f.pair[1]}` : `d ${f.token}`;
}

/** The h15 layer. `full` is h14's answer for the whole text; `parse` is h14. */
export function withRelative(text: string, full: string, parse: Parse): string {
  const now = fromNow(text, parse);
  if (now && valid(now)) return canon(now);
  const part = withParts(text, parse);
  return part ?? full;
}
