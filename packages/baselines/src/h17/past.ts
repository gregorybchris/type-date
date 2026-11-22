// h17: a holiday with a past word ("last purim", "previous thanksgiving", "since last christmas") is the most recent
// one on or before today: the holiday token takes the past marker (`L:purim+0<`, `12-25<`, `th#4@11<`, `E+0<`).
// Policy: specs/dsl.md, "Past holidays". The past word is removed, h16 parses the rest, and the first holiday token in
// its answer is marked. Only when h16 has no reading of the whole text, or ignores the past word.
import { parseDsl, serializeDsl } from "@type-date/core";

type Parse = (text: string) => string;

const valid = (dsl: string) => parseDsl(dsl).mode !== "x";
const canon = (dsl: string) => serializeDsl(parseDsl(dsl) as never);

// the past word, not followed by a word that makes it something else ("last year's", "last day of", "last night")
const PAST = /\b(?:the )?(?:last|previous|prev|this past|(?:the )?most recent)\s+(?!(?:years?|yrs?|week|weeks|month|months|day|days|night|nights|time|minute|one|few|couple|\d)\b)/;

// holiday-shaped date tokens: a fixed month-day, an nth weekday of a named month, Easter, a lunar holiday
const HOLIDAY_TOKEN = /(?<![\w:@#<>+-])((?:\d{2}-\d{2}|(?:su|mo|tu|we|th|fr|sa)#-?\d@\d{2}|E[+-]\d+|L:[a-z]+[+-]\d+))(?=(?:~[+-]\d+[dwmyb])?(?:$|[ >,]))/;

/** A holiday token, with or without a past marker. */
const HOLIDAY_ANY = /(?<![\w:@#<>+-])(?:\d{2}-\d{2}|(?:su|mo|tu|we|th|fr|sa)#-?\d@\d{2}|E[+-]\d+|L:[a-z]+[+-]\d+)(?=<?(?:~[+-]\d+[dwmyb])?(?:$|[ >,]))/;

function normalize(text: string): string {
  return text.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, " ").trim();
}

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
    [/ ago\b/, () => ""],
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

/** The h17 layer. `full` is h16's answer for the whole text; `parse` is h16. */
export function withPast(text: string, full: string, parse: Parse): string {
  const t = normalize(text);
  const counted = withCount(t, parse);
  if (counted) return counted;
  const m = t.match(PAST);
  if (!m) return full;
  const rest = (t.slice(0, m.index!) + t.slice(m.index! + m[0].length)).replace(/\s+/g, " ").trim();
  if (!rest) return full;
  const out = parse(rest);
  if (out === "x") return full;
  // h16 read the past word itself ("last friday", "last dec 25", "the last day of hanukkah"); but when its answer has
  // no holiday it read a word inside the holiday name ("last good friday" as `fr-1`)
  if (full !== "x" && full !== out && HOLIDAY_ANY.test(full)) return full;
  // the holiday must follow the past word: the text after it parses to a holiday token
  // the words right after it (one to four, no digits) name a holiday on their own ("last call ... dec 2" is not one)
  const words = t.slice(m.index! + m[0].length).split(" ");
  let named = false;
  for (let k = 1; k <= Math.min(4, words.length) && !named; k++) {
    const head = words.slice(0, k).join(" ").replace(/[,.;:!?)]+$/, "");
    if (/\d/.test(head)) break;
    named = HOLIDAY_TOKEN.test(parse(head));
  }
  if (!named) return full;
  return mark(out, "<") ?? full;
}
