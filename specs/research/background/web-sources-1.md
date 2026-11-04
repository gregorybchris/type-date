# Web sources, batch 1: task, reminder and calendar app documentation

Phrases are in `training/gen/external/web-1.jsonl` (524 unique, case-insensitive dedupe, 37 source rows from about 30 pages). Evaluation use only. Only short example phrases were taken, kept as written (typos, casing, `{Feb 28}` braces, `every!` included). Some rows keep the app's own wrapper (`/remind me ...`, `Hey Siri, ...`, `Alexa, ...`) because that is what the user types or says.

## Sources used

| Source | URL | Covers | License | Phrases |
|---|---|---|---|---|
| Todoist Help, recurring dates | https://www.todoist.com/help/articles/introduction-to-recurring-dates-YUYVJJAV | recurrence grammar, `every!`, `ev`, `except`, `starting/ending` | docs example | 70 |
| Todoist Help, dates and time | https://www.todoist.com/help/articles/introduction-to-dates-and-time-q7VobO | due dates, abbreviations (`tod`, `tom`, `tommorning`), offsets, `before/after` | docs example | 63 |
| Things support, natural language | https://culturedcode.com/things/support/articles/9780167/ | `17d from jul9`, `10-3`, `2p`, `3rd wed jul 2026` | docs example | 9 |
| Things blog 2007 | https://culturedcode.com/things/blog/2007/12/natural-language-input-for-due-dates/ | `4d`, `2w`, `Mon next week`, 2-digit years | blog post | 11 |
| TickTick help | https://help.ticktick.com/ | `evening@6pm`, ISO with `@` | docs example | 8 |
| Slack /remind (Zendesk mirror) | https://slack1447178842.zendesk.com/hc/en-us/articles/360000559563-Set-a-reminder | `/remind` grammar, `in 2.5 hours`, `after work` | docs example | 21 |
| Slack resources | https://slack.com/resources/using-slack/how-to-use-reminders-in-slack | spelled-out numbers, `1st of every month` | docs example | 13 |
| Alexa reminders guidelines | https://developer.amazon.com/en-GB/docs/alexa/smapi/alexa-reminders-guidelines-for-usage.html | spoken reminder times | docs example | 7 |
| Alexa+ help | https://digprjsurvey.amazon.com/csad/help/node/T30e4eImkYHXKiYbvr | spoken reminders, `in an hour`, `Snooze ... 20 minutes` | docs example | 9 |
| Remember The Milk repeat help | http://www.rememberthemilk.com/help/?ctx=basics.basics.repeatformat | richest repeat grammar (nth-last weekday, weekend day, count limit, `After`) | docs example | 20 |
| Remember The Milk Smart Add | https://www.rememberthemilk.com/help/?ctx=basics.smartadd.whatis | date mixed with tags and duration | docs example | 7 |
| Obsidian Tasks recurrence | https://publish.obsidian.md/tasks/Getting+Started/Recurring+Tasks | `when done`, `2nd last Friday`, month lists | MIT | 14 |
| Taskwarrior dates | https://taskwarrior.org/docs/dates/ | `sow eow som eom soq eoy`, holidays as tokens, ISO week/ordinal dates | MIT | 23 |
| Tickle (Ruby gem) | https://www.rubydoc.info/gems/tickle/1.1.1 | start/until recurrence, spelled-out ordinals, US holidays | MIT | 30 |
| Slipstick, Outlook phrases | https://www.slipstick.com/outlook/calendar/natural-language-phrases/ | Outlook date arithmetic | blog | 13 |
| Microsoft Learn archive (Outlook NLP) | https://learn.microsoft.com/en-us/archive/blogs/kclemson/natural-language-parsing-in-date-fields-in-outlook | `july fourteen`, `2 days ago` | blog | 13 |
| robert365 / msoutlook.info | https://robert365.com/?p=321 | `3w`, `115p`, localized holidays, jokes | blog | 34 |
| Asana forum threads | https://forum.asana.com/t/natural-language-for-task-creation/278905.md ; https://forum.asana.com/t/due-date-shortcuts/35448 | requested and unsupported phrases | forum post | 15 |
| nldates-obsidian README | https://github.com/argenos/nldates-obsidian/blob/master/README.md | `Nov9, 25Dec`, `mid [month]` | MIT | 13 |
| Superlist help | https://help.superlist.com/en/articles/169741-natural-language-processing | explicitly unsupported `every second Wednesday of the month` | docs example | 5 |
| Third-party guides: Calmevo, Carly (Todoist), Sweet Setup (Todoist, Fantastical) | calmevo.com/todoist-natural-language-input-guide ; usecarly.com/blog/how-to-use-natural-language-in-todoist ; thesweetsetup.com/using-natural-language-with-todoist ; thesweetsetup.com/natural-language-guide-for-fantastical | app-specific examples; Calmevo and Carly may be LLM-written, unverified | blog | 52 |
| Fantastical help | https://flexibits.com/fantastical/help/adding-events-and-tasks | event sentences with titles, locations, `alert`, `/calendar` | docs example | 10 |
| Apple Community threads | https://discussions.apple.com/thread/4376175 and others | `last day of every month`, `ever 4 weeks from next wednesday` (typo) | forum post | 12 |
| RTM forum (Siri) | https://www.rememberthemilk.com/forums/help/23089/ | `1630`, `1700` military times dictated | forum post | 4 |
| YouGot blogs (Alexa, Siri, Hey Google) | yougot.ai/blog/... | voice phrases; commercial blog, unverified | blog | 26 |
| Tom's Guide forum, Carly and BetterCloud (Google Calendar quick add), App Store listing | see jsonl `url` | quick add worked/failed, durations | forum/blog | 21 |

## Kinds of variation seen

- Abbreviations and joined tokens: `tod`, `tom`, `tommorning`, `tmrw eve`, `ev monday, friday`, `27 jan`, `Nov9, 25Dec`, `jul9`, `2p`, `115p`, `125p`, `1630`.
- Compact offsets: `3w`, `17d`, `4d`, `+5 days`, `12/25 +12d`, `3w 1d`, `1/20/2007 +2mo`, `X+10 days`.
- Spelled-out numbers and ordinals: `twelve days after christmas`, `july fourteen`, `the twenty third of June`, `in three hours`.
- Mixed text: dates embedded in titles (`Buy milk tomorrow 9am`) and metadata after the date (`p1 #Work`, `=10 min`, `alert 30 minutes`).
- Dates as lists and bounded series: `every 2, 15, 27`, `every April and December on the 1st and 24th`, `everyday from 10 May until 20 May`, `Every week for 20 times`.
- Voice style: `remind me in a couple hours`, `remind me this evening`, `every first of the month`.
- Formats: `27/1`, `2023/01/27`, `12.25.07`, `'08`, `2015-W24-1`, `2015-166`, `evening@6pm`.
- Regional coverage is thin. UK/AU/IN phrases (`fortnightly`, `alternate Saturday`, `2nd and 4th Saturday`) were not found in any source I could read. Day-first formats appear only as `27/1` and `27/01/2023`. Holiday names appear in German and Dutch (Outlook list).

## New families not in the taxonomy

1. Anchored-offset chains with compound durations. `2 months 3 weeks 5 days from the day after Christmas 2006`, `3 weeks 5 days from the day before Christmas 2006`, `17d from jul9`. (slipstick.com/outlook/calendar/natural-language-phrases/, culturedcode.com/things/support/articles/9780167/). Taxonomy E has single offsets only.
2. Start-of/end-of period tokens and "middle of". `eom`, `sow`, `eoq`, `mid January`, `middle of the week`, `beginning of the year` (taskwarrior.org/docs/dates/, rubydoc.info/gems/tickle/1.1.1, todoist.com help).
3. Recurrence by completion date. `every 10 days when done`, `every! 3 hours`, `after 10 days`, `After 5 days` (publish.obsidian.md/tasks, todoist.com recurring page, rememberthemilk.com repeat help).
4. Rich nth-weekday-of-month grammar. `Every month on the 2nd last Friday`, `Every month on the second weekend day`, `Every year on the first weekday of January`, `every 1st wed jan, 3rd thu jul` (rememberthemilk.com/help/?ctx=basics.basics.repeatformat, todoist.com). Taxonomy D covers "first and third tuesday" only; "nth last", "weekend day" and "first weekday" are missing.
5. Series with bounds and counts. `Every week for 20 times`, `everyday for 3 weeks`, `every 3rd Tuesday starting Aug 29 ending in 6 months`, `starting May 5th repeat every other week until December 1`.
6. Day-of-month lists and multi-month date lists. `every 2, 15, 27`, `every 14 jan, 14 apr, 15 jun, 15 sep`, `every April and December on the 1st and 24th`, `every 15th workday, first workday, last workday`.
7. Multi-slot weekly schedules. `every mon at 8pm, tue at 9pm`, `Piano lessons Mondays and Thursdays at 5-6pm from 1/21 to 5/23`, `Flight 997 on Saturday 3pm EST to 6pm PST`. Includes time zones in a range and per-day times.
8. Relative-to-weekday forms. `Monday after next`, `Wednesday before Christmas`, `Mon next week`, `Tue in 2 weeks`, `week after next week`, `tomorrow next week`.
9. Time with duration or alert metadata. `tomorrow at 9am for 90 min`, `Call Bob T. Monkey at 9am =10 min`, `Haircut June 24 10am alert 30 minutes`, `10-3 9`.
10. Daypart shorthand with day. `tom morning`, `tmrw eve`, `evening@6pm`, `remind me this evening`, `after work`. Taxonomy H marks dayparts partial or x; many apps resolve them to a default clock time.
11. Sub-day recurrence and short intervals. `every 12 hours starting at 9pm`, `every Monday every 1 hour`, `every 2 hours today`, `in 2.5 hours`, `in 10 seconds`.
12. Compact date tokens. `Nov9, 25Dec`, `jul9`, `2p`, `125p`, `1630`, `2330`, `2015W241`, `2015-166`.
13. Proximity or lead-time references to a thing, not a date. `two hours before your dinner reservation`, `2 days before project due date`, `5 days after creating the project`, `1 day before`.
14. Holiday-name lexicon beyond Christmas. `Super Bowl Sunday`, `Cinco De Mayo`, `Kwanzaa`, `midsommarafton`, `eastermonday`, `Weihnachten`, `Sinterklaas`, `Koninginnedag`.
15. Date embedded in a task title and the "false date" problem. `Create monthly report` highlights "monthly" as recurrence. Negative-control source.
16. Strings people write that are not dates. `whenst the whitches cry`, `When hell freezes over`, `when I get home`. Useful as `x` controls.
17. Phrases the apps themselves say are unsupported (negative or boundary tests): `every second Wednesday of the month` (Superlist), `Bi-weekly` and `every other day` (reported unrecognized in Todoist by a third-party guide, conflicts with the official `every other day` example), `every Tuesday at 9am` in Google Calendar quick add (no recurrence from text), `In two weeks on a Tuesday`.

## Found but not usable

- Todoist Help "Dates and Times" (get.todoist.help/hc/en-us/articles/205325931): 403.
- Reddit r/todoist "Help us improve date parsing in Todoist" (the best candidate for user-listed failures), TickTick "smart date parsing help" thread: Reddit blocked (WebFetch refuses it); mirrors returned 403 or a placeholder. Not read.
- TickTick Zendesk article, flexibits.com understanding-natural-language page, Vikunja quick-add page, Notion and Linear date docs (guessed URLs): 404 or no phrases.
- Apple Support Reminders guide: no phrase examples on the page.
- Asana "Natural language for task creation" thread and Apple "Reminders is making constant crazy errors" thread: only partly read or search snippet only.
- Zapier Schedule, Trello Butler docs, Microsoft To Do, Linear, Notion, Any.do voice: searches found structured pickers or no phrase lists (Zapier, Any.do use dropdowns). Nothing to extract.
- Google Calendar quick add official page: only two trivial examples.
- Several third-party blogs (Calmevo, Carly, YouGot) look machine-written. Their rows are marked "unverified" in the license field and should be weighted low.
