# Browser inference engines for a tiny datetime model

Date of research: 2026-11-03. Method: web search and doc fetches. Items marked UNVERIFIED were not confirmed in a primary source and must be measured by us.

## Context

- Model: 10-100M params, seq2seq or decoder-only, 30-60 output tokens.
- Runs on each debounced keystroke, in the browser, shipped as an npm package for React.
- Latency target is our own. Assume the full parse must finish in roughly 100-300 ms after debounce. Tokens/sec matters more than TTFT because outputs are short but sequential.
- Weights at int8 are about 10-100 MB. At int4, about 5-50 MB.

## Summary table

| Engine | Format | Runtime size | Arch support | Backends | Fit |
|---|---|---|---|---|---|
| Transformers.js v4 (ORT Web) | ONNX | ORT wasm 10-12 MB (CPU), 19-23 MB (JSEP/WebGPU) | enc-dec and decoder-only, ~200 archs | WASM SIMD+threads, WebGPU | Best default |
| onnxruntime-web direct | ONNX | same as above; custom build can shrink | any ONNX graph; we write the decode loop | WASM, WebGPU, WebNN | Best control, smaller JS |
| WebLLM / MLC | MLC weights + TVM wasm lib | UNVERIFIED, wasm lib per model | decoder-only (LLM families); custom needs compile | WebGPU only | Poor fit for tiny models |
| wllama | GGUF | wasm single + multi thread; sizes UNVERIFIED | decoder-only (llama.cpp archs); some enc-dec in llama.cpp (T5) | WASM only (CPU) | Good CPU baseline |
| TensorFlow.js | TF.js graph/layers | large | poor seq2seq/generation story | WebGL, WASM, WebGPU | Poor fit |
| LiteRT.js | .tflite | `@litertjs/core`, size UNVERIFIED | transformers possible; LLMs via LiteRT-LM.js | XNNPACK wasm, WebGPU (ML Drift), WebNN exp. | Worth one experiment |
| MediaPipe LLM Inference | task bundle (TFLite) | n/a | LLMs only | WebGPU only | Maintenance mode; skip |
| Chrome Prompt API (Gemini Nano) | built in | 0 | Not fine-tunable | on-device | Baseline only |
| candle wasm | safetensors/GGUF | small Rust wasm; UNVERIFIED | T5, Whisper, LLaMA-like demos | CPU wasm (SIMD) | Possible, high effort |
| burn wasm | burn record | small | write model in Rust | ndarray wasm, wgpu | High effort |
| ctranslate2 wasm | CT2 | no official wasm build found | enc-dec, decoder-only | none in browser | Not available |
| tract wasm | ONNX/NNEF | small Rust wasm | ONNX subset, no KV-cache help | CPU wasm | Possible, high effort |
| Hand-written wasm/JS | custom | smallest (tens of KB) | anything we implement | wasm SIMD | Best size, highest effort |

## Per-engine notes

### Transformers.js v4 (ONNX Runtime Web)

- v4 is on npm. Main change is a WebGPU runtime rewritten in C++ with the ONNX Runtime team, tested across about 200 architectures. WebGPU models also work in Node, Bun and Deno. Source: https://github.com/huggingface/transformers.js/releases/tag/4.0.0
- v4.2 adds `env.useWasmCache` for offline use and tool calling in text generation. Source: https://github.com/huggingface/transformers.js/releases
- Pipelines handle tokenizer, KV cache, generate loop, and seq2seq (encoder + decoder-with-past ONNX files). We do not write the loop.
- Cache: Cache API by default (`env.useBrowserCache = true`, cache key `transformers-cache`). Custom cache possible via `env.useCustomCache` and `env.customCache` (needs `match` and `put`). Wasm binaries are also cached via `useWasmCache`. Source: https://huggingface.co/docs/transformers.js/api/env
- Local/own hosting: `env.allowRemoteModels = false`, `env.localModelPath`, or `env.remoteHost` and `env.remotePathTemplate` to point at our CDN. Same source.
- Next.js: tutorial uses `new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })` and says to exclude Node-only deps (onnxruntime-node, sharp) from the client bundle. Source: https://huggingface.co/docs/transformers.js/tutorials/next.md
- Vite: community reports say to add the package to `optimizeDeps.exclude` and set worker format to `es`. UNVERIFIED. Source: https://www.sitepoint.com/optimizing-transformers-js-production/
- Cost: the library is larger than ORT Web alone (tokenizers, pipelines). Exact gzip size UNVERIFIED.

### onnxruntime-web directly

- Binaries: `ort-wasm-simd-threaded.wasm` (SIMD + threads), `ort-wasm-simd-threaded.jsep.wasm` (adds WebGPU/WebNN). Source: https://onnxruntime.ai/docs/tutorials/web/deploy.html
- Sizes seen in third-party manifests: non-JSEP threaded about 10.6-12.3 MB; JSEP threaded about 19.5-22.9 MB. emsdk 4.0.3 upgrade cut them to 10.9 MB and 21.2 MB. Sources: https://huggingface.co/janitr/experiments/blob/main/runtime/onnxruntime-web/RUNTIME_INFO.json , https://app.semanticdiff.com/gh/microsoft/onnxruntime/commit/e6ae1bb13c9ec5ee1ef3f0428c46ef8607728848 . These are not official numbers. Check `dist/` of the pinned version.
- Import `onnxruntime-web/wasm` to get a CPU-only JS bundle. Set `ort.env.wasm.wasmPaths` to a CDN or own path. Same-origin workers load directly; cross-origin workers load via object URL. CSP-restricted loading works since v1.19. Source: deploy page above.
- A custom build with only the needed kernels shrinks the wasm. The docs page for this is marked under construction. Same page.
- WebGPU EP docs: graph capture is for static shapes only. Dynamic decoder shapes cannot use it. IO binding keeps tensors on GPU. Source: https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html and https://onnxruntime.ai/docs/tutorials/web/performance-diagnosis.html
- Use `enableProfiling` to see per-kernel time.
- We would write the tokenizer, KV-cache plumbing and decode loop. For a closed output grammar (datetime JSON/ISO) this is manageable and lets us do constrained decoding.
- Large models: cache in IndexedDB. Models with external data need extra config. Source: deploy page.
- Vite: demo issue reports ORT source being processed by Vite. Workaround is copying the wasm via `?url` imports and setting `wasmPaths`. Source: https://github.com/microsoft/onnxruntime-web-demo/issues/15

### WebLLM / MLC

- WebGPU for GPU work. Model is compiled by MLC-LLM/TVM into quantized weights plus a wasm library with WebGPU kernels. Custom models need `mlc_llm compile --device webgpu` and building mlc_llm from source. Sources: https://llm.mlc.ai/docs/deploy/webllm.html , https://blog.mlc.ai/2024/06/13/webllm-a-high-performance-in-browser-llm-inference-engine
- Requires WebGPU. No WASM CPU fallback for inference. Some models need `shader-f16`.
- Built for 1B+ LLMs. Seq2seq not supported. Compile toolchain is heavy for an npm package we want others to build on.
- Verdict: skip for the first round.

### wllama (llama.cpp wasm)

- GGUF models. Ships `single-thread/wllama.wasm` and `multi-thread/wllama.wasm`, auto-selected. Multi-thread needs COOP/COEP headers. Source: https://npmjs.com/package/@wllama/wllama
- Model cache uses OPFS under a cache manager. Large models can be split with `llama-gguf-split` (2 GB ArrayBuffer limit). Source: https://cdn.jsdelivr.net/npm/@wllama/wllama@3.8.1/README-dev.md
- CPU only. No WebGPU. Package unpacked size was 12.5 MB at v1.17.0 (old). Wasm sizes for current version UNVERIFIED (run `npm pack`).
- Good for decoder-only fine-tunes (SmolLM, Qwen small, custom llama-style). GGUF Q4/Q8 conversion is mature.
- COOP/COEP requirement is a packaging burden for library consumers. Single-thread fallback works without it.

### TensorFlow.js

- Confirm poor fit. No official deprecation notice found, but Google positions LiteRT.js as the inference successor and TF.js as pre/post-processing. Sources: https://ai.google.dev/edge/litert/web/index , https://www.stork.ai/blog/google-just-killed-tensorflowjs (commentary, not official).
- Weak support for autoregressive generation with KV cache. Conversion from PyTorch is awkward. No reason to pick it over ORT Web.

### LiteRT.js (TFLite for web)

- Announced 2026-07-09. `.tflite` models. CPU via XNNPACK wasm (multi-thread, relaxed SIMD), GPU via ML Drift on WebGPU, NPU via WebNN (experimental). Package `@litertjs/core`. Source: https://developers.googleblog.com/en/litertjs-googles-high-performance-web-ai-inference/
- Google claims up to 3x faster than other web runtimes (ORT baseline) on vision/audio models on an M4 MacBook Pro. 5-60x for GPU vs CPU. Same source. These are not for generative models.
- LLM support is in a separate LiteRT-LM JS API. MediaPipe LLM Inference is maintenance-only and points to LiteRT-LM. Source: https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference/web_js
- Conversion from PyTorch via LiteRT Torch. Seq2seq with dynamic KV cache in `.tflite` is the risk. UNVERIFIED for our case.

### MediaPipe LLM Inference

- WebGPU only. Model must be converted to a GPU-compatible format. Maintenance-only. Source above.
- Skip.

### Chrome Prompt API / Gemini Nano

- Not fine-tunable. Model is around 4 GB in 2026 reports, auto-downloaded by Chrome. Stable status unclear; low-quality secondary sources only. Sources: https://dev.to/mrtd/chrome-put-a-4gb-ai-model-on-your-computer-what-gemini-nano-means-for-privacy-2n4i , https://github.com/Ar9av/gemini-nano-chrome/wiki
- Use only as a quality and latency baseline on Chrome with the model present. Not a shipping path (Chrome only, user hardware gated).
- Check https://developer.chrome.com/docs/ai/built-in for the current status before testing.

### candle wasm (Rust)

- Hugging Face candle has wasm examples (T5, Whisper, LLaMA2-style). I found no published latency numbers. UNVERIFIED.
- CPU wasm only in practice. Rust toolchain needed. Quantized GGUF support exists.

### burn wasm

- MNIST web demo with `ndarray` (CPU) and `wgpu` backends. In the demo, 1.5 MB of a 1.87 MB wasm was model params, so the runtime is small. Source: https://github.com/WorldSEnder/burn/blob/main/examples/mnist-inference-web
- We would reimplement the transformer in Rust. No transformer-in-browser benchmarks found.

### ctranslate2 wasm

- No official wasm build found. Repo lists x86-64 and ARM64 only. Source: https://github.com/OpenNMT/CTranslate2 . Treat as unavailable.

### tract wasm

- Pure Rust ONNX inference that compiles to wasm. I found no recent browser results. UNVERIFIED for transformer decoders with KV cache. Low priority.

### Hand-written minimal wasm/JS

- For a 10-30M model with fixed architecture, one can write matmul kernels in wasm SIMD (Rust or C via Emscripten, or hand JS with typed arrays). Runtime would be tens of KB instead of 10-20 MB.
- Needs: int8 or int4 weight format, custom tokenizer, KV cache, constrained decoding. Weeks of work and own correctness testing.
- Consider only if ORT Web's 10-20 MB wasm or its per-run overhead proves too costly. Use as a later experiment.

## Published latency numbers (10-100M params)

Very little exists for generative models in this size range. What I found:

- Transformers.js embedding benchmark, all-MiniLM-L6-v2 (22M params, encoder only), batch 1, seq 512, fp32, Chrome:
  - Windows: about 507 ms WASM vs about 46 ms WebGPU.
  - macOS: about 355 ms vs about 50 ms; another macOS run about 386 ms vs about 24 ms.
  - Sources: https://huggingface.co/spaces/Xenova/webgpu-embedding-benchmark/discussions/1 , /discussions/7 , /discussions/4
  - These are encoder passes at 512 tokens, not 30-60 step decoding. Our inputs are about 10-30 tokens, so WASM would be much faster than 355 ms.
- An article argues WebGPU loses on very small models because of dispatch and readback overhead per step. No measurement. Source: https://www.sitepoint.com/webgpu-vs-webasm-transformers-js/
- A 2026 blog reports a 3-10 s first-use WebGPU shader compile window. Secondary source. https://tianpan.co/blog/2026-04-17-browser-native-llm-inference-webgpu
- A Transformers.js performance leaderboard dataset exists (includes SmolLM2-135M WASM fp32). Numbers not extracted. https://huggingface.co/datasets/whitphx/transformersjs-performance-leaderboard-results
- No published tokens/sec for T5-small, flan-t5-small, or distilgpt2 found. We must measure.

Expectation (hypothesis, not a measurement): for a decoder of 20-60M params with KV cache, each token step is a few ms on WASM SIMD with threads. At 40 tokens that is about 100-300 ms. WebGPU adds per-step dispatch cost and a cold shader compile. WASM may win for tiny models. The benchmark must decide.

## Dimension notes

### WebGPU vs WASM for tiny models

- WASM SIMD: baseline in all modern browsers.
- WASM threads: need `SharedArrayBuffer`, so COOP `same-origin` plus COEP `require-corp` or `credentialless` on the host page. A library cannot set these. Without them ORT Web and wllama run single-threaded.
- WebGPU: now shipped in Chrome, Edge, Firefox and Safari per a 2026 source (uneven quality). Needs secure context. Cold shader compile cost. Dynamic decoder shapes block ORT graph capture.
- Plan: ship WASM as the default, WebGPU as opt-in, and measure both.

### Cold start

Components: download wasm runtime, download weights, instantiate session, first-run kernel/shader compile, warm-up inference. Measure each separately. Warm-up call at load hides first-call cost.

### Memory

- Weights in memory approximately file size (int8 about 1 byte/param) plus ORT arena and KV cache. WASM heap is capped at 4 GB. Measure with the methods below.

### Web Worker

- All engines above run in a worker. ORT Web already uses a proxy worker (`env.wasm.proxy`) and thread workers. Run our own worker anyway to keep the UI thread free and to cancel stale requests when new keystrokes arrive.
- With debounce, cancel in-flight generation by checking an abort flag between decode steps.

### Caching of model files

- Cache API: Transformers.js default. Simple, works with service workers.
- IndexedDB: recommended by ORT docs for large models.
- OPFS: used by wllama. Fast, partial Safari gaps. Source: https://www.ertas.ai/docs/ship/web
- Cross-Origin Storage (experimental, needs Chrome extension) would share weights across sites. Not usable yet. Source: env docs above.
- Request `navigator.storage.persist()` so the browser does not evict.

### Packaging weights in the npm package

| Option | Pros | Cons |
|---|---|---|
| Bundle weights in npm tarball | offline, no CDN, versioned together | tarball 10-100 MB, slows installs, apps must copy/serve assets, npm size limits and unpkg/jsdelivr 50 MB (jsDelivr limit, UNVERIFIED) |
| Fetch from CDN (jsDelivr/unpkg of a companion package, or HF Hub) | small install, cacheable, separate model versioning | needs network on first use, CORS and CSP config, third-party dependency |
| Hybrid: tiny model bundled, larger fetched | good default | two paths to test |

Recommendation: publish weights in a separate npm package (e.g. `type-date-model-*`) or on HF Hub, and let the main package load by URL with a configurable `modelUrl`. Pin by content hash. Cache with Cache API. Provide an option for self-hosting under `/public`.

Bundlers:
- Use `new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })`. Vite and Next.js (webpack and Turbopack) support this pattern. Check Turbopack separately. UNVERIFIED.
- Do not let the bundler inline the wasm. Reference it by URL (`wasmPaths`) from CDN or copied asset.
- Next.js: mark the code client-only (`'use client'`, dynamic import with `ssr: false`). Alias away `onnxruntime-node` and `sharp`.
- For apps that need threads: document COOP/COEP headers for Vite (`server.headers`) and Next (`headers()` in config).

## Measuring latency and memory in a browser harness

### Timing

- Use `performance.now()` inside the page (and worker). Use `performance.mark/measure` for phases.
- Phases: `t_runtime_fetch`, `t_model_fetch`, `t_session_create`, `t_first_infer` (cold), `t_warm_infer` (steady), per-token step times.
- TTFT = request start to first generated token. Total latency = request start to final parsed result. Tokens/sec = generated tokens / decode time (exclude prefill).
- Run N warm iterations (e.g. 200) over a fixed query set. Report p50, p95, p99 and max. Discard the first few. Record the cold run separately.
- Timer resolution is clamped without cross-origin isolation (about 100 µs in Chrome, coarser in Firefox). Serve the harness with COOP/COEP to get 5 µs.
- For WebGPU, `await` a readback (`mapAsync` or ORT output `getData`) before stopping the timer. Otherwise timing misses GPU work.

### Memory

- `performance.measureUserAgentSpecificMemory()`: needs secure context and cross-origin isolation; covers iframes and workers; async and can take seconds. Sources: https://developer.mozilla.org/docs/Web/API/Performance/measureUserAgentSpecificMemory , https://web.dev/articles/monitor-total-page-memory-usage
- `performance.memory`: non-standard, Chrome only, main thread only (not enabled in workers), coarse. Launch Chromium with `--enable-precise-memory-info` for exact values.
- From Node via CDP (Playwright `context.newCDPSession(page)`): `Performance.getMetrics` (JSHeapUsedSize, etc.), `Memory.getDOMCounters`, and `HeapProfiler`. These do not see the wasm linear memory fully or GPU memory. UNVERIFIED for wasm detail.
- Add `process.memoryUsage` equivalent for the browser process: sample RSS of the Chromium renderer pid from Node (`ps -o rss= -p <pid>`) before load, after load, and after N inferences. This captures wasm and GPU-shared memory on Apple Silicon. Get the pid with `browser.process()` (child pids via `pgrep -P`) or CDP `SystemInfo.getProcessInfo`.
- Also record wasm memory from inside: `WebAssembly.Memory.buffer.byteLength` when exposed, and model file size.
- Run each engine in a fresh browser process and a fresh page. Never run two engines in one process.

### Headless Chromium with WebGPU on macOS

- Headless Chrome hides WebGPU by default. A third-party tool reports `--enable-unsafe-webgpu` makes it work, with native Metal on macOS and no extra flags. Source: https://agent-browser.dev/webgpu . This is a secondary source. Verify with `navigator.gpu.requestAdapter()` and log `adapter.info` in every run.
- Chrome's troubleshooting guide: null adapter fix is `enable-unsafe-webgpu`; check `chrome://gpu`. Source: https://developer.chrome.com/docs/web-platform/webgpu/troubleshooting-tips
- Headless defaults to SwiftShader (software) on many platforms, and `--enable-gpu` overrides it. Source: https://chromium.googlesource.com/chromium/src/+/main/chrome/browser/headless/headless_mode_switches.h . A SwiftShader adapter gives meaningless timings. The harness must fail the run if the adapter is software (`adapter.info.device`/`isFallbackAdapter`).
- Suggested launch args to try (UNVERIFIED combination): `--enable-unsafe-webgpu --enable-gpu --use-angle=metal --enable-features=Vulkan` (drop Vulkan on macOS if it errors) `--enable-precise-memory-info`. Use `channel: 'chrome'` (installed Chrome) first, since bundled headless shell may lack GPU. Fall back to headed mode (`headless: false`) for WebGPU runs if headless fails.
- Do not benchmark under load. Close other apps, fix power mode, plug in the laptop. Pin the Chrome version and record it.
- WASM runs are the same in headless and headed. WebGPU numbers in headless must be cross-checked once against headed.

### Harness design (Node-driven)

1. Layout: `bench/` with `server.ts` (static server that sets COOP/COEP, CORS, Cache-Control and can throttle), `pages/<engine>.html` + `<engine>.worker.js` with a common interface, `runner.ts` (Playwright), `queries.json` (fixed set of about 200 natural-language inputs with expected outputs), `results/*.json`.
2. Common adapter interface in each page: `init(config) -> {timings}`, `infer(text) -> {output, tokens, timings}`, `dispose()`. Expose as `window.bench`.
3. Runner: for each (engine, backend, threads, model variant, cache state): launch fresh Chromium, open page, call `init`, run warm-up, run the query set K times, collect JSON via `page.evaluate`, sample RSS from Node at fixed points, close.
4. Cache states: cold (new `userDataDir`, empty cache), warm-network (fresh page, populated Cache API/IndexedDB; use a persistent `userDataDir`), hot (same page, second `init`). Use a persistent context for the warm case.
5. Network: report download bytes and time with Playwright `page.on('response')` or CDP Network. Optionally throttle with CDP `Network.emulateNetworkConditions` for a realistic 4G/broadband scenario.
6. Correctness: compare each output to the expected datetime. Record exact-match rate. A fast wrong model is not useful. Also check that quantization variants stay within an accuracy budget.
7. Metrics per run: env (Chrome version, OS, CPU, adapter info, `crossOriginIsolated`, `navigator.hardwareConcurrency`), bytes (wasm, weights, JS gz), times (above), p50/p95/p99, tokens/sec, RSS at 4 points, JS heap, accuracy.
8. Repeat each config at least 5 launches. Report the median of medians and the spread. Fail runs with SwiftShader adapter or non-isolated page when threads were requested.
9. Output: one JSON per run plus a CSV summary. Keep raw per-token step times for plots.
10. Matrix: threads in {1, 2, 4}, backend in {wasm, webgpu}, dtype in {fp32, fp16, int8, int4}, input length buckets.

## Recommendation

Implement these three first.

1. **Transformers.js v4 (ORT Web) with WASM and WebGPU.** Fastest path to a working baseline. Supports enc-dec and decoder-only, caching, worker pattern and Next.js docs exist. Gives an apples-to-apples WASM vs WebGPU comparison on the same ONNX export. Reveals the library overhead versus raw ORT.
2. **onnxruntime-web direct with our own decode loop.** Same ONNX model, so the delta isolates Transformers.js overhead. Allows constrained decoding for the datetime grammar, a smaller JS bundle (`onnxruntime-web/wasm`), custom wasm path and a possible custom ORT build. This is the likely production engine.
3. **wllama (llama.cpp GGUF, CPU wasm).** Different runtime, different quantization (Q4/Q8 GGUF), mature SIMD kernels, OPFS caching. Tests whether a decoder-only fine-tune in GGUF beats ORT on CPU. Cheap to try if the model is llama-family.

Next, in order: LiteRT.js (if a `.tflite` export of the decoder with KV cache is feasible), then a hand-written wasm SIMD runtime (if size or per-step overhead dominates), then candle wasm. Use the Chrome Prompt API as a quality-only baseline on a Chrome machine. Skip WebLLM/MLC (WebGPU-only, LLM-sized), MediaPipe LLM (maintenance mode), TensorFlow.js, and CTranslate2 (no wasm build).

Open questions the first experiments must answer:
- Does WASM with 1 thread meet the latency budget, or are threads (COOP/COEP) required?
- Does WebGPU beat WASM at 10-30 input and 30-60 output tokens, after cold shader compile?
- What int8/int4 accuracy loss is acceptable?
- Is a decoder-only model or a small seq2seq faster at equal accuracy?

## Sources

- https://github.com/huggingface/transformers.js/releases/tag/4.0.0
- https://github.com/huggingface/transformers.js/releases
- https://huggingface.co/docs/transformers.js/api/env
- https://huggingface.co/docs/transformers.js/tutorials/next.md
- https://www.sitepoint.com/optimizing-transformers-js-production/
- https://www.sitepoint.com/webgpu-vs-webasm-transformers-js/
- https://onnxruntime.ai/docs/tutorials/web/deploy.html
- https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html
- https://onnxruntime.ai/docs/tutorials/web/performance-diagnosis.html
- https://huggingface.co/janitr/experiments/blob/main/runtime/onnxruntime-web/RUNTIME_INFO.json
- https://app.semanticdiff.com/gh/microsoft/onnxruntime/commit/e6ae1bb13c9ec5ee1ef3f0428c46ef8607728848
- https://github.com/microsoft/onnxruntime-web-demo/issues/15
- https://huggingface.co/spaces/Xenova/webgpu-embedding-benchmark/discussions/1
- https://huggingface.co/spaces/Xenova/webgpu-embedding-benchmark/discussions/4
- https://huggingface.co/spaces/Xenova/webgpu-embedding-benchmark/discussions/7
- https://huggingface.co/datasets/whitphx/transformersjs-performance-leaderboard-results
- https://llm.mlc.ai/docs/deploy/webllm.html
- https://blog.mlc.ai/2024/06/13/webllm-a-high-performance-in-browser-llm-inference-engine
- https://npmjs.com/package/@wllama/wllama
- https://cdn.jsdelivr.net/npm/@wllama/wllama@3.8.1/README-dev.md
- https://www.ertas.ai/docs/ship/web
- https://developers.googleblog.com/en/litertjs-googles-high-performance-web-ai-inference/
- https://ai.google.dev/edge/litert/web/index
- https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference/web_js
- https://www.stork.ai/blog/google-just-killed-tensorflowjs
- https://dev.to/mrtd/chrome-put-a-4gb-ai-model-on-your-computer-what-gemini-nano-means-for-privacy-2n4i
- https://github.com/Ar9av/gemini-nano-chrome/wiki
- https://github.com/WorldSEnder/burn/blob/main/examples/mnist-inference-web
- https://github.com/OpenNMT/CTranslate2
- https://tianpan.co/blog/2026-04-17-browser-native-llm-inference-webgpu
- https://developer.mozilla.org/docs/Web/API/Performance/measureUserAgentSpecificMemory
- https://web.dev/articles/monitor-total-page-memory-usage
- https://developer.chrome.com/docs/web-platform/webgpu/troubleshooting-tips
- https://agent-browser.dev/webgpu
- https://chromium.googlesource.com/chromium/src/+/main/chrome/browser/headless/headless_mode_switches.h
