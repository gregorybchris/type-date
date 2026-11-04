import { formats } from "./formats";
// h11 text rewrites and fixes on the h10 output. Each one is narrow and keyed on words in the text.

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const MONTH_RE = "(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const monthNo = (m: string) => MONTHS.indexOf(m.slice(0, 3)) + 1;
const LAST_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const suffix = (n: number) => (n % 100 >= 11 && n % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : n % 10] ?? "th"));
const p2 = (n: number) => String(n).padStart(2, "0");

/** Text rewrites that make a phrase one h10 already reads. */
export function rewrite(s: string): string {
  s = formats(s);
  // "the 5 of next month", "3 of may": a day number with "of" and a month gets an ordinal suffix
  s = s.replace(new RegExp(`\\b(\\d{1,2})(\\s+of\\s+(?:${MONTH_RE}\\b|(?:this|next|last|the) month))`, "g"), (_m, d: string, tail: string) => `${d}${suffix(+d)}${tail}`);
  // "month end", "eom", "eow", "eoy"
  s = s.replace(/\bmonth[- ]?end\b|\beom\b/g, "the end of the month").replace(/\beow\b/g, "the end of the week").replace(/\beoy\b/g, "the end of the year");
  s = s.replace(/\bend of month\b/g, "the end of the month");
  // "the other day" is not a date
  if (/^(?:the )?other day$/.test(s)) return "this is not a date";
  // "1st & 3rd tuesday": a list joined by "&"
  s = s.replace(/(\b\d{1,2}(?:st|nd|rd|th)|\b(?:first|second|third|fourth|fifth|last))\s*&\s*(?=\d|first|second|third|fourth|fifth|last)/g, "$1 and ");
  // "first to last day of 2008"
  s = s.replace(/^(?:the )?first to (?:the )?last day of (\d{4})$/, "$1-01-01 to $1-12-31");
  // fillers: "after like 4pm", "um tomorrow"
  s = s.replace(/\b(after|before|around|about|by|at|until|till|from|on)\s+like\s+/g, "$1 ").replace(/(^|\s)(?:um+|uh+|erm+|hmm+)(?=\s|$)/g, " ");
  // "from 9am til whenever": an open end
  s = s.replace(/\b(?:until|till|til|to)\s+(?:whenever|whatever|late|later|further notice|forever)\b/g, "onwards");
  // "midnight tonight" is the start of tomorrow
  s = s.replace(/\b(?:midnight tonight|tonight at midnight|tonight midnight|midnight tonite)\b/g, "tomorrow at midnight");
  // "at ate thirty": eight, after a time word
  s = s.replace(/\b(at|around|by|@|until|till|from|to)\s+ate\b/g, "$1 eight");
  // "all the day on 3 of may"
  s = s.replace(/\ball the day\b/g, "");
  // "the 25th 2 the 27th": a "2" between two ordinal days is "to"
  s = s.replace(/(\b\d{1,2}(?:st|nd|rd|th))\s+2\s+(?=(?:the\s+)?\d)/g, "$1 to ");
  // a fuzzy period word next to explicit dates is only a label: "spring term starts jan 28", "winter break dec 21 through jan 1"
  if (new RegExp(`\\b${MONTH_RE}\\.?\\s+\\d|\\b\\d{1,2}(?:st|nd|rd|th)?\\s+(?:of\\s+)?${MONTH_RE}\\b|\\d{1,2}/\\d{1,2}`).test(s)) {
    s = s.replace(/\b(?:summer|winter|spring|fall|autumn)\s+(?:break|vacation|holidays?|term|semester|recess|quarter|session)\b/g, "");
  }
  // "21st, 22nd and 23rd of may", "may 21, 22 and 23": a list of days in one month
  s = s.replace(new RegExp(`\\b((?:\\d{1,2}(?:st|nd|rd|th)?\\s*(?:,|&|and)\\s*)+\\d{1,2}(?:st|nd|rd|th)?)\\s+of\\s+(${MONTH_RE})\\b`, "g"), (m, days: string, mo: string) => /\b(?:every|evry|each|monthly)\b/.test(s) || days.split(/\s*(?:,|&|and)\s*/).length < 3 ? m : days.split(/\s*(?:,|&|and)\s*/).map((d) => `${mo} ${parseInt(d, 10)}`).join(", "));
  // "oct 5 6 7": a month and bare days
  s = s.replace(new RegExp(`\\b(${MONTH_RE})\\s+((?:[1-9]|[12]\\d|3[01])(?:\\s+(?:[1-9]|[12]\\d|3[01])){2,})$`), (_m, mo: string, days: string) => days.split(/\s+/).map((d) => `${mo} ${d}`).join(", "));
  // "fri 5/28 - mon 5/31/2027": the end year applies to the start
  s = s.replace(/(?<![\d/])(\d{1,2}\/\d{1,2})(?!\/)(\s*(?:-|\u2013|to|through|thru|until)\s*(?:[a-z]{3,9},?\s+)?\d{1,2}\/\d{1,2}\/(\d{2,4}))/g, "$1/$3$2");
  // counts of things next to a date: "3 nights", "2 guests"
  s = s.replace(/,\s*\b\d+\s+(?:nights?|guests?|adults?|kids?|children|rooms?|people|ppl|seats?|tickets?|kings?|queens?)\b/g, "");
  // "for 9am": at 9am
  s = s.replace(/\bfor (\d{1,2}(?::\d\d)?\s*(?:am|pm))\b/g, "at $1");
  // a number word that names a thing, not an hour: "phase two", "chapter four"
  s = s.replace(/\b(?:phase|stage|step|level|chapter|section|part|unit|grade|room|floor|page|item|track|group|team|lane|gate|table|seat|door|route|platform|bay|suite|ward|class|period|round|game|tier|type|option|plan|version|season|episode)\s+(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/g, "");
  // "q4 2027": the quarter of that year
  s = s.replace(/(?<![\w-])q([1-4])\s*,?\s*(?:of\s+)?(\d{4})(?![\w-])|(?<![\w-])(\d{4})\s+q([1-4])(?![\w-])/g, (_m, q1: string, y1: string, y2: string, q2: string) => {
    const q = +(q1 ?? q2);
    const y = y1 ?? y2;
    const m0 = (q - 1) * 3 + 1;
    return `${y}-${p2(m0)}-01 to ${y}-${p2(m0 + 2)}-${LAST_DAY[m0 + 1]}`;
  });
  // texting abbreviations
  s = s.replace(/\btom\b(?=\s+(?:\d|at\b|morning|evening|night|noon))/g, "tomorrow").replace(/\bb4\b/g, "before");
  // "tn 9p": tonight
  s = s.replace(/\btn\b(?=\s+\d)/g, "tonight");
  // "the day of christmas"
  s = s.replace(/^(?:the )?day of /, "");
  // "for tonight", "for tomorrow" after a time
  s = s.replace(/\bfor (tonight|today|tomorrow|tmrw)\b/g, "$1");
  // "only on saturday and sunday" is a recurrence
  s = s.replace(/\bonly on\b(?=\s+(?:mon|tue|wed|thu|fri|sat|sun))/g, "every");
  // "every tuesday fortnight"
  s = s.replace(/\bevery\s+((?:mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?|sun)\w*)\s+fortnight(?:ly)?\b/g, "every other $1");
  // "every year at 14 february", "every 14 february"
  s = s.replace(new RegExp(`\\bevery(?: year)?(?:\\s+(?:on|at|in))?\\s+(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?(${MONTH_RE})\\b`, "g"), (_m, d: string, mo: string) => `every ${mo} ${d}`);
  // an hour 13-23 after "at" is a 24h hour
  s = s.replace(new RegExp(`\\b(at|@)\\s+(1[3-9]|2[0-3])(?![:.\\d/-]|\\s*(?:am|pm|a\\.m|p\\.m|st|nd|rd|th|o'?clock|hours?|hrs?|minutes?|mins?|days?|weeks?|of|${MONTH_RE}))`, "g"), (_m, pre: string, h: string) => `${pre} ${h}:00`);
  // ISO-like colon dates: 2012:08:03 18:31:59
  s = s.replace(/(?<![\w/:-])(\d{4}):(\d\d):(\d\d)(?![\d:])/g, "$1-$2-$3");
  return s;
}



/** Fix the h10 output using words in the text. */
export function fix(s: string, out: string, p: (t: string) => string): string {
  let m: RegExpMatchArray | null;
  // business days, "following" and "closing on" anchors: "net 15 business days from nov 1", "3 days following dec 1"
  if ((m = s.match(/(?:^|\s)(\d+)\s+(business |bus |banking |working |work )?(day|week)s?\s+(after|following|from|before|prior to|preceding)\s+(.+)$/))) {
    const [n, bd, unit, rel, x] = [+m[1]!, m[2], m[3]!, m[4]!, m[5]!];
    if ((out.includes("~") && !bd) || /\b(?:every|evry|each|weekly|daily|monthly)\b/.test(s) || x.split(" ").length > 6) return out;
    const sign = ["before", "prior to", "preceding"].includes(rel) ? "-" : "+";
    for (const cand of [x, x.replace(/^the\s+\w+\s+on\s+/, "").replace(/^(?:the\s+)?/, "")]) {
      const r = p(cand);
      if (/^d \S+$/.test(r) && !/^d [WMYQ]/.test(r) && !/^d [+-]\d/.test(r) && !r.includes(">") && !r.includes(",") && !r.includes("~")) {
        const u = bd ? "b" : unit === "week" ? "w" : "d";
        return `d ${r.slice(2)}~${sign}${n}${u}`;
      }
    }
  }
  // "through june" in a recurrence ends on the last day of June (`until june` keeps the month)
  if (/^(?:d|dt) R [dwmy]\/1 /.test(out) && (m = s.match(new RegExp(`\\b(?:through|thru)\\s+(${MONTH_RE})\\b`)))) {
    const mo = monthNo(m[1]!);
    out = out.replace(new RegExp(` uM@${p2(mo)}\\b`), ` u${p2(mo)}-${LAST_DAY[mo - 1]}`);
  }
  // "every october", "each june and july": a month filter, not a start bound
  if (/^(?:d|dt) R /.test(out)) {
    const lm = s.match(new RegExp(`\\b(?:every|each)\\s+((?:${MONTH_RE})(?:\\s*(?:,|and|&)\\s*(?:${MONTH_RE}))*)\\b`));
    const lm2 = !lm && s.match(new RegExp(`\\b(${MONTH_RE})\\s+(?:and|&)\\s+(${MONTH_RE})\\b`));
    const list = lm ? lm[1]!.match(new RegExp(MONTH_RE, "g")) : null;
    if (list && !/^(?:d|dt) R y\//.test(out)) {
      const toks = out.split(" ");
      const months = [...new Set(list.map(monthNo))].sort((a, b) => a - b).map((x) => `M@${p2(x)}`);
      const keep = toks.filter((t) => !/^[su]M@\d\d$/.test(t) && !/^M@/.test(t));
      // insert after the day token (position 3 when there is one)
      const at = /^(?:[a-z]{2}(?:,[a-z]{2})*|[a-z]{2}#-?\d(?:,[a-z]{2}#-?\d)*|d-?\d+(?:,d-?\d+)*)$/.test(keep[3] ?? "") ? 4 : 3;
      if (toks.some((t) => /^[su]?M@/.test(t))) out = [...keep.slice(0, at), months.join(","), ...keep.slice(at)].join(" ");
      void lm2;
    }
  }
  // "until the end of next month", "through the end of Q2": the period is the open end
  if (!out.includes(">") && !/^(?:d|dt) R /.test(out) && (m = s.match(/\b(?:until|till|through|thru|up to)\s+(?:the\s+)?end of\s+(.+)$/))) {
    const r = p(m[1]!);
    if (/^d [WMYQ][+@-]/.test(r)) out = `d >${r.slice(2)}`;
  }
  // "no later than the 5th of next month": a day of a relative month takes the open start too
  if (/^d D\d\d@M[+-]\d+$/.test(out) && /\b(?:no later th[ae]n|not later th[ae]n|by|before|until|till)\s+(?:the\s+)?\d/.test(s)) out = out.replace(/^d /, "d >");
  // "every 2 weeks on monday for 6 weeks": the count is occurrences
  if ((m = s.match(/\bevery\s+(\d+)\s+(days?|weeks?|months?)\b.*\bfor\s+(?:the next\s+)?(\d+)\s+(days?|weeks?|months?)\b/)) && m[2]![0] === "w" && m[4]![0] === "w" && +m[1]! > 1) {
    const n = Math.floor(+m[3]! / +m[1]!);
    if (n >= 1 && / n\d+/.test(out)) out = out.replace(/ n\d+/, ` n${n}`);
  }
  // weekday lists in a recurrence are in Monday-first order
  if (/^(?:d|dt) R /.test(out)) {
    const ORDER = ["mo", "tu", "we", "th", "fr", "sa", "su"];
    out = out.replace(/ ((?:su|mo|tu|we|th|fr|sa)(?:,(?:su|mo|tu|we|th|fr|sa))+)(?= |$)/, (_m, l: string) => ` ${l.split(",").sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)).join(",")}`);
  }
  return out;
}

/** Times joined by "and" with no cue word: the first time only ("meet at 4pm and 6pm"). */
export function andTimes(s: string): string | null {
  if (/\b(?:between|from|to|until|till|through|thru)\b|[-\u2013]|\bb[a-z]{3,7}\s*(?=\d)|\bfr[o]?m\s*(?=\d)/.test(s)) return null;
  const T = "\\d{1,2}(?::\\d\\d)?\\s*(?:am|pm|a|p)?";
  const m = s.match(new RegExp(`(?<![\\d:])(${T})\\s+and\\s+(${T})(?![\\d:])`));
  if (!m || !/\d/.test(m[1]!) || !/\d/.test(m[2]!)) return null;
  // both look like clock times: a meridiem on one side, or a colon
  const clock = (x: string) => /am|pm|a$|p$|:/.test(x.trim());
  if (!(clock(m[1]!) && clock(m[2]!))) return null;
  return s.replace(m[0], m[1]!.trim());
}
