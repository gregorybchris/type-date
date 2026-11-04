// Score a baseline engine on one eval version and write runs/exp-NNN/{config,metrics}.json and errors/<version>.jsonl.
// Usage: pnpm --filter @type-date/baselines eval --engine chrono --exp 1 --title "chrono-node baseline"
// Metrics follow training/src/typedate/train.py `evaluate` (exact, resolved, by_split, by_tag, by_modifier).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { parseArgs } from "node:util";
import { build } from "esbuild";
import { resolveDsl } from "@type-date/core";
import type { Engine } from "../src/engine";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "../../..");

/** engine id -> source file, model family, and whether predictions depend on the reference day. */
const REGISTRY: Record<string, { file: string; family: string; perDay: boolean; notes: string }> = {
  chrono: { file: "chrono.ts", family: "library", perDay: true, notes: "chrono-node 2.10.3 (en casual, forwardDate) plus DSL adapter. No recurrence support." },
  "heuristic-small": { file: "heuristic-small.ts", family: "heuristic", perDay: false, notes: "Hand-written tokenizer and a few dozen regex rules. No dependencies." },
  "heuristic-full-2": { file: "heuristic-full-2.ts", family: "heuristic", perDay: false, notes: "heuristic-full plus clock words, filler and chat phrasing, UK order, edit distance 2, more recurrence forms." },
  "heuristic-full-5": { file: "heuristic-full-5.ts", family: "heuristic", perDay: false, notes: "heuristic-full-4 plus date validity checks, year-first and named numeric formats, two-digit years, seconds, relative offsets in more forms." },
  "heuristic-full-6": { file: "heuristic-full-6.ts", family: "heuristic", perDay: false, notes: "heuristic-full-5 plus DSL v2 forms: open ranges, day of month, durations, lists, recurrence bounds, windows, anchored and business-day offsets." },
  "heuristic-full-7": { file: "heuristic-full-7.ts", family: "heuristic", perDay: false, notes: "heuristic-full-6 plus web-pool fixes: years after day, seconds and zone strip, date-time joins, cron English, arithmetic forms." },
  "heuristic-full-8": { file: "heuristic-full-8.ts", family: "heuristic", perDay: false, notes: "heuristic-full-7 behind a normalization layer for typos and abbreviations: weekday, month and unit misspellings, short forms, digits for words." },
  "heuristic-full-4": { file: "heuristic-full-4.ts", family: "heuristic", perDay: false, notes: "heuristic-full-3 plus span composition for pasted messages, bounded recurrences, calendar phrases and shorthand." },
  "heuristic-full-3": { file: "heuristic-full-3.ts", family: "heuristic", perDay: false, notes: "heuristic-full-2 plus span extraction around unknown words, day parts, one-letter am/pm and slang." },
  "heuristic-full": { file: "heuristic-full.ts", family: "heuristic", perDay: false, notes: "Hand-written grammar parser with fuzzy word matching. No dependencies." },
};

// Same reference days as packages/core/scripts/score-resolved.ts. Keep in sync.
const DAYS = ["2026-11-03", "2026-01-31", "2027-02-28", "2028-02-29", "2026-12-31", "2026-03-15", "2026-07-04"];
const DEFAULT_DAY = DAYS[0]!;
/** Splits listed in evals/<version>/manifest.json, so new splits are picked up automatically. */
function splitsOf(version: string): string[] {
  const m = JSON.parse(readFileSync(join(ROOT, "evals", version, "manifest.json"), "utf8"));
  return Object.keys(m.files);
}

const { values: args } = parseArgs({
  options: {
    engine: { type: "string" },
    exp: { type: "string" },
    title: { type: "string" },
    "eval-version": { type: "string", default: "e1" },
    description: { type: "string" },
    splits: { type: "string" },
    limit: { type: "string" },
    "dry-run": { type: "boolean", default: false },
    "no-primary": { type: "boolean", default: false },
    file: { type: "string" },
  },
});
const reg = REGISTRY[args.engine ?? ""];
if (!reg || !args.exp || !args.title) {
  console.error(`usage: eval --engine <${Object.keys(REGISTRY).join("|")}> --exp <n> --title "<title>"`);
  process.exit(2);
}
const expNum = Number(args.exp);
const expId = `exp-${String(expNum).padStart(3, "0")}`;

interface Row {
  id: string;
  text: string;
  dsl: string;
  primary_tag: string;
  modifier_tags?: string[];
}

function loadSplit(name: string): Row[] {
  if (args.file) {
    if (name !== "file") return [];
    return readFileSync(resolve(args.file), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l) as Row);
  }
  const p = join(ROOT, "evals", args["eval-version"]!, `${name}.jsonl`);
  if (!existsSync(p)) return [];
  const rows = readFileSync(p, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l) as Row);
  return args.limit ? rows.slice(0, Number(args.limit)) : rows;
}

const cache = new Map<string, string>();
function key(dsl: string, day: string): string {
  const k = `${day}|${dsl}`;
  let v = cache.get(k);
  if (v === undefined) {
    v = JSON.stringify(resolveDsl(dsl, { today: day, weekStart: 0 }));
    cache.set(k, v);
  }
  return v;
}

function pct(sorted: number[], q: number): number {
  return sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))] ?? 0;
}

async function bundleSize(file: string): Promise<{ raw: number; gzip: number; lazyGzip: number; lazyRaw: number }> {
  // Code splitting: chunks reached through a dynamic import() are "lazy", the rest is the eager download.
  const out = await build({
    entryPoints: [join(here, "../src", file)],
    bundle: true,
    minify: true,
    splitting: true,
    format: "esm",
    outdir: "out",
    platform: "browser",
    target: "es2022",
    write: false,
    metafile: true,
    logLevel: "error",
  });
  const lazy = new Set<string>();
  for (const o of Object.values(out.metafile.outputs)) for (const i of o.imports) if (i.kind === "dynamic-import") lazy.add(i.path);
  let raw = 0, lazyRaw = 0;
  const eager: Buffer[] = [], lz: Buffer[] = [];
  for (const f of out.outputFiles) {
    const rel = Object.keys(out.metafile.outputs).find((k) => resolve(k) === f.path)!;
    const buf = Buffer.from(f.contents);
    if (lazy.has(rel)) (lazyRaw += buf.length), lz.push(buf);
    else (raw += buf.length), eager.push(buf);
  }
  return { raw, gzip: gzipSync(Buffer.concat(eager), { level: 9 }).length, lazyRaw, lazyGzip: lz.length ? gzipSync(Buffer.concat(lz), { level: 9 }).length : 0 };
}

async function main() {
  const t0 = performance.now();
  const started = new Date().toISOString();
  const mod = await import(join(here, "../src", reg!.file));
  const engine: Engine = mod.default;
  await engine.load({ baseUrl: "" });
  const splitNames = (args.file ? ["file"] : args.splits ? args.splits.split(",") : splitsOf(args["eval-version"]!)).filter((s) => loadSplit(s).length > 0);
  const rowsBySplit: Record<string, Row[]> = Object.fromEntries(splitNames.map((s) => [s, loadSplit(s)]));

  // warm up the JIT before timing
  const warm = rowsBySplit[splitNames[0]!]!.slice(0, 300);
  for (let i = 0; i < 2; i++) for (const r of warm) await engine.predict(r.text, undefined, { today: DEFAULT_DAY });

  const tLoad = performance.now();
  const latencies: number[] = [];
  const errors: Record<string, unknown>[] = [];
  const bySplit: Record<string, { n: number; exact: number; resolved: number }> = {};
  const tag = new Map<string, [number, number]>();
  const mod_ = new Map<string, [number, number]>();
  let tot = 0, ok = 0, resOk = 0;
  for (const [split, rows] of Object.entries(rowsBySplit)) {
    let sOk = 0, sRes = 0;
    for (const r of rows) {
      const t0 = performance.now();
      const res = await engine.predict(r.text, undefined, { today: DEFAULT_DAY });
      latencies.push(performance.now() - t0);
      const pred = res.dsl;
      const good = pred === r.dsl;
      let resolvedMatch = good;
      if (!good) {
        resolvedMatch = true;
        for (const day of DAYS) {
          const p = reg!.perDay && day !== DEFAULT_DAY ? (await engine.predict(r.text, undefined, { today: day })).dsl : pred;
          if (key(r.dsl, day) !== key(p, day)) {
            resolvedMatch = false;
            break;
          }
        }
      }
      sOk += +good;
      sRes += +resolvedMatch;
      const t = tag.get(r.primary_tag) ?? [0, 0];
      t[0]++, (t[1] += +good);
      tag.set(r.primary_tag, t);
      for (const m of r.modifier_tags ?? []) {
        const s = mod_.get(m) ?? [0, 0];
        s[0]++, (s[1] += +good);
        mod_.set(m, s);
      }
      if (!good) {
        errors.push({ id: r.id, text: r.text, split, primary_tag: r.primary_tag, modifier_tags: r.modifier_tags ?? [], expected: r.dsl, predicted: pred, resolved_match: resolvedMatch });
      }
    }
    bySplit[split] = { n: rows.length, exact: sOk / Math.max(1, rows.length), resolved: sRes / Math.max(1, rows.length) };
    tot += rows.length;
    ok += sOk;
    resOk += sRes;
  }
  const tScore = performance.now();
  latencies.sort((a, b) => a - b);
  const size = await bundleSize(reg!.file);
  const sortedObj = (m: Map<string, [number, number]>) =>
    Object.fromEntries([...m.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([k, [n, c]]) => [k, { n, exact: c / n }]));
  const metrics = {
    eval: {
      exact: ok / Math.max(1, tot),
      resolved: resOk / Math.max(1, tot),
      n: tot,
      by_split: bySplit,
      by_tag: sortedObj(tag),
      by_modifier: sortedObj(mod_),
      version: args["eval-version"],
    },
    model: { params: 0, size_bytes: size.gzip, size_bytes_minified: size.raw, size_bytes_lazy: size.lazyGzip, avg_output_tokens: null },
    train: { seconds: 0, steps: 0, final_loss: null },
    node_latency_ms: { p50: pct(latencies, 0.5), p95: pct(latencies, 0.95), p99: pct(latencies, 0.99), n: latencies.length },
  };
  const config = {
    id: expId,
    number: expNum,
    title: args.title,
    created: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
    description: args.description ?? reg!.notes,
    dataset: null,
    format: "dsl-v1",
    notes: reg!.notes,
    parent: null,
    model: { family: reg!.family, params: 0, engine: args.engine },
    train: {},
    export: { format: "none" },
  };
  console.log(`${args.engine}: exact ${metrics.eval.exact.toFixed(4)} resolved ${metrics.eval.resolved.toFixed(4)} n=${tot} gzip=${size.gzip}B lazy=${size.lazyGzip}B p50=${metrics.node_latency_ms.p50.toFixed(4)}ms`);
  for (const [s, v] of Object.entries(bySplit)) console.log(`  ${s.padEnd(14)} n=${String(v.n).padStart(5)} exact ${v.exact.toFixed(4)} resolved ${v.resolved.toFixed(4)}`);
  if (args["dry-run"]) return;
  const dir = join(ROOT, "runs", expId);
  mkdirSync(join(dir, "errors"), { recursive: true });
  // Errors are kept per eval version, so every eval has its own failure list.
  writeFileSync(join(dir, "errors", `${args["eval-version"]}.jsonl`), errors.map((e) => JSON.stringify(e)).join("\n") + (errors.length ? "\n" : ""));
  if (args["no-primary"]) {
    // Re-score on another eval version: only add metrics.evals[version]. Primary eval and config stay.
    const mp = join(dir, "metrics.json");
    if (!existsSync(mp)) throw new Error(`${mp} missing: run the primary eval first`);
    const cur = JSON.parse(readFileSync(mp, "utf8"));
    cur.evals = { ...(cur.evals ?? {}), [args["eval-version"]!]: metrics.eval };
    writeFileSync(mp, JSON.stringify(cur, null, 2));
    return;
  }
  writeFileSync(join(dir, "config.json"), JSON.stringify(config, null, 2));
  // keep results stored for other eval versions
  const mp0 = join(dir, "metrics.json");
  const prev = existsSync(mp0) ? JSON.parse(readFileSync(mp0, "utf8")) : {};
  const evals = { ...(prev.evals ?? {}) };
  delete evals[args["eval-version"]!];
  writeFileSync(mp0, JSON.stringify(Object.keys(evals).length ? { ...metrics, evals } : metrics, null, 2));
  const total = (performance.now() - t0) / 1000;
  const b = { load_data: (tLoad - t0) / 1000, eval_predict: (tScore - tLoad) / 1000, bundle_size: (performance.now() - tScore) / 1000 };
  const stage = "eval";
  const timing = {
    stages: { [stage]: { stages: { started_at: started, finished_at: new Date().toISOString() }, total_s: total, buckets: b } },
    total_s: total,
    buckets: Object.fromEntries(Object.entries(b).map(([k, v]) => [`${stage}.${k}`, v])),
  };
  writeFileSync(join(dir, "timing.json"), JSON.stringify(timing, null, 2));
}
main();
