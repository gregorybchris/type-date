import { defineConfig, devices } from "@playwright/test";

// Browser tests for the picker, run against the demo app (which aliases @type-date/picker to the package source).
// Functional specs assert geometry and behavior and run everywhere, CI included. visual.spec.ts compares screenshots
// and runs only on macOS, where its baselines were made (fonts render differently on Linux).
const PORT = 5320;
const touch = { isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
const ci = !!process.env.CI;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 1 : 0,
  reporter: ci ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    browserName: "chromium",
    // The picker turns its transitions off under reduced motion, so tests measure the final layout without waits.
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: "disabled" } },
  webServer: {
    // A production build served statically: page loads are much faster than the dev server's on-demand transforms.
    command: `pnpm exec vite build --outDir .e2e-dist --emptyOutDir && pnpm exec vite preview --outDir .e2e-dist --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
  },
  projects: [
    { name: "phone-360", testIgnore: /visual/, use: { ...touch, viewport: { width: 360, height: 740 } } },
    { name: "phone-390", testIgnore: /visual/, use: { ...touch, viewport: { width: 390, height: 844 } } },
    { name: "tablet-768", testIgnore: /visual/, use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop-1024", testIgnore: /visual/, use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 800 } } },
    ...(process.platform === "darwin"
      ? [
          { name: "visual-phone", testMatch: /visual/, use: { ...touch, viewport: { width: 360, height: 740 } } },
          { name: "visual-desktop", testMatch: /visual/, use: { viewport: { width: 1024, height: 800 } } },
        ]
      : []),
  ],
});
