# Plan

Status key: [ ] todo, [x] done. Update as work proceeds.

## Decisions from research

Sources: `specs/research/background/*.md`.

- Output format: compact symbolic DSL. Mode first (`d`, `t`, `dt`, `x`). The model does no calendar math. A deterministic TypeScript resolver turns DSL plus (now, tz, week start) into dates. The prompt is the raw text only. (output-format.md)
- Models: pretrained models are too big (t5-small is about 78MB at int8). Start with a from-scratch encoder-decoder of about 8M parameters and a task tokenizer. Compare with a from-scratch decoder-only, a size sweep, and a vocab-pruned t5-small. Train in fp32 on MPS. (models-and-training.md)
- Engines: Transformers.js (WASM and WebGPU), onnxruntime-web with a custom decode loop (grammar-constrained), and wllama. TensorFlow.js is out. (browser-inference.md)
- Picker UI: CSS-only motion, no animation dependency, budget about 15kB JS and 4kB CSS. Dashboard: Motion with LazyMotion, number-flow, visx/d3 for the Pareto plot, shadcn-style components on Radix. (animation-and-motion.md)
- Dataset: see dataset-generation.md.

## Repo layout

```
CLAUDE.md
specs/                     idea, plan, research
packages/core/             DSL parser + resolver + types (TypeScript, no deps)
packages/picker/           React picker (CSS only motion) + engine adapter interface
apps/dashboard/            Vite + React + TS + Tailwind dashboard
training/                  Python: data gen, tokenizer, train, export, eval (uv venv, gitignored)
data/<dataset-version>/    train/val/test JSONL (small, committed)
runs/exp-NNN/              config.json, metrics.json, errors.jsonl, bench.json (committed)
artifacts/exp-NNN/         model files (gitignored, pruned to fit disk budget)
bench/                     Playwright benchmark harness (Node)
```

## Phases

### Phase 0: scaffold
- [x] git repo, CLAUDE.md, specs, .gitignore
- [x] Python env (uv, torch, transformers, optimum)
- [ ] pnpm workspace, TypeScript config

### Phase 1: research (done when all files exist)
- [x] output-format, models-and-training, browser-inference, animation-and-motion
- [ ] dataset-generation

### Phase 2: core
- [ ] DSL spec doc (`specs/dsl.md`) fixed from output-format.md
- [ ] `packages/core`: parser, resolver, golden tests
- [ ] Baseline: chrono-node scored on the same eval set

### Phase 2b: non-model baselines
Whether a heuristic is good enough is an empirical question. Baselines run through the same eval, bench, and dashboard as models, and appear on the same Pareto front.
- [ ] `packages/baselines`: engines that implement the `Engine` interface with no model
- [ ] chrono-node + adapter to DSL (existing library, rule-based)
- [ ] `heuristic-small`: tokenizer plus a few regex rules, tiny code size
- [ ] `heuristic-full`: broad rule set, fuzzy matching of month and weekday words for typos
- [ ] Score all of them on the same eval sets and bench harness (size = bundle bytes, memory, latency)

### Phase 3: data
- [ ] Tag taxonomy file shared by Python and TS
- [ ] Grammar/template generator in Python (spec -> text + DSL), noise injection
- [ ] Subagent prompt generation (text by tag + persona seeds) and labeling, validated by the resolver
- [ ] Splits: held-out templates for val, separate test set with real-looking messy inputs
- [ ] Dataset versions: `data/v001` first

### Phase 4: training loop
- [ ] Tokenizer training (small BPE/unigram vocab)
- [ ] From-scratch encoder-decoder trainer (MPS)
- [ ] Eval script: exact match on DSL, resolved match, per-tag accuracy, error log
- [ ] ONNX export + int8 quantization
- [ ] `runs/exp-NNN` writer (config, metrics, errors)
- [ ] exp-001 end to end

### Phase 5: browser engines and benchmark
- [ ] Engine adapter interface in `packages/picker`
- [ ] Adapters: Transformers.js, onnxruntime-web custom loop, wllama
- [ ] Playwright harness: latency p50/p95, memory, load time, size, browser accuracy
- [ ] Bench results written to `runs/exp-NNN/bench.json`

### Phase 6: picker component
- [ ] Design tokens from `design-ideas/` (light and dark)
- [ ] Calendar, time list, mode switching, range highlight, recurrence preview
- [ ] Input with debounce, ambiguity toggle, keyboard hints
- [ ] Motion: CSS only, reduced-motion support
- [ ] npm packaging (`exports`, types, CSS)

### Mobile (applies to every phase)
- [ ] Picker and dashboard layouts are responsive and checked with Playwright screenshots at 360, 390, 768, 1024, 1440 px
- [ ] Dashboard narrow-width pass (the dashboard agent only checked 1440x900)
- [ ] Bench harness has a mobile profile: Chromium with CPU throttling (4x and 6x) and a mobile viewport, recorded in `bench.json` as `profile`
- [ ] Track a phone latency budget: parse update under about 150 ms p95 at 4x CPU throttle. Adjust after measuring.
- [ ] Track phone memory and download budget (model plus runtime wasm)
- [ ] Test on a real mid-range phone when possible (Android Chrome and iOS Safari). WebGPU may be missing on phones, so WASM must work well
- [ ] Check iOS Safari specifics: WASM threads need cross-origin isolation, memory limits for tabs, WASM SIMD support
- [ ] Add a "mobile" Pareto view in the dashboard that uses mobile-profile numbers

### Phase 7: dashboard
- [ ] Experiment list with numbers, trend over time
- [ ] Pareto front (accuracy vs latency vs memory vs size)
- [ ] Per-experiment detail: metrics, per-tag accuracy, config
- [ ] Error analysis: filter by tag, view failures, expected vs predicted
- [ ] Playground: pick experiment checkpoint, run picker in browser
- [ ] Data view: dataset stats, tag counts, samples

### Phase 8: iterate (staged, see `specs/research/design-space.md`)
Coarse decisions first. Do not optimize latency or size on one candidate before the broad design is chosen.
- [ ] Stage 0: noise floor (R0 with 3 seeds)
- [ ] Stage 1: data volume, data mix, output format, tokenization, architecture family, heuristics vs model
- [ ] Stage 2: size sweep and training recipe
- [ ] Stage 3: export precision, engine, backend (coarse cost, desktop and mobile-4x only)
- [ ] Stage 4: error-driven data iteration to the accuracy target
- [ ] Stage 5: fine-grained optimization (latency, size, mobile, loading) for the chosen candidates
- [ ] Prune artifacts to stay under 10GB

### Phase 9: demo video (later, after a model works well)
Not started. The user wants an mp4 that shows a human-like typist entering examples while the picker updates.
- [ ] Script of example phrases (cover date, time, datetime, range, recurrence, relative, typos) with pauses
- [ ] Human-like typing simulation: variable key delays, short pauses between words, an occasional typo and correction
- [ ] Drive the real picker with the chosen model in Chromium (Playwright), at the real update speed
- [ ] Record video (Playwright video or screen capture) at 1080p or higher with the painterly background and window frame from `specs/design.md`
- [ ] Overlay a small latency readout per parse so the speed is visible
- [ ] Encode to mp4 with ffmpeg. Keep the file small. Store it outside git (large file)
- [ ] Add a `make demo-video` target

## Experiment queue

The staged queue is in `specs/research/design-space.md`. Numbering so far:

1. exp-001: chrono-node + DSL adapter (baseline)
2. exp-002: heuristic-small (baseline)
3. exp-003: heuristic-full (baseline)
4. exp-004: first from-scratch model, v001. Invalid: tokenizer lowercased DSL labels
5. exp-005: reference model R0 (v002, BPE merged digits, 20 epochs)
6. exp-006: R0 with digit-split tokens (stage 1d)

## Disk budget

Limit 10GB total. Python venv is about 1GB. Keep at most 3 to 5 checkpoints in `artifacts/`. Delete the rest after recording metrics. Do not keep fp32 training checkpoints for finished runs.
