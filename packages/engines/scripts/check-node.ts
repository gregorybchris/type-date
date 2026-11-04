// Usage: tsx scripts/check-node.ts <artifacts/exp-NNN> <data.jsonl> [limit]
// Runs the ONNX model through OrtCustomEngine in Node and reports exact match.
import { readFileSync } from "node:fs";
import { OrtCustomEngine } from "../src/ort-custom";

const [art, data, limit = "500"] = process.argv.slice(2);
if (!art || !data) throw new Error("usage: check-node.ts <artifact dir> <data.jsonl> [limit]");
const manifest = JSON.parse(readFileSync(`${art}/manifest.json`, "utf8"));
const eng = new OrtCustomEngine({
  numThreads: 1,
  fetchBytes: async (u) => new Uint8Array(readFileSync(u)),
});
await eng.load({ baseUrl: art, manifest, backend: "wasm" });
const rows = readFileSync(data, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)).slice(0, Number(limit));
let ok = 0;
const times: number[] = [];
for (const r of rows) {
  const p = await eng.predict(r.text);
  times.push(p.ms);
  if (p.dsl === r.dsl) ok++;
}
times.sort((a, b) => a - b);
console.log(JSON.stringify({ n: rows.length, exact: ok / rows.length, p50: times[Math.floor(times.length / 2)], p95: times[Math.floor(times.length * 0.95)] }));
