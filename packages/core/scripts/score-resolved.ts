// Reads JSON [{exp, pred}] from stdin, writes JSON [bool] to stdout.
// A pair matches when both resolve to the same dates for several reference days and week starts.
import { readFileSync } from "node:fs";
import { resolveDsl } from "../src";

const pairs = JSON.parse(readFileSync(0, "utf8")) as { exp: string; pred: string }[];
const days = ["2026-11-03", "2026-01-31", "2027-02-28", "2028-02-29", "2026-12-31", "2026-03-15", "2026-07-04"];
const key = (dsl: string, today: string, ws: 0 | 1) => JSON.stringify(resolveDsl(dsl, { today, weekStart: ws }));
const out = pairs.map(({ exp, pred }) => {
  if (exp === pred) return true;
  for (const d of days) for (const ws of [0, 1] as const) if (key(exp, d, ws) !== key(pred, d, ws)) return false;
  return true;
});
process.stdout.write(JSON.stringify(out));
