# Task: write inputs that use open ranges, durations, and day-of-month only

You are helping build a test and training set for a small date parser. This round covers phrasings the parser must now handle:
- OPEN RANGES: one end only. "after 2pm", "before noon", "by 8pm", "from 3 on", "anytime after 10", "no later than friday", "after oct 5", "since monday", "until march 3", "before the 20th", "starting nov 1"
- DURATIONS: a start time plus a length. "3pm for 2 hours", "10am (45 min)", "tomorrow 9am for 90 minutes", "9-ish for an hour", "fri 2pm for half an hour", "lunch 12:30 1hr", "call at 4 for 15 mins"
- DAY OF MONTH ONLY: "the 15th", "on the 3rd", "by the 28th", "the 1st", "due the 30th", "every 15th" (a recurrence), "the 2nd at 5pm"
- NEGATIVE CONTROLS (about 25 percent of your strings): ordinary inputs that must keep working and must NOT use these features: plain ranges ("9 to 5", "oct 2 to oct 5"), plain times, dates, weekdays, recurrences ("every tuesday"), and non-date text with numbers ("room 12", "for 2 people", "after the 3 cats").

Read only this file. Do not read anything else in the repository. Write each string yourself. Write 350 DIFFERENT strings, in real typing styles (lowercase, typos, abbreviations, filler words, pasted-message style with the phrase buried in a sentence, voice-dictation style). Each string must have one clear meaning. Up to 90 characters. Output: JSONL at the path given in your instructions, one line per string: {"text": "..."}. No duplicates (ignoring case). Reply with only a one-line count.
