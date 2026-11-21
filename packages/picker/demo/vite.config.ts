import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  esbuild: { jsx: "automatic" },
  build: { outDir: "../dist-demo", emptyOutDir: true },
  server: { port: 5199, strictPort: true },
});
