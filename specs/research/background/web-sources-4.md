# Web research note 4: real user inputs and failed phrases

Output: `training/gen/external/web-4.jsonl` (2,686 unique phrases, deduped case-insensitively, each at most 90 characters, kept as written in the source). Evaluation use only.

How it was collected: raw test files and README/doc pages were fetched from GitHub (raw.githubusercontent.com, via curl for large files and WebFetch for docs), GitHub issue lists for 13 date-parsing projects were pulled with the GitHub API (titles and bodies, quoted phrases only), the Hacker News Algolia API and the Stack Exchange API were searched for quoted example phrases, and help-center pages were read for Todoist, Slack, Things and Vikunja. Quoted strings were filtered by a regex for date/time words and then reviewed by sampling; code, ISO timestamps, versions, paths and prose were dropped. Some residual noise is likely in the issue-sourced rows (phrases quoted in a bug report that are sample outputs or fragments). Test-corpus rows (Duckling, Chronic, Natty, dateparser) are capped per file so they do not swamp the issue and forum rows. Reddit, the Todoist and TickTick community forums, and the Fantastical help page could not be fetched directly, so only phrases surfaced through search-result summaries and one MacRumors thread were used.

## Sources used

| Source | URL | License | Phrases |
|---|---|---|---|
| Duckling EN Time corpus | https://github.com/facebook/duckling/blob/main/Duckling/Time/EN/Corpus.hs | BSD-3-Clause | 501 |
| Chronic test_parsing.rb | https://github.com/mojombo/chronic/blob/master/test/test_parsing.rb | MIT | 276 |
| GitHub issue: mojombo/chronic | https://github.com/mojombo/chronic/issues/431 | GitHub issue text (user report); see repo license | 144 |
| dateparser test_date_parser.py | https://github.com/scrapinghub/dateparser/blob/master/tests/test_date_parser.py | BSD-3-Clause | 119 |
| Natty DateTest | https://github.com/joestelmach/natty/blob/master/src/test/java/com/joestelmach/natty/DateTest.java | BSD-3-Clause | 119 |
| Natty DateGrammarTest | https://github.com/joestelmach/natty/blob/master/src/test/java/com/joestelmach/natty/grammar/DateGrammarTest.java | BSD-3-Clause | 115 |
| GitHub issue: joestelmach/natty | https://github.com/joestelmach/natty/issues/280 | GitHub issue text (user report); see repo license | 107 |
| GitHub issue: wanasit/chrono | https://github.com/wanasit/chrono/issues/655 | GitHub issue text (user report); see repo license | 105 |
| dateparser freshness tests | https://github.com/scrapinghub/dateparser/blob/master/tests/test_freshness_date_parser.py | BSD-3-Clause | 80 |
| GitHub issue: abritinthebay/datejs | https://github.com/abritinthebay/datejs/issues/281 | GitHub issue text (user report); see repo license | 78 |
| GitHub issue: facebook/duckling | https://github.com/meta/duckling/issues/756 | GitHub issue text (user report); see repo license | 78 |
| GitHub issue: bear/parsedatetime | https://github.com/bear/parsedatetime/issues/295 | GitHub issue text (user report); see repo license | 65 |
| Todoist help: recurring dates | https://www.todoist.com/help/articles/introduction-to-recurring-dates-YUYVJJAV | docs example | 61 |
| Duckling EN Duration corpus | https://github.com/facebook/duckling/blob/main/Duckling/Duration/EN/Corpus.hs | BSD-3-Clause | 58 |
| Datejs Parsing-spec.js | https://github.com/abritinthebay/datejs/blob/master/specs/Parsing-spec.js | MIT | 53 |
| Natty DateTimeTest | https://github.com/joestelmach/natty/blob/master/src/test/java/com/joestelmach/natty/DateTimeTest.java | BSD-3-Clause | 52 |
| Natty HolidayGrammarTest | https://github.com/joestelmach/natty/blob/master/src/test/java/com/joestelmach/natty/grammar/HolidayGrammarTest.java | BSD-3-Clause | 50 |
| parsedatetime TestComplexDateTimes | https://github.com/bear/parsedatetime/blob/master/tests/TestComplexDateTimes.py | Apache-2.0 | 39 |
| Natty SearchTest | https://github.com/joestelmach/natty/blob/master/src/test/java/com/joestelmach/natty/SearchTest.java | BSD-3-Clause | 39 |
| Tickle (Ruby recurrence parser) README | https://github.com/madebymarket/tickle | MIT | 38 |
| Natty TimeTest | https://github.com/joestelmach/natty/blob/master/src/test/java/com/joestelmach/natty/TimeTest.java | BSD-3-Clause | 37 |
| Hacker News comments (natural-language reminders/quick-add threads) | https://news.ycombinator.com/item?id=44866922 | forum post (HN comment) | 37 |
| Stack Overflow questions (date/recurrence parsing) | https://stackoverflow.com/questions/43877065/constructing-date-periods-using-since-in-api-ai | CC BY-SA (user post) | 37 |
| Todoist help: dates and time | https://todoist.com/help/articles/introduction-to-dates-and-time-q7VobO | docs example | 35 |
| chrono weekday tests | https://github.com/wanasit/chrono/blob/master/test/en/en_weekday.test.ts | MIT | 31 |
| parsedatetime TestSimpleOffsets | https://github.com/bear/parsedatetime/blob/master/tests/TestSimpleOffsets.py | Apache-2.0 | 27 |
| GitHub issue: scrapinghub/dateparser | https://github.com/scrapinghub/dateparser/issues/1374 | GitHub issue text (user report); see repo license | 23 |
| Taskwarrior date synonyms | https://taskwarrior.org/docs/dates/ | MIT (docs) | 20 |
| olebedev/when past_time_test.go | https://github.com/olebedev/when/blob/master/rules/en/past_time_test.go | MIT | 18 |
| olebedev/when exact_month_date_test.go | https://github.com/olebedev/when/blob/master/rules/en/exact_month_date_test.go | MIT | 16 |
| olebedev/when deadline_test.go | https://github.com/olebedev/when/blob/master/rules/en/deadline_test.go | MIT | 15 |
| olebedev/when hour_minute_test.go | https://github.com/olebedev/when/blob/master/rules/en/hour_minute_test.go | MIT | 15 |
| GitHub issue: olebedev/when | https://github.com/olebedev/when/issues/44 | GitHub issue text (user report); see repo license | 15 |
| GitHub issue: spencermountain/compromise | https://github.com/spencermountain/compromise/issues/1215 | GitHub issue text (user report); see repo license | 15 |
| GitHub issue: spencermountain/spacetime | https://github.com/spencermountain/spacetime/issues/477 | GitHub issue text (user report); see repo license | 15 |
| parsedatetime TestRanges | https://github.com/bear/parsedatetime/blob/master/tests/TestRanges.py | Apache-2.0 | 13 |
| repeatex (Elixir recurrence parser) README | https://github.com/hanios123/repeatex | unknown | 13 |
| timefhuman README | https://github.com/alvinwan/timefhuman | MIT | 13 |
| GitHub issue: alvinwan/timefhuman | https://github.com/alvinwan/timefhuman/issues/87 | GitHub issue text (user report); see repo license | 13 |
| parsedatetime TestNlp | https://github.com/bear/parsedatetime/blob/master/tests/TestNlp.py | Apache-2.0 | 11 |
| olebedev/when casual_test.go | https://github.com/olebedev/when/blob/master/rules/en/casual_test.go | MIT | 11 |
| olebedev/when en_test_test.go | https://github.com/olebedev/when/blob/master/rules/en/en_test_test.go | MIT | 11 |
| MacRumors thread: problems with Fantastical | https://forums.macrumors.com/threads/problems-with-fantastical-calendar.2176681/ | forum post | 11 |
| olebedev/when weekday_test.go | https://github.com/olebedev/when/blob/master/rules/en/weekday_test.go | MIT | 9 |
| olebedev/when hour_test.go | https://github.com/olebedev/when/blob/master/rules/en/hour_test.go | MIT | 9 |
| Vikunja docs: quick add magic | https://vikunja.io/docs/quick-add-magic/ | docs example | 7 |
| chrono README | https://github.com/wanasit/chrono | MIT | 6 |
| Datejs Sugarpak-spec.js | https://github.com/abritinthebay/datejs/blob/master/specs/Sugarpak-spec.js | MIT | 5 |
| Vikunja community: recurring natural language thread | https://community.vikunja.io/t/natural-language-for-recurring-tasks/478 | forum post | 4 |
| Slack help: set a reminder | https://slack.com/help/articles/208423427-Set-a-reminder | docs example | 4 |
| Chronic README | https://github.com/mojombo/chronic | MIT | 4 |
| Natty RecurrenceTest | https://github.com/joestelmach/natty/blob/master/src/test/java/com/joestelmach/natty/RecurrenceTest.java | BSD-3-Clause | 3 |
| olebedev/when README | https://github.com/olebedev/when | MIT | 3 |
| Things support: repeating to-dos | https://culturedcode.com/things/support/articles/2803564/ | docs example | 2 |
| timefhuman GitHub issues | https://github.com/alvinwan/timefhuman/issues | GitHub issue text (user report); see repo license | 1 |

Notes on provenance: "GitHub issue" rows use the issue URL where the phrase appeared; license is the issue text (user report), and the repo license applies to code only. The Hacker News and Stack Overflow rows carry the comment or question link (SO content is CC BY-SA).

## Main kinds of variation seen

- Shorthand and compact forms: `tod`, `tom`, `tommorning`, `3p-4p`, `5p mon`, `Tu noon`, `eow`, `sow`, `ev monday, friday`, `4a.`, `0800`, `1500 on Friday`, `15h30`, `08h30-12h00 et 14h00-16h30`.
- Separator variation in times: `2.30`, `5,30 pm`, `16.00`, `9.458pm`, `7.20` (a time vs a date), `815`, `tonight 815`.
- Date order and format: `27/1`, `13/12`, `14/4 90`, `Feb15'24`, `may seventh '97`, `jan 10, '00`, `04Oct17-31Oct17`, `3/1980 - 4/1980`, `1 ene. 0001`, day-first and month-first side by side.
- Written-out numbers and ordinals, including wrong ones: `3th`, `23th December`, `4rd thursday`, `fourteenth of june 2010 at eleven o'clock in the evening`.
- Typos users actually send: `satterday`, `fisrt work day in a month`, `tommorning`, `freinds`.
- Date buried in a sentence or title: `golf with friends tomorrow at 10`, `Meeting with John next friday at 5pm`, `Offer is valid till next Friday`.
- Several dates or times in one input: `June 25th and July 2nd and August 16th`, `Monday 3 pm or Tu noon`, `7/17 4 or 5 PM`.
- Recurrence phrasing: `every other Tues 7am starting 1 Nov`, `every 1st wed jan, 3rd thu jul`, `every last workday at 3pm`, `every! 3 hours`, `on the 2nd tuesday and 4rd thursday of every other month`.

## New families or constructions the taxonomy lacks

1. Completion-based or "after" recurrence markers: `every! 3 hours`, `every! 2 months`, `after 10 days` (Todoist docs, https://www.todoist.com/help/articles/introduction-to-recurring-dates-YUYVJJAV). The date depends on when the task is completed, not on the calendar.
2. Sub-day interval recurrence (taxonomy K/I say unsupported, but users type it constantly): `every 12 hours starting at 9pm`, `every two hours`, `every 24 hours starting 6 am`, `new task every two days at 19:00` (same Todoist URL; Duckling issues; https://community.vikunja.io/t/natural-language-for-recurring-tasks/478).
3. Recurrence with its own start and end clause: `every 3rd Tuesday starting Aug 29 ending in 6 months`, `every other day starting May 1st 2021`, `every week starting this wednesday until May 13th`, `every 14 days 7am starting 1 Nov` (https://todoist.com/help/articles/introduction-to-dates-and-time-q7VobO, https://github.com/madebymarket/tickle). Family B has period bounds but not "starting <date> ending <relative>".
4. Day-of-month lists and per-month ordinal lists in one recurrence: `every 2, 15, 27`, `every 14 jan, 14 apr, 15 jun, 15 sep`, `every 1st wed jan, 3rd thu jul`, `1st and 3rd every 2 months`, `every 15th workday, first workday, last workday` (Todoist recurring-dates page; https://github.com/hanios123/repeatex).
5. Workday-counted ordinals and nth-last positions: `every last workday at 3pm`, `every 7th workday`, `fifth last day of May`, `the third last week of 2018`, `first monday of next leap year`, `fisrt work day in a month` (Duckling corpus https://github.com/facebook/duckling/blob/main/Duckling/Time/EN/Corpus.hs; Natty issues https://github.com/joestelmach/natty/issues).
6. Alternatives and fuzzy intervals instead of one value: `Two or three days ago`, `in 2 to 4 weeks`, `12 or 12:30`, `7/17 4 or 5 PM`, `30 or 40m`, `3ish pm`, `around 3-4pm` (https://github.com/spencermountain/compromise/issues, https://github.com/alvinwan/timefhuman, Duckling corpus).
7. Deadline, bound and "by/within/until" words rather than a point: `within half an hour`, `by end of the month`, `anytime after 2 on friday`, `due after 8:00`, `Offer is valid till next Friday`, `christmas by saturday`, `Away until Wednesday` (olebedev/when tests https://github.com/olebedev/when; HN https://news.ycombinator.com/item?id=26085397; MacRumors Fantastical thread https://forums.macrumors.com/threads/problems-with-fantastical-calendar.2176681/).
8. Direction qualifiers that change weekday resolution: `past Monday`, `upcoming Monday noon`, `next next Monday`, `Monday after next`, `a week from this friday`, `two weeks from tuesday`, `it could be done at 11 am past tuesday`, `Next 8am`, `last 11:00` (https://github.com/olebedev/when, https://github.com/alvinwan/timefhuman, https://github.com/mojombo/chronic/issues).
9. Compound anchored offsets chained with a time or a second anchor: `12 hours before yesterday at 12:30`, `3 sundays after next wed`, `5 years after 11 May 2017`, `50 days before new year's eve`, `1 year ago tomorrow`, `3 years ago this friday`, `the day before next 10/11/2016` (Todoist docs, Natty and Chronic issues). Taxonomy E covers one offset from one date; these chain two.
10. Title text that looks like a date, as negative controls: `Cafe May`, `Friday Fun Bar`, `Ring May for update on project X`, `Complete action point 7.20`, `A380 tomorrow`, `test version 3.2 by tomorrow`, `Rat 6`, `Pay ABC 2000`, `Meet Bob at 2.30` (MacRumors Fantastical thread; Duckling issues and corpus). Taxonomy has no negative-control family for names and numbers.
11. Period-boundary shorthand and fiscal terms: `eod`, `eow`, `som`, `soq`, `eoy`, `mid January`, `Mid-August`, `end of the week`, `beginning of current hour`, `last fiscal year`, `the 4th qtr of 2018`, `3rd qtr` (https://taskwarrior.org/docs/dates/, https://todoist.com/help/articles/introduction-to-dates-and-time-q7VobO, Duckling corpus). Taxonomy C has quarters and "rest of" but not midpoints or boundary codes.
12. Day-only and abbreviated ranges: `Sep 12-13`, `March 9-13, 2012`, `25 - 31 Dec`, `13th to 15th of July`, `26 of November 3 to 5`, `June 11-16 2026`, `4-5 or 5-6 PM` (chrono, timefhuman, dateparser issues).
13. Holiday and observance names, many variants: `groundhogs day`, `st. patricks day`, `martin luther king jr.'s day`, `chinese new year`, `next hanukkah`, `midsommar`, `new year eve`, `thanksgiving in 9 months` (Natty HolidayGrammarTest https://github.com/joestelmach/natty, Duckling corpus). Taxonomy J lists a few; the surface variety is much larger.
14. Frequency words without days, in user wording: `twice a week`, `biweekly`, `once every other week?`, `twice a year`, `every few days` (HN https://news.ycombinator.com/item?id=8058506, https://stackoverflow.com/questions/13541463).
15. Relative counts of named day parts: `5 mornings ago`, `1 weekend from now`, `yesterday week`, `this fortnight`, `last winter` (Chronic tests https://github.com/mojombo/chronic).

## Found but not used

- Reddit (r/todoist, r/ticktick): old.reddit.com is blocked for the fetch tool; one redlib mirror returned an empty page. Only the search-result summary was available (TickTick cannot resolve "first Monday" or "second Tuesday of the month"), and no verbatim user phrases could be taken from it.
- Todoist help article "Dates and Times" on get.todoist.help: HTTP 403 (the same content was taken from the todoist.com mirror).
- Fantastical and TickTick help pages: 404 on the guessed URLs; search results gave no stable page. Remember The Milk smart-add help: 404.
- Todoist community forum threads: not returned by search; no login-free thread was reachable.
- timefhuman tests, any-date-parser specs, Sugar docs: 404 at the guessed raw paths; the timefhuman README and issues were used instead.
- Obsidian Tasks, Vikunja, Taskwarrior GitHub issues were scanned but yielded mostly ISO dates and command lines, so none were added from the issues (Vikunja docs and one forum thread were used).
- Non-English dateparser cases (Bengali, Russian, Chinese, Turkish, Finnish) were skipped because the output is English-only; they are a rich source of "languages of expression" if a later pass wants them.
- Google Calendar quick-add help page: only two non-recurring examples ("Tennis practice at 5pm", "Dinner at 7pm"), not added.

## Caveats

- About 70 percent of the rows come from library test corpora, which are written by developers, not typed by end users. The rows from issues, forums, HN, Stack Overflow, and the Todoist and Fantastical material are the closest to real user input and are identifiable by the source column.
- Region coverage is mostly US and ISO; UK/AU/IN day-first is present (`27/5/1979`, `13/12`, `29/05/2015 05:30`) but sparse. No Indian-style or Australian-specific phrasing was found in these sources.
