import { defineConfig } from "tsup";

// The parser (@type-date/baselines) and the resolver (@type-date/core) are workspace sources, so they are bundled in.
// Only react stays external. The parser's rule sets are dynamic imports and become separate chunks.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2022",
  dts: { resolve: true },
  splitting: true,
  minify: true,
  clean: true,
  external: ["react", "react/jsx-runtime"],
  noExternal: [/^@type-date\//],
});
