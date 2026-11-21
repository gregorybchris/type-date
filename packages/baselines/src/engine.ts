export interface PredictResult {
  /** DSL line, see specs/dsl.md */
  dsl: string;
  /** Wall time of this call in milliseconds */
  ms: number;
}

export interface PredictOptions {
  /** Reference day as YYYY-MM-DD. Only chrono-node uses it. */
  today?: string;
  /** The user's IANA time zone. h13 uses it to pick among ambiguous zone abbreviations (IST, CST, BST). */
  zone?: string;
  /** The user's locale (for example `en-IN`). h13 uses its region the same way. */
  locale?: string;
}

/** A text to DSL parser. `load` and `dispose` exist for engines that need setup; the heuristics do nothing. */
export interface Engine {
  readonly id: string;
  load(opts?: unknown): Promise<void>;
  predict(text: string, signal?: AbortSignal, opts?: PredictOptions): Promise<PredictResult>;
  dispose(): void;
}

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
