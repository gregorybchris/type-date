# Dashboard

Dev-only dashboard for comparing the heuristic engines (chrono-node as the third-party baseline, and the heuristic engines h1 ... h8). Vite, React 19, TypeScript, Tailwind v4, Radix primitives, Motion (`LazyMotion`), `@number-flow/react`, Sonner, d3 scales.

## Run

```
make dashboard          # or: pnpm --filter @type-date/dashboard dev
pnpm --filter @type-date/dashboard test        # Vitest: data layer, eval versions, Pareto, DSL diff
pnpm --filter @type-date/dashboard typecheck
pnpm --filter @type-date/dashboard shots       # Playwright screenshots (BASE_URL, SHOTS_DIR, WIDTHS=390,1440)
```

## Views

| Route | View |
|---|---|
| `#/engines` | One row per engine: gzip size, latency, realistic accuracy, resolved accuracy on every full eval version. Coverage matrix below |
| `#/engines/<id>` | Detail: metrics, accuracy by split, families (primary tags) and modifiers, delta against another engine |
| `#/compare` | Grouped bars per split, accuracy by engine generation (line per split), heatmap of engines by split |
| `#/pareto` | Accuracy against gzip size, p50 or p95 latency. Engines without latency data are listed, not plotted |
| `#/errors/<id>` | Failures of the selected eval version, rate / accuracy / share toggle, DSL token diff, JSONL copy |
| `#/playground?engine=<id>` | Runs the engine from `@type-date/baselines` in the browser and shows the result in `@type-date/picker` |
| `#/data` | Eval sets: rows per split and source, row browser |

Cmd/Ctrl+K opens the quick switcher. Old links (`#/experiments`, `exp-018`, `?exp=`) redirect to the engine routes.

## Eval versions

- The Eval selector in the top bar sets the version for every metric (engines, compare, Pareto, detail, errors). Default: the latest full version (`e3` over `e2`) with at least 3 engines scored.
- Each chart title carries an `eval eN` badge. No chart mixes versions. The per-version columns in the engines table are separate numbers, one per version.
- Missing results are shown: a dash in the table, a hatched `n/a` in the heatmap, an orange tick in the bar chart, a gap in the lines, a banner and the coverage matrix.
- Realistic accuracy: resolved accuracy on splits with "external" or "public" in the name, weighted by rows (`lib/evals.ts`).
- Groups under 30 rows are flagged (hatched bars, `n=`, faded bars, dagger in the heatmap).

## Data

The Vite plugin (`server/plugin.ts`, logic in `server/data.ts`) reads the repo:

- `GET /api/runs`: `runs/<engine>/{config,metrics}.json`, ordered `chrono`, then `h1`, `h2`, ... by number
- `GET /api/runs/:id/errors?version&offset&limit&tag&modifier&split&q`: `runs/<id>/errors/<version>.jsonl`
- `GET /api/evals`: `evals/<version>/manifest.json`
- `GET /api/evals/:version/summary` and `/samples`: rows of `evals/<version>/*.jsonl`

## Playground and picker

`PlaygroundView` imports `@type-date/baselines` (the `baselines` registry) and runs `predict` in the page. `src/lib/picker.tsx` is the only import of `@type-date/picker`; Vite aliases it to `packages/picker/src`.

## Mobile

Below 768 px the sidebar is a bottom bar. Tables become cards below 1024 px. Wide charts scroll inside their card. Chart details open on tap (a group, a column, or a cell), with a close button.
