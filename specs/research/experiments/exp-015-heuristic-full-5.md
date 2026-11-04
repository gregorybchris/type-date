# exp-015: heuristic-full-5

Status: done. Baseline, no training. heuristic-full-1 to heuristic-full-4 (exp-003, 009, 013, 014) are unchanged.

## Hypothesis

heuristic-full-4 reads LLM-written phrasing well but fails on developer-written formats: year-first and ISO-like dates, `09-JAN-2017`, two-digit years, seconds, `2 days later`, signed offsets, and numbers that are not dates. It also accepts impossible dates (`February 30`, `2024-13-01`) as dates. A validity check at the point where a date or time is scanned, plus the missing formats, should fix most of this without touching the LLM-style behaviour.

## Method

- Eval hygiene: no row of `evals/e1` to `e4`, `data/public/chrono-tests.jsonl` or `test_public` was read. `test_public` is reported as an aggregate from the scoring script only. I have no failure examples from it, so the failure categories below come from `data/real-fmt`.
- Tuned on `data/real-fmt/train.jsonl` (492 rows), `data/real/train`, `data/real-hard/train`, `data/v006/train`. Held-out dev: `data/real-fmt/dev.jsonl` (194), `data/real/dev.jsonl` (288), `data/real-hard/dev.jsonl` (223). The dev sets were read for failure categories and were not fitted row by row.
- Policy from `training/gen/external/LABELER.md`: impossible dates give `x`, year-first numerics are absolute, two-digit years 00-49 mean 20xx and 50-99 mean 19xx, day-first only when the day is over 12, seconds ignored, minute/hour/second offsets are `x`.

## What changed (`packages/baselines/src/heuristic-full-5.ts`)

- **Date validity.** Every full date is checked when it is scanned (`ymd`): month 1-12, day within the month, leap years. An impossible date or time marks the whole text as a non-date (`x`), as the policy says: `February 30, 2014`, `2024-13-01`, `Due 2023-02-29 per the spreadsheet`, `2024-02-30 10:00`, `Feb 29 2023` (but `Feb 29 2024` is valid), `Sept 31`, `Oct 0`, `Monday 32 Jan`, `11/31`, `29/02/2022`. Times over 23:59 or with minutes or seconds over 59 (`25:00`, `7:75 pm`, `99:99`, `14:70:00`) also give `x`.
- **Formats.** Year-first with `-`, `/` or `.` and one- or two-digit month and day (`2001/9/3`, `2020-1-31`); `YYYYMMDD`; `D-MON-YYYY` / `D/MON/YY` / `YYYY-MON-D` / `MON-D-YYYY` (`29-FEB-2016`, `8/Oct/2012`, `2018-Nov-05`, `Mar-15-2021`); `d.m.yyyy` with a day over 12; m-d-yy and d-m-yyyy with the hyphen forms; ISO `T` separators and time zones are dropped.
- **Two-digit years.** `3 Aug 96`, `Dec 31 99`, `3rd Feb 82`, `Aug 9 '96`, `Sep 9 '09`, `12-30-16`; 00-49 map to 20xx and 50-99 to 19xx. `July 4, 1776` keeps the four-digit year. A bare two-digit number after day and month is a year only above 31 (`5 Nov 18` stays an hour, see below).
- **Seconds.** `10:00:00`, `1:05:09 am`, `11:59:59 PM`, `Jun 15 2023 12:00:01 AM` use hour and minute only.
- **Relative offsets.** `2 days later`, `3w later`, `a day later`, `next day`, `the previous day`, `the following day`, `last night`, `a year out`, `a fortnight ago`, `in two fortnights`, `half a year from now`, `negative 5 weeks`, signed `-10d`, `+6m`, `-2 wks`, `5d ago`, `1 mon from now`, `a week today`, `this day next week`, `this day last month`. Arithmetic on an anchor: `a week before yesterday` is `-8d`, `2 day after tomorrow` is `+3d`, `two days after yesterday` is `+1d`, `the day after the day after tomorrow` is `+3d`.
- **Non-date numbers.** Two-part dotted numbers (`Mile 26.2`, `Release 2.5`, `Section 8.3`, `v3.1.4`) are no longer dates; decimals, `1/2 cup`, `250 MB`, `I'm at 10`, quantities such as `2 tablets` or `3 friends` (a bare number before an unknown word) and ids are not read as dates or hours.
- **Words.** `ten to seven` with spelled numbers and no am/pm is `6:50?` (a time); with `pm` it stays a range. `late` is a skipped word. Common English words near number words (`fine`, `line`, `fire`, `there`) are never fuzzy-matched; `passed`, `later`, `gone` match only exactly.
- **Typos.** Fuzzy matching now needs the same first letter at every word length.

## Results (exact / resolved)

| Eval | n | exp-013 | exp-014 | exp-015 |
|---|---|---|---|---|
| e4 val | 2510 | .980 / .980 | .979 / .980 | .977 / .978 |
| e4 test_template | 4541 | .948 / .948 | .946 / .946 | .945 / .945 |
| e4 test_noise | 1465 | .936 / .936 | .936 / .936 | .932 / .932 |
| e4 test_llm | 1301 | .959 / .963 | .956 / .960 | .957 / .961 |
| e4 test_external | 328 | .930 / .933 | .945 / .945 | .951 / .951 |
| e4 test_external_hard | 803 | .785 / .788 | .899 / .899 | .902 / .902 |
| **e4 test_public** | 218 | .638 / .642 | .674 / .679 | **.931 / .936** |
| e4 all | 11166 | .936 / .937 | .945 / .945 | **.949 / .950** |
| e3 all | 10948 | .942 / .943 | .950 / .951 | .949 / .950 |
| e3q | 800 | .939 / .940 | .945 / .946 | .945 / .946 |
| data/real/dev.jsonl | 288 | .962 / .962 | .976 / .976 | .976 / .976 |
| data/real-hard/dev.jsonl | 223 | .789 / .789 | .937 / .937 | .937 / .937 |
| data/real-fmt/dev.jsonl | 194 | .696 / .717 | .696 / .717 | **.995 / .995** |

`runs/exp-015` has e4 as the primary eval. e3, e3q, e2, e2q, `real-dev`, `real-hard-dev` and `real-fmt-dev` are under `metrics.json` `evals`. exp-013 and exp-014 were scored on e4 and the three dev sets with `--no-primary`. There is no e4q. Tuned-on sets (not for comparison): real-fmt/train 0.990, real/train 0.975, real-hard/train 0.984.

Cost:

| | exp-013 | exp-014 | exp-015 |
|---|---|---|---|
| gzip bytes | 10331 | 14624 | 15877 |
| minified bytes | 29399 | 41033 | 44794 |
| p50 / p95 / p99 per call (Node, e4) | 0.040 / 0.56 / 5.2 ms | 0.019 / 0.65 / 2.0 ms | 0.026 / 0.48 / 1.4 ms |

Cold timing on 725 distinct realistic inputs after a JIT warm-up: p50 0.035 ms, p95 0.39 ms, p99 0.71 ms.

## Does it hurt non-date input?

- e4 `non-date-noise` (181 rows, includes the invalid-date and number strings of `test_public`): 0.945 (exp-014: 0.796, exp-013: 0.790).
- The 233 `x` rows of `data/real-fmt` (train and dev): 0.983 (exp-014: 0.644).
- The 105 `x` rows of real and real-hard: 1.000. v005 `non-date-noise` (1006 rows): 0.993, unchanged.
- The grammar splits lose 0.001 to 0.004 (val .980 to .978, noise .936 to .932). The cause in the v006 sample was typos where the first letter changes, which fuzzy matching no longer repairs, and `later today` style words. I fixed the largest of these; the rest are one- or two-row cases.

## Failure categories left

real-fmt/dev (1 of 194): `5 Nov 18` — a two-digit year after day and month. It is an hour in the grammar data (`14 november 10`), so I left it as an hour.

real-fmt/train (tuned on, 5 of 492), all rare constructions:

- Non-dates that look like a time or quantity: `2 for 1`, `3 x 4`, `5 o'clock shadow`.
- Year-first with two digits: `25-07-04` is `2025-07-04` in the labels and `2004-07-25` here (a day over 12 first reads as day-first).
- `Letter of 8/Oct/2012` before the word fix was `x`; fixed.

`test_public` is a single aggregate (0.936 resolved). I cannot name its failure classes. The development sets suggest the remaining gap is the same kind of rare construction, and the 218 phrases in it are the only place to check. A per-tag breakdown from the scoring script would help; `test_public` has the tags of the labelers, which `by_tag` mixes with the other splits.

## Label-policy conflicts found

- `5 Nov 18` (year) against `14 november 10` (hour) against `Dec 31 99` (year, above 31).
- `25-07-04`: year-first two-digit against day-first.
- `ten to seven`: a time in the format round and for hard-style rows, a range in LLM rows when the first number is not a minute word; `ten to two pm` stays a range.
- `in a fortnight` is `+14d` in the grammar data and `2w` in the format round (resolved-equal).
- `last night` is `-1d` (date only), consistent with the day-part rule.

## Next

- Score `test_public` by tag to find the classes left; the aggregate hides them.
- Size is 15.9 kB gzip, at the 16 kB limit. The next gain in size is the lexicon (holiday aliases, stop words) and the compose step.
