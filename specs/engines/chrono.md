# chrono: chrono-node 2.10.3 with an adapter to DSL lines; the third-party comparison baseline.

Status: done.

## Hypothesis

An existing rule-based parser (chrono-node) with a thin adapter covers the plain date and time inputs and fails on recurrence, typos and our specific DSL conventions. Expect good scores on `basic-date` and `basic-date-year`, near zero on recurrence.

## Setup

- Library: `chrono-node` 2.10.3, English casual parser, `forwardDate: true`. Code: `packages/baselines/src/chrono.ts`.
- Adapter: chrono returns absolute dates for a reference instant. The adapter uses `knownValues` and `impliedValues` (through `isCertain`) and the matched text to produce relative DSL forms.
  - Mode: hour certain gives a time, day, month or weekday certain gives a date, both gives `dt`.
  - Today, tomorrow, yesterday and "N units ago / in N units": matched by text, offset from the reference day.
  - Weekdays: `fr`, with `+1` or `-1` from `next` or `last` in the input.
  - Month and day: `MM-DD` when the year is only implied, `YYYY-MM-DD` when certain. Month only gives `M@MM`.
  - `next/last/this week|month|year` gives `W`, `M`, `Y` periods. `weekend` gives `sa>su`.
  - Ranges come from `result.end`. A trailing meridiem on the end is also applied to the start hour.
  - A time with an explicit meridiem, hour 0, hour above 12, a leading zero, or noon/midnight is known. Other hours are `H?`.
- Recurrence: chrono has none. Any input containing `every`, `each`, `daily`, `weekly`, `monthly`, `yearly`, `weekday(s)`, `biweekly` or `alternate` returns `x`. No recurrence layer was added.
- Output `x` when chrono finds nothing or its match covers less than 60% of the input characters.
- Resolved match: the eval runs chrono once per reference day (7 days from `score-resolved.ts`) and resolves both expected and predicted DSL for that same day. Exact match uses reference day 2026-11-03.
- Tuned on `train` and `val` only (a few adapter fixes, val exact went 0.503 to 0.534). Test splits were scored once at the end.

Run: `pnpm --filter @type-date/baselines eval --engine chrono`.

## Results

| Split | n | Exact | Resolved |
|---|---|---|---|
| val | 2591 | 0.534 | 0.542 |
| test_template | 5249 | 0.171 | 0.174 |
| test_noise | 1499 | 0.416 | 0.434 |
| test_llm | 1502 | 0.407 | 0.417 |
| all | 10841 | 0.324 | 0.332 |

- Train (51016 rows, dev only): exact 0.520.
- Size: 14885 bytes minified and gzipped (50292 minified). Node latency per call: p50 0.026 ms, p95 0.080 ms.
- Best tags: non-date-noise 1.00, basic-date-year 0.92, basic-date 0.88, time-only 0.72, weekday-bare 0.69.
- By modifier (exact): abbreviation 0.27, typo 0.12, typo-keyboard 0.07, word-numbers 0.30, casing 0.37, spacing 0.37.

## Worst tags

Recurrence tags score 0.02 to 0.07 by design (`x`). `test_template` is 65% recurrence-weekly (3385 rows), which is why its score is so low.

| Tag | n | Exact |
|---|---|---|
| recurrence-daily | 146 | 0.021 |
| recurrence-interval | 241 | 0.025 |
| recurrence-weekly | 3385 | 0.027 |
| recurrence-monthly-yearly | 325 | 0.065 |
| nth-weekday-of-month | 210 | 0.086 |
| named-holiday | 110 | 0.127 |

Examples (text, expected, got):

- recurrence-daily: `Weekdays` `d R d/1 mo,tu,we,th,fr` `x`; `each day 11 - 11:30` `dt R d/1 11?>11:30?` `x`; `eveyr single day for 10 days` `d R d/1 n10` `x`; `every weekday at 1:30 until march 29` `dt R d/1 mo,tu,we,th,fr u03-29 1:30?` `x`; `eVErYWeEkdAy` `d R d/1 mo,tu,we,th,fr` `x`.
- recurrence-interval: `Every3Weeksfromnovtenth` `d R w/3 s11-10` `x`; `every  other saturday 4:05 for 4 times` `dt R w/2 sa n4 4:05?` `x`; `fortnightly weds 10 times` `d R w/2 we n10` `x`; `every other wk for 12` `d R w/2 n12` `x`; `every 2nd wed x10` `d R w/2 we n10` `x`.
- recurrence-weekly: `wednessdays 7:30 thru 11:30am` `dt R w/1 we 07:30>11:30` `x`; `every  satufday` `d R w/1 sa` `x`; `weekly on thur` `d R w/1 th` `x`; `EVERU SATURDAYS AT 12:30 UNTIL THIRD OCT` `dt R w/1 sa u10-03 12:30?` `x`; `on fri for` `d R w/1 fr` `d fr`.

## Takeaways

- Without recurrence and typo handling chrono reaches 0.32 exact and 0.33 resolved over all test splits. Resolved is only 0.007 above exact (80 rows), so the errors are wrong parses, not equivalent forms.
- Failures outside recurrence: typos (chrono needs exact words), `nth weekday of month` (it returns weekday and month as two results), holidays other than a few, `W`/`M`/`Y` periods with abbreviations, bare numbers as times (`4 to 4:30` works, `10` does not), date ranges with shared month (`oct 2 to 5`), the `?` ambiguous-meridiem convention, and partial input.
- 14.9 kB gzipped makes it larger than the full heuristic  and much worse on accuracy.

## Next

- None for this baseline. It is the reference for the existing-library comparison on the Pareto front.
