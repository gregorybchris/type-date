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

/** The version with the most results. Ties go to the latest version. */
export function defaultVersion(runs: Run[]): string {
  const vs = versionsOf(runs);
  let best = vs[0];
  for (const v of vs) if (!best || v.count > best.count || (v.count === best.count && versionKey(v.version) > versionKey(best.version))) best = v;
  return best?.version ?? "e1";
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
