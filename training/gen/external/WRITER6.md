# Task: write date-selection inputs for a calendar box, covering many families

You are helping build a test and training set for a small "when?" box in a calendar or scheduling app. People type what dates or times they want. Read only this file; do not read anything else in the repository. IMPORTANT: write every string yourself, one at a time. Do NOT write a script, loop, or template that generates strings. Strings made by templates are rejected.

Write 350 DIFFERENT strings. Use real typing styles (lowercase, typos, abbreviations, filler words, voice dictation, pasted into a sentence). Each string has one clear meaning. Up to 90 characters. About 20 percent of your strings must be NEGATIVE CONTROLS: ordinary inputs near these families that mean something simpler (a plain date, a plain range, a plain recurrence) or are not dates at all ("room 12", "last 3 episodes", "I have 3 fridays off").

Families (your focus list is in your instructions; sprinkle a few of the others):
1. COUNTED OCCURRENCES, past or future: "last 3 fridays", "the next 4 mondays", "past 2 weekends", "next 5 weekdays", "last 3 days", "the previous 3 tuesdays"
2. RECURRENCE INSIDE A PERIOD: "weekends since october", "fridays this month", "tuesdays in march", "weekdays next week", "every monday in 2027", "saturdays until christmas", "mornings this week"
3. RECURRENCE OVER A ROLLING WINDOW: "M/T/W over the past 6 weeks", "fridays for the next 3 months", "every day this past month", "weekdays over the last 2 weeks"
4. RECURRENCE THAT REPEATS EVERY YEAR IN A MONTH: "weekdays every august", "mondays each june", "every year in march on fridays", "weekends every summer month"
5. COMPACT WEEKDAYS: M/T/W/Th/F, MWF, T/Th, TTh, M-F, S/S, "m/w/f 7a", "tu+th"
6. ROLLING WINDOWS AND PERIOD PHRASES: "last 30 days", "next 2 weeks", "past 3 months", "the rest of the month", "rest of this week", "year to date", "this quarter", "q3", "next quarter"
7. EXPLICIT DATE SETS: "oct 2, oct 9 and oct 16", "the 1st and 15th", "jan 5, 6, 7", "mon wed fri next week", "oct 2 and 9 at 3pm", "first and third tuesday of every month"
8. DATES RELATIVE TO ANOTHER DATE: "3 days before oct 15", "2 days after xmas", "a week from oct 5", "the day before thanksgiving", "the monday after next", "two weeks after easter"
9. BUSINESS DAYS: "next business day", "3 working days from now", "5 business days after oct 1", "last business day of the month"
10. EXCEPTIONS: "every day except sunday", "weekdays but not wednesday", "all week except friday", "every day but the 25th"
11. FREQUENCY AND FUZZY SPANS (these have no concrete dates, they will be marked as not supported): "twice a week", "3 times a month", "summer", "christmas week", "spring break"
12. MIXED: combine two things ("fridays at 3pm for the next 6 weeks", "every first monday at 9am until june", "weekends since october at 10am")

Output: JSONL at the path in your instructions, one line per string: {"text": "..."}. No duplicates (ignoring case). Reply with only a one-line count.
