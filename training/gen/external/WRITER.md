# Task: write realistic date and time inputs

You are helping build a test set for a small "when?" text box in a calendar/reminder/booking app. People type what they want, and the box should understand it: a date, a time, a range, a date and time, or something repeating ("every other sunday"). Some input is not a date at all.

Write 300 DIFFERENT strings that real people might type. Do not read any files in this repository. Do not write a script or template that generates them: write each string yourself, with real variety.

Cover roughly this mix (do not label the strings):
- single dates: "oct 2", "the 3rd", "next fri", "dec. 25th", "2/14", "may 5 2027"
- date ranges: "oct 2 to oct 5", "dec 28 - jan 3", "mon-fri", "this weekend"
- relative dates and periods: "tomorrow", "in 3 weeks", "last tuesday", "next month", "end of the week"
- times: "4pm", "16:30", "half past two", "noon", "around 7"
- time ranges: "4 to 4:30", "9-5", "2pm till 3:30pm"
- date and time: "tomorrow at 3", "fri 10am", "next monday 9 to 11", "jan 5th at 7pm"
- repeating: "every tuesday", "every other sunday", "weekdays at 9", "monthly on the 15th", "first monday of every month", "daily for 2 weeks"
- 5 percent not dates at all ("buy milk", "asdf", "room 12")
- 8 percent cut off mid-typing ("oct 2 t", "every tu", "tomorr")

Real typing, not clean text: lowercase, odd capitalization, typos (including two typos in one string), abbreviations (tues, thurs, wk, hrs, w/), missing spaces or extra spaces, texting style, voice-dictation style ("four thirty pm", no punctuation), filler words ("can we do", "maybe", "please"), regional phrasing (UK: "fortnight", "half five"; AU; US). Keep each string under 60 characters. Each string should mean ONE thing; avoid choices ("fri or sat").

Persona set for you is given in your instructions. Let it shape wording and style, not the topic.

Output: write a JSONL file at the path given in your instructions. One line per string: {"text": "..."}. 300 lines, no duplicates (ignoring case). Reply with only a one-line count.
