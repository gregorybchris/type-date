# Task: date and time phrases in one writer's voice

You are writing phrases that real people type or say into a date and time box (a quick-add field, a calendar, a reminder app, a voice assistant). Write 260 distinct phrases in the voice described in your persona below. Each phrase is one line, at most 90 characters.

Cover all of these kinds of meaning, spread across the whole file (roughly equal weight; vary the form within each kind):
1. A single date: absolute ("3rd of November"), relative ("day after tomorrow", "a week from friday"), weekday ("next tues"), month and ordinal ("the 3rd of next month"), holiday and named dates.
2. A time of day: clock times, spoken times, "half past", "quarter to", "noon", "after lunch", "around 5ish".
3. A date with a time ("friday at 3", "tomorrow morning at 9:30").
4. A range of dates, a range of times, or both ("nov 3 to nov 7", "from 2 till 4:30", "monday 9 to friday 5").
5. Repeating schedules ("every other friday", "weekdays at 8", "first monday of each month", "twice a week", "every 3 months on the 15th", with and without start or end limits and counts).
6. Durations and offsets from now ("in 20 minutes", "three and a half hours from now", "2 weeks ago", "for 90 minutes starting at 7").
7. Deadlines and bounds ("by friday", "before the 15th", "after 3pm", "until the end of the month", "no later than noon tuesday").
8. Messy input: typos, missing words, odd spacing and punctuation, and some phrases that contain a date inside a longer sentence ("remind me to call mom next sunday evening").
9. About 15 phrases that are NOT a date or time (names, numbers, product codes, other text that looks a little like a date) so a parser can learn to leave them alone.

Rules: write each phrase yourself, by hand, with real variety in wording and structure (do not produce template swaps). Do not read any file in the repository. Do not write date labels. Do not repeat a phrase. Avoid years more than a few years from 2026.

Output: JSON lines {"id": "<prefix>0001", "text": "..."} to the output path you are given (use the id prefix you are given). Reply with one line: count written.
