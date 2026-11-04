# Models and training: research notes

Date: 2026-11-03. Task: text to structured output (~30-60 tokens), in-browser, React, npm package. Training on MacBook M2, 16GB RAM, ~10GB disk.

Confidence labels: [verified] = read from a source this session. [estimate] = my arithmetic or prior knowledge, not checked against a source. Verify before relying on [estimate] numbers.

## 1. Summary and recommendation

- Model size is the main constraint. Every pretrained candidate that is verified is far above the 50MB target. Only a from-scratch tiny model, or a pretrained model with a pruned vocabulary, can reach 10-30MB.
- Embeddings dominate small models. Gemma 3 270M has ~170M embedding params and ~100M transformer params [estimate]. Its q4 ONNX is 323MB [verified].
- The task is narrow: a closed output grammar, a short input, no world knowledge needed beyond weekday/month names and number words. A from-scratch encoder-decoder (5-15M params, 2-8k BPE vocab) is the best fit for size and latency. Training data can be generated synthetically at any scale.
- Pretrained models add value mainly for robustness to odd phrasing. Test whether that matters with a pruned t5-small as a second experiment.
- Add grammar-constrained decoding (or at least a cheap validity check plus fallback) regardless of model.

## 2. Candidate models

Sizes marked [verified] come from Hugging Face file listings. Others are [estimate].

| Model | Params | fp32 ONNX | int8 | q4 | Browser / Transformers.js |
|---|---|---|---|---|---|
| Custom enc-dec, d=256, 4+4 layers, 4k vocab | ~8-9M [estimate] | ~34MB | ~9MB | ~5MB | Export via torch.onnx or optimum with a T5/BART-style config; Transformers.js supports T5, BART, Marian architectures [estimate]. Fully controllable. |
| Custom decoder-only, d=256, 6 layers, 4k vocab | ~5-6M [estimate] | ~22MB | ~6MB | ~3MB | Needs a Llama-style or GPT-2 config to load in Transformers.js. Prompt and output share the sequence. |
| t5-small | 60M | decoder 167MB + encoder 141MB (merged decoder) [verified] | encoder 35.5MB + decoder 42.4MB (`_quantized`) = ~78MB [verified] | ~160MB combined; q4 is poor here [verified] | Yes, Xenova/t5-small works in Transformers.js [verified]. Vocab 32k x 512 = 16M embedding params [estimate]. |
| t5-small, vocab pruned to ~4k | ~46M [estimate] | ~185MB | ~46MB [estimate] | ~25-30MB [estimate] | Same architecture, so works. Needs a new SentencePiece model or a subset remap (see section 4). |
| flan-t5-small | 77M (flan-t5-small has gated FFN, 32k vocab) [estimate] | enc ~36MB int8, dec ~59MB unquantized [verified] | ~90MB [estimate] | n/a | Yes [verified]. Larger than t5-small with no clear gain for this task. |
| mt5-small | ~300M, ~250k vocab [estimate] | ~1.2GB | ~300MB | ~150MB | Exports, but vocab pruning is mandatory. A tutorial exists for SentencePiece pruning [verified: Medium link below]. Not a first choice. |
| byT5-small | ~300M [estimate] | ~1.2GB | ~300MB | n/a | Byte-level, no vocab problem, but 12 enc layers and long sequences make decode slow. Rule out. |
| CodeT5-small | 60M | ~240MB | ~60-80MB [estimate] | n/a | T5 architecture, 32k BPE vocab. No advantage over t5-small for dates. |
| BART-base / tiny BART | 140M base; tiny variants are custom | n/a | n/a | n/a | Supported in Transformers.js. A from-scratch BART config at d=256 is equivalent to the custom enc-dec row. |
| SmolLM2-135M | 135M; embedding 49152 x 576 = ~28M [estimate] | 540MB [verified] | 136MB (int8/uint8) [verified] | q4 182MB, q4f16 117MB [verified] | Yes, onnx-community/SmolLM2-135M-ONNX [verified]. |
| SmolLM2-360M | 360M | ~1.4GB | ~350MB | ~200-250MB [estimate] | Yes, but too large. |
| Gemma 3 270M | 270M; ~170M embeddings [estimate] | 1.14GB (model.onnx_data) [verified] | 545MB (`_quantized`) [verified] | q4 323MB, q4f16 273MB, fp16 570MB [verified] | Yes, onnx-community/gemma-3-270m-it-ONNX [verified]. Google has a fine-tune-and-convert notebook. Google targets <300MB memory [verified]. |
| LFM2-350M | 350M | 1.45GB [verified] | 510MB [verified] | q4 294MB, q4f16 255MB [verified] | Yes, onnx-community/LFM2-350M-ONNX exists [verified]. Too large. |
| Qwen2.5-0.5B / Qwen3-0.6B | 500-600M | 2GB+ | 500MB+ | 300MB+ [estimate] | Supported but far over budget. |
| MobileLLM 125M | 125M | ~500MB | ~125MB | ~70MB [estimate] | Llama-like; export possible. Not better than SmolLM2-135M in practice for this use. |
| Pythia-70M | 70M | ~280MB | ~70MB | ~40MB [estimate] | GPT-NeoX; Transformers.js support exists [estimate]. Embedding 50k x 512 = 25M. |
| TinyStories-1M/3M/8M (GPT-Neo) | 1-8M plus a 50k vocab embedding | embedding alone ~20-40MB at d=64-256 [estimate] | | | Architecture is small but the GPT-2 vocab is wasteful. Use only as a config reference. A custom tokenizer is better. |

Decode latency notes [estimate]:
- Browser WASM runs ~10-50 tokens/s for a 100M+ model and far faster for a 10M model.
- A 10M-param model can decode 50 tokens in well under 100ms on WASM. A 100M+ model takes ~1-3s. WebGPU helps larger models but adds startup cost and compatibility risk.
- For tiny models, ONNX session init and weight download dominate, not decode.

Conclusion: the pretrained options at or under ~50MB are only the pruned t5-small variants. SmolLM2-135M at q4f16 (117MB) and Gemma 270M (273MB+) fail the size target unless the vocab is pruned and layers are cut.

## 3. Fine-tuning on Apple Silicon

### Options
- **PyTorch MPS + custom loop or HF Trainer.** Works for models up to ~300M in fp32 on 16GB. A source comparing MPS and MLX on a 16GB Mac for Qwen 2.5 0.5B-3B reports MPS 2.2x-5.7x faster raw throughput, but a hard memory wall at 3B fp16 [verified, snippet only, see link]. For tiny models, MPS is fine.
- **MLX / mlx-lm.** Good for LoRA and QLoRA on 1B+ decoder LLMs. 4-bit QLoRA fits 3B+ models on 16GB [verified, snippet]. mlx-lm does not cover T5-style encoder-decoders well, and a custom from-scratch model needs hand-written MLX code. Not needed here.
- **LoRA vs full fine-tune.** For models under ~150M, use full fine-tuning. LoRA saves memory that is not scarce at this size, and LoRA weights must be merged before export. Full fine-tuning also lets you change the vocab.
- **CPU.** For a 5-10M-param model, CPU on M2 is workable but MPS is faster.

### Pitfalls (mostly [estimate], from experience and PyTorch issue trackers; verify on the pinned versions)
- Set `PYTORCH_ENABLE_MPS_FALLBACK=1` so unsupported ops fall back to CPU instead of raising.
- fp16 training on MPS is unreliable and may give NaNs. bf16 support on MPS depends on macOS and PyTorch version. For small models use fp32. Mixed precision gives little gain on M2.
- Some ops are slow or buggy on MPS: large `cumsum`, `unique`, some indexing with int64, non-contiguous tensor copies. Keep padding and masks simple.
- Memory is shared with the OS. Keep batch size modest and watch swap. 16GB handles a 100M model with batch 32 and sequence length 64.
- Use `torch.mps.empty_cache()` between eval phases. No DataLoader multiprocessing issues if the dataset is pre-tokenized in memory.
- System Python is 3.9. Use `uv` to create a 3.11 or 3.12 venv. Recent PyTorch and optimum drop 3.9.
- Disk budget (10GB): the PyTorch wheel (~0.2-1GB), optimum/onnxruntime (~0.5GB), HF cache. Do not download multi-GB checkpoints; avoid Qwen 0.6B and above. Set `HF_HOME` to a known folder and clean it.

### Training time estimates on M2 [estimate, not measured]
Assumes sequences of ~20 input + ~50 output tokens, MPS, fp32.

| Setup | Throughput guess | 1M examples x 3 epochs |
|---|---|---|
| Custom enc-dec, 8M params | ~8-15k examples/s forward+backward is optimistic; plan ~2-5k examples/s | ~0.5-2 hours |
| Pruned t5-small, 46M | ~300-800 examples/s | ~1.5-3 hours for 1M examples x 1 epoch; ~6-8 hours for 3 epochs |
| SmolLM2-135M full FT | ~100-250 examples/s | ~3-8 hours per 1M examples (100k examples per epoch is more realistic: <1 hour) |
| Gemma 3 270M full FT | ~40-100 examples/s | Likely needs LoRA or small data on 16GB; ~100k examples = 0.5-1 hour |

Measure the first 200 steps of each run and extrapolate before committing.

## 4. Export and quantization pipeline

1. Export. `optimum-cli export onnx --model <dir> --task text2text-generation-with-past <out>` for encoder-decoder models. `--task text-generation-with-past` for decoders. This yields encoder_model.onnx, decoder_model.onnx, decoder_with_past_model.onnx and a merged decoder. Transformers.js has its own conversion script (scripts/convert.py in the transformers.js repo) that also applies quantization; it produces the file set seen in Xenova/t5-small (fp16, int8, uint8, q4, q4f16, bnb4) [verified listing].
2. Quantize.
   - int8/uint8 dynamic via `onnxruntime.quantization.quantize_dynamic`. For t5-small, the decoder goes 167MB to 42MB with `_quantized` [verified]. The listing also shows `_int8` at 108MB, which presumably uses different settings (embedding/Gather left unquantized); the `_quantized` file is the smaller one [verified sizes, interpretation is mine].
   - fp16 halves size; good if WebGPU is the target. WASM runs fp16 poorly.
   - q4 (MatMulNBits) works well on decoder-only LLMs. On t5-small the q4 files (~80MB) are no smaller than fp16, since the large Gather embedding stays fp32 [verified sizes]. Do not expect q4 to help encoder-decoders much.
   - For a model under 10M params, int8 dynamic is sufficient. Check accuracy after quantization; run the full eval set on the quantized ONNX, not only on PyTorch weights.
3. Share embeddings. Tie input and output embeddings (T5 small does; many custom configs can). Saves a full vocab x d matrix.
4. Vocab pruning and replacement.
   - Keep only tokens that appear in the training corpus. Remap input ids and slice embedding and lm_head rows. Tutorial for SentencePiece: https://medium.com/the-artificial-impostor/reducing-the-sentencepiece-vocabulary-size-of-pretrained-nlp-models-3bfec491618d [verified]. A COLING 2025 paper reports vocab reduction compresses the embedding layer without significant loss, and notes direct BPE pruning is hard so the tokenizer is rebuilt [verified, snippet].
   - A small T5-small headline model reports ~50MiB after distillation and quantization, down from 242MiB [verified, snippet]. This supports the ~46MB estimate above.
   - For a narrow task, a new tokenizer (BPE or unigram, 2-8k vocab) trained on the synthetic corpus is simpler for from-scratch models.
5. Layer pruning. Drop layers from a pretrained model (e.g., t5-small 6+6 to 3+3) and recover with distillation or continued fine-tuning.
6. Knowledge distillation. Train a large teacher (or use an LLM to label), then train the small student on teacher outputs (sequence-level distillation). With synthetic data generated by rules, the rule-based generator is already a perfect teacher and distillation is unnecessary. Distillation is useful only if labels come from an LLM on noisy real-world phrasing.
7. Weights file format. Check that the npm package ships quantized weights as a separate, cacheable file, and that gzip/brotli is applied by the CDN. int8 weights compress little.
8. Runtime. onnxruntime-web (WASM, SIMD, threads need cross-origin isolation headers; assume single-thread) or Transformers.js. For a custom model, calling onnxruntime-web directly with a hand-written greedy decoder loop gives full control over constrained decoding and avoids the Transformers.js bundle (~hundreds of KB plus WASM ~10MB). Weigh this against package size.

## 5. Tricks for narrow-domain tiny models

- **From scratch vs fine-tune.** For a closed grammar with synthetic data in the millions, from scratch generally matches or beats fine-tuning, and trains in hours [estimate; common experience from semantic-parsing literature such as text-to-SQL and TOP/ATIS-style tasks]. Pretraining helps most when real data is scarce. Here data is generated, so the main risk is distribution mismatch between synthetic and real user input, not data volume.
- **Data scaling.** Expect rapid gains up to ~100k examples, then slower gains up to ~1-5M. Test with 10k, 100k, 1M and plot exact-match accuracy to choose the stopping point [estimate].
- **Curriculum.** Start with single dates and times, then add ranges, recurrences, relative phrases, then combinations and typos. Alternatively mix everything and upweight rare constructs. Hold out entire templates (compositional split) to measure generalization, not only random splits.
- **Augmentation.** Case changes, typos (keyboard-adjacent), missing spaces, abbreviations (oct, tmrw, thurs), ordinals, number words, punctuation, filler words ("please", "on"), 12h/24h formats, locale variants (DD/MM vs MM/DD with a locale flag in the input), dropped "to". Add noise-only negatives that should map to an explicit "none/invalid" output.
- **Reference date.** Relative phrases need "today" as input. Put the reference date and weekday in the input prefix (e.g., `2026-11-03 Tue | last friday`). Randomize the reference date during training. This keeps the model free of date arithmetic: prefer output that is symbolic (`last friday` -> `{rel: -1, weekday: fri}`) so the React code resolves dates. This shortens outputs and removes calendar math from the model.
- **Output format.** Use compact, regular text with few tokens. Prefer key=value tokens over JSON braces and quotes. Add each keyword (weekday, month, unit) as a single token in the custom vocab. Fewer output tokens means lower latency.
- **Constrained decoding.** Write the output grammar as a finite-state machine or small CFG. At each step, mask logits to allowed tokens. For a hand-written decoder loop (greedy, batch 1) this takes ~50 lines and negligible cost. Transformers.js lacks built-in grammar support as far as I know [estimate; verify]. Libraries such as llama.cpp GBNF, outlines, and transformers-cfg exist for Python/server use, not for the browser. A constrained decoder guarantees syntactic validity but not semantic correctness. Add a confidence score (mean logprob) and show "did you mean" or fall back to a regex parser when low.
- **Evaluation.** Track exact-match on a hand-written real-phrase set (a few hundred cases) separate from synthetic validation. Log failures into new templates.
- **Hybrid.** A rule-based parser (e.g., chrono-style) may handle the easy 80% with zero download. Use the model for the rest. Decision for the product spec, not for this document.

## 6. First experiments, in priority order

1. **Custom enc-dec transformer from scratch, ~8M params.** d=256, 4+4 layers, 4 heads, FFN 1024, tied embeddings, 4k BPE/unigram vocab trained on the synthetic corpus. Size: ~9MB int8, ~34MB fp32. Decode: tens of ms for 50 tokens on WASM [estimate]. Train: 1-2 hours on 1M examples on MPS [estimate]. Rationale: best size/latency, the task is closed. Build this first as the baseline.
2. **Same recipe, decoder-only (~6M).** Prompt + output in one sequence. Simpler export (Llama/GPT config loads in Transformers.js), KV cache works well. Compare accuracy with experiment 1 at equal params. Size ~6MB int8.
3. **Smaller/larger sweep of experiment 1.** d=128 (~2.5M params, ~3MB int8) and d=384 (~20M, ~20MB int8). Find the size/accuracy knee. Cheap; reuse the same pipeline.
4. **t5-small with vocab pruned to the task tokenizer.** ~46M params, ~46MB int8 [estimate]. Needs embedding remap and fine-tuning ~1-3 hours per run. Rationale: tests whether pretraining improves robustness to messy input. If it beats experiment 1 by a clear margin on real phrases, consider it. Expect decode ~100-300ms for 50 tokens on WASM [estimate].
5. **t5-small with layers cut to 3+3 and pruned vocab.** ~25M params, ~25MB int8 [estimate]. Only if experiment 4 wins on accuracy and needs shrinking.
6. **SmolLM2-135M with pruned vocab (~4k) and full fine-tune.** ~108M params after pruning [estimate], ~108MB int8, ~60MB q4. Over budget; run only as an accuracy upper bound to learn how much headroom the small models leave. Time: <1 hour for 100k examples [estimate]. Skip Gemma 3 270M, LFM2, Qwen, byT5, mt5: the sizes are verified too large (Gemma q4 323MB, LFM2 q4 294MB) and they add no benefit for this grammar.

## 7. Open questions to verify early

- Does Transformers.js load a custom-config T5/BART with a custom tokenizer.json at this size? (Test with experiment 1 in week one.)
- Is a hand-written onnxruntime-web decoder loop smaller and faster than Transformers.js for this package? Measure bundle size and cold start.
- Actual MPS throughput. Measure, do not trust the table in section 3.
- Reference-date handling and locale: decide in the output spec before generating data, since changing it invalidates the corpus.

## Sources

- Gemma 3 270M fine-tune and on-device guide: https://developers.googleblog.com/own-your-ai-fine-tune-gemma-3-270m-for-on-device/
- Gemma 3 270M ONNX file list: https://huggingface.co/onnx-community/gemma-3-270m-it-ONNX/tree/main/onnx
- t5-small ONNX file list: https://huggingface.co/Xenova/t5-small/tree/main/onnx
- flan-t5-small ONNX: https://huggingface.co/Xenova/flan-t5-small
- SmolLM2-135M ONNX file list: https://huggingface.co/onnx-community/SmolLM2-135M-ONNX/tree/main/onnx
- LFM2-350M ONNX file list: https://huggingface.co/onnx-community/LFM2-350M-ONNX/tree/main/onnx
- MPS vs MLX on 16GB Mac (secondary; original post not opened): https://dzone.com/articles/fine-tuning-llms-locally-using-mlx-lm-guide and https://yingqiangge.github.io/posts/2026/03/mlx-quantization-finetuning
- SentencePiece vocab reduction tutorial: https://medium.com/the-artificial-impostor/reducing-the-sentencepiece-vocabulary-size-of-pretrained-nlp-models-3bfec491618d
- Vocabulary reduction (COLING 2025 industry): https://aclanthology.org/2025.coling-industry.64.pdf
- Shrunk T5-small example: https://huggingface.co/tarekziade/t5-small-headline-generator-sft-3-3
