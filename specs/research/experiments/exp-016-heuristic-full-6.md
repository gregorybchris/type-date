# exp-016: heuristic-full-6

## Hypothesis

A rule parser extended with every DSL v2 form and the v2 label policy can score above 0.9 on the v2 and taxonomy slices without large losses on the older splits.

## Method

- New engine `heuristic-full-6` (`packages/baselines/src/heuristic-full-6.ts`), copied from v5. v1 to v5 are unchanged.
- Data hygiene: error analysis and tuning used only `data/pool/{v2,tax}/{train,dev}`, `data/real*`, `data/v007/train`, `data/dev1/train` and earlier failure lists. No rows of `evals/e1..e6`, `data/pool/v2/test.jsonl` or `data/pool/tax/test.jsonl` were read. The pool dev files were used as dev scoring sets, not fitted row by row. `test_v2` and `test_tax` were scored once per code version as aggregates only.
- Scored with `make eval-baselines` style command on e6, rescored on e6q, and on dev sets with `--file ... --no-primary`.

## What changed

New layer of handlers tried before the base grammar: counted occurrences, nth-weekday lists, bounded recurrences (exceptions, rolling windows, period bounds, since/until/from month, month filter), anchored offsets, business-day offsets, windows and quarters, date lists, durations, open ranges (including `since`), weekday lists, day of month (`D@DD`). Compact weekday forms (MWF, TTh, T/Th, M-F, S/S) are expanded before scanning. `x` for twice a week, fuzzy spans, minute or hour offsets from now. Canonical recurrence order is applied. Weekday range alone is a range; with a time it is a recurrence. `from X` alone is not open (only `from X on`, `starting`/`beginning`).

## Results (exact match)

| Set | exp-015 | exp-016 |
|---|---|---|
| e6 all (n=11705) | 0.918 | 0.936 |
| val | 0.978 | 0.974 |
| test_template | 0.945 | 0.934 |
| test_noise | 0.932 | 0.930 |
| test_llm | 0.961 | 0.954 |
| test_external | 0.961 | 0.961 |
| test_external_hard | 0.907 | 0.853 |
| test_public | 0.929 | 0.924 |
| test_public2 | 0.843 | 0.843 |
| test_v2 (n=224) | 0.179 | 0.929 |
| test_tax (n=275) | 0.269 | 0.844 |
| e6q (n=1070) | 0.836 | 0.924 |
| pool v2 dev (n=93) | 0.194 | 0.946 |
| pool tax dev (n=142) | 0.261 | 0.817 |
| real dev (n=288) | 0.976 | 0.951 |
| real-hard dev (n=223) | 0.937 | 0.879 |
| real-fmt dev (n=194) | 0.995 | 0.959 |

Train fit (not a held-out number): pool v2 train 0.985, pool tax train 0.872.

Per tag on e6 (exp-015 to exp-016): open-range 0.00 to 0.91, duration 0.00 to 0.94, date-list 0.00 to 0.95, day-of-month 0.00 to 0.88, anchored-offset 0.00 to 0.93, recurrence-bounded 0.06 to 0.68, month-filter 0.00 to 0.92, quarter 0.00 to 0.86. Older tags that fell by more than 1 point: recurrence-weekly 0.946 to 0.923, nth-weekday 0.982 to 0.959, period-relative 0.826 to 0.768, recurrence-monthly-yearly 0.950 to 0.930, non-date-noise 0.950 to 0.933.

## Cost

- gzip 23.97 kB (budget 24 kB). v5 was 15.9 kB.
- Node latency p50 0.046 ms, p95 0.43 ms, p99 1.3 ms (budget p95 < 3 ms). Not measured on a phone profile.
- The file is near the size budget. More families need a table-driven or lazily loaded design (v2 layer as a separate chunk loaded when the base parse is `x` or the text has a v2 cue).

## Why older splits dropped

Most of the drop on real and e6 older tags is label policy (old labels disagree with v2), not parser bugs. On `data/dev1/train` (old labels) v6 differs from v5 on about 1% of rows, almost all policy cases listed below. Some real regressions remain: period-relative and recurrence-weekly rows in e6 that I could not inspect (sealed), and open-range cues firing on "by" in real phrases.

## Label-policy conflicts found

- "past/last week/month/year": old labels `W-1`, `M-1`, `Y-1`; v2 pool labels `-1w>+0d`. v6 follows v2.
- "mon-fri" alone: old labels recurrence; v2 says range `mo>fr`. v6 follows v2.
- "by/until/before X" and "after X": old labels the point; v2 labels open range. Affects most real-fmt and real-hard misses.
- "for the next N weeks" with a recurrence: old label counts (`n6`); v2 labels `u+3w s+0d`.
- "starting/beginning <month>" and "until <month>": old labels drop the bound; v2 labels `sM@..`/`uM@..`.
- "every N weeks ... until D": consistent. "every monday in 2027": pool has both `u2027-12-31 s2027-01-01` and `uY@2027 sY@2027`.
- Compact weekday forms: tax labels are inconsistent between a list and a recurrence for the same style ("t/th 8:30" list, "tu/th 4p" recurrence, "ttH 3:30p" list, "tth 9:50" recurrence).
- "the N days after X": tax labels the list of days for N=2 but single date for similar phrases.
- "opens X and ends Y": old labels a range, v2 policy says the first date is the label; v6 follows v2.
- Bare "the third": old noise labels `x`; v2 labels `D@03`.
- "window before first meeting" style: `last day of the month from ...` is a recurrence in old labels, unsupported in v2 text.

## Pool families not expressed

- Dom + time range with extra words ("on the 30th between 8 and 10"), partially handled.
- "opens nov 1, closes the 15th" and "starts nov 1 and ends the 2nd" (two-date ranges with a bare day).
- Duration verbs after a recurrence ("We are open from 10 on saturdays" expects a recurrence, v6 gives `x`).
- Compact weekday list-versus-recurrence choice (label noise).
- "last day of the month", "every 3 months on the 10th".
- Counts spelled `x8` and misspelled "times" ("tiems").
- Anchor-bounded recurrences with a holiday end ("until labor day" works only for a few holidays).

## Remaining failure categories on pool dev

Typos inside v2 cues, two-date phrases with a bare second day, bare hour after `@` or `by`, recurrences whose limit is a date given as a word number, and tax rows with nth-lists plus bounds.
