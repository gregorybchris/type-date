# Conventions

Developer preferences. Follow them in all code and docs.

## Python

- Package and env manager: `uv`. Project lives in `training/` with `pyproject.toml`. Run things with `uv run`.
- Lint and format: `ruff`.
- Type check: `ty`.
- Tests: `pytest`.
- CLIs: `typer`. The entry point is `td` (`training/src/typedate/cli.py`). Add subcommands instead of loose scripts.
- Python 3.11 or newer.

## Codify repeated actions as commands

Turn actions we do often into CLI commands (`td ...`) or Makefile targets. Put the list in CLAUDE.md. This lets agents act fast without rethinking the command line each time.

- Python and ML actions: a `td` subcommand (data generation, training, evaluation, export, pruning).
- Repo-level actions: a Makefile target that calls `td`, `pnpm`, or other tools.
- When you run the same command a third time, add it as a command and list it in CLAUDE.md.

## TypeScript

- pnpm workspaces. Vitest for tests. Strict TypeScript.

## Prose

- Concise and concrete. Simple sentences. No metaphor or flowery language. See CLAUDE.md.

## Git

- Commit often with informative messages. No pushes. No remote.
- CLAUDE.md edits go in their own commit, separate from code.

## Recording preferences

When the user states a preference, record it here or in the relevant spec. Add at most one short line to CLAUDE.md, and keep CLAUDE.md small. Pushing back is fine. If you agree, codify it.

## Eval versioning

Eval sets are versioned and immutable (`evals/e1`, ...). Cut a new version conservatively and compare models only within one version. Details: `specs/research/eval-versioning.md`.

## Experiment titles and descriptions

Every experiment has a short `title` and a one or two sentence `description` in its `config.json`. Experiment numbers alone are not informative on charts. Write them when the experiment is created (`--title ... --description ...` on `scripts/eval.ts`).

## Time observability

Wall-time buckets are not tracked any more: scoring a heuristic engine on an eval version takes seconds.

## Do not stall

Never block on a long wait. Run long jobs in the background and keep working on something else. If there is nothing else to do, check status with a quick command and report. Prefer parallel work: queue the next experiments, prepare data, write docs, or improve the dashboard while jobs run.

## Experiment method

Decide coarse design questions with controlled one-factor experiments before fine-grained optimization. Time-box each factor. Do not rabbit-hole on one thing (for example mobile latency) while the broad design is open. See `specs/research/design-space.md`.

## Baseline engine naming

One engine file per experiment: `packages/baselines/src/heuristic-full-N.ts` (N = parser generation). Parts of an engine that are split out (for example a lazily loaded module) go in a directory named after the engine, `src/full-N/`, and are not registered as engines. Do not add suffixes such as `-v2` to engine files; "v2" already means DSL v2.

Experiment numbers follow history, not engine generation: `heuristic-full-1` is exp-003. exp-002 (`heuristic-small`) was removed on 2026-11-04 and its number is not reused.
