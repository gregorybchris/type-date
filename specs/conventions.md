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
