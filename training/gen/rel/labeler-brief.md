# Labeler task: DSL lines for relative weekends, offsets from now and parts of a month

Read `specs/dsl.md` in full. The most important section is "Offsets from now, relative weekends, parts of a month (decided 2026-11-21, h15)". You may read `packages/core/src` to check how a line parses or resolves. Do not read anything else: not other files in `training/gen/`, `data/`, `evals/`, `runs/`, `packages/baselines`, and not another labeler's output. Work alone. Do not run any parser engine on the phrases; label them yourself.

Input: JSONL files of {"id", "text"}. Output: for each input file, a JSONL file with one line per input id, in the same order: {"id": "...", "dsl": "...", "unsure": false}.

Rules:
- Label what the person most plausibly means, using the policies in `specs/dsl.md`. Use the canonical forms in the h15 section (`now+90m`, not `now+1h30m`; `WKND+1` for "next weekend"; `WKND#-1@10` for "the last weekend of october"; `W#1@01` for "the first week of january").
- The text has no date context, so labels are relative (`+1d`, `mo`, `WKND+1`, `now+2h`), not absolute dates, unless the text gives an absolute date or year.
- A phrase with words around it ("remind me in 2 hours to call mum", "can we do next weekend?") is labeled by its date or time part. A phrase with no date or time, or with only forms the spec labels `x`, is `x`.
- Set `"unsure": true` when two readings are both reasonable or you do not know the policy. Do not guess to hide uncertainty. An unsure row is dropped.
- Check every line parses (fix an invalid line, or label `x` if the text has no valid reading): `cd packages/core && pnpm exec tsx -e "import {parseDsl, serializeDsl} from './src'; const p = parseDsl(process.argv[1]); console.log(JSON.stringify(p), serializeDsl(p))" "<line>"` prints `{"mode":"x"}` for an invalid line. The second value is the canonical form; write that form.
- Use only the scratch folder named in your instructions for temporary files.

Reply with only the line count and the unsure count per output file.
