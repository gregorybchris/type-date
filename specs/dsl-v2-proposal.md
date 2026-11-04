# DSL v2 proposal (not adopted)

Status: proposal. Decide after the model comparison in round 1. Motivation and counts: `specs/research/dsl-gaps.md`. About 9% of hard-style inputs need these features.

## Additions

| Feature | Example input | v2 form | Meaning |
|---|---|---|---|
| Open range, after | "after 2pm", "from 3 on" | `t 14:00>` | start known, no end |
| Open range, before | "before noon", "by 8pm" | `t >12:00` | no start, end known |
| Open range with dates | "after oct 5", "until friday" | `d 10-05>`, `d >fr` | same forms for dates |
| Day of month only | "the 15th", "on the 3rd" | `d D@15` | next 15th on or after today |
| Duration after a start time | "3pm for 2 hours", "10am (45 min)" | `t 15:00>+2h`, `t 10:00>+45m` | end = start plus offset |
| Duration with datetime | "tomorrow 9am for 90 min" | `dt +1d 09:00>+90m` | same offset form |
| Last day of month or year | "last day of the year", "end of the month" | `d R`-free forms: `d M+0$` and `d Y+0$` | last date of the period |

Not included: "week of" (rare), quarters, `friday week`, fuzzy month parts.

## Parser and resolver changes

- Grammar: `PT '>'` and `'>' PT` become valid ranges. A range end may be `+Nh` or `+Nm` when the start has a time.
- Resolved output: `end` may be absent with `open: "end"` (or `open: "start"`). The picker shows a one-sided range.
- `D@DD`: nearest occurrence of that day of month on or after today. If the month has fewer days, skip to the next month that has the day.
- All v1 labels stay valid. v2 is a superset, so existing eval rows and training rows keep their meaning.

## Work needed if adopted

1. Update `specs/dsl.md`, `packages/core` (parser, serializer, resolver, tests), and the picker (one-sided range display, duration display).
2. Grammar generator: new templates for each feature. Add rows to training data.
3. Labeler brief: update `LABELER.md` policy. Relabel `data/real*` rows that were flattened (for example "after 3" currently `t 3?`) by re-running two labelers on rows that match feature patterns.
4. Eval: cut `e4` as an additive extension of e3 with a split `test_v2_features` (new rows, two agreeing labelers). Existing splits stay unchanged.
5. Heuristic: add the forms (the heuristic agent). Models: retrain with the new data.

## Decision criteria

Adopt if the realistic-input accuracy cap from missing features (about 9% of hard-style inputs) matters more than the cost of one more eval version and a round of relabeling. A cheaper partial step: adopt only open ranges, day of month, and durations, which cover about 8.5% of the 9%.
