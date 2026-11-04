# Web research round 6 (2026-11-04)

Output: `training/gen/external/web-6.jsonl`, 961 unique phrases (case-insensitive dedupe, at most 90 characters), 41 source labels. Focus: dates and times as written in text outside quick-add boxes. These phrases are meant for a sealed eval set. Rounds 1 to 4 sources were excluded (checked against `web-sources-1.md` .. `web-sources-4.md`).

Fetch method: `curl` and WebFetch on raw pages, then regex extraction. Every phrase was seen in a fetched page or file. Labels like "Term starts:" were stripped. Phrases from test files are inputs only, not expected outputs.

## Sources used

| Source | URL | Covers | License | Phrases |
|---|---|---|---|---|
| tj/go-naturaldate tests | https://github.com/tj/go-naturaldate/blob/master/naturaldate_test.go | Go NL date library, "in 2 minutes", "Remind me on the 5th of next month" | MIT | 135 |
| KarpelesLab/strtotime tests | https://github.com/KarpelesLab/strtotime/blob/master/strtotime_test.go | PHP strtotime syntax: "+1 week 4 days -3 days", "next year + 4 days" | MIT | 87 |
| mattmc3/go-approxidate tests | https://github.com/mattmc3/go-approxidate/blob/main/approxidate_test.go | git approxidate port: "3.days.ago", "tea time", "1 year 2 fortnights ago" (a few error cases) | MIT | 37 |
| risboo6909/when (Rust) tests | https://github.com/risboo6909/when/blob/master/tests/integration_tests.rs | typos ("next mnday at 6P.m."), mixed language, malformed ("at 17people") | MIT | 52 |
| chronic_duration spec | https://github.com/henrypoydar/chronic_duration/blob/master/spec/lib/chronic_duration_spec.rb | durations: "2h20min", "47 yrs 6 mos and 4.5d" (capped at 30) | MIT | 30 |
| TIMEX2 Quick Guide (TIDES, ACE TERN) | https://timeml.github.io/site/terqas/documentation/timex2-quick-guide_10may02.doc | annotated spans: "the past 10 years", "late Wednesday", "twice-monthly" | public guide | 43 |
| Temporal annotation worksheet | https://jinzhao3611.github.io/cosi230b/activities/temporal-annotation-worksheet.html | TIMEX types: "for months", "the 90s", "every Tuesday" | course page | 16 |
| OSM wiki Key:opening_hours | https://wiki.openstreetmap.org/wiki/Key:opening_hours | opening-hours syntax and English glosses | CC BY-SA 2.0 | 75 |
| Wikivoyage Time and date formats | https://en.wikivoyage.org/wiki/Wikivoyage:Time_and_date_formats | good and bad forms: "10AM–6PM (closed Tue)", "8–11AM", "1730h" | CC BY-SA | 41 |
| SUNY Purchase style guide, Podium style guide | https://purchase.edu/editorial-style-guide/general-style-preferences/dates-and-times , https://design.podium.com/?p=148 | how editors say to write dates and ranges | public pages | 35 |
| Outcomes MTM SIG code guide (pharmacy) | https://secure.outcomesmtm.com/gateway/static/connect-resources/static/docs/EnglishSIGcodes.pdf | medication timing, all caps | public PDF | 60 |
| Indeed Job Sync shift taxonomy and help | https://docs.indeed.com/job-sync-api/reference/shifts-and-schedules , https://uk.indeed.com/help/employers/articles/shift-and-schedule-information-overview | job schedule tags: "4x10", "Every other weekend", "Home bi-weekly" | public docs | 55 |
| PowerDMS, Shiftbase, BuildRemote shift guides | https://www.powerdms.com/policy-learning-center/7-different-12-hour-shift-schedule-examples-to-cover-round-the-clock | rota notation: "[4 on 3 off]", "2-2-3" | public pages | 19 |
| POSIX at(1p), gitrevisions, systemd.time, GNU date | https://man7.org/linux/man-pages/man1/at.1p.html , https://git-scm.com/docs/gitrevisions , https://www.freedesktop.org/software/systemd/man/latest/systemd.time.html | "at 2pm + 1 week", "HEAD@{5 minutes ago}", "11min ago" | man pages | 34 |
| UK/AU school term dates (Barnsley, Plymouth, York, Overton Grange, Coloma, Jindabyne) | https://www.barnsley.gov.uk/pid36 and others in the jsonl | date ranges with and without weekday and year, ordinals | public pages | 89 |
| Library, clinic, bus hours (Haddon Heights, Norelius, Iowa State, MANNM, Pinnacle, Fidalgo, Huddersfield, Baltimore) | URLs in jsonl | "Monday – Friday, 10 – 8", "M-F: 8 am - 6pm", "Sunday: 10:00 AM - 2:00 AM (Monday morning)" | public pages | about 55 |
| Parish schedules (Jacksonville, Ashford) | https://www.icjax.org/mass-schedule , https://parish.rcdow.org.uk/ashford/?p=2397 | "All night Vigil every 1st and 3rd Friday beginning at 8:00 p.m.", "09.15 am" | public pages | 28 |
| Court and council notices (Niagara, Cook County, Hermiston) | https://www.townofniagarany.gov/?p=95 , https://www.cookcountycourt.org/ , https://www.hermiston.gov/node/16484 | "1st & 2nd Wednesday of each month at 1:00pm", "2nd, 3rd, & 4th Friday" | public pages | 22 |
| Event listings (Tipperary Libraries, KDNK, St James, Free Chapel) | https://www.tipperarylibraries.ie/?p=86333 and others | "6th May 2025 @ 3:00 pm - 4:00 pm", bare-hour times ("at 4:30", "at 5") | public pages | 17 |
| Football fixtures (Sports Mole, Premier League amendments PDF, FIFA World Cup News) | https://www.sportsmole.co.uk/football/premier-league/fixtures.html | "Saturday, November 7, 2026", "12.30pm", "Wednesday 4 March / 8pm" | public pages | 22 |

## Main kinds of variation seen

- Ranges with the unit or weekday dropped: "24 October to 1 November 2027", "Monday – Friday, 10 – 8", "8–11AM".
- Ordinal suffixes plus weekday plus year: "Tuesday 1st September 2026".
- Dot-separated and 24-hour times: "6.00 pm (Saturday Vigil)", "from 0930 to 1450", "17.30".
- Ordinal-weekday-of-month, singly and in lists: "1st & 3rd Tuesday of each month", "2nd, 3rd, & 4th Friday".
- Overnight spans that name the next morning: "7:00 AM - 2:00 AM (Friday morning)".
- Typos and malformed input from library tests: "next mnday at 6P.m.", "+2 hourss", "at 17people".
- Duration shorthand: "2h20min", "300ms20s 5day".

## New families or constructions not in the taxonomy

1. Opening-hours shorthand with day groups and several intervals. "Mo-Fr 08:00-12:00,13:00-17:30; Sa 08:00-12:00; PH off", "Mon–Fri 10AM–2PM", "M-F: 8 am - 6pm". https://wiki.openstreetmap.org/wiki/Key:opening_hours
2. Holiday and period exceptions inside a schedule. "Sa-Su,PH off", "Mo 08:00-16:00; Dec off", "Apr-Oct: Fr-Su 10:00-18:00". Same URL.
3. Spans that cross midnight with the next day named, and extended hours. "Sunday: 10:00 AM - 2:00 AM (Monday morning).", "Mo 20:00-26:00", "7:00 AM - 2:00 AM (Friday morning)". https://iastate.libanswers.com/faq/270216
4. Shift rota notation. "4 on 3 off", "[2 on 3 off] [2 on 2 off] [3 on 2 off]", "2-2-3", "4x10", "9x80", "Home every 3 weeks". https://www.powerdms.com/policy-learning-center/7-different-12-hour-shift-schedule-examples-to-cover-round-the-clock
5. Medication timing language. "TAKE 1 TABLET BY MOUTH EVERY MONDAY, WEDNESDAY, AND FRIDAY", "EVERY OTHER WEEK", "12 HOURS ON AND 12 HOURS OFF". https://secure.outcomesmtm.com/gateway/static/connect-resources/static/docs/EnglishSIGcodes.pdf
6. Meal- and event-relative times. "30 MINUTES BEFORE BREAKFAST", "1 HOUR BEFORE DENTAL APPOINTMENT" (SIG guide), "followed by Adoration and Confession", "leading up to the 12:10 p.m. Mass" (https://www.icjax.org/mass-schedule).
7. Week-parity and week-number schedules. "week 01-53/2 Fr 09:00-12:00", "Weeks 1 & 2 (Day Shifts)". OSM wiki and shift guides above.
8. Command-line and tooling grammars. "at 2pm + 1 week", "tomorrow Pacific/Auckland", "+1 week 4 days -3 days +4 hours 10 minutes", "master@{yesterday}", "next year + 1 month + 1 week" (arithmetic chains with signs). https://github.com/KarpelesLab/strtotime
9. Annotation-style spans with modifiers. "late Wednesday", "the early 1990s", "the end of August", "overnight Thursday", "twice-monthly". TIMEX2 guide above.
10. Agenda and listing separators. "6th May 2025 @ 3:00 pm - 4:00 pm", "Tue, Nov 10 • 7:30 PM", "13 March 2026, Friday". Event and fixture pages above.
11. Bare-hour times with no am/pm in event sentences. "Yarn Group meets at 5", "Aspen Thrift Shop is open for First Tuesday hours from 4:30 to 7". https://www.kdnk.org/arts/2019-02-05/tuesday-community-calendar
12. Style-guide anti-examples (forms editors reject): "12 noon", "7 p.m. tonight", "June of 2012", "the 1920's", "the XIX century", "from 1998–2002". Useful as typed variants.

## Found but not used

- GNU coreutils date manual, PHP manual relative-formats page: direct fetch blocked or 404 (curl gave an error page). WebFetch gave only a few strings from the GNU page, which are included under the man-page row.
- Wootton Parish Council library, SOAS/ICS library, Midleton parish mass times, St Rita, Algona code, Lumberton: pages are JavaScript or Cloudflare-blocked, or returned no text.
- TimeML 1.2.1 spec PDF (timeml.github.io): extracted text contained almost no usable TIMEX3 examples. The annotation guidelines PDF URL guess was wrong; the ResearchGate copy needs a login. TimeBank, TERN data and TempEval-3 corpora are LDC-licensed or on Bitbucket and were not fetched. WikiWars was not found as plain text.
- KashCal/parsely (Kotlin) tests: fetched and read, then dropped. They are quick-add titles plus synthetic stress strings, which is outside this round's focus.
- Carbon (PHP), Timeliness (Ruby) tests: few natural-language strings (Carbon: "next 2pm", "after tomorrow", "before yesterday"; not added). SwiftyChrono, chrono_dart, jchronic, nChronic are ports of already-used libraries (chrono, chronic).
- Bus operator timetables (Surrey CC, Stagecoach, First): search found them but they are tables or PDFs with times only; only the Huddersfield wording was used.
- Premier League and FIFA fixture lists beyond dates: team names and venues make the lines too long; only dates and times were kept.

## Caveats

- `go-naturaldate`, `strtotime`, `approxidate`, and `when` test files include inputs that the library rejects; these are negative controls, not valid dates.
- The OSM rows are a machine syntax that people do write, but a typed-text picker may treat them as out of scope.
- All-caps SIG lines are capped at 60 and deduplicated by timing tail.
