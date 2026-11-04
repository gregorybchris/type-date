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
        | WD#K@M(+|-)N                           Kth weekday of the month N months from this one (h9)
        | b#K@M(+|-)N                           Kth business day (Mon-Fri) of that month, K=-1 last (h9)
        | WD'&D'DD                             first weekday WD on or after today that is also day DD of its month (h9)
        | W(+|-)N | M(+|-)N | Y(+|-)N           whole week / month / year relative to now. Expands to a range
        | M@MM | Y@YYYY                         whole named month (nearest on or after today) / whole year
        | DDD@M±N                               day DD of the month N months from this one (`D13@M-1` is the 13th of last month). The month lacks the day: `x`
        | E(+|-)N | E@YYYY(+|-)N                Easter Sunday plus N days (`E-2` Good Friday, `E+1` Easter Monday), nearest on or after today / in year YYYY (h11)
        | WD@W(+|-)N                            weekday inside the week N weeks from this one (`tu@W+1` is Tuesday of next week) (h11)
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

## Nth weekday of a relative month, weekday with a day of month (added 2026-11-04, h9)

Three small forms, all single days. They are valid wherever a single day is (ranges, lists, anchors, `s` and `u` bounds).

| Form | Input | Output | Resolves (today 2026-11-04) |
|---|---|---|---|
| `WD#K@M±N` | "last friday of the month", "last friday of this month" | `d fr#-1@M+0` | 2026-11-27 |
| | "the first monday of next month" | `d mo#1@M+1` | 2026-12-07 |
| | "second tuesday of last month" | `d tu#2@M-1` | 2026-10-13 |
| `b#K@M±N` | "the last weekday of the month", "last business day of this month" | `d b#-1@M+0` | 2026-11-30 |
| | "first business day of next month" | `d b#1@M+1` | 2026-12-01 |
| `WD&DNN` | "next friday the 13th", "friday the 13th" | `d fr&D13` | 2026-11-13 |
| | "the next tuesday the 1st", "first sunday that is the 7th" | `d tu&D01`, `d su&D07` | 2026-12-01, 2027-02-07 |

Rules:
- `WD#K@M±N` is the same as `WD#K@MM` (a named month) except the month is `N` months from the current one. `K` is -1 (last) or 1-5. If the month has no such weekday (`fr#5@M+0` in November 2026), the line resolves to `x`, as for `D31@M-1`.
- `b#K@M±N` counts Monday to Friday days only (no holidays). `K` is -1 or 1-23. `K` beyond the month's business days resolves to `x`. Only the relative-month form exists for `b`; `b#K@MM` with a month number is also accepted by the parser and resolves the nearest such month like `WD#K@MM`.
- A recurrence still uses `R m/1 fr#-1` ("last friday of every month"). The single-day form is for "of the month" (this month) without a repeat cue.
- `WD&DNN` is the first date on or after today (in a range end: on or after the start) whose weekday is `WD` and whose day of month is `NN` (`NN`, two digits, 01-31). Months without the day are skipped. It never gives `x` for a valid `NN`. "Next" is not encoded: if today is itself a Friday the 13th, today is the answer. Use the anchored form `fr&D13~...` if a later date is needed.
- Named dates need no new form: "the ides of march" is `d 03-15`, "pi day" is `d 03-14`, "may the fourth" is `d 05-04`. "Next leap day" is `d 02-29`: `MM-DD` already skips years where the date does not exist (2026-11-04 gives 2028-02-29).

Existing forms that cover other requested phrases (no change to the DSL):
- A range end that is a weekday resolves on or after the start: "this weekend through monday" is `d sa>mo` (Saturday to the following Monday).
- A range end that is a day of month resolves on or after the start: "the first of next month until the 15th" is `d D01@M+1>D15@M+1` (or `D01@M+1>D@15`; same dates). Canonical label: explicit `D15@M+1`.
- Recurrence bounded on both sides: "business days from nov 2 to nov 20" is `d R d/1 mo,tu,we,th,fr u11-20 s11-02`.

## Easter-relative dates, weekday inside a relative week (added 2026-11-04, h11)

Two single-day forms. Valid wherever a single day is (ranges, lists, anchors, `s` and `u` bounds).

| Form | Input | Output | Resolves (today 2026-11-04, a Wednesday, week starts Sunday) |
|---|---|---|---|
| `E±N` | "easter", "easter sunday" | `d E+0` | 2027-03-28 |
| | "good friday" | `d E-2` | 2027-03-26 |
| | "easter monday" | `d E+1` | 2027-03-29 |
| | "2 days before easter" | `d E+0~-2d` | 2027-03-26 |
| `E@YYYY±N` | "easter 2027" | the engine writes the date: `d 2027-03-28`. `E@2027+0` is the same day and is accepted | 2027-03-28 |
| `WD@W±N` | "friday of next week" | `d fr@W+1` | 2026-11-13 |
| | "monday of this week" | `d mo@W+0` | 2026-11-02 (earlier this week) |
| | "wednesday of last week" | `d we@W-1` | 2026-10-28 |

Rules:
- `E±N` is the first date on or after today (on or after the range start in a range end) that is Easter Sunday plus N days. N is -70 to 70 (Ash Wednesday `E-46`, Ascension `E+39`, Pentecost `E+49`, Corpus Christi `E+60`). Gregorian Easter (the anonymous algorithm). Orthodox Easter is not covered.
- `WD@W±N` is the day of the week `W±N` (`W+0` this week, `W+1` next week) that has weekday `WD`. The week starts on the resolver week start (Sunday by default), so `fr@W+0` on a Sunday is the Friday of the same week and `mo@W+0` on a Wednesday is a day in the past. `WD+1` ("the first Friday after today") is not the same as `WD@W+1` for weekdays that come after today in this week (on a Wednesday `fr+1` is this Friday, `fr@W+1` is next Friday).
- Compatibility rule for engines: `monday of next week` was labelled `mo+1` before this form. When `WD+1`, `WD` or `WD-1` gives the same day as the new form on the reference date, the h11 engine writes the older form; it writes `WD@W±N` only when the dates differ. Both resolve to the same date.
- "mon to thu next week" is a range `mo+1>th` (end is a bare weekday on or after the start), or `mo@W+1>th` when the old start form would pick another day.

## Named days and moving holidays (h11)

No new forms. The h11 table uses existing ones. Fixed dates are `MM-DD`; moving ones are the nth weekday of a month or `E±N`:

| Day | Form | Day | Form |
|---|---|---|---|
| Thanksgiving (US) | `th#4@11` | Canadian Thanksgiving | `mo#2@10` |
| Labor Day | `mo#1@09` | Memorial Day, Spring bank holiday | `mo#-1@05` |
| MLK Day | `mo#3@01` | Presidents Day, Family Day | `mo#3@02` |
| Columbus / Indigenous Peoples Day | `mo#2@10` | Mother's Day (US) | `su#2@05` |
| Father's Day | `su#3@06` | Victoria Day | `mo#-1@05~-1w` |
| Black Friday | `th#4@11~+1d` | Cyber Monday | `th#4@11~+4d` |
| Election Day | `mo#1@11~+1d` | Early May bank holiday | `mo#1@05` |
| Summer bank holiday | `mo#-1@08` | King's / Queen's Birthday (AU) | `mo#2@06` |
| Civic Holiday | `mo#1@08` | Arbor Day | `fr#-1@04` |
| Melbourne Cup Day | `tu#1@11` | Super Bowl Sunday | `su#1@02` |
| Good Friday, Easter Monday, Palm Sunday, Ash Wednesday, Mardi Gras / Shrove Tuesday, Pentecost | `E-2`, `E+1`, `E-7`, `E-46`, `E-47`, `E+49` | Mothering Sunday | `E-21` |

Fixed days in the table: New Year's Day and Eve, Twelfth Night, Epiphany, Orthodox Christmas, Burns Night, Australia Day, Republic Day (India), Groundhog Day, Waitangi Day, Valentine's, St David's, Pi Day, Ides of March, St Patrick's, April Fools, Tax Day, Earth Day, St George's, Anzac Day, May Day, Star Wars Day, Cinco de Mayo, Flag Day, Juneteenth, Canada Day, Bastille Day, Independence Day, Gandhi Jayanti, Halloween, All Saints, All Souls, Guy Fawkes, Veterans / Remembrance / Armistice Day, Immaculate Conception, Christmas Eve and Day, Boxing Day (also St Stephen's), St Andrew's. Moving lunar holidays (Eid, Diwali, Holi, Lunar New Year, Ramadan, Passover, Hanukkah) stay `x`.

Rules:
- A holiday next to another date is a label, not a date: "independence day 15th august" is `d 08-15`, "memorial day - monday, may 25, 2026" is `d 2026-05-25`. Two holidays or a holiday and a date joined by "to", "until", "through" or "and" are both used.
- A stated year gives the concrete date ("thanksgiving 2027" is `d 2027-11-25`, "easter 2027" is `d 2027-03-28`).
- "every thanksgiving" is `d R m/1 th#4 M@11`; "every christmas" is `d R y/1 12-25`. A recurrence on an Easter-relative day is `x`.
- Fuzzy periods stay `x`: "christmas week", "easter break", "labor day weekend", "spring break".
- Bare "valentines", "presidents", "mlk", "st patricks" (without "day") stay `x` (the labelled data treats them as cut-off words).

## Numeric date order (decided 2026-11-04, h11)

The earlier text did not state an order. The labelled pools decide:

| Format | Policy | Example |
|---|---|---|
| Slashes | Month first (US). Day first when the first number is over 12 and the second is 12 or less | `04/10/2021` is `2021-04-10`, `13/04/2021` is `2021-04-13` |
| Dots | Day first when the first number is over 12 (`13.04.2021` is `2021-04-13`). Otherwise month first, as in the pools (`9.8.2013` is `2013-09-08`, `4.7.2025` is `2025-04-07`; three rows) | |
| Dashes | ISO when year first. `MM-DD-YYYY` month first, `DD-MM-YYYY` when the first number is over 12 | `10-4-21` is `2021-10-04` |
| Two-digit years | 70-99 are 19xx, 00-69 are 20xx | `12/25/99` is `1999-12-25`, `22DEC78` is `1978-12-22` |
| Bare `N-M` with a valid month and day | A date `MM-DD`, except when the first number is 6 or more and below the second, and the second is 12 or less (an hour range such as `6-8`, `9-10`) | `11-03` is `d 11-03` |
| `24/7` | `x` | |
| Machine formats | ISO week date (`2001-W05-3` is `2001-01-31`, `2001-W05` the week as a range), ISO ordinal date (`2001-123`), ISO year-month (`2021-04` is the month as a range), basic ISO date-time (`20211004T101500Z`), Roman-numeral month (`14 III 1879`, `31.xii.99`), syslog and ctime (zone before the year is skipped), `04/Nov/2023:02:15:33`. Seconds, zones and fractions are dropped | |
| 24h clock | `0900 hours`, `1745h`, `08.30 hrs`, `at 10 hours`, spoken `oh seven hundred`, `fourteen hundred`, `eighteen forty five` are known times. A time after an ISO `T` is a known time. A time with leading zero or above 12 is known; `10:15` after a date stays `10:15?` | `1430 hrs` is `t 14:30` |

The suggested policy "dotted dates day-first" was not adopted for ambiguous dates: the pools label 3 rows month first (`web dev 9.8.2013`, `7.1.2004`, `real-fmt dev 4.7.2025`) and none day first.

## Deadline words (decided 2026-11-04, h11)

The pools label "by X", "before X", "until X", "no later than X" both as an open start (`d >12-14`, as in this file) and as the date itself (`d 12-14`). Counts over the open pools without `data/v007` (its rows are repeated copies of a few texts; its 210 "by X" rows are all points) and without the odd lines of the four split pools:

| Construction | open start | the date | Policy |
|---|---|---|---|
| "by X" | 28 | 56 | Open start when the message is short (under 11 words); the date when it is a long message. Rows with 11 or more words: about 30 points and 2 open. Rows with fewer words: 29 open, 21 points. The length rule scores best of thresholds 9 to 12 on the pooled open data. |
| "before X" (deadline sense, not "2 days before X") | 35 | about 6 | Open start (same length rule) |
| "no later than X", "not later than X" | 6 | 2 | Open start, any length |
| "until X", "till X", "through X" with one date | 34 | about 10 | Open start (same length rule); with a recurrence it is the `u` bound |
| "due X" | 1 | 61 | The date (h10 already did this) |
| day of month ("by the 15th" = `D@15`) | 14 | 0 | Open start, any length |
| "by the end of the day", "by the close of business on friday" (spelled out) | 3 | 0 | Open start (`d >+0d`, `d >fr`). The abbreviations "eod" and "cob" are labelled as the date in 6 rows; h11 leaves them to h10 (open) |

Minority-labelled rows (they disagree with the policy; labels were not edited) are listed in `specs/engines/h11.md`.

## Other label decisions made by h11 (2026-11-04)

- Weekday codes written as letters ("MWF 10-10:50", "t/th 2pm", "tu+th 7:15am", "mon wed fri at 7am", "ttH 9am this quarter") are weekly recurrences (`R w/1 tu,th`) when something follows them (time, month, bound). A bare code list ("tu th sa", "T/Th") stays a date list. `T` is Tuesday, `R` is Thursday only in a joined code of three or more letters.
- A bare duration or offset ("2 hours", "10 mins", "thirty minutes early") is `x`: the DSL has no hour or minute offsets.
- Frequency words without days: "daily", "everyday", "nightly", "twice daily" are `d R d/1`; "weekly" `d R w/1`; "monthly" `d R m/1`; "yearly", "annually" `d R y/1`; "afternoons", "night" alone are `x`.
- Part of day before an hour: "night 9" is `t 21:00`, "morning 8" `t 08:00`, "afternoon 12" `t 12:00`. A part-of-day bound: "morning before 11 am" is `t >11:00`, "evening before 9" `t >21:00`.
- Two clock times joined only by "and" ("meet at 4pm and 6pm", "every day at 16:00 and 18:00"): the first time (the existing rule for two times without a cue word).
- A count of occurrences for "every N weeks ... for M weeks" is M/N (`every 2 weeks on monday for 6 weeks` is `n3`).
- "through <month>" in a weekly or daily recurrence is the last day of that month (`u06-30`); "until <month>" stays `uM@06`.
- Spoken years and day numbers: "nineteen ninety nine" is `d Y@1999`, "two thousand and five" `d Y@2005`.
- A correction word ("no", "actually", "i mean", "sorry", "make that") replaces the part it corrects: "uh tuesday no wednesday at ten" is `dt we 10?`.
- "friday week", "monday fortnight", "a week on friday" are `fr~+1w`, `mo~+2w`.
