import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

// CSS was 4 KiB until 2026-11-21. The clear button, segmented fields, narrow layout and time band took it to about
// 4.3 KiB with every rule in use (no unused selectors), so the budget is 4.5 KiB. Raise it only for a feature, and say so.
const budget = { "dist/index.js": 15 * 1024, "dist/styles.css": 4.5 * 1024 };
let failed = false;
for (const [file, max] of Object.entries(budget)) {
  const buf = await readFile(new URL(`../${file}`, import.meta.url));
  const gz = gzipSync(buf, { level: 9 }).length;
  const ok = gz <= max;
  failed ||= !ok;
  console.log(`${file}: ${buf.length} B raw, ${gz} B gzip (budget ${max}) ${ok ? "ok" : "OVER"}`);
}
process.exit(failed ? 1 : 0);
