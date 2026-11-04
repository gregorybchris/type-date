// h11: rules in front of h10 for moving holidays and Easter, a spoken-number and clock reader, numeric formats,
// weekday-code meeting patterns, deadline words and frequency words. h10 is called unchanged.
// The rules (src/h11/all.ts) are a lazy chunk, like the h9 rules.
import type { Engine } from "./engine";
import { loadH10, parseH10 } from "./h10";

type Run = (text: string, today?: string) => string;
let run: Run | null = null;

/** Load the lazy chunks (h7 v2 layer, h9 rules, h11 rules). Call before the first `parseH11`. */
export async function loadH11(): Promise<void> {
  await loadH10();
  if (!run) {
    const m = await import("./h11/all");
    await m.initH11();
    run = m.runH11;
  }
}

/** Sync parse. Without `loadH11` it is h10. */
export const parseH11 = (text: string, today?: string): string => (run ? run(text, today) : parseH10(text, today));

export const parseH11Async = async (text: string, today?: string): Promise<string> => {
  await loadH11();
  return parseH11(text, today);
};

export const h11: Engine = {
  id: "h11",
  async load() {
    await loadH11();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH11Async(text, opts?.today);
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h11;
