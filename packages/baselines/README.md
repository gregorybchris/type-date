# @type-date/baselines

Non-model baselines. Each one implements the `Engine` interface from `@type-date/engines` and turns text into a DSL line (`specs/dsl.md`) without a trained model.

| Engine id | File | Idea | gzip |
|---|---|---|---|
| `chrono` | `src/chrono.ts` | chrono-node 2.10.3 plus an adapter. No recurrence. | 14.9 kB |
| `heuristic-small` | `src/heuristic-small.ts` | About 40 regex rules, no dependencies. | 3.5 kB |
| `heuristic-full` | `src/heuristic-full.ts` | Scanner, fuzzy words, recursive-descent readers. | 7.9 kB |

`predict(text, signal?, { today })` takes an optional reference day. Only `chrono` uses it, because chrono returns absolute dates. The heuristics output relative DSL and ignore it.

## Commands

```sh
pnpm --filter @type-date/baselines test                      # vitest, about 35 cases per engine
pnpm --filter @type-date/baselines eval --engine heuristic-full --exp 3 --title "heuristic-full"
make eval-baselines                                          # all three, writes runs/exp-001..003
pnpm --filter @type-date/baselines exec tsx scripts/dev.ts heuristic-full --split val --show 20   # failures, train or val only
```

`scripts/eval.ts` writes `runs/exp-NNN/{config,metrics}.json` and `errors.jsonl` as in `specs/contracts.md`. It adds `by_split.<split>.resolved`, `model.size_bytes_minified` and `node_latency_ms` (p50, p95, p99 per call in Node). `model.size_bytes` is the esbuild minified and gzipped bundle, dependencies included.

For `chrono` the eval calls the engine once for each reference day in `score-resolved.ts` and resolves both expected and predicted DSL for that same day. For the others one call is enough.

`scripts/dev.ts` reads only `train` and `val`. Use it to tune. Score the test splits with `eval.ts` for the final numbers only.

## Baselines pitfalls

- `import ... from "chrono-node/en"` works in esbuild and tsx but not in Vitest (the package `exports` wildcard is not resolved). Import from `"chrono-node"`. esbuild still drops the other locales (bundle 14.9 kB gzipped).
- A hand-rolled random sampler in `dev.ts` (`s * 1664525` in a float) lost its low bits, returned a constant, selected every row, and the run took minutes and ran out of memory. Use `Math.imul` or take every k-th row.
- `LEX` tokens are shared objects. `array.indexOf(token)` finds the first copy, so a loop that jumps to `indexOf(...)` can go backwards and never end (hit this in the number-word merge). Track indexes.
- Fuzzy matching ties: `weks` is one edit from both `weds` and `weeks`. Keep weekday and month abbreviations out of the fuzzy targets and prefer the target closest in length.
- Single-letter and two-letter lexicon words create false splits when splitting glued text (`sunny` became `sun` + `ny`). Allow only a closed set of 2-letter words in the splitter.
- The dataset resolves text ambiguity by sampling, not by rule. `10:30` without am/pm is `10:30?` in some rows and `10:30` in others, and `today 2:50` is sometimes the prefix of `today 2:50 pm`. Do not chase these. Check the counts in `train` before adding a rule, and keep the rule only if it raises accuracy there.
- Another agent edited `packages/engines/src/index.ts` while this package was built, and the `PredictOptions` export was lost once. If `tsc` says `PredictOptions` is missing, re-add it.
- pnpm needs `pnpm install` at the repo root after adding this package. The workspace link is how `@type-date/core` and `@type-date/engines` resolve.
