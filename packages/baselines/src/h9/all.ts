// h9 rules, loaded on demand by src/h9.ts.
import { parseH8 } from "../h8";
import { normalize } from "../h8/normalize";
import { afterNext, boundedRec, chained, clean, cueRange, domRange, everyLast, exclusion, loneHour, minutesTo, misc, named, nthOfMonth, recBounds, relAnchor, relMonthRange, sameYear, weekendThrough, wdayDom } from "./rules";
import { foreign } from "./lang";

/** Re-exported for h11, which loads this lazy module instead of importing h9/rules a second time. */
export { clean } from "./rules";

/** All h9 rules in front of h8. */
export const runH9 = (text: string, today?: string): string => {
  const p = (s: string) => parseH8(s, today);
  const raw = text.toLowerCase().replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");
  const n0 = named(raw);
  if (n0) return n0;
  const s = clean((/\bde mayo\b/.test(raw) ? (x: string) => x : foreign)(minutesTo(normalize(clean(raw)).toLowerCase()))).replace(/[.!?]+$/, "");
  if (!s) return "x";
  return (
    named(s, p) ??
    wdayDom(s, p) ??
    chained(s) ??
    relAnchor(s) ??
    afterNext(s) ??
    loneHour(s) ??
    nthOfMonth(s, p) ??
    everyLast(s, p) ??
    exclusion(s) ??
    misc(s, p) ??
    relMonthRange(s) ??
    weekendThrough(s, p) ??
    domRange(s, p) ??
    recBounds(s, p) ??
    boundedRec(s, p) ??
    cueRange(s, p) ??
    sameYear(p(s).replace(/^dt (\S+) >.*$/, "d $1"))
  );
};

