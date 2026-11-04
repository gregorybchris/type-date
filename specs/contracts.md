# Contracts

File formats and interfaces shared by training, benchmarks, the dashboard, and the picker. Change them here first.

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

## Run: `runs/exp-NNN/`

One directory per experiment. Committed to git. Small files only. `NNN` is a zero-padded sequential number. The matching write-up is `specs/research/experiments/exp-NNN-<slug>.md`.

`config.json`:

```json
{"id": "exp-001", "number": 1, "title": "from-scratch enc-dec 8M", "created": "2026-11-03T20:00:00Z",
 "dataset": "v001", "format": "dsl-v1", "notes": "...", "parent": null,
 "model": {"family": "enc-dec-scratch", "params": 8000000, "d_model": 256, "layers": "4+4", "vocab": 4000},
 "train": {"epochs": 10, "batch_size": 128, "lr": 0.0005, "seed": 0, "device": "mps"},
 "export": {"format": "onnx", "quant": "int8"}}
```

`metrics.json`:

```json
{"eval": {"exact": 0.93, "resolved": 0.95, "n": 5000,
          "by_split": {"val": {"n": 3000, "exact": 0.97}, "test_template": {"n": 1000, "exact": 0.85}},
          "by_tag": {"basic-date": {"n": 120, "exact": 0.99}},
          "by_modifier": {"typo": {"n": 400, "exact": 0.88}}},
 "model": {"params": 8000000, "size_bytes": 9400000, "avg_output_tokens": 11.2},
 "train": {"seconds": 3600, "steps": 20000, "final_loss": 0.04}}
```

`exact` is exact match on the normalized DSL line. `resolved` is equality of resolved dates over several reference dates.

`errors.jsonl`: one line per failure on the eval sets.

```json
{"id": "g-000123", "text": "oct 2 to oct 5", "split": "val", "primary_tag": "basic-date-range",
 "modifier_tags": [], "expected": "d 10-02>10-05", "predicted": "d 10-02>10-06"}
```

`bench.json`: array of browser benchmark results. One entry per (engine, backend).

```json
[{"engine": "ort-custom", "backend": "wasm", "browser": "chromium", "load_ms": 420, "cold_first_ms": 80,
  "latency_ms": {"p50": 22, "p95": 40, "p99": 55}, "tokens_per_s": 480,
  "memory_mb": 95, "download_bytes": 9400000, "n": 200, "browser_accuracy": 0.93}]
```

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
