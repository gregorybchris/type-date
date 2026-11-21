// h12: rules in front of h11 for conjunctions of recurrences: several nth weekdays ("every third tuesday and second monday")
// and a separate time per weekday ("tuesdays at 1:30 and thursdays at 3"). h11 is called unchanged.
import type { Engine } from "./engine";
import { loadH11, parseH11 } from "./h11";

type Run = (text: string, today?: string) => string;
let run: Run | null = null;

/** Load the lazy chunks (h7 v2 layer, h9 rules, h11 rules, h12 rules). Call before the first `parseH12`. */
export async function loadH12(): Promise<void> {
  await loadH11();
  if (!run) run = (await import("./h12/multi")).runH12;
}

/** Sync parse. Without `loadH12` it is h11. */
export const parseH12 = (text: string, today?: string): string => (run ? run(text, today) : parseH11(text, today));

export const parseH12Async = async (text: string, today?: string): Promise<string> => {
  await loadH12();
  return parseH12(text, today);
};

export const h12: Engine = {
  id: "h12",
  async load() {
    await loadH12();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH12Async(text, opts?.today);
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h12;
