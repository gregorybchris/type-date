// Rows whose text has a zone that h13 reads but whose label has none: the label predates the zone policy (2026-11-21).
// Writes the rows for relabeling: training/gen/external/tz-stale-{pool,eval}-inputs.jsonl (id, text) and tz-stale-map.json (id -> file, line).
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import h13 from "../src/h13";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const poolFiles: string[] = [];
const walk = (d: string) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/(^|\/)(dev|train)[^/]*\.jsonl$/.test(p) && !p.includes("/pool/tz/") && !p.includes("/pool/conj/test")) poolFiles.push(p);
  }
};
walk(join(ROOT, "data/pool"));
for (const d of ["real", "real-hard", "real-fmt"]) for (const f of readdirSync(join(ROOT, "data", d))) if (/^(dev|train)/.test(f)) poolFiles.push(join(ROOT, "data", d, f));
const evalFiles = readdirSync(join(ROOT, "evals/e16")).filter((f) => f.endsWith(".jsonl") && !f.startsWith("test_tz_")).map((f) => join(ROOT, "evals/e16", f));
const map: Record<string, { file: string; id: string }> = {};
await h13.load();
async function scan(files: string[], tag: string) {
  const out: string[] = [];
  let n = 0;
  for (const f of files) {
    for (const l of readFileSync(f, "utf8").split("\n")) {
      if (!l) continue;
      const r = JSON.parse(l);
      if (!r.text || / @\S+$/.test(r.dsl)) continue;
      const p = (await h13.predict(r.text, undefined, { today: "2026-11-03" })).dsl;
      if (/ @\S+$/.test(p) || (p === "x" && r.dsl !== "x" && /gmt[+-]\d{4}\s*\(|dtstart|tz=/i.test(r.text))) {
        const sid = `${tag}${++n}`;
        map[sid] = { file: f.replace(ROOT + "/", ""), id: r.id };
        out.push(JSON.stringify({ id: sid, text: r.text }));
      }
    }
  }
  writeFileSync(join(ROOT, `training/gen/external/tz-stale-${tag === "sp" ? "pool" : "eval"}-inputs.jsonl`), out.join("\n") + "\n");
  console.log(tag, out.length, "rows");
}
await scan(poolFiles, "sp");
await scan(evalFiles, "se");
writeFileSync(join(ROOT, "training/gen/external/tz-stale-map.json"), JSON.stringify(map));
