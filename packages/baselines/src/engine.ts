import type { Engine, PredictOptions, PredictResult } from "@type-date/engines";

/** Wrap a synchronous text -> DSL function as an Engine. */
export function makeEngine(id: string, parse: (text: string, today?: string) => string): Engine {
  return {
    id,
    async load() {},
    async predict(text: string, _signal?: AbortSignal, opts?: PredictOptions): Promise<PredictResult> {
      const t0 = performance.now();
      const dsl = parse(text, opts?.today);
      return { dsl, ms: performance.now() - t0 };
    },
    dispose() {},
  };
}

/** Input preprocessing from specs/dsl.md: lowercase, collapse whitespace. */
export const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
