// Usage: tsx scripts/validate-data.ts <dir-with-jsonl>
// Checks that every DSL label parses and round-trips to the canonical form.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseDsl, serializeDsl } from "../src";

const dir = process.argv[2];
if (!dir) throw new Error("usage: validate-data.ts <dir>");
let total = 0;
let bad = 0;
const examples: string[] = [];
for (const f of readdirSync(dir).filter((x) => x.endsWith(".jsonl"))) {
  for (const line of readFileSync(join(dir, f), "utf8").split("\n")) {
    if (!line.trim()) continue;
    const r = JSON.parse(line) as { text: string; dsl: string };
    total++;
    const p = parseDsl(r.dsl);
    const canon = serializeDsl(p);
    if ((p.mode === "x" && r.dsl !== "x") || canon !== r.dsl) {
      bad++;
      if (examples.length < 25) examples.push(`${f}: "${r.text}" -> ${r.dsl} (canon: ${canon})`);
    }
  }
}
console.log(JSON.stringify({ total, bad }));
for (const e of examples) console.log(e);
process.exit(bad ? 1 : 0);
