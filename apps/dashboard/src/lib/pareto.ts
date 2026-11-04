import { evalFor, realisticResolved } from "./evals";
import type { BenchEntry, Run } from "./types";

export type XAxis = "size" | "p50" | "p95";
export type YAxis = "resolved" | "realistic" | "exact";

export interface AxisInfo<K extends string> {
  key: K;
  label: string;
  unit: string;
}

export const X_AXES: AxisInfo<XAxis>[] = [
  { key: "size", label: "Gzip size", unit: "kB" },
  { key: "p50", label: "Latency p50", unit: "ms" },
  { key: "p95", label: "Latency p95", unit: "ms" },
];

export const Y_AXES: AxisInfo<YAxis>[] = [
  { key: "resolved", label: "Resolved accuracy", unit: "%" },
  { key: "realistic", label: "Realistic accuracy", unit: "%" },
  { key: "exact", label: "Exact accuracy", unit: "%" },
];

export interface Point {
  runId: string;
  number: number;
  label: string;
  title: string;
  description: string;
  library: boolean;
  x: number;
  y: number;
}

/** chrono-node is the only third-party library. Everything else is a heuristic written here. */
export const isLibrary = (run: Run): boolean => run.config.model.family === "library";

/** Engine id as used in @type-date/baselines. */
export const engineId = (run: Run): string => run.config.model.engine ?? run.config.title;

/** Desktop bench entry with the lowest p50, if the run has any. */
export function benchOf(run: Run): BenchEntry | undefined {
  return run.bench.filter((e) => (e.profile ?? "desktop") === "desktop").sort((a, b) => a.latency_ms.p50 - b.latency_ms.p50)[0];
}

/** Value on an x axis, or null when the run has no data for it (for example no latency bench). */
export function xValue(run: Run, axis: XAxis): number | null {
  if (axis === "size") return run.metrics.model.size_bytes / 1e3;
  const b = benchOf(run);
  if (!b) return null;
  return axis === "p50" ? b.latency_ms.p50 : b.latency_ms.p95;
}

export function yValue(run: Run, axis: YAxis, version: string): number | null {
  const ev = evalFor(run, version);
  if (!ev) return null;
  if (axis === "exact") return ev.exact;
  if (axis === "resolved") return ev.resolved;
  return realisticResolved(ev);
}

export interface PointResult {
  points: Point[];
  /** Runs left out, with the reason. */
  skipped: Array<{ run: Run; reason: string }>;
}

export function buildPoints(runs: Run[], o: { x: XAxis; y: YAxis; version: string }): PointResult {
  const points: Point[] = [];
  const skipped: PointResult["skipped"] = [];
  for (const run of runs) {
    const y = yValue(run, o.y, o.version);
    const x = xValue(run, o.x);
    if (y === null) {
      skipped.push({ run, reason: evalFor(run, o.version) ? `no ${o.y} splits on ${o.version}` : `not evaluated on ${o.version}` });
      continue;
    }
    if (x === null) {
      skipped.push({ run, reason: "no latency bench" });
      continue;
    }
    points.push({ runId: run.config.id, number: run.config.number, label: String(run.config.number), title: run.config.title, description: run.config.description ?? "", library: isLibrary(run), x, y });
  }
  return { points, skipped };
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

/** Step path through front points. */
export function frontPath(front: Array<{ x: number; y: number }>, sx: (v: number) => number, sy: (v: number) => number): string {
  if (!front.length) return "";
  let d = `M${sx(front[0]!.x).toFixed(1)},${sy(front[0]!.y).toFixed(1)}`;
  for (let i = 1; i < front.length; i++) {
    const p = front[i]!;
    d += `L${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`;
  }
  return d;
}
