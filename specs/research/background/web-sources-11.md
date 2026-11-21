# Web research round 11: recurrences joined with "and", per-weekday times, typos

Date: 2026-11-21. Output: `training/gen/external/web-11.jsonl` (517 unique phrases, 179 distinct sources by name, 177 distinct URLs). Phrases are for evaluation only; each row carries source, URL and license note.

## How the phrases were found

- Raw files through the GitHub API: README and test files of recurrence parsers (recurrent, repeatex, fugit, ice_cube, tickle read but not used).
- GitHub issue search (`gh search issues`) with short phrases such as "1st and 3rd friday", then keeping only body lines that quote a schedule. Most multi-ordinal phrases come from here.
- WebFetch on forum and help threads (Remember The Milk, Toodledo, Asana, Airtable, Lunatask, Obsidian Tasks, Home Assistant, Vikunja, Trello community, Fantastical guide, ExtendOffice, MyLifeOrganized).
- WebSearch was used to find thread URLs. Phrases from search summaries were not used; only text from fetched pages or raw files.

## Sources with 4 or more phrases, or non-GitHub-issue sources

| Source | URL | License | Phrases |
|---|---|---|---|
| recurrent test suite (kvh) | https://github.com/kvh/recurrent/blob/master/src/recurrent/test.py | MIT/BSD (repo license, unverified) | 156 |
| repeatex README (rcdilorenzo) | https://github.com/rcdilorenzo/repeatex | MIT | 27 |
| fugit README (floraison) | https://github.com/floraison/fugit | MIT | 10 |
| Remember The Milk forum: repeat 2nd and 4th saturday | https://www.rememberthemilk.com/forums/help/17865/ | forum post | 9 |
| recurrent tests: negatives | https://github.com/kvh/recurrent/blob/master/src/recurrent/test.py | MIT/BSD (repo license, unverified) | 9 |
| Lunatask docs: recurring tasks | https://lunatask.app/docs/features/tasks/recurring-tasks | docs example | 8 |
| Obsidian Tasks docs: recurring tasks | https://publish.obsidian.md/tasks/Getting+Started/Recurring+Tasks | docs example | 8 |
| OpenTodo issue 834 | https://github.com/OpenTodoApp/OpenTodo/issues/834 | GitHub issue, unknown | 8 |
| chronic issue 332 | https://github.com/mojombo/chronic/issues/332 | GitHub issue, unknown | 6 |
| hashtracks-web issue 1903 | https://github.com/johnrclem/hashtracks-web/issues/1903 | GitHub issue, unknown | 6 |
| The Sweet Setup: Fantastical natural language guide | https://thesweetsetup.com/natural-language-guide-for-fantastical/ | blog post | 5 |
| khal issue 663 | https://github.com/pimutils/khal/issues/663 | GitHub issue, unknown | 5 |
| autosettings issue 83 (thoth23) | https://github.com/thoth23/autosettings/issues/83 | GitHub issue, unknown | 5 |
| PatchMon issue 777 | https://github.com/PatchMon/PatchMon/issues/777 | GitHub issue, unknown | 5 |
| recurrent README (kvh) | https://github.com/kvh/recurrent | MIT/BSD (repo license, unverified) | 4 |
| Asana forum: more options for repeating tasks | https://forum.asana.com/t/more-options-for-repeating-tasks/734144 | forum post | 4 |
| leftbrain issue 81 | https://github.com/Lazy-Coder-03/leftbrain/issues/81 | GitHub issue, unknown | 4 |
| Vikunja community | https://community.vikunja.io/t/question-on-recurring-task-type/4482 | forum post | 4 |
| hermes-agent issue 20858 | https://github.com/NousResearch/hermes-agent/issues/20858 | GitHub issue, unknown | 4 |
| txrx.org issue 125 | https://github.com/casscauley/txrx.org/issues/125 | GitHub issue, unknown | 4 |
| ice_cube README | https://github.com/ice-cube-ruby/ice_cube | MIT | 3 |
| Toodledo forum: 2nd monday | https://www.toodledo.com/forums/2/14865/-71643/read.html | forum post | 3 |
| Toodledo forum: repeat Mon Thur | https://www.toodledo.com/forums/2/9369/-47183/read.html | forum post | 3 |
| Airtable community: Tuesdays and Thursdays | https://community.airtable.com/t5/formulas/recurring-tasks-fortuesdays-and-thursdays/td-p/114819 | forum post | 3 |
| ExtendOffice: Outlook 1st and 3rd | https://www.extendoffice.com/documents/outlook/4197-outlook-recurring-meeting-1st-and-3rd.html | web article | 3 |
| Remember The Milk forum: every 2nd Sunday workaround | https://www.rememberthemilk.com/forums/help/10874/ | forum post | 2 |
| Toodledo forum: repeating task better way | https://www.toodledo.com/forums/2/24659/0/repaeating-task-is-there-a-better-way.html | forum post | 2 |
| Toodledo forum: repeats on Mondays and Thursday | https://www.toodledo.com/forums/2/9599/-48179/read.html | forum post | 2 |
| Asana forum: weekday every N months | https://forum.asana.com/t/allow-recurring-tasks-to-repeat-on-specific-weekdays-e-g-every-monday-every-3-months/1143088 | forum post | 2 |
| MyLifeOrganized group | https://groups.google.com/g/mylifeorganized/c/9YOQOlKghjc/m/rBYkNiUzAwAJ | forum post | 2 |
| Trello community threads | https://community.atlassian.com/forums/Trello-questions/How-do-I-set-a-recurring-monthly-date-to-fist-Monday-of-the/qaq-p/2918430 | forum post | 2 |
| Home Assistant community: second and fourth weekday | https://community.home-assistant.io/t/calendar-events-on-second-and-fourth-weekday-of-the-month/964089 | forum post | 1 |

## Other GitHub issues (1 to 3 phrases each)

150 issues, 198 phrases in total, license "GitHub issue, unknown" (the project license varies). Each row in the jsonl has its own issue URL.

## Counts by family (heuristic regex, then spot-checked)

Families are the codes in `training/gen/conj/families.md`.

- A, more than one ordinal weekday or an ordinal list ("first and third friday", "2nd tuesday and 4th thursday"): about 115.
- Any phrase with an ordinal plus a weekday, including single ones ("every 2nd tuesday"): 241. About 47% of the set.
- E, strict (misspelled weekday or recurrence word, tues/thurs/weds, codes like MWF, slash forms like "Tue/Thu"): about 85. A loose count that also includes plain 3-letter forms ("every wed", "Mon, Thu and Fri") is about 148.
- B, own time per weekday: 27 rows, and most are weak (one time shared by several days, or a weekday plus time list). Only a few true B phrases exist.
- A plus B plus strict E together cover roughly 60% of the rows. Without the single-ordinal phrases they cover about 44%.

## What the sources show

1. Multi-ordinal weekday phrases ("1st and 3rd Tuesday", "2nd and 4th Friday", "first and last Monday") are common in meeting schedules and in feature requests. Users write them with "and", "&", "/", commas and brackets ("Tue. [1,3]"). Forum threads confirm that Todoist-style one-pattern apps, Outlook, Apple Calendar, Remember The Milk and Asana cannot store them, so users type them anyway and then split into two tasks.
2. Different weekdays with different ordinals in one phrase are rare in the wild. Found: "every month on 3rd tuesday and 2nd thursday" (repeatex test), "first and third friday and second tuesday of each month" (recurrent test), "Every 2 days on the last and 1st Tuesdays and the 2nd Wednesday" (ice_cube), "one every first Tuesday, one every second Tuesday, one every third Tuesday and one every Fourth Thursday" (Toodledo). Users who want these ask for them in forum prose, not as typed phrases.
3. Own time per weekday (family B) almost never appears as one typed phrase. Users type one task per weekday. The searches for "tuesdays at 1:30 and thursdays at 3" style text returned nothing. The closest are "Fri 23:00-08:00, Sun 22:00-06:00." and "every Wed and Fri from 10am-2pm" (shared time). Todoist help says a task cannot have a different time per recurring day. This is a finding: B phrases need to be written by the generator, not copied from the web.
4. Misspellings found in real text: tusday, thrusday, thurday, wensday, wendsday, wednsday, saterday, satarday, evry, "tickts". Most appear as plain dates ("By Wensday 4/29 10:30 AM", "Due next Wendsday") and a few inside recurrences ("Every Wednsday at 5pm", "The Last Thrusday of Every month", "Every other Wednsday"). Abbreviations seen: Tues, Thurs, Weds, Thur, "Tue/Thu", "Tues/Thurs/Sat", "Tue-Thur-Sat", MWF, "T Th" (ambiguous T).
5. Near misses: "Once in a while.", "Every time i hear that i apreciate it.", "2nd and 4th Thu of Aug" (marked as an expected failure in the recurrent tests), "Both T could refer to Tuesday or Thrusday.", "every 2 tuesdays" (an interval of two weeks, not the 2nd Tuesday).

## New families or constructions the taxonomy lacks

| Family | Examples | URL |
|---|---|---|
| Ambiguity of "every 2nd tuesday" (monthly ordinal vs fortnightly) | "every 2nd tuesday", "every other tuesday", "every 2 tuesdays" | https://github.com/Lazy-Coder-03/leftbrain/issues/81 |
| Ordinal list with last and nth-last | "2nd and last fri of each month", "2nd and 2nd to the last fri of each month", "first and last Friday" | https://github.com/kvh/recurrent/blob/master/src/recurrent/test.py |
| Ordinal weekdays with an every-N-months period | "every 3rd tues of every other month", "on the 2nd tuesday and 4rd thursday of every other month", "1st and 3rd every 2 months" | https://github.com/hanios123/repeatex |
| Ordinal weekday counted from another date | "1st Tuesday after the 15th", "day after 4th Thursday of every November" | https://github.com/monicahq/monica/issues/7846 |
| Weekday-ordinal on workdays | "every 2nd weekday", "every first workday", "Third working day of the month" | https://github.com/OpenTodoApp/OpenTodo/issues/834 |
| Weekday range inside a recurrence | "every Mon thru Wed for the next year", "every other saturdays through tuesdays", "each week on saturday thru tuesday" | https://github.com/kvh/recurrent |
| Several times for one weekday | "every day at 16:00 and 18:00", "every wed or Monday at 5pm and 11" | https://github.com/floraison/fugit |
| Repeat count or bound after a weekday list | "Every 2nd Tuesday, 5 times", "fridays twice", "Every Monday 9–10 for 8 weeks", "mondays and thursdays starting jan 1 for 6 times" | https://github.com/goshops-com/open-clickup/issues/11 |
| Weekday with a week-of-month window, one weekday per window | "done on Tuesday for the first three weeks of the month", "then on Thursday on the last week of the month" | https://www.toodledo.com/forums/2/24659/0/repaeating-task-is-there-a-better-way.html |
| Repeat suffix tags in a quick-add | "coffee w/ Shawn tomorrow 7am :weekly", "task {{monday}} {{every other Tuesday}}" | https://thesweetsetup.com/natural-language-guide-for-fantastical/ |
| Bracket or table notation for nth weekdays | "Tue. [1,3] = first and third Tuesday a month", "Sat. [-1]" | https://github.com/streetcomplete/StreetComplete/issues/3969 |
| Everything on one weekday list with a month filter | "every Sunday in March", "every Wed in Jan" | https://github.com/azza-bazoo/prettycron/issues/20 |
| Indian-calendar ordinals (holiday on 2nd and 4th Saturday) | "2nd Saturday (and sometimes 4th Saturday)", "not sound on the 2nd and 4th Saturday" | https://github.com/vicolo-dev/chrono/issues/462 |

## Sources found but not used

- Todoist help (recurring dates) pages: excluded by the task (used in earlier rounds).
- superuser.com threads: WebFetch is blocked for that domain. Only titles were seen through the Stack Exchange API (for example "In Outlook how do I schedule a recurring meeting for every Thursday and every other Tuesday?", https://superuser.com/questions/1810700/). The titles are not in the jsonl because they were not fetched as page text. The StackExchange API search is weak and limited to 300 requests per day.
- ClickUp recurring reminders help: HTTP 403.
- Apple Support Community threads (252314428, 256111461): HTTP 502 on fetch.
- Remember The Milk threads 22732, 8769, 18169, 28351, 11863: redirect to http, not re-fetched.
- Reddit r/ticktick thread through a redlib mirror: the mirror returned an empty "Preparing Space" page. Reddit itself was not reachable through the fetch tool.
- Google Calendar, Notion, Motion, Reclaim, Any.do, Microsoft To Do, Google Assistant and Alexa pages: searches gave no page with typed phrases. Alexa developer docs only show confirmation text ("I'll remind you every Thursday at 8 AM").
- rrule.js `test/nlp.test.ts`: fetched but not used, because rrule.js docs were used in earlier rounds.
- tickle (antogon) README and specs: read; its examples are mostly simple intervals, so none were kept.
- Stack Overflow, Quora: no useful typed phrases found with the available search tools.
