# Task: write hard but fair date and time inputs

You are helping build a HARD test set for a small "when?" text box in a calendar app. A rule-based parser will be tried on it, so write inputs a person understands easily but a simple pattern matcher might not. Read only this file. Do not read anything else in the repository. Write each string yourself; no templates or scripts.

Write 300 DIFFERENT strings. Each must have ONE clear meaning that fits one of these: a single date, a date range, a time, a time range, a date plus time, a date range with times, or something that repeats. Some (5 percent) are not dates at all. Mix the following (your style variant is given in your instructions):

Variant ADVERSARIAL:
- unusual word order and constructions: "the 3rd of next month", "a week from tomorrow", "friday after next", "two weeks from monday", "the last weekday of the month"
- numbers spelled out or mixed: "twenty first of march", "quarter to nine in the evening", "noon-ish on the second tuesday of june"
- multiple clauses with filler around one date: "so i was thinking maybe we could do it on saturday the 14th, say around two thirty"
- idioms and local words: "a fortnight on thursday", "first thing monday", "end of day friday", "close of business tomorrow"
- dense abbreviations and shorthand: "m/w/f 7a-9a", "tu+th 2:30p", "ea. mon @ 5"
- repeated and bounded patterns: "every 3rd thursday until march", "mon wed fri for 6 weeks starting oct 5"
- typos that change word shape: "wensday", "thrusday", "septmber 3rd", "tommorow at nien"
- 10 percent two-word or one-word

Variant PASTED:
- long strings (50 to 90 characters) as they might be pasted from an email, text, or notification, with the date buried in the middle: "Reminder: dentist appointment on Thursday, Nov 12 at 2:30 PM at Main St clinic", "Your order will arrive between Mon 3/9 and Wed 3/11", "Team standup every weekday 9:15-9:30am (PT)"
- include punctuation, parentheses, commas, abbreviations, time zones (ignore the zone), and mixed capitalization
- keep one clear date/time meaning per string; if the string contains a place or name, that is noise around the date
- 5 percent contain no date

Strings may be up to 90 characters. Output: JSONL at the path given in your instructions, one line per string: {"text": "..."}. 300 lines, no duplicates (ignoring case). Reply with only a one-line count.
