# exp-002: small heuristic parser

Status: done. Baseline, no training.

## Hypothesis

About 40 regex rules and a few helper functions, no dependencies, under 6 kB gzipped, cover the common phrases. Expect around 0.8 on in-distribution clean input and a steep drop on typos, glued words, and held-out templates.

## Setup

- Code: `packages/baselines/src/heuristic-small.ts`. No dependencies. No fuzzy matching.
- Input: lowercased and whitespace-collapsed (the engine also does this itself).
- Pipeline: a normalizer (`canon`) maps synonyms and spelled-out numbers (`nxt`, `lst`, `coming`, `twenty first`, `each`, `business day`, filler words) to canonical forms. Then the text is tried as a recurrence, a single point (date, time, or both), or a range split on `to`/`and`.
- Rules: 25 date patterns (ISO, `m/d`, `mon d`, `d mon`, relative days, weekdays with `next/last`, offsets, periods, nth weekday of month, month only, year only, a few holidays), a time parser (am/pm, 24h, noon, midnight, bare hours), 11 recurrence patterns with count, until and start suffixes and an optional time or time range.
- Time convention: `?` for hours without meridiem. A trailing meridiem carries back to the start hour. 24h evidence on one end (hour above 12, leading zero) makes both known.
- Trailing connectors (`to`, `at`, `from`, ...) are dropped, so `oct 2 to` gives `d 10-02`. No other partial-input handling.
- Tuned on `train` and `val` only. Test splits were scored once at the end.

Run: `pnpm --filter @type-date/baselines eval --engine heuristic-small --exp 2 --title "heuristic-small (regex rules)"`.

## Results

| Split | n | Exact | Resolved |
|---|---|---|---|
| val | 2591 | 0.808 | 0.808 |
| test_template | 5249 | 0.519 | 0.519 |
| test_noise | 1499 | 0.449 | 0.449 |
| test_llm | 1502 | 0.549 | 0.553 |
| all | 10841 | 0.582 | 0.583 |

- Train (51016 rows, dev only): exact 0.785.
- Size: 3549 bytes minified and gzipped (8706 minified). Node latency per call: p50 0.015 ms, p95 0.032 ms.
- Best tags: non-date-noise 1.00, basic-date-year 0.88, nth-weekday-of-month 0.85, basic-date-range 0.83, date-range-shared-month 0.83.
- By modifier (exact): typo 0.21, typo-keyboard 0.13, spacing 0.47, abbreviation 0.55, casing 0.60, partial-prefix 0.61, word-numbers 0.62.

## Worst tags

| Tag | n | Exact |
|---|---|---|
| period-relative | 125 | 0.216 |
| named-holiday | 110 | 0.318 |
| fuzzy-period | 32 | 0.344 |
| recurrence-weekly | 3385 | 0.371 |
| relative-offset | 201 | 0.403 |

Examples (text, expected, got):

- period-relative: `lastwek` `d W-1` `x`; `lastmonth` `d M-1` `x`; `lastweem` `d W-1` `x`; `thisweek` `d W+0` `x`; `thhis   month` `d M+0` `x`. Glued or misspelled words fail because rules need exact spaced words.
- named-holiday: `chtistmas` `d 12-25` `x`; `pres day` `d mo#3@02` `x`; `mlkday ` `d mo#3@01` `x`; `columbusday` `d mo#2@10` `x`; `xmqs   eve` `d 12-24` `x`.
- fuzzy-period: `theweekend ` `d sa>su` `x`; `thiwseekend` `d sa>su` `x`; `Theweekend` `d sa>su` `x`; `the   wekend` `d sa>su` `x`; `thisweelend` `d sa>su` `x`.
- recurrence-weekly: `every   szturdays` `d R w/1 sa` `x`; `tuesday, monday, wednesday for 6 times` `d R w/1 mo,tu,we n6` `x`; `every fri, tuesday, thursday till 3/3` `d R w/1 tu,th,fr u03-03` `x`; `ON THURSD` `d R w/1 th` `d th`; `every sat, sun & tue` `d R w/1 tu,sa,su` `x`.

## Takeaways

- 3.5 kB gets 0.81 on in-distribution val but 0.52 on held-out templates and 0.45 on noise. Rules are brittle: each new phrasing or typo needs a rule.
- Most losses are exact-spelling and spacing. Weekday lists in recurrence, holidays other than a handful, and word-number times are not covered.
- 2.5 kB of the 6 kB budget is unused. The next rules to add are weekday lists, more holidays, and a split of glued words, but exp-003 shows the cost of doing this properly (7.9 kB).

## Next

- None planned. It is the "tiny code" point on the Pareto front.
