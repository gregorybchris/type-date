import { build } from "esbuild";

// src/styles.css imports one file per part (src/styles/*.css); bundle them into one minified dist/styles.css.
await build({
  entryPoints: [new URL("../src/styles.css", import.meta.url).pathname],
  outfile: new URL("../dist/styles.css", import.meta.url).pathname,
  bundle: true,
  minify: true,
  target: "chrome111",
  logLevel: "warning",
});
