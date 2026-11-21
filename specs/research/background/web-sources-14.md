# Web sources, round 14: time zones inside date and time phrases

Focus: phrases that mention a time zone, as people type and ask them. Collected 2026-11-21. Output: `training/gen/external/web-14.jsonl` (693 unique phrases, case-insensitive dedupe, all at most 90 characters). Read from the repo: only `training/gen/tz/families.md`.

## Method and limits

- WebFetch returns summaries, so each fetch prompt asked for exact quotes. Items below are what the fetch tool reported as verbatim. I could not check them against the raw pages.
- Reddit, the Stack Exchange API and superuser.com are blocked for these tools. Apple Community, Discord support and AppleVis returned a redirect or 403. No Quora or Nairaland thread was reachable.
- The best raw-text source was the Hacker News Algolia comment search (JSON of comment text). One site, 39 queries, 440 phrases. It is a developer forum, so it skews toward US, UK, EU and India tech talk.
- Search-result titles and URL slugs of converter sites are real query styles, so they are included as phrases (flagged in `note`). They are lowercase slugs, not typed text.
- Windows zone display names are composed from the UTC and description columns of the Microsoft table (for example "(UTC-05:00) Eastern Time (US & Canada)"). The page lists them as two columns, not as one string.
- Slack, Teams and Discord docs gave few phrases (Slack fallback text, one Discord article). Their zone handling is "show the viewer's local time", so docs contain few typed zone phrases.

## Sources and counts

Hacker News (https://hn.algolia.com/api/v1/search, tags=comment; license: forum comments, unknown): 440 phrases from 39 queries. Each row's `url` holds its query. Queries used: 3pm EST, 9am PST, 10am PT, 5pm CET, 8pm GMT, IST timezone, timezone abbreviation IST, PST PDT daylight saving meeting, UTC+1, UTC-5, GMT+8, UTC+5:30, noon UTC, JST time, SGT, and the "X time" forms London, Tokyo, New York, Beijing, Moscow, Sydney, Berlin, UK, India, "my time", "your time", Eastern, Mountain, Pacific.

Other sources (phrases kept):

| Source | URL | Covers | License | Phrases |
|---|---|---|---|---|
| Microsoft Learn, Default Time Zones | https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones | Windows zone names and "(UTC+hh:mm) cities" labels | docs | 57 |
| timeanddate.com zone pages (aest, cst, ist, abbreviation list) | https://www.timeanddate.com/time/zones/aest | zone names, ambiguous abbreviations | web page | 32 |
| Savvytime converter pages | https://savvytime.com/converter/est-to-ist-pst | URL slugs with multi-zone chains, dates, times | web page | 26 |
| 24timezones difference pages | https://24timezones.com/difference/cst/est/3pm | slugs with zone, city, generic names and an hour | web page | 18 |
| Converter titles from search results (iformat.io, cal.com, time.now, others) | https://iformat.io/convert-4-pm-est-to-cst | search-engine style queries | web page | 16 |
| IANA tz mailing list, Australian abbreviations | https://mm.icann.org/pipermail/tz/2013-March/018837.html | EST in Australia, link texts of Australian sites | public archive | 12 |
| Code of Matt, Time Zone Abbreviations | https://codeofmatt.com/time-zone-abbreviations/ | zone names, French abbreviations | blog | 12 |
| time.now PST to ET | https://time.now/tool/pst-to-et-converter/ | converter copy, "PST 9:00 AM" order | web page | 10 |
| Every Time Zone | https://everytimezone.com/ | zone labels, "A vs B" links | web page | 10 |
| Wikipedia, List of time zone abbreviations | https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations | PHT, WAT, BRT, GST, SGT, MSK names | CC BY-SA | 9 |
| ConvertTime blog | https://converttime.com/en/blog/time-zone-abbreviations-explained | sentences with IST, JST, EST | blog | 8 |
| WorkIndia IST to EST guide | https://harshit1711.github.io/ist-to-est-guide.html | India-facing FAQ and examples | web page | 8 |
| Roll20 forum thread | https://app.roll20.net/forum/permalink/658 | player scheduling posts | forum post | 7 |
| Timezones converter blog (abbreviations vs IANA) | https://timezonesconverter.netlify.app/blog/time-zone-abbreviations-vs-iana-ids | "CST at 10am?", IANA ids | blog | 7 |
| Mac Power Users, Convert Time Zones with Siri? | https://talk.macpowerusers.com/t/convert-time-zones-with-siri/31991 | voice and typed questions | forum post | 4 |
| WorldTimeBuddy EST to IST | https://www.worldtimebuddy.com/est-to-ist-converter | converter copy | web page | 4 |
| Freshworks community thread | https://community.freshworks.com/apps-and-marketplace-integrations-11358/microsoft-365-integration-always-est-and-can-it-be-a-ms-teams-23266 | PST vs EST calendar mismatch | forum post | 2 |
| MoneySavingExpert, bst to gmt | https://forums.moneysavingexpert.com/discussion/5884029/bst-to-gmt | UK BST and GMT wording | forum post | 3 |
| Slack formatting docs | https://docs.slack.dev/messaging/formatting-message-text | date-token fallback text with PST | docs example | 3 |
| Zapier, Discord timestamps | https://zapier.com/blog/discord-timestamps.md | "3 p.m. Eastern Standard Time" | blog | 2 |
| WIFNGUK Substack reminder | https://wifnguk.substack.com/p/webinar-begins-in-one-hour | Nigeria and UK times side by side | newsletter | 2 |
| worldtimeserver PHT to EST | https://www.worldtimeserver.com/time-zones/pht-to-est/ | Philippines table cells | web page | 2 |
| Microsoft Q&A, OWA meeting zone | https://learn.microsoft.com/en-us/answers/questions/5775254/owa-meeting-time-shows-incorrect-time-zone-using-m | invite with a typo "Eastem European Time-Cairo" | forum post | 2 |
| Gadget Hacks, iOS time conversion | https://ios.gadgethacks.com/how-to/convert-dates-times-different-time-zones-ios-without-leaving-app-youre-0384214/ | "9:45p London" | article | 1 |

Counts are approximate to the nearest source entry; the JSONL is the exact record. That is 23 sites, 64 source entries. This is below the 25-source target.

## Kinds of variation seen

- Same hour written 20+ ways: "3pm EST", "3PM EST", "3pm est", "3 pm Eastern", "344 PM EST", "4ET", "1445 JST", "630 cst".
- Zone words: abbreviation, generic ("Pacific time", "Eastern"), city ("Sydney time"), country ("UK time", "India time"), IANA, offset, "local time", "my time", "your time".
- Ranges often carry one zone at the end and no am/pm: "10-7 Beijing", "3 - 7 London time", "12 - 4 Pacific Time", "2-3pm EST".
- Several zones for one moment, joined by "/", parentheses, "=" or a dash: "10am PT/1pm ET", "10:05 UTC/5:05 EST", "Saturday 6 Feb 8pm GMT/UK | 12pm Pacific | 3pm Eastern US".
- Regional habit: India (IST, "India time", "UTC+5:30"), Nigeria (WAT, "UTC+1"), Philippines (PHT, "GMT+8"), UK (BST/GMT mixing), Australia (EST/AEST), Russia ("Moscow time"), China ("Beijing time"), Japan ("JST"). I found no real Brazil, Gulf or NZ typed phrases beyond zone names and slugs.
- HN posters correct each other: "technically incorrect to say PST when it's currently PDT".

## Constructions not in training/gen/tz/families.md

1. Speaker's own zone as a label, not a time ("Location: ..." in profiles). "Location: Lagos, Nigeria (WAT, UTC+1: full overlap with EU hours)"; "Timezone: IST but fully flexible for EST/PST meetings"; "I am in EST, right now." (HN)
2. Compact digits with a zone and no colon or am/pm. "630 cst"; "1445 JST"; "344 PM EST"; "0800 London time"; "@ 0230 hrs, berlin time"; "4ET". (HN)
3. Bare-hour ranges ending in a city or zone. "10-7 Beijing"; "3 - 7 London time"; "12 - 4 Pacific Time"; "9-5 Moscow time". (HN)
4. Anywhere on Earth deadlines. "March 31, 2025 AoE."; "we extended the deadline to February 12th (anywhere on Earth)"; "to the end of Sunday, August 6, anywhere on Earth". (HN)
5. "A vs B" and arrow comparisons. "New York vs London"; "pacific time vs. eastern time"; "PST <-> IST timezone meeting gap". (everytimezone, HN)
6. Date or day interpreted inside a zone. "March 7th (Sydney time)"; "on a Sunday (Berlin time)"; "2019 May 26 at 2:45 pm in New York"; "11pm the day before in LA". (HN)
7. Zone before the time. "Alberta time 05:00"; "New York time 14:25"; "PST 9:00 AM"; "EST 3pm" style in converter copy. (HN, time.now)
8. Fuzzy times with a zone. "6:15ish pm Pacific Time"; "around 2 or 3 PM Mountain Time"; "roughly between 2PM and 11PM UK time". (HN)
9. Zone-labelled day part or deadline wording. "9:00 PM on Friday night (Pacific time)"; "By 9AM PST on Friday Nov. 4th"; "until 9am PST 12/20/17"; "9am PST tomorrow". (HN)
10. Possessive or relative zone words in questions. "is that my time or your time"; "8pm their time"; "5am local time for me"; "what is 2PM Eastern in my time zone?" (HN, Mac Power Users)
11. Single words used as zones. "Noon East"; "9:45p London"; "4ET"; "3pm pacific or mountain?". (HN, Gadget Hacks)
12. Wrapped programming formats inside prose. "Wed Mar 02 2022 10:35:00 GMT-0800 (Pacific Standard Time)"; "2021-10-11T12:13:14[America/New_York]"; "resets 2:56am (Etc/GMT+8 ...)" where Etc/GMT+8 is UTC-8. (HN)
13. Windows and Outlook display strings with offset first. "(UTC-05:00) Eastern Time (US & Canada)"; "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi"; "(GMT-12:00) International Date Line West". (Microsoft, everytimezone)
14. Converter URL and title slugs as queries. "est to ist pst"; "utc to est pst jun 9 2022 9am"; "convert 4 pm est to cst". (Savvytime, iformat)
15. Zone names in other languages. "heure normale de l'Est"; "Tiempo Central Estándar (CST, Spanish)"; "Heure Normale du Centre (HNC, French)". (timeanddate, Code of Matt)
16. Mixed standard and daylight wording in one phrase. "9AM PST instead of 9AM PDT"; "At 1:59 AM Pacific Daylight time"; "12 PM Pacific time (PDT)"; "the usual 2026-03-08 02:00 switch from PST to PDT". (HN)
17. Alternative zone spelled with a typo or odd form in an invite. "Eastem European Time-Cairo"; "At 0045 uK TiMe"; "2:00AM GreenwichMeanTime". (Microsoft Q&A, HN)
18. Compound zone abbreviation with optional letters. "CE(S)T" in "every second Monday from 10-11am CE(S)T". (HN)
19. City annotation placed after another zone. "8 AM PDT (Seattle time)"; "4 PM BST (London time)"; "9pm (Midnight Moscow time)". (HN)
20. Game or product clock. "They used Pacific Time as their in-game clock"; "10:30 gt"; "resets 2:56am". (HN)

## Ambiguous abbreviations people argue about

- CST: US Central, China, Cuba, Australian Central. Also "CST is not the same thing as CDT".
- IST: India, Ireland, Israel (Iran in one blog). HN: "try Ireland, Israel, and India for IST".
- BST: British Summer Time, Bangladesh, Bougainville. UK posters also say "GMT" in summer, which people call wrong.
- EST: US Eastern vs Australian Eastern (UTC+10 or +11). Australians also write "EST/EDT". Many US posters use EST in summer when they mean EDT ("EST is not EDT").
- PST used in summer ("9am PST" when PDT applies) and "PT" or "ET" as the safe generic form.
- GMT: used loosely for UK time in summer; one poster notes it is "now ambiguous".
- MST vs Mountain Time (Phoenix does not change).
- AST: Atlantic vs Arabia. GST: Gulf vs South Georgia.
- AEST vs AET vs AEDT: whether the label includes daylight time.
- CET/CEST: people write "CET" all year.

## Sources found but not usable

- Reddit (search.json, r/ pages): blocked for the fetch tool and search filters. This was the main gap for "what is 9am EST in IST" threads.
- Stack Exchange API, superuser.com: blocked. english, travel and workplace threads were not reached.
- Apple Community threads: redirect to support.apple.com. AppleVis comments: 403.
- Discord support community posts: 403. Discord developer docs: not returned by search.
- Quora, Nairaland, Whirlpool: no result surfaced for the queries. Nairaland shut down 2023-12-18 per a search result.
- Microsoft Teams and Outlook support pages: 404 or summaries only, no phrases.
- dev.to (404), iformat.io page (410), datetime360 and cal.com (403/404), kiwix mirror (redirect).
- Voice assistants: only user reports of what works ("If it's 2pm pacific time what time is it in eastern" on Alexa). No transcripts of Siri or Google Assistant output.
- timeanddate.com converter: JavaScript widget, no example queries in the fetched text.
