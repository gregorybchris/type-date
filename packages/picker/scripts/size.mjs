import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const budget = { "dist/index.js": 15 * 1024, "dist/styles.css": 4 * 1024 };
let failed = false;
for (const [file, max] of Object.entries(budget)) {
  const buf = await readFile(new URL(`../${file}`, import.meta.url));
  const gz = gzipSync(buf, { level: 9 }).length;
  const ok = gz <= max;
  failed ||= !ok;
  console.log(`${file}: ${buf.length} B raw, ${gz} B gzip (budget ${max}) ${ok ? "ok" : "OVER"}`);
}
process.exit(failed ? 1 : 0);
