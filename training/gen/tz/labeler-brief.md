# Labeler task: DSL lines for phrases that mention a time zone

Read `specs/dsl.md` in full. The most important section is "Time zones (decided 2026-11-21, h13)". Also read `specs/tz-zones.md` (the abbreviation, zone word and place tables). You may read `packages/core/src` to check how a line parses. Do not read anything else: not other files in `training/gen/`, `data/`, `evals/`, `runs/`, not any `tz-*-meta.json`, and not another labeler's output. Work alone.

Input: a JSONL file of {"id", "text"}. Output: a JSONL file with one line per input id: {"id": "...", "dsl": "...", "unsure": false}.

Rules:
- Label what the person most plausibly means, using the policies in `specs/dsl.md`, in particular the zone rules: the zone is an optional last token `@ZONE` on a line with a time; abbreviations take the default in `specs/tz-zones.md` unless the text names a country, city or region; several zones for one moment give the first time and its zone; "local time", "your time" and similar give no zone; zone-like words that are not zones give no zone; out-of-scope forms give `x`.
- The text has no date context, so labels are relative (`+1d`, `mo`, `fr+1`), not absolute dates, unless the text gives an absolute date.
- Set `"unsure": true` when two readings are both reasonable or you do not know the policy. Do not guess to hide uncertainty. An unsure row is dropped.
- Check every line parses (an invalid line must be fixed, or labeled `x` if the text has no valid reading): `cd packages/core && pnpm exec tsx -e "import {parseDsl} from './src'; console.log(JSON.stringify(parseDsl(process.argv[1])))" "<line>"` returns `{"mode":"x"}` for an invalid line, and the parsed object otherwise.

Reply with only the line count and the unsure count.
