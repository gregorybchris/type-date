import { transform } from "esbuild";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const src = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
const out = await transform(src, { loader: "css", minify: true, target: "chrome111" });
await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await writeFile(new URL("../dist/styles.css", import.meta.url), out.code);
