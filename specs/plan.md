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

### Phase 7: dashboard
- [ ] Experiment list with numbers, trend over time
- [ ] Pareto front (accuracy vs latency vs memory vs size)
- [ ] Per-experiment detail: metrics, per-tag accuracy, config
- [ ] Error analysis: filter by tag, view failures, expected vs predicted
- [ ] Playground: pick experiment checkpoint, run picker in browser
- [ ] Data view: dataset stats, tag counts, samples

### Phase 8: iterate
- [ ] Run experiments from the list below
- [ ] Error analysis -> data fixes -> new dataset version
- [ ] Prune artifacts to stay under 10GB

## Experiment queue (initial)

1. exp-001: from-scratch enc-dec ~8M, DSL output, dataset v001, ORT custom loop
2. exp-002: same model, Transformers.js engine (benchmark only)
3. exp-003: size sweep d=128 and d=384
4. exp-004: from-scratch decoder-only ~6M
5. exp-005: absolute ISO output with `now` in the prompt (format ablation)
6. exp-006: t5-small with pruned vocab
7. exp-007: wllama with a GGUF export of the decoder-only model
8. Dataset ablations: more data, noise level, LLM vs template mix

## Disk budget

Limit 10GB total. Python venv is about 1GB. Keep at most 3 to 5 checkpoints in `artifacts/`. Delete the rest after recording metrics. Do not keep fp32 training checkpoints for finished runs.
