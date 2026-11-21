// h14: h13 plus a date range with one shared time window ("tomorrow to friday 3-4pm", "3-4pm tomorrow to friday").
// The phrase is a daily recurrence bounded by the two dates: `dt R d/1 ufr 15:00>16:00 s+1d` (specs/dsl.md, "Date range with
// a shared time"). A time on each end ("3pm tomorrow to 4pm friday") is still one span, and h13 already parses it.
// The rule is a lazy chunk, like the h13 zone layer.
import type { Engine } from "./engine";
import { loadH13, parseH13 } from "./h13";
import type { ZoneContext } from "./h13/zone";

export type { ZoneContext };

type Rule = typeof import("./h14/shared-time").withSharedTime;
let rule: Rule | null = null;

/** Load the lazy chunks (h13's and the shared-time rule). Call before the first `parseH14`. */
export async function loadH14(): Promise<void> {
  await loadH13();
  if (!rule) rule = (await import("./h14/shared-time")).withSharedTime;
}

/** Sync parse. Without `loadH14` it is h12 with no zone and no shared-time rule. */
export const parseH14 = (text: string, today?: string, ctx: ZoneContext = {}): string => {
  const p = (t: string) => parseH13(t, today, ctx);
  return rule ? rule(text, p(text), p) : p(text);
};

export const parseH14Async = async (text: string, today?: string, ctx: ZoneContext = {}): Promise<string> => {
  await loadH14();
  return parseH14(text, today, ctx);
};

export const h14: Engine = {
  id: "h14",
  async load() {
    await loadH14();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH14Async(text, opts?.today, { zone: opts?.zone, locale: opts?.locale });
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h14;
