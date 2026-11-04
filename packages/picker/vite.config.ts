import { defineConfig } from "vite";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], fileName: () => "index.js" },
    rollupOptions: { external: ["react", "react/jsx-runtime", "@type-date/core"] },
    minify: "esbuild",
    target: "es2022",
  },
});
