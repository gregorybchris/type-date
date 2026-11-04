"""Export a trained experiment to ONNX for the browser and quantize it."""

import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


def export(exp: int, quant: str = "int8", prune_torch: bool = False) -> dict:
    name = f"exp-{exp:03d}"
    art = ROOT / "artifacts" / name
    src = art / "torch"
    fp32 = art / "onnx-fp32"
    if fp32.exists():
        shutil.rmtree(fp32)
    subprocess.run(
        [
            "uv", "run", "optimum-cli", "export", "onnx",
            "--model", str(src),
            "--task", "text2text-generation-with-past",
            "--opset", "17",
            str(fp32),
        ],
        check=True,
        cwd=ROOT / "training",
    )  # fmt: skip
    out = art / f"onnx-{quant}"
    if out.exists():
        shutil.rmtree(out)
    out.mkdir()
    from onnxruntime.quantization import QuantType, quantize_dynamic

    for f in sorted(fp32.glob("*.onnx")):
        if quant == "fp32":
            shutil.copy(f, out / f.name)
        else:
            quantize_dynamic(
                str(f),
                str(out / f.name),
                weight_type=QuantType.QUInt8 if quant == "int8" else QuantType.QInt8,
            )
    for f in fp32.glob("*.json"):
        shutil.copy(f, out / f.name)
    for f in src.glob("tokenizer*"):
        shutil.copy(f, out / f.name)
    for f in src.glob("special_tokens_map.json"):
        shutil.copy(f, out / f.name)
    onnx_files = sorted(out.glob("*.onnx"))
    sizes = {f.name: f.stat().st_size for f in onnx_files}
    cfg = json.loads((src / "config.json").read_text())
    manifest = {
        "experiment": name,
        "engine": "ort-custom",
        "quant": quant,
        "dir": f"onnx-{quant}",
        "files": {
            "encoder": "encoder_model.onnx",
            "decoder": "decoder_model.onnx",
            "decoder_with_past": "decoder_with_past_model.onnx",
            "tokenizer": "tokenizer.json",
        },
        "config": {
            "max_input_tokens": 63,
            "max_output_tokens": 39,
            "decoder_start_token_id": cfg["decoder_start_token_id"],
            "eos_token_id": cfg["eos_token_id"],
            "pad_token_id": cfg["pad_token_id"],
            "num_layers": cfg["num_layers"],
            "num_decoder_layers": cfg["num_decoder_layers"],
            "num_heads": cfg["num_heads"],
            "d_kv": cfg["d_kv"],
        },
    }
    (art / "manifest.json").write_text(json.dumps(manifest, indent=2))
    # download size for the browser: encoder + decoder (with past) + tokenizer
    need = [
        "encoder_model.onnx",
        "decoder_model_merged.onnx",
        "decoder_model.onnx",
        "tokenizer.json",
    ]
    total = sum((out / n).stat().st_size for n in need if (out / n).exists())
    run_dir = ROOT / "runs" / name
    cfgp = run_dir / "config.json"
    c = json.loads(cfgp.read_text())
    c["export"] = {"format": "onnx", "quant": quant}
    cfgp.write_text(json.dumps(c, indent=2))
    mp = run_dir / "metrics.json"
    m = json.loads(mp.read_text())
    m["model"]["onnx_sizes"] = sizes
    m["model"]["size_bytes"] = total
    mp.write_text(json.dumps(m, indent=2))
    if prune_torch:
        shutil.rmtree(fp32)
    return {"sizes": sizes, "download_bytes": total}
