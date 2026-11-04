import { describe, expect, it } from "vitest";
import { diffDsl } from "../src/lib/diff";
import { benchOf, buildPoints, paretoFront } from "../src/lib/pareto";
import { SMALL_N, rowsFromScores } from "../src/components/Breakdown";
import type { Run } from "../src/lib/types";

const p = (x: number, y: number) => ({ x, y });

describe("paretoFront", () => {
  it("keeps non-dominated points sorted by x", () => {
    expect(paretoFront([p(10, 0.8), p(5, 0.7), p(20, 0.95), p(15, 0.75), p(30, 0.9)])).toEqual([p(5, 0.7), p(10, 0.8), p(20, 0.95)]);
  });
  it("drops a point with the same x and lower y", () => {
    expect(paretoFront([p(5, 0.7), p(5, 0.9)])).toEqual([p(5, 0.9)]);
  });
  it("keeps exact duplicates", () => {
    expect(paretoFront([p(5, 0.9), p(5, 0.9)])).toHaveLength(2);
  });
  it("drops a point with higher x and equal y", () => {
    expect(paretoFront([p(5, 0.9), p(8, 0.9)])).toEqual([p(5, 0.9)]);
  });
  it("handles empty input", () => {
    expect(paretoFront([])).toEqual([]);
  });
});

function run(n: number, exact: number, family = "heuristic", p50?: number): Run {
  return {
    config: { id: family === "library" ? "chrono" : `h${n}`, title: "t", created: "" },
    metrics: { eval: { version: "e1", exact, resolved: exact, n: 1, by_split: {}, by_tag: {}, by_modifier: {} }, model: { size_bytes: 9000 } },
    bench: p50 === undefined ? [] : [{ engine: "a", latency_ms: { p50, p95: p50 * 3, p99: p50 * 4 }, n: 1 }, { engine: "a", profile: "mobile-4x", latency_ms: { p50: 99, p95: 99, p99: 99 }, n: 1 }],
  };
}

describe("buildPoints", () => {
  const runs = [run(1, 0.8, "heuristic", 5), run(2, 0.9, "library", 1), run(3, 0.7)];
  it("plots latency from desktop entries", () => {
    const { points } = buildPoints(runs, { x: "p95", y: "exact", version: "e1" });
    expect(points.map((q) => q.x)).toEqual([15, 3]);
    expect(points.map((q) => q.library)).toEqual([false, true]);
  });
  it("reports runs without latency data instead of dropping them silently", () => {
    const { skipped } = buildPoints(runs, { x: "p50", y: "exact", version: "e1" });
    expect(skipped.map((s) => [s.run.config.id, s.reason])).toEqual([["h3", "no latency data"]]);
  });
  it("always has size", () => {
    expect(buildPoints(runs, { x: "size", y: "exact", version: "e1" }).points).toHaveLength(3);
  });
  it("reports runs not evaluated on the version", () => {
    const r = buildPoints(runs, { x: "size", y: "exact", version: "e9" });
    expect(r.points).toHaveLength(0);
    expect(r.skipped[0]!.reason).toBe("not evaluated on e9");
  });
  it("picks the fastest desktop entry", () => {
    expect(benchOf(runs[0]!)?.latency_ms.p50).toBe(5);
  });
});

describe("diffDsl", () => {
  it("marks only differing tokens", () => {
    const d = diffDsl("d 10-02>10-05", "d 10-02>10-06");
    expect(d.expected.filter((t) => t.changed).map((t) => t.text)).toEqual(["05"]);
    expect(d.predicted.filter((t) => t.changed).map((t) => t.text)).toEqual(["06"]);
  });
  it("marks everything for different outputs", () => {
    expect(diffDsl("x", "d +1d").expected.every((t) => t.changed)).toBe(true);
  });
  it("reports no change for equal strings", () => {
    expect(diffDsl("d fr", "d fr").predicted.some((t) => t.changed)).toBe(false);
  });
});

describe("rowsFromScores", () => {
  it("derives error counts from accuracy and n", () => {
    expect(rowsFromScores({ a: { n: 82, exact: 0 }, b: { n: 3268, exact: 0.0076499388 } })).toEqual([
      { key: "a", n: 82, errors: 82 },
      { key: "b", n: 3268, errors: 3243 },
    ]);
  });
  it("uses 30 as the small-sample threshold", () => {
    expect(SMALL_N).toBe(30);
  });
});
