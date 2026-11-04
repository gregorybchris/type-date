# exp-014: heuristic-full-4

Status: done. Baseline, no training. heuristic-full to heuristic-full-3 (exp-003, 009, 013) are unchanged.

## Hypothesis

heuristic-full-3 handles a date phrase inside filler, but it fails on the hard style: a date buried in a long pasted message with several dates and times, shorthand (`m/w/f 7a-9a`), bounded recurrences (`Saturdays 10-11 a.m., June 6 through July 25`) and unusual constructions (`a week from tomorrow`, `friday after next`). Splitting the message into spans and composing the date, the times and the recurrence bounds should fix most of these. The risk is more false positives on text with no date.

## Method

- Eval hygiene: no row of `evals/e1`, `e2` or `e3` was read; they were scored only by `scripts/eval.ts`. `test_external` and `test_external_hard` appear only as aggregates.
- Tuned on `data/real-hard/train.jsonl` (555 rows), `data/real/train.jsonl`, `data/v005/train.jsonl`. Failure analysis and scoring on `data/real-hard/dev.jsonl` (223) and `data/real/dev.jsonl` (288), never trained on. The real-hard dev set was read for failure categories. I did not fit individual dev rows, and the label-policy conflicts below were left alone.
- Regression checks: a 13k sample of v005 train, the 105 `x` rows of real and real-hard, and the 1006 v005 `non-date-noise` rows.

## What changed (`packages/baselines/src/heuristic-full-4.ts`)

- **Span composition.** The best span is found in every stretch of known tokens between unknown words (and in what is left of it), then composed: the most specific date span is primary (recurrence, then a dated time, then a numeric date, then a holiday or weekday). One time becomes its time, a range becomes its time range, two times join into a range only after a cue word (`depart ... return`, `dep ... arr`), and otherwise the times are dropped. A second dated span with an end cue (`departure`, `ends`, `dropoff`) makes a range. For a recurrence, other spans give the start, the end (cue words such as `starts`, `ends`, `until`), or a count (`8 weeks`).
- **Bounded recurrences.** `June 6 through July 25`, `September through October 25th`, `in March`, `through the end of june`, `till end of year`, `for the next 8 weeks` (count is multiplied by the number of days), `weekends`, `daily except sundays`, `Monday through Friday`, `Sunday through Thursday`, `ea.`, `fortnight`, `each 15th and 30th`, `4th Thursday` inside a message, and a leading time or start date.
- **Shorthand.** `m w f`, `m/w/f`, `tu+th`, `m-f`, single `su 8p`, `th 4p`, `tu 10-11:30a`.
- **Calendar phrases.** `fri the 13th`, `Saturday the 21st`, `the 10th of next month` (use the reference day, default 2026-11-03; they pass `today`), `friday after next`, `monday of next week`, `next july`, `a week from tomorrow`, `3 days hence`, `after 3 days`, `two days after the 1st of december`, `the day before christmas eve`, `Aug 7 - Aug 14, 2027` (year of the end applies to the start).
- **Clock words.** `a quarter to midnight`, `ten past noon`, `a quarter after seven`, `half past noon`, `ten till two`, `five to midnight`, `nine-thirty`, `three-ish`, `12 midnight`, `12:00 noon`.
- **Weekday with a date.** `Fri, Nov 6`, `Wed 9 Sept 2026`, `next Monday, Nov 9` (the date wins), `Monday this week`, an extra weekday after a date is ignored, a holiday followed by an explicit date takes the date.
- **Non-date guards.** Numbers after `gate`, `room`, `seat`, `flight`, `train`, `ages`, `limit`, `cabin`, `$`, `#`; phone numbers (only with `call/phone/office` before them); ids with hyphens; `eurostar 9024`-like four-digit numbers are weak; singular `weekday` and `workday` need `every`; possessive weekdays (`Monday's`); `new year` singular; a bare number followed by an unknown word is not an hour; plural weekday or bare recurrence next to unknown words stays `x`.
- **Messages.** Phrases like `moved ... to X` and `changed from A to B` keep the last date. `instead of 3:15` is dropped. `before noon` gives no time. `after 1 PM` keeps it. `all day` is dropped. `week of oct 14` is the date.
- **Typos.** Number words only match typos of the same length, a doubled letter, or a missing letter (`severe` is not `seven`, `thrree` and `firt` still work). Two-edit matches need the same first letter and a target of 6+ letters (`marcus` is not `march`).
- **Label policy.** `H:MM` without am/pm at hour 10 to 12 is now always `H:MM?` (no special case for `:00`).

## Results (exact / resolved)

| Eval | n | exp-013 | exp-014 |
|---|---|---|---|
| e3 val | 2510 | .980 / .980 | .979 / .980 |
| e3 test_template | 4541 | .948 / .948 | .946 / .946 |
| e3 test_noise | 1465 | .936 / .936 | .936 / .936 |
| e3 test_llm | 1301 | .959 / .963 | .956 / .960 |
| e3 test_external | 328 | .930 / .933 | .945 / .945 |
| e3 test_external_hard | 803 | .785 / .788 | .899 / .899 |
| e3 all | 10948 | .942 / .943 | .950 / .951 |
| e3q | 800 | .939 / .940 | .945 / .946 |
| e2 all | 10145 | .955 / .955 | .954 / .955 |
| data/real/dev.jsonl | 288 | .962 / .962 | .976 / .976 |
| data/real-hard/dev.jsonl | 223 | .789 / .789 | .937 / .937 |

exp-014 has e3 as the primary eval; e3q, e2, e2q, `real-dev` and `real-hard-dev` are under `metrics.json` `evals`. For exp-013 the same keys exist, so the rows above are comparable. Tuned-on sets (not for comparison): real-hard/train 0.984, real/train 0.968.

Cost:

| | exp-013 | exp-014 |
|---|---|---|
| gzip bytes | 10331 | 14624 |
| minified bytes | 29399 | 41033 |
| p50 / p95 / p99 per call (Node, e3) | 0.040 / 0.56 / 5.2 ms | 0.019 / 0.65 / 2.0 ms |

Cold timing on 725 distinct realistic inputs after a JIT warm-up: p50 0.031 ms, p95 0.59 ms, p99 1.1 ms. Size is just above the 14 kB aim (+4.3 kB over exp-013).

## Does it hurt non-date input?

- `x` rows of `data/real` and `data/real-hard` (105 rows, all splits): 1.000 (exp-013 0.971 with the new hard rows).
- v005 `non-date-noise` (1006 rows): 0.993, same as exp-013 (0.992).
- e3 `non-date-noise` (129 rows, includes the pasted rows of `test_external_hard`): 0.930 (exp-013 0.922). About 9 false positives remain. I did not read them. By construction the remaining risk is month or weekday words used as ordinary words (`may`, `sat`, `sun`), and a number next to an unknown word. I tried marking `sat`, `sun` and `wed` as ambiguous. It cost 0.004 on real dev and I could not measure the gain, so I reverted it.
- Grammar splits changed by -0.001 to -0.003 (val, template, llm), within what the removal of the `:00` special case explains.

## Failure categories left (real-hard/dev, 14 of 223)

- Spoken or unusual times: `five of nine am`, `noon thirty`, `tr 1-2:15` (shorthand `tr` = Thursday).
- Inexpressible day-count dates: `penultimate day of the year`, `second to last day of the year`. The last day of a given month is expressible; these are not without the year.
- Message intent rather than grammar: a return time that is labelled ignored (`return approx 5pm`) against one labelled as a range (`depart 9:15, return 1:30`); `Next attempt: Fri 10/30` (the later date wins) against the first date; `immediately after the 9 AM service` (no time); `arrive 8:30` (ignored).
- A holiday before an explicit date (`independence day 15th august`) and a date with a time range after a holiday (`july 1st, canada day, 10 till 2`).
- `Monday nights 6:30 p.m. - 8:00 p.m.` as a recurrence; `weekly on mondays through january` with `through <month>` after a weekly marker; a recurrence word in a sentence (`the quarterly newsletter ... on the 1st of the month`).

real-hard/train (tuned): about 9 of 555, mostly the same intent conflicts and `the last day of february next year`.

## Classes DSL v1 cannot express (counts in `data/real-hard/{train,dev}` = 778 rows)

Counted by phrase pattern, so they overlap with rows the labelers simplified to a plain date:

| Class | Rows | Labelers' choice | A DSL extension would be |
|---|---|---|---|
| Open range or limit (`after 2 PM`, `by 8pm`, `before noon`, `no later than`, `until`) | 32 | after gives the time, by gives the time, before gives nothing | `t >12:00`, `t <12:00` open range ends |
| Duration (`(50 min)`, `for 2 hours`, `every 90 minutes`) | 16 | duration dropped, or `x` | `+90m` end offset, and `R m/90` minute intervals |
| Day of month only (`the 3rd and 4th of july` works; `the 15th` alone) | 18 | nth weekday or `x` | `D@15` next 15th |
| Last or penultimate day (`last day of the year`, `last weekday of the month`) | 5 | a computed date or `x` | `d-1` for the month end exists in recurrences; add `M-1` end and `Y-1` end forms |
| Week of (`week of oct 14`, `the week of Thanksgiving`) | 2 | the date | a whole-week range form |
| Several events in one message (two shows, doors and music) | seen in about 10 | the first, or date only | none; a list result |

## Label-policy conflicts found

- `every 2nd wed`: weekly interval 2 in the grammar and v005 (`R w/2 we`), monthly nth in real-hard (`R m/1 we#2`). Kept the grammar reading.
- `weekends only, 10 to noon` and similar: the label makes the start hour known (`10:00`), the policy says `10?`.
- Two times in a message (`doors 6:30pm, music 8pm`): date only; `depart ..., return ...`: a range; `arr 8:30` without am/pm: ignored. Decided by cue words, so some rows disagree both ways.
- `return approx 5pm` is ignored in one row and a range end in another.
- `mon-fri` alone is a weekday range in real data and a weekly weekday recurrence in the grammar (carried over from exp-013).
- A plural weekday with filler words (`film review wednesdays after school`) is a recurrence in real data and noise in the grammar data (kept as `x`).
- `Delivery date changed from 11/9 to 11/13` keeps the later date; `Next attempt: Fri 10/30` keeps the later date; `Thursday, October 2nd - order forms due Friday` keeps the first. No rule separates them except the words `changed`, `moved` and `rescheduled`.

## Next

- A small ranker over the spans (date kind, words before it, position) could replace the hand-set scores and would cover the intent conflicts above; the dev failures show few cases where it matters.
- A DSL extension for open ranges and durations would remove the largest group of labeler choices (48 of 778 rows).
- Size: 14.6 kB gzip. The lexicon and the compose step are the largest parts; the holiday aliases and the clock-word merges could be moved into a table to save about 1 kB.
