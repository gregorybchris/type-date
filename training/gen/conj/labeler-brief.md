# Labeler task: write the DSL line for each phrase

Read `specs/dsl.md` in full (grammar, label policy, and the section "Conjunctions of recurrences"). You may read `packages/core/src` to check how a line resolves. Do not read other labelers' output, other files in `training/gen/`, `data/`, `evals/` or `runs/`. Work alone.

Input: a JSONL file of {"id", "text"}. Output: a JSONL file with one line per input id: {"id": "...", "dsl": "...", "unsure": false}.

Rules:
- The text is what a person typed. Label what they most plausibly mean, using the policies in `specs/dsl.md`. The text has no date context, so labels are relative (`mo`, `tu#3`, `+1d`), not absolute dates.
- Typos and abbreviations: label the meaning ("thrus" is Thursday, "wends" is Wednesday).
- Set `"unsure": true` when two readings are both reasonable or you do not know the policy. Do not guess to hide uncertainty. A wrong label on an unsure row is not penalized; an unsure row is dropped.
- Not a date or time: `x`.
- Check every line parses: `cd packages/core && pnpm exec tsx -e "import {parseDsl} from './src'; console.log(JSON.stringify(parseDsl(process.argv[1])))" "<line>"` returns `{"mode":"x"}` for an invalid line.

Reply with only the line count and the unsure count.
