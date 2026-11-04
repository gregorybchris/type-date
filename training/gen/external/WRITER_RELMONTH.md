# Task: phrases that name a day of a relative month

Write 240 distinct phrases that a person might type into a date box to name one day (optionally with a time) of the previous, current, or next month, or of a month a few months away. Examples of the idea (do not copy them): "13th of last month", "the 1st of next month", "on the 22nd of this month at 9am".

Cover a wide spread:
- Months: last month, this month, next month, previous month, the month before last, two months from now, in 3 months, a month ago.
- Day forms: ordinals (13th, 3rd), plain numbers ("13 of last month"), words ("the thirteenth"), "the 13th day of last month", first and last words are allowed only for numbered days (no "last day of").
- Word order: "last month on the 13th", "the 13th last month", "13th, last month", "on the 13th of next month", "next month the 5th".
- Times: with a clock time sometimes (at 3pm, 14:30, noon), mostly without.
- Register and noise: casual, formal, lowercase, missing "the", typos in 15 phrases, abbreviations (mth, mo), "of" or "in".
- Days 1 to 31. Include about 10 phrases with day 29, 30 or 31 where the target month may not have that day.
- About 20 phrases that are NOT this family but look similar (for example "last month", "the 13th", "13th of March", "every month on the 13th", "the 13th of next year"), spread through the file.
Do not read any file in the repository. Do not write a script that generates the phrases: write them yourself. Do not write date labels.

Output: JSON lines {"id": "rm0001", "text": "..."} to the output path you are given. Reply with one line: count written.
