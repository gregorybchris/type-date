# Output format for the datetime model

Question: what should the tiny in-browser model emit so a React picker can render it?

Today in examples: Tuesday 2026-11-03. Week start is a resolver setting.

## Summary recommendation

- The model emits a compact, relative/symbolic DSL. It does no calendar math.
- Absolute values appear only when the user typed them (`10-02`, `2027-03-03`).
- Recurrence uses RRULE concepts (FREQ, INTERVAL, BYDAY, BYMONTHDAY, COUNT, UNTIL) in short form, not RRULE strings.
- Mode (`d`, `t`, `dt`) is the first output token.
- The prompt is the raw input text only. No "now", no timezone, no week start.
- A deterministic resolver turns the DSL plus (now, week start, timezone) into concrete values for the picker.
- Typical output is 6 to 16 tokens, versus 30 to 70 for JSON.

## Findings by option

### (a) Absolute ISO dates plus a reference date in the prompt
- The model must do calendar arithmetic ("last friday" from 2026-11-03 gives 2026-10-30). Tiny models are poor at this. It needs weekday-of-date knowledge and month lengths.
- The prompt changes every day, so there is no cache and the training set needs many reference dates.
- Output is longer: `2026-10-30` is about 10 tokens with digit-level tokenizers.
- Upside: simple output, no resolver. Good as a baseline experiment.
- The SCATE paper moves away from this for the same reason. It has a 0.5B model emit operator code (Last, Next, This, Nth) and executes it against the anchor. Direct interval few-shot prompting scored 0.38 versus 0.49 for operator code with the same LLM (Claude 3.7). Source: https://arxiv.org/html/2507.06450v1

### (b) Relative/symbolic specs resolved by code
- Matches how users speak: "last friday", "in 2 weeks", "next monday".
- The model learns a small closed vocabulary (weekday, month, offset unit, ordinal). The resolver owns the calendar.
- No "now" needed in the prompt, so the encoder input is short and the same text always gives the same output. Easy to cache and test.
- Risk: policy questions ("next friday" on a Tuesday) move to the resolver. That is fine. They are fixed in one place and can be a user setting.
- This is the approach in SCATE, Duckling's internal time model, and chrono-node's refiners. All of them parse to a symbolic or partial form, then resolve against a reference time.

### (c) RFC 5545 RRULE / iCalendar
- RRULE is the right vocabulary for recurrence: FREQ, INTERVAL, BYDAY, BYMONTHDAY, BYSETPOS, COUNT, UNTIL. "Every other sunday" is `FREQ=WEEKLY;INTERVAL=2;BYDAY=SU`. Source: https://www.rfc-editor.org/rfc/rfc5545#section-3.3.10
- The string form is long in tokens (`FREQ=WEEKLY;INTERVAL=2;BYDAY=SU` is about 15 to 20 tokens). Use the concepts, not the syntax.
- RRULE needs DTSTART. The resolver supplies it (the first matching date on or after today, or an explicit start the user typed).
- Keep a path to export real RRULE strings for the picker or for calendar export. A mapping from the DSL to RRULE is mechanical (the `rrule` npm package can consume it). Source: https://github.com/jkbrzt/rrule
- RRULE cannot express non-recurring ranges or "4 to 4:30". Use it only for the recurrence part.

### (d) Existing formalisms
- TIMEX3 / TimeML (ISO 24617-1): value strings such as `2026-W44`, `XXXX-10-02`, `T16:00`, `P2W`, with type DATE/TIME/DURATION/SET. Partial values with `X` are useful ideas (month-day without year). It is weak on relative and compositional expressions, and SET (recurrence) is limited (freq, quant). Sources: https://timeml.github.io/site/publications/timeMLdocs/timeml_1.2.1.html and the SCATE motivation in https://aclanthology.org/Q18-1025/
- SCATE (Bethard and Parker 2016; SemEval 2018 Task 6): compositional operators over intervals (Last, Next, This, Nth, Repeating, Between, Intersection, ShiftUnion). It is the most expressive. The 2025 paper trains Qwen2.5-0.5B to emit SCATE as Python code. Results: 0.01 accuracy trained on the small human set; 0.37 on LLM-augmented data; 0.59 on both, above its Claude 3.7 teacher. Training data came from LLM annotation filtered by executing the code (8,583 valid of about 10k). Lesson: a 0.5B model works only with a lot of synthetic data validated by an executor. Sources: https://arxiv.org/html/2507.06450v1, https://aclanthology.org/S18-1011/
- Duckling (Facebook): output is `{value, grain}` or `{from, to}` intervals with a `values` list of alternatives, always resolved against a reference time (its tests use Tue 2013-02-12 04:30). The `grain` field (day, hour, minute) is the same idea as our mode. The list of alternatives is a good model for ambiguity. Source: https://github.com/facebook/duckling
- chrono-node: `ParsedResult` has `start` and optional `end`, each a `ParsedComponents` with `knownValues` (stated by the user) and `impliedValues` (filled by defaults). `isCertain(component)` tells the UI what was typed. Refiners fix meridiem guesses. This is the best model for ambiguity handling: record what was stated, let code fill the rest. Source: https://github.com/wanasit/chrono
- Microsoft Recognizers-Text: output has `type` (date, time, datetime, daterange, timerange, datetimerange) plus a `timex` string like `(XXXX-05-02,XXXX-05-05,P3D)` and resolved `start`/`end`. "6pm to 7pm" gives `(T18,T19,PT1H)`. It returns several candidate values when ambiguous (a bare "4" gives both 04:00 and 16:00). Its six types match our mode times single/range. Source: https://learn.microsoft.com/en-us/azure/ai-services/luis/luis-reference-prebuilt-datetimev2 (also https://github.com/microsoft/Recognizers-Text)
- SUTime (Stanford): rule-based, outputs TIMEX3 with `XXXX` partial values and a reference date. https://nlp.stanford.edu/software/sutime.html
- HeidelTime: rule-based TIMEX3 tagger with a document creation time. It has a "resolve" step in code, not in the rules. https://github.com/HeidelTime/heideltime
- Google Calendar quick add and Fantastical: closed-source. Public behavior only. They parse title, date/time, range, and recurrence ("every other sunday") into calendar fields. Fantastical documents its natural-language grammar for recurrence and ranges, which is a useful source of test phrases. https://flexibits.com/fantastical/help/natural-language (not fetched; verify before relying on it).

What to take from these:
- Resolve against a reference time in code (all of them).
- Keep stated versus implied values separate (chrono).
- Partial dates without year (TIMEX3 `XXXX-10-02`, Recognizers).
- Six result types from {date, time, datetime} x {single, range} (Recognizers). Add recurrence on top.
- Avoid SCATE's full expressiveness. Our input domain is small (picker input, not news text).

### (e) Token efficiency and decoding
- Latency is roughly encoder pass (once) plus decoded tokens times per-step time. Cutting output from 50 to 10 tokens cuts decode time about 5x. This is the main lever.
- Common tokenizers (Llama, Qwen, T5 variants) split numbers into digits or short chunks. Two-digit numbers cost 1 to 2 tokens. Words like `fri` cost 1 to 2 tokens. Punctuation costs 1 each.
- JSON overhead: braces, quotes, key names, commas. Short keys help but do not fix it. A TOON-vs-JSON benchmark found compact notation reduces tokens substantially; it is not specific to dates. Source: https://arxiv.org/pdf/2603.03306
- Constrained decoding with a grammar (XGrammar, llguidance, GBNF) guarantees valid syntax. XGrammar reports under 40 microseconds per token for JSON/CFG grammars. Source: https://arxiv.org/pdf/2411.15100. Browser support is limited (Transformers.js has no built-in grammar engine; a hand-written logits mask for a small DSL is simple, since the grammar is a few states).
- Constraints can hurt tiny models if the schema is large ("constraint tax" for under 3B models, arXiv 2605.26128 as returned by search; not read in full). A small grammar with a few states avoids this.
- No direct benchmark of compact DSL versus JSON for date parsing was found. Token counts below are estimates. Measure with the actual tokenizer.
- Option to reduce tokens further: add dedicated tokens to the vocabulary (`<d>`, `<fri-1>`, `<R_w2>`). Each atom becomes one token. Only worth it if training from scratch or resizing embeddings.
- Reduce the error surface: constrain the first token to mode, enforce valid weekday/month tokens, and let the resolver reject out-of-range values.

## Ambiguity and policy

- AM/PM: the model emits a trailing `?` on hours it cannot determine ("4 to 4:30" gives `t 4:00?>4:30?`). The resolver applies a rule:
  - Hours 7 to 11 become AM, 12 becomes noon, 1 to 6 become PM (daytime window 07:00 to 18:59).
  - For a range, the end inherits the start meridiem; if end <= start, flip it.
  - The resolver also returns `ambiguous: true` so the UI can show an AM/PM toggle. This mirrors chrono's implied versus known values and Recognizers' multiple candidates.
- Year omitted: nearest occurrence on or after today for single dates. For a range, the end is the first match on or after the start.
- "next friday" versus "this friday": the DSL encodes only "first friday strictly after today" (`fri+1`) and "most recent friday strictly before today" (`fri-1`). Which one users mean for "next" is a resolver setting. Run user tests on this.
- Week start: used only for `this week`, `next week`, and weekday-in-week phrases. Resolver setting (locale or user). Not in the prompt.
- Timezone: the DSL is floating wall-clock time. The resolver attaches the user's zone. If the text names a zone ("3pm PST"), the model emits `z=PST`; this is optional for v1. DST gaps and overlaps are the resolver's job.
- Mode decision: mode is a function of what the text contains.
  - `d`: date info only ("last friday", "oct 2 to oct 5", "every other sunday").
  - `t`: time info only ("4 to 4:30", "noon").
  - `dt`: both ("tomorrow 3pm", "every weekday at 9").
  - Training data teaches it directly. Emit mode first so it can be constrained and so the UI can pre-select the picker while decoding.
- Unparseable input: output `x` (single token). The UI shows nothing.
- Defaults for missing parts (for example "tomorrow" with mode `d` has no time) are never invented by the model.

## Candidate schema

Output is one line: `MODE BODY`.

```
MODE   := d | t | dt | x
BODY   := PT | PT '>' PT | R-SPEC
PT     := DATE | TIME | DATE ' ' TIME          (end of a range may omit parts and inherit from start)
DATE   := YYYY-MM-DD | MM-DD | +N(d|w|m|y) | -N(d|w|m|y)
        | WD(+|-)N                  first/Nth weekday after (+) or before (-) today
        | WD#K@MM                   Kth weekday of month MM (K=-1 means last)
        | WD                        any weekday in a recurrence
TIME   := H[:MM][?]  | HH:MM[?] | HH:MM   ('?' = am/pm unknown; 24h value = known)
R-SPEC := 'R' ' ' FREQ '/' INTERVAL ' ' BYDAYS|dNN [' ' LIMIT] [' ' PT]
FREQ   := d | w | m | y
LIMIT  := n<COUNT> | u<DATE>
WD     := mo | tu | we | th | fr | sa | su
```

Notes:
- `+0d` is today. `+1d` is tomorrow. `-1d` is yesterday.
- `+1w` alone means 7 days from today. "next week" as a range is `d +1w>+1w` with a week flag; keep this out of v1 unless user tests need it (use token `W+1`, resolver expands to week start..end).
- A recurrence without an explicit start begins at the first match on or after today.
- `n14` means 14 occurrences. `u12-31` means until Dec 31.

## Worked examples (now = Tue 2026-11-03, week start Sunday)

| # | Input | Output | Resolver result |
|---|---|---|---|
| 1 | oct 2 to oct 5 | `d 10-02>10-05` | 2027-10-02 to 2027-10-05 (next occurrence) |
| 2 | last friday | `d fr-1` | 2026-10-30 |
| 3 | every other sunday | `d R w/2 su` | Sundays, interval 2 weeks, DTSTART 2026-11-08 |
| 4 | 4 to 4:30 | `t 4?>4:30?` | 16:00 to 16:30, ambiguous=true |
| 5 | tomorrow at 3pm | `dt +1d 15:00` | 2026-11-04 15:00 |
| 6 | next monday 9am to 5pm | `dt mo+1 09:00>17:00` | 2026-11-09 09:00 to 17:00 |
| 7 | dec 25 | `d 12-25` | 2026-12-25 |
| 8 | in 2 weeks | `d +2w` | 2026-11-17 |
| 9 | every weekday at 9 | `dt R d/1 mo,tu,we,th,fr 9?` | weekdays 09:00 (9 known AM by window rule; flagged ambiguous) |
| 10 | first monday of march | `d mo#1@03` | 2027-03-01 |
| 11 | monthly on the 15th | `d R m/1 d15` | day 15 of each month, start 2026-11-15 |
| 12 | from 2pm tomorrow to 4pm friday | `dt +1d 14:00>fr+1 16:00` | 2026-11-04 14:00 to 2026-11-06 16:00 |
| 13 | march 3 2027 | `d 2027-03-03` | 2027-03-03 |
| 14 | noon | `t 12:00` | 12:00 |
| 15 | this weekend | `d sa+1>su+1` | 2026-11-07 to 2026-11-08 |
| 16 | every day for 2 weeks | `d R d/1 n14` | 14 daily occurrences from 2026-11-03 |
| 17 | every other friday until dec 31 | `d R w/2 fr u12-31` | Fridays every 2 weeks, ending 2026-12-31 |
| 18 | jan 5 at 7pm | `dt 01-05 19:00` | 2027-01-05 19:00 |
| 19 | 9:30 | `t 9:30?` | 09:30, ambiguous=true |
| 20 | last day of the month | `d R m/1 d-1` ... or `d mo#-1`-style; handle as `d R m/1 d-1 n1` | 2026-11-30 (edge case; decide whether to support) |
| 21 | asdf | `x` | no result |

Row 9: `9?` marks "9" with no meridiem. A rule of "7 to 11 is AM" resolves it.

## Serialized form: compact DSL, not JSON

JSON equivalent of row 1:

```
{"mode":"d","start":{"m":10,"d":2},"end":{"m":10,"d":5}}
```

Token estimates (digit-level tokenizer, not measured):

| Ex | DSL | DSL tokens | Short-key JSON tokens |
|---|---|---|---|
| 1 | `d 10-02>10-05` | 9 to 11 | 35 to 45 |
| 2 | `d fr-1` | 4 to 5 | 20 to 25 |
| 4 | `t 4?>4:30?` | 9 to 11 | 40 to 50 |
| 6 | `dt mo+1 09:00>17:00` | 14 to 18 | 55 to 70 |
| 3 | `d R w/2 su` | 8 to 10 | 40 to 50 |

Expect a mean of about 10 DSL tokens versus about 40 JSON tokens, so about 4x fewer decode steps. The DSL is also easy to constrain with a small state machine. Convert to JSON in the resolver, which is where the picker gets typed values.

Training format tip: make the DSL fully lowercase, one separator per level, and avoid unusual symbols that tokenize into multiple pieces. Check `>`, `?`, `#`, `@` against the real tokenizer and pick what costs one token.

## What the deterministic resolver must do

Inputs: DSL string, `now` (instant), `tz`, `weekStart`, options (`nextMeansSkipWeek`, daytime window for am/pm).

1. Parse and validate the DSL (reject bad weekday, month, day-of-month, hour). On failure return `x`.
2. Resolve dates:
   - Offsets: add days/weeks/months/years to today. Clamp month-end for month and year offsets (Jan 31 + 1m = Feb 28).
   - Weekday offsets: first strictly after or most recent strictly before today.
   - `MM-DD`: nearest occurrence on or after today; Feb 29 needs a leap year.
   - Nth weekday of month: compute from month start; `-1` is last.
3. Resolve times: apply the AM/PM rule for `?`, range inheritance, and midnight/noon (12 handling). If end <= start on the same day, advance end by one day for `dt` ranges, or flip meridiem for `t` ranges.
4. Range end: inherit missing date or time parts from start; end year is the first on or after start.
5. Recurrence: map to RRULE (`FREQ`, `INTERVAL`, `BYDAY`, `BYMONTHDAY`, `COUNT`, `UNTIL`); choose DTSTART; return the next N occurrences for preview.
6. Apply timezone and DST: convert wall time to instants; handle nonexistent and repeated local times.
7. Return a typed object for the picker: `{mode, kind: single|range|recurring, start, end, rrule, ambiguous: [fields], implied: [fields]}`. Track which fields were stated versus defaulted (chrono's known/implied split).
8. Keep a golden test table (input, now, expected). The same table drives synthetic training data generation. Generate training data by sampling a symbolic spec, rendering text templates (and LLM paraphrases), and keeping only rows whose resolver output equals the spec. This is the execution-filter step that made the SCATE small-model result work.

## Open questions

- Should "next friday" skip a week? Decide with user tests.
- Support for "last day of month", "every 3rd thursday", "except" clauses, and durations ("for 2 hours")? Duration may be needed for the end of a range ("3pm for 2 hours"). Suggest adding `+2h` as a range end later.
- Language scope (English only for v1).
- Whether to support multiple results ("fri or sat"). Duckling and Recognizers return alternative lists; v1 can return one.

## Sources

- SCATE small-model paper (2025): https://arxiv.org/html/2507.06450v1
- Laparra, Xu, Bethard 2018, neural parsing of time normalizations: https://aclanthology.org/Q18-1025/
- SemEval 2018 Task 6: https://aclanthology.org/S18-1011/
- RFC 5545: https://www.rfc-editor.org/rfc/rfc5545
- rrule (JS): https://github.com/jkbrzt/rrule
- TimeML 1.2.1: https://timeml.github.io/site/publications/timeMLdocs/timeml_1.2.1.html
- Duckling: https://github.com/facebook/duckling
- chrono-node: https://github.com/wanasit/chrono
- Recognizers-Text: https://github.com/microsoft/Recognizers-Text
- LUIS datetimeV2 reference: https://learn.microsoft.com/en-us/azure/ai-services/luis/luis-reference-prebuilt-datetimev2
- SUTime: https://nlp.stanford.edu/software/sutime.html
- HeidelTime: https://github.com/HeidelTime/heideltime
- XGrammar: https://arxiv.org/pdf/2411.15100
- TOON vs JSON benchmark: https://arxiv.org/pdf/2603.03306
- Constraint tax for sub-3B models: https://arxiv.org/pdf/2605.26128 (surfaced in search; not read in full)
- Discourse-aware ICL for temporal expression normalization: https://arxiv.org/abs/2404.07775
- Generative LLMs for multilingual TE normalization (Sánchez de Castro et al.): https://ebooks.iospress.nl/doi/10.3233/FAIA240940

Verification notes: Fantastical and Google quick add details are from general knowledge, not fetched. Token counts are estimates. Some claims about chrono-node v2 API names came from old README snippets in search results; check the current docs.
