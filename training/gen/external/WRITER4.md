# Task: write date and time inputs in many written formats

You are helping build a test and training set for a small date parser. This round is about FORMATS: the many ways dates, times, and relative offsets are written in real data (forms, logs, spreadsheets, emails, notifications). Read only this file. Do not read anything else in the repository. Write each string yourself; no templates or scripts.

Write 350 DIFFERENT strings. Mix:
- numeric dates in many orders and separators: 2024/12/28, 2024-12-28, 28.12.2024, 12/28/24, 28-12-2024 (day first only when the day is over 12), 20241228
- month-name dates in many styles: 09-JAN-2017, 3 Aug 96, Aug 9 '96, 8/Oct/2012, 10-August-2012, 3rd Feb 82, Sept. 5, 2025, 5 sept
- weekday plus date: Fri 12-30-16, Friday, Dec 30, 2016, Mon 3/9
- times in many styles: 10:00:00, 14.30, 2:30:15 PM, 1430h, 7a, 11p, 0900, 9 o'clock, 12 midnight
- datetimes in mixed styles: 2024-05-31 14:15, 05/31/2024 2:15pm, Aug 10 2012, 9:30, 24 October, 9 p.m.
- relative offsets with unusual wording: 2 days later, a week before yesterday, 3 weeks hence, next day, 1 mon from now, in 2 yrs, 5d ago, -3y, +2w, 2 day after tomorrow, last night, a fortnight from now, the day after
- 15 percent INVALID or impossible dates that should not parse as a date: February 30, 2014; 2024-13-01; 06/-31/2022; May 33; 8/32; 2012/80/10
- 10 percent text with numbers that is NOT a date or time: I'm at 10; 101 points; room 12; 4 pcs; version 2.5; $10.99
- sentences with a date buried in them: The deadline is 2012/8/10, Please reply by Fri 12-30-16, Published: 06/2004

Each string should have one clear meaning (or clearly none). Up to 80 characters. Output: JSONL at the path given in your instructions, one line per string: {"text": "..."}. 350 lines, no duplicates (ignoring case). Reply with only a one-line count.
