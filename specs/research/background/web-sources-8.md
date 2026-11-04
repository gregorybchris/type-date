# Web sources, round 8: spoken and conversational date phrases

Focus: how people say dates and times to voice assistants and in booking dialogues. 798 unique phrases (case-insensitive dedupe) in `training/gen/external/web-8.jsonl`. No source from web-sources-1..6 was used. Phrases are for evaluation only.

## Sources used

| Source | URL | Covers | License | Phrases |
|---|---|---|---|---|
| MASSIVE en-US (Amazon) | https://amazon-massive-nlu-dataset.s3.amazonaws.com/amazon-massive-dataset-1.0.tar.gz | Voice-assistant utterances; `date`, `time`, `timeofday`, `general_frequency`, `relation` slot spans (320 merged spans, 60 short full utterances). Numbers are spelled out ("march twenty two"). | CC BY 4.0 | 380 |
| Taskmaster-1 (Google) | https://github.com/google-research-datasets/Taskmaster/tree/master/TM-1-2019 | Spoken Wizard-of-Oz dialogues (restaurant, auto repair, movies, rideshare); user segments annotated as time or date. | CC BY 4.0 | 200 |
| Schema-Guided Dialogue (Google) | https://github.com/google-research-datasets/dstc8-schema-guided-dialogue | Values users said for date/time slots, as spoken (not the canonical value). First 30 train files plus all dev and test. | CC BY-SA 4.0 | 192 |
| ATIS (JointSLU copy) | https://github.com/yvchen/JointSLU/tree/master/data | Flight queries; depart/arrive/return date and time spans. | unknown (LDC-derived, research copy) | 26 |

Method: fetched raw files, extracted annotated date/time spans, kept 2-90 characters, required a digit or two words, capped identical digit templates at 3 per source, shuffled with a fixed seed.

## Variation seen

- Spelled-out numbers: "march fifteenth", "first of february twenty seventeen", "tuesday seven p. m.".
- Spoken clock forms: "half past 11 in the morning", "quarter past 10 in the night", "7:15 in the evening".
- Odd punctuation from transcription: "6 :30", "7:30 p.m.,", "three p.m", "p. m.".
- Day plus part of day: "wednesday night", "tomorrow night at 7", "morning before 11 am".
- Possessive or trailing forms: "tomorrow's", "this friday's", "wednesday's".
- Frequency inside request: "at the start of every month", "everyday", "yearly".
- Durations and offsets: "2 hours", "10 mins", "the next three three days" (transcription duplicate).
- Ordinal-first dates: "1st of March", "Friday, March 1", "November 5th at 7:30".

## New families or constructions not in the taxonomy

I did not check the other phrase files, only the taxonomy.

1. Part-of-day bounds on a time: "morning before 11 am", "before one am everyday", "after 4". Source: Taskmaster-1, MASSIVE.
2. Spoken clock idioms: "half past 11 in the morning", "quarter past 10 in the night", "ten to four". Source: SGD.
3. Fully spelled-out dates and years: "first of february twenty seventeen", "march twenty two". Source: MASSIVE.
4. Possessive and trailing-s date words: "tomorrow's", "this friday's", "wednesday's". Source: MASSIVE, ATIS.
5. Bare dayparts and frequency words: "afternoons", "night", "yearly", "everyday". Source: MASSIVE, ATIS.
6. Transcription spacing and punctuation noise: "6 :30", "7:30 p.m.,", "tuesday seven p. m.". Source: Taskmaster-1, MASSIVE.
7. Relative duration phrases as time answers: "2 hours", "10 mins", "thirty minutes early", "last ten minutes". Source: Taskmaster-1, MASSIVE.
8. Date plus topic in a full utterance (negative controls), e.g. "we had great dinner today". Source: MASSIVE.

## Not used

- TOP / STOP (dl.fbaipublicfiles.com): download returned 403.
- Taskmaster-2 restaurants.json raw path: 404.
- Enron, Ubuntu IRC, Common Voice, OpenSubtitles, TED: not attempted; time-boxed to dataset files that fetch raw.
- MultiWOZ 2.2 dev file was fetched but not used: slot values are normalized forms, little free-text variety.
- Craigslist, forums, social posts, voicemail: not attempted this round.
