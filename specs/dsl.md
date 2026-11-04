# DSL v2 (superset of v1)

A parser engine emits one line of text. A deterministic resolver (`packages/core`) turns it into dates. The engine never computes calendar dates. Rationale: `specs/research/background/output-format.md`.

The prompt is the raw typed text. Reference time (`now`), time zone, and week start are resolver settings.

## Grammar

```
OUT    := 'x' | MODE ' ' BODY
MODE   := d | t | dt
BODY   := PT | PT '>' PT | REC
PT     := DATE | TIME | DATE ' ' TIME           (range end may omit parts and inherits them from the start)
DATE   := YYYY-MM-DD                            absolute
        | MM-DD                                 month and day, nearest occurrence on or after today
        | (+|-)N(d|w|m|y)                       offset from today. +0d is today
        | WD                                    next occurrence of weekday, on or after today
        | WD(+|-)N                              Nth occurrence strictly after (+) or before (-) today, N >= 1
        | WD#K@MM                               Kth weekday of month MM. K=-1 is last. Nearest on or after today
        | W(+|-)N | M(+|-)N | Y(+|-)N           whole week / month / year relative to now. Expands to a range
        | M@MM | Y@YYYY                         whole named month (nearest on or after today) / whole year
        | DDD@M±N                               day DD of the month N months from this one (`D13@M-1` is the 13th of last month). The month lacks the day: `x`
TIME   := HH:MM                                 24h, known
        | H[:MM]'?'                             hour 1-12, am/pm unknown
REC    := 'R' ' ' F '/' N [' ' DAYS] [' ' LIMIT] [' ' TIMES] [' ' 's' DATE]
F      := d | w | m | y
DAYS   := WD(','WD)* | dNN | dNN(','dNN)* | WD '#' K       (dNN: day of month, d-1 is last)
LIMIT  := n<COUNT> | u<DATE>
TIMES  := TIME ['>' TIME | '>' '+' N ('h'|'m')]
WD     := mo | tu | we | th | fr | sa | su
```

MODE is `d` when the text has date information only, `t` for time only, `dt` for both. A recurrence with a time is `dt`. `x` means no date or time.

Partial input: the output is the parse of the committed part of the text, or `x` if there is none. `oct 2 t` gives `d 10-02`. `every tu` gives `d R w/1 tu`. `to` alone gives `x`.

## Examples

| Input | Output |
|---|---|
| oct 2 to oct 5 | `d 10-02>10-05` |
| last friday | `d fr-1` |
| every other sunday | `d R w/2 su` |
| 4 to 4:30 | `t 4?>4:30?` |
| tomorrow at 3pm | `dt +1d 15:00` |
| next monday 9am to 5pm | `dt mo+1 09:00>17:00` |
| dec 25 | `d 12-25` |
| in 2 weeks | `d +2w` |
| every weekday at 9 | `dt R d/1 mo,tu,we,th,fr 9?` |
| first monday of march | `d mo#1@03` |
| monthly on the 15th | `d R m/1 d15` |
| from 2pm tomorrow to 4pm friday | `dt +1d 14:00>fr 16:00` |
| march 3 2027 | `d 2027-03-03` |
| noon | `t 12:00` |
| next week | `d W+1` |
| october | `d M@10` |
| every other friday until dec 31 | `d R w/2 fr u12-31` |
| every day for 2 weeks | `d R d/1 n14` |
| jan 5 at 7pm | `dt 01-05 19:00` |
| asdf | `x` |

Canonical form: weekday lists inside a recurrence are ordered `mo,tu,we,th,fr,sa,su`. Recurrence tokens are ordered: frequency, days or nth weekday or month days or year day, count, until, time, start.

Input preprocessing: the engine input is the typed text lowercased with whitespace collapsed. The component does this before calling the engine.

## Resolver policy (defaults, configurable)

- `?` hours: 7-11 are AM, 12 is noon, 1-6 are PM. In a range the end inherits the start meridiem unless that makes end <= start, then it flips. The result is flagged `ambiguous`.
- `WD+1` is the first such weekday strictly after today. Whether "next friday" means `fr+1` or skips a week is decided by the generator policy: `next <wd>` gives `WD+1`, `this <wd>` and bare `<wd>` give `WD`.
- `MM-DD` with no year: nearest occurrence on or after today.
- Week start: Sunday by default.
- Month and year offsets clamp to the end of the month.
- Recurrence start: first match on or after today unless `s<DATE>` is given.
- Time zone: floating wall-clock time. The resolver attaches the user zone.

## v2 additions (adopted 2026-11-03)

v2 is a superset of v1: every v1 line keeps its meaning.

```
RANGE  := PT '>' PT | PT '>'            open end ("after 2pm")
        | '>' PT                         open start ("before noon")
        | PT '>' '+' N ('h'|'m')        duration end ("3pm for 2 hours"); start must have a time
DATE   += 'D@' DD                        day of month only ("the 15th"); DD is 1-31
```

| Input | Output | Meaning |
|---|---|---|
| after 2pm | `t 14:00>` | from 14:00, no end |
| before noon | `t >12:00` | until 12:00, no start |
| after oct 5 | `d 10-05>` | from Oct 5, no end |
| until friday | `d >fr` | until the next Friday |
| the 15th | `d D@15` | next 15th on or after today |
| 3pm for 2 hours | `t 15:00>+2h` | 15:00 to 17:00 |
| tomorrow 9am for 90 min | `dt +1d 09:00>+90m` | 09:00 to 10:30 |

Rules:
- `+Nh` and `+Nm` are only valid as the end of a range whose start has a time. N is 1-48 for hours and 1-1440 for minutes. An unknown meridiem start (`3?`) resolves with the usual rule, then the offset is added. An end that passes midnight moves the end date to the next day.
- Open ranges resolve to an object with one side missing and `open: "start"` or `open: "end"`.
- `D@DD` resolves to the first date on or after today whose day of month is DD. Months with fewer days are skipped (`D@31` in April gives May 31).
- Not in v2: week-of, quarters, fuzzy parts of months, last day of the year.

## Label policy decisions (adopted 2026-11-03)

| Class | Decision |
|---|---|
| Weekday range alone (`mon-fri`, `monday to friday`) | A date range `mo>fr` (end resolves on or after the start). A recurrence needs a cue: every, each, weekly, daily, weekdays, a limit. |
| `every 2nd <weekday>`, `every second <weekday>` | Every other week: `R w/2 <wd>`. Monthly nth is written `2nd <weekday> of every month`. |
| `D Mon NN` (month-name date followed by a bare 2-digit number) | Excluded from eval and training: ambiguous between a year and an hour. With four digits it is a year; with am/pm or a colon it is a time. |
| `ten to seven`, `five of nine` (minute word, `to` or `of`, then an hour with no am/pm) | A time (`6:50?`, `8:55?`). With am/pm or a colon on either side it is a range. |
| Start hour before `noon` (`10 to noon`, `9 till noon`) | Start meridiem unknown: `10?>12:00`. |
| Messages with two times (`depart 9am return 5pm`) | A range only if a cue word joins them (`to`, `until`, `-`, `through`, `return`). Otherwise label the first time. |
| Several dates in one message | The first date is the label. |
| Invalid dates | `x`. |

Rows in the first, third, fourth and fifth classes that the old data labels the other way are removed from eval (`policy_flags` in `training/src/typedate/evalsets.py`) and from heuristic training data.

## v2 additions, part B (adopted 2026-11-03)

Added after the coverage review in `specs/research/coverage-taxonomy.md`. Superset of part A.

| Feature | Form | Example input | Output | Meaning |
|---|---|---|---|---|
| Date list | `DATE(,DATE)*` with an optional shared time | "oct 2, oct 9 and oct 16" | `d 10-02,10-09,10-16` | three dates, each a single day |
| | | "oct 2 and 9 at 3pm" | `dt 10-02,10-09 15:00` | two dates, same time |
| | | "last 3 fridays" | `d fr-1,fr-2,fr-3` | three past Fridays |
| | | "the 1st and 15th" | `d D@1,D@15` | next 1st and next 15th |
| Past marker | suffix `<` on `MM-DD`, bare `WD`, `M@MM` | "since october" (bound) | `M@10<` | the most recent occurrence on or before today |
| Period bounds | `s` and `u` accept a period token. `s` uses its first day, `u` its last day | "tuesdays in march" | `d R w/1 tu uM@03 sM@03` | |
| | | "weekends since october" | `d R w/1 sa,su u+0d sM@10<` | |
| | | "fridays this month" | `d R w/1 fr uM+0 sM+0` | |
| | | "weekdays next week" | `d R d/1 mo,tu,we,th,fr uW+1 sW+1` | |
| Month filter (repeats every year) | `M@MM(,M@MM)*` token inside a recurrence, after the day spec | "weekdays every august" | `d R d/1 mo,tu,we,th,fr M@08` | every weekday in August, every year |
| | | "mondays in june and july, every year" | `d R w/1 mo M@06,M@07` | |
| Rolling window bound | `s` and `u` accept offsets | "M/T/W over the past 6 weeks" | `d R w/1 mo,tu,we u+0d s-6w` | |
| | | "fridays for the next 3 months" | `d R w/1 fr u+3m s+0d` | |
| Nth list | `WD#K(,WD#K)*` in a monthly recurrence | "first and third tuesday of every month" | `d R m/1 tu#1,tu#3` | |
| Quarter | `Q+N`, `Q-N`, `Q@N` (N 1-4); a period like `W`, `M`, `Y` | "this quarter", "Q3" | `d Q+0`, `d Q@3` | whole quarter as a range |
| Anchored offset | `DATE~(+|-)N(d|w|m|y|b)` | "3 days before oct 15" | `d 10-15~-3d` | |
| | | "2 days after xmas" | `d 12-25~+2d` | |
| Business days | unit `b` in offsets and anchored offsets | "next business day", "3 working days from now" | `d +1b`, `d +3b` | weekdays only (no holidays) |
| Period as range end | a period as the end point of a range means its last day; as the start, its first day | "rest of the month" | `d +0d>M+0` | already true in the resolver |

Rules:
- "in August" or "this March" (one specific period) is a period bound (`sM@08 uM@08`). "every August", "each June", "every year in march" (repeats every year) is a month filter (`M@08`). A recurrence with a month filter and no `u` bound continues indefinitely.
- Canonical recurrence token order is now: frequency, days or nth list or month days or year day, month filter, count, until, time, start.
- A list element is a single day: periods (`W+1`), ranges and recurrences are not allowed inside a list. Lists have 2 to 31 items. A shared time may follow the list.
- `<` resolves the date on or before today (today counts). It is only valid on the forms listed.
- A recurrence `s` bound is the first day of the period, `u` bound is the last day. When `u` is in the past, the recurrence lists only past dates.
- Anchored offsets apply the offset to the resolved anchor date. The anchor is any DATE form that resolves to one day.
- `b` offsets skip Saturdays and Sundays. Resolver option `businessDays` may later support holidays.

Not supported (label `x`): frequency without days ("twice a week"), fuzzy spans ("summer", "christmas week"), minute or hour offsets from now, last business day of a month, halves of a month, nth week of a month.

Additional v2 rules (from labeling feedback):
- `D@DD` is always two digits (`D@04`, `D@15`).
- A recurrence time may end with a duration: `dt R d/1 09:30>+15m` ("standup every day 9:30 for 15 min"). In the grammar, the recurrence `TIMES` token is `TIME ['>' TIME | '>' '+' N ('h'|'m')]`.
- An open start may carry a date and a time: `dt >+0d 21:00` ("by 9pm tonight").

Canonical order inside a recurrence (serializer output): frequency, days or nth list or month days or year day, month filter, count, until (`u`), time, start (`s`). The parser accepts any order; labels are canonicalized when stored. Examples above use this order (until before start).

## Resolver notes for v2 (implementation, `packages/core`)

- `Resolved.open` is `"start"` or `"end"` for one-sided ranges (`kind` is `"range"`, the missing side is absent). `durationMin` is set for `PT>+N` ranges and for none else. `endNextDay: true` marks a time-only duration whose end is on a later day (any number of days; `end.date` stays absent). Date lists use `kind: "list"` with `dates` and optional `time`. A recurrence with an `s` bound has `recurrence.from`. A month filter gives `recurrence.months`. An nth list gives `recurrence.nths` (`nth` holds the first).
- In a range end, `+Nm` after a date-only start (`d 10-05>+1m`) is still a month offset. In `t` and `dt` it is minutes, and an invalid N is `x`.
- `+0b` is today on a weekday and the next Monday on a weekend. From a weekend, `+1b` is the next Monday and `-1b` the previous Friday.
- `<` uses today, not the range start, as its reference.
- Date lists drop duplicate dates after resolving.

## Range end that repeats the start date (decided 2026-11-04)

When the text states the end date again, the label writes it: "today 4PM to today 5:15PM" is `dt +0d 16:00>+0d 17:15`. When the text gives only an end time ("mon 4pm to 5pm"), the end omits the date: `dt mo 16:00>17:00`. Both forms resolve to the same dates; the rule only fixes the exact-match string. Three `web4` pool rows were relabeled to follow this. No e7 row is affected.

## Day of a relative month (added 2026-11-04)

`D13@M-1` is the 13th of last month, `D01@M+1` the 1st of next month, `D15@M+0` the 15th of this month. The day is two digits in canonical form; the parser also accepts one digit. If the target month has no such day (`D31@M-1` in May), the line resolves to `x`. Phrases: "13th of last month", "the 15th of next month", "last month on the 3rd", "the 1st of this month". Year offsets ("the 15th of next year") are not covered.
