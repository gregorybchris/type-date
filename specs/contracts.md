# Contracts

File formats and interfaces shared by the eval scripts, the dashboard, and the picker. Change them here first.

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

## Run: `runs/<engine>/`

One directory per engine id (`chrono`, `h1`, `h2`, ...). Committed to git. Small files only. The matching note is `specs/engines/<engine>.md`. Written by `packages/baselines/scripts/eval.ts`.

`config.json`:

```json
{"id": "h8", "title": "h8", "description": "h7 behind a normalization layer for typos and abbreviations.",
 "created": "2026-11-04T08:45:20Z", "format": "dsl-v1"}
```

`id` is the engine id and the folder name. `title` equals `id`. `description` is one sentence saying what the engine is and what changed from its parent. The dashboard shows the id everywhere and the description in tables, tooltips and the detail page.

`metrics.json`:

```json
{"eval": {"version": "e1", "exact": 0.93, "resolved": 0.95, "n": 5000,
          "by_split": {"val": {"n": 3000, "exact": 0.97, "resolved": 0.97}, "test_template": {"n": 1000, "exact": 0.85, "resolved": 0.86}},
          "by_tag": {"basic-date": {"n": 120, "exact": 0.99}},
          "by_modifier": {"typo": {"n": 400, "exact": 0.88}}},
 "model": {"size_bytes": 21058, "size_bytes_minified": 57792, "size_bytes_lazy": 10679},
 "node_latency_ms": {"p50": 0.1, "p95": 0.56, "p99": 1.2, "n": 13798},
 "evals": {"e2": {"...": "same shape as eval"}}}
```

`eval.version` names the eval set (`evals/<version>`). Re-scores on other versions are stored under `evals`. Compare only within one version. `exact` is exact match on the normalized DSL line. `resolved` is equality of resolved dates over several reference dates. `model.size_bytes` is the esbuild minified and gzipped eager bundle, `size_bytes_lazy` the lazily loaded chunk. `node_latency_ms` is per call in Node.

`errors/<eval version>.jsonl`: one line per failure on that eval version. Written for every version an engine is scored on.

```json
{"id": "g-000123", "text": "oct 2 to oct 5", "split": "val", "primary_tag": "basic-date-range",
 "modifier_tags": [], "expected": "d 10-02>10-05", "predicted": "d 10-02>10-06"}
```

## Engine interface (`packages/baselines/src/engine.ts`)

```ts
export interface PredictResult { dsl: string; ms: number }
export interface Engine {
  readonly id: string;                       // "chrono", "h8"
  load(opts?: unknown): Promise<void>;       // does nothing for the current engines
  predict(text: string, signal?: AbortSignal, opts?: { today?: string }): Promise<PredictResult>;
  dispose(): void;
}
```

`today` (YYYY-MM-DD) is used only by `chrono`, which returns absolute dates. The heuristics emit relative DSL and ignore it. The registry `baselines: Record<string, Engine>` in `packages/baselines/src/index.ts` is keyed by engine id. The dashboard playground and the picker demo use it.

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
