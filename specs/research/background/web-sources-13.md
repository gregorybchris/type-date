# Web sources, round 13: time zones inside date and time phrases

Focus: phrases that mention a time zone, as written in real announcements. 521 unique phrases (case-insensitive dedupe, each at most 90 characters, verbatim) in `training/gen/external/web-13.jsonl`. They come from 110 pages on about 90 sites. I fetched pages with curl and extracted phrases with a regex (time plus zone), then checked that each phrase occurs verbatim in the fetched text. To keep variety, I took at most 2 to 3 phrases per digit-shape from each page. Status feeds are repetitive ("Nov 19, 18:17 UTC"), so each is capped at 3 to 14 phrases. Licenses are "public status page", "public notice", "news article", "forum post", "mailing list archive", or as stated; phrases are for evaluation only.

I read only `training/gen/tz/families.md` in the repository.

## Sources and phrase counts

| Source | URL | License | Phrases |
|---|---|---|---|
| Kubernetes community SIG READMEs | https://github.com/kubernetes/community/blob/master/sig-list.md | Apache-2.0 | 50 |
| Square Enix FFXIV maintenance thread | https://forum.square-enix.com/ffxiv/threads/466711-The-Lodestone-Maintenance-%28Jul.-4-5%29 | forum post | 15 |
| allthings.how Marvel Rivals Season 5 | https://allthings.how/marvel-rivals-server-maintenance-season-5-downtime-end-time-and-fixes-for-stuck-in-maintenance-issues | unknown | 15 |
| GitHub Status history | https://www.githubstatus.com/history.atom | public status page | 14 |
| Zoom Status | https://status.zoom.us/history.atom | public status page | 14 |
| Twilio Status | https://status.twilio.com/history.atom | public status page | 14 |
| allthings.how Reverse 1999 maintenance | https://allthings.how/reverse-1999-3rd-anniversary-maintenance-start-and-end-times/ | unknown | 13 |
| Yardbarker Marvel Rivals season start | https://www.yardbarker.com/video_games/articles/marvel_rivals_season_1_start_times_and_maintenance_details/s1_17144_41544284 | unknown | 13 |
| Axeetech FFXIV maintenance converter | https://axeetech.com/ffxiv-maintenance-time-converter/ | unknown | 12 |
| MongoDB Status | https://status.mongodb.com/history.atom | public status page | 10 |
| Anthropic Status | https://status.anthropic.com/history.atom | public status page | 10 |
| NYSE hours and calendars | https://www.nyse.com/markets/hours-calendars | public page | 10 |
| AWS Health RSS | https://status.aws.amazon.com/rss/all.rss | public status page | 8 |
| Google Cloud Status feed | https://status.cloud.google.com/en/feed.atom | public status page | 8 |
| HubSpot Status | https://status.hubspot.com/history.atom | public status page | 8 |
| Discord Status | https://discordstatus.com/history.atom | public status page | 8 |
| Datadog Status | https://status.datadoghq.com/history.atom | public status page | 8 |
| DigitalOcean Status | https://status.digitalocean.com/history.atom | public status page | 8 |
| Vercel Status | https://www.vercel-status.com/history.atom | public status page | 8 |
| Scaleway Status | https://status.scaleway.com/history.atom | public status page | 8 |
| CircleCI Discourse maintenance post | https://discuss.circleci.com/t/upcoming-scheduled-maintenance-sunday-feb-23-2020-from-00-00-utc-to-04-00-utc/34439 | forum post | 8 |
| CTFtime upcoming events | https://ctftime.org/event/list/upcoming | public listing | 8 |
| WA7BNM Contest Calendar | https://www.contestcalendar.com/weeklycont.php | public listing | 8 |
| ARRL contest calendar | https://www.arrl.org/contest-calendar | public listing | 8 |
| DeveloperWeek 2025 schedule | https://developerweek2025.sched.com/2025-02-12 | unknown | 8 |
| Upcomer Worlds 2021 day one | https://upcomer.com/dwg-kia-vs-fpx-headline-the-schedule-for-day-one-of-the-group-stage-at-worlds-2021 | news article | 7 |
| IETF 103 newcomers list | https://mailarchive.ietf.org/arch/msg/103-newcomers/yr4jUPkVXr9UNYw6gC68QzazDac | mailing list archive | 7 |
| Atlassian Status | https://status.atlassian.com/history.atom | public status page | 6 |
| Netlify Status | https://www.netlifystatus.com/history.atom | public status page | 6 |
| Reddit Status | https://www.redditstatus.com/history.atom | public status page | 6 |
| Linode Status | https://status.linode.com/history.atom | public status page | 6 |
| OVHcloud network status | https://network.status-ovhcloud.com/history.atom | public status page | 6 |
| Orbital Radar CRS-2 NG-25 | https://orbitalradar.com/launch/falcon-9-cygnus-crs-2-ng-25 | unknown | 6 |
| npm Status | https://status.npmjs.org/history.atom | public status page | 5 |
| CircleCI Status | https://status.circleci.com/history.atom | public status page | 5 |
| Snowflake Status | https://status.snowflake.com/history.atom | public status page | 5 |
| Rocky Linux forum maintenance tag | https://forums.rockylinux.org/tag/maintenance/79 | forum posts | 5 |
| The Race F1 2026 start times | https://www.the-race.com/formula-1/f1-2026-race-start-times.md | news article | 5 |
| Time Out Cardi B tickets | https://www.timeout.com/usa/news/cardi-b-is-touring-for-first-time-in-six-years-presale-ticket-prices-and-everything-you-need-to-know-about-the-2026-little-miss-drama-tour-091725 | news article | 5 |
| MakeTechEasier Steam Next Fest | https://maketecheasier.com/steam-next-fest-october-2026-dates/ | unknown | 5 |
| Dropbox Status | https://status.dropbox.com/history.atom | public status page | 4 |
| Render Status | https://status.render.com/history.atom | public status page | 4 |
| Unity Status incident 234063 | https://status.unity.com/incidents/234063 | public status page | 4 |
| RacingNews365 Australian GP | https://racingnews365.com/2026-f1-australian-grand-prix-time-schedule | news article | 4 |
| Sunday Guardian Premier League | https://sundayguardianlive.com/sports/premier-league-football-match-today-arsenal-liverpool-chelsea-and-tottenham-fixtures-uk-kick-off-times-and-tv-schedule-283049/ | news article | 4 |
| Descartes release | https://markets.financialcontent.com/clarkebroadcasting.mymotherlode/article/gnwcq-2025-5-5-descartes-sets-date-to-announce-first-quarter-fiscal-2026-financial-results | press release | 4 |
| Eco-Business SGX-GRI webinars | https://www.eco-business.com/events/sgx-gri-sustainability-reporting-webinar-series | unknown | 4 |
| MP1st Diablo 4 season maintenance | https://mp1st.com/news/diablo-4-down-for-season-1-maintenance-and-patch-roll-out-this-july-18 | unknown | 4 |
| Heroku Status feed | https://status.heroku.com/feed | public status page | 3 |
| Slack Status feed | https://slack-status.com/feed/rss | public status page | 3 |
| Twitch Status | https://status.twitch.tv/history.atom | public status page | 3 |
| Epic Games Status | https://status.epicgames.com/history.atom | public status page | 3 |
| Nucleus Security Status | https://status.nucleussec.com/incidents/4gmlkhb5j7wp | public status page | 3 |
| AOL Guns N Roses tickets | https://www.aol.com/entertainment/guns-n-roses-2026-tour-171655269.html | news article | 3 |
| GosuGamers schedule | https://www.gosugamers.net/news/19808-the-schedule-for-the-top-4-in-east-and-west | news article | 3 |
| Farmer Bros release (EIN Presswire) | https://www.einpresswire.com/article/483800648/farmer-bros-co-to-report-third-quarter-fiscal-2019-financial-results | press release | 3 |
| Eventbrite Africa Trade Gateway | https://www.eventbrite.com/e/2002868991068 | unknown | 3 |
| Stack Up stream schedule | https://www.stackup.org/post/stack-twitch-stream-schedule | unknown | 3 |
| itch.io stream schedule post | https://itch.io/post/13189808 | forum post | 3 |
| ServiceNow RSVP Australia | https://rsvp.servicenow.com/australia | unknown | 3 |
| VGTimes Steam sale schedule 2026 | https://vgtimes.com/guides/162237-steam-sale-schedule-for-2026-dates-for-all-festivals-and-seasonal-discounts.html | unknown | 3 |
| Bandai Namco maintenance notice | https://www.bandainamcoent.com/news/maintenance-notice-july-26 | public notice | 3 |
| NFL Week 12 schedule change | https://www.nfl.com/news/week-12-schedule-change | public notice | 3 |
| SportBusy NFL Week 12 | https://www.sportbusy.com/nfl-week/12/ | unknown | 3 |
| Internet2 gwe-users list | https://lists.internet2.edu/sympa/arc/gwe-users/2025-02/msg00003.html | mailing list archive | 3 |
| Hetzner Status | https://status.hetzner.com/en/ | public status page | 2 |
| IETF 121 agenda | https://datatracker.ietf.org/meeting/121/agenda.txt | IETF Trust | 2 |
| NASA SpaceX resupply coverage | https://www.nasa.gov/news-release/nasa-sets-coverage-for-next-spacex-resupply-launch-to-space-station-4/ | public domain | 2 |
| Game Informer Partner Showcase | https://gameinformer.com/psa/2026/02/04/nintendo-direct-partner-showcase-announced-for-tomorrow | news article | 2 |
| VGC Nintendo Direct | https://www.videogameschronicle.com/news/nintendo-has-confirmed-that-its-next-nintendo-direct-will-take-place-tomorrow/ | news article | 2 |
| AOL Conan Gray tickets | https://www.aol.com/entertainment/tickets-conan-grays-2026-wishbone-103021721.html | news article | 2 |
| AOL Morgan Wallen tickets | https://www.aol.com/entertainment/buy-tickets-morgan-wallens-2026-200212206.html | news article | 2 |
| Gamereactor EWC fixtures | https://www.gamereactor.eu/esports-world-cup-2026-here-are-the-crossfire-groups-and-opening-fixtures-1761023/ | news article | 2 |
| Timesaver Worlds 2026 schedule | https://timesaver.gg/blog/worlds-2026-schedule-times | unknown | 2 |
| The Nigeria Lawyer Warri webinar | https://thenigerialawyer.com/55-years-in-practice-nba-warri-branch-to-host-webinar-with-chief-t-j-o-okpoko-san-offering-legal-career-insights-and-a-cpd-point | news article | 2 |
| FBSchedules NFL Week 12 | https://fbschedules.com/nfl-schedule-2026-raiders-browns-flexed-to-sunday-night-football-in-week-12/ | unknown | 2 |
| Fox Sports NFL Week 12 2025 | https://www.foxsports.com/articles/nfl/2025-nfl-week-12-schedule-dates-times-channels-how-to-watch | unknown | 2 |
| Internet2 gwe-users list 2022 | https://lists.internet2.edu/sympa/arc/gwe-users/2022-10/msg00000.html | mailing list archive | 2 |
| TweakTown State of Play times | https://www.tweaktown.com/news/107871/watch-playstation-state-of-play-official-start-times-here/index.html | unknown | 2 |
| NASA crew launch coverage | https://www.nasa.gov/news-release/nasa-sets-coverage-for-crew-launch-to-join-station-expedition/ | public domain | 1 |
| Space Launch Schedule | https://www.spacelaunchschedule.com/space-news/nasa-sets-coverage-for-northrop-grumman-crs-25-launch-prelaunch/ | unknown | 1 |
| Game Informer Nintendo Direct | https://gameinformer.com/nintendo-direct/2026/06/08/nintendo-direct-announced-for-tomorrow-june-9 | news article | 1 |
| Kotaku Nintendo Direct | https://kotaku.com/nintendo-direct-tomorrow-summer-2026-2000703945 | news article | 1 |
| VGC State of Play | https://www.videogameschronicle.com/news/how-to-watch-todays-playstation-state-of-play-live-stream/ | news article | 1 |
| FFXIV Lodestone notice | https://na.finalfantasyxiv.com/lodestone/news/detail/4c39558615807de45d7d7e7cdb35e6ed2d7f53dd | public notice | 1 |
| RotoWire IEM Katowice | https://www.rotowire.com/esports/article/lol-recap-iem-katowice-day-1-32350 | news article | 1 |
| Xtalks webinar listing | https://xtalks.com/tag/earth-day-2024/ | unknown | 1 |
| California Hospital Association briefing | https://calhospital.org/legislative-staff-briefing-hospital-101-participant-info/ | unknown | 1 |
| Dell earnings call notice | https://briefglance.com/companies/dell-technologies-inc/pulses/49467 | unknown | 1 |
| Zumiez earnings release | https://finviz.com/news/386393/zumiez-inc-to-report-fiscal-2026-second-quarter-results | press release | 1 |
| Hawksford webinar | https://www.hawksford.com/webinars/singapore-gateway-to-southeast-asia | unknown | 1 |
| The Nigeria Lawyer NBA webinar | https://thenigerialawyer.com/register-now-nba-to-host-webinar-on-climate-competent-lawyering-and-esg-in-legal-education | news article | 1 |
| The Nigeria Lawyer mediation webinar | https://thenigerialawyer.com/register-now-for-webinar-on-strengthening-justice-sector-in-africa-through-mediation | news article | 1 |
| WIPO Nigeria webinar series | https://www.wipo.int/web/office-nigeria/w/news/2025/wipo-nigeria-monthly-webinar-series-march-2025-edition | public notice | 1 |
| UNILAG webinar | https://unilag.edu.ng/?p=57871 | unknown | 1 |
| Microsoft AI Agents Hackathon | https://microsoft.github.io/AI_Agents_Hackathon/submission | MIT | 1 |
| Builder.io hackathon rules | https://www.builder.io/hackathon/rules | unknown | 1 |
| MIT RAISE Global AI Hackathon | https://raise.mit.edu/global-ai-hackathon-2025 | unknown | 1 |
| DEV challenge | https://dev.to/challenges/wlh | unknown | 1 |
| Humanitix webinar 1 | https://events.humanitix.com/webinar-mastering-emission-factors-for-carbon-reporting/contact | unknown | 1 |
| Humanitix webinar 2 | https://events.humanitix.com/power-and-privilege-introduction-to-using-them-well/contact | unknown | 1 |
| Humanitix webinar 3 | https://events.humanitix.com/introduction-to-future-stories-fund/contact | unknown | 1 |
| UOW Alan Owen lecture | https://virtualevent.uow.edu.au/alanowenlecture2021/1627817 | unknown | 1 |
| TechWiser Steam sale schedule | https://techwiser.com/next-steam-sale-schedule-countdown/ | unknown | 1 |
| Sportskeeda R6 maintenance | https://hindi3.sportskeeda.com/esports/rainbow-six-siege-x-server-maintenance-september-2-2025-maintenance-schedule-expected-downtime | unknown | 1 |
| ProFootballTalk Week 12 | https://nbcsports.com/nfl/profootballtalk/rumor-mill/news/week-12-has-nine-different-windows | unknown | 1 |
| perfSONAR user list | https://lists.internet2.edu/sympa/arc/perfsonar-user/2017-04/msg00116.html | mailing list archive | 1 |
| Globus list | https://lists.internet2.edu/sympa/arc/globus2-22/2022-02/msg00000.html | mailing list archive | 1 |
| Chess.com stream times announcement | https://www.chess.com/announcements/view/stream-times-for-this-week | unknown | 1 |
| AI Deadlines conferences.yml | https://raw.githubusercontent.com/paperswithcode/ai-deadlines/gh-pages/_data/conferences.yml | MIT | 1 |

## Kinds of variation seen

- Status pages state almost everything in UTC (GitHub, Cloudflare, Datadog, Vercel, Netlify, Linode, Snowflake, Scaleway). Some use the company's home zone: PST/PDT (Zoom, Twilio, Discord, Reddit), ET/EST (HubSpot), CET (Scaleway), BST (Google Cloud), PT plus UTC pairs (Anthropic).
- Ranges put the zone once at the end ("from 20:05 to 21:02 UTC", "between 19:16 and 19:34 UTC"), on both ends ("9:00 AM ET - 12:00 PM ET"), or after a date ("Dec 4, 04:00 PST - Dec 5, 10:00 PST").
- Game and esports pages list one moment in 4 to 9 zones, often as a column per region ("Japan Standard Time (JST) 7 pm") or as one slash line ("2pm PT / 5pm ET / 10pm BST / 11pm CEST").
- Sports and ticket pages say "ET" or "local venue time" with no zone conversion. Ticket on-sale text uses "10 a.m. local time" for all venues.
- Ham radio, CTF and conference deadlines use 4-digit times with Z or UTC suffix and no colon.
- Regions: US (PT, ET, CT, MT, EST, PST, PDT), UK (BST, GMT, "UK"), EU (CET, CEST, EEST), Japan (JST), Korea (KST, "JST/KST"), Singapore (SGT, "Singapore time (UTC+8)"), India (IST, "India Standard Time"), Nigeria (WAT), Australia (AEST, AEDT), New Zealand (NZDT), Hong Kong (HKT), China ("CST (China)"), Brazil (BRT), Russia (MSK), Baikonur time. Not seen with real use: PKT, GST, EAT, SAST, PHT, WIB. Several Indian, Gulf and Pakistani webinar pages were JS-rendered or blocked.

## Zone constructions not in `families.md`

1. Zone stated once for a whole page or table, not per time. "ALL TIMES IN PST/PDT" (chess.com stream times, https://www.chess.com/announcements/view/stream-times-for-this-week); "Times are shown in the Europe/Dublin time zone." (https://datatracker.ietf.org/meeting/121/agenda.txt, followed by bare "0930-1800" lines); "timezone: UTC-12" (ai-deadlines conferences.yml).
2. Z (Zulu) suffix on bare 4-digit times and ranges. "0000Z-0100Z, Nov 19 and 0200Z-0300Z, Nov 20"; "Submit logs by: 0330Z November 21, 2026"; "2300Z" (https://www.contestcalendar.com/weeklycont.php). Also "0000 UTC - 2359 UTC" and "Wednesday 24 October @ 1500 UTC".
3. Anywhere on Earth. "April 14, 2025 at 23:59 AOE (Anywhere on Earth)" (https://raise.mit.edu/global-ai-hackathon-2025); "timezone: UTC-12" as the encoded form.
4. Venue-local and place-named times that are not a city zone. "Friday, Oct. 24 at 10 a.m. local venue time"; "Canadian GP will begin at 4pm local time"; "4:27 a.m. EST (2:27 p.m. Baikonur time)"; "Saturday race local time; Sunday UK time".
5. Region or country in place of a zone. "Japan - 6am (September 25)" (tweaktown State of Play); "7:00 PM UK, 8:00 PM CET, 4:00 AM KST"; "Japan (JST) 12:00 AM".
6. Zone label first, as a table row. "Pacific (PST) 7:00 AM"; "Pacific Daylight Time (PDT) 3 am"; "CET 22:30"; "Eastern (AEDT) 2:00 AM" (a mislabel in the source).
7. Slash or comma joins with no spaces or mixed abbreviations. "10:00 BST/11:00 CEST"; "20:00-21:00 JST/KST"; "7am PT/10am ET"; "8AM PDT, 11 AM EDT, 5 PM CEST".
8. Conversion that crosses a date boundary, with a second date inside the parentheses. "November 17th at 6:00 pm PST (November 18th 0200 UTC)"; "04th December 2026 04:00 AM PST (5:30 PM IST on 04th December 2026)"; "July 18, 1 pm PT/4 pm ET" then "July 19, 4 am HKT".
9. Recurrence plus zone gloss plus cadence. "Tuesdays at 9:00 PT (Pacific Time) (biweekly)"; "Wednesdays at 05:30 UTC (monthly - Wednesday, after the fourth Tuesday, every month)"; "Mondays at 15:00 UTC (first Monday of the month)"; "Tuesday (starting September 10th 2024)s at 08:00 PT (Pacific Time)" (https://github.com/kubernetes/community/blob/master/sig-list.md).
10. Offset spelled with a space or after a zone name. "12:30 AM EST (UTC -05:00)"; "26 October at 10:00 PDT (UTC-7)"; "2026-11-14 00:40 UTC+0".
11. Local time and UTC both given with a slash. "August 13, 2026, 10:00 am (UTC-5) / 15:00 UTC"; "00:56 PT / 08:56 UTC"; "15:00 UTC (7:00 AM PST, 10:00 AM EST, 3:00 PM GMT)".
12. Compact ISO date plus colonless time plus zone. "2025-10-12 0500 UTC"; "2021-11-01 0500 UTC (Complete)"; "2025-08-09 0500 UTC" (https://forums.rockylinux.org/tag/maintenance/79).
13. Zone with dot time or unusual spacing. "12.45pm local time start"; "Wed, 26 Mar 2025, 4pm - 4:45pm PDT"; "11:00 a.m. – 12:00 p.m., PT" (comma before zone); "8pm-midnight EST".
14. Date in parentheses after the zone, or duration after it. "12:29 BST) (duration 5 hours, 29 minutes"; "Thursday, October 29 • 11 AM - 12:30 PM WAT".
15. RFC 822 date with abbreviation and numeric offset together. "Tue, 23 Oct 2018 17:13:32 -0700 (PDT)"; "Sat, 21 Nov 2026 02:07:15 PST" (AWS feed uses the abbreviation alone).
16. Named zone in words after a time, mixed with another. "10:00 AM Pacific Time (11:30 PM India Standard Time)"; "2:00 AM Pacific (or 9:00 PM Sydney)"; "every Thursday at 9am - 11am Singapore time (UTC+8)".
17. Weekday-only, no date. "Friday at 7 a.m. ET"; "Wednesday 7pm EST"; "Tuesday at 08:00 UTC" (stream and game reset schedules).

## Sources found but not usable

- Fetched pages that returned no text (JS-rendered or blocked): Codeforces, AtCoder, LeetCode, CME trading hours, BLS schedule, Meetup, Luma, Devpost, Kaggle, Steam news, PlayStation Blog, Nintendo, live.icai.org, Business Wire, Barchart, nasdaq.com, sched.com list pages, hackster.io rules, FFXIV Lodestone category pages, EVE Online, Liquipedia.
- Status feeds with no usable zone text: Cloudflare (ISO timestamps with Z only), Fivetran, Docker, OpenAI, Linear, Stripe, Zendesk, Shopify.
- Searches for embargo notices ("00:01 GMT"), "8/7c" TV listings, flight itineraries and Russian webinars ("МСК") returned pages with no extractable zone phrases. The WebSearch tool does not honor exact-phrase queries. The airline-itinerary type is therefore thin; only "local time" notes were seen.
- Pages in the Twilio, Slack, Heroku and other feeds repeat the same shapes; I kept only a few per source.
