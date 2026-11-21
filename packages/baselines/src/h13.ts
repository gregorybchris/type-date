// h13: a time zone layer in front of h12. The zone named in the text becomes a last token `@ZONE` (specs/dsl.md, "Time zones").
// h12 parses the rest of the phrase unchanged. The layer is a lazy chunk, like the h9 to h12 rules.
import type { Engine } from "./engine";
import { loadH12, parseH12 } from "./h12";
import type { ZoneContext } from "./h13/zone";

export type { ZoneContext };

type Run = (text: string, ctx: ZoneContext, parse: (t: string) => string) => string;
let run: Run | null = null;

/** Load the lazy chunks (h7 v2 layer, h9, h11, h12 rules and the zone layer). Call before the first `parseH13`. */
export async function loadH13(): Promise<void> {
  await loadH12();
  if (!run) run = (await import("./h13/zone")).withZone;
}

/** Sync parse. Without `loadH13` it is h12 and no zone is read. `ctx` (the user's zone and locale) picks among ambiguous abbreviations. */
export const parseH13 = (text: string, today?: string, ctx: ZoneContext = {}): string =>
  run ? run(text, ctx, (t) => parseH12(t, today)) : parseH12(text, today);

export const parseH13Async = async (text: string, today?: string, ctx: ZoneContext = {}): Promise<string> => {
  await loadH13();
  return parseH13(text, today, ctx);
};

export const h13: Engine = {
  id: "h13",
  async load() {
    await loadH13();
  },
  async predict(text, _signal, opts) {
    const t0 = performance.now();
    const dsl = await parseH13Async(text, opts?.today, { zone: opts?.zone, locale: opts?.locale });
    return { dsl, ms: performance.now() - t0 };
  },
  dispose() {},
};
export default h13;
