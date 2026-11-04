# Task: label what people typed with a date/time DSL

Input file: a JSONL file of strings people typed into a "when?" box ({"id","text"} per line; path in your instructions). For each string write the DSL line that captures its meaning. Read ONLY `specs/dsl.md` in the repository (the DSL definition, the v2 additions section, and the label policy decisions section: they override anything above them) and this file. Do not read anything else in the repository, and do not look at any predictions from other systems. Do not write a script that guesses labels: decide each one yourself.

Policy (follow exactly, these decide ambiguous cases):
- Month/day order is US: 10/2 is October 2.
- Weekday: "friday", "this friday", "on friday" -> `fr`. "next friday" -> `fr+1`. "last friday", "previous friday" -> `fr-1`.
- Times with am/pm, "noon", "midnight", dayparts ("3 in the afternoon") and 24h clock times (15:00, 0900) are known: `HH:MM` ("4pm" -> `16:00`). A time with no am/pm and no daypart ("4", "4:30", "at 7") keeps an unknown meridiem: `4?`, `4:30?`, `7?` (minutes shown only when non-zero). "half past two" -> `2:30?`, "quarter to four" -> `3:45?`, "ten past one" -> `1:10?`. A range with only one meridiem ("2-4pm", "9am-5") makes both ends known (`14:00>16:00`; "9am-5" -> `09:00>5?`... read the DSL doc carefully and choose the form that matches it).
- Mode: `d` date only, `t` time only, `dt` both. Recurrence with a time is `dt`.
- "tomorrow morning" or other vague day parts with no clock time: label only the date part (`d +1d`).
- A range end that omits the date or time inherits it from the start.
- If the text is cut off mid-typing, label the committed part that is already a valid parse ("oct 2 t" -> `d 10-02`; "every tu" -> `d R w/1 tu`); if nothing valid yet, `x`.
- Not a date or time (or too ambiguous to give one meaning, such as "fri or sat"): `x`.
- Typos: read through them ("tomorow" is tomorrow).
- Impossible dates are not dates: "February 30", "2024-13-01", "May 33", "8/32", "2012/80/10" -> `x` (not unsure).
- Year-first numerics are absolute dates: "2012/8/10" and "2014-12-28" -> `2012-08-10`, `2014-12-28`. Two-digit years: 00-49 mean 2000-2049, 50-99 mean 1950-1999 ("3 Aug 96" -> `1996-08-03`, "12/28/24" -> `2024-12-28`). A day over 12 first means day first ("28.12.2024" -> `2024-12-28`).
- Seconds in a time are ignored ("10:00:00" -> `10:00`).
- Relative offsets: "2 days later", "3 weeks hence", "in 2 yrs", "next day" (= tomorrow) are future offsets (`+2d`, `+3w`, `+2y`, `+1d`); "ago", "before", "last night" are past. "a week before yesterday" -> `-8d`; "2 day after tomorrow" -> `+3d`. Use d, w, m, y units only; minutes, hours and seconds offsets -> `x` with unsure true.
- Numbers that are not dates or times ("I'm at 10", "room 12", "101 points", "$10.99", "version 2.5") -> `x`.
- DSL v2: "after 2pm" -> `t 14:00>`; "before noon" -> `t >12:00`; "after oct 5" -> `d 10-05>`; "until friday" -> `d >fr`; "the 15th" -> `d D@15`; "3pm for 2 hours" -> `t 15:00>+2h`; "tomorrow 9am for 90 min" -> `dt +1d 09:00>+90m`. Use them whenever the text means exactly that. If the duration or open range has no time to anchor it ("for 2 hours" alone), write `x` and set unsure true.
- Weekday range alone ("mon-fri", "monday to friday") -> `d mo>fr` (a range). A recurrence needs a cue like every, each, weekly, daily, weekdays, until or for.
- "every 2nd wed" -> `R w/2 we`. "ten to seven" (minute word, then to or of, then an hour, with no am/pm) -> `t 6:50?`.
- A month-name date followed by a bare two-digit number ("5 Nov 18", "oct 2 15") is ambiguous: write `x` and set unsure true.
- DSL v2 part B (see specs/dsl.md): "last 3 fridays" -> `d fr-1,fr-2,fr-3`; "next 3 fridays" -> `d fr+1,fr+2,fr+3`; "oct 2, oct 9 and oct 16" -> `d 10-02,10-09,10-16`; "the 1st and 15th" -> `d D@1,D@15`; "oct 2 and 9 at 3pm" -> `dt 10-02,10-09 15:00`; "weekends since october" -> `d R w/1 sa,su sM@10< u+0d`; "tuesdays in march" -> `d R w/1 tu sM@03 uM@03`; "fridays this month" -> `d R w/1 fr sM+0 uM+0`; "weekdays next week" -> `d R d/1 mo,tu,we,th,fr sW+1 uW+1`; "first and third tuesday of every month" -> `d R m/1 tu#1,tu#3`; "this quarter" -> `d Q+0`; "q3" -> `d Q@3`; "3 days before oct 15" -> `d 10-15~-3d`; "2 days after xmas" -> `d 12-25~+2d`; "next business day" -> `d +1b`; "last 30 days" -> `d -30d>+0d`; "rest of the month" -> `d +0d>M+0`; "every day except sunday" -> `d R d/1 mo,tu,we,th,fr,sa`. Frequency without days ("twice a week"), fuzzy spans ("summer"), minutes or hours from now -> `x` with unsure true.
- Recurrence that repeats every year in a month ("weekdays every august", "mondays each june") -> month filter token: `d R d/1 mo,tu,we,th,fr M@08`, `d R w/1 mo M@06`. One specific period ("weekdays in august", "tuesdays this march") -> period bound: `sM@08 uM@08`. Rolling windows: "M/T/W over the past 6 weeks" -> `d R w/1 mo,tu,we s-6w u+0d`; "fridays for the next 3 months" -> `d R w/1 fr s+0d u+3m`. Single-letter weekdays: M=mon, T=tue, W=wed, Th=thu, F=fri, Sa=sat, Su=sun; a lone T followed by Th means tuesday.
- If the text has no clear single meaning in the DSL, write `x` and add a field "unsure": true.

Check your work: put your output file in its own empty directory and run
`cd /Users/chris/Documents/Code/Projects/Current/type-date/packages/core && pnpm exec tsx scripts/validate-data.ts <that directory>`
Every line must parse and round trip (exit code 0). Fix any reported line.

Output: a JSONL file at the path given in your instructions, one line per input line, same order, fields: {"id": "...", "text": "...", "dsl": "...", optional "unsure": true}. Reply with only a one-line count and how many are marked unsure.
