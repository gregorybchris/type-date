# Coverage taxonomy: kinds of input the picker should understand

Started from two user examples: "last 3 fridays" and "weekends since october". Neither appeared in any dataset row (checked across 71,575 rows of training data and eval e5). This file lists the families those examples belong to, whether DSL v1/v2 can express each, and what we add.

Status: `ok` = expressible now, `ext` = needs the DSL extension in `specs/dsl.md` ("v2 additions, part B"), `x` = not supported, label `x`.

| # | Family | Examples | Status | DSL form |
|---|---|---|---|---|
| A | Counted occurrences, past or future | "last 3 fridays", "next 4 mondays", "the past 2 weekends", "next 5 weekdays" | ext | date list: `d fr-1,fr-2,fr-3` |
| B | Recurrence inside a period | "weekends since october", "fridays this month", "tuesdays in march", "weekdays next week", "every monday in 2027", "saturdays until christmas" | ext | recurrence with period bounds: `d R w/1 sa,su sM@10< u+0d`, `d R w/1 fr sM+0 uM+0` |
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
