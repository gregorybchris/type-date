# exp-004: from-scratch encoder-decoder, 9.7M params, dataset v001

Status: failed because of a bug. Kept as a record.

## Setup

- Model: T5-style encoder-decoder from scratch. d_model 256, 4+4 layers, 4 heads, gated-GELU FFN 1024, BPE vocab 1000. 9.7M parameters.
- Data: `v001` (grammar only, 47k train rows).
- Training: 10 epochs, batch 128, lr 1e-3 with cosine decay, AdamW, MPS. 709 s.
- Input is lowercased text. Output is a DSL line (`specs/dsl.md`).

## Results

| Split | Exact |
|---|---|
| val | 0.616 |
| test_template | 0.227 |
| test_noise | 0.570 |
| all | 0.390 |

Resolved match over all splits: 0.398. Average output length: 4.9 tokens.

Worst tags: month-or-year-only 0.00, recurrence-weekly 0.01, recurrence-interval 0.03, recurrence-daily 0.03, period-relative 0.03.

## Cause

The tokenizer had a `Lowercase` normalizer. It also lowercased the DSL labels, so `R`, `W+1`, `M@10`, `Y@2028` became `r`, `w+1`, `m@10`, `y@2028` and could never match. Every tag that uses an uppercase DSL token scored near zero.

Other errors visible in the sample, which remain after the fix:
- Digit order in date ranges: `december. 26 to 5th jan.` predicted `12-05>01-26`.
- Digit copying: `14:15 to 15:45` predicted `t 14:15>15:15`.
- Training was short. The loss was still falling.

## Next

- exp-005: fix the tokenizer, use `v002`, train 20 epochs.
- exp-006: same, with one token per digit, to test whether digit copying improves.
