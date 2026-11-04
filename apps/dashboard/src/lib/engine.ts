import type { Manifest } from "./types";

// Interface from specs/contracts.md. Kept local so the dashboard builds without packages/engines.
export interface PredictResult {
  dsl: string;
  ms: number;
  outputTokens?: number;
}
export interface LoadOptions {
  baseUrl: string;
  manifest: Manifest;
  backend?: "wasm" | "webgpu";
  onProgress?: (p: number) => void;
}
export interface Engine {
  readonly id: string;
  load(opts: LoadOptions): Promise<void>;
  predict(text: string, signal?: AbortSignal): Promise<PredictResult>;
  dispose(): void;
}

export interface EngineHandle {
  engine: Engine;
  /** "real" when it came from @type-date/engines, "mock" for the fallback. */
  source: "real" | "mock";
  /** Why the mock is used, if it is. */
  reason?: string;
}

const MOCK_PHRASES: Record<string, string> = {
  "oct 2 to oct 5": "d 10-02>10-05",
  "oct 2": "d 10-02",
  "last friday": "d fr-1",
  "next friday": "d fr+1",
  friday: "d fr",
  tomorrow: "d +1d",
  today: "d +0d",
  yesterday: "d -1d",
  "every other sunday": "d R w/2 su",
  "every tuesday": "d R w/1 tu",
  "4 to 4:30": "t 4?>4:30?",
  "tomorrow at 3pm": "dt +1d 15:00",
  "next monday 9am to 5pm": "dt mo+1 09:00>17:00",
  "dec 25": "d 12-25",
  "in 2 weeks": "d +2w",
  "every weekday at 9": "dt R d/1 mo,tu,we,th,fr 9?",
  "first monday of march": "d mo#1@03",
  "monthly on the 15th": "d R m/1 d15",
  noon: "t 12:00",
  "next week": "d W+1",
  october: "d M@10",
  "jan 5 at 7pm": "dt 01-05 19:00",
};
const MON = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function mockParse(text: string): string {
  const t = text.trim().toLowerCase().replace(/\s+/g, " ");
  const hit = MOCK_PHRASES[t];
  if (hit) return hit;
  const m = t.match(/^([a-z]{3})[a-z]* (\d{1,2})$/);
  const mi = m ? MON.indexOf(m[1]!) : -1;
  if (m && mi >= 0) return `d ${String(mi + 1).padStart(2, "0")}-${m[2]!.padStart(2, "0")}`;
  return "x";
}

/** Fallback engine: a few hard-coded phrases, with simulated latency. */
export class MockEngine implements Engine {
  readonly id = "mock";
  private p50 = 12;
  constructor(p50?: number) {
    if (p50) this.p50 = p50;
  }
  async load(opts: LoadOptions): Promise<void> {
    for (let i = 1; i <= 5; i++) {
      await new Promise((r) => setTimeout(r, 90));
      opts.onProgress?.(i / 5);
    }
  }
  async predict(text: string, signal?: AbortSignal): Promise<PredictResult> {
    const t0 = performance.now();
    await new Promise((r) => setTimeout(r, Math.max(1, this.p50 * (0.7 + Math.random() * 0.6))));
    if (signal?.aborted) throw new DOMException("aborted", "AbortError");
    const dsl = mockParse(text);
    return { dsl, ms: performance.now() - t0, outputTokens: dsl.length };
  }
  dispose(): void {}
}

interface EnginesModule {
  createEngine?: (id: string) => Engine;
  engines?: Record<string, () => Engine>;
}

/**
 * Seam to packages/engines. Tries `createEngine(manifest.engine)` (proposed contract),
 * then an `engines` registry. Falls back to the mock engine when the package is missing
 * or does not know the engine id.
 */
export async function getEngine(manifest: Manifest | null, p50Hint?: number): Promise<EngineHandle> {
  if (!manifest) return { engine: new MockEngine(p50Hint), source: "mock", reason: "no manifest for this experiment" };
  try {
    const mod = (await import("@type-date/engines")) as EnginesModule;
    const engine = mod.createEngine?.(manifest.engine) ?? mod.engines?.[manifest.engine]?.();
    if (engine) return { engine, source: "real" };
    return { engine: new MockEngine(p50Hint), source: "mock", reason: `engines package has no "${manifest.engine}"` };
  } catch {
    return { engine: new MockEngine(p50Hint), source: "mock", reason: "@type-date/engines is not available" };
  }
}
