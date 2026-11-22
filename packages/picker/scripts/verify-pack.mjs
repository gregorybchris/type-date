// Packs the package, installs the tarball into a scratch project with only react as a dependency, bundles a small
// app that uses it, and loads that app in a browser. Run with: pnpm test:pack. It never publishes.
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join, extname } from "node:path";
import { chromium } from "playwright";

const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });
const root = new URL("..", import.meta.url).pathname;
const work = mkdtempSync(join(tmpdir(), "type-date-pack-"));
const fail = (msg) => {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
};

// 1. Build, then pack. `--ignore-scripts` keeps the `prepack` build output out of the JSON.
execFileSync("pnpm", ["build"], { cwd: root, stdio: "inherit" });
const packed = JSON.parse(run("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", work], root))[0];
const files = packed.files.map((f) => f.path);
console.log(`packed ${packed.filename}: ${files.length} files, ${(packed.size / 1024).toFixed(1)} kB (${(packed.unpackedSize / 1024).toFixed(1)} kB unpacked)`);
const stray = files.filter((f) => !/^(dist\/|README\.md$|LICENSE$|package\.json$)/.test(f));
if (!files.includes("LICENSE")) fail("LICENSE is missing from the tarball");
if (stray.length) fail(`unexpected files in the tarball: ${stray.join(", ")}`);
if (!files.includes("dist/index.js") || !files.includes("dist/index.d.ts") || !files.includes("dist/styles.css")) fail("dist/index.js, index.d.ts or styles.css is missing");

// 2. Install into a scratch project. Nothing from this repo is on the path.
const app = join(work, "app");
mkdirSync(app);
writeFileSync(join(app, "package.json"), JSON.stringify({ name: "scratch", private: true, type: "module" }));
run("npm", ["install", "--silent", "--no-audit", "--no-fund", join(work, packed.filename), "react@19", "react-dom@19", "esbuild"], app);
const manifest = JSON.parse(readFileSync(join(app, "node_modules/@type-date/picker/package.json"), "utf8"));
const runtimeDeps = Object.keys(manifest.dependencies ?? {});
if (runtimeDeps.length) fail(`runtime dependencies should be empty, found: ${runtimeDeps.join(", ")}`);

// 3. A tiny app that uses only the public API, no parse prop.
writeFileSync(
  join(app, "main.tsx"),
  `import { createRoot } from "react-dom/client";
import { TypeDatePicker, parse, summarize } from "@type-date/picker";
import "@type-date/picker/styles.css";
(window as any).__parse = parse;
(window as any).__summarize = summarize;
createRoot(document.getElementById("root")!).render(<TypeDatePicker today="2026-09-14" defaultText="oct 2 to oct 5" />);
`,
);
writeFileSync(join(app, "index.html"), `<!doctype html><meta charset="utf-8"><div id="root"></div><script type="module" src="./out/main.js"></script><link rel="stylesheet" href="./out/main.css">`);
run(join(app, "node_modules/.bin/esbuild"), ["main.tsx", "--bundle", "--splitting", "--format=esm", "--outdir=out", "--jsx=automatic", "--loader:.css=css"], app);

// 4. Serve and load it.
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
const server = createServer((req, res) => {
  const path = join(app, req.url === "/" ? "index.html" : decodeURIComponent(req.url.split("?")[0]));
  try {
    res.setHeader("content-type", types[extname(path)] ?? "application/octet-stream");
    res.end(readFileSync(path));
  } catch {
    res.statusCode = 404;
    res.end();
  }
});
await new Promise((r) => server.listen(0, r));
const url = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".td-cell[aria-selected=true]", { timeout: 10000 }).catch(() => fail("the default text did not produce a selection"));
const selected = await page.evaluate("document.querySelectorAll('.td-cell[aria-selected=true]').length");
const dsl = await page.evaluate("window.__parse('every other sunday', '2026-09-14')");
await browser.close();
server.close();
if (selected !== 4) fail(`expected 4 selected days for "oct 2 to oct 5", got ${selected}`);
if (!/^d R w\/2 su/.test(dsl)) fail(`parse("every other sunday") returned ${dsl}`);
if (errors.length) fail(`browser errors: ${errors.join(" | ")}`);
console.log(`ok: "oct 2 to oct 5" selected ${selected} days, parse("every other sunday") = ${dsl}, no browser errors`);
console.log(`scratch project: ${work}`);
