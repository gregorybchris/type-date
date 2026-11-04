# Dataset generation for the type-date model

Purpose: plan a training and validation dataset for a tiny model that maps typed natural-language date/time text to structured output. Each example carries tags so we can run per-tag error analysis.

Status of evidence: items marked "verified" were read in the source page during this research. Items marked "unverified" come from search summaries or prior knowledge and need a check before we rely on them.

---

## 1. Existing resources to mine

### 1.1 Parser test suites (best source of phrases)

These are the most useful for us. They hold short phrases of the kind a picker sees, with reference dates and expected values.

| Source | What it has | Use for us | Link |
|---|---|---|---|
| Duckling (Facebook) | `Duckling/Time/EN/Corpus.hs`, about 1,950 lines. Examples grouped by a reference time and grain. Exports `corpus`, `negativeCorpus` (about 27 phrases that must not parse, e.g. "1 adult", "25", "palm"), `latentCorpus`, `diffCorpus`. Phrases: "mon.", "Thu 15th", "the ides of march", "3/3/15", "tomorrow evening", "last Monday of March", "Xmas", "1960 - 1961". Verified. | Phrase mining, abbreviation variants, negatives for `non-date-noise`. Haskell format needs a one-off extraction. | https://github.com/facebook/duckling/blob/main/Duckling/Time/EN/Corpus.hs |
| chrono-node | `test/en/` has 20 files, split by phrase family: `en_casual`, `en_relative`, `en_weekday`, `en_slash`, `en_time_exp`, `en_time_units_ago`, `en_time_units_later`, `en_time_units_within`, `en_month_name_little_endian`, `en_month_name_middle_endian`, `en_year_month_day`, `en_timezone_exp`, `negative_cases`. Format: `testSingleCase(chrono, text, refDate, assertions)`. Verified. Sample strings: "end of next week", "lastmonth", "next qtr", "in 10 minutes", "tomorrow at 5pm". | Phrase mining. The file names are a ready-made family list. `negative_cases` gives non-date text. Also a candidate for the external check: run chrono on our inputs and compare. | https://github.com/wanasit/chrono/tree/master/test/en |
| Microsoft Recognizers-Text | `Specs/DateTime/English/` has 30 JSON files (Date, DatePeriod, DateTime, DateTimePeriod, Duration, Holiday, Set, Time, TimePeriod, TimeZone; Extractor and Parser variants). Entry schema: `Input`, `Context.ReferenceDateTime`, optional `NotSupported`, `Results[]` with `Text`, `Type`, `Value.Timex`, `Value.FutureResolution`/`PastResolution` (start/end), `Start`, `Length`. Verified. Inputs are often sentences ("I'll be out from 4 to 22 this month"), so extract the matched `Text` span. | Best structured gold: TIMEX plus resolved ranges for a given reference date. Good for ranges, periods, sets (recurrence), duration. MIT-licensed (check). | https://github.com/microsoft/Recognizers-Text/tree/master/Specs/DateTime/English |
| dateparser | `tests/` includes `test_date_parser.py`, `test_freshness_date_parser.py`, `test_search.py`, `test_parts_of_day.py`, `test_languages.py`. Contents not read (listing only). Multilingual data. | Phrases for locale-ish variants and non-English month/day names. | https://github.com/scrapinghub/dateparser/tree/master/tests |
| parsedatetime | `tests/TestSimpleOffsets.py` and siblings, `unittest` with `cal.parse(phrase, start)`. Verified phrases: "5m from now", "a week ago", "one hour before Thursday", "next friday at 1pm", "1pm this friday". | Relative offsets, spelled-out numbers, abbreviated units. | https://github.com/bear/parsedatetime/tree/master/tests |
| Natty (Java) | Repo README gives no test detail. Docs are at natty.joestelmach.com. Tests live in `src/test`. Unverified. | Secondary phrase source. | https://github.com/joestelmach/natty |
| Google Calendar quick add | Help page documents the syntax with examples. Not a corpus. Unverified. | Realistic user phrasing for events, e.g. "Lunch with Jim tomorrow at noon". Use as a style guide for the target UX. | https://support.google.com/calendar/answer/36604 |

Caveats:

- Test cases are tied to each library's own semantics. Do not copy their expected values. Re-label with our resolver and our output schema.
- Licenses differ (Duckling BSD, chrono MIT, Recognizers MIT, dateparser BSD, parsedatetime Apache). Check each before copying text into a shipped dataset. Phrases are short and mostly generic, but confirm.
- These suites skew toward well-formed English. They have few typos, partial input, or recurrence in the "every other sunday" sense. We must generate those ourselves.

### 1.2 NLP corpora (annotated text, longer context)

| Source | Notes | Use | Link |
|---|---|---|---|
| TempEval-3 / TimeBank / AQUAINT | News text with TIMEX3 annotations (TYPE: date, time, duration, set; VAL normalized). TimeBank and AQUAINT are gold, about 666K words of silver data, about 6K words platinum eval. Verified via paper. | External test of phrase variety and type distribution. Expressions are embedded in news and often anaphoric ("last week" with a document date), so they are not a good match for typed queries. | https://arxiv.org/pdf/1206.5333 |
| WikiWars | History text, originally TIMEX2. Unverified details. Conversion to TIMEX3 is needed. | Low value for us. | see TempEval-3 paper and https://ar5iv.labs.arxiv.org/html/1206.2010 |
| Tweets (TimeEx tweets set) | About 1,100 TIMEX3 annotations. Informal text with abbreviations. Counts vary by paper. Verified via search summary only. | Informal style, abbreviations. Low volume. | https://arxiv.org/pdf/2109.14927 (BERT got a Date, uses these corpora) |
| SCATE / PNT (SemEval-2018 Task 6) | Compositional graph annotation over news and clinical notes. Covers intervals, repeating intervals ("every other Sunday"), "last", "this", "before/after" as operators. Annotations at https://github.com/bethard/anafora-annotations/. Verified link. License not stated on the page; the underlying text may be restricted. | Use the schema ideas, not the data. SCATE's operator set (Repeating-Interval, Last, Next, This, Between, Intersection, N-th) is a good checklist for our tag taxonomy and for the compositional split. | https://bethard.github.io/data.html , https://aclanthology.org/S18-1011/ , https://aclanthology.org/Q18-1025/ |
| HeidelTime / SUTime | Rule-based taggers with resource files holding word lists and patterns (month names, holidays, units). Unverified. | Word lists for the grammar generator. | https://github.com/HeidelTime/heideltime |

### 1.3 Recommended use

1. Phrase seed pool: Duckling, chrono, Recognizers, parsedatetime, dateparser. Extract the input strings only. Store source and license in metadata. Target a few thousand unique strings.
2. Few-shot examples for the LLM prompt generators (section 4). Real phrases anchor the style and cut drift.
3. External test set: a small hand-curated set (300 to 500 phrases) from these suites, relabelled by our resolver and manually reviewed. Never train on it. Report it separately from the in-distribution validation set.
4. Negative set: Duckling `negativeCorpus` and chrono `negative_cases` for `non-date-noise`.

---

## 2. Best practices for synthetic data, applied to this task

Evidence quality: the web sources I found for scaling and mode collapse are mostly practitioner blogs. The academic references (Self-Instruct, Evol-Instruct, Persona Hub, MCD, SCAN) are from prior knowledge and the search results below. Check them before citing in a paper.

### 2.1 Use programs for labels, LLMs for language

- The label space here is deterministic: given text and a reference datetime, the right answer is a function. A resolver/grammar should produce labels wherever possible.
- LLMs are best at generating varied surface text, not at computing the right value. LLM labeling of "every other sunday" or "last friday" has day-count and boundary errors.
- Preferred flow: choose a structured intent first (the label), then render it to text. This guarantees label correctness by construction. For LLM-written text, give the LLM the intent and ask for N different ways a person would type it. Then check the text round-trips.
- Where the intent cannot be decided first (free LLM prompts like "invent hard date phrases"), label with a program if it parses, otherwise with LLM self-consistency (below), and route disagreements to a review queue.

### 2.2 Template and grammar generation

- Write a small generative grammar over the same schema as the output: date atoms (month, day, ordinal, weekday), time atoms (hour, minute, am/pm, noon), operators (range, relative, recurrence, duration). Sample trees, render to text, compute the label from the tree.
- Add rendering variants per atom: "oct", "Oct.", "october", "10/2", "2 oct", "the 2nd of october", "2nd".
- This approach is cheap, gives exact labels, and gives exact control over tag distribution.
- Weakness: it produces a narrow set of surface forms. Use LLM paraphrase and noise on top.
- Related approaches: Finegan-Dollak et al. (template splits for text-to-SQL), https://arxiv.org/abs/1806.09029 . SCAN, https://arxiv.org/abs/1711.00350 .

### 2.3 LLM paraphrase and diversity

- Self-Instruct (bootstrap tasks from seeds, filter near-duplicates by ROUGE overlap): https://arxiv.org/abs/2212.10560
- Evol-Instruct (rewrite examples to be deeper or broader, in rounds): https://arxiv.org/abs/2304.12244 . For us, "evolve" means: add a year, add a time, make it a range, make it informal, add a typo-prone form.
- Persona Hub (condition generation on a persona to vary content and register): https://arxiv.org/abs/2406.20094 . The search found a result that fine-grained persona detail does not by itself raise lexical diversity, so vary personas coarsely and add other seeds too.
- Magpie (prompting an aligned model with only the pre-query template so it emits user queries): https://arxiv.org/abs/2406.08464 . Possible for open-ended "what would a user type" diversity. Unverified for this task.
- Taxonomy-driven generation: enumerate tag x attribute combinations, and generate each cell separately. This is the main guard against uneven coverage. See AIDE (attribute-guided expansion): https://arxiv.org/pdf/2412.06136

### 2.4 Avoiding LLM mode collapse in prompt generation

Practitioner reports say a single model asked for "diverse" items returns shallow variety, and single-source generation narrows the output distribution. Mitigations:

1. One call per (tag, persona, style, seed-attributes) cell, with a small N (20 to 40), not one call asking for 1,000.
2. Seed with random concrete attributes injected from code, not left to the LLM: a random month and day, a random weekday, a random time, a random locale hint, a random typing condition (phone, one hand, in a hurry), a random length bucket.
3. Show 5 to 8 randomly sampled real examples from the seed pool in each call (rotate them). Real anchors help more than abstract instructions.
4. Ban list: pass the 30 most frequent outputs so far for that tag and tell the model not to repeat their structure.
5. Vary the generator: use at least two model sizes and temperature 1.0. Mixed sources keep lexical diversity.
6. Ask for a style label per output (e.g. "terse", "chatty", "all-lowercase") so we can measure spread.
7. Measure: distinct-n, Self-BLEU, embedding-cluster counts per tag. Reject a batch if one template covers more than a set share (e.g. 15%).
8. Keep synthetic data to a bounded share of the final mix if other sources exist. Model-collapse risk rises when models train on their own outputs repeatedly (https://arxiv.org/abs/2305.17493). A single generation pass with a program-verified label is low risk.

### 2.5 Noise injection

Apply after label creation. Noise must not change the label unless the intended output is also changed. Use a deterministic, seeded noise program so each noisy example links to its clean source.

- Keyboard-distance typos: substitute with QWERTY neighbors, transpose adjacent letters, drop, double, insert. Rates: 1 edit in 30 to 40% of noisy examples, 2 edits rarely. Protect digits by default (a digit typo changes the answer). Tool: nlpaug (https://github.com/makcedward/nlpaug), or a short custom function.
- Phone typos: adjacent-key errors, missing space ("oct2to oct5"), merged tokens, extra spaces, autocorrect-like word swaps.
- OCR-like confusion (pasted text): 0/O, 1/l/I, 5/S, rn/m. Use sparingly (under 2%).
- Casing: lower, UPPER, Title, random.
- Abbreviations and dotted forms: "tues", "thurs", "wk", "mo", "hrs", "w/", "@", "thru", "til".
- Punctuation and spacing: "4-4:30", "4 - 4:30", "4to4:30", "oct.2", "Oct 2nd,".
- Typos in the month and weekday names are where the label stays recoverable; typos in numbers are not. Keep a `typo-ambiguous` negative or null handling plan (see 3.3).
- Keep clean-to-noisy pairs so a model failure can be traced to the noise type. Tag every example with the noise ops applied.

### 2.6 Deduplication

- Exact dedup on normalized text (lowercase, collapse whitespace) plus the reference date and label.
- Near dedup: MinHash LSH on character 3- or 5-grams, Jaccard threshold about 0.8 (datasketch: https://github.com/ekzhu/datasketch). Character grams suit short strings and typos.
- Embedding dedup (SemDeDup, https://arxiv.org/abs/2303.09540) is of limited value for very short strings. Use it per tag to cap clusters, not to remove all neighbors.
- Dedup across splits: nothing in validation or test may be a near-duplicate of anything in train. Check after noise injection too, since noise can produce a train string that equals a test string.
- Cap per-template share inside each tag so a few templates do not dominate.

### 2.7 Label verification by round trip

1. Forward: text -> model/LLM label -> deterministic resolver -> concrete datetime range(s) for a reference date.
2. Backward: label -> canonical text renderer -> compare normalized meaning with input where the input is clean.
3. Cross-parser check: run chrono, Duckling, Recognizers (or dateparser) on the clean variant. Agreement across independent parsers raises confidence. Disagreement goes to review. The parsers differ in semantics (e.g. "last friday", "this sunday"), so treat disagreement as a flag, not as an error.
4. Invariance check: a typo/case/spacing variant must resolve to the same label as its clean source (unless tagged otherwise).
5. Property checks: end >= start; times in range; ranges inside the expected window; weekday matches date; recurrence has a valid unit and interval.
6. Ambiguity policy must be fixed before labeling (e.g. "last friday" = most recent past friday; "4 to 4:30" = pm if now is after noon). Write these as a policy file that the resolver and annotators share. Most "label noise" in date tasks is policy disagreement, not mistakes.
7. Reference date: sample many reference dates (not one). Include month ends, leap day, year end, and DST changes. Store `now` and `tz` per example, because the output depends on them.

### 2.8 LLM labeling and self-consistency vs program labeling

- Program labels: exact, free, reproducible, but only cover what the grammar covers.
- LLM labels with self-consistency (sample k answers and take the majority; https://arxiv.org/abs/2203.11171): use only for text that has no program label, and for audit. Use k=5 at temperature 0.7. Accept at 5/5 or 4/5 agreement. Send the rest to review.
- Better: LLM proposes label -> deterministic validator checks schema and properties -> a second, different model or the program re-derives. Accept only on agreement.
- Always audit 100 to 200 random labels per tag by hand at each iteration. A 5% audit error rate in a tag means fix the policy or the generator first.

### 2.9 Held-out template and compositional splits

Random splits will overstate quality because templates repeat. Use several splits:

1. Random in-distribution split (baseline).
2. Template split: hold out whole templates/grammar rules (Finegan-Dollak et al.). Example: train never sees "the Nth <weekday> of <month>" templates, test does.
3. Compositional split: hold out combinations whose parts are each seen. Example: train has "every <weekday>" and "<time> to <time>"; test has "every <weekday> <time> to <time>". See SCAN/MCD: https://arxiv.org/abs/1912.09713 (Keysers et al.).
4. Length split: train on short inputs, test on longer.
5. Source split: validation phrases written by a different LLM and different personas than train.
6. External split: mined from open-source suites (section 1.3).
7. Noise split: held-out noise operators (e.g. train has QWERTY typos only; test has phone merge-typos and OCR).

Report per-tag, per-split. A tag that is fine in split 1 and bad in 3 means a memorized template.

### 2.10 Size vs accuracy for narrow tasks

I found no rigorous scaling study for this task type. The sources are tutorials and vendor posts.

- Quality beats volume. One guide claims 1,000 clean examples beat 100,000 noisy ones (the LIMA paper, https://arxiv.org/abs/2305.11206 , supports this for instruction tuning).
- Heuristics from practitioner posts: under 500 to 1,000 examples, few-shot prompting may be enough; LoRA works from thousands up. Constrained decoding and schema validation are still needed for valid JSON.
- For a tiny model with a closed grammar, expect the curve to rise fast up to roughly 10k to 50k examples, then flatten. This is an estimate. Plan to measure.
- Measure it: train on 1k, 2k, 5k, 10k, 25k, 50k, 100k with the same mix, and plot per-tag accuracy on the compositional split. Stop adding data where the compositional curve flattens. Then add data only to tags that lag.
- Given a deterministic resolver, volume is cheap. The costly part is diversity and verification.

---

## 3. Tag taxonomy

Each example gets one `primary_tag`, plus zero or more `modifier_tags`. Primary tags describe the semantic structure. Modifiers describe surface noise or conditions. This lets us slice "typo x recurrence" without a tag explosion.

### 3.1 Primary tags (structure)

| # | Tag | Definition | Example |
|---|---|---|---|
| 1 | `basic-date` | One explicit calendar date, month and day. | `oct 2` |
| 2 | `basic-date-year` | Explicit date with year. | `October 2, 2027` |
| 3 | `numeric-date` | Slash, dash or dot numeric date. Order depends on locale policy. | `10/2/27`, `2.10.2027` |
| 4 | `ordinal-date` | Day given as ordinal or in words. | `the 2nd of october`, `oct second` |
| 5 | `basic-date-range` | Two explicit dates as a range. | `oct 2 to oct 5` |
| 6 | `date-range-shared-month` | Range where the second endpoint inherits the month. | `oct 2-5`, `2nd to 5th of oct` |
| 7 | `relative-date` | Date relative to now by keyword. | `tomorrow`, `day after tomorrow` |
| 8 | `relative-offset` | Count plus unit before or after now. | `in 3 days`, `2 weeks ago` |
| 9 | `weekday-relative` | Weekday with a direction or anchor word. | `last friday`, `next tues`, `this sunday` |
| 10 | `weekday-bare` | Weekday alone. Policy picks next occurrence. | `friday` |
| 11 | `period-relative` | Week, month, year or quarter relative to now. | `next month`, `end of the week` |
| 12 | `nth-weekday-of-month` | Ordinal weekday inside a month. | `third thursday of november` |
| 13 | `named-holiday` | Holiday or fixed named day. | `thanksgiving`, `xmas eve` |
| 14 | `fuzzy-period` | Vague part of day or season mapped to a set window. | `tomorrow morning`, `this weekend`, `summer` |
| 15 | `time-only` | One clock time with no date. | `4pm`, `16:30`, `noon` |
| 16 | `time-range` | Two clock times, no date. | `4 to 4:30`, `9am-5pm` |
| 17 | `ampm-ambiguous` | Time without am/pm where the policy must infer. | `4 to 4:30`, `at 7` |
| 18 | `datetime` | Date plus a time. | `oct 2 at 3pm`, `tomorrow 9:15` |
| 19 | `datetime-range` | Start and end each with date and/or time, or one date with a time range. | `oct 2 3pm to oct 5 noon`, `friday 2-4pm` |
| 20 | `duration` | Length of time, with or without a start. | `for 2 hours`, `3pm for 90 min` |
| 21 | `duration-range-from` | Start plus length yields an interval. | `tomorrow at 10 for 45 minutes` |
| 22 | `recurrence-daily` | Repeats every day, weekdays, or every N days. | `every day at 9`, `every weekday` |
| 23 | `recurrence-weekly` | Repeats on given weekdays. | `every tuesday`, `mon wed fri` |
| 24 | `recurrence-interval` | Every other / every N units. | `every other sunday`, `every 3 weeks` |
| 25 | `recurrence-monthly-yearly` | Monthly or yearly pattern. | `first monday of every month`, `every oct 2` |
| 26 | `recurrence-bounded` | Recurrence with an end or count. | `every friday until dec 1`, `daily for 5 days` |
| 27 | `open-range` | Range with one side open. | `after 3pm`, `before friday`, `since oct 2` |
| 28 | `month-or-year-only` | Month or year as a whole period. | `october`, `2028` |
| 29 | `multi-value` | A list of separate dates or times. | `oct 2, oct 9 and oct 16` |
| 30 | `non-date-noise` | Text that is not a date. Expected output is null. | `buy milk`, `25`, `1 adult` |

### 3.2 Modifier tags (surface and conditions)

| Tag | Definition | Example |
|---|---|---|
| `typo` | Characters substituted, dropped, doubled or transposed. | `tomorow`, `nxt fridya` |
| `typo-keyboard` | Typo from QWERTY-adjacent key. | `octpber 2` |
| `abbreviation` | Short or dotted forms of months, days, units. | `tues`, `thurs`, `wk`, `hrs` |
| `casing` | Unusual capitalization. | `OCT 2 TO OCT 5`, `eVeRy MoNdAy` |
| `spacing` | Missing, extra or odd whitespace and punctuation. | `oct2to oct5`, `4 -4:30` |
| `word-numbers` | Numbers spelled out. | `in two weeks`, `march third` |
| `locale-variant` | Regional phrasing, order or vocabulary. | `2 oct`, `fortnight`, `half four`, `monday week` |
| `colloquial` | Informal or chatty phrasing. | `sometime next week-ish`, `the day after xmas` |
| `filler-words` | Extra words around the date. | `can we do like next friday please` |
| `long-input` | Long phrase, over a set token count. | `every other sunday from 9am until 11:30am starting oct 2` |
| `partial-prefix` | Input cut off mid-typing. | `oct 2 t`, `every tu` |
| `partial-complete-prefix` | Prefix that is already a complete, valid parse. | `oct 2` (while the user may continue to "oct 2 to oct 5") |
| `dst-or-boundary` | Reference date is at a month end, year end, leap day or DST change. | `next month` on Jan 31 |
| `tz-mention` | Explicit time zone in the text. | `3pm est`, `noon utc` |
| `non-english-token` | Month/day word from another language. | `2 oct 15h`, `lunes` |
| `emoji-or-symbol` | Symbols or emoji next to the date. | `fri 📅 3pm`, `@ 4` |

### 3.3 Partial input: best guess vs null

Facts:

- The picker updates as the user types, so the model sees prefixes of valid phrases all the time. A model trained only on complete phrases will output arbitrary values for prefixes and cause flicker.
- Streaming and incremental NLP work trains on successive prefixes so train matches inference ("restart incrementality", e.g. https://arxiv.org/pdf/2205.00620 ; incremental SRL on prefixes, https://aclanthology.org/P15-1115 ). I found no direct study of incremental date-parsing UIs, so the recommendation below is a design judgment.

Proposed policy, in three classes:

1. Prefix is a complete valid parse (`oct 2`, `every tuesday`, `4`): output that parse. Tag `partial-complete-prefix`.
2. Prefix is incomplete but one reading is overwhelmingly likely (`oct 2 t` -> `oct 2 to`; `every tu` -> `every tuesday`; `tomorr` -> `tomorrow`): output the best-guess parse for the committed part. Do not guess the continuation. For `oct 2 t`, output `oct 2` (the committed part), not a range. For `every tu`, ambiguity between tuesday and thursday-less "tu" is low, so guess tuesday. Add a `confidence` or `complete: false` field if the schema allows. The UI can show it in a muted style.
3. Prefix is ambiguous or has no valid prefix parse (`every t`, `oct 2 to`, `from`, `the`, `in`): output null, or the committed part only if one exists (`oct 2 to` -> `oct 2`, flagged incomplete).

Rules for generation:

- Generate prefixes only from valid sources: take a labeled full phrase, cut at every token boundary and at selected mid-token characters, and label each cut with a program: the label of the longest valid parsable prefix, plus an `incomplete` flag. Use a prefix-aware parser or grammar to do this, not an LLM.
- Include many null cases. Without them the model over-guesses.
- Weight the cuts: mid-token cuts are common for the last word; cut after "to", "every", "next", "at", "in" are very common.
- Keep the policy consistent: a given prefix can only have one label. Write the policy table first (e.g. a one-letter weekday prefix is null; two letters is a guess when unique).
- Report prefix metrics separately: exact match on committed part, null precision/recall, and "flip rate" (how often the output changes between consecutive prefixes of the same phrase). Flip rate is a UX metric.
- Decide whether to train on prefixes in the same model or gate with a cheap rule (e.g. endsWith partial token). One model with an `incomplete` flag is simplest.

---

## 4. Proposed pipeline

Numbers are starting values. Adjust after the first error analysis.

### 4.0 Setup (before any generation)

- Write the output schema, the ambiguity policy file, and the reference-date sampler. Both the grammar and the resolver depend on them.
- Build the deterministic resolver (text intent -> resolved range for `now`). It is the source of truth for labels, round trips and property checks. (This is outside this research doc.)
- Define record format (JSONL), one line per example:
  `id, text, now, tz, locale, label, primary_tag, modifier_tags, source (grammar|llm|mined|noise), parent_id, gen_meta (persona, style, seed attrs, model), split, verified (bool), notes`.

### 4.1 Stage A: seed pool (small, mostly mined)

- Extract 2k to 5k unique phrases from Duckling, chrono, Recognizers, parsedatetime, dateparser, negative corpora.
- Hand-write 200 to 300 extra phrases for gaps (recurrence, partial input, ranges with times, locale variants).
- Output: `seed.jsonl` with source and tag guesses. A cheap LLM can propose the primary tag. Spot-check.

### 4.2 Stage B: grammar generation (labeled by program)

- Volume: 40k to 100k raw, covering all primary tags, weighted toward harder tags (recurrence, ranges, ampm-ambiguous, partial).
- Per tag quota floor: at least 1,500 train examples per primary tag and 300 for validation, before dedup. Use 3 to 5x higher for the hardest tags.
- Labels exact by construction. Hold out some templates and compositions for the template/compositional splits (2.9) before generating the train set.

### 4.3 Stage C: LLM-generated inputs (diversity)

- One subagent call per cell = (primary tag) x (persona) x (style) x (seed attributes). Example cell: tag `recurrence-interval`, persona "nurse scheduling shifts on a phone", style "terse lowercase", attributes {weekday=sun, interval=2, time=7am}.
- Each call returns N = 30 inputs as JSONL lines with text only, plus the intent echo (the structured intent the model believes it wrote). Give the intent in the prompt when possible, so the label is known: "write 30 different ways to type this intent". For open prompts (no fixed intent), ask the model to output its own intent JSON.
- Prompt contents: tag definition, 5 to 8 random real seed phrases, ban list of frequent outputs, the persona and style, the random attributes injected by code, and the schema of the output line.
- Volume: 150 to 300 cells per tag at N=30 gives roughly 4.5k to 9k raw per tag. With 30 primary tags that is 135k to 270k raw. Expect 50 to 60% to survive dedup and verification. Start at one tenth of this and scale only if diversity metrics hold.
- Model choice: use a small, cheap model (Haiku-class) for bulk generation with temperature 1.0; use a larger model for a minority of cells (about 20%) to add source diversity and for hard tags. Use the Batch API for cost, since this is offline. Prompt caching helps because tag definitions and seed lists repeat. (Check current pricing in the Anthropic docs before budgeting.)
- Subagent boundaries: each subagent writes one JSONL file per cell group (e.g. `gen/<tag>/<shard>.jsonl`) and returns only a count and a short summary. This keeps the orchestrator context small. Do not ask a subagent to dedup across files; do it in code.
- Personas (coarse list, 30 to 50): busy parent, nurse on shifts, developer, freelancer, teacher, student, traveler, non-native English speaker, UK speaker, Australian speaker, older user typing slowly, teenager texting, assistant scheduling for a boss, gym coach, etc.
- Styles (about 12): terse, verbose, lowercase, all caps, text-speak, formal, with typos, voice-dictation-like, copy-pasted from email, etc. Dictation style (no punctuation, spelled-out numbers, "four thirty") is a separate useful class.

### 4.4 Stage D: labeling

- Grammar data: already labeled.
- LLM data with known intent: label = resolver(intent). Check the text by a round trip: ask a separate verifier call "does this text mean intent X? yes/no" at k=3 on a sample, and run the cross-parser check on all clean-ish items.
- LLM data without intent: resolver tries first (via a parser built from the grammar, if available). If it does not parse, label with LLM at k=5 and apply the self-consistency rule (2.8). Route the rest to a review file.
- Prefix data: generated by program from labeled full phrases (3.3).

### 4.5 Stage E: noise

- Apply seeded noise programs to 25 to 35% of grammar and LLM items (keep the clean parent in the set).
- Record ops in `modifier_tags` and `parent_id`.
- Held-out noise ops go into the noise split only.

### 4.6 Stage F: dedup and split

- Normalize, exact dedup, then MinHash near-dedup per tag.
- Assign splits by template/composition/persona/model before sampling (not by random row). Keep parent and its noisy children in the same split.
- Final targets (first pass): train 30k to 60k, validation 3k to 5k (random-ID), template/compositional test 2k to 3k, external test 300 to 500, noise-held-out test 1k to 2k. All with at least 100 items per primary tag in the evaluation sets where possible, so per-tag errors have error bars (at 100 items, one standard error is about 3 to 5 points near 90% accuracy).

### 4.7 Stage G: audit

- Hand-check 100 items per tag for the first pass, then 30 per tag later. Count policy disputes separately from clear errors. Update the policy file, regenerate affected tags.

### 4.8 Iteration loop

1. Train the tiny model on the current set (optionally a quick small run on a subset for speed).
2. Evaluate per primary tag, per modifier tag, per split, per `now` bucket (month end etc.), and prefix flip rate. Also evaluate chrono/Duckling as baselines on the same set to spot suspect labels.
3. Pull the worst 5 tags or tag pairs (e.g. `typo` x `recurrence-interval`). Read 50 errors each. Classify each as: label error, policy ambiguity, missing coverage, or model capacity.
4. Actions by cause:
   - Label error or policy dispute: fix the policy/resolver, regenerate, re-verify.
   - Missing coverage: add grammar rules or new cells (new persona, style, attributes) targeted at the failing surface forms. Use the failing inputs as few-shot anchors for the generator (not as test data).
   - Model capacity: check output length/format, consider schema simplification.
5. Add targeted data in batches of 1k to 3k per failing tag. Do not retrain on the held-out test items. Keep a frozen test set.
6. Re-run. Stop when per-tag gains on the compositional split flatten.
7. Track a changelog: dataset version, what was added, why, per-tag results. Keep the generator seeds so any version can be rebuilt.

### 4.9 Cost notes

- Grammar and noise cost no tokens.
- Bulk LLM generation is cheap when using a small model with batch mode and short outputs. 30 short strings is under 500 output tokens per call. 5,000 calls is a few million tokens total. Verify against current pricing.
- The larger spend is human audit time and resolver correctness, not tokens.
- Use subagents mainly for parallel cell generation and for independent verification. Keep prompts small and return only counts.

---

## 5. Risks and open questions

- The ambiguity policy (ampm inference, "this sunday", "last friday", numeric date order, week start day) decides label correctness. Fix it first.
- Partial-input behavior (3.3) is a UX decision that should be confirmed with the picker design.
- LLM-generated text can contain phrases no real user types. Mix in mined phrases and any real usage logs once they exist. Logged inputs from the product, once available, are the best validation data.
- Some resource contents were not read: dateparser and Natty test contents, WikiWars and Tweets download pages, Google Calendar help page. Verify before use.
- Scaling numbers in 2.10 are heuristics. Measure on our own data.

---

## Sources

- Duckling Time EN corpus: https://github.com/facebook/duckling/blob/main/Duckling/Time/EN/Corpus.hs
- chrono-node tests: https://github.com/wanasit/chrono/tree/master/test/en
- Microsoft Recognizers-Text specs: https://github.com/microsoft/Recognizers-Text/tree/master/Specs/DateTime/English
- dateparser tests: https://github.com/scrapinghub/dateparser/tree/master/tests
- parsedatetime tests: https://github.com/bear/parsedatetime/tree/master/tests
- Natty: https://github.com/joestelmach/natty
- Google Calendar quick add: https://support.google.com/calendar/answer/36604
- TempEval-3: https://arxiv.org/pdf/1206.5333
- Temporal expression normalisation (corpus merge): https://ar5iv.labs.arxiv.org/html/1206.2010
- BERT got a Date (temporal tagging on these corpora): https://arxiv.org/pdf/2109.14927
- SCATE data page: https://bethard.github.io/data.html ; annotations https://github.com/bethard/anafora-annotations/
- SemEval-2018 Task 6: https://aclanthology.org/S18-1011/
- Laparra et al., TACL 2018: https://aclanthology.org/Q18-1025/
- Semantic parsing framework for time normalization (2025): https://arxiv.org/html/2507.06450v1
- HeidelTime: https://github.com/HeidelTime/heideltime
- Self-Instruct: https://arxiv.org/abs/2212.10560
- Evol-Instruct / WizardLM: https://arxiv.org/abs/2304.12244
- Persona Hub: https://arxiv.org/abs/2406.20094
- Magpie: https://arxiv.org/abs/2406.08464
- AIDE attribute-guided expansion: https://arxiv.org/pdf/2412.06136
- Model collapse: https://arxiv.org/abs/2305.17493
- Synthetic pipelines that do not collapse (blog): https://tianpan.co/blog/2026/04/12/synthetic-data-pipelines-that-dont-collapse
- SemDeDup: https://arxiv.org/abs/2303.09540
- datasketch (MinHash): https://github.com/ekzhu/datasketch
- nlpaug: https://github.com/makcedward/nlpaug
- Self-consistency: https://arxiv.org/abs/2203.11171
- SCAN: https://arxiv.org/abs/1711.00350
- Template splits (Finegan-Dollak et al.): https://arxiv.org/abs/1806.09029
- MCD / CFQ (Keysers et al.): https://arxiv.org/abs/1912.09713
- Compositionality benchmark comparison: https://arxiv.org/pdf/2310.17514
- LIMA: https://arxiv.org/abs/2305.11206
- Streaming prefix training (disfluency): https://arxiv.org/pdf/2205.00620
- Incremental SRL on prefixes: https://aclanthology.org/P15-1115
- Structured extraction fine-tuning tutorial (data size heuristics): https://theneuralbase.com/fine-tuning-llm/learn/advanced/fine-tuning-for-structured-extraction/
