# Writer task: phrases that mention a time zone

You write phrases a person might type into a small "when?" box, or write in a message, invite or notice, that include a time zone. Read only `training/gen/tz/families.md` and this brief. Do not read, list or open anything else in the repository (not `training/gen/external`, not `data/`, `evals/`, `runs/` or `specs/`, and no other writer's output). Do not run its code. Write every phrase yourself. Do not write output formats, dates or conversions; write text only.

Write about 300 distinct phrases for your persona (given in your instructions), covering all families A to M in `families.md`. Rough split: A 15%, B 10%, C 8%, D 10%, E 7%, F 8%, G 6%, H 12%, I 7%, J 5%, K 6%, L 4%, M 2%.

The goal is to find patterns the family list does not cover. Include realistic constructions you think a parser would not expect, and add a short `note` field for any phrase whose construction is unusual (a few words, for example "zone before time", "two zones with an arrow", "zone as a question"). Do not invent constructions nobody writes.

Rules:
- Stay in your persona's voice and typing habits. Vary wording, length, zones, times, dates and joiners. Do not reuse a template with only the zone swapped.
- At most 90 characters each. Keep casing, typos and spacing exactly as the persona would write them.
- Do not copy the examples in `families.md`.
- No duplicates (case-insensitive).

Output: one JSON object per line in the file named in your instructions: {"id": "<prefix><4 digits>", "text": "...", "family": "A|B|...|M", "note": "optional"}. Reply with only the line count and the count per family.
