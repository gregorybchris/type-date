# Web sources, batch 2: open-source parser test suites and docs

Output: `training/gen/external/web-2.jsonl`, 4,282 unique phrases (case-insensitive dedupe, at most 90 characters each, kept as written). All extracted by regex from raw GitHub files; no pages needed a login. Phrases are for evaluation only. Order of dedupe is the order in the table, so a phrase shared by two sources is credited to the first.

## Sources used

| Source | URL | Covers | License | Phrases |
|---|---|---|---|---|
| Duckling Time EN corpus (positive examples only) | https://raw.githubusercontent.com/facebook/duckling/main/Duckling/Time/EN/Corpus.hs | clocks, ranges, holidays (incl. Hindu, Jewish, Sikh), quarters, "nth last", EOD/EOM/EOY, dayparts | BSD-3-Clause | 949 |
| Duckling Duration EN corpus | https://raw.githubusercontent.com/facebook/duckling/main/Duckling/Duration/EN/Corpus.hs | durations ("1\"", "2'", "fortnight") | BSD-3-Clause | 73 |
| Microsoft Recognizers-Text, English DateTime specs (DateTimeModel 870, DatePeriodParser 165, DateParser 118, DateTimePeriodParser 74, TimeParser 67, SetParser 17), matched "Text" of each result | https://raw.githubusercontent.com/microsoft/Recognizers-Text/master/Specs/DateTime/English/ (files above) | spoken numbers, periods, sets, business days, "between X and Y" | MIT | 1,311 |
| Ruby Chronic tests (test_parsing.rb) and README | https://raw.githubusercontent.com/mojombo/chronic/master/test/test_parsing.rb ; .../README.md | misspellings, abbreviations, "3rd wednesday in november", "7 hours before tomorrow at noon" | MIT | 271 + 59 |
| recurrent (Python) test.py and README | https://raw.githubusercontent.com/kvh/recurrent/master/src/recurrent/test.py | recurrences, exceptions, counts | MIT | 258 + 3 |
| Natty tests (DateTest, DateTimeTest, TimeTest, RecurrenceTest, SearchTest) and cpan.txt | https://github.com/joestelmach/natty/tree/master/src/test | formats, sentences with embedded dates, Date::Manip-style list | BSD-3-Clause | 146 + 198 |
| dateparser tests (English-only subset) and README | https://raw.githubusercontent.com/scrapinghub/dateparser/master/tests/test_date_parser.py ; .../test_freshness_date_parser.py ; README.rst | numeric and textual formats, freshness ("1 decade 2 years", "now - 1hour") | BSD-3-Clause | 234 + 166 + 13 |
| timefhuman cases, tests, README | https://raw.githubusercontent.com/alvinwan/timefhuman/master/datasets/cases/short.py | "7/17 4 or 5 PM", "3p -4p PDT", multiple choices | MIT | 134 + 12 |
| python-dateutil parser tests | https://raw.githubusercontent.com/dateutil/dateutil/master/tests/test_parser.py | odd absolute formats ("13NOV2017", "5.6m") | Apache-2.0/BSD | 117 |
| Go `when` tests | https://github.com/olebedev/when/tree/master/rules/en | short sentences with deadlines | MIT | 104 |
| cRonstrue tests and README (English output of cron) | https://raw.githubusercontent.com/bradymholt/cRonstrue/main/test/cronstrue.ts | machine-written schedule English | MIT | 78 + 4 |
| chrono-english (Rust) lib.rs doc tests and README | https://raw.githubusercontent.com/stevedonovan/chrono-english/master/src/lib.rs | UK/US dialect examples, "2d 03:00", "-3h" | MIT | 40 + 10 |
| Sugar.js date tests | https://raw.githubusercontent.com/andrewplummer/Sugar/master/test/tests/date.js | "the beginning of last week", "223 milliseconds ago" | MIT | 41 |
| Datejs README | https://raw.githubusercontent.com/datejs/Datejs/master/README.md | "t + 5d", "- 3months", "last Tues" | MIT | 23 |
| Luxon formatting docs (en_US outputs) | https://raw.githubusercontent.com/moment/luxon/master/docs/formatting.md | formatted date strings people also type | MIT | 18 |
| rrule.js nlp tests and README | https://raw.githubusercontent.com/jkbrzt/rrule/master/test/nlp.test.ts | "Every month on the 3rd last Tuesday" | BSD-3-Clause | 17 + 1 |

## Kinds of variation seen

- Spoken-number clock and date forms: "ten thirty", "a quarter past 3pm", "half past eight", "fifteen thirty p m", "nineteen ninety six", "january first 12". Often with odd spacing ("seven p . m .").
- Format noise: dotted times "8.10 pm", "11h45", "19h30", "0700h", "330 p.m.", "1045pm", 2-digit and 6-digit dates, "13NOV2017", "26. 10.21", ISO with zone.
- Typos and abbreviations: "satterday", "wenns", "tus", "tmrw", "tonite", "this qtr", "yr", "hrs", "15 hr".
- Relative arithmetic: "now - 1hour", "t + 5d", "+1year", "-3h", "2d 03:00", "1 year, 1 month, 1 week, 1 day, 1 hour and 1 minute ago", decimals "1.5 days".
- Anchored relatives: "7 hours before tomorrow at noon", "thanksgiving 3 months ago", "1 year ago tomorrow", "less than 3 days after tomorrow".
- Ranges: "from 3 in the morning until 5pm", "between May 2015 and 2018 June", "2018-09-23 1p.m. to 4", "7/17-7/18", "tomorrow in between 1-2:30 ish".
- Recurrence text: "daily except on June 23rd and July 4th", "once a year on the fourth thursday in november", "fridays 3x", cron English ("At 14:23, on the second Sunday of the month").
- Sentences with a date buried in them (Natty search tests, `when` tests, timefhuman).

## New families or constructions the taxonomy lacks

1. Clock times spoken as words or "to/past": "a quarter past 3pm", "half past eight", "10 to 8" (Chronic), "ten ten". https://raw.githubusercontent.com/facebook/duckling/main/Duckling/Time/EN/Corpus.hs ; .../mojombo/chronic/master/README.md
2. Business-calendar abbreviations and fiscal bounds: "by EOD", "by the EOM", "EOY", "BOY", "this qtr", "third quarter". Duckling URL above.
3. Fuzzy or approximate qualifiers: "around next tuesday", "at about 3pm", "3pm approximately", "tomorrow in between 1-2:30 ish". Duckling URL above.
4. Decades and centuries: "the 70s", "the 1970s", "the nineties", "the noughties", "last century", "1 decade 2 years". Microsoft DatePeriodParser.json; dateparser freshness tests.
5. Counted-from-the-end and ordinal-of-period: "fifth last day of May", "the third last week of 2018", "40th day of 2020", "4th day last week". Duckling URL; recurrent test.py.
6. Exceptions and repeat counts on a schedule (partly G in the taxonomy, but with dates): "every monday except for the 2nd monday in March", "daily except in June", "fridays twice", "fridays 3x", "every other friday for 5 times". https://github.com/kvh/recurrent/blob/master/src/recurrent/test.py
7. Compact arithmetic offsets and unit shorthand: "t + 5d", "now - 1hour", "-3h", "2y ago", "10d", "1d ago". Datejs README; chrono-english lib.rs; dateparser freshness tests.
8. Religious and regional holidays by name with year: "diwali 2019", "purim", "vesak", "eid al fitr", "guru gobind singh jayanti", "maattu pongal 2018", "jubilee day". Duckling URL; Microsoft DatePeriodParser.json.
9. Meal and event dayparts as anchors: "after lunch", "before lunch", "around dinner", "after school", "at lunchtime". Duckling and Microsoft TimeParser.json.
10. Open-ended bounds: "3 pm or later", "2018 or later", "year greater than 2012", "less than 3 days after tomorrow", "since late july". Microsoft DateTimeModel.json.
11. Lists of alternatives for one slot (choice, not a set): "7/17 4 or 5 PM", "tomorrow at 9 or Thursday at 10 am", "1 or 2 days". https://raw.githubusercontent.com/alvinwan/timefhuman/master/datasets/cases/short.py ; Natty SearchTest.java.
12. Nth weekday-of-month relative to another period: "3rd thursday this september", "the third Wednesday of previous month", "1st week of oct. on friday". Chronic README; Microsoft.
13. Duration phrases as the answer to "when": "for the past 40 minutes", "1 fortnight 3 days", "30-40 mins". timefhuman cases; dateparser freshness.
14. Machine-written schedule English from cron: "Every minute, July through September", "At 11:00 PM, Monday through Friday". cRonstrue test.
15. Time zones attached to ranges: "3p -4p PDT", "10:30 PM EST". timefhuman; Datejs.

## Found but not used (or only partly)

- chrono-node and parsedatetime tests: excluded by instruction.
- Natty live docs (http://natty.joestelmach.com/doc.jsp): server error; used its Java tests instead.
- dateparser tests are multilingual: kept only phrases whose words are all English date vocabulary (dropped Spanish, French, German, Russian, etc.). dateparser_search.py not extracted (long prose paragraphs).
- python-dateutil `examples.rst` and rrule.js README: mostly RFC rrule code, not phrases; Moment format tests: format tokens, not typed phrases.
- recurrent README and python-dateutil fuzzy examples: very few usable strings.
- Microsoft specs include many multi-language folders; only English was used. Negative corpora (Duckling negativeCorpus, latentCorpus, diffCorpus) were left out because they are not date phrases.
- `when` common (slash) tests, chrono-english `tests/`, Datejs full test suite: files were 404 or not fetched.
- Some Microsoft "Text" values are fragments ("the thirty", "year greater than 2012") that the spec marks as matches; treat labels with care. Natty's cpan.txt is a Date::Manip-style list and its license is inherited from the Natty repo.
