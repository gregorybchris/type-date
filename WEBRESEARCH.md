# Task: collect real-world phrase variety for natural-language date and time input

Project: a small parser that turns what people type into a date, time, range, or recurrence ("last friday", "every other sunday", "4 to 4:30", "weekends since october"). We need a much larger and more varied evaluation set. Your job is web research: find public sources that show how people actually write and type dates, times, ranges, and repeating schedules, and extract short example phrases with provenance.

Rules:
- Use WebSearch and WebFetch. Prefer raw text sources (GitHub raw files, documentation pages, help centers, forum threads). Skip anything behind a login. Do not mass-scrape: fetch what you need.
- Extract only short date/time phrases (at most 90 characters each), as people would type them into a quick-add box. Facts and short example phrases only: do not copy long passages of prose. Keep the phrase exactly as written in the source (including odd casing and typos). If a source shows a sentence with a date buried inside, keep the sentence if it is short.
- Record provenance for every phrase: source name, URL, and a license note (for example "MIT", "docs example", "forum post", "unknown"). Phrases are used for evaluation only.
- Do not read anything in the repository except `specs/research/coverage-taxonomy.md` (to see what families we already know about). Do not run the repository's code.
- Aim for at least 400 unique phrases, with as much variety as possible: across phrasing styles, regions (UK, US, AU, IN), recurrence forms, relative forms, formats, languages of expression (informal, formal, shorthand), and families we do NOT have in the taxonomy. Look for what we are missing and say so.
- Dedupe your phrases (case-insensitive).

Outputs:
1. `training/gen/external/web-<N>.jsonl`: one line per phrase: {"text": "...", "source": "...", "url": "...", "license": "...", "note": "optional: what the phrase illustrates"}. (N is given in your instructions.)
2. `specs/research/background/web-sources-<N>.md`: a concise note (plain, concrete prose, no filler) with: the sources you used (name, URL, what it covers, license), how many phrases you took from each, the main kinds of variation you saw, and a list of NEW FAMILIES or constructions that our taxonomy lacks (with 3 example phrases each and the URL). Also list sources you found but could not use, and why.

Reply with only a short summary: phrase count, number of sources, and the top 8 new families you found.
