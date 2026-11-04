import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { evalSummary, facetErrors, filterErrors, loadEvalManifests, loadRuns, queryErrors, querySamples, type Roots } from "../server/data";
import type { ErrorRow } from "../src/lib/types";

let tmp: string;
let roots: Roots;

const err = (id: string, tag: string, mods: string[], split: string, text = "oct 2"): ErrorRow => ({
  id, text, split, primary_tag: tag, modifier_tags: mods, expected: "d 10-02", predicted: "x",
});

function write(file: string, v: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, typeof v === "string" ? v : JSON.stringify(v));
}

function seedRun(dir: string, id: string) {
  write(path.join(dir, id, "config.json"), { id, title: id });
  write(path.join(dir, id, "metrics.json"), { eval: { exact: 0.5 }, model: { size_bytes: 1 } });
}

beforeAll(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "td-dash-"));
  roots = { repo: path.join(tmp, "repo") };
  fs.mkdirSync(roots.repo, { recursive: true });
  seedRun(path.join(roots.repo, "runs"), "h10");
  seedRun(path.join(roots.repo, "runs"), "h2");
  seedRun(path.join(roots.repo, "runs"), "chrono");
  seedRun(path.join(roots.repo, "runs"), "h1");
  const errs = [err("a", "t1", ["typo"], "val"), err("b", "t2", [], "val", "friday"), err("c", "t1", [], "test_noise")];
  write(path.join(roots.repo, "runs", "h1", "errors", "e1.jsonl"), errs.map((e) => JSON.stringify(e)).join("\n") + "\nnot json\n");
  write(path.join(roots.repo, "evals", "e1", "manifest.json"), { version: "e1", reason: "first" });
  const sample = (id: string, text: string, source: string) => ({ id, text, dsl: "d fr", primary_tag: "weekday-bare", modifier_tags: ["abbreviation"], source, split: "val", parent_id: null });
  write(path.join(roots.repo, "evals", "e1", "val.jsonl"), [sample("1", "fri", "grammar"), sample("2", "friday", "noise")].map((x) => JSON.stringify(x)).join("\n") + "\n");
});

afterAll(() => fs.rmSync(tmp, { recursive: true, force: true }));

describe("loadRuns", () => {
  it("reads runs with chrono first, then h1, h2, ... by number", () => {
    const r = loadRuns(roots);
    expect(r.runs.map((x) => x.config.id)).toEqual(["chrono", "h1", "h2", "h10"]);
    expect(r.runs[1]!.bench).toEqual([]);
  });
  it("returns no runs when runs/ is missing", () => {
    expect(loadRuns({ repo: path.join(tmp, "none") }).runs).toEqual([]);
  });
});

describe("errors", () => {
  it("filters by tag, modifier, split and text", () => {
    const rows = [err("a", "t1", ["typo"], "val"), err("b", "t2", [], "val", "friday"), err("c", "t1", [], "test_noise")];
    expect(filterErrors(rows, { tag: "t1" }).map((r) => r.id)).toEqual(["a", "c"]);
    expect(filterErrors(rows, { modifier: "typo" }).map((r) => r.id)).toEqual(["a"]);
    expect(filterErrors(rows, { split: "test_noise" }).map((r) => r.id)).toEqual(["c"]);
    expect(filterErrors(rows, { q: "FRI" }).map((r) => r.id)).toEqual(["b"]);
  });
  it("counts facets", () => {
    const f = facetErrors([err("a", "t1", ["typo"], "val"), err("c", "t1", [], "val")]);
    expect(f.by_tag).toEqual({ t1: 2 });
    expect(f.by_modifier).toEqual({ typo: 1 });
  });
  it("paginates and skips malformed lines", () => {
    const page = queryErrors(roots, "h1", "e1", { limit: 2, offset: 1 })!;
    expect(page.total).toBe(3);
    expect(page.items.map((r) => r.id)).toEqual(["b", "c"]);
  });
  it("rejects bad ids and unknown runs", () => {
    expect(queryErrors(roots, "../etc", "e1", {})).toBeNull();
    expect(queryErrors(roots, "h99", "e1", {})).toBeNull();
  });
  it("returns empty list when errors.jsonl is missing", () => {
    expect(queryErrors(roots, "h2", "e1", {})!.total).toBe(0);
  });
});

describe("eval sets", () => {
  it("lists manifests", () => {
    expect(loadEvalManifests(roots).evals.map((d) => d.version)).toEqual(["e1"]);
  });
  it("counts rows per split and source", () => {
    expect(evalSummary(roots, "e1")!.splits.val).toEqual({ n: 2, sources: { grammar: 1, noise: 1 } });
  });
  it("filters samples and rejects bad versions", () => {
    expect(querySamples(roots, "e1", { q: "friday" })!.total).toBe(1);
    expect(querySamples(roots, "e1", { source: "grammar" })!.total).toBe(1);
    expect(querySamples(roots, "../x", {})).toBeNull();
    expect(querySamples(roots, "e9", {})).toBeNull();
  });
});
