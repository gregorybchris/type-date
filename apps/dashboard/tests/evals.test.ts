import { describe, expect, it } from "vitest";
import { defaultVersion, evalFor, fullVersions, hardResolved, kindOf, realisticResolved, splitsOf, versionKey, versionsOf } from "../src/lib/evals";
import { cellFor, engineColors } from "../src/lib/compare";
import type { EvalBlock, Run } from "../src/lib/types";

const block = (exact: number, version?: string): EvalBlock => ({ version, exact, resolved: exact, n: 10, by_split: {}, by_tag: {}, by_modifier: {} });
function run(n: number, own: string | undefined, extra: Record<string, EvalBlock> = {}, family = "heuristic"): Run {
  return {
    config: { id: `exp-00${n}`, number: n, title: "t", created: "", parent: null, model: { family } },
    metrics: { eval: block(0.5, own), evals: extra, model: { size_bytes: 1 } },
    bench: [],
  };
}

describe("eval versions", () => {
  const runs = [run(1, "e1"), run(2, "e1", { e1q: block(0.4) }), run(3, "e1", { e1q: block(0.45) }), run(4, "pre-e1")];
  it("orders versions", () => {
    expect(["e2", "e1q", "pre-e1", "e1"].sort((a, b) => versionKey(a) - versionKey(b))).toEqual(["pre-e1", "e1", "e1q", "e2"]);
  });
  it("counts results per version", () => {
    expect(versionsOf(runs)).toEqual([{ version: "pre-e1", count: 1 }, { version: "e1", count: 3 }, { version: "e1q", count: 2 }]);
  });
  it("lists full versions only", () => {
    expect(fullVersions(runs)).toEqual(["e1"]);
  });
  it("defaults to the version with most results", () => {
    expect(defaultVersion(runs)).toBe("e1");
  });
  it("breaks ties toward the latest version", () => {
    expect(defaultVersion([run(1, "e1", { e2: block(0.3) })])).toBe("e2");
  });
  it("returns null for a missing version and treats no version as e1", () => {
    expect(evalFor(runs[0]!, "e1q")).toBeNull();
    expect(evalFor(run(5, undefined), "e1")?.exact).toBe(0.5);
    expect(evalFor(runs[1]!, "e1q")?.exact).toBe(0.4);
  });
  it("classifies versions", () => {
    expect([kindOf("e3"), kindOf("e3q"), kindOf("pre-e1"), kindOf("real-dev")]).toEqual(["full", "quick", "other", "other"]);
  });
  it("prefers the latest full version with at least 3 scored, even if a quick one has more", () => {
    const runs3 = [1, 2, 3].map((n) => run(n, "e1", { e3: block(0.5) }));
    const many = [...runs3, ...[4, 5, 6, 7].map((n) => run(n, "e1q"))];
    expect(defaultVersion(many)).toBe("e3");
    expect(defaultVersion([run(1, "e1", { e3: block(0.5) }), ...[2, 3].map((n) => run(n, "e1"))])).toBe("e1");
  });
});

describe("splits", () => {
  it("weights the realistic splits by row count", () => {
    const ev = block(0.5);
    ev.by_split = { test_external: { n: 300, exact: 0.9, resolved: 0.9 }, test_external_hard: { n: 100, exact: 0.5 }, val: { n: 1000, exact: 1 } };
    expect(realisticResolved(ev)).toBeCloseTo((300 * 0.9 + 100 * 0.5) / 400);
    expect(realisticResolved(block(0.5))).toBeNull();
  });
  it("treats external and public split names as realistic and hard by name", () => {
    const ev = block(0.5);
    ev.by_split = { test_public_dev: { n: 100, exact: 0.6 }, test_external_hard: { n: 100, exact: 0.2 }, test_template: { n: 999, exact: 1 } };
    expect(realisticResolved(ev)).toBeCloseTo(0.4);
    expect(hardResolved(ev)).toBeCloseTo(0.2);
  });
  it("takes the union of splits across engines and flags small cells", () => {
    const a = run(1, "e1");
    a.metrics.eval.by_split = { val: { n: 100, exact: 0.9 } };
    const b = run(2, "e1");
    b.metrics.eval.by_split = { val: { n: 100, exact: 0.8 }, test_x: { n: 12, exact: 0.5, resolved: 0.75 } };
    expect(splitsOf([a, b], "e1")).toEqual(["val", "test_x"]);
    expect(cellFor(a, "e1", "test_x")).toBeNull();
    expect(cellFor(b, "e1", "test_x")).toEqual({ acc: 0.75, n: 12, errors: 3, small: true });
  });
  it("gives every engine a color", () => {
    const rs = [run(1, "e1", {}, "library"), run(2, "e1"), run(3, "e1")];
    expect(engineColors(rs).size).toBe(3);
  });
});
