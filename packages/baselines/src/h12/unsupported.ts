// Forms the DSL cannot express (specs/dsl.md, "Conjunctions of recurrences"): the label is `x`.
import { WD_SRC } from "./common";

const ORD = "(?:first|second|third|fourth|fifth|last|1st|2nd|3rd|4th|5th)";
const TIME = "(?:noon|midnight|\\d{1,2}(?::\\d{2})?\\s*(?:am|pm|a|p)?\\b|\\d{4}\\b)";

/** Nth weekdays with their own times, or different frequencies in one phrase. */
export function unsupported(text: string): boolean {
  const own = [...text.matchAll(new RegExp(`\\b${ORD}\\s+${WD_SRC}s?\\s*(?:at|@)?\\s*${TIME}`, "g"))];
  if (own.length >= 2 && /\b(?:and|&|n|,)\b/.test(text)) return true;
  const ev = [...text.matchAll(new RegExp(`\\bevery\\s+((?:other|second|2nd|third|3rd|fourth|4th|\\d+)\\s+)?(week|month|day|year|weekday|weekend|${WD_SRC})s?\\b`, "g"))];
  if (ev.length < 2) return false;
  const key = (m: RegExpMatchArray) => `${m[1] ? m[1].trim().replace(/^(?:other|second)$/, "2nd") : "1"}${/month/.test(m[2]!) ? "m" : /year/.test(m[2]!) ? "y" : "w"}`;
  return new Set(ev.map(key)).size > 1;
}
