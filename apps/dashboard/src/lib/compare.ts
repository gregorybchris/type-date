import { evalFor, splitScore } from "./evals";
import { isLibrary } from "./pareto";
import { SMALL_N } from "@/components/Breakdown";
import type { Run } from "./types";

export interface Cell {
  /** Resolved accuracy, 0..1. */
  acc: number;
  n: number;
  errors: number;
  small: boolean;
}

/** Score of one engine on one split of one eval version, or null when it was not scored there. */
export function cellFor(run: Run, version: string, split: string): Cell | null {
  const s = evalFor(run, version)?.by_split[split];
  if (!s || s.n === 0) return null;
  const acc = splitScore(s);
  return { acc, n: s.n, errors: Math.round(s.n * (1 - acc)), small: s.n < SMALL_N };
}

/** "test_external_hard" becomes "external_hard". */
export const splitLabel = (s: string): string => s.replace(/^test_/, "");

/**
 * One color per engine, from generation order: older engines are pale, newer ones use the accent.
 * The third-party library is neutral dark gray.
 */
export function engineColors(runs: Run[]): Map<string, string> {
  const own = runs.filter((r) => !isLibrary(r));
  const out = new Map<string, string>();
  own.forEach((r, i) => {
    const t = own.length === 1 ? 100 : Math.round(22 + (78 * i) / (own.length - 1));
    out.set(r.config.id, `color-mix(in srgb, var(--accent) ${t}%, var(--chart-dim))`);
  });
  for (const r of runs) if (isLibrary(r)) out.set(r.config.id, "color-mix(in srgb, var(--fg) 55%, var(--surface))");
  return out;
}

/** Twelve hues for lines, one per split. Stable by position in the split list. */
export const splitColor = (i: number): string => `hsl(${(i * 47) % 360} 58% 52%)`;

export const pc = (x: number, d = 1): string => `${(x * 100).toFixed(d)}%`;
