import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const picker = (p: string) => fileURLToPath(new URL(`../../packages/picker/src/${p}`, import.meta.url));

// The demo imports "@type-date/picker" like any user would. In this repo the alias points at the package source, so
// the demo needs no build of the package first and hot-reloads package edits. `pnpm test:pack` in packages/picker
// checks the built tarball.
export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: [
      { find: "@type-date/picker/styles.css", replacement: picker("styles.css") },
      { find: "@type-date/picker", replacement: picker("index.ts") },
    ],
  },
  server: { port: 5199, strictPort: true },
});
