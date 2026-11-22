// h15: h14 plus offsets from now ("in 2 hours", "for the next 30 min", "this time tomorrow"), relative weekends
// ("next weekend", "the weekend after next"), and parts of a month ("the last weekend of october", "the first week of
// january", "the last day of the month", "the first monday of october 2027"). Policy: specs/dsl.md, "Offsets from now,
// relative weekends, parts of a month". The rule is a lazy chunk, like h13's and h14's.
import type { Engine } from "./engine";
import { loadH14, parseH14 } from "./h14";
import type { ZoneContext } from "./h13/zone";

export type { ZoneContext };

type Rule = typeof import("./h15/relative").withRelative;
let rule: Rule | null = null;

/** Load the lazy chunks (h14's and the relative rule). Call before the first `parseH15`. */
export async function loadH15(): Promise<void> {
  await loadH14();
  if (!rule) rule = (await import("./h15/relative")).withRelative;
}

/** Sync parse. Without `loadH15` it is h14 (or h12, if h14's chunks are not loaded either). */
export const parseH15 = (text: string, today?: string, ctx: ZoneContext = {}): string => {
  const p = (t: string) => parseH14(t, today, ctx);
  return rule ? rule(text, p(text), p) : p(text);
};

export const parseH15Async = async (text: string, today?: string, ctx: ZoneContext = {}): Promise<string> => {
  await loadH15();
  return parseH15(text, today, ctx);
};

export const h15: Engine = {
  id: "h15",
  async load() {
    await loadH15();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH15Async(text, opts?.today, { zone: opts?.zone, locale: opts?.locale });
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h15;
