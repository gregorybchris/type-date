// Data layer: reads runs/ and data/ (or sample fixtures) from disk. Used by the Vite plugin and tests.
import fs from "node:fs";
import path from "node:path";
import type {
  EvalManifest,
  EvalsResponse,
  EvalSummary,
  ErrorQuery,
  ErrorRow,
  ErrorsResponse,
  Facets,
  Run,
  RunsResponse,
  Sample,
  SampleQuery,
  SamplesResponse,
} from "../src/lib/types";

export interface Roots {
  /** Repo root that holds runs/ and evals/. */
  repo: string;
}

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return null;
  }
}

function listDirs(dir: string, pattern: RegExp): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && pattern.test(e.name))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

const RUN_RE = /^exp-\d+/;
const EVAL_RE = /^[\w-]+$/;

export function loadRuns(roots: Roots): RunsResponse {
  const dir = path.join(roots.repo, "runs");
  const runs: Run[] = [];
  for (const id of listDirs(dir, RUN_RE)) {
    const base = path.join(dir, id);
    const config = readJson<Run["config"]>(path.join(base, "config.json"));
    const metrics = readJson<Run["metrics"]>(path.join(base, "metrics.json"));
    if (!config || !metrics) continue;
    // One latency source for every engine: the Node per-call timing that scripts/eval.ts writes into metrics.json.
    const nl = (metrics as { node_latency_ms?: { p50: number; p95: number; p99: number; n?: number } }).node_latency_ms;
    const bench: Run["bench"] = nl
      ? [{ engine: config.model?.engine ?? config.id, profile: "desktop", latency_ms: { p50: nl.p50, p95: nl.p95, p99: nl.p99 }, n: nl.n ?? 0 }]
      : (readJson<Run["bench"]>(path.join(base, "bench.json")) ?? []);
    runs.push({ config, metrics, bench });
  }
  runs.sort((a, b) => a.config.number - b.config.number);
  return { runs };
}

const jsonlCache = new Map<string, { mtime: number; rows: unknown[] }>();

export function readJsonl<T>(file: string): T[] {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(file);
  } catch {
    return [];
  }
  const hit = jsonlCache.get(file);
  if (hit && hit.mtime === stat.mtimeMs) return hit.rows as T[];
  const rows: T[] = [];
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      rows.push(JSON.parse(line) as T);
    } catch {
      // Skip malformed lines.
    }
  }
  jsonlCache.set(file, { mtime: stat.mtimeMs, rows });
  return rows;
}

function bump(map: Record<string, number>, key: string) {
  map[key] = (map[key] ?? 0) + 1;
}

export function filterErrors(rows: ErrorRow[], q: ErrorQuery): ErrorRow[] {
  const needle = q.q?.trim().toLowerCase();
  return rows.filter(
    (r) =>
      (!q.tag || r.primary_tag === q.tag) &&
      (!q.modifier || r.modifier_tags.includes(q.modifier)) &&
      (!q.split || r.split === q.split) &&
      (!needle ||
        r.text.toLowerCase().includes(needle) ||
        r.expected.toLowerCase().includes(needle) ||
        r.predicted.toLowerCase().includes(needle)),
  );
}

export function facetErrors(rows: ErrorRow[]): Facets {
  const f: Facets = { by_tag: {}, by_modifier: {}, by_split: {} };
  for (const r of rows) {
    bump(f.by_tag, r.primary_tag);
    bump(f.by_split, r.split);
    for (const m of r.modifier_tags) bump(f.by_modifier, m);
  }
  return f;
}

export function queryErrors(roots: Roots, id: string, version: string, q: ErrorQuery): ErrorsResponse | null {
  if (!RUN_RE.test(id) || !EVAL_RE.test(version)) return null;
  const dir = path.join(roots.repo, "runs");
  const file = path.join(dir, id, "errors", `${version}.jsonl`);
  if (!fs.existsSync(path.join(dir, id))) return null;
  const all = readJsonl<ErrorRow>(file);
  const filtered = filterErrors(all, q);
  const offset = Math.max(0, q.offset ?? 0);
  const limit = Math.min(5000, Math.max(1, q.limit ?? 50));
  return {
    total: filtered.length,
    offset,
    items: filtered.slice(offset, offset + limit),
    facets: facetErrors(filtered),
  };
}

/** Eval set manifests from evals/<version>/manifest.json. */
export function loadEvalManifests(roots: Roots): EvalsResponse {
  const dir = path.join(roots.repo, "evals");
  const evals: EvalManifest[] = [];
  for (const v of listDirs(dir, EVAL_RE)) {
    const m = readJson<EvalManifest>(path.join(dir, v, "manifest.json"));
    if (m) evals.push({ ...m, version: m.version ?? v });
  }
  return { evals };
}

function evalSplits(roots: Roots, version: string): string[] {
  const base = path.join(roots.repo, "evals", version);
  try {
    return fs.readdirSync(base).filter((f) => f.endsWith(".jsonl")).map((f) => f.replace(/\.jsonl$/, ""));
  } catch {
    return [];
  }
}

/** Rows per split and per source for one eval version. */
export function evalSummary(roots: Roots, version: string): EvalSummary | null {
  if (!EVAL_RE.test(version) || !fs.existsSync(path.join(roots.repo, "evals", version))) return null;
  const splits: EvalSummary["splits"] = {};
  for (const s of evalSplits(roots, version)) {
    const rows = readJsonl<Sample>(path.join(roots.repo, "evals", version, `${s}.jsonl`));
    const sources: Record<string, number> = {};
    for (const r of rows) bump(sources, r.source ?? "unknown");
    splits[s] = { n: rows.length, sources };
  }
  return { version, splits };
}

export function filterSamples(rows: Sample[], q: SampleQuery): Sample[] {
  const needle = q.q?.trim().toLowerCase();
  return rows.filter(
    (r) =>
      (!q.tag || r.primary_tag === q.tag) &&
      (!q.modifier || (r.modifier_tags ?? []).includes(q.modifier)) &&
      (!q.source || r.source === q.source) &&
      (!needle || r.text.toLowerCase().includes(needle) || r.dsl.toLowerCase().includes(needle)),
  );
}

export function querySamples(roots: Roots, version: string, q: SampleQuery): SamplesResponse | null {
  if (!EVAL_RE.test(version) || !fs.existsSync(path.join(roots.repo, "evals", version))) return null;
  const splits = q.split ? [q.split] : evalSplits(roots, version);
  let rows: Sample[] = [];
  for (const s of splits) {
    if (!EVAL_RE.test(s)) continue;
    rows = rows.concat(readJsonl<Sample>(path.join(roots.repo, "evals", version, `${s}.jsonl`)));
  }
  const filtered = filterSamples(rows, q);
  const facets = { by_tag: {} as Record<string, number>, by_source: {} as Record<string, number> };
  for (const r of filtered) {
    bump(facets.by_source, r.source);
    bump(facets.by_tag, r.primary_tag);
  }
  const offset = Math.max(0, q.offset ?? 0);
  const limit = Math.min(5000, Math.max(1, q.limit ?? 50));
  return { total: filtered.length, offset, items: filtered.slice(offset, offset + limit), facets };
}
