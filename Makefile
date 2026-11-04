# Common actions. Agents: prefer these over retyping long commands.
# Add a target here whenever you run the same command a third time.

.PHONY: help setup py-check py-test py-fix td js-test js-typecheck dashboard picker-demo export bench serve serve-stop serve-status timing eval-baselines rescore-baselines

help:  ## List targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-14s %s\n", $$1, $$2}'

setup:  ## Install Python deps (uv)
	cd training && uv sync

py-check:  ## ruff + ty
	cd training && uv run ruff check . && uv run ruff format --check . && uv run ty check src

py-fix:  ## ruff autofix + format
	cd training && uv run ruff check --fix . && uv run ruff format .

py-test:  ## pytest
	cd training && uv run pytest -q

td:  ## Run the td CLI: make td ARGS="--help"
	cd training && uv run td $(ARGS)

js-test:  ## Vitest across workspaces
	pnpm -r --if-present test

js-typecheck:  ## tsc across workspaces
	pnpm -r --if-present typecheck

dashboard:  ## Dev server for the experiment dashboard (apps/dashboard)
	pnpm --filter @type-date/dashboard dev

picker-demo:  ## Dev server for the picker demo (http://localhost:5199)
	pnpm --filter @type-date/picker dev

export:  ## ONNX export + int8 quantize: make export EXP=5
	cd training && uv run td export run $(EXP) --quant int8

bench:  ## Browser benchmark: make bench EXP=5 ARGS="--profile mobile-4x --backend wasm"
	cd bench && pnpm exec tsx run.ts --exp $(EXP) $(ARGS)

serve:  ## Start supervised dev servers (dashboard 5173, picker demo 5199). Restarts them if they exit.
	scripts/serve.sh start

serve-stop:  ## Stop the supervised dev servers
	scripts/serve.sh stop

serve-status:  ## Check both dev servers
	scripts/serve.sh status

eval-baselines:  ## Score the non-model baselines into runs/exp-001..003 and 009 (eval e1)
	pnpm --filter @type-date/baselines eval --engine chrono --exp 1 --title "chrono-node + DSL adapter" --description "chrono-node 2.10.3 English parser with an adapter to DSL lines. No recurrence support, so recurrence inputs output x."
	pnpm --filter @type-date/baselines eval --engine heuristic-small --exp 2 --title "heuristic-small (regex)" --description "About 40 hand-written regex rules, no dependencies, 3.5 kB gzipped. Common phrases only."
	pnpm --filter @type-date/baselines eval --engine heuristic-full --exp 3 --title "heuristic-full (grammar, fuzzy)" --description "Hand-written scanner and recursive-descent parser with fuzzy word matching, glued-word splitting and all DSL forms."
	pnpm --filter @type-date/baselines eval --engine heuristic-full-2 --exp 9 --title "heuristic-full-2" --description "heuristic-full plus clock words, filler and chat phrasing, spaced minutes, dotted times, more recurrence forms and 2-edit typos."
	pnpm --filter @type-date/baselines eval --engine heuristic-full-3 --exp 13 --eval-version e2 --title "heuristic-full-3" --description "heuristic-full-2 plus span extraction around unknown words, day parts, one-letter am/pm, slang and more recurrence forms."
	pnpm --filter @type-date/baselines eval --engine heuristic-full-4 --exp 14 --eval-version e3 --title "heuristic-full-4" --description "heuristic-full-3 plus span composition for pasted messages, bounded recurrences, calendar phrases and shorthand."
	pnpm --filter @type-date/baselines eval --engine heuristic-full-5 --exp 15 --eval-version e4 --title "heuristic-full-5" --description "heuristic-full-4 plus date validity checks, year-first and named numeric date formats, two-digit years, seconds and more relative offsets."

timing:  ## Where experiment wall time goes: make timing ARGS="--last 5"
	cd training && uv run td exp timing $(ARGS)

eval-coverage:  ## Matrix of experiments by eval version, gaps marked
	cd training && uv run td eval coverage

# Baseline experiments: number:engine
BASELINE_EXPS = 1:chrono 2:heuristic-small 3:heuristic-full 9:heuristic-full-2 13:heuristic-full-3 14:heuristic-full-4 15:heuristic-full-5
rescore-baselines:  ## Re-score baselines on another eval: make rescore-baselines EVAL=e1q [EXPS="1 2 3 9 13 14 15"]
	@test -n "$(EVAL)" || (echo "usage: make rescore-baselines EVAL=e1q [EXPS=...]"; exit 2)
	$(foreach p,$(BASELINE_EXPS),$(if $(filter $(firstword $(subst :, ,$(p))),$(or $(EXPS),1 2 3 9 13 14 15)),pnpm --filter @type-date/baselines eval --engine $(lastword $(subst :, ,$(p))) --exp $(firstword $(subst :, ,$(p))) --title x --eval-version $(EVAL) --no-primary &&) ) true

results:  ## Results table for an eval version: make results EVAL=e3
	cd training && uv run td exp table --eval-version $(or $(EVAL),e3)

robustness:  ## Meaning-preserving edit flip rates on dev data: make robustness ENGINE=heuristic-full-5
	cd packages/baselines && pnpm exec tsx scripts/robustness.ts --engine $(or $(ENGINE),heuristic-full-5)
