# Coverage taxonomy: kinds of input the picker should understand

Started from two user examples: "last 3 fridays" and "weekends since october". Neither appeared in any dataset row (checked across 71,575 rows of training data and eval e5). This file lists the families those examples belong to, whether DSL v1/v2 can express each, and what we add.

Status: `ok` = expressible now, `ext` = needs the DSL extension in `specs/dsl.md` ("v2 additions, part B"), `x` = not supported, label `x`.

| # | Family | Examples | Status | DSL form |
|---|---|---|---|---|
| A | Counted occurrences, past or future | "last 3 fridays", "next 4 mondays", "the past 2 weekends", "next 5 weekdays" | ext | date list: `d fr-1,fr-2,fr-3` |
| B | Recurrence inside a period | "weekends since october", "fridays this month", "tuesdays in march", "weekdays next week", "every monday in 2027", "saturdays until christmas" | ext | recurrence with period bounds: `d R w/1 sa,su u+0d sM@10<`, `d R w/1 fr uM+0 sM+0` |
| B | Recurrence over a rolling window | "M/T/W over the past 6 weeks", "fridays for the next 3 months", "daily this past month" | ext | `d R w/1 mo,tu,we u+0d s-6w`, `d R w/1 fr u+3m s+0d` |
| B | Recurrence that repeats every year in a month | "weekdays every august", "mondays each june", "every year in march on fridays" | ext | month filter: `d R d/1 mo,tu,we,th,fr M@08` |
| B | Single-letter and compact weekday forms | "M/T/W", "MWF", "T/Th", "M-F", "TTh", "S/S" | ok | the parser's job; DSL already lists weekdays |
| C | Rolling windows | "last 30 days", "next 2 weeks", "past 3 months", "the next 10 days" | ok | `d -30d>+0d`, `d +0d>+2w` |
| C | Rest of a period / period ends | "rest of the month", "rest of this week", "year to date" | ok | `d +0d>M+0`, `d Y+0>+0d` (a period as range end means its last day, as range start its first day) |
| C | Named periods | "this quarter", "Q3", "next quarter", "second half of march" | ext (quarters only) | `d Q+0`, `d Q@3`, `d Q+1`. Halves and "nth week of" are x |
| D | Explicit date sets | "oct 2, oct 9 and oct 16", "the 1st and 15th", "jan 5, 6, 7", "mon wed fri next week", "oct 2 and 9 at 3pm" | ext | list: `d 10-02,10-09,10-16`, `d D@1,D@15`, `dt 10-02,10-09 15:00` |
| D | Several ordinals of a weekday in a month | "first and third tuesday of every month" | ext | `d R m/1 tu#1,tu#3` |
| E | Relative to another date | "3 days before oct 15", "2 days after xmas", "a week from oct 5", "the day before thanksgiving" | ext | anchored offset: `d 10-15~-3d`, `d 12-25~+2d`, `d th#4@11~-1d` |
| F | Business-day arithmetic | "next business day", "3 working days from now", "5 business days after oct 1" | ext | unit `b`: `d +1b`, `d +3b`, `d 10-01~+5b`. "Last business day of the month" is x |
| G | Exceptions | "every day except sunday", "weekdays but not wednesday", "daily except the 25th" | ok (expand the list) | `d R d/1 mo,tu,we,th,fr,sa`. An exception on a day of month is x |
| H | Time-of-day patterns | "weekday mornings", "9-5 weekdays", "evenings this week", "business hours" | partial | a daypart is not a clock time. "9-5 weekdays" is ok: `dt R d/1 mo,tu,we,th,fr 9?>5?`. "mornings" alone is `x` |
| I | Frequency without days | "twice a week", "3 times a month", "every few days" | x | no concrete dates |
| J | Fuzzy spans | "summer", "christmas week", "spring break", "thanksgiving weekend" | x | no stable dates (use named holidays: `d th#4@11>su` style is not defined) |
| K | Numbers and units outside d/w/m/y/b | "in 90 minutes", "2 hours ago" | x | minutes and hours as offsets from now are not dates |
| L | Messages that mention more than one date | "meeting moved from 11/9 to 11/13" | policy | first date wins (see `specs/dsl.md`) |

## Principles for adding a family

1. The DSL form must resolve to concrete dates with the resolver (no model guess).
2. The picker must be able to show it (multi-select, ranges, recurrence preview).
3. A family is added only with its negative controls: similar text that must not parse as the new form.
4. Each family gets independent writers (instructions list families and phrasings but never the DSL forms), two agreeing labelers, and a hidden test split.

## Families from web research round 4 (2026-11-03)

Source: `specs/research/background/web-sources-4.md`. None of these are in the DSL yet. Status column: `x` means the label is `x` for now; `v3?` means a DSL v3 candidate.

| Family | Examples | Status |
|---|---|---|
| Sub-day interval recurrence with start and end clauses | "every 12 hours starting at 9pm", "every two days at 19:00" | v3? |
| Completion-based recurrence | "every! 3 hours", "after 10 days" | x |
| Day-of-month or per-month ordinal lists in one recurrence | "every 2, 15, 27", "every 1st wed jan, 3rd thu jul" | v3? |
| Workday-counted ordinals, nth-last positions | "every last workday at 3pm", "fifth last day of May" | v3? |
| Alternatives and fuzzy intervals | "two or three days ago", "in 2 to 4 weeks", "3ish pm" | x |
| Deadline and bound words | "within half an hour", "by end of the month", "away until Wednesday" | open range where one side is known, else x |
| Direction qualifiers on weekdays | "past Monday", "Monday after next", "two weeks from tuesday" | partly covered |
| Titles that look like dates (negative controls) | "Cafe May", "Meet Bob at 2.30", "A380 tomorrow" | x |
| Chained anchored offsets | "12 hours before yesterday at 12:30" | v3? |
| Boundary shorthand | eod, eow, som, soq, "mid January" | v3? |
| Day-only ranges | "Sep 12-13", "25 - 31 Dec" | covered |
| Frequency words without days | "twice a week", "biweekly" | x |
| Typos and malformed ordinals | "satterday", "tommorning", "23th December" | robustness |
| Time zone suffixes, seconds | "16:11:35 -05:00", "10:30 pst" | strip, keep HH:MM |
| Non-English names | "Juli", "Marzo", "завтра" | out of scope |

Eval note: e7 `test_web_*` rows keep only phrases where two labelers agreed and neither was unsure, so unsupported families are mostly absent from the eval. Use the unsure rate per source as a separate signal.
