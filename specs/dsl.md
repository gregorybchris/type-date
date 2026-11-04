# DSL v2 (superset of v1)

The model emits one line of text. A deterministic resolver (`packages/core`) turns it into dates. The model never computes calendar dates. Rationale: `specs/research/background/output-format.md`.

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
TIME   := HH:MM                                 24h, known
        | H[:MM]'?'                             hour 1-12, am/pm unknown
REC    := 'R' ' ' F '/' N [' ' DAYS] [' ' LIMIT] [' ' TIMES] [' ' 's' DATE]
F      := d | w | m | y
DAYS   := WD(','WD)* | dNN | dNN(','dNN)* | WD '#' K       (dNN: day of month, d-1 is last)
LIMIT  := n<COUNT> | u<DATE>
TIMES  := TIME ['>' TIME]
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

Input preprocessing: the model input is the typed text lowercased with whitespace collapsed. The component does this before calling the model.

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
