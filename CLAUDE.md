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

- Commit often to git with informative messages. The remote is `origin` (github.com/gregorybchris/type-date). Push only when the user asks. GitHub rejects files over 100 MB, so never commit model downloads or other large files (history was rewritten on 2026-11-04 to remove `training/.hf`).
- Mobile matters: UI must be responsive and the parser must be fast on phones (see `specs/design.md`).
- `design-ideas/` is gitignored. Look at the images there before doing UI work.
- Eval sets are versioned and immutable (`evals/eN`). Compare only within one eval version. Cut a new one rarely. A new version must be scored on all engines first. See `specs/research/eval-versioning.md`.
- Heuristic work uses the data reuse protocol in `specs/research/eval-versioning.md`: one labeled pool for error analysis, a sealed test per round, burn it after use, report accuracy per family and source.
- Never let information from a held-out eval set (even failure categories you saw as eval owner) reach data briefs or tuning. If it does, record the issue in the eval manifest (`known_issues`) and cut a fresh independent set. This happened with e4 `test_public`.
- The project has one method: heuristic parser engines. Each generation is an engine `h1`, `h2`, ... (`packages/baselines/src/hN.ts`, helpers in `src/hN/`), compared with `chrono` (chrono-node). A new generation is a new engine, not an edit of an old one. Each engine has a note in `specs/engines/hN.md` and a one-sentence description in the registry in `packages/baselines/scripts/eval.ts`.
- Every engine is scored on every eval version, so the dashboard has no gaps. After adding an engine or an eval version run `make rescore-all`.
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
| `make ci` | Everything CI runs (picker build, typecheck, Vitest, Playwright, Python checks). Run before every push; CI must stay under 2 minutes (`specs/conventions.md`) |
| `make e2e` / `make e2e-update` | Browser tests against the demo / re-record screenshot baselines (macOS) after an intended visual change |
| `make setup` | Install Python deps with uv |
| `make py-check` | ruff, ruff format check, ty |
| `make py-fix` | ruff autofix and format |
| `make py-test` | pytest |
| `make td ARGS="--help"` | Run the `td` CLI |
| `make rescore-all` | Score every engine on every eval version |
| `make rescore-baselines EVAL=e10 ENGINES="h8"` | Score engines on one eval version |
| `cd packages/baselines && pnpm exec tsx scripts/pools.ts h12 --compare h11` | Regression gate: every open pool row, rows the old engine had right and the new one gets wrong (known label conflicts are listed in `specs/engines/<engine>-known-conflicts.json`). Run after every rule change; add `--only conj` for one pool family |
| `make td ARGS="data drop-seen FILE --out OUT --against 'glob'"` | Drop rows whose text is already in other files (pool, eval, training). Run on every sealed set before cutting an eval |
| `pnpm --filter @type-date/picker test:pack` | Build `@type-date/picker`, `npm pack`, install the tarball in a scratch project and load it in a browser. Run before any publish. Never publish without the user asking |
| `cd packages/baselines && pnpm exec tsx scripts/stale-zone.ts` | Rows (pool and the latest eval) whose text names a zone that h13 reads but whose label has none. After a label-policy change, relabel such rows with two labelers (`training/gen/tz/apply_stale.py`), then `td eval cut-zone` for a new eval version |
| `make serve` / `make serve-status` / `make serve-stop` | Supervised dev servers: dashboard 5173, picker demo 5199 (auto-restart, logs in `.run/`) |
| `cd packages/core && pnpm exec tsx scripts/validate-data.ts ../../data/v002` | Check every DSL label parses |

## Recording user preferences

When the user states a preference, write it down so it is not lost. Put detail in `specs/conventions.md` (or the relevant spec) and add at most one short line to CLAUDE.md. Keep CLAUDE.md small: link to specs instead of copying. It is fine to push back on a preference. If you agree with it, codify it, since the user likely said it for a reason.

## Updating this file

Agents are encouraged to update CLAUDE.md as they work. Put CLAUDE.md changes in a separate commit (or a separate PR if the project has PRs) from code changes. This helps other agents that start with an empty context.

Update CLAUDE.md whenever you waste time on something. Add a short note so the next agent avoids it. Good notes name the symptom, the cause, and the fix.

## Pitfalls

- jsdom has no layout, media queries or visual viewport, so picker unit tests cannot catch layout bugs. Layout, viewport, keyboard and touch behavior go in Playwright specs (`apps/demo/e2e`).
- The picker's layout (narrow or wide) is decided by its own width in one place: `useNarrow` (NARROW_MAX = 461 in `packages/picker/src/hooks.ts`) and `@container (max-width: 461px)` in `src/styles/narrow.css`. Do not add window-width (`max-width: 520px`) checks; a 462px picker in a 500px window once drew the wide layout with phone-only fields.

- A typer app with one command collapses it into the root command. Add an `@app.callback()` or a second command.
- Gate commits on checks: `uv run ruff check src && uv run ty check src && git commit`. Piping ruff through `tail` hides its exit code, and a broken file got committed once (editing a file by slicing between two `def` lines also deleted the functions between them).
- Never stall. Do not block on a wait loop longer than about 30 seconds. Start long jobs in the background (nohup scripts or `run_in_background`), do other useful work, and check status with quick non-blocking commands. Long blocking waits made the user cancel a session.
- Background waits: do not use `sleep` in the shell. Start a background command with an until-loop and wait for its notification.
- Playwright `evaluate`/`waitForFunction` with closures under tsx breaks (tsx injects `__name`). Pass strings.
- Playwright `tap()` releases at once, and Chromium sends a tap's click even when its mousedown changed the layout (iOS Safari drops it). To test tap bugs, hold the touch about 150ms through CDP and assert the layout at click time (`apps/demo/e2e/phone.spec.ts`). Focusing the input on a phone starts a smooth scroll 250ms later; wait past it before measuring positions.
- Dev servers: the user watches ports 5173 (dashboard) and 5199 (picker demo). Never start, stop, or kill servers on those ports except with `make serve*`. Agents that need a server for screenshots use other ports (5300+). Servers started from a tool call die when the session cleans up (exit 143); `scripts/serve.sh` runs them under nohup with a restart loop.
- Packages: `packages/picker` is `@type-date/picker`, the publishable package (the built-in parser, now h17, bundled with tsup; core and baselines are workspace sources, so keep them out of `dependencies`). The demo site is `apps/demo`, a separate Vite app. Vercel Root Directory is `apps/demo`. When a new engine ships, change the import in `packages/picker/src/parse.ts`.
- Agents running Playwright and training at once slow each other. Check `ps` before blaming the code.
- Parallel writers can duplicate each other's rows, twice so far, with no read of the other file in either transcript: writer 3 vs 1 (231 of 269 shared) and, in the timezone round, writer 2 (pool) vs writer 4 (sealed): 197 shared, with identical per-family counts. Run the pairwise overlap check as soon as each set lands, before labeling; discard a contaminated set and regenerate it alone. Earlier note: writers for a sealed set can duplicate another writer's rows. Round of 2026-11-21: writer 3 (sealed) shared 231 of 269 rows with writer 1 (pool) with no read in its transcript. Tell writers to read only the brief and the family list, and run `td data drop-seen` plus an overlap count against the pool before labeling.
- The picker lowercases its input before the engine, but the eval passes the original case. A rule that needs uppercase (registrar codes like "MW") never fires in the product. Give it a lowercase path or test it with lowercased text.
- Watch the odd-half and sealed numbers, not only the even-half numbers, when tuning. A guard added to stop an old-pool regression cost the varied-bounds pool 3 to 6 points once and the aggregate hid it.
- Another session may run `git add -A` while your edits are uncommitted and commit them under an unrelated message. Commit your files soon after editing, with explicit paths.
- `pools.ts` compares exact strings except for `conj` pools, which compare resolved dates (`u05-31` equals `uM@05`). Old pools keep exact comparison so numbers stay comparable with earlier notes.
- Parallel agents share one scratchpad. Labelers and writers overwrote each other's temporary files (timezone round: pool 5 and 6, and web research round 13). Tell parallel agents to use their own subfolder of the scratchpad, and check every label file for id order and parse validity before consensus (`training/gen/tz/consensus_all.py` prints counts only).
- A label-policy change (for example the zone suffix) makes old labels stale for every engine. Find the affected rows by running the new engine over old data and listing rows where only the new part differs, have two labelers who do not see the engine's output relabel them, and cut a new eval version. Do not relabel by running the engine. Stale rows in a training set (v007) go in `specs/engines/<engine>-known-conflicts.json`.
- An engine rule found to be wrong after the sealed splits were scored (the single-letter meridiem before a zone, round of 2026-11-21) may be fixed, but report both sealed scores and say the second is post hoc.
- The demo moved to `apps/demo`; the picker (`packages/picker`) bundles the built-in parser (now h17) and takes `zone` and `locale` props.
- A new engine needs a primary eval before `make rescore-all`: `cd packages/baselines && pnpm exec tsx scripts/eval.ts --engine hN --eval-version e16`, and add it to `ENGINES` in the Makefile. Without it every version fails with "runs/hN/metrics.json missing" (h12 and h13 went unscored on the dashboard until 2026-11-21).
- Sealed writers must reply with counts only. In the lunar round (2026-11-21) the web writer's reply listed constructions it found in the sealed set, so the eval owner saw sealed information before scoring; h16 was frozen and the e18 manifest says so. Put "reply with only the line count and the count per family" in every sealed writer prompt, including web writers.
- Lunar holiday dates come from `packages/core/src/lunar-table.ts`, generated by `uv run --script training/gen/lunar/make_tables.py`. Do not use `Intl` calendars for them: ICU gives Lunar New Year 2027 as Feb 7 (it is Feb 6).
- Scripts under `training/gen/` are checked by ruff (line length 100) in `make ci`, so run `make py-check` before committing any Python there. A generator script and an apply script both failed CI on E501 in the 2026-11-21 rounds.
