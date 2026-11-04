import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { facetErrors, filterErrors, loadDatasets, loadRuns, queryErrors, querySamples, type Roots } from "../server/data";
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

function seedRun(dir: string, id: string, number: number) {
  write(path.join(dir, id, "config.json"), { id, number, title: id, model: { family: "x", params: 1 } });
  write(path.join(dir, id, "metrics.json"), { eval: { exact: 0.5 }, model: { params: 1, size_bytes: 1 } });
}

beforeAll(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "td-dash-"));
  roots = { repo: path.join(tmp, "repo"), fixtures: path.join(tmp, "fix") };
  fs.mkdirSync(roots.repo, { recursive: true });
  seedRun(path.join(roots.fixtures, "runs"), "exp-002", 2);
  seedRun(path.join(roots.fixtures, "runs"), "exp-001", 1);
  const errs = [err("a", "t1", ["typo"], "val"), err("b", "t2", [], "val", "friday"), err("c", "t1", [], "test_noise")];
  write(path.join(roots.fixtures, "runs", "exp-001", "errors.jsonl"), errs.map((e) => JSON.stringify(e)).join("\n") + "\nnot json\n");
  write(path.join(roots.fixtures, "data", "v001", "meta.json"), { version: "v001", created: "", counts: { train: 2 }, by_tag: {} });
  const sample = (id: string, text: string) => ({ id, text, dsl: "d fr", primary_tag: "weekday-bare", modifier_tags: ["abbreviation"], source: "grammar", split: "train", parent_id: null });
  write(path.join(roots.fixtures, "data", "v001", "train.jsonl"), [sample("1", "fri"), sample("2", "friday")].map((s) => JSON.stringify(s)).join("\n") + "\n");
});

afterAll(() => fs.rmSync(tmp, { recursive: true, force: true }));

describe("loadRuns", () => {
  it("uses fixtures and flags sample data when repo runs/ is missing", () => {
    const r = loadRuns(roots);
    expect(r.sample).toBe(true);
    expect(r.runs.map((x) => x.config.id)).toEqual(["exp-001", "exp-002"]);
    expect(r.runs[0]!.bench).toEqual([]);
  });
  it("prefers real runs when present", () => {
    seedRun(path.join(roots.repo, "runs"), "exp-001", 1);
    const r = loadRuns(roots);
    expect(r.sample).toBe(false);
    expect(r.runs).toHaveLength(1);
    fs.rmSync(path.join(roots.repo, "runs"), { recursive: true });
  });
  it("attaches a manifest from artifacts/", () => {
    write(path.join(roots.repo, "artifacts", "exp-001", "manifest.json"), { experiment: "exp-001", engine: "e", files: {}, config: {} });
    expect(loadRuns(roots).runs[0]!.manifest?.engine).toBe("e");
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
    const page = queryErrors(roots, "exp-001", { limit: 2, offset: 1 })!;
    expect(page.total).toBe(3);
    expect(page.items.map((r) => r.id)).toEqual(["b", "c"]);
  });
  it("rejects bad ids and unknown runs", () => {
    expect(queryErrors(roots, "../etc", {})).toBeNull();
    expect(queryErrors(roots, "exp-099", {})).toBeNull();
  });
  it("returns empty list when errors.jsonl is missing", () => {
    expect(queryErrors(roots, "exp-002", {})!.total).toBe(0);
  });
});

describe("datasets", () => {
  it("lists versions", () => {
    expect(loadDatasets(roots).datasets.map((d) => d.version)).toEqual(["v001"]);
  });
  it("filters samples and rejects bad versions", () => {
    expect(querySamples(roots, "v001", { q: "friday" })!.total).toBe(1);
    expect(querySamples(roots, "v001", { split: "train", modifier: "abbreviation" })!.total).toBe(2);
    expect(querySamples(roots, "../x", {})).toBeNull();
    expect(querySamples(roots, "v009", {})).toBeNull();
  });
});
