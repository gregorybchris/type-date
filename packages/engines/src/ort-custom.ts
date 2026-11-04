import * as ort from "onnxruntime-web";
import { BpeTokenizer } from "./tokenizer";
import type { Engine, LoadOptions, PredictResult } from "./types";

const EOS = 1;
const PAD = 0;

export interface OrtCustomOptions {
  /** Override how files are fetched (used by Node tests). */
  fetchBytes?: (url: string) => Promise<Uint8Array>;
  numThreads?: number;
  wasmPaths?: string;
}

async function defaultFetch(url: string): Promise<Uint8Array> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`fetch ${url}: ${r.status}`);
  return new Uint8Array(await r.arrayBuffer());
}

/**
 * Encoder-decoder greedy decoding with onnxruntime-web and our own loop.
 * Uses `encoder_model.onnx` and `decoder_model.onnx` (no KV cache: outputs are short).
 */
export class OrtCustomEngine implements Engine {
  readonly id = "ort-custom";
  private enc!: ort.InferenceSession;
  private dec!: ort.InferenceSession;
  private tok!: BpeTokenizer;
  private maxIn = 63;
  private maxOut = 39;
  constructor(private options: OrtCustomOptions = {}) {}

  async load(opts: LoadOptions): Promise<void> {
    const fetchBytes = this.options.fetchBytes ?? defaultFetch;
    const m = opts.manifest;
    if (!m) throw new Error("manifest required");
    const dir = `${opts.baseUrl.replace(/\/$/, "")}/${(m as { dir?: string }).dir ?? ""}`.replace(/\/$/, "");
    if (this.options.numThreads !== undefined) ort.env.wasm.numThreads = this.options.numThreads;
    if (this.options.wasmPaths) ort.env.wasm.wasmPaths = this.options.wasmPaths;
    const ep = opts.backend === "webgpu" ? ["webgpu", "wasm"] : ["wasm"];
    const so: ort.InferenceSession.SessionOptions = {
      executionProviders: ep,
      graphOptimizationLevel: "all",
    };
    const [e, d, t] = await Promise.all([
      fetchBytes(`${dir}/${m.files.encoder}`),
      fetchBytes(`${dir}/${m.files.decoder}`),
      fetchBytes(`${dir}/${m.files.tokenizer}`),
    ]);
    opts.onProgress?.(0.6);
    this.tok = new BpeTokenizer(JSON.parse(new TextDecoder().decode(t)));
    this.enc = await ort.InferenceSession.create(e, so);
    this.dec = await ort.InferenceSession.create(d, so);
    const c = m.config ?? {};
    this.maxIn = Number(c.max_input_tokens ?? 63);
    this.maxOut = Number(c.max_output_tokens ?? 39);
    opts.onProgress?.(1);
  }

  async predict(text: string, signal?: AbortSignal): Promise<PredictResult> {
    const t0 = performance.now();
    const ids = [...this.tok.encode(text).slice(0, this.maxIn), EOS];
    const x = new ort.Tensor("int64", BigInt64Array.from(ids.map(BigInt)), [1, ids.length]);
    const mask = new ort.Tensor("int64", BigInt64Array.from(ids.map(() => 1n)), [1, ids.length]);
    const encOut = await this.enc.run({ input_ids: x, attention_mask: mask });
    const hidden = encOut.last_hidden_state as ort.Tensor;
    const out: number[] = [PAD];
    for (let step = 0; step < this.maxOut; step++) {
      if (signal?.aborted) throw new DOMException("aborted", "AbortError");
      const dIds = new ort.Tensor("int64", BigInt64Array.from(out.map(BigInt)), [1, out.length]);
      const r = await this.dec.run({
        input_ids: dIds,
        encoder_hidden_states: hidden,
        encoder_attention_mask: mask,
      });
      const logits = r.logits as ort.Tensor;
      const vocab = logits.dims[2] as number;
      const data = logits.data as Float32Array;
      const off = (out.length - 1) * vocab;
      let best = 0;
      let bv = -Infinity;
      for (let i = 0; i < vocab; i++) {
        const v = data[off + i] as number;
        if (v > bv) {
          bv = v;
          best = i;
        }
      }
      if (best === EOS) break;
      out.push(best);
    }
    return {
      dsl: this.tok.decode(out.slice(1)),
      ms: performance.now() - t0,
      outputTokens: out.length - 1,
    };
  }

  dispose(): void {
    void this.enc?.release();
    void this.dec?.release();
  }
}
