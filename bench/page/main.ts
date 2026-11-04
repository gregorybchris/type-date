import { baselines } from "@type-date/baselines";
import { OrtCustomEngine } from "@type-date/engines";
import * as ort from "onnxruntime-web";

interface Row { text: string; dsl: string }
interface Args {
  baseUrl: string;
  manifest: Record<string, unknown> & { files: Record<string, string>; dir?: string };
  backend: "wasm" | "webgpu";
  rows: Row[];
  threads: number;
  engine?: string;
  today?: string;
}

declare global {
  interface Window { runBench: (a: Args) => Promise<unknown> }
}

window.runBench = async (a: Args) => {
  ort.env.wasm.wasmPaths = "/ort/";
  ort.env.wasm.numThreads = a.threads;
  const eng =
    a.engine && baselines[a.engine]
      ? baselines[a.engine]!
      : new OrtCustomEngine({ numThreads: a.threads, wasmPaths: "/ort/" });
  const opts = { today: a.today };
  const t0 = performance.now();
  await eng.load({ baseUrl: a.baseUrl, manifest: a.manifest as never, backend: a.backend });
  const loadMs = performance.now() - t0;
  const first = await eng.predict(a.rows[0]!.text, undefined, opts);
  const warm = Math.min(5, a.rows.length);
  for (let i = 0; i < warm; i++) await eng.predict(a.rows[i]!.text, undefined, opts);
  const lat: number[] = [];
  const toks: number[] = [];
  let ok = 0;
  for (const r of a.rows) {
    const p = await eng.predict(r.text, undefined, opts);
    lat.push(p.ms);
    toks.push(p.outputTokens ?? 0);
    if (p.dsl === r.dsl) ok++;
  }
  eng.dispose();
  return { loadMs, coldFirstMs: first.ms, lat, toks, ok, n: a.rows.length };
};
