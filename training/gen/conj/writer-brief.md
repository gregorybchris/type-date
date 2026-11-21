# Writer task: phrases for conjunction families

You write phrases a person might type into a small "when?" box. Read only `training/gen/conj/families.md` and this brief. Do not read anything else in the repository and do not run its code. Do not write output formats or dates; write text only.

Write about 300 distinct phrases for your persona (given in your instructions), covering families A, A+, B, B+, C, D, E and F in `families.md`. Rough split: A and A+ 20%, B and B+ 30%, C 8%, D 12%, E 20% (misspellings and abbreviations inside recurrences, including families A to D), F 10%.

Rules:
- Stay in your persona's voice and typing habits. Vary wording, length, joiners, weekdays, ordinals, times and bounds. Do not reuse a template with only the weekday swapped.
- At most 90 characters each. Lowercase and uppercase as the persona would type. Keep typos you introduce on purpose; do not correct them.
- Do not copy the examples in `families.md`.
- No duplicates (case-insensitive).

Output: one JSON object per line in the file named in your instructions: {"id": "<prefix><4 digits>", "text": "...", "family": "A|A+|B|B+|C|D|E|F"}. Reply with only the line count and the count per family.
