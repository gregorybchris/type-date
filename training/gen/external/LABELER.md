# Task: label what people typed with a date/time DSL

Input file: a JSONL file of strings people typed into a "when?" box ({"id","text"} per line; path in your instructions). For each string write the DSL line that captures its meaning. Read ONLY `specs/dsl.md` in the repository (the DSL definition and examples) and this file. Do not read anything else in the repository, and do not look at any predictions from other systems. Do not write a script that guesses labels: decide each one yourself.

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
- If the text has no clear single meaning in the DSL, write `x` and add a field "unsure": true.

Check your work: put your output file in its own empty directory and run
`cd /Users/chris/Documents/Code/Projects/Current/type-date/packages/core && pnpm exec tsx scripts/validate-data.ts <that directory>`
Every line must parse and round trip (exit code 0). Fix any reported line.

Output: a JSONL file at the path given in your instructions, one line per input line, same order, fields: {"id": "...", "text": "...", "dsl": "...", optional "unsure": true}. Reply with only a one-line count and how many are marked unsure.
