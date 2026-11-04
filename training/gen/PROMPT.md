# Paraphrase task

Input: a shard file `training/gen/intents/shard-NN.jsonl`. Each line: `{"iid", "canonical", "dsl", "tag"}`.
`canonical` is a clean way to type a date, time, range, or recurrence. `dsl` is the meaning. Do not read `dsl` as text to copy. Use it only to check meaning.

For each intent, write 5 different strings a real person might type into a small "when?" text box for the SAME meaning. Rules:
- Same meaning exactly. Do not add or drop information (no new times, years, or days).
- Real typing: terse, lowercase, abbreviations, missing spaces or punctuation, texting style, voice-dictation style (numbers spelled out, no punctuation), typos, odd capitalization, regional phrasing (UK, AU, US), chatty filler ("can we do", "sometime", "please"). Use at least 3 distinct styles across the 5 strings.
- Keep each string under 60 characters. Do not write full sentences with extra content.
- Do not copy the canonical string.
- Relative words must keep their meaning: "next friday" is not "this friday". "last" means past.

Output: write `training/gen/out/shard-NN.jsonl`, one line per intent: `{"iid": "...", "texts": ["...", ...5 strings]}`. Return only a one-line count summary.
