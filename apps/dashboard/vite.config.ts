import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import { typeDateApi } from "./server/plugin";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");

// Sibling packages that may not exist yet. When missing, point to a stub so the
// dashboard still builds and falls back (mock engine, stub picker).
function optionalPackage(name: string, dir: string, stub: string) {
  const pkgDir = path.join(repo, "packages", dir);
  if (!fs.existsSync(path.join(pkgDir, "package.json"))) return { [name]: path.join(here, stub) };
  return {};
}

export default defineConfig({
  plugins: [react(), tailwindcss(), typeDateApi({ repo, fixtures: path.join(here, "fixtures") })],
  resolve: {
    alias: {
      "@": path.join(here, "src"),
      ...optionalPackage("@type-date/engines", "engines", "src/lib/stubs/engines-missing.ts"),
    },
  },
  server: { port: 5173, fs: { allow: [repo] } },
  test: { include: ["tests/**/*.test.ts"] },
});
