import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import { typeDateApi } from "./server/plugin";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");

export default defineConfig({
  plugins: [react(), tailwindcss(), typeDateApi({ repo, fixtures: path.join(here, "fixtures") })],
  resolve: {
    // The picker is used from source so edits show up without a rebuild.
    alias: [
      { find: "@/", replacement: path.join(here, "src") + "/" },
      { find: "@type-date/picker/styles.css", replacement: path.join(repo, "packages/picker/src/styles.css") },
      { find: /^@type-date\/picker$/, replacement: path.join(repo, "packages/picker/src/index.ts") },
    ],
  },
  server: { port: 5173, fs: { allow: [repo] } },
  test: { include: ["tests/**/*.test.ts"] },
});
