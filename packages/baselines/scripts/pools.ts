// Score an engine on every open labeled pool (never test splits). Writes predictions as JSONL for validate-data.
// Usage: tsx scripts/pools.ts <engine id> [--out <dir>] [--extra <jsonl>] [--tags]
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "../../..");
const { values: a, positionals } = parseArgs({
  allowPositionals: true,
  options: { out: { type: "string" }, extra: { type: "string", multiple: true }, tags: { type: "boolean" } },
});
const POOLS: Record<string, string> = {
  "web dev": "data/pool/web/dev.jsonl",
  "web dev4": "data/pool/web/dev4.jsonl",
  "web dev5": "data/pool/web/dev5.jsonl",
  "web dev6": "data/pool/web/dev6.jsonl",
  "typo dev": "data/pool/typo/dev.jsonl",
  "v2 train": "data/pool/v2/train.jsonl",
  "v2 dev": "data/pool/v2/dev.jsonl",
  "tax train": "data/pool/tax/train.jsonl",
  "tax dev": "data/pool/tax/dev.jsonl",
  "real train": "data/real/train.jsonl",
  "real dev": "data/real/dev.jsonl",
  "real-hard train": "data/real-hard/train.jsonl",
  "real-hard dev": "data/real-hard/dev.jsonl",
  "real-fmt train": "data/real-fmt/train.jsonl",
  "real-fmt dev": "data/real-fmt/dev.jsonl",
  "v007 train": "data/v007/train.jsonl",
  "relmonth dev": "data/pool/misc/dev_relmonth.jsonl",
  "families dev": "data/pool/misc/dev_families.jsonl",
  "persona dev": "data/pool/persona/dev.jsonl",
  "web dev7": "data/pool/web/dev7.jsonl",
  "web dev8": "data/pool/web/dev8.jsonl",
  "web dev9": "data/pool/web/dev9.jsonl",
};
// Pools split by line index: even rows develop, odd rows are an internal validation set (score only, failures hidden).
const HALVES = new Set(["persona dev", "web dev7", "web dev8", "web dev9"]);
const mod = await import(join(here, "../src", positionals[0] + ".ts"));
const engine = mod.default;
const outDir = a.out;
if (outDir) mkdirSync(outDir, { recursive: true });
const all: Record<string, string> = { ...POOLS };
for (const e of a.extra ?? []) all[e.split("/").pop()!] = e;
const tags = new Map<string, [number, number]>();
const fams = new Map<string, [number, number]>();
let T = 0, C = 0;
const line = (n: string, t: number, c: number) => `${n.padEnd(18)} n=${String(t).padStart(6)} exact ${(c / t).toFixed(4)}  wrong ${t - c}`;
const fails: any[] = [];
const units: [string, string, number | null][] = [];
for (const [name, rel] of Object.entries(all)) {
  if (HALVES.has(name)) { units.push([name + " [even]", rel, 0], [name + " [odd]", rel, 1]); } else units.push([name, rel, null]);
}
for (const [name, rel, half] of units) {
  const p = rel.startsWith("/") ? rel : join(ROOT, rel);
  if (!existsSync(p)) continue;
  const rows = readFileSync(p, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)).filter((_, i) => half === null || i % 2 === half);
  let c = 0;
  const outRows: string[] = [];
  for (const r of rows) {
    const pred = (await engine.predict(r.text, undefined, { today: "2026-11-03" })).dsl;
    const good = pred === r.dsl;
    c += +good;
    const tag = r.primary_tag ?? "?";
    const st = tags.get(tag) ?? [0, 0]; st[0]++; st[1] += +good; tags.set(tag, st);
    if (!good && half !== 1) fails.push({ pool: name, id: r.id, text: r.text, exp: r.dsl, got: pred, tag });
    outRows.push(JSON.stringify({ text: r.text, dsl: pred, exp: r.dsl, id: r.id }));
  }
  T += rows.length; C += c;
  console.log(line(name, rows.length, c));
  if (outDir) writeFileSync(join(outDir, name.replace(/\W+/g, "_") + ".jsonl"), outRows.join("\n") + "\n");
}
console.log(line("POOLED", T, C));
if (a.tags) {
  console.log("\nper tag (worst loss first)");
  for (const [t, [n, c]] of [...tags].sort((x, y) => (y[1][0] - y[1][1]) - (x[1][0] - x[1][1]))) console.log(`  ${t.padEnd(26)} n=${String(n).padStart(5)} acc ${(c / n).toFixed(3)} wrong ${n - c}`);
}
if (outDir) writeFileSync(join(outDir, "..", `fails-${positionals[0]}.jsonl`), fails.map((f) => JSON.stringify(f)).join("\n") + "\n");
