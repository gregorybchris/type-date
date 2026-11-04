# @type-date/baselines

Non-model baselines. Each one implements the `Engine` interface from `@type-date/engines` and turns text into a DSL line (`specs/dsl.md`) without a trained model.

| Engine id | File | Idea | gzip |
|---|---|---|---|
| `chrono` | `src/chrono.ts` | chrono-node 2.10.3 plus an adapter. No recurrence. Third-party comparison. | 14.9 kB |
| `h1` | `src/h1.ts` | Scanner, fuzzy words, recursive-descent readers. | 7.9 kB |
| `h2` | `src/h2.ts` | h1 plus clock words, filler, 2-edit typos, more recurrence. | 8.8 kB |
| `h3` | `src/h3.ts` | h2 plus span extraction around unknown words, day parts, slang. | 10.3 kB |
| `h4` | `src/h4.ts` | h3 plus span composition for pasted messages, bounded recurrences, calendar phrases. | 14.6 kB |
| `h5` | `src/h5.ts` | h4 plus date validity checks and developer-written date formats. | 15.9 kB |
| `h6` | `src/h6.ts` | h5 plus DSL v2 forms (open ranges, day of month, durations, lists, bounds, windows, offsets). | 24.0 kB |
| `h7` | `src/h7.ts` | h6 plus web-pool fixes. DSL v2 families and the fixes sit in `src/h7/v2-forms.ts`, loaded on demand (not an engine). | 19.0 kB eager + 10.6 kB lazy |
| `h8` | `src/h8.ts` | h7 behind a normalization layer (`src/h8/`: typo and abbreviation rewrites, day of a relative month, score and dozen). h7 is unchanged except one `export`. | 21.9 kB eager + 10.7 kB lazy |
| `h9` | `src/h9.ts` | h8 behind rules (`src/h9/`, lazy chunk): named dates, nth weekday of a relative month, weekday plus day of month, ranges with day-of-month or period ends, recurrence bounds and counts, weekday exclusions, lone hour words, foreign month names, noise tokens. h8 unchanged. | 21.9 kB eager + 16.4 kB lazy |
| `h10` | `src/h10.ts` | h9 behind a rewrite step (`src/h10/rewrite.ts`): `9m` keeps the hour. | same as h9 |

Engine ids are the same in the registry (`src/index.ts`, `scripts/eval.ts`), `runs/<id>/`, the dashboard and the picker demo. Notes per engine: `specs/engines/<id>.md`. Each file exports the engine object `hN` and `parseHN`.

`predict(text, signal?, { today })` takes an optional reference day. Only `chrono` uses it, because chrono returns absolute dates. The heuristics output relative DSL and ignore it.

## Commands

```sh
pnpm --filter @type-date/baselines test                      # vitest, about 50 cases per engine
pnpm --filter @type-date/baselines eval --engine h8 --eval-version e10   # primary run: writes config, metrics, errors
make rescore-baselines EVAL=e10 [ENGINES="h7 h8"]            # adds metrics.json evals[e10] for the listed engines (--no-primary)
make rescore-all                                             # every engine on every eval version
pnpm --filter @type-date/baselines exec tsx scripts/dev.ts h8 --split val --show 20   # failures, train or val only
pnpm --filter @type-date/baselines exec tsx scripts/pools.ts h9 --out <dir> --tags      # every open labeled pool, predictions to <dir>, failures to <dir>/../fails-h9.jsonl
```

`scripts/eval.ts` writes `runs/<engine>/{config,metrics}.json` and `errors/<eval version>.jsonl` as in `specs/contracts.md`. It adds `by_split.<split>.resolved`, `model.size_bytes_minified` and `node_latency_ms` (p50, p95, p99 per call in Node). `model.size_bytes` is the esbuild minified and gzipped bundle, dependencies included. The one-sentence description of each engine is in its `REGISTRY` entry.

For `chrono` the eval calls the engine once for each reference day in `score-resolved.ts` and resolves both expected and predicted DSL for that same day. For the others one call is enough.

`scripts/dev.ts` reads only `train` and `val`. Use it to tune. Score the test splits with `eval.ts` for the final numbers only.

`eval.ts` takes `--eval-version` (default `e1`, reads `evals/<version>`), `--description`, and `--no-primary`, which writes only `metrics.json` `evals[<version>]` and leaves `eval` and config alone.

`eval.ts --file <abs path> --eval-version <label> --no-primary` scores one JSONL file (split name `file`) under `evals[<label>]`, used for `data/real/dev.jsonl`. A primary run keeps the `evals` already stored in `metrics.json`.

## Baselines pitfalls

- Span extraction drops unknown words, so every new LEX word that is also a common English word turns a filler word into date evidence (or into a skipped word). Check `non-date-noise` rows of `data/v004/train.jsonl` after adding words.
- `data/dev1` and `data/v003` use the old `H:MM` label policy. Use `data/v004` and `data/real` for regression checks.

- A broad regex or lexicon entry added for one phrasing can capture noise words through fuzzy matching (`yest` matched `test`, `start` matched `stars`, `tomo` matched `tom`). Keep short special words out of the fuzzy targets and re-check `non-date-noise`.
- Allowing 2 edits for long words made `inthree` and `totomorrow` match `three` and `tomorrow` and lose the glued prefix. Cap the length gap at 1, with a narrow exception for month and weekday names.
- Make Makefile edits with an editor tool: a `for` loop with `$$` in a shell heredoc was blocked by the command safety check.

- `import ... from "chrono-node/en"` works in esbuild and tsx but not in Vitest (the package `exports` wildcard is not resolved). Import from `"chrono-node"`. esbuild still drops the other locales (bundle 14.9 kB gzipped).
- A hand-rolled random sampler in `dev.ts` (`s * 1664525` in a float) lost its low bits, returned a constant, selected every row, and the run took minutes and ran out of memory. Use `Math.imul` or take every k-th row.
- `LEX` tokens are shared objects. `array.indexOf(token)` finds the first copy, so a loop that jumps to `indexOf(...)` can go backwards and never end (hit this in the number-word merge). Track indexes.
- Fuzzy matching ties: `weks` is one edit from both `weds` and `weeks`. Keep weekday and month abbreviations out of the fuzzy targets and prefer the target closest in length.
- Single-letter and two-letter lexicon words create false splits when splitting glued text (`sunny` became `sun` + `ny`). Allow only a closed set of 2-letter words in the splitter.
- The dataset resolves text ambiguity by sampling, not by rule. `10:30` without am/pm is `10:30?` in some rows and `10:30` in others, and `today 2:50` is sometimes the prefix of `today 2:50 pm`. Do not chase these. Check the counts in `train` before adding a rule, and keep the rule only if it raises accuracy there.
- Another agent edited `packages/engines/src/index.ts` while this package was built, and the `PredictOptions` export was lost once. If `tsc` says `PredictOptions` is missing, re-add it.
- pnpm needs `pnpm install` at the repo root after adding this package. The workspace link is how `@type-date/core` and `@type-date/engines` resolve.

- h6: fuzzy match turned "reminder" into the `rest` token and the parse became `x`. `rest` is skipped in fuzzy matching and dropped before the base grammar.
- h6 is at 23.97 kB gzip, close to the 24 kB budget. Add families as table entries or a lazy chunk.

- h7: `src/h7/v2-forms.ts` is a lazy chunk loaded by `import()` from `src/h7.ts`. Sync `parseH7` runs the v2 layer only after `loadH7Lazy()` (call it first in tests). `eval.ts` bundles with code splitting and reports the eager gzip as `size_bytes` and the lazy chunk as `size_bytes_lazy`.
- A shell `echo "$RE"` in zsh turns `\b` in a regex into a backspace. Use `printf '%s'` or write the regex from Python when moving it into a file.

- h8: the typo layer must not rewrite words h7 already reads (`exact()` is exported for that check). Skeleton matching needs the typo to be a subsequence of the target, else `form` becomes `from`. A word regex with a lookahead backtracks (`friday9am` became `fridayy9am`); exclude letters in the lookahead. `pst` is a time zone: rewrite it to `past` only before a count.
