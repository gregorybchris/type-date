# Common actions. Agents: prefer these over retyping long commands.
# Add a target here whenever you run the same command a third time.

.PHONY: help setup py-check py-test py-fix td js-test js-typecheck dashboard picker-demo  serve serve-stop serve-status rescore-baselines rescore-all eval-coverage results robustness

help:  ## List targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-18s %s\n", $$1, $$2}'

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

dashboard:  ## Dev server for the engine dashboard (apps/dashboard)
	pnpm --filter @type-date/dashboard dev

picker-demo:  ## Dev server for the picker demo (http://localhost:5199)
	pnpm --filter @type-date/picker dev

serve:  ## Start supervised dev servers (dashboard 5173, picker demo 5199). Restarts them if they exit.
	scripts/serve.sh start

serve-stop:  ## Stop the supervised dev servers
	scripts/serve.sh stop

serve-status:  ## Check both dev servers
	scripts/serve.sh status

eval-coverage:  ## Matrix of engines by eval version, gaps marked
	cd training && uv run td eval coverage

# Engines in dashboard order: chrono (comparison baseline), then h1..h8 (heuristic parser generations)
ENGINES = chrono h1 h2 h3 h4 h5 h6 h7 h8
rescore-baselines:  ## Score engines on one eval version: make rescore-baselines EVAL=e10 [ENGINES="h7 h8"]
	@test -n "$(EVAL)" || (echo 'usage: make rescore-baselines EVAL=e10 [ENGINES="h7 h8"]'; exit 2)
	$(foreach e,$(ENGINES),pnpm --filter @type-date/baselines eval --engine $(e) --eval-version $(EVAL) --no-primary &&) true

# All eval versions, full and quick subsets
EVALS = e1 e1q e2 e2q e3 e3q e4 e5 e6 e6q e7 e8 e9 e10
rescore-all:  ## Score every engine on every eval version (fast, run after adding an engine or eval)
	$(foreach v,$(EVALS),$(MAKE) rescore-baselines EVAL=$(v) &&) true

results:  ## Results table for an eval version: make results EVAL=e10
	cd training && uv run td results --eval-version $(or $(EVAL),e10)

robustness:  ## Meaning-preserving edit flip rates on dev data: make robustness ENGINE=h8
	cd packages/baselines && pnpm exec tsx scripts/robustness.ts --engine $(or $(ENGINE),h8)
