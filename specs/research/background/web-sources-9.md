# Web sources round 9: domain scheduling and deadline language

Output: `training/gen/external/web-9.jsonl`, 763 unique phrases (case-insensitive dedupe, at most 90 characters, text kept as written). Evaluation use only. Sources from `web-sources-1..6.md` were not reused (cronstrue, rrule.js, Todoist, Things, OSM opening_hours, systemd, powerdms, and the others listed there).

## Sources and counts

| Source | URL | Covers | License note | Phrases |
|---|---|---|---|---|
| crontab.guru examples | https://crontab.guru/examples.html | cron schedule titles ("every other hour", "every weekend") | website, unknown | 68 |
| Quartz CronTrigger tutorial | https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html | English glosses ("last Friday of every month", "2nd-to-last last day") | Apache-2.0 docs | 15 |
| Google App Engine cron.yaml | https://cloud.google.com/appengine/docs/standard/scheduling-jobs-with-cron-yaml | English-like schedule strings ("2nd,third wednesday of month 09:00") | CC-BY 4.0 docs | 29 |
| Jenkins pipeline syntax | https://www.jenkins.io/doc/book/pipeline/syntax/ | cron glosses | MIT docs | 4 |
| Spring CronExpression javadoc | https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/support/CronExpression.html | glosses ("third-to-last day of the month") | Apache-2.0 | 17 |
| Azure Functions timer trigger | https://learn.microsoft.com/azure/azure-functions/functions-bindings-timer | NCRONTAB glosses | CC-BY 4.0 | 10 |
| EventBridge scheduled rules | https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-scheduled-rule-pattern.html | glosses with UTC | AWS docs | 9 |
| GitHub Actions schedule | https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows | glosses with time zones | CC-BY 4.0 | 7 |
| fugit README | https://github.com/floraison/fugit | natural-language cron input | MIT | 30 |
| whenever, rufus-scheduler READMEs | https://github.com/javan/whenever , https://github.com/jmettraux/rufus-scheduler | DSL and duration strings | MIT | 18 |
| cron-descriptor tests (Salamek) | https://github.com/Salamek/cron-descriptor | machine cron-to-English output | MIT | 85 |
| cron-parser tests (RedHogs) | https://github.com/RedHogs/cron-parser | machine cron-to-English output | Apache-2.0 | 39 |
| Wikipedia, prescription abbreviations | https://en.wikipedia.org/wiki/List_of_abbreviations_used_in_medical_prescriptions | dosing frequency meanings | CC-BY-SA | 38 |
| CDC child/adolescent schedule notes | https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-notes.html | ages, minimum intervals | US gov | 31 |
| NHS medicine pages, NHS dose syntax guide | https://www.nhs.uk/medicines/methotrexate/how-and-when-to-take-methotrexate/ | patient dosing language | OGL v3 | 26 |
| MedlinePlus fasting; Malaysian dose-time guide; vaccination schedule | https://medlineplus.gov/lab-tests/fasting-for-a-blood-test/ , https://www.therakyatpost.com/?p=705522 , https://en.wikipedia.org/wiki/Vaccination_schedule | fasting window, clock times per frequency, boosters | gov / news / CC-BY-SA | 9 |
| Detroit Mercy, USM, South Alabama, WSU registrars | https://www.udmercy.edu/... , https://www.usm.edu/registrar/meeting-patterns.php , https://southalabama.edu/departments/registrar/registration/approved_meeting_times.html , https://registrar.schedule.wsu.edu/instructions/standard-meetings | class meeting patterns ("MWF 10:00-10:50", "TTh 2:00-3:15") | university pages | 92 |
| Wikipedia public holidays (US, UK, AU, CA) | https://en.wikipedia.org/wiki/Public_holidays_in_Australia (and US/UK/Canada) | rule-based dates | CC-BY-SA | 53 |
| Wikipedia, Mother's/Father's Day, Election Day, Thanksgiving, DST by country | https://en.wikipedia.org/wiki/Daylight_saving_time_by_country | ordinal weekday rules, rule + time | CC-BY-SA | 34 |
| Wikipedia, Fiscal year | https://en.wikipedia.org/wiki/Fiscal_year | fiscal year ranges by country | CC-BY-SA | 13 |
| IRS employment tax due dates; IRS when to file | https://www.irs.gov/businesses/small-businesses-self-employed/employment-tax-due-dates | deadlines | US gov | 20 |
| GOV.UK Self Assessment, VAT, tenancy pages | https://www.gov.uk/self-assessment-tax-returns/deadlines | UK deadlines, notice periods | OGL v3 | 19 |
| Municipal pages (Winfield, Hillsboro, Lake City, Atlantic Beach, Kirksville, Edgeley, Readstown, Rushville) | e.g. https://www.atlanticbeachny.gov/garbage-recycling | garbage, recycling, street sweeping | public body pages | 38 |
| Library hours (Hennepin, Santa Cruz, Burlington, Estes Valley) | https://santacruzpl.org/services/detail/23 | opening hours | public pages | 16 |
| Theatre listings (TDF, Ogunquit, Metro Times, others) | https://www.tdf.org/shows/21458/roald-dahls-matilda-the-musical | show times, run dates | public listings | 16 |
| Hotel/cruise check-in (NCL, Chase) | https://www.ncl.com/faq/what-are-the-standard-check-in-and-check-out-times-for-the-hotel | check-in/out windows | public pages | 5 |
| PEP 745 | https://peps.python.org/pep-0745/ | release train dates with weekday | public domain | 20 |

Library, theatre and Estes Valley phrases that came from search-result excerpts (not a page I fetched) are marked in the source name.

## Main kinds of variation

- Cron-explainer output: three styles. Human-written glosses (Quartz, Spring), terse English-like DSL (App Engine, crontab.guru), machine output ("At 12:23 PM, on the second Sunday of the month").
- Day-pattern codes: MWF, MW, TTh, TTH, TR, "M/T/W/or Th", "MW, MF, WF", combined with time ranges that omit am/pm (USM, Detroit Mercy).
- Rule-defined dates: "1st Monday after or on 27 May", "Monday preceding May 25", "Saturday preceding first Monday in July".
- Dosing frequency: Latin-derived meanings ("every other day", "while awake"), clock-time lists, minimum intervals.
- Deadlines with a cutoff time and a time zone ("by 11:59pm on 31 January 2027").
- Regional date order: UK/AU "6 April", "1st Monday in May"; US "April 15, 2026"; ISO with weekday "Tuesday, 2025-10-07"; "22-May-2026".
- Opening hours and show times as day-range plus time-range lists, with and without colons ("Sun 1pm-5pm", "THURSDAY & FRIDAY @ 8 PM", "2:00p Matinees").

## New families the taxonomy lacks

1. Weekday-code meeting patterns with a time range and no am/pm: "MWF 10:00-10:50", "TTh 2:00-3:15", "MW, MF, WF 3:30-4:45", "M/T/W/or Th 4:00-6:30". https://www.udmercy.edu/current-students/registrar/registrar-faculty-staff-resources/standard-time-keys.php (the taxonomy only has "M/T/W", "TTh" as bare day lists).
2. Holiday and rule-defined dates: "Monday preceding May 25", "1st Wednesday after 9 August", "Saturday preceding first Monday in July", "Friday before last Sunday in March at 02:00". https://en.wikipedia.org/wiki/Public_holidays_in_Canada
3. Date plus conditional shift: "26 December (or 27th if 26th is a Sunday)", "Anzac Day: 25 April, or if 25 April is a Sunday, 26 April.", "Last Sunday of May, or first Sunday of June if the last Sunday of May is Pentecost". https://en.wikipedia.org/wiki/Public_holidays_in_the_United_Kingdom
4. Several ordinals plus day lists in one recurrence (App Engine): "1st mon,wednesday,thu of sep,oct,nov 17:00", "2nd,third wednesday of month 09:00", "1,8,15,22 of month 09:00". https://cloud.google.com/appengine/docs/standard/scheduling-jobs-with-cron-yaml
5. Interval with a daily window: "every 5 minutes from 10:00 to 14:00", "every 5 minutes starting at 2pm and ending at 2:55pm, every day". Same URL and Quartz.
6. Nth-to-last and nearest-weekday day-of-month: "third-to-last day of the month at midnight", "the weekday nearest day 13 of the month", "5 days before the last day of the month". https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/support/CronExpression.html
7. Dose timing: "every other hour", "while awake", "3 times a week", "30 minutes before you have breakfast", "the day after your methotrexate", "at 0, 6, and 12 months", "at least 4 weeks apart". https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-notes.html
8. Season or month bound plus weekday frequency: "Street sweeping will take place on Tuesdays from May to October", "Sunday: 1pm to 5pm (Labor Day to Mid June)", "June 1 through September 30, 2026". https://www.atlanticbeachny.gov/garbage-recycling
9. Deadline with cutoff and zone: "by 11:59pm on 31 January 2027", "one calendar month and 7 days after the end of an accounting period", "the last day of the first month that follows the end of the quarter". https://www.gov.uk/self-assessment-tax-returns/deadlines
10. Fiscal-year spans: "6 April to 5 April", "1 July to the next 30 June", "1 October to 30 September of the following year". https://en.wikipedia.org/wiki/Fiscal_year
11. Weekday-and-ISO-date: "Tuesday, 2025-10-07". https://peps.python.org/pep-0745/
12. Show times with two sessions on one day: "SATURDAY @ 2 PM & 8 PM", "Fridays, 8:30 p.m., Saturdays, 3 & 8:30 p.m. and Sundays, 2 p.m.".
13. Time with zone or rule attached: "5:30 AM in the America/New_York timezone every Monday through Friday", "Run at 10:00 am (UTC+0) every day".
14. Alternating-week patterns without a start date: "Every other Tuesday.", "Every Other Friday", "the first Monday and Tuesday of each month", "the 1 st and the 3 rd Tuesdays of each month".

## Found but not used

- Google Calendar custom-repeat help (https://support.google.com/calendar/answer/37115): page text contains no example phrases.
- Home Assistant trigger docs: only time-format strings, no phrases.
- Ballotpedia poll hours, Ryanair help, Kent term dates, Outlook recurrence help, Wikipedia pages Payday/Invoice/Notice period/Triple witching/Option expiration, ATO due dates, India income tax due dates, GOV.UK payday page, Hennepin/Geauga/Estes (blocked or 404): empty, blocked (Cloudflare, Akamai) or no extractable phrases.
- Spotify, Netflix billing help: only relative phrasing ("on your next billing date"), nothing new.
- Not covered: flight search boxes, car rental pickup, payroll "last business day", shift rosters, on-call handoffs, option expiry "third Friday" as typed user text. These sources were not reachable through plain fetch; they need a different approach (forum threads, app store reviews).
- Several phrases are machine-generated cron output, not typed input; use the per-row `source` to weight them.
