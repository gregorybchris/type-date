// h16: h15 plus lunar and lunisolar holidays ("diwali", "during ramadan", "erev yom kippur", "eid al adha at 9am",
// "hanukkah 2027"). Policy: specs/dsl.md, "Lunar and lunisolar holidays". The rule is a lazy chunk, like h15's.
import type { Engine } from "./engine";
import { loadH15, parseH15 } from "./h15";
import type { ZoneContext } from "./h13/zone";

export type { ZoneContext };

type Rule = typeof import("./h16/lunar").withLunar;
let rule: Rule | null = null;

/** Load the lazy chunks (h15's and the lunar rule). Call before the first `parseH16`. */
export async function loadH16(): Promise<void> {
  await loadH15();
  if (!rule) rule = (await import("./h16/lunar")).withLunar;
}

/** Sync parse. Without `loadH16` it is h15. */
export const parseH16 = (text: string, today?: string, ctx: ZoneContext = {}): string => {
  const p = (t: string) => parseH15(t, today, ctx);
  return rule ? rule(text, p(text), p) : p(text);
};

export const parseH16Async = async (text: string, today?: string, ctx: ZoneContext = {}): Promise<string> => {
  await loadH16();
  return parseH16(text, today, ctx);
};

export const h16: Engine = {
  id: "h16",
  async load() {
    await loadH16();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH16Async(text, opts?.today, { zone: opts?.zone, locale: opts?.locale });
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h16;
