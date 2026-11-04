# Design space and experiment plan

The design space is large. We decide the coarse questions first with controlled experiments, then optimize fine details only on the few candidates that survive. We do not tune one factor deeply while others are undecided.

## Principles

1. Coarse before fine. Choose the solution family, output format, data, tokenization, and architecture before quantization, caching, threads, or mobile tuning.
2. One factor at a time. Each experiment changes one factor from a reference configuration. Everything else stays fixed: dataset version, eval sets, seed, training budget.
3. Fixed evaluation. All experiments are scored on the same eval sets (val, test_template, test_noise, test_llm, test_external) with the same metrics. A new eval set is added under a new name and old experiments are re-scored on it.
4. Know the noise. Before comparing, run the reference configuration with 3 seeds. A difference smaller than the seed spread (or the bootstrap interval on the eval sets) is not a result.
5. Time-box. Each factor group gets a budget. Stop when two experiments in a row gain less than the noise, or less than 1 point of accuracy. Record the decision and move on.
6. Coarse measurement of cost. In stages 1-3 measure latency, memory, and size only coarsely (order of magnitude: desktop WASM and one `mobile-4x` run). Do not optimize them yet. Check that a candidate is in a plausible range, not that it is the fastest.
7. Accuracy first, then cost. Cost optimization starts only when the best candidates reach the accuracy target (stage 5).
8. Log decisions. Each stage ends with a written decision in `specs/research/experiments/` (what was tested, what won, why, what was not tested).
9. Prune. Keep artifacts only for candidates on the Pareto front (10GB budget).

## Factors

Legend: stage in which the factor is decided (see "Stages").

| # | Factor | Options | Stage |
|---|---|---|---|
| A | Solution family | rule-based heuristic (small/full), library (chrono-node), tiny model, hybrid (rules first, model fallback) | 0, 1 |
| B | Output format | DSL v1 (symbolic, relative), absolute ISO with `now` in the prompt, fixed-slot tuple, per-field classification heads | 1 |
| C | Prefix policy | best-guess committed part (current), null on any incomplete input, extra `incomplete` flag | 1 |
| D | Data volume | 1k, 5k, 20k, 50k, 100k+ rows | 1 |
| E | Data mix | grammar only, grammar + LLM paraphrase, share of noise, share of prefix rows, share of null rows | 1 |
| F | Data quality and coverage | label policy (next friday, numeric date order, am/pm rule), template coverage, held-out splits | 1, 4 |
| G | Tokenization | BPE merged digits, digit-split BPE, character level, atom tokens for DSL | 1 |
| H | Architecture family | encoder-decoder from scratch, decoder-only from scratch, pretrained small (t5-small pruned, SmolLM2-135M as upper bound), non-autoregressive heads | 1 |
| I | Model size | d_model 128/256/384, layers 2+2 to 6+6, vocab 500-4000 | 2 |
| J | Training recipe | epochs, lr, batch size, dropout, label smoothing, weight decay, curriculum, distillation from a larger model | 2, 5 |
| K | Decoding | greedy, grammar-constrained decoding, KV cache | 5 |
| L | Export and quantization | fp32, fp16, int8 dynamic, int4, vocab pruning | 3, 5 |
| M | Inference engine | ort-custom loop, Transformers.js, wllama, others | 3 |
| N | Backend | WASM (threads, SIMD), WebGPU | 3 |
| O | Packaging and loading | weights in npm package vs CDN, caching, lazy load | 5 |
| P | Mobile performance | CPU throttle profiles, real devices, memory limits | 3 (coarse), 5 (fine) |
| Q | Hybrid design | heuristic for easy cases and model for hard cases, or the model with a heuristic validator | 4 |

## Targets (initial guidance, revise with data)

- Accuracy: resolved match at least 95% on val and test_llm, at least 85% on test_template and test_noise. Report per tag. Exact match is secondary because the resolver can map different DSL lines to the same dates.
- Download: under about 30MB (model, tokenizer, runtime wasm shown separately).
- Latency: p95 under about 150ms per update at the `mobile-4x` profile. This is a check, not an optimization target until stage 5.
- Memory: report only. Set a target after the first measurements.

## Stages

### Stage 0: foundations (mostly done)

- Eval sets, metrics, the resolver, the data generator, baselines (chrono, heuristic-full-1), the browser benchmark harness.
- Reference configuration R0 = exp-005: encoder-decoder from scratch, d_model 256, 4+4 layers, BPE vocab 1000 with merged digits, dataset v002, 20 epochs, DSL v1.
- Noise floor: R0 with seeds 0, 1, 2. Output: seed standard deviation of resolved accuracy per eval set.
- Note: exp-004 had a tokenizer bug (lowercased DSL labels) and is not a valid data point.

### Stage 1: what works at all (accuracy drivers)

Order matters. Run the groups in this order and fix each winner before the next group.

1a. Data volume curve (D): R0 trained on 2k, 5k, 15k, 30k, and all rows. Tells us whether more data still helps and where errors are data-limited versus capacity-limited.
1b. Data mix (E): grammar only versus grammar + LLM paraphrase; with and without prefix rows; noise rate 0, 0.3, 0.5. Evaluated on test_llm and test_noise.
1c. Output format (B) and prefix policy (C): DSL v1 versus absolute ISO with `now` (needs a generator mode) versus fixed-slot tuple. Same model and data.
1d. Tokenization (G): merged digits (exp-005) versus digit-split (exp-006) versus character level versus atom tokens.
1e. Architecture family (H): encoder-decoder (R0) versus decoder-only from scratch versus pretrained t5-small with a pruned vocab. Pretrained SmolLM2-135M as an accuracy upper bound only.
1f. Heuristics versus model (A): compare the baselines to the best model on every eval set. Decide whether a model is needed at all, and whether a hybrid (Q) is worth testing.

Decision at the end of stage 1: output format, data recipe, tokenization, architecture family. Written to `specs/research/experiments/stage1-decision.md`.

Budget: about 20 experiments, each under 25 minutes of training. Seeds: 1 seed per run, 3 seeds on the final pair for any close call.

### Stage 2: size and training recipe (capacity)

- Size sweep (I) on the stage 1 winner: d_model 128, 256, 384; layers 2+2, 4+4, 6+6; vocab 500, 1000, 2000. Pick the smallest model within 1 point of the best accuracy, and the best accuracy at about 2x that size. These are the candidate sizes.
- Training recipe (J): epochs and lr only (two or three values each), then lock it. Distillation and curriculum are deferred to stage 5 unless accuracy is stuck.
- Output: the accuracy-versus-size curve and 2-3 candidate models.

### Stage 3: export, engine, backend (coarse cost)

For the candidates from stage 2 only:

- Export precision (L): fp32, fp16, int8 dynamic. Check accuracy drop in the browser.
- Engine (M): ort-custom versus Transformers.js versus wllama, each at its default settings.
- Backend (N): WASM single thread versus WASM threads versus WebGPU.
- Profiles (P): `desktop` and `mobile-4x` only.
- Output: a Pareto front of (accuracy, p50/p95 latency, memory, download size) across the candidates and engines, and a choice of 1-2 configurations to take forward. Decide whether a heuristic or hybrid belongs on the front.

Rule: do not tune any single engine beyond its default settings in this stage.

### Stage 4: error-driven data iteration (accuracy to target)

- On the chosen configurations, read errors by tag, fix label policy problems, add targeted data (LLM cells and grammar rules) in batches, retrain, repeat. Track each dataset version in `data/` with notes.
- Consider the hybrid design (Q) here if specific tags stay poor for the model but are easy for rules.
- Stop when the accuracy target is met or the gain per iteration falls below the noise.

### Stage 5: fine-grained optimization (cost and polish)

Only for configurations that meet the accuracy target. Time-box each item to one day of work or less.

- Latency: KV cache, grammar-constrained decoding, graph optimizations, thread count, batching of encoder work, speculative short-circuit for repeated prefixes (cache by text).
- Size: vocab pruning, int4, weight sharing, distillation to a smaller model.
- Mobile: real-device tests, memory limits, iOS Safari behavior, WASM SIMD checks.
- Loading: packaging, caching, lazy load, progress UI.
- Then the picker integration polish and the demo video (plan Phase 9).

## Experiment hygiene

- Every experiment has: number, hypothesis, the single factor changed, reference experiment, results by eval set and tag, decision.
- Comparisons use the same eval sets. Report resolved accuracy with a bootstrap 95% interval for the headline numbers.
- Name the reference experiment in `config.json` as `parent`.
- Use `td train run` flags to change one factor. Do not edit the training code between runs of a comparison without recording it.

## Open questions

- Is 95% resolved accuracy the right target? Review after the first stage 1 results and after trying the picker by hand.
- Should the model see `now`? (Stage 1c answers part of this.)
- Real user input is not available. Replace synthetic test sets with logged input when it exists.
