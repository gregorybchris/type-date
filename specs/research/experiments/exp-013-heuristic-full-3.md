# exp-013: heuristic-full-3

Status: done. Baseline, no training. heuristic-full-1 (exp-003) and heuristic-full-2 (exp-009) are unchanged.

## Hypothesis

On realistic input the main loss is unknown words around the date phrase ("pls book fri 3pm", "dentist thurs 3pm"), not the date grammar. If the parser drops unknown words and parses the best span, accuracy on realistic text rises a lot. The risk is false positives on non-date text, so a span needs strong evidence.

## Method

- Development data: `data/real/train.jsonl` (725 rows, free to tune on), `data/real/dev.jsonl` (288 rows, held out and used for scoring and failure analysis), `data/v004/train.jsonl` (regression check, incl. its `non-date-noise` rows). Eval e2 was only scored by `scripts/eval.ts`. I did not read any e2 row, including `test_external`; its score below is the aggregate from the scoring script.
- The dev sets `data/dev1` and `v003` use the old label policy for `H:MM` and similar, so they were not used for regression checks.
- Label policy from `specs/research/dsl-gaps.md` was applied: day parts without a clock time give a date only; bare hours are unknown; `on <weekday>` alone is a date.

## What changed (`packages/baselines/src/heuristic-full-3.ts`)

- **Span extraction.** If the scanner finds unknown words, they are dropped and the longest parsable span is used (`span()`). A span needs a strong token (relative day, weekday, date literal, am/pm, day part, holiday, offset marker, recurrence word, a colon time) or a hint (`at`, `sharp`, `ish`) next to a bare number. Other rules: a lone month word needs not to be ambiguous (`may`, `march` need `in`); a lone plural weekday or a recurrence without `every`, a time or a plural next to unknown words is rejected (keeps `mondays what` as `x`); a bare number is not joined across a dropped unknown word to the next token (`5k race apr 12` is `04-12`, not `5 apr`); `valentines` without `day` is ignored inside a span. Weak known words (`work`, `new`, `up`, `end`) that do not start a pattern are dropped too.
- **Day parts.** `tonight`, `tonite`, `tonig`, `this evening/morning`, `sat morning`, `mon night`, `arvo`, `nite`: date only when there is no clock time; with a bare hour they give am/pm (`tonight at 11` is `23:00`, `sat morning at 9:30` is `09:30`), also for recurrences (`every morning at 7`, `nightly at 10pm`).
- **Times.** One-letter meridiem (`7a`, `3p`, `9:30a`), `sharp`, `ish`, `cob`, `eod`, `o'clock`, `at 6 and 30`, `twelve noon`, `twenty to six` / `quarter to eight` (a spelled `five to` or `ten to` is still a range).
- **Weekday plus date.** `fri 2 oct`, `Fri, Nov 6`, `Thu Nov 12 3pm`, `tues 14 oct`, `sunday the 2nd of nov`: the date wins. A dropped `on` before a month (`check in at 3 on dec 20`) keeps `3` as the hour.
- **Dates and offsets.** `this coming friday`, `friday coming`, `nxt wk mon` is `mo+1`, `week of oct 14`, `8 wks out`, `a couple weeks`, `canada day`, `boxing day`.
- **Recurrence.** A time before the pattern (`standup 9:15 every weekday`, `pickup at 3:20 weekdays`, `from 9 to 5 mon-fri`), `bi-weekly`, `fortnight(ly)`, `once a month`, `ev`, `every first sunday` (spelled ordinal means monthly nth), `every month`, `every 6 mos`, `weekly for 10 weeks`, `1st and 15th every month`, `weekly every wed`.
- **Typos.** Fuzzy matching now needs the same first letter for words of 5 letters or less (stops `early` to `yearly`, `flight` to `eight`, `live` to `five`), and two-edit matches need the same first letter. Ties prefer the same first letter, then month and weekday names.

## Results (exact / resolved)

| Eval | n | exp-003 | exp-009 | exp-013 |
|---|---|---|---|---|
| e2 val | 2510 | .976 / .976 | .979 / .979 | .980 / .980 |
| e2 test_template | 4541 | .922 / .922 | .952 / .952 | .948 / .948 |
| e2 test_noise | 1465 | .934 / .934 | .935 / .935 | .936 / .936 |
| e2 test_llm | 1301 | .903 / .907 | .954 / .958 | .959 / .963 |
| e2 test_external | 328 | .671 / .674 | .704 / .707 | .930 / .933 |
| e2 all | 10145 | .926 / .927 | .949 / .949 | .955 / .955 |
| e2q | 700 | .903 / .904 | .926 / .927 | .953 / .954 |
| e1 | 10841 | .909 / .909 | .941 / .942 | .940 / .940 |
| e1q | 600 | .912 / .913 | .932 / .933 | .933 / .935 |
| data/real/dev.jsonl | 288 | .455 / .455 | .472 / .472 | .962 / .962 |

`runs/exp-013` has e2 as the primary eval and e2q, e1, e1q and `real-dev` under `metrics.json` `evals`. On real/train (tuned on) 0.966; v004 train sample 0.974 (heuristic-full-2: 0.975).

Cost:

| | exp-003 | exp-009 | exp-013 |
|---|---|---|---|
| gzip bytes | 7859 | 8823 | 10331 |
| p50 / p95 / p99 per call (Node, warm word cache) | 0.036 / 0.89 / 5.6 ms | 0.032 / 1.08 / 7.0 ms | 0.040 / 0.56 / 5.2 ms |

Cold timing on 725 distinct realistic inputs after a JIT warm-up: p50 0.024 ms, p95 0.60 ms, p99 1.1 ms. A per-word cache for fuzzy matching and an early stop in the span search keep the tail low. Size is under the 14 kB aim.

## Does span extraction hurt non-date input?

`x` precision on `non-date-noise` (e2, 66 rows): 0.985 (65 of 66) for both exp-009 and exp-013. On the v004 train `non-date-noise` rows (135): 0.993 for exp-009, 0.978 for the first span version, 0.993 after the rejection rules above. The false positives that remained before the rules were all `<plural weekday> <junk>` and `<number> <number>` (`version 2 25`, `2 25 2`).

Recommendation: keep span extraction. The guards cost one rule that real data disagrees with: `film review wednesdays after school` (a recurrence on real/dev) is now `x`, because the same shape (`mondays what`) is noise in the grammar data. Turning that rule off gains 0.0035 on real/dev and loses 3 of 66 noise rows on e2 (0.985 to 0.955), so I kept it on. A product that shows the parse next to the text could drop the rule, since a wrong guess on junk text is visible.

## Failure categories left

real/dev (11 of 288 wrong):

- Label-policy items: `sat 10 to noon` (label `10:00`, ours `10?`), `five to nine` (label 8:55, ours range), `friday 1:1 at 11`.
- Phrases with no date meaning in our rules: `usher training sun after service 12:15`, `8pm till late saturday`, `dec 18 for the year 11 formal 6:30 til 10`.
- Rare DSL gaps: `fortnight from today`, `till end of year` (until), `for the next 3 weeks` (count 15 for a daily recurrence), `on the day 5 of march`.
- One recurrence rejected by the precision rule (above).

e2 (aggregates from the scoring script, no rows read): tags `period-relative` 0.83, `named-holiday` 0.87, `recurrence` 0.87, `relative-date` 0.91; `recurrence-weekly` has 146 of the 459 errors (held-out templates). By modifier: typo 0.86, typo-keyboard 0.85, partial-prefix 0.89.

real/train (tuned on, 25 left): `mon-fri` as a weekday range, `all day thursday` style rows now pass, `10 till noon` known-hour labels, `quater past siks` / `haff past too` (two typos in one phrase), `the class start at 8:30 in thursday`, `a week from tomorrow` (+8d).

## Label-policy ambiguities found

- `mon-fri` alone: weekday range `mo>fr` in real data, weekly weekday recurrence in the grammar.
- `10 till noon`, `sat 10 to noon`, `demo day oct 2nd 10-noon`: the label makes the start hour known (`10:00`), other rows keep `10?`.
- `five to ten` / `five to nine`: time (9:55) in real data, range in LLM rows. `twenty to six` is a time everywhere, so only 20 and 25 are read as a time.
- `a week from tomorrow` is `+8d`; `fortnight from today` is `+2w`.
- A plural weekday with filler words (`film review wednesdays after school`) is a recurrence in real data and noise in the grammar data.

## Next

- Weekday-list recurrences with typos and glued forms remain the largest e2 block.
- A small learned or scored span chooser could replace the longest-span rule; the failure list shows few cases where it matters.
