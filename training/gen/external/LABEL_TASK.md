# Standard labeling task (web phrases)

1. Read `training/gen/external/LABELER.md` (all of it, including the notes at the end) and `specs/dsl.md` (DSL v2, parts A and B, policy decisions, additional rules). These are the only repository files you may read, plus `specs/research/coverage-taxonomy.md`.
2. Input is a JSONL file of phrases collected from public sources (library test suites, documentation, forums). Some are fragments, formatted output rather than typed input, or constructs the DSL cannot express. For those write `x` and set `"unsure": true`. For phrases with a clear single meaning, write the DSL line. A date or time that depends on an unstated reference ("2012-08-10 is after now") is `x` unsure.
3. Write each label yourself, one by one. Do not write a script that guesses labels.
4. Recurrence token order is: frequency, days, month filter, count, until (`u`), time, start (`s`). `D@` is two digits.
5. Validate: copy your output to the given empty directory and run `cd /Users/chris/Documents/Code/Projects/Current/type-date/packages/core && pnpm exec tsx scripts/validate-data.ts <that directory>`. Fix any line the validator rejects unless it is a legitimate form the validator cannot know about (say so).
6. Output format and reply: as in LABELER.md. Reply with one line: count labeled, count unsure, count validator rejected.
