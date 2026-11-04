// h8: h7 behind a normalization layer for typos and abbreviations.
// The layer (src/h8/normalize.ts) rewrites misspelled words to forms h7 knows, then h7 parses.
import type { Engine } from "./engine";
import { parseH7, parseH7Async, loadV2 } from "./h7";
import { normalize } from "./h8/normalize";
import { scoreDozen } from "./h8/score";
import { relMonth, withRest } from "./h8/relmonth";

export { loadV2 };

/** Sync parse. Call `loadV2` first if the v2 layer is needed. */
export const parseH8 = (text: string, today?: string): string => {
  const s = scoreDozen(normalize(text));
  const r = relMonth(s);
  return (r && withRest(r.tok, parseH7(r.rest, today), r.rest)) || parseH7(s, today);
};

export const parseH8Async = async (text: string, today?: string): Promise<string> => {
  const s = scoreDozen(normalize(text));
  const r = relMonth(s);
  return (r && withRest(r.tok, await parseH7Async(r.rest, today), r.rest)) || parseH7Async(s, today);
};

export const h8: Engine = {
  id: "h8",
  async load() {},
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH8Async(text, opts?.today);
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h8;
