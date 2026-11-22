// h17: a holiday with a past word ("last purim", "previous thanksgiving", "since last christmas") is the most recent
// one on or before today: the holiday token takes the past marker (`L:purim+0<`, `12-25<`, `th#4@11<`, `E+0<`).
// Policy: specs/dsl.md, "Past holidays". The past word is removed, h16 parses the rest, and the first holiday token in
// its answer is marked. Only when h16 has no reading of the whole text, or ignores the past word.
import { parseDsl, serializeDsl } from "@type-date/core";

type Parse = (text: string) => string;

const valid = (dsl: string) => parseDsl(dsl).mode !== "x";
const canon = (dsl: string) => serializeDsl(parseDsl(dsl) as never);

// the past word, not followed by a word that makes it something else ("last year's", "last day of", "last night")
const PAST = /\b(?:the )?(?:last|lst|lsat|lasr|las|just gone|previous|prev|this past|the past|this last|(?:the )?most recent|the latest|the recent|recent|prior|the prior|(?:the )?(?:immediately )?preceding)\s+(?!(?:years?|yrs?|week|weeks|month|months|day|days|night|nights|time|minute|minutes|one|few|couple|of|to|\d)\b)/;
// a past word after the holiday: "christmas just gone", "passover that just ended"
const PAST_AFTER = /\s+(?:just gone|(?:that|which) (?:just )?(?:went by|ended|passed|finished)|just passed|just ended)\b/;

// holiday-shaped date tokens: a fixed month-day, an nth weekday of a named month, Easter, a lunar holiday
const HOLIDAY_TOKEN = /(?<![\w:@#<+-])((?:\d{2}-\d{2}|(?:su|mo|tu|we|th|fr|sa)#-?\d@\d{2}|E[+-]\d+|L:[a-z]+[+-]\d+))(?=(?:~[+-]\d+[dwmyb])?(?:$|[ >,]))/;

/** A holiday token, with or without a past marker. */
const HOLIDAY_ANY = /(?<![\w:@#<+-])(?:\d{2}-\d{2}|(?:su|mo|tu|we|th|fr|sa)#-?\d@\d{2}|E[+-]\d+|L:[a-z]+[+-]\d+)(?=<?(?:~[+-]\d+[dwmyb])?(?:$|[ >,]))/;

const TYPOS: [RegExp, string][] = [
  [/\bdiwaali\b/g, "diwali"],
  [/\bdeepavalli\b/g, "deepavali"],
  [/\b(valentines?) dya\b/g, "$1 day"],
];

function normalize(text: string): string {
  let t = text.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, " ").trim();
  for (const [re, s] of TYPOS) t = t.replace(re, s);
  return t;
}

// a holiday with a relative year counts calendar years, not occurrences: `x` (specs/dsl.md, "Past holidays")
const REL_YEAR = /\b(?:last year'?s?|last yr'?s?|the year before(?:'s| last)?|\d+ (?:years?|yrs?) (?:ago|back)|(?:two|three|four|five) (?:years?|yrs?) (?:ago|back))\b/;

const NUMS: Record<string, number> = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, couple: 2 };

/** Mark the first holiday token of a DSL line with a suffix (`<`, `<2`, `^2`). */
function mark(out: string, suffix: string): string | null {
  const hm = out.match(HOLIDAY_TOKEN);
  if (!hm) return null;
  const at = hm.index! + hm[1]!.length;
  const dsl = out.slice(0, at) + suffix + out.slice(at);
  return valid(dsl) ? canon(dsl) : null;
}

/** The holiday named by the last 1 to 4 words before `end` (singular or plural): its words and start, or null. */
function holidayBefore(t: string, end: number, parse: Parse): { start: number; name: string } | null {
  const words = t.slice(0, end).trimEnd().split(" ");
  let best: { start: number; name: string } | null = null;
  let bestOut = "";
  for (let k = 1; k <= Math.min(4, words.length); k++) {
    const ws = words.slice(words.length - k);
    if (ws.some((w) => /\d/.test(w))) break;
    const last = ws[ws.length - 1]!;
    for (const sing of [last, last.replace(/'s$/, ""), last.replace(/s$/, ""), last.replace(/es$/, "")]) {
      const name = [...ws.slice(0, -1), sing].join(" ");
      const out = parse(name).replace(/>\S+$/, "");
      // a longer span counts only when it names another holiday ("chinese new year", not "of diwali")
      if (new RegExp(`^d ${HOLIDAY_TOKEN.source}(?:~[+-]\\d+[dwmyb])?$`).test(out) && out !== bestOut) {
        best = { start: t.slice(0, end).trimEnd().length - ws.join(" ").length, name };
        bestOut = out;
        break;
      }
    }
  }
  return best;
}

/** Counted occurrences: "two chanukahs ago" (`<2`), "the christmas before last" (`<2`), "christmas after next" (`^2`). */
function withCount(t: string, parse: Parse): string | null {
  const tries: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/ (?:before|b4) (?:the )?last\b/, () => "<2"],
    [/ after (?:the )?next\b/, () => "^2"],
    [/ (?:ago|back)\b/, () => ""],
  ];
  for (const [re, suf] of tries) {
    const m = t.match(re);
    if (!m) continue;
    const h = holidayBefore(t, m.index!, parse);
    if (!h) continue;
    let start = h.start;
    let suffix = suf(m);
    if (!suffix) {
      // "N Xs ago": the count is right before the holiday
      const c = t.slice(0, start).match(/(?:^|\s)(\d{1,2}|two|three|four|five|six|seven|eight|nine|ten|a couple of|couple of) $/);
      if (!c) continue;
      const n = NUMS[c[1]!.replace(/^a /, "").replace(/ of$/, "")] ?? +c[1]!;
      if (n < 2 || n > 10) return "x";
      suffix = `<${n}`;
      start -= c[0].trimStart().length;
    }
    const pre = t.slice(0, start).replace(/\bthe $/, "");
    const rest = (pre + h.name + t.slice(m.index! + m[0].length)).replace(/\s+/g, " ").trim();
    const out = parse(rest);
    return mark(out, suffix);
  }
  return null;
}

/** The first 1 to 4 words name a holiday or a month-day, and the first word is part of the name ("christmas eve", not
 * "train on new years"). */
function namesHoliday(after: string, parse: Parse): boolean {
  const words = after.split(" ");
  for (let k = 1; k <= Math.min(4, words.length); k++) {
    const head = words.slice(0, k).join(" ").replace(/[,.;:!?)]+$/, "");
    const out = parse(head);
    const hm = out.match(HOLIDAY_TOKEN);
    if (!hm) continue;
    const without = parse(words.slice(1, k).join(" ").replace(/[,.;:!?)]+$/, ""));
    // a two-word name whose second word is also a name ("yom kippur", "kippur") still counts
    if ((without.match(HOLIDAY_TOKEN)?.[1] ?? "") !== hm[1] || k === 2) return true;
  }
  return false;
}

/** The h17 layer. `full` is h16's answer for the whole text; `parse` is h16. */
export function withPast(text: string, full: string, parse: Parse): string {
  const t = normalize(text);
  if (REL_YEAR.test(t) && HOLIDAY_ANY.test(parse(t.replace(REL_YEAR, " ").replace(/\s+/g, " ").trim()))) return "x";
  const counted = withCount(t, parse);
  if (counted) return counted;
  const ltl = t.match(/\b(?:the )?(?:last to last|last but one) /);
  if (ltl && namesHoliday(t.slice(ltl.index! + ltl[0].length), parse)) {
    const rest = (t.slice(0, ltl.index!) + t.slice(ltl.index! + ltl[0].length)).trim();
    const r = mark(parse(rest), "<2");
    if (r) return r;
  }
  const pa = t.match(PAST_AFTER);
  if (pa) {
    const rest = (t.slice(0, pa.index!) + t.slice(pa.index! + pa[0].length)).trim();
    const out = parse(rest);
    if (out !== "x" && HOLIDAY_TOKEN.test(out) && !/[<^]/.test(out)) {
      const r = mark(out, "<");
      if (r) return r;
    }
  }
  const all = [...t.matchAll(new RegExp(PAST.source, "g"))].filter((x) => namesHoliday(t.slice(x.index! + x[0].length), parse));
  if (all.length > 1) {
    let rest = t;
    for (const x of [...all].reverse()) rest = rest.slice(0, x.index!) + rest.slice(x.index! + x[0].length);
    let out = parse(rest.replace(/\s+/g, " ").trim());
    const toks = [...out.matchAll(new RegExp(HOLIDAY_TOKEN.source, "g"))];
    if (toks.length >= all.length) {
      for (const x of toks.slice(0, all.length).reverse()) out = out.slice(0, x.index! + x[1]!.length) + "<" + out.slice(x.index! + x[1]!.length);
      if (valid(out)) return canon(out);
    }
  }
  const m = t.match(PAST);
  if (!m) return full;
  const rest = (t.slice(0, m.index!) + t.slice(m.index! + m[0].length)).replace(/\s+/g, " ").trim();
  if (!rest) return full;
  const out = parse(rest);
  if (out === "x") return full;
  // h16 read the past word itself ("last friday", "last dec 25", "the last day of hanukkah"); but when its answer has
  // no holiday it read a word inside the holiday name ("last good friday" as `fr-1`)
  // h16 ignored the past word: no reading, the same reading, no holiday in it ("last good friday" as `fr-1`), or the
  // same holiday without a marker ("before last christmas" as `12-25`)
  const tokenOf = (d: string) => d.match(HOLIDAY_TOKEN)?.[1];
  const count = (d: string) => d.match(new RegExp(HOLIDAY_ANY.source, "g"))?.length ?? 0;
  // ... or fewer holidays than the text without the past word has ("last halloween thru thanksgiving" as `>th#4@11`)
  const ignored = full === "x" || full === out || !HOLIDAY_ANY.test(full) || (!/[<^]/.test(full) && tokenOf(full) === tokenOf(out)) || count(full) < count(out);
  if (!ignored) return full;
  // the holiday must follow the past word: the text after it parses to a holiday token
  // the words right after it (one to four, no digits) name a holiday on their own ("last call ... dec 2" is not one)
  const named = namesHoliday(t.slice(m.index! + m[0].length), parse);
  if (!named) return full;
  return mark(out, "<") ?? full;
}
