"""Words and renderers shared by the generators."""

import random

MONTHS_FULL = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
]  # fmt: skip
MONTH_ABBR = {
    1: ["jan"], 2: ["feb"], 3: ["mar"], 4: ["apr"], 5: ["may"], 6: ["jun"],
    7: ["jul"], 8: ["aug"], 9: ["sep", "sept"], 10: ["oct"], 11: ["nov"], 12: ["dec"],
}  # fmt: skip
WD_CODES = ["su", "mo", "tu", "we", "th", "fr", "sa"]
WD_FULL = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
WD_ABBR = {
    "su": ["sun"], "mo": ["mon"], "tu": ["tue", "tues"], "we": ["wed", "weds"],
    "th": ["thu", "thur", "thurs"], "fr": ["fri"], "sa": ["sat"],
}  # fmt: skip
NUM_WORDS = {
    1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight",
    9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen",
    15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen",
    20: "twenty", 30: "thirty",
}  # fmt: skip
ORD_WORDS = {
    1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth", 6: "sixth", 7: "seventh",
    8: "eighth", 9: "ninth", 10: "tenth", 11: "eleventh", 12: "twelfth", 13: "thirteenth",
    14: "fourteenth", 15: "fifteenth", 16: "sixteenth", 17: "seventeenth", 18: "eighteenth",
    19: "nineteenth", 20: "twentieth", 21: "twenty first", 22: "twenty second",
    23: "twenty third", 24: "twenty fourth", 25: "twenty fifth", 26: "twenty sixth",
    27: "twenty seventh", 28: "twenty eighth", 29: "twenty ninth", 30: "thirtieth",
    31: "thirty first",
}  # fmt: skip
DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


def p2(n: int) -> str:
    return f"{n:02d}"


def ordinal(n: int) -> str:
    suf = "th" if 10 <= n % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suf}"


def month_text(rng: random.Random, m: int, mods: set[str]) -> str:
    r = rng.random()
    if r < 0.5:
        return MONTHS_FULL[m - 1]
    mods.add("abbreviation")
    ab = rng.choice(MONTH_ABBR[m])
    if rng.random() < 0.12:
        return ab + "."
    return ab


def wd_text(rng: random.Random, wd: str, mods: set[str]) -> str:
    if rng.random() < 0.6:
        return WD_FULL[WD_CODES.index(wd)]
    mods.add("abbreviation")
    ab = rng.choice(WD_ABBR[wd])
    if rng.random() < 0.1:
        return ab + "."
    return ab


def day_text(rng: random.Random, d: int, mods: set[str], allow_words: bool = True) -> str:
    r = rng.random()
    if r < 0.5:
        return str(d)
    if r < 0.88 or not allow_words:
        return ordinal(d)
    mods.add("word-numbers")
    return ORD_WORDS[d]


def num_text(rng: random.Random, n: int, mods: set[str]) -> str:
    if n in NUM_WORDS and rng.random() < 0.3:
        mods.add("word-numbers")
        return NUM_WORDS[n]
    return str(n)
