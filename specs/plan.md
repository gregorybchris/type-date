# Plan

Current state and next steps. Update when something ships.

## What exists

- DSL v2 (`specs/dsl.md`) and a deterministic resolver with tests (`packages/core`).
- Eval sets `e1` to `e10`, immutable, with quick subsets (`specs/research/eval-versioning.md`, `specs/research/coverage-taxonomy.md`). Labeled pools under `data/` and the data-reuse protocol.
- Engines (`packages/baselines`, one note each in `specs/engines/`):
  - `chrono`: chrono-node plus an adapter. The third-party comparison.
  - `h1` to `h8`: hand-written heuristic parsers, one generation after another. `h8` is the newest and the default.
- Picker (`packages/picker`): React component with CSS-only motion and a demo app with an engine selector.
- Dashboard (`apps/dashboard`): engines table, compare, Pareto front, error analysis, playground, data views. Every engine is scored on every eval version (`make rescore-all`, `td eval coverage`).

## Method

One method: heuristic parser engines, one generation at a time. Each generation is tuned on the labeled pool and scored on a sealed split, then compared with `chrono` and with its parent on the dashboard. Add an engine by copying the newest one to `src/hN.ts`, registering it in `src/index.ts` and `scripts/eval.ts`, and adding it to `ENGINES` in the Makefile.

## Next

1. More families: cover the gaps listed in `specs/research/coverage-taxonomy.md` and `specs/research/dsl-gaps.md`.
2. Cut `e11` when a coverage gap shown by data justifies it, and score all engines on it first.
3. Packaging: publish the picker and the default engine as one npm package. Check size against the budget (picker about 15 kB JS and 4 kB CSS, engine about 25 kB gzip).
4. Alternatives and a confidence signal for ambiguous input.
5. Mobile: check the picker on real phones (see Mobile below).
6. Demo video: a human-like typist enters examples and the picker updates as they type.

## Mobile

Mobile is a hard requirement (`specs/design.md`). The engines run in under 1 ms per call on a desktop, so parse time is not the limit. Check layout at 360, 390, 768, 1024 and 1440 px, tap targets of at least 44 px, and no horizontal page scroll.

## Repo layout

```
CLAUDE.md
specs/                     idea, plan, DSL, contracts, engines/, research/
packages/core/             DSL parser and resolver (TypeScript, no dependencies)
packages/baselines/        engines: chrono, h1 ... h8, and the eval script
packages/picker/           React picker and demo
apps/dashboard/            Vite, React, Tailwind dashboard
training/                  Python: data generation and eval-set tooling (`td`)
data/<dataset-version>/    labeled pools (JSONL)
evals/<version>/           immutable eval sets
runs/<engine>/             config.json, metrics.json, errors/<eval version>.jsonl
```

Disk budget: 10 GB for the whole project.
