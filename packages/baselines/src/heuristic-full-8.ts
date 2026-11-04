// exp-018: heuristic-full-7 behind a normalization layer for typos and abbreviations.
// The layer (src/full-8/normalize.ts) rewrites misspelled words to forms full-7 knows, then full-7 parses.
import type { Engine } from "@type-date/engines";
import { parseFull, parseFullAsync, loadV2 } from "./heuristic-full-7";
import { normalize } from "./full-8/normalize";
import { scoreDozen } from "./full-8/score";
import { relMonth, withRest } from "./full-8/relmonth";

export { loadV2 };

/** Sync parse. Call `loadV2` first if the v2 layer is needed. */
export const parseFull8 = (text: string, today?: string): string => {
  const s = scoreDozen(normalize(text));
  const r = relMonth(s);
  return (r && withRest(r.tok, parseFull(r.rest, today), r.rest)) || parseFull(s, today);
};

export const parseFull8Async = async (text: string, today?: string): Promise<string> => {
  const s = scoreDozen(normalize(text));
  const r = relMonth(s);
  return (r && withRest(r.tok, await parseFullAsync(r.rest, today), r.rest)) || parseFullAsync(s, today);
};

export const heuristicFull8: Engine = {
  id: "heuristic-full-8",
  async load() {},
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseFull8Async(text, opts?.today);
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default heuristicFull8;
