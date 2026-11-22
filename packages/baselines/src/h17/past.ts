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

/** The h17 layer. `full` is h16's answer for the whole text; `parse` is h16. */
export function withPast(text: string, full: string, parse: Parse): string {
  const t = normalize(text);
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
  const tail = t.slice(m.index! + m[0].length);
  const tailOut = parse(tail);
  const th = tailOut.match(HOLIDAY_TOKEN);
  const hm = out.match(HOLIDAY_TOKEN);
  if (!th || !hm) return full;
  const dsl = out.slice(0, hm.index! + hm[1]!.length) + "<" + out.slice(hm.index! + hm[1]!.length);
  return valid(dsl) ? canon(dsl) : full;
}
