# Time zones inside date phrases: what the collected data shows

Round of 2026-11-21. Nothing here is labeled yet and no DSL or engine change is made. This note records what was collected, what the pool shows, and the decisions needed before labeling.

## Data

| Set | Rows | Role | Notes |
|---|---|---|---|
| tz-w1, tz-w3, tz-w6 (LLM writers) | 302, 301, 301 (288 in pool after dedupe) | pool | remote engineering lead; gaming, streaming and status pages; travel and family events |
| tz-w4, tz-w5 (LLM writers) | 307, 302 | sealed | voice and non-native English; terse quick-add and chat |
| web-12 | 1,049 | pool and sealed by source | parser tests, standards, library docs and issues (61 sources) |
| web-13 | 521 | pool and sealed by source | announcements, status pages, schedules, READMEs (110 pages) |
| web-14 | 693 | pool and sealed by source | questions, converters, Windows names (64 sources; 440 rows from one Hacker News search, all in the sealed part) |

After dedupe: 3,757 phrases, 2,320 pool (891 writer, 1,429 web) and 1,437 sealed. Sealed means writers 4 and 5 and every web source with `sha1(source) mod 10 < 3`. The sealed rows were not mined. Split and counts: `training/gen/tz/patterns.py split`.

Not usable: tz-w2 (discarded: 197 of 322 rows copied writer 4's). Its replacement is tz-w6. Writers wrote 5 or fewer notes per set on unusual constructions in most sets, so the writer notes carry little signal. The three web reports (read before this split) named constructions in all three web rounds; those are design-level facts and are listed below. 136 rows of web-12 repeat rows already in earlier pools, evals or web rounds 1 to 11 and will be dropped at labeling.

## What the pool shows (`patterns.py stats`, regex classifier, approximate)

Share of pool rows with each construction. A row can have several.

| Construction | Writers | Web | Examples (pool) |
|---|---|---|---|
| Abbreviation | 63% | 65% | "5pm CST (China)", "retro 2pm BST (British Summer Time)" |
| Exactly one abbreviation and nothing else | 43% of all pool rows | | "3pm EST" shape |
| Two or more zones for one moment | 32% | 30% | "10:00 PST (18:00 GMT)", "retro Thurs 4pm CET / 10am ET / 7am PT", "maint 02:00 UTC = 21:00 EST Fri = 10:00 JST" |
| Place plus "time", or a place name | 23% | 19% | "7:30 India", "New York time 14:25", "review 4pm Stockholm" |
| Numeric offset | 14% | 21% | "UTC+5:30", "GMT-8", "10:00 am (UTC-5) / 15:00 UTC" |
| ISO 8601 offset after seconds | 2% | 9% | "2010-02-04T21:00:57+0800" (machine text, mostly web-12) |
| Date plus time plus zone | 8% | 40% | "Mon Nov 29 2020 13:24:13 GMT+0900" |
| Time range plus zone | 5% | 14% | "10-7 Beijing", "weekends 11am-1pm Pacific", "8pm-midnight EST" |
| Recurrence or bound plus zone | 8% | 4% | "Thursdays at 9:00 PT (Pacific Time)", "daily standup 10:00-10:15 IST mon-fri", "daily 11am-11:30am EST until jan 15" |
| Daylight saving wording | 6% | 4% | "EST not EDT please", "call 1pm Mountain Standard Time" |
| Conversion or comparison | 6% | 3% | "5pm IST in EST?", "If it's 2pm pacific time what time is it in eastern" |
| Local or relative to the speaker | 6% | 1% | "ceremony 4pm local time", "can we do 11 your time tmrw", "Maintenance 03:00 server time Sunday" |
| Zone name or generic | 6% | 11% | "Pacific Time", "Mountain Standard Time" |
| Bare zone word without "time" | 2.5% | 1% | "tomorrow, 10 central", "5:00 pm Eastern", "interview 11am Central tuesday" |
| A place after "in" | 2.4% | 1.6% | "1pm in Toronto", "class mon 7pm in Singapore" |
| Dotted or spaced abbreviation | 0.6% | 1.7% | "8pm P.S.T. tonight", "sunday 4pm  e s t", "sync 3 p.m. C.E.T." |
| Zone-like word that is not a zone | 2% | 0.1% | "pacific rim brunch 11am", "offsite at eastern market sat 9am", "pst me the deck before 3pm" |
| Other language (non-ASCII or Dutch and French) | 0.2% | 4% | "Je suis dans le fuseau horaire du Pacifique" |
| "time zone" or "tz" mentioned | 0.7% | 2.4% | "10am my tz" |
| IANA name | 1.5% | 1.7% | "america/los_angeles 9am dec 1" |
| Slash-joined zones | 0.6% | 0.9% | "10 Jan 2020 10:00 CET/CEST" |
| Windows display string | 0.1% | 0.9% | "(UTC-05:00) Eastern Time (US & Canada)" |
| Bracketed zone suffix | 0.1% | 0.9% | "2021-11-12T09:07:13.000+08:00[Australia/Perth]" |
| Anywhere on Earth | 0 | 0.2% | "23:59 AoE" |
| Fuzzy time plus zone | 0 | 0.9% | "6:15ish pm Pacific Time" |

Only 92 of 2,320 pool rows match nothing: other-language sentences, typos ("9am Eastren", "noon pacfic"), places with no "time" ("review 4pm Stockholm", "8 pm Tokyo / 7 am New York").

Abbreviation counts in the pool: UTC 454, GMT 186, PST 156, EST 150, PT 127, CET 88, ET 83, IST 82, PDT 61, Z 49, BST 46, EDT 41, CST 36, JST 30, CDT 27, MST 27, CEST 21, AEDT 17, AEST 13, SGT 12, MSK 9, KST 9, WAT 8. PKT, PHT, WIB, EAT, GST and NZST are under 3 each.

Ambiguous abbreviations rarely come with a hint (a word such as a country, city or region next to them): IST 11 of 78 rows, CST 10 of 31, BST 7 of 46, EST 7 of 132, PST 3 of 139, MST 1 of 26. For about 85% of the ambiguous mentions the only available signal is the user's own zone or locale.

## Constructions the family list (A to M) did not have

1. Several zones for one moment are common (about a third of rows), with many joiners: `/`, `=`, parentheses, commas, `|`, `->`, "in", "vs". Often the second part is a date change ("9am Sydney = 6pm prev day LA", "November 17th at 6:00 pm PST (November 18th 0200 UTC)").
2. Bare region words with no "time": "10 central", "5:00 pm (Pacific)", "interview 11am Central tuesday".
3. A place instead of a zone, with and without "time" or "in": "review 4pm Stockholm", "1pm in Toronto", "10-7 Beijing", "7:30 India", "US-East".
4. Zone before the time: "PST 9:00 AM", "Alberta time 05:00", "New York time 14:25", GNU `TZ="Europe/Paris" 2022-10-31 06:30`.
5. Compact 4-digit times with a zone and no colon: "630 cst", "1445 JST", "0000Z-0100Z, Nov 19", "2025-10-12 0500 UTC".
6. Zone stated once for a page or table: "ALL TIMES IN PST/PDT", "Times are shown in the Europe/Dublin time zone.", "all times UTC: Sat 18:00 start".
7. Anywhere on Earth deadlines: "23:59 AoE", "end of Sunday, August 6, anywhere on Earth".
8. The speaker's own zone as a label: "Location: Lagos, Nigeria (WAT, UTC+1)", "I am in EST, right now."
9. Venue-local and server-local: "10 a.m. local venue time", "03:00 server time", "2:27 p.m. Baikonur time".
10. Slash-joined DST pairs: "CET/CEST", "PST/PDT"; a zone that changes across a series ("(1997 9:00 AM EDT) September 2-30").
11. Zone glued to digits with no space or a unicode minus: "5pmEST", "2019-09-28WIB19:17:34+07:00", "jan 15th UTC−06:00".
12. Bracketed or iCalendar forms: `[Australia/Perth]`, `DTSTART;TZID=America/New_York:19980119T020000`.
13. Windows and Outlook display names: "(UTC-05:00) Eastern Time (US & Canada)", "(GMT-12:00) International Date Line West".
14. Recurrence with a zone and a cadence gloss: "Tuesdays at 9:00 PT (Pacific Time) (biweekly)", "Mondays at 15:00 UTC (first Monday of the month)".
15. Corrections and arguments: "12:00 PET, thats Peru not Pacific", "I said New York time, not York time", "EST (not EDT)".
16. Zone-like words that are not zones (about 2% of writer rows, about as many as other rare constructions): "central team standup", "mountain view 2pm", "pacific rim brunch".
17. Typos and odd spacing of zone words: "Eastren", "pacfic", "e s t", "P.S.T.", "GreenwichMeanTime".
18. A date or day read inside a zone: "March 7th (Sydney time)", "11pm the day before in LA".
19. Other-language zone phrases (French, Dutch, Korean, Spanish, Hindi): out of scope (see `specs/research/coverage-taxonomy.md`).

## Decisions needed before labeling

Each has my recommendation. They change what the DSL and the labels look like.

1. **Which time is the label when a phrase gives one moment in several zones?** Recommend the first (time, zone) pair, and the rest are conversions that are ignored. This follows the existing rule for several dates in one message. Conversion questions ("5pm IST in EST?") label the first pair.
2. **How is a zone written in the DSL?** Recommend an optional suffix on the time: an IANA name when the zone is identified (`dt +1d 09:00 @America/Los_Angeles`), a fixed offset when only an offset is given (`@+05:30`). An ambiguous abbreviation is labeled by the stated context (see 8).
3. **A recurrence with a zone.** Recommend the zone applies to every occurrence in that zone's wall-clock time, so DST shifts are the zone's, not the user's.
4. **"local time", "my time", "your time", "their time", "here", "server time", "venue time".** Recommend no zone (floating, as today). They name a speaker, not a zone.
5. **Places.** Recommend "<city> time" and "in <city>" after a time give that city's zone. A bare place after a time ("review 4pm Stockholm") and "meet in london at 3pm" are not labeled as zones (the second is a venue). Both go in as unsure or negative controls.
6. **Zone-like words that are not zones** ("pacific rim", "mountain view", "central park", "pst me"): no zone.
7. **Out of scope:** a page-level statement ("all times UTC"), other languages, iCalendar forms, JavaScript `Date.toString` dumps, Windows display names without a time. Label `x` or leave out of eval. Machine formats with an ISO offset stay in scope because the offset is exact.
8. **Context for ambiguous abbreviations.** Recommend every eval row carries a reference context (`zone`, `locale`) like it carries `today`, and rows where the label depends on it keep it. Rows with no hint and an ambiguous abbreviation (IST, CST, BST, AST) get two or three labels, one per context.
9. **An abbreviation in the wrong season** ("EST" in July). Recommend it names the zone ("America/New_York"), not the fixed offset, and the resolver uses the zone's rules at that date, with a flag.
10. **"Anywhere on Earth".** Recommend the fixed offset `-12:00`.

## Known issues

- The classifier is regex-based. Counts are approximate (the abbreviation list includes `Z`, and "ET" or "PT" can also be ordinary text).
- Writer sets share the same families in near-equal proportions because the brief gave the shares; they say little about real frequencies. The web columns are closer, but web-12 is mostly machine text and web-14 is skewed toward developer talk (440 rows from one site, all sealed).
- Two writer sets were duplicates of others in the last two rounds (see `CLAUDE.md`). The pairwise overlap among the five usable writer sets is 0 to 3 rows, except writers 5 and 6 (10 rows), removed from the pool copy before labeling.
- No real typed phrases from Brazil, the Gulf or New Zealand were found in the web rounds; those regions appear only through the writers.
