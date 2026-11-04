# exp-017: heuristic-full-7

## Hypothesis

Rewrites and a few direct forms for the failure clusters in the web pool (real phrases from library tests, docs and issues) raise the web dev score above 90% without costing more than 1 point on the other dev sets. Moving the DSL v2 layer into a lazily loaded chunk keeps the eager download under the 24 kB budget.

## Method

- Engine `heuristic-full-7` (`packages/baselines/src/heuristic-full-7.ts`), copied from full-6. full-6 is unchanged. The lazy part is `packages/baselines/src/full-7/v2-forms.ts` (not an engine).
- Data hygiene: error analysis used only `data/pool/web/{dev,dev4}.jsonl` (1,318 rows), `data/pool/{v2,tax}/{train,dev}`, `data/real*/{train,dev}` and `data/v007/train`. No row of `evals/e1..e7` or `data/pool/*/test*.jsonl` was read. `runs/exp-017/errors.jsonl` was written by `eval.ts` and not opened. e6 and e7 were scored as aggregates only. e7 was scored once (at the end).
- Four rounds on the web dev pool: 84.0 -> 93.3 -> 94.6 -> 96.3 -> 96.7 (exact, before the last label decision below). Gains per round: 9.3, 1.4, 1.7, 0.4 points. The last round gained under 1 point and the rest of the failures are mostly non-English text and odd labels, so I stopped. I did not run a second consecutive sub-1 round.
- The web pool is dev data here and was used for row-level tuning. Its numbers are development numbers, not held-out.

## What changed

Structure:
- Core (eager): scanner, base grammar, compact weekday expansion, day of month. Sync `parseFull` and an async `predict`.
- Lazy chunk: all full-6 v2 handlers (open ranges, durations, lists, bounds, windows, anchored and business offsets, quarters) plus the new code. `predict` loads it with `import()` when the text matches a cue regex (`V2_CUE`, about 10% of dev texts skip it). With the cue, results are identical to always running it on all dev sets. `baseOnly` gives the eager parse alone.
- `scripts/eval.ts` now bundles with code splitting. `size_bytes` is the eager gzip, `size_bytes_lazy` is the lazy chunk.

New behavior (all in the lazy chunk):
- Rewrites before scanning: seconds (`12:09:08` -> `12:09`), trailing zones and offsets (`-05:00` after seconds, `+0500`, `GMT+0900 (JST)`, `pst`, `Z`), `10h30`, year after time (`Apr 4 00:22 PDT 1995`).
- Years the scanner read as times: `January 1, 1825`, `23 May 1856`, `August 31, 4500` become ISO dates (comma, year over 2359, a following time, or a leading weekday). Year words after a month (`nineteen eighty one`, `two thousand and sixteen`).
- Date then time joined by a dash or reversed meridiem (`Dec 16, 2007 - 12:51 AM`, `2022-05:00 PM`, `2020/10/9 PM 2:26`), `0am`.
- Numeric dates with spaces or dots (`03 11 2026`, `14 12 2021`, `27. 05. 2022.`, `2003 09 25`), `2007-11-13/15`, `22-feb`.
- Cron English (`At 09:46 AM, only on Monday` -> weekly recurrence).
- `tom morning`, `tomnight`, `this noon`, `this day`, `current month`, `this upcoming mon`, `in next tuesday`, `next June 13`, `last June 13`, `last september`, `10th of next october`, `3rd thursday this september`, `next christmas`, a few named days (April Fools, flag, veterans, earth, groundhog, Christmas eve).
- `first/last/Nth day of <month> [year]`, `morning of the 15th`.
- Arithmetic: `now - 1 day`, `today + 12 days`, `- 3months`, `3d`, `3wk`, `jul9 + 17d` (anchored), `0 days ago` -> `+0d`, `1 monday ago`, `1000 years ago`, word numbers (`seventy two days ago`, `one hundred and thirty-six years ago`), `in a decade`, `1 fortnight ago`. A singular unit with N other than 1 (`In 3 day`) stays `x`, as in the old labels.
- Bare ordinals (`27th` -> `D@27`, `5th to 7th`), `from today` -> open range, `through 2014` -> `>2014-12-31`, quarter words (`Quarter 1`, `3rd qtr`), `up to 11:10 pm`, `starting X and ending Y`.
- Recurrences: monthly day lists with month filters, counts and bounds (`every aug 20 and 30`, `the fifth day of each month`, `Monthly on the first and last day of the month for 10 occurrences`, `every other month`), start dates (`starting May 13th repeat every other day`, `every two days next monday at 19:00`), weekday ranges in recurrences (`every Mon-Wed ...`, `thru`), `for the next year` as a rolling window, `starting in may`, `forever`, `X or Y` weekdays, bound years kept (`until December 24, 1997`).
- Two times joined by `and` where the left has am/pm or `at`: the first is the label.

## Results (exact match, today 2026-11-03)

| Set | full-6 | full-7 |
|---|---|---|
| web dev pool (n=1318) exact | 0.8399 | 0.9621 |
| web dev pool resolved | 0.8475 | 0.9666 |
| web dev (n=705) / dev4 (n=613) | 0.8553 / 0.8222 | 0.9702 / 0.9527 |
| real dev (n=288) | 0.9514 | 0.9514 |
| real-hard dev (n=223) | 0.8789 | 0.8789 |
| real-fmt dev (n=194) | 0.9588 | 0.9588 |
| pool v2 dev (n=93) | 0.9462 | 0.9462 |
| pool tax dev (n=142) | 0.8169 | 0.8239 |
| e6 all (n=11705) | 0.9362 | 0.9360 |
| e6 val / test_template / test_noise / test_llm | 0.9741 / 0.9339 / 0.9296 / 0.9535 | 0.9737 / 0.9321 / 0.9296 / 0.9527 |
| e6 test_external_hard / test_public / test_public2 | 0.8534 / 0.9242 / 0.8430 | 0.8560 / 0.9431 / 0.8760 |
| e6 test_v2 / test_tax | 0.9286 / 0.8436 | 0.9196 / 0.8436 |
| e7 all (n=12344) | 0.9293 | 0.9310 |
| e7 test_web_sealed / test_web_heldout | 0.8327 / 0.7835 | 0.8845 / 0.8093 |

No dev set other than tax moved. e6 is flat (-0.0002). test_v2 lost 2 rows (0.9286 to 0.9196) and test_template 4 rows. These rows are sealed to me, so I could not inspect them. Diffs against full-6 on `pool/{v2,tax}/train`, `real*/train` and a v007 sample show 0 regressions after the fixes below, so the cause is not visible in the open data.

Regressions found on open train data and fixed: single month and day recurrence (`every may 22` stays `R y/1 05-22`), `2 w` and `In 3 day` (stay `x`), `this day next week`, `-0y` (now `+0y`), `2pm 1h` (kept as a duration), `runs 1 hour` and `at 6 and 30` (the `and` rule now needs a time with am/pm or `at` on the left and a time on the right), `afternoon of Sunday` (only `morning of the <digit>` is dropped).

### Web dev pool per tag (exact, full-6 -> full-7)

| Tag | n | full-6 | full-7 |
|---|---|---|---|
| quarter | 2 | 0.000 | 1.000 |
| recurrence-month-filter | 7 | 0.000 | 0.857 |
| day-of-month | 16 | 0.500 | 1.000 |
| recurrence-bounded | 39 | 0.641 | 0.923 |
| relative-offset | 106 | 0.708 | 0.972 |
| open-range | 10 | 0.700 | 1.000 |
| datetime-range | 21 | 0.762 | 0.810 |
| anchored-offset | 18 | 0.833 | 1.000 |
| period-relative | 18 | 0.833 | 0.944 |
| basic-date | 365 | 0.855 | 0.953 |
| datetime | 367 | 0.869 | 0.967 |
| recurrence | 100 | 0.880 | 1.000 |
| time-only | 112 | 0.893 | 0.964 |
| nth-weekday-of-month | 28 | 0.893 | 1.000 |
| basic-date-range | 39 | 0.923 | 0.974 |
| duration | 3 | 0.667 | 0.667 |
| non-date-noise | 41 | 0.927 | 0.927 |

## Cost

- Eager gzip 18.98 kB (full-6 total was 23.97 kB; budget 24 kB). Lazy chunk 10.60 kB gzip. Eager plus lazy downloaded is 29.6 kB, which is over 24 kB if the budget counts both. The lazy chunk is needed for about 90% of dev texts, so this is deferred loading, not avoided loading. A real saving needs the v2 handlers to be cut or table-driven.
- Node latency (e6, includes the first lazy import): p50 0.094 ms, p95 0.54 ms, p99 1.47 ms (full-6: 0.046 / 0.43 / 1.33). Budget p95 < 3 ms. Not measured on a phone.

## Label conflicts and decisions

- Range end repeating the start date: web labels drop it (`today 4PM to today 5:15PM` -> `dt +0d 16:00>17:15`), the generator data (v007, e6 val) keeps it (`dt +1d 14:45>+1d 17:30`). I tried dropping it: web +0.4 points, e6 val -0.16, v007 sample -9 rows. Kept full-6's choice. Needs a policy decision in `specs/dsl.md`.
- `Weekly on Tuesday and Thursday for five weeks`: web `u+5w`, full-6 and the v2 pool use a count (`n10`). Not changed.
- `every <month> <day>` with one month and one day: old data `R y/1 MM-DD`; web `every January on the 15th` is `R m/1 d15 M@01`. Both kept: the `on` form and lists use the monthly form.
- `2 w`, `1 w`, `In 3 day`: old data `x`; web `3d`, `3wk` -> `+3d`, `+3w`. Only the glued forms are accepted.
- `the day before Christmas 2006`: web `d 2006-12-24`; anchored policy gives `12-25~-1d`. Not changed.
- `today: '2026-01-01'`: web gives the ISO date, the first-date rule gives `+0d`. Not changed.
- Minute words with digits (`10 after 2`, `10 to 8`, `10 till 2`): web labels them times (`2:10?`, `7:50?`, `1:50?`); the v2 policy says only minute words, not digits. Not changed.
- Start weekday of a recurrence (`every 8 weeks starting Thursday` -> `R w/8 th`, `every week starts this wednesday` -> `R w/1 we`): web drops the start. Followed. DSL has `s<DATE>`, so these may be wrong under `specs/dsl.md`.

Pool labels that look wrong under `specs/dsl.md` (not edited):
- `r-webp... b4p1-0204` "01/21/2021 10:00 to 01." is `dt 2021-01-21 10?` but "08/08/2023, 09:15 AM to 08" (`b4p0-0121`) is `09:15`: the two rows drop the cut-off end but write the start differently (`10?` for an explicit `10:00`).
- `b4p0-0323` and `ebp1-0230` are `x` for text that holds years or digits; fine, but the parser needs a noise rule to match.
- `b4p0-0359` "not today, day after tomorrow" -> `+2d` ignores the first date, against the first-date rule.
- `b4p2-0172` "the monday after next monday" -> `mo+2` while anchored phrases elsewhere use `~`.

Pre-existing bug (also in full-6): `dec 6th thur twenty sixth` -> `d th#6@12`, which does not round-trip (found by `validate-data.ts`: 77,574 predictions over web, v2, tax, real and v007 train, 1 bad).

## Remaining failures on the web dev pool (about 50 rows)

- About 20 non-English months and day names (out of scope).
- `every year on the fourth thursday in november`, `fridays starting in may for 10 occurrences` (count missing), `every aug on day 20 and 30`, `every fourth of the month from jan 1 2010 to dec 25th 2020`.
- Digit minute words (`10 to 8`), `twenty-eight minutes to seven`, `on Saturday for 9am`, `we start phase two in 3 days` (`two in` read as a time), `A380 tomorrow`.
- `first to last day of 2008`, `first to last day of this september`, `morning of xmas`, `31.xii.99`, `10-3`.
- Source with the most failures: `dateparser test_date_parser.py` (0.72, mostly foreign words), then duckling issues and the datetime-range tag (0.81).

## Fix after the run (2026-11-04)

"next 3 mon thu fri" and "next 3 m/th/f" returned only the Mondays. The counted-occurrence rule (`src/full-7/v2-forms.ts`) now takes several weekdays and gives N of each, as "next 2 weekends" already did: `d mo+1,mo+2,mo+3,th+1,th+2,th+3,fr+1,fr+2,fr+3`. Lists over 31 dates are not produced. Web dev pool exact stays 96.2%. Earlier fix the same day: "dec 6th thursday" gave the invalid `th#6@12`; it now gives `d 12-06`. These two changes are not in the exp-017 scores on e7 and e8.
