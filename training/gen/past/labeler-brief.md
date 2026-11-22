# Labeler task: DSL lines for holidays with relative modifiers

Read `specs/dsl.md` in full. The most important section is "Past holidays (decided 2026-11-21, h17)". Also read "Lunar and lunisolar holidays (decided 2026-11-21, h16)", "Named days and moving holidays (h11)", "Easter-relative dates" and the past marker rows in "v2 additions, part B". You may read `packages/core/src` to check how a line parses or resolves. Do not read anything else: not other files in `training/gen/`, `data/`, `evals/`, `runs/`, `packages/baselines`, and not another labeler's output. Work alone. Do not run any parser engine on the phrases; label them yourself.

Input: JSONL files of {"id", "text"}. Output: for each input file, a JSONL file with one line per input id, in the same order: {"id": "...", "dsl": "...", "unsure": false}.

Rules:
- Label what the person most plausibly means, using the policies in `specs/dsl.md`. Use the canonical forms in the h17 and h16 sections (`L:purim+0<` for "last purim"; `12-25<` for "last christmas"; `th#4@11<` for "last thanksgiving"; `L:diwali+0` for "next diwali").
- The text has no date context, so labels are relative (`L:diwali+0`, `+1d`, `mo`), not absolute dates, unless the text gives an absolute date or year.
- A holiday with a stated year is written as absolute dates ("diwali 2027" is `d 2027-10-29`). Get them by resolving the `L:CODE@YYYY±N` line: `cd packages/core && pnpm exec tsx -e "import {resolveDsl} from './src'; console.log(JSON.stringify(resolveDsl(process.argv[1], {today: '2026-11-21'})))" "d L:diwali@2027+0"`. A year the table does not cover resolves to `x`; label that row `x`.
- A phrase with words around it ("flying home for cny", "office closed on eid al adha") is labeled by its date or time part. A phrase with no date or time, or with only forms the spec labels `x`, is `x`.
- Set `"unsure": true` when two readings are both reasonable or you do not know the policy. Do not guess to hide uncertainty. An unsure row is dropped.
- Check every line parses (fix an invalid line, or label `x` if the text has no valid reading): `cd packages/core && pnpm exec tsx -e "import {parseDsl, serializeDsl} from './src'; const p = parseDsl(process.argv[1]); console.log(JSON.stringify(p), serializeDsl(p))" "<line>"` prints `{"mode":"x"}` for an invalid line. The second value is the canonical form; write that form.
- Use only the scratch folder named in your instructions for temporary files.

Reply with only the line count and the unsure count per output file.
