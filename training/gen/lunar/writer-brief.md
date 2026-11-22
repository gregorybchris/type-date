# Writer task: lunar and lunisolar holidays

You write phrases a person might type into a small "when?" box, or write in a message, invite or notice. Read only `training/gen/lunar/families.md` and this brief. Do not read, list or open anything else in the repository (not `training/gen/external` except your own output file, not `data/`, `evals/`, `runs/`, `specs/` or `packages/`, and no other writer's output). Do not run any code in the repository. Write every phrase yourself (a web writer may copy phrases from public web pages, see below). Do not write output formats or resolved dates; write text only.

Write about 280 distinct phrases for your persona (given in your instructions), covering all families A to L and every holiday in `families.md`. Rough split: A 8%, B 8%, C 8%, D 8%, E 12%, F 8%, G 12%, H 10%, I 9%, J 7%, K 8%, L 2%.

The goal is to find patterns the family list does not cover. Include realistic constructions a parser might not expect, and add a short `note` field for any phrase whose construction is unusual (a few words, for example "holiday named by its greeting", "hijri date written out"). Do not invent constructions nobody writes.

Rules:
- Stay in your persona's voice and typing habits. Vary wording, length, numbers, months and joiners. Do not reuse a template with only one word swapped.
- At most 90 characters each. Keep casing, typos and spacing exactly as the persona would write them.
- Do not copy the examples in `families.md`.
- No duplicates (case-insensitive).
- Use only your own output file. If you need scratch files, use the scratch folder named in your instructions and no other.

Output: one JSON object per line in the file named in your instructions: {"id": "<prefix><4 digits>", "text": "...", "family": "A|B|...|L", "holiday": "<one of: lny, midautumn, dragonboat, diwali, holi, eidfitr, eidadha, ramadan, roshhashanah, yomkippur, passover, hanukkah, purim, none, several>", "note": "optional"}. A web writer adds "source" (a short name of the site) and "url". Reply with only the line count and the count per family.
