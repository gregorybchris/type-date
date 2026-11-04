# Contracts

File formats and interfaces shared by the eval scripts, the dashboard, and the picker. Change them here first. Since 2026-11-04 there are no model runs: `timing.json`, `bench.json` and the engine load contract are unused (history only).

## Dataset: `data/<version>/`

Version names: `v001`, `v002`, ... Files are JSONL, one example per line.

- `train.jsonl`, `val.jsonl` (random split by template), `test_template.jsonl` (held-out templates), `test_noise.jsonl` (held-out noise ops), `test_external.jsonl` (mined and hand-written)
- `meta.json`: `{version, created, counts: {split: n}, by_tag: {tag: {split: n}}, notes}`

Example line:

```json
{"id": "g-000123", "text": "oct 2 to oct 5", "dsl": "d 10-02>10-05", "primary_tag": "basic-date-range",
 "modifier_tags": ["abbreviation"], "source": "grammar", "split": "train", "parent_id": null}
```

`source` is `grammar`, `llm`, `mined`, `handwritten`, `noise`, or `prefix`. The label is a DSL line (see `specs/dsl.md`). Labels do not depend on the current date.

## Eval sets: `evals/<version>/`

Versioned, immutable eval sets (`e1`, `e2`, ...). Rules in `specs/research/eval-versioning.md`. Files: `manifest.json`, and one JSONL per split (`val`, `test_template`, `test_noise`, `test_llm`, `test_external`) with the same row format as dataset rows. Training datasets under `data/` hold training rows only (older versions still contain their original test files).

## Run: `runs/exp-NNN/`

One directory per experiment. Committed to git. Small files only. `NNN` is a zero-padded sequential number. The matching write-up is `specs/research/experiments/exp-NNN-<slug>.md`.

`config.json`:

```json
{"id": "exp-001", "number": 1, "title": "scratch enc-dec 8M", "description": "T5-style encoder-decoder trained from scratch on v002 with BPE tokens. Reference model R0.", "created": "2026-11-03T20:00:00Z",
 "dataset": "v001", "format": "dsl-v1", "notes": "...", "parent": null,
 "model": {"family": "enc-dec-scratch", "params": 8000000, "d_model": 256, "layers": "4+4", "vocab": 4000},
 "train": {"epochs": 10, "batch_size": 128, "lr": 0.0005, "seed": 0, "device": "mps"},
 "export": {"format": "onnx", "quant": "int8"}}
```

`title` is a short label (about 40 characters or fewer) used on chart points, legends, and table rows. `description` is one or two plain sentences saying what the experiment is and why. Both are required for new experiments. The dashboard shows the title next to the experiment number everywhere and the description in tables, tooltips, and the detail page.

`metrics.json`:

```json
{"eval": {"version": "e1", "exact": 0.93, "resolved": 0.95, "n": 5000,
          "by_split": {"val": {"n": 3000, "exact": 0.97}, "test_template": {"n": 1000, "exact": 0.85}},
          "by_tag": {"basic-date": {"n": 120, "exact": 0.99}},
          "by_modifier": {"typo": {"n": 400, "exact": 0.88}}},
 "model": {"params": 8000000, "size_bytes": 9400000, "avg_output_tokens": 11.2},
 "train": {"seconds": 3600, "steps": 20000, "final_loss": 0.04}}
```

`eval.version` names the eval set (`evals/<version>`). Re-scores on other versions are stored under `evals` as `{"e2": {...same shape as eval...}}`. Compare only within one version. `exact` is exact match on the normalized DSL line. `resolved` is equality of resolved dates over several reference dates.

`timing.json`: wall time per stage and bucket. Written by `td train run` (stage `train`), `td export run` (stage `export`), and `bench/run.ts` (stages `bench-<backend>-<profile>`). Shape:

```json
{"total_s": 812.4,
 "stages": {"train": {"stages": {"started_at": "...", "finished_at": "..."}, "total_s": 790.1,
                      "buckets": {"data_load": 0.2, "tokenizer_train": 0.1, "encode_train": 0.3, "model_init": 0.3,
                                  "train_loop": 640.0, "train_loop/forward": 280.0, "train_loop/backward": 290.0,
                                  "train_loop/optim": 60.0, "train_loop/collate": 5.0, "train_loop/sync_loss": 5.0,
                                  "eval_generate": 120.0, "eval_score": 2.0, "save_checkpoint": 0.2, "write_results": 0.1},
                      "unaccounted_s": 0.1, "train_profile": {"steps": 7980, "step_ms": 80.2, "samples_per_s": 1600}},
            "export": {"total_s": 20.1, "buckets": {"onnx_export": 15.0, "quantize": 4.0}},
            "bench-wasm-desktop": {"total_s": 14.0, "buckets": {"esbuild_bundle": 0.3, "browser_launch": 1.0, "run_in_browser": 10.0}}},
 "buckets": {"train.train_loop": 640.0, "export.onnx_export": 15.0}}
```

Buckets with `/` are sub-buckets of the parent and are not added into totals. `train_loop/*` shares come from sampled steps with device syncs, scaled to the loop total. `td exp timing` prints the summary.

`errors.jsonl`: one line per failure on the eval sets.

```json
{"id": "g-000123", "text": "oct 2 to oct 5", "split": "val", "primary_tag": "basic-date-range",
 "modifier_tags": [], "expected": "d 10-02>10-05", "predicted": "d 10-02>10-06"}
```

`bench.json`: array of browser benchmark results. One entry per (engine, backend).

```json
[{"engine": "ort-custom", "backend": "wasm", "browser": "chromium", "profile": "desktop", "load_ms": 420, "cold_first_ms": 80,
  "latency_ms": {"p50": 22, "p95": 40, "p99": 55}, "tokens_per_s": 480,
  "memory_mb": 95, "download_bytes": 9400000, "n": 200, "browser_accuracy": 0.93}]
```

`profile` is `desktop` (no throttling) or `mobile-4x`, `mobile-6x` (CPU throttle plus a phone viewport). Mobile results are emulated until a real phone is tested.

## Artifacts: `artifacts/exp-NNN/` (gitignored)

Model files for the browser. Kept only for experiments on or near the Pareto front. `manifest.json`:

```json
{"experiment": "exp-001", "engine": "ort-custom", "quant": "int8",
 "files": {"encoder": "encoder_model.onnx", "decoder": "decoder_model.onnx", "tokenizer": "tokenizer.json"},
 "config": {"max_input_tokens": 48, "max_output_tokens": 32, "decoder_start_token_id": 0, "eos_token_id": 1}}
```

The dashboard dev server serves `artifacts/` at `/artifacts/` and lists runs at `/api/runs`.

## Engine interface (`packages/engines`)

```ts
export interface PredictResult { dsl: string; ms: number; outputTokens?: number }
export interface Engine {
  readonly id: string;                       // "ort-custom", "transformers-js", "wllama"
  load(opts: { baseUrl: string; manifest: Manifest; backend?: "wasm" | "webgpu"; onProgress?: (p: number) => void }): Promise<void>;
  predict(text: string, signal?: AbortSignal): Promise<PredictResult>;
  dispose(): void;
}
```

Non-model baselines (chrono-node adapter, heuristic parsers) implement the same `Engine` interface. They have no `manifest.files`, and `load` may do nothing. Their `config.json` uses `model.family` of `library` or `heuristic`, `params` of 0, and `download_bytes` equal to the bundled code size. The dashboard treats them like any other entry.

`@type-date/engines` also exports `createEngine(id: string): Engine` and a registry `engines: Record<string, () => Engine>`. The dashboard Playground uses them.

Baselines have a `manifest.json` of `{"experiment": "exp-001", "engine": "chrono", "files": {}, "config": {}}`. Their `bench.json` entries use `backend: "js"`.

The picker takes a `parse: (text: string) => Promise<string>` prop (returns a DSL line) so it does not depend on any engine.

## Picker props (`packages/picker`)

```ts
interface TypeDatePickerProps {
  parse: (text: string) => Promise<string>;    // text -> DSL line
  value?: Resolved; onChange?: (r: Resolved) => void;
  today?: string; weekStart?: 0 | 1;
  debounceMs?: number;                         // default 120
  theme?: "light" | "dark" | "system";
  placeholder?: string;
}
```
