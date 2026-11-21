// A date range with one shared time window: "tomorrow to friday 3-4pm", "3-4pm tomorrow to friday", "dec 1 to dec 5 at 9am".
// h13 keeps only one half of these (the dates, or the first day with the time). The text is split once at a space into
// a date part and a time part, each parsed alone. When the date part is a range of two single days and the time part
// is a time, the result is a daily recurrence from the first day to the last with that time.
import { parseDsl, serializeDsl } from "@type-date/core";

/** A DSL line in canonical token order (until, time, start). */
const canon = (dsl: string) => serializeDsl(parseDsl(dsl) as never);

/** A clear time: a colon, am/pm, noon or midnight, or "at" and a number. A bare number ("5", "2027") is not one. */
const TIME_CUE = /\d:\d\d|\d\s*(?:am|pm|a\.m\.|p\.m\.|a|p)\b|\b(?:noon|midnight)\b|^at\s+\d/;

/** Words a time part may hold. Anything else ("check-in", a date) rejects it, unless h13 read a zone from the extra words. */
const TIME_WORD = /^(?:\d{1,2}(?::\d\d)?(?:am|pm|a|p|a\.m\.|p\.m\.)?|am|pm|a\.m\.|p\.m\.|noon|midnight|at|from|between|and|to|until|till|til|-|–|—)$/;
const timeWords = (s: string) => s.replace(/([-–—])/g, " $1 ").split(/\s+/).filter(Boolean);

/** A date part with its own time ("monday morning", "dec 5 to 7am") is a span with a time on each end, not a shared time. */
const DAY_TIME = /\d:\d\d|\d\s*(?:am|pm|a\.m\.|p\.m\.)|\b(?:noon|midnight|morning|afternoon|evening|night|tonight|eod|cob)\b/;
/** A range word joins the two days. A month alone ("jul 2025") parses as a range too but has none. */
const RANGE_WORD = /\b(?:to|through|thru|until|till|til)\b|[-–—]|^between\b.*\band\b/;

/** `d A>B` where both ends are single days, not periods (W, M, Y, Q) or open ends. */
const DAY_RANGE = /^d ([^\s>]+)>([^\s>]+)$/;
const PERIOD = /^[WMYQ][+\-@]/;

/** `t X` or `t X>Y`, with an optional zone. Not an open range or a duration. */
const TIME_ONLY = /^t (\d[^\s>]*(?:>\d[^\s>]*)?)( @\S+)?$/;

/** h13 kept only one half: the bare date range, or a single first day. A recurrence or a full span is left alone. */
const dropped = (full: string) => /^d [^\s>]+>[^\s>]+$/.test(full) || /^dt [^\sR>][^\s>]* [^\s>]+(?:>[^\s>]+)?(?: @\S+)?$/.test(full);

const strip = (s: string) =>
  s
    .replace(/^[\s,;]+|[\s,;]+$/g, "")
    .replace(/^(?:on|from)\s+/, "")
    .trim();

/**
 * `full` is h13's parse of the whole text. `parse` parses a part.
 * Returns `full` unless the text is a date range with one shared time.
 */
export function withSharedTime(text: string, full: string, parse: (t: string) => string): string {
  if (!dropped(full)) return full;
  const words = text.trim().split(/\s+/);
  for (let i = 1; i < words.length; i++) {
    const left = strip(words.slice(0, i).join(" "));
    const right = strip(words.slice(i).join(" "));
    for (const [datePart, timePart] of [
      [left, right],
      [right, left],
    ] as const) {
      if (!datePart || !timePart || !TIME_CUE.test(timePart)) continue;
      if (!RANGE_WORD.test(datePart) || DAY_TIME.test(datePart)) continue;
      const d = DAY_RANGE.exec(parse(datePart));
      if (!d || PERIOD.test(d[1]!) || PERIOD.test(d[2]!)) continue;
      const t = TIME_ONLY.exec(parse(timePart));
      if (!t || (!t[2] && !timeWords(timePart).every((w) => TIME_WORD.test(w)))) continue;
      try {
        return canon(`dt R d/1 ${t[1]} s${d[1]} u${d[2]}${t[2] ?? ""}`);
      } catch {
        // a bound the DSL does not accept: keep h13's answer
      }
    }
  }
  return full;
}
