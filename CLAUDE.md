# type-date

Natural-language datetime picker. The user types "oct 2 to oct 5" or "every other sunday". A tiny model running in the browser turns the text into a structured result. A React picker shows it. See `specs/idea.md` for the goal and `specs/plan.md` for the plan.

## Prose rules

Apply these to all docs, comments, commit messages, and UI copy.

- Be concise and concrete.
- Use simple sentence structure.
- No metaphor, no flowery language, no mannered prose.
- State facts and numbers. Say what you did and what happened.
- Do not hype results. Report failures plainly.

## Working rules

- Commit often to git with informative messages. Do not push. There is no remote.
- Keep total disk use under 10GB. Delete checkpoints that are not on the Pareto front or needed for a comparison. Record metrics before deleting.
- Mobile matters: UI must be responsive and the model must be fast on phones (see `specs/design.md`, `specs/plan.md` Mobile).
- `design-ideas/` is gitignored. Look at the images there before doing UI work.
- Work coarse to fine. Follow the staged plan in `specs/research/design-space.md`: one factor per experiment, time-boxed, no deep latency tuning until the broad design is chosen.
- Eval sets are versioned and immutable (`evals/eN`). Compare only within one eval version. Cut a new one rarely. A new version must be scored on all baselines first. See `specs/research/eval-versioning.md`.
- Every experiment needs a short `title` and a 1-2 sentence `description` in `config.json` (shown in the dashboard).
- Every run writes `timing.json` (wall time by bucket). Use `make timing` and optimize the biggest bucket first.
- Every experiment gets a sequential number (`exp-001`, `exp-002`, ...). Write one file per experiment in `specs/research/experiments/`.
- Background research goes in `specs/research/background/` as markdown.

## Tooling preferences

Full list in `specs/conventions.md`.

- Python: `uv`, `ruff`, `ty`, `pytest`, `typer`. Python project is `training/`. Run with `uv run`.
- TypeScript: pnpm workspaces, Vitest.
- Codify actions we repeat as commands. Python and ML actions are `td` subcommands (typer, `training/src/typedate/cli.py`). Repo-level actions are Makefile targets. When you run a command a third time, add it as a command and list it below.

## Commands

Run `make help` for the full list.

| Command | What it does |
|---|---|
| `make setup` | Install Python deps with uv |
| `make py-check` | ruff, ruff format check, ty |
| `make py-fix` | ruff autofix and format |
| `make py-test` | pytest |
| `make td ARGS="--help"` | Run the `td` CLI |
| `make timing` | Wall time by bucket per experiment and overall |
| `make export EXP=5` | Export an experiment to ONNX int8 |
| `make bench EXP=5 ARGS="--profile mobile-4x"` | Browser benchmark, writes runs/exp-005/bench.json |
| `make serve` / `make serve-status` / `make serve-stop` | Supervised dev servers: dashboard 5173, picker demo 5199 (auto-restart, logs in `.run/`) |
| `cd packages/core && pnpm exec tsx scripts/validate-data.ts ../../data/v002` | Check every DSL label parses |

## Recording user preferences

When the user states a preference, write it down so it is not lost. Put detail in `specs/conventions.md` (or the relevant spec) and add at most one short line to CLAUDE.md. Keep CLAUDE.md small: link to specs instead of copying. It is fine to push back on a preference. If you agree with it, codify it, since the user likely said it for a reason.

## Updating this file

Agents are encouraged to update CLAUDE.md as they work. Put CLAUDE.md changes in a separate commit (or a separate PR if the project has PRs) from code changes. This helps other agents that start with an empty context.

Update CLAUDE.md whenever you waste time on something. Add a short note so the next agent avoids it. Good notes name the symptom, the cause, and the fix.

## Pitfalls

- Tokenizer: do not add a `Lowercase` normalizer. The DSL has uppercase tokens (`R`, `W+1`, `M@10`). Lowercase the input text in code (`norm_in`) instead. This bug cost exp-004.
- A typer app with one command collapses it into the root command. Add an `@app.callback()` or a second command.
- Background waits: do not use `sleep` in the shell. Start a background command with an until-loop and wait for its notification.
- Playwright `evaluate`/`waitForFunction` with closures under tsx breaks (tsx injects `__name`). Pass strings.
- WebGPU with the int8 ONNX model gave 0% accuracy and 1.5 s latency (exp-004). Use fp32 or fp16 for WebGPU.
- Dev servers: the user watches ports 5173 (dashboard) and 5199 (picker demo). Never start, stop, or kill servers on those ports except with `make serve*`. Agents that need a server for screenshots use other ports (5300+). Servers started from a tool call die when the session cleans up (exit 143); `scripts/serve.sh` runs them under nohup with a restart loop.
- Agents running Playwright and training at once slow each other. Check `ps` before blaming the code.
