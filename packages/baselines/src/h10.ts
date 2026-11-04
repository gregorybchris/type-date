// h10: a small rewrite step in front of h9 (src/h10/rewrite.ts). h9 is called unchanged.
import type { Engine } from "./engine";
import { loadH9, parseH9 } from "./h9";
import { rewriteH10 } from "./h10/rewrite";

export { loadH9 as loadH10 };

/** Sync parse. Call `loadH10` first for the full rules; without it the result is h8 behind the rewrite. */
export const parseH10 = (text: string, today?: string): string => parseH9(rewriteH10(text), today);

export const parseH10Async = async (text: string, today?: string): Promise<string> => {
  await loadH9();
  return parseH10(text, today);
};

export const h10: Engine = {
  id: "h10",
  async load() {
    await loadH9();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH10Async(text, opts?.today);
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h10;
