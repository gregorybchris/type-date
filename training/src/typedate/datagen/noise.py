"""Seeded noise operations. Noise must not change the label."""

import random

QWERTY_NEIGHBORS = {
    "q": "wa", "w": "qes", "e": "wrd", "r": "etf", "t": "ryg", "y": "tuh", "u": "yij",
    "i": "uok", "o": "ipl", "p": "ol", "a": "qsz", "s": "awdx", "d": "sefc", "f": "drgv",
    "g": "fthb", "h": "gyjn", "j": "hukm", "k": "jilm", "l": "kop", "z": "asx", "x": "zsdc",
    "c": "xdfv", "v": "cfgb", "b": "vghn", "n": "bhjm", "m": "njk",
}  # fmt: skip

# Ops reserved for the noise test split. Never applied to train or val data.
HELD_OUT_OPS = {"merge-spaces", "double-space-run"}
TRAIN_OPS = [
    "typo-keyboard", "typo-swap", "typo-drop", "typo-double", "case-upper", "case-title",
    "case-random", "space-extra", "space-tight", "punct-trail",
]  # fmt: skip
PREFIX_SAFE_OPS = ["case-upper", "case-title", "case-random", "space-extra", "punct-trail"]


def _typo_targets(text: str) -> list[tuple[int, int]]:
    spans = []
    i = 0
    while i < len(text):
        if text[i].isalpha():
            j = i
            while j < len(text) and text[j].isalpha():
                j += 1
            if j - i >= 4:
                spans.append((i, j))
            i = j
        else:
            i += 1
    return spans


def apply_op(rng: random.Random, text: str, op: str) -> str:
    if op.startswith("typo"):
        spans = _typo_targets(text)
        if not spans:
            return text
        a, b = rng.choice(spans)
        pos = rng.randrange(a + 1, b)  # keep the first letter, as people usually do
        ch = text[pos]
        if op == "typo-keyboard" and ch.lower() in QWERTY_NEIGHBORS:
            return text[:pos] + rng.choice(QWERTY_NEIGHBORS[ch.lower()]) + text[pos + 1 :]
        if op == "typo-swap" and pos + 1 < b:
            return text[:pos] + text[pos + 1] + text[pos] + text[pos + 2 :]
        if op == "typo-drop":
            return text[:pos] + text[pos + 1 :]
        if op == "typo-double":
            return text[:pos] + ch + text[pos:]
        return text
    if op == "case-upper":
        return text.upper()
    if op == "case-title":
        return text.title()
    if op == "case-random":
        return "".join(c.upper() if rng.random() < 0.4 else c for c in text)
    if op == "space-extra":
        return text.replace(" ", "  ", 1) if " " in text else text + " "
    if op == "space-tight":
        for sep in (" - ", " to ", " – "):
            if sep in text:
                return text.replace(sep, sep.strip(), 1)
        return text.replace(" ", "", 1) if " " in text else text
    if op == "punct-trail":
        return text + rng.choice([".", "!", "?", " ."])
    if op == "merge-spaces":
        return text.replace(" ", "")
    if op == "double-space-run":
        return text.replace(" ", "   ")
    return text


def tags_for(op: str) -> str:
    if op.startswith("typo"):
        return "typo-keyboard" if op == "typo-keyboard" else "typo"
    if op.startswith("case"):
        return "casing"
    if op.startswith("space") or op in HELD_OUT_OPS or op == "punct-trail":
        return "spacing"
    return op
