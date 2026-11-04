# Web phrase research, round 5

Date: 2026-11-04. Output: `training/gen/external/web-5.jsonl` (899 unique phrases, case-insensitive dedupe, at most 90 characters, kept as written).

Focus: phrases typed into task, calendar and reminder apps and voice assistants. No source, page or repository from `web-sources-1.md` to `web-sources-4.md` was reused. Phrases are for evaluation only.

## Sources used

| Source | URL | Covers | License | Phrases |
|---|---|---|---|---|
| Stack Overflow questions (about 100 questions on parsing user-typed or natural-language dates, found by API search) | https://stackoverflow.com/questions/ (per-phrase URL in the jsonl) | quoted inputs and outputs in questions: relative forms, strtotime-style, log formats | CC BY-SA | 357 |
| Mycroft lingua-franca `test_parse.py` | https://github.com/MycroftAI/lingua-franca/blob/master/test/test_parse.py | voice assistant utterances ("set an alarm for wednesday at 7 o'clock") | Apache-2.0 | 177 |
| GitHub issues in small task, calendar, chat-bot and agent repos (about 60 repos, found by issue search on "natural language date", "date parsing", "doesn't understand date", and similar; per-phrase URL) | https://github.com/ | typed quick-add text, bug reports with failing inputs, agent scheduling prompts | issue text, unknown | 145 |
| Hacker News comments (about 50 comments; per-phrase URL) | https://news.ycombinator.com/ | reminder and todo workflows, recurrence wishes | forum comment | 50 |
| Super Productivity short syntax wiki | https://github.com/johannesjo/super-productivity/blob/master/docs/wiki/3.04-Short-Syntax.md | `@` due-date and `@every` recurrence quick-add | MIT | 37 |
| Mayerch1 RemindmeBot README (Discord) | https://github.com/Mayerch1/RemindmeBot | bot reminder inputs, day-first dates, eod/eom/eoy | unknown | 25 |
| Tasks.org (Astrid) `TitleParserTest.kt` | https://github.com/tasks/tasks/blob/main/app/src/androidTest/java/com/todoroo/astrid/service/TitleParserTest.kt | dates inside task titles, "Jog every 3 days starting from today" | GPL-3.0 | 24 |
| Org mode manual, date/time prompt | https://orgmode.org/manual/The-date_002ftime-prompt.html | org-read-date inputs | GFDL | 23 |
| OVOS ovos-date-parser `test_parse_en.py` | https://github.com/OpenVoiceOS/ovos-date-parser/blob/dev/test/parse_tests/test_parse_en.py | spoken English dates and durations | Apache-2.0 | 16 |
| Home Assistant community (Discourse) | https://community.home-assistant.io/ | voice and automation reminder wording | forum post | 10 |
| Microsoft To Do smart due date article | https://support.microsoft.com/en-us/ToDo/smart-due-date-reminder-recognition-in-microsoft-to-do | the full list of documented examples | docs example | 9 |
| khal tests | https://github.com/pimutils/khal/blob/master/tests/parse_datetime_test.py | CLI calendar offsets and event lines | MIT | 9 |
| Apple, Web Applications Stack Exchange | https://apple.stackexchange.com/ | Siri reminders, Google Calendar quick add | CC BY-SA | 7 |
| Obsidian forum (Discourse) | https://forum.obsidian.md/ | reminder plugin wording | forum post | 5 |
| GNU coreutils manual, relative items | https://www.gnu.org/software/coreutils/manual/html_node/Relative-items-in-date-strings.html | `date -d` strings | GFDL | 4 |
| keith/reminders-cli README | https://github.com/keith/reminders-cli | Apple Reminders CLI | MIT | 1 |

Counts are approximate to the jsonl `source` field. The jsonl has one `url` per phrase.

## Variation seen

- Voice assistant wording: whole utterances with a verb and a topic ("remind me to call mom at 10am 2 days after this saturday"), spoken times ("quarter to three", "half past noon", "at 7 o'clock in the evening", "0630", "remind me to call mom at 06 30 hours").
- Spelled-out numbers and amounts: "a couple of weeks", "in a quarter of an hour", "eight tonight", "november twenty-fifth".
- Quick-add sigils and shorthand: `@2 monday`, `@every 2 fridays`, `@9h30 friday`, `1d -3H 10min`, `+2tue`, `eod`, `eoy`, `5 m`, `2 h`.
- Day-first and other order variants: "24 dec", "23 sept at 3pm", "1.1.2016 10:00", "12 13 october".
- Typos and malformed text: "5minutes ago", "3 day ago", "26April 11:55 am BST", "1 day laterago" (bug output), "04 Dec 2014 pm 1:58".
- Mixed language: "@18h demain", "@every friday 15 Uhr".
- Many phrases from Stack Overflow are log or API timestamps, not quick-add input. They are useful as format variety. Filter by source if you want only typed phrases.

## New families or constructions not in the taxonomy

1. Spoken clock forms: "quarter to three", "half past noon", "remind me to do something at 20 to 2", "ten fourteen am", "remind me to call mom at 06 30 hours". Source: lingua-franca, Stack Overflow 41480106 area. https://github.com/MycroftAI/lingua-franca/blob/master/test/test_parse.py
2. Vague counted spans: "in a couple of weeks", "in a couple hours", "within the hour", "in 5 decades". Same URL.
3. Anchored sun events: "sunrise + 1 hour", "sunset + 3 hours". Source: Home Assistant community (url in jsonl).
4. Signed compound offsets in one token run: "1d -3H 10min", "1mo 2 days -5h", "+1 week 2 days 4 hours 2 seconds". Sources: khal tests, RemindmeBot README, Stack Overflow.
5. Org-mode relative entry: "+2tue", "++5", "11am+2:15" (start plus duration), "2012 w4 fri" (ISO week). https://orgmode.org/manual/The-date_002ftime-prompt.html
6. Weekday-counted offsets: "+1 Weekday", "+5 Weekdays", "previous working week". Source: Stack Overflow (strtotime questions).
7. Fuzzy period names: "early Feb", "last fall", "late next week", "sometime this week". Source: GitHub issues (url in jsonl).
8. Multiplier recurrence with the weekday: "@every 2 fridays", "every second Friday", "every 2 weeks on Friday", "Do X every other day starting Monday". Sources: Super Productivity wiki, GitHub issues, Hacker News.
9. Recurrence with a time zone or city: "weekdays at 09:00 Europe/Paris" (some zone-bearing phrases were dropped by the timestamp filter). Source: GitHub issues, Hacker News.
10. Cron-like or interval tokens as dates: "clean & lube the bike chain every 2w", "task xyz in 15 mins". Source: GitHub issues, Hacker News.
11. Counts in a relative clause: "2 days after this saturday", "5 days from today", "what is the weather 2 weeks from next friday", "2 days from yesterday". lingua-franca.
12. Sentences where the date is not the subject: "moms bday august 5", "english homework due wednesday", "3 days old", "5 days overdue". GitHub issues.

## Sources found but not used

- Trello Butler, Google Assistant help, Any.do help, Alexa help, Apple iPhone guide: guessed URLs returned 404 or 503, or the page showed only a table of contents. No phrases taken.
- Mastodon: search needs a login. Not used.
- Taskwarrior repo tests (`due:eom`, `due:eow`, `due:friday recur:weekdays`): only a few date values and they are command arguments. Taskwarrior docs were used in an earlier round, so skipped.
- uphy/obsidian-reminder README: only ISO examples (`@2021-08-14 09:37`), no natural language.
- Google Calendar quick-add help (support.google.com/calendar/answer/36604): returned two examples only; not enough to add.
- Home Assistant templating docs: no natural-language examples.
- Stack Overflow limit: the unauthenticated API allows about 300 requests per day, so only the top results per query were read.
