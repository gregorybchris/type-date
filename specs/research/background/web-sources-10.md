# Web sources, round 10 (conjunction schedules)

Focus: one recurring schedule joined with "and", per-weekday times, weekday abbreviations, near misses. Phrases are in `training/gen/external/web-10.jsonl` (288 unique, 54 source entries (about 48 distinct URLs)). This is below the 400 target. WebFetch returns a model summary of each page, and most institutional pages state one pattern, so each page gave few phrases. Search snippets were used only where they quoted the page text. All phrases are for evaluation only.

## Sources and phrase counts

Counts are after dedupe. Licenses are web page text from public agencies or universities unless noted ("unknown" = no license stated).

| Source | URL | Covers | Phrases |
|---|---|---|---|
| Santa Rosa JC committees | https://governance.santarosa.edu/committees | 1st and 3rd, 2nd and 4th weekday lists with time ranges | 20 |
| Hot Springs Sentinel-Record datebook 2014 | https://www.hotsr.com/news/2014/dec/17/wednesday-s-datebook-20141217/ | newspaper club and class listings, "first, second and third Thursday", "Monday, Wednesday and Friday" | 19 |
| Clemson registrar | https://www.clemson.edu/registrar/faculty-staff/scheduling/schedule-building/standard-meeting-times.html | MWF, TR, TWR, MTWRF, "M or W", "T or R" | 18 |
| Yale Recreation | https://recreation.yale.edu/fitness-wellness-programs/group-fitness-classes | "Mondays \| 7am - 8am" class rows | 13 |
| Wesleyan registrar | https://www.wesleyan.edu/registrar/course_information/scheduling_of_classes.html | MW, MF, WF, "MTWR or F" with times | 11 |
| UCCS registrar | https://registrar.uccs.edu/standard-meeting-pattens | MWF3, TRF4, MEVE, "MW; 8:00 am - 10:40 am" | 10 |
| Memphis registrar | https://www.memphis.edu/registrar/faculty/scheduling/patterns-fallspr.php | "[ MWF ]" bracket codes | 10 |
| Kendallville IN | https://www.kendallvillein.gov/MeetingSchedule | nth weekday, "or on demand", "except June, July and August" | 9 |
| CatholicMassTime St Elizabeth Seton | https://catholicmasstime.org:443/church/st-elizabeth-seton/11811/ | "Mon, Tues, Thurs, & Fri: 7:00 AM" | 9 |
| St Mark's parish Vancouver | https://stmarksparishvancouver.ca/?p=2310 | "Wed 1-1:30pm", "Thurs 11am-11:40am", 1st and 3rd Tuesday | 8 |
| Salford sports centre (UK) | https://www.salford.ac.uk/sports-centre/fitness-class-timetable | 24h timetable, includes a source typo "17:15–8:00" | 8 |
| Wood Park gatherings | https://sites.google.com/site/woodparkec/our-gatherings | "2nd and 4th Tuesdays each month" | 7 |
| UVM registrar | https://www.uvm.edu/registrar/standard-meeting-patterns | M T W R codes | 7 |
| Brewster Ladies' Library | https://www.brewsterladieslibrary.org/contact/ | "Tuesdays & Thursdays: 10:00 am – 7:00 pm", "Sunday Nov - March" | 7 |
| UL Lafayette clinic | https://louisiana.edu/studenthealth/about/clinic-hours | different hours per weekday | 7 |
| St John Catholic McLean | https://stjohncatholicmclean.org/?p=520 | confession and Mass times | 7 |
| Ashland OR | https://www.ashlandoregon.gov/741/Meeting-Schedules | "Meets 1st & 3rd Tuesday each month" | 7 |
| Glencoe MN | https://glencoemn.org/city-government/monthly-meetings | "4th Monday at 6:00 PM ... (January, March, ...)" | 6 |
| CatholicMassTime St Elizabeth Ann Seton | https://www.CatholicMassTime.org/church/st-elizabeth-ann-seton/16599/ | "Tuesday and Thursday at 5:15 p.m.", "Weds. and Fri." | 7 |
| Stansbury Park | https://stansburypark.gov/swimming-lessons | "Monday–Tuesday & Thursday–Friday, 8 AM–4 PM" | 6 |
| Rockdale Reporter | https://www.rockdalereporter.com/lifestyle/organizations-62 | "first, third and fourth Tuesday", "7:30 p.m. Tuesdays and Sundays" | 6 |
| Spokesman-Review clubs 2013 | https://www.spokesman.com/stories/2013/dec/12/clubs/ | "Meets the first and third Thursdays of the month, 7 a.m." | 5 |
| Woodhaven MI | https://Woodhavenmi.org/departments/city_clerk_s_office/community_meeting_schedules.php | nth weekday "(as needed)" | 5 |
| SF City Clinic | https://www.sf.gov/cityclinic-appointment | own hours per weekday | 7 |
| Beth Sholom | https://www.beth-sholom.org/worship/service-times/ | "Sunday – Thursday 7:15 PM", "once/month in person" | 5 |
| WMU sports clubs | https://wmich.edu/rec/sportsclubs/sportsclubcouncil/meeting-schedule | dated list | 5 |
| Missouri State health | https://health.missouristate.edu/hours.htm | "Monday, Tuesday, Wednesday and Friday: ..., Thursday: ..." | 4 |
| UNL registrar | https://registrar.unl.edu/faculty-and-staff/course-leaf-section-scheduler/meeting-patterns | "M, W, F", "T, R" | 4 |
| Dixon CA | https://www.cityofdixonca.gov/Meetings | "3rd Wednesday of every _even_ month" | 4 |
| Western Ferries, Tamar Crossings (UK) | https://www.western-ferries.co.uk/pages/current-timetable , https://www.tamarcrossings.org.uk/ferry-timetable/ | "Mon-Thurs", "Mon - Thu" | 7 |
| Fairview TN, Pooler GA | https://www.fairview-tn.org/city/boards-commissions/ , https://www.pooler-ga.gov/government/public-meetings/ | nth weekday | 6 |
| Hot Springs 2015 datebook | https://www.hotsr.com/news/2015/apr/22/wednesday-s-datebook-20150422/ | listings | 4 |
| Others (1 to 3 phrases each) | Frazier Park PUD, Mendocino CHCD, JMU and Lansing CC registrars, St Ann, St Willibrord, Cornell CS, Willamette, Touchstone, Board Manor Park, Shaarey Shalom, Highlands Rec, FMCC, Newark Rec, Kind Clinic, Brooklyn Park, Cottage Grove Sentinel, Temple Kol Ami | see `url` per line | about 30 |

## Variation seen

- Nth weekday lists: "1st and 3rd", "2nd & 4th", "first, third and fourth", "first, second and third". Joiners "and" and "&" are both common. Always one weekday per phrase. Across these pages I found no phrase joining nth weekdays across different weekdays ("2nd Tuesday and 4th Thursday"). Pages that have both patterns list them on separate lines (family A is rare as one phrase).
- Per-weekday times appear as separate rows or lines, not one phrase, except the clinic pages ("Mon, Wed, Fri 8 a.m. – 4 p.m. Tues 1 p.m. – 6 p.m."). Closest one-phrase forms: "Monday, Tuesday, Wednesday and Friday: 8 a.m. - 5 p.m., Thursday: 9 a.m. - 5 p.m." and "Tuesday 8:30 am - 3:45 pm (Staff meeting 7:30 am - 8:30 am)".
- Abbreviations: registrar codes (MWF, TR, TWR, MTWRF, "M or W"), "Mon/Wed", "Tue/Thurs", "Mon-Thurs", "Mon, Tues, Thurs, & Fri", "Weds. and Fri.", "S/S", "Wed 1-1:30pm". I found no "wends", "thrus" or "tusday" in an official page; searches for typos returned nothing usable.
- Exceptions and bounds: "except June and July", "(as needed)", "or on demand", "every _even_ month", "No meetings June-August or November-December.", "1st Monday after graduation until August 16th".
- Newspaper style: "at 1 p.m. Monday, Wednesday and Friday", "from 9 a.m. to 4 p.m. Wednesdays-Saturdays", "7:30 p.m. Tuesdays and Sundays".
- UK and 24h: "Monday 12:30–13:00", "Mon-Thurs".
- Other: "@" before a time ("Wednesdays @ 12:00pm"), pipe tables ("Mondays | 7am - 8am"), bracket day codes ("[ MWF ]"), "Common Time: TR 11:40 AM 1:20 PM", day-and-time spans ("7:30 AM Tuesday – 4:00 PM Wednesday").

## New families or constructions not in the taxonomy (from my reading of these pages, not of the taxonomy file)

I did not read `coverage-taxonomy.md`, so "new" here means likely gaps to check.

1. Day-range with a gap, "Monday–Tuesday & Thursday–Friday, 8 AM–4 PM". Also "Monday, Tuesday, Wednesday and Friday: 8 a.m. - 5 p.m., Thursday: 9 a.m. - 5 p.m." (https://stansburypark.gov/swimming-lessons, https://health.missouristate.edu/hours.htm).
2. Registrar day codes with alternatives: "M or W 4 - 6:45 pm", "T or R 5 - 7:45 pm", "MTWR or F 1:20 PM 4:10 PM" (https://www.clemson.edu/registrar/faculty-staff/scheduling/schedule-building/standard-meeting-times.html).
3. Bracket and suffix codes: "[ MWF ]", "MWF3", "TRF4", "MEVE (4:45pm onward)" (https://www.memphis.edu/registrar/faculty/scheduling/patterns-fallspr.php, https://registrar.uccs.edu/standard-meeting-pattens).
4. Month-parity and month-list bounds: "3rd Wednesday of every _even_ month at 7:00 p.m.", "4th Monday at 6:00 PM at Library (January, March, May, September, November)", "3rd Tuesday of each month except June, July and August" (https://www.cityofdixonca.gov/Meetings, https://glencoemn.org/city-government/monthly-meetings, https://www.kendallvillein.gov/MeetingSchedule).
5. Meetings relative to another meeting: "Meets the Monday before each Business Meeting", "Meets the Wednesday following the 1st Tue Council meeting each month" (https://www.ashlandoregon.gov/741/Meeting-Schedules).
6. Three nth weekdays in one phrase: "first, second and third Thursday of each month", "first, third and fourth Tuesday of each month" (https://www.hotsr.com/news/2014/dec/17/wednesday-s-datebook-20141217/, https://www.rockdalereporter.com/lifestyle/organizations-62).
7. Rule plus exception month: "meets regularly on the 4th Thursday of each month except ... November and December ... 2nd Thursday" (https://www.mendocinochcd.gov/future-meetings).
8. Event-linked recurrence: "Sunday – Thursday 7:15 PM", "as well as on Rosh Chodesh", "once/month in person", "After 8:30 a.m. Mass", "First Fridays" (https://www.beth-sholom.org/worship/service-times/, https://www.shaarayshalom.org/worship/weekday-minyanim/, https://stjohncatholicmclean.org/?p=520).
9. Overnight spans: "7:30 AM Tuesday – 4:00 PM Wednesday" (CatholicMassTime St Elizabeth Seton).
10. Day-qualified "or on demand" and "(as needed)" suffixes.
11. Date plus seasonal range: "Sunday Nov - March 1 pm - 4 pm", "October 1–April 1: Monday–Tuesday & Thursday–Friday, 8 AM–4 PM".
12. "S/S" for Saturday and Sunday (https://touchstoneclimbing.com/the-studio/fitness-classes).

## Found but not usable

- 403 or 404 or TLS errors: reviewjournal.com datebook (403), oregonnews PDF (binary), kindclinic.org (404), Vandalia IL (404), Olympia Farmers Market (TLS error), CUNY and registrar pages at UNCG and Harrisonburg (404).
- PDF schedules (Assumption pool hours, Colorado College fitness, Creighton, Westminster CO, BC Ferries): fetch returned binary the tool could not read.
- Redirected and not re-fetched: ou.edu fitness schedule, Purdue math club, UMSL office hours (no times on page).
- Pages with no phrase relevant to the focus: St Louis parks program detail, UVM office hours PDF.
- Not found at all: a phrase combining nth weekdays across different weekdays, a "Tues 7pm, Thurs 6pm" one-line schedule, a real "wends"/"thrus"/"weds" typo in a notice. These are likely found in social posts and flyers, which the allowed source types rarely expose as text.
