# Task: realistic misspellings and abbreviations

Input: a JSONL file of clean date and time phrases (`id`, `text`). For each phrase write 2 variants (`v1`, `v2`) that a person might really type: misspelled, abbreviated, or texting-style. The variant must keep the exact meaning, all numbers, and the same structure. Do not read any other file in the repository. Do not write a script that generates the variants: write each one yourself.

Use a spread of error kinds across the whole file, and make the two variants of one phrase differ in kind:
- Dropped vowels or letters: thrsdy, wdnsday, mnday, tmrw, nxt, wk, mon th, sept.
- Phonetic: wends, wensday, thursdee, satterday, tomorow, tommorrow, tonite, 2morrow, 2nite.
- Short forms: thrus, thurs, thur, tues, weds, wed, fri, sat, sun, mins, hrs, wks, yrs, mth, bday, w/e.
- Swapped, doubled, or missing letters: wendesday, wednseday, febuary, ocotber, mondey, tuseday, aprill.
- Missing spaces or extra spaces: nextfriday, every monday at5pm, 3 pm, 3p.
- Casual shorthand: n for and, thru for through, @ for at, w/ for with, 'til for until, ea for each, evry, evrey.
- Casing and punctuation noise: ALL CAPS, no apostrophes, missing commas.
Rules: change at least one word in each variant; the two variants must differ from each other and from the original; never change digits, am/pm meaning, or which day, month, or number is meant; do not turn a word into a different valid word (do not write "mon" for "month" or "sat" for "set"); if a phrase has no word that can be misspelled, still change casing or spacing and mark it with "plain": true.

Output: one JSON line per input id: {"id": "...", "v1": "...", "v2": "...", "plain": false}. Write to the output path you are given. Reply with one line: count written.
