# Web research round 12: time zones inside date and time phrases

Date: 2026-11-21. Output: `training/gen/external/web-12.jsonl` (1049 unique phrases, 61 sources by name, 93 distinct URLs). Phrases are for evaluation only; each row has source, URL and license note. Only `training/gen/tz/families.md` and the earlier source list were used as repository input.

## Method

Raw files were downloaded with curl (GitHub raw test files, RFC text, GNU and PHP manual pages) and string literals that contain a zone token and a time were extracted by script. Test files with many near-identical ISO timestamps were deduplicated by shape (digits masked), so each machine format is kept once or a few times. GitHub issues were searched with `gh api search/issues` in 11 repositories for zone words; only lines that look like user-typed date strings were kept (JS `Date.toString` dumps and truncated lines were dropped). Multilingual rows come from the Recognizers-Text specs. Rounds 1 to 11 used several of the same libraries (chrono, Natty, dateparser, Chronic); here only their zone-bearing inputs were taken. No row was written from memory.

## Sources and phrase counts

- chrono-node en_timezone_exp tests (https://raw.githubusercontent.com/wanasit/chrono/master/test/en/en_timezone_exp.test.ts; MIT): 35
- chrono-node it_timezone_exp tests (https://raw.githubusercontent.com/wanasit/chrono/master/test/it/it_timezone_exp.test.ts; MIT): 4
- chrono-node en_casual tests (https://raw.githubusercontent.com/wanasit/chrono/master/test/en/en_casual.test.ts; MIT): 5
- chrono-node system_timezone tests (https://raw.githubusercontent.com/wanasit/chrono/master/test/system_timezone.test.ts; MIT): 19
- Duckling Time EN corpus (https://raw.githubusercontent.com/facebook/duckling/main/Duckling/Time/EN/Corpus.hs; BSD-3-Clause): 19
- dateparser test_timezone_parser (https://raw.githubusercontent.com/scrapinghub/dateparser/master/tests/test_timezone_parser.py; BSD-3-Clause): 61
- dateparser test_date (https://raw.githubusercontent.com/scrapinghub/dateparser/master/tests/test_date.py; BSD-3-Clause): 12
- dateparser test_date_parser (https://raw.githubusercontent.com/scrapinghub/dateparser/master/tests/test_date_parser.py; BSD-3-Clause): 42
- Natty TimeZoneTest (https://raw.githubusercontent.com/joestelmach/natty/master/src/test/java/com/joestelmach/natty/TimeZoneTest.java; BSD-3-Clause): 14
- Chronic test_parsing (https://raw.githubusercontent.com/mojombo/chronic/master/test/test_parsing.rb; MIT): 14
- python-dateutil test_parser (https://raw.githubusercontent.com/dateutil/dateutil/master/tests/test_parser.py; Apache-2.0/BSD): 19
- python-dateutil test_isoparser (https://raw.githubusercontent.com/dateutil/dateutil/master/tests/test_isoparser.py; Apache-2.0/BSD): 5
- Ruby test_date_parse (https://raw.githubusercontent.com/ruby/ruby/master/test/date/test_date_parse.rb; BSD-2-Clause/Ruby): 69
- Ruby test_time (https://raw.githubusercontent.com/ruby/ruby/master/test/test_time.rb; BSD-2-Clause/Ruby): 38
- Go time format_test (https://raw.githubusercontent.com/golang/go/master/src/time/format_test.go; BSD-3-Clause): 44
- Go time format.go (https://raw.githubusercontent.com/golang/go/master/src/time/format.go; BSD-3-Clause): 8
- araddon/dateparse parseany_test (https://raw.githubusercontent.com/araddon/dateparse/master/parseany_test.go; MIT): 53
- Moment create tests (https://raw.githubusercontent.com/moment/moment/develop/src/test/moment/create.js; MIT): 35
- Moment utc_offset tests (https://raw.githubusercontent.com/moment/moment/develop/src/test/moment/utc_offset.js; MIT): 15
- Luxon tokenParse tests (https://raw.githubusercontent.com/moment/luxon/master/test/datetime/tokenParse.test.js; MIT): 20
- Luxon regexParse tests (https://raw.githubusercontent.com/moment/luxon/master/test/datetime/regexParse.test.js; MIT): 24
- Luxon zone tests (https://raw.githubusercontent.com/moment/luxon/master/test/datetime/zone.test.js; MIT): 4
- Day.js customParseFormat tests (https://raw.githubusercontent.com/iamkun/dayjs/dev/test/plugin/customParseFormat.test.js; MIT): 10
- Day.js timezone tests (https://raw.githubusercontent.com/iamkun/dayjs/dev/test/plugin/timezone.test.js; MIT): 6
- date-fns parseISO tests (https://raw.githubusercontent.com/date-fns/date-fns/main/pkgs/core/src/parseISO/test.ts; MIT): 6
- TC39 test262 Temporal (https://raw.githubusercontent.com/tc39/test262/main/test/built-ins/Temporal/ZonedDateTime/from/; BSD-3-Clause): 49
- Rails time_zone_test (https://raw.githubusercontent.com/rails/rails/main/activesupport/test/time_zone_test.rb; MIT): 15
- Rails time_with_zone_test (https://raw.githubusercontent.com/rails/rails/main/activesupport/test/core_ext/time_with_zone_test.rb; MIT): 21
- Arrow parser tests (https://raw.githubusercontent.com/arrow-py/arrow/master/tests/test_parser.py; Apache-2.0): 25
- pandas test_parsing (https://raw.githubusercontent.com/pandas-dev/pandas/main/pandas/tests/tslibs/test_parsing.py; BSD-3-Clause): 9
- pandas test_to_datetime (https://raw.githubusercontent.com/pandas-dev/pandas/main/pandas/tests/tools/test_to_datetime.py; BSD-3-Clause): 19
- Pendulum parsing tests (https://raw.githubusercontent.com/python-pendulum/pendulum/master/tests/parsing/test_parsing.py; MIT): 4
- Sugar.js date tests (https://raw.githubusercontent.com/andrewplummer/Sugar/master/test/tests/date.js; MIT): 20
- OpenJDK TCKDateTimeFormatters (https://raw.githubusercontent.com/openjdk/jdk/master/test/jdk/java/time/tck/java/time/format/TCKDateTimeFormatters.java; GPLv2+CE): 19
- PostgreSQL datetime.sgml (https://raw.githubusercontent.com/postgres/postgres/master/doc/src/sgml/datetime.sgml; PostgreSQL): 1
- Recognizers-Text English TimeZone specs (https://github.com/microsoft/Recognizers-Text/tree/master/Specs/DateTime/English; MIT): 64
- Recognizers-Text English DateTimeModel (https://github.com/microsoft/Recognizers-Text/blob/master/Specs/DateTime/English/DateTimeModel.json; MIT): 8
- Recognizers-Text French specs (https://github.com/microsoft/Recognizers-Text/tree/master/Specs/DateTime/French; MIT): 43
- Recognizers-Text Dutch specs (https://github.com/microsoft/Recognizers-Text/tree/master/Specs/DateTime/Dutch; MIT): 29
- Recognizers-Text Spanish specs (https://github.com/microsoft/Recognizers-Text/tree/master/Specs/DateTime/Spanish; MIT): 6
- Recognizers-Text Korean specs (https://github.com/microsoft/Recognizers-Text/tree/master/Specs/DateTime/Korean; MIT): 5
- Recognizers-Text Hindi specs (https://github.com/microsoft/Recognizers-Text/tree/master/Specs/DateTime/Hindi; MIT): 1
- RFC 5545 iCalendar examples (https://www.rfc-editor.org/rfc/rfc5545; IETF RFC text): 34
- RFC 2822 examples (https://www.rfc-editor.org/rfc/rfc2822; IETF RFC text): 1
- RFC 3339 examples (https://www.rfc-editor.org/rfc/rfc3339; IETF RFC text): 3
- RFC 9557 examples (https://www.rfc-editor.org/rfc/rfc9557; IETF RFC text): 6
- RFC 822/7231 HTTP dates (https://www.rfc-editor.org/rfc/rfc7231; IETF RFC text): 4
- GNU coreutils date input formats (https://www.gnu.org/software/coreutils/manual/html_node/Time-zone-items.html; GFDL): 9
- PHP datetime formats docs (https://github.com/php/doc-en/blob/master/reference/datetime/formats.xml; CC-BY 3.0 docs): 10
- Arrow parser tests (Windows tz display names) (https://raw.githubusercontent.com/arrow-py/arrow/master/tests/test_parser.py; Apache-2.0): 3
- GitHub issues araddon/dateparse (https://github.com/araddon/dateparse/issues/158; issue text (user report)): 7
- GitHub issues bear/parsedatetime (https://github.com/bear/parsedatetime/issues/281; issue text (user report)): 2
- GitHub issues date-fns/date-fns (https://github.com/date-fns/date-fns/pull/4296; issue text (user report)): 4
- GitHub issues dateutil/dateutil (https://github.com/dateutil/dateutil/issues/600; issue text (user report)): 6
- GitHub issues iamkun/dayjs (https://github.com/iamkun/dayjs/issues/1154; issue text (user report)): 2
- GitHub issues microsoft/Recognizers-Text (https://github.com/microsoft/Recognizers-Text/issues/2467; issue text (user report)): 4
- GitHub issues mojombo/chronic (https://github.com/mojombo/chronic/issues/331; issue text (user report)): 10
- GitHub issues moment/luxon (https://github.com/moment/luxon/issues/1366; issue text (user report)): 7
- GitHub issues moment/moment (https://github.com/moment/moment/issues/5918; issue text (user report)): 2
- GitHub issues scrapinghub/dateparser (https://github.com/scrapinghub/dateparser/issues/1070; issue text (user report)): 15
- GitHub issues wanasit/chrono (https://github.com/wanasit/chrono/issues/273; issue text (user report)): 1

## Kinds of variation seen

- Zone placed before the time ("Thursday 9 am (BST)"), after a date only ("Wednesday, September 16, 2020, EST"), after a range ("9:30 - 11:00 CST", "15:00 GMT - 18:00 GMT") or on each end ("10:30 JST today to 10:30 pst tomorrow").
- Zone words without an abbreviation: "tomorrow, 10 central", "tomorrow, 10 alaska time", "10 am central time == 8 am pacific time".
- Offset notation: "UTC+2:00", "GMT+05:30", "GMT-3.5", "UTC−06:00" with five different dash characters, "PST-08", "+0545", "GMT+0900 (JST)".
- Double zone: abbreviation plus offset in either order ("CDT -0500", "-0500 CDT"), "EST -05:00", "+01:00 (CET)".
- Machine formats: RFC 2822/822/850 dates, RFC 3339, ISO with bracket suffix, iCalendar `TZID=`, Go/Ruby/JS layouts, log-file dates.
- Odd inputs: "10 Jan 2020 10:00 CET/CEST", "2019-09-28WIB19:17:34+07:00", "Sat Aug 28 02:29:34 PMT -1999".

## Zone constructions NOT in `training/gen/tz/families.md`

1. Zone abbreviation glued to a date with no space or between date and time: "2019-09-28WIB19:17:34+07:00", "T191919-0700" (PHP docs), "19990523T235521+0900".
2. Zone inside a slash list: "10 Jan 2020 10:00 CET/CEST", "Jan 10, 2020 10:00 PST/PDT", "10 Jan 2020 10:00 CET/" (truncated). Source: dateparser test_timezone_parser.
3. Zone name without "time" or "zone": "tomorrow, 10 central", "tomorrow, 10pm pacific", "Book me a room at aedt". Also "I said New York time, not York time" (zone correction inside a sentence).
4. Unicode minus and dash variants before an offset: "jan 15th UTC‐06:00", "jan 15th UTC—06:00", "jan 15th UTC−06:00".
5. Fractional-hour and unusual offsets: "Thu Jul 29 16:39:41 GMT-3.5 1999", "5/1/13 01:00:00 GMT-1", "Fri Sep 23 2016 10:34:51 GMT+1245".
6. Zone prefix before the date as a directive: 'TZ="Europe/Paris" 2022-10-31 06:30', 'TZ="America/New_York" 2023-05-07 12:23', "America/New_York 1-April-2019 04:10:48 PM Mon" (Luxon).
7. IANA or offset annotation in brackets after an offset: "2021-11-12T09:07:13.000+08:00[Australia/Perth]", "2022-07-08T00:14:07+08:45[+08:45]", "1970-01-01T00:00[UTC][u-ca=iso8601]" (RFC 9557, test262).
8. iCalendar property forms: "DTSTART;TZID=America/New_York:19980119T020000", "DTSTART:19970714T173000Z".
9. Local-time descriptions that switch zone abbreviation across DST: "(1997 9:00 AM EDT) September 2-30;October 1-25", "(1997 9:00 AM EST) October 26-31", "(1998 9:00 AM EDT) May 1;June 5" (RFC 5545).
10. Windows and Rails display names with offset prefix: "(UTC+01:00) Amsterdam, Berlin, Bern, Rom, Stockholm, Wien", "(GMT+05:30) New Delhi", "Mountain Time (US & Canada)".
11. Zone name in the writer's language: "Il est 13 heures, l'heure avancée de l'Est", "Je suis dans le fuseau horaire du Pacifique", "태평양 표준시 기준 6시 30분에서 9시 사이는 어떠세요?", "Ik ben in de Pacifische tijdzone". (Korean and Spanish rows come from the Recognizers specs.)
12. Zone offset that states a deadline convention: 'All deadlines are 11.59 pm UTC -12h ("anywhere on Earth / AoE")', "Kiribati's Line Islands is in UTC+14", "I'm at MSK+7, not MSK".
13. Redundant or conflicting zone given twice: "Thu 30 May 2024 10:13:10 -0500 CDT", "Thu, 30 May 2024 10:13:10 -0500 CDT (CDT)", "1970-01-01T00Z[UTC]" (test262: Z plus IANA name).
14. Zone in a position after a relative phrase: "in 1 hour GMT", "today EST", "next week EST" (chrono) and "in 1 hour IST" (dateparser).
15. Windows-style standard-time names with generic "Std": "16:30 Central Europe Std Time", "GMT Standard Time", "Jordan Daylight Time".
16. Sub-minute offsets: "2021-08-19T17:30:45-12:12:59[-12:12:59]", "UTC-09:01:02" (Ruby, test262).
17. Era-style and multi-script dates with a zone: "1982/05/25 09:10:11.445 Asia/Tokyo", "೦೩-ಏಪ್ರಿಲ್-೨೦೧೯ ೧೨:೨೬:೦೭ PM Asia/Calcutta" (Luxon).
18. Zone given by a country or city word where the abbreviation is a near miss: "Book me a room at St. Louis-time", "San José Time", "Colchester-time" (Recognizers).

## Sources found but not used, and why

- PHP strtotime relative-format pages: no zone phrases beyond those taken from `formats.xml`.
- Duckling TimeZone/other corpora: the repository has no separate TimeZone corpus; only the EN Time corpus has zone strings (19 rows).
- Sugar.js locale tests, JDK Joda/threeten parse tests, Joda-Time: 404 on the guessed paths, or no zone text.
- parsedatetime tests: no zone inputs.
- Wikipedia list of time zone abbreviations: lists names, not phrases.
- Luxon, Day.js and Moment issue threads: mostly JS `Date.toString` output, dropped as not user-typed.
- WebFetch summaries were not used; all text came from raw files.
