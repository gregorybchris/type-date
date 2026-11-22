// h17: h16 plus past holidays ("last purim", "previous thanksgiving", "since last christmas"): the holiday takes the
// past marker. Policy: specs/dsl.md, "Past holidays". The rule is a lazy chunk, like h16's.
import type { Engine } from "./engine";
import { loadH16, parseH16 } from "./h16";
import type { ZoneContext } from "./h13/zone";

export type { ZoneContext };

type Rule = typeof import("./h17/past").withPast;
let rule: Rule | null = null;

/** Load the lazy chunks (h16's and the past rule). Call before the first `parseH17`. */
export async function loadH17(): Promise<void> {
  await loadH16();
  if (!rule) rule = (await import("./h17/past")).withPast;
}

/** Sync parse. Without `loadH17` it is h16. */
export const parseH17 = (text: string, today?: string, ctx: ZoneContext = {}): string => {
  const p = (t: string) => parseH16(t, today, ctx);
  return rule ? rule(text, p(text), p) : p(text);
};

export const parseH17Async = async (text: string, today?: string, ctx: ZoneContext = {}): Promise<string> => {
  await loadH17();
  return parseH17(text, today, ctx);
};

export const h17: Engine = {
  id: "h17",
  async load() {
    await loadH17();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH17Async(text, opts?.today, { zone: opts?.zone, locale: opts?.locale });
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h17;
