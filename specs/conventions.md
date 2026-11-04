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

Every experiment has a short `title` and a one or two sentence `description` in its `config.json`. Experiment numbers alone are not informative on charts. Write them when the experiment is created (`td train run --title ... --description ...`).

## Time observability

Every experiment records where wall time goes (`runs/exp-NNN/timing.json`). Look at the biggest bucket first and optimize it to speed up the outer loop. Do not guess: measure, then optimize, then measure again. Time includes training, eval, export, benchmark, and the gaps between experiments.

## Do not stall

Never block on a long wait. Run long jobs in the background and keep working on something else. If there is nothing else to do, check status with a quick command and report. Prefer parallel work: queue the next experiments, prepare data, write docs, or improve the dashboard while jobs run.

## Experiment method

Decide coarse design questions with controlled one-factor experiments before fine-grained optimization. Time-box each factor. Do not rabbit-hole on one thing (for example mobile latency) while the broad design is open. See `specs/research/design-space.md`.
