# Common actions. Agents: prefer these over retyping long commands.
# Add a target here whenever you run the same command a third time.

.PHONY: help setup py-check py-test py-fix td js-test js-typecheck dashboard picker-demo export bench serve serve-stop serve-status timing eval-baselines

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

eval-baselines:  ## Score the non-model baselines (chrono, heuristic-small, heuristic-full) into runs/exp-001..003
	pnpm --filter @type-date/baselines eval --engine chrono --exp 1 --title "chrono-node + DSL adapter"
	pnpm --filter @type-date/baselines eval --engine heuristic-small --exp 2 --title "heuristic-small (regex rules)"
	pnpm --filter @type-date/baselines eval --engine heuristic-full --exp 3 --title "heuristic-full (grammar parser, fuzzy words)"

timing:  ## Where experiment wall time goes: make timing ARGS="--last 5"
	cd training && uv run td exp timing $(ARGS)

eval-coverage:  ## Matrix of experiments by eval version, gaps marked
	cd training && uv run td eval coverage
