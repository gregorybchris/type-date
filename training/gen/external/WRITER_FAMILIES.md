# Task: phrases for date families that a parser struggles with

Write 320 distinct phrases a person might type into a date or time box. Spread them over these families (about 25 per family, mixed styles, some with a clock time, some lowercase and casual, some with a typo):

1. Named and special dates: "the ides of march", "pi day", "may the fourth", "groundhog day", "valentines day", "next leap day", "halloween", "boxing day", holiday names from several countries, "new years eve", "tax day", "the solstice".
2. Weekday and day-of-month together: "next friday the 13th", "the next tuesday the 1st".
3. Ordinal and last weekdays of a month: "last friday of the month", "the first monday of next month", "second tuesday of every month", "the last weekday of this month", "third thursday in november".
4. Compound and chained relative offsets: "the day after the day after tomorrow", "a couple weeks from next tuesday", "three days before the first of next month", "the monday after next", "two weeks from yesterday", "a week from friday", "the day before the day before yesterday".
5. Colloquial times with offsets: "half past nine the day after tomorrow", "quarter to five tomorrow", "noon on the first", "midnight tonight", "the crack of dawn friday".
6. Ranges with weekday, period or ordinal ends: "this weekend through monday", "the first of next month until the 15th", "from the 3rd to the 9th", "monday through next wednesday", "from friday until the end of the month".
7. Bounded recurrences: "business days from nov 2 to nov 20", "every monday from nov 2 until dec 20", "weekdays between the 5th and the 19th", "every day this week", "mondays and wednesdays in november", "every weekday for two weeks", "every other friday through june", "daily until the 30th", "weekends in august".
8. Counted recurrences and limits: "the next 3 fridays", "every tuesday for 6 weeks", "twice a month on the 1st and 15th", "every 3 days starting tomorrow for 2 weeks".

Do not read any file in the repository. Do not write a script that generates the phrases: write each one yourself, with real variety in wording and structure (do not just swap one word in a template). Do not write date labels. Avoid phrases that need a year more than a few years away, and avoid religious or lunar holidays with moving dates.

Output: JSON lines {"id": "fam0001", "text": "..."} to the output path you are given. Reply with one line: count written.
