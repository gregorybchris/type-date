import type { EvalBlock, Run } from "./types";

/** Version of the run's main eval block. Missing means e1. */
export const ownVersion = (r: Run): string => r.metrics.eval.version ?? "e1";

/** Results for one eval version, or null when the run was not scored on it. */
export function evalFor(r: Run, version: string): EvalBlock | null {
  if (ownVersion(r) === version) return r.metrics.eval;
  return r.metrics.evals?.[version] ?? null;
}

/** Order versions: pre-e1, e1, e1q, e2 ... */
export function versionKey(v: string): number {
  if (v.startsWith("pre")) return -1;
  const m = v.match(/^e(\d+)(.*)$/);
  return m ? Number(m[1]) + (m[2] ? 0.5 : 0) : 1e6;
}

export function versionsOf(runs: Run[]): Array<{ version: string; count: number }> {
  const counts = new Map<string, number>();
  for (const r of runs) {
    for (const v of new Set([ownVersion(r), ...Object.keys(r.metrics.evals ?? {})])) counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return [...counts].map(([version, count]) => ({ version, count })).sort((a, b) => versionKey(a.version) - versionKey(b.version));
}

export type VersionKind = "full" | "quick" | "other";

/** Full sets (e1, e2), quick screening subsets (e1q), anything else (pre-e1, real-dev). */
export function kindOf(v: string): VersionKind {
  if (/^e\d+$/.test(v)) return "full";
  if (/^e\d+q$/.test(v)) return "quick";
  return "other";
}

/** Minimum scored experiments for a version to be the default. */
export const MIN_SCORED = 3;

/**
 * Default version: the latest full version with at least MIN_SCORED experiments scored.
 * Falls back to the best-covered full version, then quick versions, then anything.
 */
export function defaultVersion(runs: Run[]): string {
  const vs = versionsOf(runs);
  const pick = (kind: VersionKind) => {
    const of = vs.filter((v) => kindOf(v.version) === kind).sort((a, b) => versionKey(b.version) - versionKey(a.version));
    return of.find((v) => v.count >= MIN_SCORED) ?? [...of].sort((a, b) => b.count - a.count || versionKey(b.version) - versionKey(a.version))[0];
  };
  const full = pick("full");
  if (full && full.count >= MIN_SCORED) return full.version;
  const quick = pick("quick");
  if (quick && quick.count >= MIN_SCORED) return quick.version;
  return (full ?? quick ?? pick("other") ?? vs[0])?.version ?? "e1";
}

/** Splits that approximate real use: realistic LLM-written input and the hard set. */
export const REALISTIC_SPLITS = ["test_external", "test_external_hard"] as const;

/** Resolved accuracy over the realistic splits, weighted by row count. Null when none were scored. */
export function realisticResolved(ev: EvalBlock | null | undefined): number | null {
  if (!ev) return null;
  let n = 0;
  let sum = 0;
  for (const k of REALISTIC_SPLITS) {
    const s = ev.by_split[k];
    if (s && s.n > 0) {
      n += s.n;
      sum += s.n * (s.resolved ?? s.exact);
    }
  }
  return n ? sum / n : null;
}

export const isInvalidVersion = (v: string) => v.startsWith("pre");

export interface Scored {
  run: Run;
  /** Null when the run has no results for the selected version. */
  ev: EvalBlock | null;
}

export const scoreAll = (runs: Run[], version: string): Scored[] => runs.map((run) => ({ run, ev: evalFor(run, version) }));

export const notEvaluatedNote = (run: Run, version: string): string =>
  isInvalidVersion(ownVersion(run)) ? `Invalid run (${ownVersion(run)}). Not evaluated on ${version}.` : `Not evaluated on ${version}`;
