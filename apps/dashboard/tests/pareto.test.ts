import { describe, expect, it } from "vitest";
import { bestSoFar, buildPoints, paretoFront } from "../src/lib/pareto";
import { diffDsl } from "../src/lib/diff";
import type { Run } from "../src/lib/types";

const p = (x: number, y: number) => ({ x, y });

describe("paretoFront", () => {
  it("keeps non-dominated points sorted by x", () => {
    const pts = [p(10, 0.8), p(5, 0.7), p(20, 0.95), p(15, 0.75), p(30, 0.9)];
    expect(paretoFront(pts)).toEqual([p(5, 0.7), p(10, 0.8), p(20, 0.95)]);
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

function run(n: number, exact: number, family = "m", p50 = 10): Run {
  return {
    config: { id: `exp-00${n}`, number: n, title: "t", created: "", dataset: "v001", format: "dsl-v1", parent: null, model: { family, params: family === "library" ? 0 : 8e6 }, train: {} },
    metrics: { eval: { exact, resolved: exact, n: 1, by_split: {}, by_tag: {}, by_modifier: {} }, model: { params: family === "library" ? 0 : 8e6, size_bytes: 9e6 } },
    bench: [
      { engine: "a", backend: "wasm", load_ms: 1, cold_first_ms: 1, latency_ms: { p50, p95: p50, p99: p50 }, memory_mb: 50, download_bytes: 9e6, n: 1, browser_accuracy: exact },
      { engine: "a", backend: "webgpu", load_ms: 1, cold_first_ms: 1, latency_ms: { p50: p50 / 2, p95: p50, p99: p50 }, memory_mb: 80, download_bytes: 9e6, n: 1 },
    ],
    manifest: null,
  };
}

describe("buildPoints", () => {
  const runs = [run(1, 0.8), run(2, 0.9, "library", 1)];
  it("uses the fastest bench entry per run by default", () => {
    const pts = buildPoints(runs, { x: "latency", y: "exact", perEngine: false });
    expect(pts.map((q) => q.x)).toEqual([5, 0.5]);
    expect(pts.map((q) => q.kind)).toEqual(["model", "baseline"]);
  });
  it("emits one point per engine entry", () => {
    expect(buildPoints(runs, { x: "memory", y: "exact", perEngine: true })).toHaveLength(4);
  });
  it("skips entries without browser accuracy", () => {
    expect(buildPoints([runs[0]!], { x: "latency", y: "browser", perEngine: true })).toHaveLength(1);
  });
  it("filters bench entries by profile", () => {
    const r = run(1, 0.8);
    r.bench.push({ ...r.bench[0]!, profile: "mobile-4x", latency_ms: { p50: 40, p95: 50, p99: 60 } });
    expect(buildPoints([r], { x: "latency", y: "exact", perEngine: false, profile: "mobile-4x" })[0]!.x).toBe(40);
    expect(buildPoints([r], { x: "latency", y: "exact", perEngine: false })[0]!.x).toBe(5);
    expect(buildPoints([r], { x: "latency", y: "exact", perEngine: false, profile: "mobile-6x" })).toHaveLength(0);
  });
  it("puts baselines at 0 params", () => {
    expect(buildPoints(runs, { x: "params", y: "exact", perEngine: false })[1]!.x).toBe(0);
  });
});

describe("bestSoFar", () => {
  it("is a running maximum ordered by number", () => {
    const out = bestSoFar([run(3, 0.7), run(1, 0.5), run(2, 0.9)]);
    expect(out.map((o) => o.best)).toEqual([0.5, 0.9, 0.9]);
  });
});

describe("diffDsl", () => {
  it("marks only differing tokens", () => {
    const d = diffDsl("d 10-02>10-05", "d 10-02>10-06");
    expect(d.expected.filter((t) => t.changed).map((t) => t.text)).toEqual(["05"]);
    expect(d.predicted.filter((t) => t.changed).map((t) => t.text)).toEqual(["06"]);
  });
  it("marks everything for different outputs", () => {
    const d = diffDsl("x", "d +1d");
    expect(d.expected.every((t) => t.changed)).toBe(true);
  });
  it("reports no change for equal strings", () => {
    expect(diffDsl("d fr", "d fr").predicted.some((t) => t.changed)).toBe(false);
  });
});
