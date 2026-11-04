// Usage: tsx run.ts --exp 4 [--backend wasm|webgpu] [--profile desktop|mobile-4x|mobile-6x]
//                    [--data data/v002/test_llm.jsonl] [--n 200] [--threads 1]
// Runs the engine in headless Chromium and writes/updates runs/exp-NNN/bench.json.
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const arg = (k: string, d?: string) => {
  const i = process.argv.indexOf(`--${k}`);
  return i >= 0 ? process.argv[i + 1] : d;
};
const T0 = performance.now();
const marks: Record<string, number> = {};
let lastMark = T0;
const mark = (name: string) => {
  const now = performance.now();
  marks[name] = (marks[name] ?? 0) + (now - lastMark) / 1000;
  lastMark = now;
};
const exp = Number(arg("exp"));
if (!exp) throw new Error("--exp N required");
const backend = (arg("backend", isBaselineArg() ? "js" : "wasm") as "wasm" | "webgpu" | "js");
function isBaselineArg() {
  return ["chrono", "heuristic-small", "heuristic-full", "heuristic-full-2", "heuristic-full-3", "heuristic-full-4"].includes(arg("engine") ?? "");
}
const profile = arg("profile", "desktop") as "desktop" | "mobile-4x" | "mobile-6x";
const dataPath = resolve(root, arg("data", "data/v002/test_llm.jsonl")!);
const n = Number(arg("n", "200"));
const threads = Number(arg("threads", "1"));
const name = `exp-${String(exp).padStart(3, "0")}`;
const artDir = join(root, "artifacts", name);
const engineArg = arg("engine");
const manifestPath = join(artDir, "manifest.json");
const baselineIds = ["chrono", "heuristic-small", "heuristic-full", "heuristic-full-2", "heuristic-full-3", "heuristic-full-4"];
const isBaseline = !!engineArg && baselineIds.includes(engineArg);
const manifest = isBaseline
  ? { experiment: name, engine: engineArg, quant: "none", files: {}, config: {} }
  : JSON.parse(readFileSync(manifestPath, "utf8"));

mark("setup");
// bundle the page
const outDir = join(here, ".dist");
mkdirSync(outDir, { recursive: true });
await build({
  entryPoints: [join(here, "page/main.ts")],
  bundle: true,
  format: "esm",
  outfile: join(outDir, "main.js"),
  minify: true,
  target: "es2022",
  logLevel: "error",
});
mark("esbuild_bundle");
const ortDist = join(here, "node_modules/onnxruntime-web/dist");

const mime: Record<string, string> = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".wasm": "application/wasm", ".json": "application/json", ".onnx": "application/octet-stream",
};
const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]!);
  let file: string | null = null;
  if (url === "/") file = join(here, "page/index.html");
  else if (url === "/main.js") file = join(outDir, "main.js");
  else if (url.startsWith("/ort/")) file = join(ortDist, url.slice(5));
  else if (url.startsWith("/artifacts/")) file = join(root, url);
  if (!file || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, {
    "content-type": mime[extname(file)] ?? "application/octet-stream",
    "cross-origin-opener-policy": "same-origin",
    "cross-origin-embedder-policy": "require-corp",
    "cross-origin-resource-policy": "same-origin",
    "cache-control": "no-store",
  });
  res.end(readFileSync(file));
});
await new Promise<void>((r) => server.listen(0, r));
const port = (server.address() as { port: number }).port;

mark("server_start");
const rows = readFileSync(dataPath, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)).slice(0, n);

const rssOf = (pid: number): number => {
  // sum RSS (KB) of the browser process tree
  const out = execSync("ps -axo pid=,ppid=,rss=").toString().trim().split("\n");
  const kids = new Map<number, number[]>();
  const rss = new Map<number, number>();
  for (const l of out) {
    const [p, pp, r] = l.trim().split(/\s+/).map(Number) as [number, number, number];
    rss.set(p, r);
    kids.set(pp, [...(kids.get(pp) ?? []), p]);
  }
  let total = 0;
  const stack = [pid];
  while (stack.length) {
    const p = stack.pop()!;
    if (p !== pid) total += rss.get(p) ?? 0;
    stack.push(...(kids.get(p) ?? []));
  }
  return total / 1024;
};

const args = ["--enable-unsafe-webgpu", "--enable-features=WebGPU", "--use-angle=metal", "--enable-precise-memory-info"];
const browser = await chromium.launch({ headless: true, args });
const pid = process.pid; // browser is our child: sum RSS of descendants only
mark("browser_launch");
const ctx = await browser.newContext(
  profile === "desktop"
    ? { viewport: { width: 1280, height: 800 } }
    : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
);
const page = await ctx.newPage();
if (profile !== "desktop") {
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: profile === "mobile-4x" ? 4 : 6 });
}
page.on("pageerror", (e) => console.error("pageerror", e.message));
page.on("console", (m) => console.error("console", m.type(), m.text()));
page.on("requestfailed", (r) => console.error("requestfailed", r.url()));
await page.goto(`http://localhost:${port}/`);
// strings, not closures: tsx injects `__name` helpers into closures, which do not exist in the page
await page.waitForFunction("typeof window.runBench === 'function'");
if (backend === "webgpu" && !isBaseline) {
  const hasGpu = await page.evaluate(async () => {
    const g = (navigator as unknown as { gpu?: { requestAdapter(): Promise<unknown> } }).gpu;
    return !!g && !!(await g.requestAdapter());
  });
  if (!hasGpu) throw new Error("WebGPU adapter not available in headless Chromium");
}
mark("page_open");
const rss0 = rssOf(pid);
let peak = rss0;
const timer = setInterval(() => (peak = Math.max(peak, rssOf(pid))), 100);
const res = (await page.evaluate(
  (a) => (window as unknown as { runBench: (x: unknown) => Promise<unknown> }).runBench(a),
  { baseUrl: `http://localhost:${port}/artifacts/${name}`, manifest, backend, rows, threads, engine: engineArg, today: "2026-11-03" },
)) as { loadMs: number; coldFirstMs: number; lat: number[]; toks: number[]; ok: number; n: number };
mark("run_in_browser");
clearInterval(timer);
peak = Math.max(peak, rssOf(pid));
await browser.close();
server.close();

const sorted = [...res.lat].sort((a, b) => a - b);
const q = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))]!;
const dir = join(artDir, (manifest as { dir?: string }).dir ?? "");
let dl = Object.values(manifest.files as Record<string, string>)
  .filter((f) => ["encoder", "decoder", "tokenizer"].some((k) => manifest.files[k] === f))
  .reduce((s, f) => s + (existsSync(join(dir, f)) ? statSync(join(dir, f)).size : 0), 0);
if (isBaseline) {
  const mp = join(root, "runs", name, "metrics.json");
  dl = JSON.parse(readFileSync(mp, "utf8")).model?.size_bytes ?? 0;
}
const totalMs = res.lat.reduce((a, b) => a + b, 0);
const totalToks = res.toks.reduce((a, b) => a + b, 0);
const entry = {
  engine: manifest.engine,
  backend,
  browser: "chromium",
  profile,
  threads,
  load_ms: Math.round(res.loadMs),
  cold_first_ms: Math.round(res.coldFirstMs * 10) / 10,
  latency_ms: { p50: round(q(0.5)), p95: round(q(0.95)), p99: round(q(0.99)) },
  tokens_per_s: Math.round((totalToks / totalMs) * 1000),
  memory_mb: Math.round(peak - rss0),
  download_bytes: dl,
  n: res.n,
  browser_accuracy: res.ok / res.n,
  data: arg("data", "data/v002/test_llm.jsonl"),
};
function round(x: number) { return Math.round(x * 1000) / 1000; }
const runDir = join(root, "runs", name);
mkdirSync(runDir, { recursive: true });
const benchPath = join(runDir, "bench.json");
let all: Record<string, unknown>[] = existsSync(benchPath) ? JSON.parse(readFileSync(benchPath, "utf8")) : [];
all = all.filter((e) => !(e.engine === entry.engine && e.backend === entry.backend && (e.profile ?? "desktop") === entry.profile && e.threads === entry.threads));
all.push(entry);
writeFileSync(benchPath, JSON.stringify(all, null, 2));
mark("write_results");
mergeTiming();
console.log(JSON.stringify(entry));

function mergeTiming() {
  const path = join(runDir, "timing.json");
  const data = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : { stages: {} };
  const stage = `bench-${backend}-${profile}`;
  const total = (performance.now() - T0) / 1000;
  const buckets: Record<string, number> = {};
  for (const [k, v] of Object.entries(marks)) buckets[k] = Math.round(v * 1000) / 1000;
  // in-page split: model load vs timed predictions
  buckets["run_in_browser/model_load"] = Math.round(res.loadMs) / 1000;
  buckets["run_in_browser/predictions"] = Math.round(res.lat.reduce((a, b) => a + b, 0)) / 1000;
  data.stages[stage] = { total_s: Math.round(total * 1000) / 1000, buckets, rows: res.n };
  let all = 0;
  const flat: Record<string, number> = {};
  for (const [st, d] of Object.entries(data.stages) as [string, { total_s: number; buckets?: Record<string, number> }][]) {
    all += d.total_s ?? 0;
    for (const [k, v] of Object.entries(d.buckets ?? {})) flat[`${st}.${k}`] = v;
  }
  data.total_s = Math.round(all * 1000) / 1000;
  data.buckets = flat;
  writeFileSync(path, JSON.stringify(data, null, 2));
}
