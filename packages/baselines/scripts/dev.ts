// Dev loop: score an engine on train/val only and show failures. Never reads test splits.
// Usage: tsx scripts/dev.ts <engine file base> [--split train|val] [--n 5000] [--tag t] [--show 8] [--grep re]
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, "../../..");
const { values: a, positionals } = parseArgs({
  allowPositionals: true,
  options: { split: { type: "string", default: "train" }, n: { type: "string", default: "6000" }, tag: { type: "string" }, show: { type: "string", default: "6" }, grep: { type: "string" }, mod: { type: "string" }, file: { type: "string" } },
});
if (a.split !== "train" && a.split !== "val" && !a.file) throw new Error("dev.ts only reads train and val");
const mod = await import(join(here, "../src", positionals[0] + ".ts"));
const engine = mod.default;
let rows = readFileSync(a.file ?? join(ROOT, "data/v003", a.split + ".jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
// deterministic subsample
let s = 12345;
const rnd = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 2 ** 32);
if (rows.length > Number(a.n)) { const k = Math.floor(rows.length / Number(a.n)); rows = rows.filter((_, i) => i % k === 0); }
const stats = new Map<string, [number, number]>();
const fails: any[] = [];
let ok = 0;
for (const r of rows) {
  const p = (await engine.predict(r.text, undefined, { today: "2026-11-03" })).dsl;
  const good = p === r.dsl;
  ok += +good;
  const st = stats.get(r.primary_tag) ?? [0, 0];
  st[0]++; st[1] += +good; stats.set(r.primary_tag, st);
  if (!good) fails.push({ ...r, pred: p });
}
console.log(`${a.split} n=${rows.length} exact ${(ok / rows.length).toFixed(4)}`);
for (const [t, [n, c]] of [...stats].sort((x, y) => (x[1][1] / x[1][0]) - (y[1][1] / y[1][0]))) console.log(`  ${t.padEnd(24)} ${String(n).padStart(5)} ${(c / n).toFixed(3)}`);
let shown = fails.filter((f) => (!a.tag || f.primary_tag === a.tag) && (!a.mod || f.modifier_tags.includes(a.mod)) && (!a.grep || new RegExp(a.grep).test(f.text)));
console.log(`failures matching: ${shown.length}`);
for (let i = shown.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [shown[i], shown[j]] = [shown[j], shown[i]]; }
for (const f of shown.slice(0, Number(a.show))) console.log(`  [${f.primary_tag}${f.modifier_tags.length ? " " + f.modifier_tags : ""}] ${JSON.stringify(f.text)}\n      exp ${f.dsl}\n      got ${f.pred}`);
