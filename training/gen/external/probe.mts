import * as fs from "node:fs";
const eng = process.argv[2] ?? "h8";
const m = await import(`/Users/chris/Documents/Code/Projects/Current/type-date/packages/baselines/src/${eng}.ts`);
const lines = fs.readFileSync(process.argv[3] ?? "/dev/stdin", "utf8").split("\n").filter(Boolean);
for (const l of lines) console.log(l.padEnd(52), (await m.default.predict(l, undefined, { today: "2026-11-04" })).dsl);
