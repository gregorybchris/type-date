# exp-018: heuristic-full-8

## Hypothesis

A small normalization layer in front of heuristic-full-7 recovers most of the 20-point loss on misspelled and abbreviated phrases without hurting clean phrases.

## Method

- Engine `packages/baselines/src/heuristic-full-8.ts`. Helpers in `src/full-8/`: `normalize.ts` (typo and abbreviation rewrites), `relmonth.ts` (day of a relative month), `score.ts` (score and dozen). full-7 is reused unchanged except that `exact()` is exported so the layer can skip words full-7 already reads.
- Data: error analysis on `data/pool/typo/dev.jsonl` (1,054 rows) only, plus 194 hand-written typo/clean pairs of my own (no mechanical mutation). Regression checks on web dev (`dev`, `dev4`, `dev5`, `dev6`, n=1,573), real, real-hard, real-fmt dev, pool v2 and tax dev, and the clean source phrases. No row of `evals/e1..e9` or `data/pool/*/test*.jsonl` was read. e9 and e6 were scored as aggregates through `eval.ts`; `runs/exp-018/errors.jsonl` was not opened.
- Rounds on typo dev (exact): 74.3 -> 87.0 -> 92.3 -> 94.2. Gains 12.7, 5.3, 1.9. The next round had at most 7 typo-only failures left (0.7 point), so I stopped.
- Typo-only failure = clean text parses to the label, typo text does not. Before: 218. After: 7.

## Rules

1. Word fixes. A word is skipped if full-7 reads it exactly. Otherwise, against about 90 target words (weekdays, months, units, day parts, connectors, number words):
   - alias table for spellings no rule reaches (`wensday`, `agu`, `mai`, `teh`, `frm`, `bizness`, `dys`, `wends`, `haf`);
   - doubled letters (`agoo`, `christmass`);
   - dropped vowels where the typo is a subsequence of the target with the same consonants (`thrsdy`, `mndy`, `novmbr`, `evning`, `excpt`);
   - prefix of the consonants of a weekday or month (`thrus`);
   - one edit (also one adjacent swap) for targets of 6+ letters, two for long names;
   - plural kept for weekdays and units (`saturdys`, `weaks`).
2. Short forms spelled out for the v2 patterns: `nxt lst ea wk wks mth yr yrs hr hrs mins wkdays wkends wknds`. Also ` n ` to `and`.
3. Digits and letters for words, only in context: `2` to `to` between times or dates (`9am 2 5pm`, `Oct 2 2 oct 5`), `4` and `fr` to `for` before a duration, `2nite`, `2day`, `pst` to `past` before a count, `at non`, `@` to `at`, `9 thirty` to `9:30`, `1/2 an hour` to `half an hour`.
4. The last word is left alone when it is a prefix of a target (partial typing).
5. Day of a relative month (requirement added during the run): a day (digits, ordinal, ordinal word) next to a month phrase (`last/next/this month`, `the month before last`, `N months from now`, `in N months`, `a month ago`) in either order -> `d D13@M-1`; with a time, `dt D03@M-1 15:00`. Typo variants work because the rewrite runs after normalization. Tuned on `data/pool/misc/dev_relmonth.jsonl`: full-7 0.086, full-8 0.991 (n=116). Open: `the 13th of every other month` (`R m/2 d13`).
6. Score and dozen (requirement added during the run): `four score and seven years ago` -> `87 years ago`, `a dozen`, `two dozen`, `half a dozen`, `a score of`. Fires only with a count before the word and a day, week, month, year or fortnight unit after it.

## Results (exact)

| Set | full-7 | full-8 |
|---|---|---|
| typo dev (n=1,054) | 0.7429 | 0.9412 |
| typo-only failures | 218 | 7 |
| clean source phrases of typo dev | 0.9440 | 0.9450 |
| web dev pool (n=1,573) | 0.9580 | 0.9580 |
| real dev (288) | 0.9514 | 0.9514 |
| real-hard dev (223) | 0.8789 | 0.8789 |
| real-fmt dev (194) | 0.9588 | 0.9588 |
| pool v2 dev (93) | 0.9462 | 0.9462 |
| pool tax dev (142) | 0.8239 | 0.8239 |

The web dev pool is flat because +1 (`20 Mai 1999`) and -1 (`the 30th of this month`, see conflicts) cancel. Pool train sets (v2, tax, real*, v007 sample): tax train +0.5, v2 train -0.2 (one row, the same conflict), real train -0.1, v007 +0.1.

e9 (aggregate only; this run did not yet include the score and dozen rule):

| Split | full-7 | full-8 |
|---|---|---|
| test_typo (1,088) | 0.7371 | 0.9099 |
| val | 0.9737 | 0.9741 |
| test_template | 0.9321 | 0.9352 |
| test_noise | 0.9296 | 0.9303 |
| test_llm | 0.9527 | 0.9550 |
| test_external | 0.9609 | 0.9609 |
| test_external_hard | 0.8560 | 0.8599 |
| test_public | 0.9431 | 0.9431 |
| test_public2 | 0.8760 | 0.8926 |
| test_v2 | 0.9196 | 0.9330 |
| test_tax | 0.8436 | 0.8436 |
| test_web_heldout | 0.8093 | 0.8119 |
| test_web_sealed | 0.8845 | 0.8845 |
| test_web2_sealed | 0.9126 | 0.9126 |
| all | 0.9152 | 0.9309 |

e6 all: 0.9360 -> 0.9383 (before the final relative-month generalization).

e10 (aggregate only, final code): all 0.9064 -> 0.9313; test_new_forms (n=136) 0.0147 -> 0.9853; test_typo 0.7371 -> 0.9099; test_external_hard 0.8560 -> 0.8586; every other split equal to the e9 column above or up. Scoring full-7 on e10 added `evals.e10` to `runs/exp-017/metrics.json`.

Own pairs: 191 of 194 typo/clean pairs give the same DSL. Failures: `between 3 an 5pm`, `quarter 2 6`, `every mon at 9 4 4 weeks`.

## Cost

- Eager gzip 21.87 kB (full-7: 19.00 kB), +2.87 kB, under 3 kB. Lazy chunk 10.68 kB (+0.08 kB).
- Node latency on e6 (includes first lazy import): p50 0.099 ms, p95 about 0.56 ms (full-7 p95 0.54). On typo dev texts: p50 0.14, p95 0.76, p99 1.5 ms. Not measured on a phone.
- `validate-data.ts` on full-8 predictions for 65,984 texts (web dev, typo dev and clean, v2, tax, real*, v007 train): 0 bad. The same run for full-7 had 3 bad (`forth Thursday`, `pst 2 wknds`, `wknds only, 10 to noon`).

## False-rewrite checks

- Listed every word the layer changes over 63,876 clean-ish pool rows and read the list. Found and fixed: `form` -> `from`, `non-refundable` -> `non-noon`, `pst` zone -> `past`, `reminder` -> `remainder`, `tomnight`, `yeah` -> `year`, `friday9am`, `11:50 am 2 months ago` (`2` to `to`). Most remaining changes are typos injected into v007 and the real sets.
- Known remaining risk: `weak` -> `week`, `weeds` -> `weeks`, `mouth` -> `month`, `evenings` -> `evening`.
- Score and dozen: 23 pool rows contain `score` or `dozen`; the rule changes 7 of them, all `a score of years ago`. Vitest checks `final score at 7pm`, `score 3 days`, `the score was 4 to 2 at 5pm`, `a dozen eggs tomorrow`, `four score` and `score and seven years ago` stay unchanged.

## Label conflicts (day of a relative month)

The old pool labels use concrete or day-only forms. Rows whose text now takes the new rule: 17 rows, 5 distinct texts.
- `the 15th of this month` / `the 30th of this month` / `teh 15th of this mnth` label `D@15` / `D@30` (v2 train, web dev4, typo dev): 3 distinct texts. full-8 gives `D15@M+0`. This costs 1 row on web dev (-0.06 point), 1 on typo dev and 1 on v2 train. Both forms mean the same day; the pool should be relabeled or the DSL should say which one wins.
- `on the 3rd of next month at half past two` is `dt 12-03 2:30?` (real-hard train) and `the 10th of this month at nine pm` is `dt 11-10 21:00` (real train, v007): concrete dates that depend on the label date. full-8 gives `dt D03@M+1 2:30?` and `dt D10@M+0 21:00`.
- `a score of years ago` is `x` in one real-fmt row and `d -20y` in a hand-written row. full-8 gives `d -20y`.
Labels were not edited.

## Remaining clusters

- Plural lost in abbreviations: `i need thurs in dec` (label is recurring), `every febuary on weds`, `wends each dec` (`wends` is read as `wed`).
- Digits and short words for words: `quarter 2 6`, `an` for `and`, bare `9 4 4 weeks`, `half tn`, `st 8`.
- Dropped letters inside non-lexicon words (`movd`, `ofice`, `anex`) have no effect on the parse; ignore.
- `thru` vs `to` in `week 4 thru 8 nov`: full-7 treats them differently.
- Foreign-language months (`Mai`, `Februar`) beyond the single `mai` alias.
- The e9 typo split still has 9% failures. Most are probably in clean-phrase failures plus misspellings of words outside the target list; check the clean-phrase accuracy of e9 test_typo to separate them.
