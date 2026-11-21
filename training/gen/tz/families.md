# Timezone families (round of 2026-11-21)

Goal: phrases where a person mentions a time zone inside a date or time phrase. This file lists the kinds of phrasing we already expect. It shows no output formats. We want to find kinds we have not thought of, so unusual real phrasings matter more than many copies of the common ones.

## Families

| Code | Family | Examples |
|---|---|---|
| A | Abbreviation after a time | "3pm EST", "9:30 am PST", "noon UTC", "14:00 GMT", "10 CET", "tomorrow 5pm IST" |
| B | Numeric offset | "UTC+5:30", "GMT-8", "9am (UTC+1)", "14:00 +0100", "UTC-08:00", "5pm GMT+2" |
| C | Zone name or short generic | "Pacific Time", "Eastern Standard Time", "Central European Time", "Mountain Time (US & Canada)", "PT", "ET", "CT", "MT" |
| D | City, region or IANA name | "London time", "9am in Tokyo", "noon New York time", "America/Los_Angeles", "Bay Area time", "Sydney time" |
| E | Local and relative to the speaker | "local time", "your time", "my time", "their time", "9am here", "same time in Berlin", "your local time" |
| F | Several zones for one moment | "9am PT / 12pm ET / 5pm UTC", "10am PST (1pm EST)", "3pm EST = 8pm GMT", "9am PT, 6pm CET" |
| G | Conversion questions | "3pm est in pst", "what is 5pm GMT in India", "convert 9am PT to CET", "9am london = what in nyc" |
| H | Zones with ranges, recurrences or bounds | "every monday 9-10am PT", "weekdays 9 to 5 EST", "daily 10am-12pm CST", "starting jan 5 at 8am UTC", "until dec 20 5pm ET" |
| I | Daylight saving and ambiguous abbreviations | "EST (not EDT)", "9am Eastern (EDT)", "standard time", "CST (China)", "IST (India)", "BST (British Summer Time)", "AEST/AEDT", "daylight time" |
| J | Machine and formal formats | "Tue, 24 Nov 2026 14:00:00 -0500", "2026-11-30T14:00-08:00", "2026-11-30 14:00:00 UTC", "14:00Z", log lines |
| K | Typos, case, spacing, punctuation | "3pm e.s.t", "3 pm est.", "5pmEST", "EST 3pm", "9am Eastren", "noon pacfic", "10am gmt+1" |
| L | Near misses and negatives | zone-like words that are not zones: "central park at 3pm", "eastern market sat 9am", "pst me the file", "mountain view 2pm", "pacific rim dinner 6pm", "I'm EST so", "cat at 5pm", "meet in london at 3pm" |
| M | Anything else a person might write with a zone | constructions that fit none of the above: write them and add a short note |

## Variation to cover

- Time forms: 9am, 9:00, 0900, noon, midnight, ranges (9-10, 9 to 10am), "for 90 min", 24h, a date plus time, a recurrence plus time.
- Places in the phrase: after the time, before the time, in parentheses, after a date, at the end of a sentence, in a subject line.
- Registers: terse quick-add, voice transcript, formal notice, casual chat message, status page or announcement, game or stream schedule, calendar invite, email subject, forum post.
- Regions: US, Canada, UK, Ireland, EU, India, Pakistan, Gulf, Southeast Asia, China, Japan, Korea, Australia, New Zealand, Africa, Latin America. Use each region's own habits ("IST", "SGT", "WAT", "AEST", "BRT", "MSK").
- Surrounding words: event names ("standup", "webinar", "raid night", "maintenance window"), filler ("can we do", "please", "approx").
