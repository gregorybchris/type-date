// h9: rules in front of h8 for named dates, nth weekday of a relative month, bounded recurrences,
// ranges with relative ends, exclusions, lone hour words, foreign month names and noise.
// h8 is called unchanged. The rules (src/h9/all.ts) are a lazy chunk, like the v2 layer of h7.
import type { Engine } from "./engine";
import { loadV2 } from "./h7";
import { parseH8 } from "./h8";

type Run = (text: string, today?: string) => string;
let run: Run | null = null;

/** Load the lazy chunks (h7 v2 layer and the h9 rules). Call before the first `parseH9`. */
export async function loadH9(): Promise<void> {
  await loadV2();
  if (!run) run = (await import("./h9/all")).runH9;
}
export { loadV2 };

/** Sync parse. Without `loadH9` it is h8. */
export const parseH9 = (text: string, today?: string): string => (run ? run(text, today) : parseH8(text, today));

export const parseH9Async = async (text: string, today?: string): Promise<string> => {
  await loadH9();
  return parseH9(text, today);
};

export const h9: Engine = {
  id: "h9",
  async load() {
    await loadH9();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH9Async(text, opts?.today);
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h9;
