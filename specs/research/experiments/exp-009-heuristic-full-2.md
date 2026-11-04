# exp-009: heuristic-full-2

Status: done. Baseline, no training. exp-003 (`heuristic-full`) is unchanged and kept for comparison.

## Hypothesis

Most of exp-003's remaining errors come from phrasing it does not know (chat filler, spelled-out clock times, glued or two-edit typos, extra recurrence forms), not from the grammar. Adding these should lift test_template and test_llm by several points at under 12 kB gzipped, without a large latency cost.

## Method

- Eval set e1 was not read row by row. Development used `data/v003/train.jsonl` (including its 3547 LLM-written rows, which exclude the held-out `l-` ids) and a new dev set `data/dev1/dev.jsonl`: `td data build dev1 --n 30000 --seed 777`, then rows whose lowercased text is in any `evals/e1` split removed, 10000 rows kept (8517 train, 836 test_template, 438 val, 209 test_noise). The category list (per-tag and per-modifier accuracy and the failure categories from exp-003) guided where to look. I did not read `training/gen/out` shards, because they contain the held-out intents; LLM style came from the LLM rows in v003 train.
- e1 was scored only by `scripts/eval.ts`.
- Dev accuracy (exact), heuristic-full to heuristic-full-2: v003 train sample 0.957 to 0.963, dev1 0.961 to 0.967, LLM rows of v003 train 0.883 to 0.932, dev1 held-out-template rows 0.938 to 0.946.

## What changed (`packages/baselines/src/heuristic-full-2.ts`)

- Filler and chat: `can we do`, `lets`, `how about`, `roughly`, `abt`, `maybe`, `only`, `onwards`, `all`, `thanks`, `jr`.
- Clock words: `seven oh five`, `five forty five`, `ten past one`, `quarter past/to`, `half four`; spaced minutes (`5 30`, `11 30 pm`, `19 10`); `in the pm`, `arvo`; dotted times (`2.30 to 5.30pm`, `1.15-6.15`, `4.30 in the arvo`) when the rest of the text shows a time context.
- Typos: edit distance 2 for words of 6+ letters (but never for a length gap above 1, except month and weekday names of 8+ letters, so `wensday` works); month and weekday prefixes of 4+ letters anywhere in the text (`frid`, `septe`); plural weekday typos (`Wednesddays`); month plurals (`novs`); tie-break prefers month and weekday names.
- Dates: `final sunday of october`, `apr last sun`, `sunday 3 in august`, `2nd frid in aug`, `nov's first saturday`, holiday plus year, `week coming`, `sat coming`, `the monday before`, `6 weeks time`, `3 days past`, `6 days prior`, `yest`, `tday`, `nx`, `following week`, aliases (`mums day`, `pats`).
- Recurrence: `every 2nd week`, `2 weekly sun`, `3wkly`, `bimonthly`, `each quarter`, `month end`, `march 5 every year`, a leading `from DATE` moved to the end, `mon to fri until ...`, weekday lists without `every` (`mon wed thu ...`, `wed+mon`, `&`), `thurs x6`, `for N` counts, `12 times monthly`, `nth weekday ... monthly`, `on <weekday> for N times` and `on <weekday> until DATE` as recurrences.
- Partial input: a range end that is only a day number is dropped when the text after it is unfinished; `last friday every`, `wed and` give `x`; a partial month after a day number (`17 septe`) keeps the date.
- Time pair logic is shared with recurrence ranges as before (24h evidence passes between the ends).

## Results (eval e1, exact / resolved)

| Split | n | exp-003 | exp-009 |
|---|---|---|---|
| val | 2591 | 0.967 / 0.967 | 0.970 / 0.970 |
| test_template | 5249 | 0.889 / 0.889 | 0.939 / 0.939 |
| test_noise | 1499 | 0.925 / 0.925 | 0.926 / 0.926 |
| test_llm | 1502 | 0.864 / 0.868 | 0.914 / 0.918 |
| all | 10841 | 0.909 / 0.909 | 0.941 / 0.942 |

e1q (600 rows): exp-003 0.912 / 0.913, exp-009 0.932 / 0.933 (stored under `metrics.json` `evals.e1q`).

By tag (exp-003 to exp-009): recurrence-weekly 0.845 to 0.922, recurrence-monthly-yearly 0.889 to 0.938, recurrence-interval 0.900 to 0.946, nth-weekday-of-month 0.948 to 0.981, datetime-range 0.916 to 0.933, time-only 0.915 to 0.932, named-holiday 0.882 to 0.864 (down), period-relative 0.824 to 0.824. By modifier: typo 0.831 to 0.884, typo-keyboard 0.788 to 0.854, partial-prefix 0.824 to 0.875, word-numbers 0.934 to 0.961, abbreviation 0.898 to 0.935.

## Cost

| | exp-003 | exp-009 |
|---|---|---|
| gzip bytes | 7859 | 8823 |
| minified bytes | 21375 | about 24000 |
| p50 per call (Node) | 0.036 ms | 0.032 ms |
| p95 | 0.89 ms | 1.08 ms |
| p99 | 5.6 ms | 7.0 ms |

Size is +12% and stays under the 12 kB target. p95 and p99 rise because two-edit fuzzy matching runs on more unknown words.

## Failure categories left (e1, 640 errors)

- recurrence-weekly, about 240 non-ambiguity errors, mostly held-out templates: weekday lists with a typo in one item (`tuesday/thyr/sat`), glued forms (`saturdaysuntilug..4`), and `on <weekday> at <time>` where the label is a recurrence.
- Dangling-list partials where the label is `x` (`thu, tuesday,`, `weekly on thursday,`): the heuristic returns the committed recurrence.
- datetime (41), basic-date-range (36), time-range (30), datetime-range (30), weekday-relative (26): typos with a wrong first letter or more than two edits, two-letter month/weekday prefixes, `d mon to bare-day` (see below), word-number clock phrases such as `ten to nine`.
- period-relative (0.82): typos in `week/month/year` of 3 letters or less (`wk`, `yar`) and partial words the data labels `x`.
- named-holiday: aliases not in the list, and typos in long glued holiday names.

## Label-policy ambiguities (not tuned against)

1. `H:MM` with hour 10 to 12 and no am/pm is `H:MM?` in some rows and `HH:MM` in others (`11:30`, `10:15 on thursday`, `12:30`). Most of the 96 label-only errors counted below have this form. The same text appears with both labels across template and LLM rows.
2. Bare `12` as a range end or start: `12?` in the grammar, `12:00` when it came from `noon` or `midday` wording (`11am till midday` is `11?>12:00` here). Resolved equal in most cases.
3. A bare hour in a datetime where the LLM rows give a known time (`next sunday at 9` is `09:00` there, `9?` in grammar rows).
4. `d mon to bare-day` (`8 july to 16th`, `20 november until 23`): LLM rows share the month; grammar prefix rows label `13th dec until 1st` as only the start (`d 12-13`). Both exist, I kept the grammar reading.
5. `on <weekday>` alone: weekday date in v003 train (about 30 rows), weekly recurrence in the held-out templates (`on fr`, `on saturday for ...` is clear, `on mon at 3` is not). Only the unambiguous forms (`for N`, `until DATE`) were made recurrences.
6. Single spelled-out numbers: `eight` and `six pls` are `t 8?`/`t 6?` in LLM rows but `x` in grammar prefix rows (`seven` cut from `seven days ago`).
7. Dotted `h.mm`: `7.20` is a date `07-20` in grammar rows and a time in LLM rows (`9.30`, `11.30 till 12.30`). I read it as a time only with other time evidence.
8. Partial-prefix labels drop an unlabelled time chunk (`today 2:50` is `d +0d` when it is the prefix of `today 2:50 pm`).
9. A few labels look wrong: `113pm` as `13:15`, `mar 2 1950` as `03-02 19:50`, `sun 2030` as 20:30.

Counted on e1 errors, 96 of 640 are pure `?`/known or `12:00` vs `12?` differences (test_llm 39, test_template 27, val 20, test_noise 10), i.e. 0.9 points of the remaining 5.9.

## Next

- Weekday-list recurrences with typos and glued forms are the largest block left. A tokenizer-level split for `word/word` and `...until<month>` would address it.
- Decide the policy for items 1 to 3 and 5 at the next eval cut. They cap any text-only system, trained or not.
