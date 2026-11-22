// Rows whose old label may be stale under the h15 policy (specs/dsl.md, "Offsets from now, relative weekends, parts of
// a month"): h15 answers with a new token (WKND, now, W#K, a @YYYY-MM month) and the label differs in resolved dates on
// some reference day. Writes relabel inputs ({id, text}) for open pools and for an eval version. Prints counts only, so
// eval rows are not read by whoever runs it. Do not relabel by running the engine: two labelers relabel the inputs.
// Usage: tsx scripts/stale-rel.ts [--eval e16] [--out <dir>]
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { resolveDsl } from "@type-date/core";
import { loadH15, parseH15 } from "../src/h15";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, "../../..");
const { values: a } = parseArgs({ options: { eval: { type: "string", default: "e16" }, out: { type: "string", default: join(ROOT, "training/gen/external") } } });
await loadH15();

const NEW = /WKND|\bnow\b|\bW#|#-?\d@\d{4}-/;
const DAYS = ["2026-11-03", "2026-11-22", "2026-01-31", "2027-02-28", "2026-07-04"]; // includes a Sunday
const res = (d: string, day: string) => JSON.stringify(resolveDsl(d, { today: day, now: `${day}T12:00`, weekStart: 0 }));
const stale = (label: string, pred: string) => NEW.test(pred) && pred !== label && DAYS.some((d) => res(pred, d) !== res(label, d));

const rows = (p: string) => readFileSync(p, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
// v007 is a training set with known stale labels; its rows go to specs/engines/h15-known-conflicts.json instead
const pools = readFileSync(join(here, "pools.ts"), "utf8").match(/"(data\/[^"]+\.jsonl)"/g)!.map((s) => s.slice(1, -1)).filter((p) => !p.includes("v007"));
for (const d of ["tz"]) {
  const dir = join(ROOT, "data/pool", d);
  if (existsSync(dir)) for (const f of readdirSync(dir).filter((x) => x.startsWith("dev_"))) pools.push(`data/pool/${d}/${f}`);
}
mkdirSync(a.out!, { recursive: true });

const poolOut: { id: string; text: string; file: string }[] = [];
for (const p of pools) {
  if (!existsSync(join(ROOT, p))) continue;
  for (const r of rows(join(ROOT, p))) if (stale(r.dsl, parseH15(r.text, "2026-11-03"))) poolOut.push({ id: r.id, text: r.text, file: p });
}
const evalDir = join(ROOT, "evals", a.eval!);
const evalOut: { id: string; text: string; file: string }[] = [];
for (const f of readdirSync(evalDir).filter((x) => x.endsWith(".jsonl"))) {
  for (const r of rows(join(evalDir, f))) if (stale(r.dsl, parseH15(r.text, "2026-11-03"))) evalOut.push({ id: r.id, text: r.text, file: f });
}
// a stable relabel id per row; the file map stays out of the labeler inputs
const write = (name: string, xs: typeof poolOut) => {
  writeFileSync(join(a.out!, `rel-stale-${name}-inputs.jsonl`), xs.map((x, i) => JSON.stringify({ id: `st-${name}-${String(i + 1).padStart(4, "0")}`, text: x.text })).join("\n") + "\n");
  writeFileSync(join(a.out!, `rel-stale-${name}-map.json`), JSON.stringify(Object.fromEntries(xs.map((x, i) => [`st-${name}-${String(i + 1).padStart(4, "0")}`, { id: x.id, file: x.file }]))));
};
write("pool", poolOut);
write(a.eval!, evalOut);
const by = (xs: typeof poolOut) => Object.entries(xs.reduce<Record<string, number>>((m, x) => ((m[x.file] = (m[x.file] ?? 0) + 1), m), {})).map(([k, v]) => `${k} ${v}`).join(", ");
console.log(`pool stale rows: ${poolOut.length} (${by(poolOut)})`);
console.log(`${a.eval} stale rows: ${evalOut.length} (${by(evalOut)})`);
