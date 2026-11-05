# Common actions. Agents: prefer these over retyping long commands.
# Add a target here whenever you run the same command a third time.

.PHONY: help setup py-check py-test py-fix td js-test js-typecheck dashboard picker-demo  serve serve-stop serve-status demo-video rescore-baselines rescore-all eval-coverage results robustness

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

# Engines in dashboard order: chrono (comparison baseline), then h1..h11 (heuristic parser generations)
ENGINES = chrono h1 h2 h3 h4 h5 h6 h7 h8 h9 h10 h11
# Engines are scored in parallel (one process per engine, 8 at a time); each process walks the eval versions in order.
SCORE = pnpm exec tsx scripts/eval.ts --no-primary
rescore-baselines:  ## Score engines on one eval version: make rescore-baselines EVAL=e10 [ENGINES="h8 h9"]
	@test -n "$(EVAL)" || (echo 'usage: make rescore-baselines EVAL=e10 [ENGINES="h8 h9"]'; exit 2)
	@printf '%s\n' $(ENGINES) | xargs -P 8 -I{} sh -c 'cd packages/baselines && $(SCORE) --engine {} --eval-version $(EVAL) | sed "s/^/{} $(EVAL): /"'

# All eval versions, full and quick subsets
EVALS = e1 e1q e2 e2q e3 e3q e4 e5 e6 e6q e7 e8 e9 e10 e11 e12
rescore-all:  ## Score every engine on every eval version in parallel (about 2 minutes): make rescore-all [ENGINES="h8 h9"]
	@printf '%s\n' $(ENGINES) | xargs -P 8 -I{} sh -c 'cd packages/baselines && for v in $(EVALS); do $(SCORE) --engine {} --eval-version $$v | grep -E "^{}:" | sed "s/^/$$v /" || exit 1; done'

results:  ## Results table for an eval version: make results EVAL=e10
	cd training && uv run td results --eval-version $(or $(EVAL),e10)

robustness:  ## Meaning-preserving edit flip rates on dev data: make robustness ENGINE=h8
	cd packages/baselines && pnpm exec tsx scripts/robustness.ts --engine $(or $(ENGINE),h8)

# OUT: output folder. VARY=1: alternate light and dark and change the highlight color for each phrase.
OUT ?= docs/media
demo-video:  ## Record the demo into docs/media (webm, mp4, gif) and open the mp4 and gif in Chrome: make demo-video [VARY=1 OUT=docs/media/vary]
	@cd packages/picker && { curl -s -o /dev/null localhost:5301 && started= || { (nohup pnpm exec vite --config demo/vite.config.ts --port 5301 --strictPort > ../../.run/demo-video-vite.log 2>&1 & echo $$! > ../../.run/demo-video-vite.pid); started=1; until curl -s -o /dev/null localhost:5301; do :; done; }; \
	  mkdir -p ../../$(OUT); node scripts/demo-video.mjs ../../$(OUT); rc=$$?; \
	  [ -z "$$started" ] || kill $$(lsof -ti :5301) 2>/dev/null; exit $$rc; }
	@PATH=/opt/homebrew/opt/ffmpeg@4/bin:$$PATH packages/picker/scripts/demo-gif.sh $(OUT)/demo.webm $(OUT)/demo.gif $$(cat $(OUT)/demo.trim)
	@PATH=/opt/homebrew/opt/ffmpeg@4/bin:$$PATH ffmpeg -loglevel error -y -ss $$(cat $(OUT)/demo.trim) -i $(OUT)/demo.webm -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -movflags +faststart $(OUT)/demo.mp4
	@ls -la $(OUT) | awk 'NR>3 {print $$5, $$9}'
	@open -a "Google Chrome" $(OUT)/demo.mp4 $(OUT)/demo.gif
