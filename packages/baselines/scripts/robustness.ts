// Usage: tsx scripts/robustness.ts --engine heuristic-full-5 --files data/real/dev.jsonl,data/real-hard/dev.jsonl [--show 5]
// Applies meaning-preserving edits to rows the engine gets right and reports how often the answer flips.
// Run it on DEV data, not on e1-e5 eval rows.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { resolveDsl } from "@type-date/core";
import { baselines } from "../src/index";

const { values: args } = parseArgs({
  options: {
    engine: { type: "string", default: "heuristic-full-5" },
    files: { type: "string", default: "data/real/dev.jsonl,data/real-hard/dev.jsonl,data/real-fmt/dev.jsonl" },
    show: { type: "string", default: "4" },
  },
});
const ROOT = resolve(import.meta.dirname, "../../..");
const engine = baselines[args.engine!];
if (!engine) throw new Error(`unknown engine ${args.engine}`);

interface Row { text: string; dsl: string }
const rows: Row[] = args.files!.split(",").flatMap((f) =>
  readFileSync(resolve(ROOT, f), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l) as Row),
);

const days = ["2026-11-03", "2026-01-31", "2027-02-28", "2028-02-29", "2026-12-31", "2026-03-15", "2026-07-04"];
const key = (d: string, t: string) => JSON.stringify(resolveDsl(d, { today: t, weekStart: 0 }));
const same = (a: string, b: string) => a === b || days.every((d) => key(a, d) === key(b, d));

// deterministic pseudo random from the text
const h = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

const FILLER_PRE = ["pls ", "can we do ", "ok so ", "hey, ", "remind me ", "um "];
const FILLER_POST = [" please", " thanks", " if possible", " lol", " ok?"];
const wordsOf = (t: string) => t.split(" ");

function typo(t: string): string | null {
  // swap two adjacent letters in the first alphabetic word of length >= 6
  const ws = wordsOf(t);
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i]!;
    if (/^[a-z]{6,}$/i.test(w)) {
      const p = 1 + (h(t) % (w.length - 3));
      ws[i] = w.slice(0, p) + w[p + 1] + w[p] + w.slice(p + 2);
      return ws.join(" ");
    }
  }
  return null;
}

const transforms: Record<string, (t: string) => string | null> = {
  uppercase: (t) => t.toUpperCase(),
  "title case": (t) => t.replace(/\b\w/g, (c) => c.toUpperCase()),
  "extra spaces": (t) => t.replace(/ /g, "  "),
  "leading/trailing space": (t) => `  ${t}  `,
  "trailing period": (t) => `${t}.`,
  "trailing !": (t) => `${t}!`,
  "filler before": (t) => FILLER_PRE[h(t) % FILLER_PRE.length] + t,
  "filler after": (t) => t + FILLER_POST[h(t) % FILLER_POST.length],
  "filler both": (t) => FILLER_PRE[h(t) % FILLER_PRE.length] + t + FILLER_POST[h(t) % FILLER_POST.length],
  "one typo (swap)": typo,
};

const days0 = days[0]!;
const predict = async (t: string) => (await engine.predict(t.toLowerCase().split(/\s+/).filter(Boolean).join(" "), undefined, { today: days0 })).dsl;
const raw = async (t: string) => (await engine.predict(t, undefined, { today: days0 })).dsl;
void raw;

const correct: Row[] = [];
for (const r of rows) if (same(await predict(r.text), r.dsl)) correct.push(r);
console.log(`${args.engine}: ${correct.length} of ${rows.length} rows correct on the dev files; transforms apply to those`);
console.log("");
console.log("transform".padEnd(26), "applied".padStart(8), "flipped".padStart(8), "flip rate".padStart(10));
const show = Number(args.show);
for (const [name, f] of Object.entries(transforms)) {
  let n = 0;
  let flips = 0;
  const ex: string[] = [];
  for (const r of correct) {
    // skip x rows: filler on a non-date should stay x, which is checked like any other row
    const t2 = f(r.text);
    if (t2 === null || t2 === r.text) continue;
    n++;
    // The engine is given the transformed text exactly as typed (case and spacing included).
    const p = await engine.predict(t2, undefined, { today: days0 });
    if (!same(p.dsl, r.dsl)) {
      flips++;
      if (ex.length < show) ex.push(`${JSON.stringify(t2)}  ${r.dsl} -> ${p.dsl}`);
    }
  }
  console.log(name.padEnd(26), String(n).padStart(8), String(flips).padStart(8), `${((100 * flips) / Math.max(1, n)).toFixed(1)}%`.padStart(10));
  for (const e of ex) console.log("    ", e);
}
