import { evalFor } from "./evals";
import type { BenchEntry, Run } from "./types";

export type XAxis = "latency" | "memory" | "size" | "params";
export type YAxis = "exact" | "resolved" | "browser";

export interface AxisInfo<K extends string> {
  key: K;
  label: string;
  unit: string;
}

export const X_AXES: AxisInfo<XAxis>[] = [
  { key: "latency", label: "p50 latency", unit: "ms" },
  { key: "memory", label: "Memory", unit: "MB" },
  { key: "size", label: "Download size", unit: "MB" },
  { key: "params", label: "Parameters", unit: "M" },
];

export const Y_AXES: AxisInfo<YAxis>[] = [
  { key: "exact", label: "Exact accuracy", unit: "%" },
  { key: "resolved", label: "Resolved accuracy", unit: "%" },
  { key: "browser", label: "Browser accuracy", unit: "%" },
];

export type EntryKind = "model" | "baseline";

export interface Point {
  /** Unique key: run id plus engine and backend. */
  key: string;
  runId: string;
  number: number;
  label: string;
  title: string;
  description: string;
  family: string;
  engine: string;
  backend: string;
  kind: EntryKind;
  x: number;
  y: number;
  /** Params in millions, used for bubble size. */
  paramsM: number;
}

export const FAMILIES = ["heuristic", "library", "zero-shot", "finetune", "scratch"] as const;

/** Maps config.model.family onto the five groups. Unknown values are kept as they are. */
export function familyOf(run: Run): string {
  const f = run.config.model.family;
  if ((FAMILIES as readonly string[]).includes(f)) return f;
  if (f.includes("scratch")) return "scratch";
  if (f.includes("zero")) return "zero-shot";
  if (f.includes("heuristic")) return "heuristic";
  if (f.includes("library")) return "library";
  return "finetune";
}

/** Non-model entries: library and heuristic parsers. */
export function isBaseline(run: Run): boolean {
  const f = familyOf(run);
  return f === "library" || f === "heuristic";
}

export function xValue(run: Run, entry: BenchEntry | undefined, axis: XAxis): number | null {
  switch (axis) {
    case "latency":
      return entry ? entry.latency_ms.p50 : null;
    case "memory":
      return entry ? entry.memory_mb : null;
    case "size":
      return (entry?.download_bytes ?? run.metrics.model.size_bytes) / 1e6;
    case "params":
      return run.metrics.model.params / 1e6;
  }
}

export function yValue(run: Run, entry: BenchEntry | undefined, axis: YAxis, version = "e1"): number | null {
  const ev = evalFor(run, version);
  if (!ev) return null;
  if (axis === "exact") return ev.exact;
  if (axis === "resolved") return ev.resolved;
  return entry?.browser_accuracy ?? null;
}

export const PROFILES = ["desktop", "mobile-4x", "mobile-6x"] as const;
export type Profile = (typeof PROFILES)[number];

export function profileOf(e: BenchEntry): string {
  return e.profile ?? "desktop";
}

export function benchFor(run: Run, profile: string): BenchEntry[] {
  return run.bench.filter((e) => profileOf(e) === profile);
}

/** Fastest bench entry for a profile. */
export function bestBench(run: Run, profile: string = "desktop"): BenchEntry | undefined {
  return [...benchFor(run, profile)].sort((a, b) => a.latency_ms.p50 - b.latency_ms.p50)[0];
}

export interface PointOptions {
  x: XAxis;
  y: YAxis;
  /** One point per bench entry instead of the fastest entry per run. */
  perEngine: boolean;
  /** Eval version. Runs without results for it are left out. Defaults to the run's own version. */
  version?: string;
  /** Bench profile. Defaults to desktop. */
  profile?: string;
}

export function buildPoints(runs: Run[], o: PointOptions): Point[] {
  const out: Point[] = [];
  for (const run of runs) {
    const profile = o.profile ?? "desktop";
    const own = benchFor(run, profile);
    const entries: Array<BenchEntry | undefined> = o.perEngine ? (own.length ? own : [undefined]) : [bestBench(run, profile)];
    for (const e of entries) {
      const x = xValue(run, e, o.x);
      const y = yValue(run, e, o.y, o.version ?? (run.metrics.eval.version ?? "e1"));
      if (x === null || y === null) continue;
      out.push({
        key: `${run.config.id}|${e?.engine ?? "-"}|${e?.backend ?? "-"}|${profile}`,
        runId: run.config.id,
        number: run.config.number,
        label: String(run.config.number),
        title: run.config.title,
        description: run.config.description ?? "",
        family: familyOf(run),
        engine: e?.engine ?? "-",
        backend: e?.backend ?? "-",
        kind: isBaseline(run) ? "baseline" : "model",
        x,
        y,
        paramsM: run.metrics.model.params / 1e6,
      });
    }
  }
  return out;
}

/**
 * Pareto front for "lower x is better, higher y is better".
 * A point is dominated if another point has x <= and y >= with at least one strict.
 * Returned sorted by x ascending, then y descending. Points with identical (x, y) are all kept.
 */
export function paretoFront<T extends { x: number; y: number }>(points: T[]): T[] {
  const sorted = [...points].sort((a, b) => a.x - b.x || b.y - a.y);
  const front: T[] = [];
  let bestY = -Infinity;
  for (const p of sorted) {
    const last = front[front.length - 1];
    if (p.y > bestY) {
      front.push(p);
      bestY = p.y;
    } else if (last && p.y === bestY && p.x === last.x) {
      front.push(p);
    }
  }
  return front;
}

/** Step path through front points, as used for "best so far at this cost". */
export function frontPath(front: Array<{ x: number; y: number }>, sx: (v: number) => number, sy: (v: number) => number): string {
  if (!front.length) return "";
  let d = `M${sx(front[0]!.x).toFixed(1)},${sy(front[0]!.y).toFixed(1)}`;
  for (let i = 1; i < front.length; i++) {
    const p = front[i]!;
    d += `L${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`;
  }
  return d;
}

/** Best exact accuracy so far, by experiment number. */
export function bestSoFar(runs: Run[], version?: string): Array<{ number: number; id: string; title: string; exact: number; best: number }> {
  const sorted = [...runs].sort((a, b) => a.config.number - b.config.number);
  let best = 0;
  const out: Array<{ number: number; id: string; title: string; exact: number; best: number }> = [];
  for (const r of sorted) {
    const ev = evalFor(r, version ?? (r.metrics.eval.version ?? "e1"));
    if (!ev) continue;
    best = Math.max(best, ev.exact);
    out.push({ number: r.config.number, id: r.config.id, title: r.config.title, exact: ev.exact, best });
  }
  return out;
}
