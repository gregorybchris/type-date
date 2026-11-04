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

Eval sets are versioned and immutable (`evals/e1`, ...). Cut a new version conservatively and compare engines only within one version. Details: `specs/research/eval-versioning.md`.

## Do not stall

Never block on a long wait. Run long jobs in the background and keep working on something else. If there is nothing else to do, check status with a quick command and report.

## Engine naming

Engines are `chrono` (the third-party comparison) and `h1`, `h2`, ... (heuristic parser generations). The engine id is the same everywhere: registry key, run folder `runs/<id>/`, `config.json` `id` and `title`, dashboard label, picker demo, notes in `specs/engines/<id>.md`.

- One engine file per engine: `packages/baselines/src/hN.ts`. Exports: the engine object `hN` and the parse function `parseHN`.
- Parts of an engine that are split out (for example a lazily loaded module) go in `src/hN/` and are not registered as engines.
- No suffixes such as `-v2`; "v2" means DSL v2.
- A new engine needs a one-sentence description in the `REGISTRY` of `packages/baselines/scripts/eval.ts`, an entry in `src/index.ts`, a test `test/hN.test.ts`, a note `specs/engines/hN.md` (first line: the id and one sentence), and an entry in `ENGINES` in the Makefile. Dashboard order: `chrono` first, then `h1`, `h2`, ... by number.
- Score a new engine on every eval version: `make rescore-baselines EVAL=e10 ENGINES="h9"` for each version, or `make rescore-all`. Check with `td eval coverage`.
