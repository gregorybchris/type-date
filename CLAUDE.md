# type-date

Natural-language datetime picker. The user types "oct 2 to oct 5" or "every other sunday". A small rule-based parser (heuristics, no model) running in the browser turns the text into a structured result. A React picker shows it. See `specs/idea.md` for the goal and `specs/plan.md` for the plan. Model work (small seq2seq models, SmolLM2, Qwen, ONNX) did not meet the requirements and was removed on 2026-11-04; it is in git history.

## Prose rules

Apply these to all docs, comments, commit messages, and UI copy.

- Be concise and concrete.
- Use simple sentence structure.
- No metaphor, no flowery language, no mannered prose.
- State facts and numbers. Say what you did and what happened.
- Do not hype results. Report failures plainly.

## Working rules

- Commit often to git with informative messages. Do not push. There is no remote.
- Mobile matters: UI must be responsive and the parser must be fast on phones (see `specs/design.md`).
- `design-ideas/` is gitignored. Look at the images there before doing UI work.
- Eval sets are versioned and immutable (`evals/eN`). Compare only within one eval version. Cut a new one rarely. A new version must be scored on all baselines first. See `specs/research/eval-versioning.md`.
- Heuristic work uses the data reuse protocol in `specs/research/eval-versioning.md`: one labeled pool for error analysis, a sealed test per round, burn it after use, report accuracy per family and source.
- Never let information from a held-out eval set (even failure categories you saw as eval owner) reach data briefs or tuning. If it does, record the issue in the eval manifest (`known_issues`) and cut a fresh independent set. This happened with e4 `test_public`.
- Every experiment needs a short `title` and a 1-2 sentence `description` in `config.json` (shown in the dashboard).
- Every experiment (one heuristic engine) gets a sequential number (`exp-001`, `exp-002`, ...). Write one file per experiment in `specs/research/experiments/`.
- Every baseline is scored on every eval version, so the dashboard has no gaps. After adding an engine or an eval version run `make rescore-all`.
- Engine files are named `heuristic-full-N.ts`; parts go in `src/full-N/`. See `specs/conventions.md`.
- Background research goes in `specs/research/background/` as markdown.

## Tooling preferences

Full list in `specs/conventions.md`.

- Python: `uv`, `ruff`, `ty`, `pytest`, `typer`. Python project is `training/` (data and eval-set tooling only). Run with `uv run`.
- TypeScript: pnpm workspaces, Vitest.
- Codify actions we repeat as commands. Python data and eval-set actions are `td` subcommands (typer, `training/src/typedate/cli.py`). Repo-level actions are Makefile targets. When you run a command a third time, add it as a command and list it below.

## Commands

Run `make help` for the full list.

| Command | What it does |
|---|---|
| `make setup` | Install Python deps with uv |
| `make py-check` | ruff, ruff format check, ty |
| `make py-fix` | ruff autofix and format |
| `make py-test` | pytest |
| `make td ARGS="--help"` | Run the `td` CLI |
| `make rescore-all` | Score every baseline on every eval version |
| `make rescore-baselines EVAL=e10` | Score every baseline on one eval version |
| `make serve` / `make serve-status` / `make serve-stop` | Supervised dev servers: dashboard 5173, picker demo 5199 (auto-restart, logs in `.run/`) |
| `cd packages/core && pnpm exec tsx scripts/validate-data.ts ../../data/v002` | Check every DSL label parses |

## Recording user preferences

When the user states a preference, write it down so it is not lost. Put detail in `specs/conventions.md` (or the relevant spec) and add at most one short line to CLAUDE.md. Keep CLAUDE.md small: link to specs instead of copying. It is fine to push back on a preference. If you agree with it, codify it, since the user likely said it for a reason.

## Updating this file

Agents are encouraged to update CLAUDE.md as they work. Put CLAUDE.md changes in a separate commit (or a separate PR if the project has PRs) from code changes. This helps other agents that start with an empty context.

Update CLAUDE.md whenever you waste time on something. Add a short note so the next agent avoids it. Good notes name the symptom, the cause, and the fix.

## Pitfalls

- A typer app with one command collapses it into the root command. Add an `@app.callback()` or a second command.
- Gate commits on checks: `uv run ruff check src && uv run ty check src && git commit`. Piping ruff through `tail` hides its exit code, and a broken file got committed once (editing a file by slicing between two `def` lines also deleted the functions between them).
- Never stall. Do not block on a wait loop longer than about 30 seconds. Start long jobs in the background (nohup scripts or `run_in_background`), do other useful work, and check status with quick non-blocking commands. Long blocking waits made the user cancel a session.
- Background waits: do not use `sleep` in the shell. Start a background command with an until-loop and wait for its notification.
- Playwright `evaluate`/`waitForFunction` with closures under tsx breaks (tsx injects `__name`). Pass strings.
- Dev servers: the user watches ports 5173 (dashboard) and 5199 (picker demo). Never start, stop, or kill servers on those ports except with `make serve*`. Agents that need a server for screenshots use other ports (5300+). Servers started from a tool call die when the session cleans up (exit 143); `scripts/serve.sh` runs them under nohup with a restart loop.
- Agents running Playwright and training at once slow each other. Check `ps` before blaming the code.
