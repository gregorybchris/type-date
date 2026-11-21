// h12 rules, loaded on demand by src/h12.ts. Each rule rewrites the text so h11 can parse the shared part (bounds, time of day,
// noise words), then puts the multi-part form back into h11's DSL line.
import { parseH11 } from "../h11";
import { normalize } from "../h8/normalize";
import { withBounds } from "./bounds";
import { dayTimes, registrar } from "./days";
import { nthConjunction } from "./nth";
import { fixOut, rewrite } from "./post";

export const runH12 = (text: string, today?: string): string => {
  const p0 = (s: string) => parseH11(s, today);
  // a bound-aware parse: start and until clauses are cut out, the skeleton is parsed, the bounds are put back
  const p = (s: string) => {
    const r = rewrite(s);
    return withBounds(r, p0) ?? p0(r);
  };
  const orig = text.replace(/\s+/g, " ").trim();
  const lowered = normalize(orig.toLowerCase()).toLowerCase();
  const nz = rewrite(lowered);
  // h11 gets the original text unless a rewrite changed it
  const out = registrar(orig, p0) ?? nthConjunction(nz, p) ?? dayTimes(nz, p0, p) ?? withBounds(nz, p0) ?? p0(nz === lowered ? text : nz);
  return fixOut(out, nz);
};
