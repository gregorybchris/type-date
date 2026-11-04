// Data layer: reads runs/ and data/ (or sample fixtures) from disk. Used by the Vite plugin and tests.
import fs from "node:fs";
import path from "node:path";
import type {
  DatasetMeta,
  DatasetsResponse,
  ErrorQuery,
  ErrorRow,
  ErrorsResponse,
  Facets,
  Manifest,
  Run,
  RunsResponse,
  Sample,
  SampleQuery,
  SamplesResponse,
} from "../src/lib/types";

export interface Roots {
  /** Repo root that holds runs/, data/, artifacts/. */
  repo: string;
  /** Sample data used when the repo has no experiments or datasets. */
  fixtures: string;
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
const DATA_RE = /^v\d+/;

function hasRuns(dir: string): boolean {
  return listDirs(dir, RUN_RE).some((d) => fs.existsSync(path.join(dir, d, "config.json")));
}

function hasDatasets(dir: string): boolean {
  return listDirs(dir, DATA_RE).some((d) => fs.existsSync(path.join(dir, d, "meta.json")));
}

/** Directory of runs to use and whether it is sample data. DASHBOARD_SAMPLE=1 forces fixtures. */
export function runsDir(roots: Roots): { dir: string; sample: boolean } {
  if (process.env.DASHBOARD_SAMPLE === "1") return { dir: path.join(roots.fixtures, "runs"), sample: true };
  const real = path.join(roots.repo, "runs");
  if (hasRuns(real)) return { dir: real, sample: false };
  return { dir: path.join(roots.fixtures, "runs"), sample: true };
}

export function dataDir(roots: Roots): { dir: string; sample: boolean } {
  if (process.env.DASHBOARD_SAMPLE === "1") return { dir: path.join(roots.fixtures, "data"), sample: true };
  const real = path.join(roots.repo, "data");
  if (hasDatasets(real)) return { dir: real, sample: false };
  return { dir: path.join(roots.fixtures, "data"), sample: true };
}

export function loadRuns(roots: Roots): RunsResponse {
  const { dir, sample } = runsDir(roots);
  const runs: Run[] = [];
  for (const id of listDirs(dir, RUN_RE)) {
    const base = path.join(dir, id);
    const config = readJson<Run["config"]>(path.join(base, "config.json"));
    const metrics = readJson<Run["metrics"]>(path.join(base, "metrics.json"));
    if (!config || !metrics) continue;
    const bench = readJson<Run["bench"]>(path.join(base, "bench.json")) ?? [];
    const manifest =
      readJson<Manifest>(path.join(roots.repo, "artifacts", id, "manifest.json")) ??
      readJson<Manifest>(path.join(base, "manifest.json"));
    const timing = readJson<Run["timing"]>(path.join(base, "timing.json"));
    runs.push({ config, metrics, bench, manifest, timing });
  }
  runs.sort((a, b) => a.config.number - b.config.number);
  return { sample, runs };
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

export function queryErrors(roots: Roots, id: string, q: ErrorQuery): ErrorsResponse | null {
  if (!RUN_RE.test(id)) return null;
  const { dir } = runsDir(roots);
  const file = path.join(dir, id, "errors.jsonl");
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

export function loadDatasets(roots: Roots): DatasetsResponse {
  const { dir, sample } = dataDir(roots);
  const datasets: DatasetMeta[] = [];
  for (const v of listDirs(dir, DATA_RE)) {
    const meta = readJson<DatasetMeta>(path.join(dir, v, "meta.json"));
    if (meta) datasets.push(meta);
  }
  return { sample, datasets };
}

export function filterSamples(rows: Sample[], q: SampleQuery): Sample[] {
  const needle = q.q?.trim().toLowerCase();
  return rows.filter(
    (r) =>
      (!q.tag || r.primary_tag === q.tag) &&
      (!q.modifier || r.modifier_tags.includes(q.modifier)) &&
      (!q.source || r.source === q.source) &&
      (!needle || r.text.toLowerCase().includes(needle) || r.dsl.toLowerCase().includes(needle)),
  );
}

export function querySamples(roots: Roots, version: string, q: SampleQuery): SamplesResponse | null {
  if (!DATA_RE.test(version)) return null;
  const { dir } = dataDir(roots);
  const base = path.join(dir, version);
  if (!fs.existsSync(base)) return null;
  const splits = q.split
    ? [q.split]
    : fs
        .readdirSync(base)
        .filter((f) => f.endsWith(".jsonl"))
        .map((f) => f.replace(/\.jsonl$/, ""));
  let rows: Sample[] = [];
  for (const s of splits) {
    if (!/^[a-z_]+$/.test(s)) continue;
    rows = rows.concat(readJsonl<Sample>(path.join(base, `${s}.jsonl`)));
  }
  const filtered = filterSamples(rows, q);
  const facets = { by_modifier: {} as Record<string, number>, by_source: {} as Record<string, number> };
  for (const r of filtered) {
    bump(facets.by_source, r.source);
    for (const m of r.modifier_tags) bump(facets.by_modifier, m);
  }
  const offset = Math.max(0, q.offset ?? 0);
  const limit = Math.min(5000, Math.max(1, q.limit ?? 50));
  return { total: filtered.length, offset, items: filtered.slice(offset, offset + limit), facets };
}
