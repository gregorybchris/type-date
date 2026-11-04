// h8 normalization: rewrite misspelled and abbreviated words to forms h7 understands.
// Runs before h7. Words h7 already knows are never touched.
import { exact } from "../h7";

// Canonical targets. Flag "p": a trailing "s" is kept (weekdays, units).
const P = "sunday monday tuesday wednesday thursday friday saturday day week month year hour minute weekend weekday";
const N = "january february march april may june july august september october november december tomorrow tonight today yesterday morning evening afternoon midnight noon night every each next last past coming this the for and from until between after before since except other over during within starting beginning ending ago daily weekly monthly yearly annually fortnight fortnightly please half quarter business christmas thanksgiving occurrences couple another hundred rest three four five six seven eight nine ten eleven twelve fifteen thirty forty fifty";
const TARGETS: [string, boolean][] = [...P.split(" ").map((w): [string, boolean] => [w, true]), ...N.split(" ").map((w): [string, boolean] => [w, false])];
const NAMES = new Set("sunday monday tuesday wednesday thursday friday saturday january february march april june july august september october november december".split(" "));

// Misspellings that no general rule reaches. The key may carry a plural "s" only for plural targets.
const ALIAS: Record<string, string> = {};
const alias = (to: string, words: string) => words.split(" ").forEach((w) => (ALIAS[w] = to));
alias("wednesday", "wend wensday wednsday wedsday wendsday wedensday wedn wensdy wnsday");
alias("august", "agu agst");
alias("may", "mya mai");
alias("day", "dy");
alias("the", "teh hte");
alias("this", "ths");
alias("from", "frm");
alias("half", "haf hafl");
alias("midnight", "midnite");
alias("fortnight", "fortnite fortnit");
alias("fortnightly", "fortnitely");
alias("and", "adn");
alias("september", "spt spet");
alias("over", "ovr");
alias("year", "yeer");
alias("days", "dys");
alias("week", "wek weke");
alias("school", "skool");
alias("every", "evey evrey");
alias("business", "bizness bizniss busness buisness");
alias("wed", "wends");
alias("earth", "erth");
alias("on", "onn");
alias("since", "sinc sinse");
alias("before", "befor");
alias("remainder", "remaindr remainer");
alias("minute", "minut");
alias("please", "pleese");

// words h7 reads in other ways, or time zones, that a rule would otherwise rewrite
const KEEP = new Set("pst tomnight yeah".split(" "));
// short forms h7 reads but its v2 patterns do not: spell them out
const SHORT: Record<string, string> = {};
const short = (to: string, words: string) => words.split(" ").forEach((w) => (SHORT[w] = to));
short("next", "nxt");
short("last", "lst");
short("each", "ea");
short("week", "wk");
short("weeks", "wks");
short("month", "mth");
short("months", "mths");
short("year", "yr");
short("years", "yrs");
short("hour", "hr");
short("hours", "hrs");
short("minutes", "mins");
short("weekday", "wkday");
short("weekdays", "wkdays");
short("weekend", "wkend wknd");
short("weekends", "wkends wknds");
const PLURAL = new Set(P.split(" "));
const vowels = (x: string) => x.replace(/[^aeiou]/g, "");
const collapse = (x: string) => x.replace(/(.)\1+/g, "$1");
const skel = (x: string) => collapse(x[0]! + x.slice(1).replace(/[aeiou]/g, ""));
const subseq = (a: string, b: string) => {
  let i = 0;
  for (const c of b) if (a[i] === c) i++;
  return i === a.length;
};

/** Edit distance with adjacent transposition, capped at 2 (returns 3 when larger). */
function dist(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
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

/** The target a misspelled word stands for, or undefined. */
function match(w: string): string | undefined {
  const c = collapse(w);
  const sk = skel(w);
  let best: string | undefined;
  let bd = 9;
  for (const [t, plural] of TARGETS) {
    if (t[0] !== w[0]) continue;
    if (w.length < 3 && t !== w) continue;
    let d = 9;
    if (collapse(t) === c && (t.length >= 5 || w.slice(-1) === w.slice(-2, -1))) d = 0;
    else if (sk.length >= 3 && skel(t) === sk && subseq(w, t)) d = 1; // letters only dropped (form is not from)
    else if (NAMES.has(t) && sk.length >= 4 && skel(t).startsWith(sk) && w.length >= 4 && subseq(vowels(w), vowels(t))) d = 1.5;
    else if (t.length >= 6 && w.length >= 5) {
      const e = dist(w, t);
      if (e <= 1 || (e === 2 && t.length >= 8 && w.length >= 6 && NAMES.has(t))) d = 2 + e;
    } else if (plural && t.length >= 4 && w.length >= 4 && w.slice(0, 2) === t.slice(0, 2) && dist(w, t) <= 1) d = 5;
    // one adjacent swap in a name of 5+ letters (marhc)
    if (d > 4 && t.length >= 5 && w.length === t.length && dist(w, t) === 1 && [...w].some((ch, i) => ch === t[i + 1] && w[i + 1] === t[i])) d = 4;
    if (d < bd || (d === bd && best && Math.abs(t.length - w.length) < Math.abs(best.length - w.length))) (bd = d), (best = plural ? t + "\0" : t);
  }
  return best;
}

const cache = new Map<string, string | undefined>();
function fix(w: string): string | undefined {
  if (cache.has(w)) return cache.get(w);
  if (cache.size > 2000) cache.clear();
  let r: string | undefined;
  if (SHORT[w]) r = SHORT[w];
  else if (!exact(w) && !KEEP.has(w)) {
    // a plural of a weekday or unit first, so "saturdys" stays plural
    const base = w.slice(0, -1);
    const pm = w.endsWith("s") && w.length >= 4 && !exact(base) ? match(base) : undefined;
    const pa = w.endsWith("s") && !exact(base) && !ALIAS[w] ? ALIAS[base] : undefined;
    if (pa && PLURAL.has(pa)) r = pa + "s";
    else if (pm?.endsWith("\0")) r = pm.replace("\0", "s");
    else r = ALIAS[w] ?? match(w)?.replace("\0", "");
  }
  cache.set(w, r);
  return r;
}

const MON = "(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*";
const WD = "(?:mon|tues?|wed|thu(?:rs?)?|fri|sat|sun)(?:day)?";
const TIME = "\\d{1,2}(?::\\d\\d)?\\s?(?:[ap]m)?";
const DUR = "(?:occurrences?|times|mins?|minutes?|hrs?|hours?|wks?|weeks?|days?|dys?|mths?|months?|yrs?|years?)";

/** Digits and letters standing for words, only where the context is clear. */
function context(s: string): string {
  return s
    .replace(/\b2ni(?:te|ght)\b/gi, "tonight")
    .replace(/^@\s?|(\s)@\s?(?=\d)/g, (_, a) => (a ? " at " : "at "))
    .replace(/\b1\/2 (?=an? |h)/g, "half ")
    .replace(new RegExp(`(\\b\\d{1,2}:\\d\\d\\s?(?:[ap]m)?|\\b\\d{1,2}\\s?[ap]m|\\bfrom \\d{1,2}|\\b\\d{1,2}\\/\\d{1,2}|\\b${WD}(?:-${WD})? \\d{1,2}|\\b(?:morning|afternoon|evening|night|between) \\d{1,2}|\\b${MON} \\d{1,2}|\\btoday|\\btomorrow) 2 (?=${TIME}\\b|${MON}\\b|today|tomorrow|${WD}\\b)`, "gi"), "$1 to ")
    .replace(new RegExp(`(\\b\\d{1,2} ?[ap]m|\\b\\d{1,2}:\\d\\d|\\b${WD}|[a-z]{3,}) 4 (?=the |an? |half |\\d+ ?${DUR}\\b)`, "gi"), "$1 for ")
    .replace(new RegExp(`\\bfr (?=(?:an?|the|half|\\d+|[a-z]+) (?:half |an )?${DUR}\\b|the next|\\d+ ${DUR})`, "gi"), "for ")
    .replace(/\bpst(?= (?:\d+|an?|couple|few|one|two|three|four|five|six|seven|eight|nine|ten)\b)/gi, "past")
    .replace(/\bpst(?= the )/gi, "past")
    .replace(/\bat non\b/gi, "at noon")
    .replace(new RegExp(`\\bform (?=\\d|${MON}\\b|${WD}\\b|today|tomorrow|now|next|last|this)`, "gi"), "from ")
    .replace(/\b2day\b/gi, "today")
    .replace(/\b(\d{1,2}) (thirty|fifteen)\b(?!-)/gi, (_, h, m) => `${h}:${m.toLowerCase() === "thirty" ? "30" : "15"}`)
    .replace(/(?<=[a-z0-9]) n (?=[a-z0-9])/gi, " and ")
    .replace(new RegExp(`\\bforth (?=${WD}\\b)`, "gi"), "fourth ");
}

/** Rewrite misspelled and abbreviated words. Text without such words comes back unchanged. */
export function normalize(text: string): string {
  const s = context(text);
  const lower = s.toLowerCase();
  const end = lower.trimEnd().length;
  return s.replace(/(?<![\d@#\/.])[A-Za-z]{2,}(?![A-Za-z\d@])/g, (w, off: number) => {
    const l = w.toLowerCase();
    // the last word may be unfinished typing: leave prefixes of a target alone
    if (off + w.length >= end && TARGETS.some(([t]) => t.length > l.length && t.startsWith(l))) return w;
    return fix(l) ?? w;
  });
}
