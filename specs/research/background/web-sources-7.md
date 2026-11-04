# Web sources, round 7: date and time formats people type or paste

Output: `training/gen/external/web-7.jsonl`, 735 unique phrases (case-insensitive), 32 source URLs. Phrases are for evaluation only. Kept as written in the source, at most 90 characters.

## Sources used

| Source | URL | Covers | License | Phrases |
|---|---|---|---|---|
| araddon/dateparse tests and README | https://github.com/araddon/dateparse/blob/master/parseany_test.go | US/UK numeric, ctime, RFC, log, zone-suffixed timestamps, "Oct 7, '70", "September 7tH 2012" | MIT | 190 |
| Moment.js docs | https://momentjs.com/docs/ | ISO 8601 variants, RFC 2822, 2-digit years, am/pm spellings, ASP.NET dates | MIT docs example | 113 |
| PHP manual, Date and Time Formats | https://www.php.net/manual/en/datetime.formats.php | timelib formats: "22DEC78", "14 III 1879", "t1919", "first sat of July 2008", "back of 7pm" | PHP docs example | 103 |
| Ruby date library tests | https://github.com/ruby/date/blob/master/test/date/test_date_parse.rb | Japanese era dates, BC/AD, lowercase ISO week, ordinal days | BSD-2-Clause | 29 |
| PostgreSQL datetime input | https://www.postgresql.org/docs/current/datatype-datetime.html | "1999-Jan-08", "990108", "J2451187", "allballs" | PostgreSQL license | 26 |
| SQL Server CAST and CONVERT | https://learn.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql | Regional style outputs (British, German, Italian, Japan, ISO) | docs, CC BY 4.0 | 25 |
| Go time docs | https://pkg.go.dev/time | ANSIC, RFC 822/850/1123, "Feb 3, 2013 at 7:54pm (PST)" | BSD-3 | 18 |
| Pendulum ISO 8601 tests | https://github.com/sdispater/pendulum/blob/master/tests/parsing/test_parse_iso8601.py | Valid and malformed ISO strings | MIT | 18 |
| Pendulum docs | https://pendulum.eustace.io/docs/ | ISO week, ordinal, intervals | MIT | 16 |
| MDN Date.parse | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse | Legacy fallback formats, 2-digit year cutoffs | CC BY-SA 2.5 | 15 |
| .NET parsing and standard format strings | https://learn.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime | US strings, "12 Juni 2008", partial dates | CC BY 4.0 | 22 |
| MySQL date and time literals | https://dev.mysql.com/doc/refman/8.0/en/date-and-time-literals.html | Odd delimiters ("2012^12^31"), no-separator 2-digit years | docs example | 14 |
| ciso8601 README | https://github.com/closeio/ciso8601 | Reduced-precision ISO, "--04-29", "11.5" | MIT | 14 |
| Canada.ca content style guide | https://design.canada.ca/style-guide/ | Canadian date/time style, fiscal year spans | Open Government Licence - Canada | 14 |
| Arrow docs | https://arrow.readthedocs.io/en/stable/guide.html | Dates embedded in sentences, "2018-03-09 8 h 40" | Apache-2.0 | 12 |
| MDN toLocaleDateString and related | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString | Locale outputs en-GB, en-US, ko-KR | CC BY-SA 2.5 | 12 |
| University of Rochester calendar | https://www.rochester.edu/provost/academic-resources/academic-policies-procedures/academic-calendar/ | "Fall 2026 term", break ranges | web page | 11 |
| Java DateTimeFormatter Javadoc | https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/format/DateTimeFormatter.html | ISO, RFC 1123, "2012-W48-6" | Oracle docs | 10 |
| pandas time series guide | https://pandas.pydata.org/docs/user_guide/timeseries.html | Mixed to_datetime strings | BSD-3 | 10 |
| Date::Manip | https://metacpan.org/pod/Date::Manip::Date | "3rd Tuesday in October 1996", "Sunday week 22" | Perl license | 9 |
| SARS filing season (South Africa) | https://www.sars.gov.za/types-of-tax/personal-income-tax/filing-season/ | "13 July – 23 October 2026", "between 1 and 12 July 2026" | web page | 9 |
| SQLite date functions | https://www.sqlite.org/lang_datefunc.html | "start of month", "weekday 2", "+9 months" | public domain | 8 |
| Microsoft investor page FY26 Q1 | https://www.microsoft.com/en-us/investor/earnings/fy-2026-q1/press-release-webcast | "FY26 Q1", quarter-end phrasing | web page | 8 |
| Day.js tests | https://github.com/iamkun/dayjs/blob/dev/test/parse.test.js | Lenient parse inputs | MIT | 7 |
| Military date-time group blog | https://blog.refactortactical.com/blog/military-date-time-group | "061830RJAN12", "0100 hours" | web page | 7 |
| Exceljet convert text to date | https://exceljet.net/formula/convert-text-to-date | "28.02.2014", "22-MAY-2011" | docs example | 5 |
| RFC 3164, RFC 5322, Apache mod_log_config | rfc-editor.org/rfc/rfc3164.txt, rfc5322.txt, httpd.apache.org/docs/2.4/mod/mod_log_config.html | syslog, email Date header, common log format | IETF / Apache | 8 |
| US Treasury financial report page | https://www.fiscal.treasury.gov/reports-statements/financial-report/ | "FY 2025", "fourth business day of each month" | web page | 2 |

## Kinds of variation seen

- Separators: `/ - . : , ^ @ _` and none (`20130208`, `12021999`, `010203`). Mixed separators in one string ("2012-08-17T18:31:59:257+0100").
- Field order: D/M/Y, M/D/Y, Y/M/D, Y.D.M-free; 2-digit years with cutoffs (69/70, 49/50, 68/69).
- Missing zero padding ("2014-4-2 4:8:9", "5:7:51 PM").
- Text months: abbreviations, "Sept.", truncated or wrong ("Decem", "DecFoo"), Roman numerals, glued to digits ("22DEC78", "10Sep2001").
- Apostrophe years ("Oct 7, '70", "4th July '79"), ordinal suffixes with odd case ("7tH").
- Weekday prefixes with comma, dot, or none ("Tue. 01 Nov 2016", "Tue 01 Nov 2016").
- Times: am/pm as "P", "p.m.", "A.M.", "t1919", "040837CEST", "0100 hours", seconds and fractions up to 9 digits, comma decimal, 24:00.
- Zones: Z, UT, GMT, PST/MSK/CEST, "UTC-05", "GMT+0100 (GMT Daylight Time)", "+0300 +03", "-0330", "[Europe/Paris]".
- Year-less forms (syslog "Oct 11 22:14:15", "5/12", "1 July", "March 12").
- Week and ordinal dates: `2008W273`, `2012-337`, `-w15-5`, `1999.008`.
- Epoch numbers in s, ms, us, ns; `@1215282385`; `/Date(1198908717056-0700)/`.
- Text embedded in sentences ("Halloween is on 2019.10.31.").

## Gaps in this round

- The focus asked for UK, Ireland, Australia, India, Singapore regional English, fiscal ("Q3 FY26", "EOM", "COB Friday"), academic ("week 5 of term") and "08.30 hrs" forms. Library docs and tests contain almost none of these. I found only 2 fiscal strings, 11 academic strings, 7 military strings, 9 South African range strings. Regional English style guides and finance or university pages were mostly unreachable (see below). Another round should target forums, HR/ops docs, and student handbooks for those.
- Most phrases are machine-format strings. Few are things a person types into a quick-add box. They are useful as a paste-in and robustness class.
- No source gave "EOM", "COB Friday", "week 5 of term", "08.30 hrs" in text. These are untested by this round.

## New families the taxonomy lacks

1. Syslog and log timestamps without year or with odd order. "Oct 11 22:14:15", "1990 Oct 22 10:52:01", "10/Oct/2000:13:55:36 -0700". https://www.rfc-editor.org/rfc/rfc3164.txt
2. Ctime / Unix `date` output with zone and year after time. "Wed Feb 25 11:06:39 PST 2015", "Mon Aug 10 15:44:11 UTC+0000 2015", "Thu May  8 17:57:51 2009". https://github.com/araddon/dateparse/blob/master/parseany_test.go
3. Glued and Roman-month forms. "22DEC78", "14 III 1879", "10Sep2001". https://www.php.net/manual/en/datetime.formats.php
4. Day-of-year and ISO week/ordinal dates. "2012-337", "2008W273", "1999.008". https://www.postgresql.org/docs/current/datatype-datetime.html
5. Non-Gregorian era and 2-digit-year-only forms. "H13.02.03", "R01.05.01", "T11.05.23 23:55:21+0900", "830905". https://github.com/ruby/date/blob/master/test/date/test_date_parse.rb
6. Time-of-day shorthand with letters and no separator. "t1919", "040837CEST", "0100 hours", "061830RJAN12" (military date-time group). https://blog.refactortactical.com/blog/military-date-time-group
7. Quirky relative forms from timelib. "back of 7pm", "front of 5am", "first sat of July 2008", "-7 weekdays", "+1.5 hours" (parsed as 1 and 5). https://www.php.net/manual/en/datetime.formats.php
8. Dates with zone names in parentheses or with offsets-plus-name. "Fri Jul 03 2015 18:04:07 GMT+0100 (GMT Daylight Time)", "2018-06-29 19:09:57 +0300 +03". https://github.com/araddon/dateparse/blob/master/parseany_test.go
9. Fiscal and academic labels. "FY26 Q1", "Fall 2026 term", "Reading Period: 12/15-12/17/2026", "fiscal year 2015 to 2016". https://www.microsoft.com/en-us/investor/earnings/fy-2026-q1/press-release-webcast
10. Ranges with "between ... and", en dash, and "until/by/from" in South African English. "1 -12 July 2026", "between 1 and 12 July 2026", "by 12 July 2026". https://www.sars.gov.za/types-of-tax/personal-income-tax/filing-season/
11. Epoch and wrapper numbers. "@1215282385", "1384216367111222", "/Date(1198908717056-0700)/".
12. Malformed and out-of-range controls (negative cases). "2008-06-32", "Mar 32, 2014", "2/30/2019 7:00pm", "04 DecFoo 1995", "20161306T123456".

## Sources found but not used

- Australian Style Manual (stylemanual.gov.au dates page): fetch timed out twice.
- Termium Plus (Canada writing tips): 403.
- Oxford term dates (ox.ac.uk), ATO BAS due dates, Revenue.ie: 403 or no date text returned.
- IRAS Singapore filing page, Indian income tax calendar, php.net sub-pages, Day.js docs on gitee, Luxon was already used earlier: 404.
- Investopedia (COB), timeanddate.com time zones: blocked or 403.
- Wikipedia date-format pages: skipped because earlier rounds used Wikipedia and the exact pages were not listed.
- Web search returned mostly SEO spam for "military time", "fiscal quarter notation", Excel date forums; no usable pages from those queries.
