# Web sources 3: academic, linguistic, notation and style-guide sources

Output: `training/gen/external/web-3.jsonl` (about 645 unique phrases, deduped case-insensitively, 27 sources). Phrases are for evaluation only. Several fetches returned summaries from a small model rather than raw text, so a few items are lightly normalized; see "Caveats".

## Sources used (phrases taken)
- HeidelTime English daterules, EXAMPLE comments (about 119): https://raw.githubusercontent.com/HeidelTime/heideltime/master/resources/english/rules/resources_rules_daterules.txt (GPL-3.0). Historic/BC years, ordinal days, "3 to 6 May", "the year-earlier first quarter", "summer of 69", "Christmas '87", decades, "the mid-90s".
- HeidelTime timerules (33), durationrules (15), setrules (16), intervalrules (11), same directory, GPL-3.0. RFC 822 stamps, "1145EST", "late yesterday evening", "twice a month", "40 times per month", "Monday and Tuesday nights", "between March and May".
- Stanford CoreNLP english.sutime.txt (97) and english.holidays.sutime.txt (about 18): https://github.com/stanfordnlp/CoreNLP/tree/main/src/edu/stanford/nlp/time/rules (GPL-3.0). Literals from rules: "the fifth straight year", "tonite", "10h30", "the ides of March", "Zulu time", "teatime".
- SUTime docs (11): https://stanfordnlp.github.io/CoreNLP/sutime.html. "Every 3rd Wednesday", "Q3 FY 2018", "July to August".
- RFC 5545 iCalendar, RRULE example captions (34): https://www.rfc-editor.org/rfc/rfc5545.txt. Dense recurrence forms.
- Wikipedia (CC BY-SA 4.0), all https://en.wikipedia.org/wiki/<page>: Date_format_by_country (26), Date_and_time_representation_by_country (10), Date_and_time_notation_in_the_United_Kingdom (32), _in_India (3), _in_the_United_States (24), _in_Australia (10), _in_Canada (17), _in_Europe (13), Calendar_date (21), 12-hour_clock (28), ISO_8601 (23), Quarter_days (10), Fiscal_year (14), Daylight_saving_time_by_country (12), Thanksgiving_(United_States) (6), Public_holidays_in_Australia (14), Bank_holiday (8).
- GOV.UK A to Z style guide (21), OGL v3.0: https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/. Includes "do not write" forms (10-11am, 1730hrs, 2nd June).

## Variation seen
Numeric order (DMY/MDY/YMD, ambiguous "01/11/06", "02/11/26"), separators (/ - . space, none), two-digit years and apostrophe years ("31.12.'91", "Christmas '87"), month names and abbreviations with and without periods, ordinals spelled and numeric, weekday-prefixed dates, times as "6.30pm", "18h45", "1145EST", "1800", "ten hundred hours", spoken times ("half four", "fifteen till ten", "quarter to nine"), ranges as "to", en dash, slash, "thru", relative anchors ("year-earlier", "that year"), floating holidays ("Last Monday in May", "Monday closest to 27 May").

## New families not in the taxonomy (verified against specs/research/coverage-taxonomy.md)
1. Floating-holiday rules with an offset or conditional: "1st Monday after or on 27 May", "Monday closest to 27 May", "First Monday in February, or 1 February if the date falls on a Friday", "Friday before last Sunday in March at 02:00" (Wikipedia Public_holidays_in_Australia, Bank_holiday, Daylight_saving_time_by_country).
2. Count-from-end ordinals: "second-to-last Monday of the month", "third-to-the-last day of the month", "The second-to-last weekday of the month", "next-to-last Thursday in the month" (RFC 5545, Thanksgiving page). Taxonomy has "last business day" as x only.
3. Every Nth weekday of the year / numbered-day-of-year: "Every 20th Monday of the year", "Every third year on the 1st, 100th, and 200th day", "1981-095" (RFC 5545, ISO 8601).
4. Pattern-conjunction recurrence: "Every Friday the 13th", "The first Saturday that follows the first Sunday of the month", "Every Thursday, but only during June, July, and August" (RFC 5545).
5. Sub-day recurrence and intervals: "Every 15 minutes for 6 occurrences", "Every hour and a half for 4 occurrences", "Every 20 minutes from 9:00 AM to 4:40 PM every day" (RFC 5545). Taxonomy K covers only offsets.
6. Frequency with explicit count, plus part-of-week in set: "40 times per month", "2 days each week", "Monday and Tuesday nights", "Monday afternoons" (HeidelTime setrules). Taxonomy I is x; these show the shape.
7. Week-based labels and ISO forms: "week ending 19/1", "week of 15/1", "KW 49", "2026-W44", "2009-W01-1", "R5/2008-03-01T13:00:00Z/P1Y2M10DT2H30M", "P1DT12H" (Wikipedia, ISO 8601).
8. Fiscal calendars and period labels: "FY2026/27", "FY 2026–27", "Q3 FY 2018", "Q1 FY2019", "1 July to the next 30 June" (Fiscal_year, SUTime docs). Taxonomy C has quarters only.
9. Historic and traditional dates: "Lady Day", "Michaelmas Day (29 September)", "Martinmas (11 November)", "the ides of March", "190 BC", "the 2nd century BC", "1990s BC", "the 19th century B.C.".
10. Spoken and regional clock forms: "half four" (4:30 UK), "fifteen till ten", "twenty-five to eleven", "five-and-twenty to 9", "6.05 a.m.", "9 in the morning", "10h30", "041200ZFEB23" (military date-time group).
11. Straight/consecutive counting: "the fifth straight year", "the third straight month in a row", "the ninth day consecutively".
12. Quantity-modified spans: "at least the last twenty years", "less than sixty days", "about twenty days later", "a three-year period", "several days".
13. Relative-to-reference-year parts: "the year-earlier first half", "next year's first quarter", "January 19th of that year", "the 2001 third quarter".
14. Date lists/ranges sharing a field: "September 14 and 18, 2010", "May and June 2011", "3 to 6 May 2004", "2007-11-13/15", "2007-11-13T09:00/15T17:00", "1850-58".
15. Midnight/noon ambiguity forms: "12 a.m.", "12 m.", "12:01 a.m.", "midnight Monday", "24:00" (12-hour_clock, timerules).

## Found but not usable
- TempEval-3 (aclanthology S13-2001), SemEval-2018 Task 6 (S18-1011), SCATE paper (L16-1599): PDFs returned as compressed binary, no text extracted.
- TimeML 1.2.1 spec (timeml.org): 404; web.archive.org blocked by the fetch tool.
- SUTime homepage nlp.stanford.edu: connection refused (used the CoreNLP GitHub pages instead).
- HeidelTime normalization/holiday resource files and repattern files (reHolidayFix/Var): URLs guessed and 404 or contents not shown; only the directory listing was obtained.
- Anafora-annotations README (SCATE data): no examples inline; TimeBank, WikiWars, Tweets TIMEX data not fetched (no raw text pages found in reasonable time).
- Australian Style Manual dates page: timed out. Style guides for US (Chicago/AP) and India are paywalled or not fetched.
- RFC 5545 lines 195000-220000 not read; the Wikipedia "Week" and "Bi-weekly" pages gave little.

## Caveats
This cluster is rule-file and reference text, not typed user input: few typos, little informal casing. Some tool outputs were summaries by a small model; items are believed verbatim except: the SUTime holiday list came from patterns with punctuation stripped (a few apostrophe entries were dropped for that reason, others such as "Labour Day" are as shown), "Midsummer Day (24 June)" and "Whitsunday (15 May)" are abbreviated from longer parenthetical text, and iCal captions had trailing colons removed. HeidelTime and SUTime items are GPL-3.0 rule-file contents; treat the license as unclear for redistribution and use for evaluation only. The three negative-example phrases (as soon as, 2000 soldiers, 2000 kilometer) and "in his 20s" are included as non-date or hard-negative controls.
