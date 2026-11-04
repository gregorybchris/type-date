import { describe, expect, it } from "vitest";
import { defaultVersion, evalFor, versionKey, versionsOf } from "../src/lib/evals";
import { familyOf } from "../src/lib/pareto";
import type { EvalBlock, Run } from "../src/lib/types";

const block = (exact: number, version?: string): EvalBlock => ({ version, exact, resolved: exact, n: 10, by_split: {}, by_tag: {}, by_modifier: {} });
function run(n: number, own: string | undefined, extra: Record<string, EvalBlock> = {}, family = "scratch"): Run {
  return {
    config: { id: `exp-00${n}`, number: n, title: "t", created: "", dataset: "v1", format: "f", parent: null, model: { family, params: 1 }, train: {} },
    metrics: { eval: block(0.5, own), evals: extra, model: { params: 1, size_bytes: 1 } },
    bench: [],
    manifest: null,
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
});

describe("familyOf", () => {
  it("maps names onto the five families", () => {
    expect(familyOf(run(1, "e1", {}, "enc-dec-scratch"))).toBe("scratch");
    expect(familyOf(run(1, "e1", {}, "t5-small"))).toBe("finetune");
    expect(familyOf(run(1, "e1", {}, "zero-shot"))).toBe("zero-shot");
    expect(familyOf(run(1, "e1", {}, "heuristic"))).toBe("heuristic");
  });
});

import { kindOf, realisticResolved } from "../src/lib/evals";

describe("default version and realistic split", () => {
  it("classifies versions", () => {
    expect([kindOf("e3"), kindOf("e3q"), kindOf("pre-e1"), kindOf("real-dev")]).toEqual(["full", "quick", "other", "other"]);
  });
  it("prefers the latest full version with at least 3 scored, even if a quick one has more", () => {
    const runs = [1, 2, 3].map((n) => run(n, "e1", { e3: block(0.5) }));
    const many = [...runs, ...[4, 5, 6, 7].map((n) => run(n, "e1q"))];
    expect(defaultVersion(many)).toBe("e3");
    expect(defaultVersion([run(1, "e1", { e3: block(0.5) }), ...[2, 3].map((n) => run(n, "e1"))])).toBe("e1");
  });
  it("weights the realistic splits by row count", () => {
    const ev = block(0.5);
    ev.by_split = { test_external: { n: 300, exact: 0.9, resolved: 0.9 }, test_external_hard: { n: 100, exact: 0.5 }, val: { n: 1000, exact: 1 } };
    expect(realisticResolved(ev)).toBeCloseTo((300 * 0.9 + 100 * 0.5) / 400);
    expect(realisticResolved(block(0.5))).toBeNull();
  });
});
