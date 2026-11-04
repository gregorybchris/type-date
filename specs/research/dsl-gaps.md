# DSL gaps and label-policy decisions

Found while building eval e2 (labeler disagreements) and from the heuristic agent's report (exp-009). Decide with frequency data from the larger realistic set before extending the DSL.

## Inputs the DSL v1 cannot express

Two independent labelers disagreed on these, mostly because one wrote `x` and the other guessed.

| Class | Examples | Notes |
|---|---|---|
| Day of month only | "the 3rd", "on the 30th", "22nd" | Not expressible. Candidate form: `D@15` resolved to the next 15th. |
| Fuzzy parts of a month | "late august", "mid march", "early june", "beginning of 2027" | Could map to whole month `M@08` (labeler 1 did). Ambiguous. |
| Week of | "w/c 16 nov", "wk of nov 9" | A range of the week containing the date. |
| Open ranges | "after 3", "before noon", "sometime after 5" | No open-ended range. |
| Durations | "for 2 hrs", "for 3 days from tomorrow" | `+2h` range end was suggested in output-format.md. |
| Quarters, week phrases | "q1 next year", "friday week", "end of next week" | Rare. |
| Weekday in a list with ranges | "mon-wed next week" | Range of weekdays with a shared relative week. |

## Label-policy ambiguities (decided)

| Class | Decision |
|---|---|
| `H:MM` with no am/pm and hour 10-12 (`11:30`) | Meridiem unknown: `11:30?`. Known only with am/pm, noon, midnight, a daypart word, hour 13 or more, or a leading zero (`09:30`). |
| Bare `12` | `12?`. `noon` and `midday` are `12:00`. |
| Bare hour in a datetime ("next sunday at 9") | Unknown: `9?`. |
| `on <weekday>` alone | A plain date (`fr`), not a recurrence. Recurrence needs every, each, weekly, daily, a plural weekday, or a limit (for N, until). |
| Dotted `7.20` | Ambiguous between date and time. Excluded from eval. Not generated. |
| Single spelled number ("eight") | Excluded from eval as ambiguous. |
| Vague day part with no clock time ("tonight", "this evening", "tomorrow morning") | Date only (`d +0d`, `d +1d`). Labelers were told this. Some wrote `x`, so these rows are often unsure. |

Rows hit by the first, fourth, and fifth classes were removed from e1 to make e2 (rule-based, see `policy_flags` in `training/src/typedate/evalsets.py`). The grammar generator still produces them in training data (v003). Fix it in the next dataset version.
