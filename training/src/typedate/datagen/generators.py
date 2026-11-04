"""Grammar generators. Each one samples a structured intent, renders text, and returns the DSL label.

Text is built from chunks. Each chunk carries the DSL label that is correct if the text is cut right
after it. This gives prefix examples (partial typing) with program-made labels.
"""

import random
from collections.abc import Callable
from dataclasses import dataclass, field

from .vocab import (
    DAYS_IN_MONTH,
    ORD_WORDS,
    WD_CODES,
    WD_FULL,
    day_text,
    month_text,
    num_text,
    ordinal,
    p2,
    wd_text,
)

# Canonical weekday order inside DSL day lists: monday first.
CANON = ["mo", "tu", "we", "th", "fr", "sa", "su"]
WEEKDAYS5 = ["mo", "tu", "we", "th", "fr"]


@dataclass
class Chunk:
    text: str
    label: str | None = None  # DSL if the text is cut right after this chunk
    glue: bool = True  # preceded by a space
    kind: str = ""  # "month", "weekday", "kw" allow mid-word cuts


@dataclass
class Ex:
    chunks: list[Chunk]
    dsl: str
    tag: str
    template: str
    mods: set[str] = field(default_factory=set)

    @property
    def text(self) -> str:
        out = ""
        for i, c in enumerate(self.chunks):
            out += (" " if (c.glue and i > 0) else "") + c.text
        return out


def C(text: str, label: str | None = None, glue: bool = True, kind: str = "") -> Chunk:
    return Chunk(text, label, glue, kind)


def words(s: str, label: str | None = None) -> list[Chunk]:
    """Split on spaces into chunks. The label applies to the last chunk."""
    ws = s.split(" ")
    return [C(w, label if i == len(ws) - 1 else None) for i, w in enumerate(ws)]


def pick(rng: random.Random, items: list, weights: list[float] | None = None):
    return rng.choices(items, weights=weights)[0] if weights else rng.choice(items)


# ---------------------------------------------------------------- dates


@dataclass
class DateR:
    chunks: list[Chunk]  # labels here are DSL *date* fragments; wrapped later by `wrap`
    dsl: str  # date DSL fragment, e.g. 10-02
    form: str
    mods: set[str]


def md_date(rng: random.Random, m: int | None = None, d: int | None = None) -> DateR:
    m = m or rng.randint(1, 12)
    d = d or rng.randint(1, DAYS_IN_MONTH[m - 1] if m != 2 else 28)
    mods: set[str] = set()
    dsl = f"{p2(m)}-{p2(d)}"
    form = pick(
        rng,
        ["mon_d", "d_mon", "the_ord_of_mon", "slash", "mon_dot_d", "ord_mon"],
        [38, 18, 6, 16, 3, 8],
    )
    if form == "slash" and d > 12 and rng.random() < 0.25:
        return DateR([C(f"{d}/{m}")], dsl, "slash_dm", mods)
    if form == "slash":
        sep = pick(rng, ["/", "-"], [92, 8])  # no "." (ambiguous with times like 7.20)
        return DateR([C(f"{m}{sep}{d}")], dsl, "slash", mods)
    mon = month_text(rng, m, mods)
    if form == "mon_d":
        dt = day_text(rng, d, mods)
        return DateR([C(mon, f"M@{p2(m)}", kind="month"), C(dt)], dsl, form, mods)
    if form == "mon_dot_d":
        return DateR([C(mon + ".", kind="month"), C(str(d))], dsl, form, mods)
    if form == "d_mon":
        dt = day_text(rng, d, mods)
        return DateR([C(dt), C(mon, kind="month")], dsl, form, mods)
    if form == "ord_mon":
        return DateR([C(ordinal(d)), C(mon, kind="month")], dsl, form, mods)
    # the_ord_of_mon
    dt = ordinal(d) if rng.random() < 0.8 else ORD_WORDS[d]
    if dt not in (ordinal(d),):
        mods.add("word-numbers")
    return DateR([C("the"), C(dt), C("of"), C(mon, kind="month")], dsl, form, mods)


def year_date(rng: random.Random) -> DateR:
    m = rng.randint(1, 12)
    d = rng.randint(1, 28)
    y = rng.randint(2024, 2032)
    mods: set[str] = set()
    dsl = f"{y}-{p2(m)}-{p2(d)}"
    form = pick(rng, ["mon_d_y", "mon_d_comma_y", "iso", "slash_y", "slash_yy", "d_mon_y"])
    if form == "iso":
        return DateR([C(dsl)], dsl, form, mods)
    if form == "slash_y":
        return DateR([C(f"{m}/{d}/{y}")], dsl, form, mods)
    if form == "slash_yy":
        return DateR([C(f"{m}/{d}/{y % 100:02d}")], dsl, form, mods)
    mon = month_text(rng, m, mods)
    if form == "d_mon_y":
        return DateR([C(day_text(rng, d, mods, False)), C(mon), C(str(y))], dsl, form, mods)
    dt = day_text(rng, d, mods, False)
    if form == "mon_d_comma_y":
        return DateR([C(mon), C(dt + ","), C(str(y))], dsl, form, mods)
    return DateR([C(mon), C(dt), C(str(y))], dsl, form, mods)


REL_DAY = {
    "today": "+0d",
    "tomorrow": "+1d",
    "yesterday": "-1d",
    "day after tomorrow": "+2d",
    "the day after tomorrow": "+2d",
    "day before yesterday": "-2d",
    "the day before yesterday": "-2d",
    "tmrw": "+1d",
    "tmr": "+1d",
    "2morrow": "+1d",
    "yday": "-1d",
    "tdy": "+0d",
}
REL_ABBR = {"tmrw", "tmr", "2morrow", "yday", "tdy"}


def rel_day(rng: random.Random) -> DateR:
    key = pick(
        rng,
        list(REL_DAY),
        [14, 18, 8, 3, 2, 1, 1, 6, 4, 1, 3, 1],
    )
    mods = {"abbreviation"} if key in REL_ABBR else set()
    return DateR([C(w, kind="kw") for w in key.split(" ")], REL_DAY[key], "rel_day", mods)


def weekday_ref(rng: random.Random, wd: str | None = None) -> DateR:
    wd = wd or rng.choice(WD_CODES)
    mods: set[str] = set()
    w = wd_text(rng, wd, mods)
    form = pick(
        rng,
        ["bare", "this", "on", "coming", "next", "last", "past", "previous", "nxt", "lst"],
        [12, 8, 4, 2, 24, 24, 3, 3, 3, 2],
    )
    if form == "bare":
        return DateR([C(w, kind="weekday")], wd, form, mods)
    kw = {"this": "this", "on": "on", "coming": "coming", "next": "next", "last": "last",
          "past": "past", "previous": "previous", "nxt": "nxt", "lst": "lst"}[form]  # fmt: skip
    if form in ("nxt", "lst"):
        mods.add("abbreviation")
    dsl = {"next": f"{wd}+1", "nxt": f"{wd}+1", "last": f"{wd}-1", "lst": f"{wd}-1",
           "past": f"{wd}-1", "previous": f"{wd}-1"}.get(form, wd)  # fmt: skip
    return DateR([C(kw), C(w, kind="weekday")], dsl, form, mods)


def offset_date(rng: random.Random) -> DateR:
    mods: set[str] = set()
    unit = pick(rng, ["d", "w", "m", "y"], [40, 30, 22, 8])
    n = rng.choice([1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 10, 14, 30])
    if unit == "m":
        n = rng.choice([1, 2, 3, 4, 6])
    if unit == "y":
        n = rng.choice([1, 2])
    names = {"d": ["day", "days", "d"], "w": ["week", "weeks", "wk", "wks", "w"],
             "m": ["month", "months", "mo", "mos"], "y": ["year", "years", "yr", "yrs"]}  # fmt: skip
    unit_word = names[unit][0 if n == 1 else 1]
    if rng.random() < 0.15:
        unit_word = rng.choice(names[unit][2:])
        mods.add("abbreviation")
    if n == 1 and rng.random() < 0.4:
        nt = "a" if unit_word not in ("year",) else "a"
        if rng.random() < 0.3:
            nt = "an" if unit_word.startswith("hour") else "a"
        mods.add("word-numbers")
    else:
        nt = num_text(rng, n, mods)
    form = pick(rng, ["in", "ago", "from_now", "from_today"], [45, 30, 15, 5])
    sign = "-" if form == "ago" else "+"
    dsl = f"{sign}{n}{unit}"
    glued = rng.random() < 0.08 and unit_word in ("d", "w", "wk", "wks", "yr", "yrs", "mo")
    qty = [C(f"{nt}{unit_word}")] if glued else [C(nt), C(unit_word, kind="kw")]
    if form == "in":
        chunks = [C("in")] + qty
    elif form == "ago":
        chunks = qty + [C("ago", kind="kw")]
    elif form == "from_now":
        chunks = qty + [C("from"), C("now")]
    else:
        chunks = qty + [C("from"), C("today")]
    return DateR(chunks, dsl, f"off_{form}", mods)


def date_any(rng: random.Random) -> DateR:
    r = rng.random()
    if r < 0.45:
        return md_date(rng)
    if r < 0.62:
        return rel_day(rng)
    if r < 0.88:
        return weekday_ref(rng)
    if r < 0.95:
        return offset_date(rng)
    return year_date(rng)


def label_date(chunks: list[Chunk], dsl: str, prefix: str = "d ", end_label: str | None = None):
    """Attach DSL labels to a date's chunks: the last chunk gets the full date label."""
    out = [Chunk(c.text, c.label and prefix + c.label, c.glue, c.kind) for c in chunks]
    out[-1] = Chunk(out[-1].text, end_label or f"{prefix}{dsl}", out[-1].glue, out[-1].kind)
    return out


# ---------------------------------------------------------------- times


@dataclass
class TimeR:
    chunks: list[Chunk]
    dsl: str  # HH:MM or H[:MM]?
    form: str
    mods: set[str]
    amb: bool


def _hm_text(h12: int, mi: int, rng: random.Random, force_colon: bool = False) -> str:
    if mi == 0 and not force_colon and rng.random() < 0.7:
        return str(h12)
    return f"{h12}:{p2(mi)}"


def time_known(rng: random.Random, h24: int, mi: int) -> TimeR:
    mods: set[str] = set()
    dsl = f"{p2(h24)}:{p2(mi)}"
    if h24 == 12 and mi == 0 and rng.random() < 0.35:
        return TimeR([C("noon", kind="kw")], dsl, "noon", mods, False)
    if h24 == 0 and mi == 0 and rng.random() < 0.5:
        return TimeR([C("midnight", kind="kw")], dsl, "midnight", mods, False)
    form = pick(rng, ["ampm", "ampm_space", "dotted", "h24", "daypart"], [40, 26, 5, 22, 7])
    if form == "h24" and h24 in (10, 11, 12):
        form = "ampm"  # "11:30" with no am/pm is ambiguous (policy: unknown meridiem)
    h12 = h24 % 12 or 12
    suffix = "am" if h24 < 12 else "pm"
    if form == "h24":
        return TimeR([C(f"{p2(h24)}:{p2(mi)}")], dsl, form, mods, False)
    if form == "daypart" and mi in (0, 15, 30, 45):
        if 5 <= h24 < 12:
            part = "in the morning"
        elif 12 <= h24 < 18:
            part = "in the afternoon"
        elif 18 <= h24 < 22:
            part = pick(rng, ["in the evening", "at night"])
        elif h24 >= 22 or h24 < 4:
            part = "at night"
        else:
            part = "in the morning"
        t = _hm_text(h12, mi, rng)
        return TimeR([C(t)] + [C(w) for w in part.split(" ")], dsl, form, mods, False)
    t = _hm_text(h12, mi, rng)
    if form == "dotted":
        return TimeR([C(f"{t} {suffix[0]}.m.")], dsl, form, mods, False)
    if form == "ampm_space":
        return TimeR([C(t), C(suffix)], dsl, form, mods, False)
    return TimeR([C(f"{t}{suffix}")], dsl, "ampm", mods, False)


def time_amb(rng: random.Random, h12: int, mi: int) -> TimeR:
    dsl = f"{h12}?" if mi == 0 else f"{h12}:{p2(mi)}?"
    text = str(h12) if mi == 0 else f"{h12}:{p2(mi)}"
    return TimeR([C(text)], dsl, "amb", {"ampm-ambiguous"}, True)


def time_any(rng: random.Random, p_amb: float = 0.3) -> TimeR:
    mi = pick(rng, [0, 30, 15, 45, 5, 10, 20, 40, 50], [40, 24, 12, 8, 3, 3, 3, 3, 4])
    if rng.random() < p_amb:
        return time_amb(rng, rng.randint(1, 12), mi)
    h24 = pick(
        rng,
        list(range(24)),
        [1, 1, 1, 1, 1, 1, 3, 5, 8, 8, 8, 8, 8, 8, 8, 8, 8, 6, 5, 3, 2, 1, 1, 1],
    )
    return time_known(rng, h24, mi)


def label_time(chunks: list[Chunk], dsl: str, prefix: str):
    out = [Chunk(c.text, c.label, c.glue, c.kind) for c in chunks]
    out[-1] = Chunk(out[-1].text, f"{prefix}{dsl}", out[-1].glue, out[-1].kind)
    return out


# ---------------------------------------------------------------- generators


def gen_basic_date(rng):
    d = md_date(rng)
    chunks = label_date(d.chunks, d.dsl)
    return Ex(chunks, f"d {d.dsl}", "basic-date", f"basic-date.{d.form}", d.mods)


def gen_basic_date_year(rng):
    d = year_date(rng)
    chunks = label_date(d.chunks, d.dsl)
    return Ex(chunks, f"d {d.dsl}", "basic-date-year", f"basic-date-year.{d.form}", d.mods)


def gen_relative_date(rng):
    d = rel_day(rng)
    chunks = label_date(d.chunks, d.dsl)
    return Ex(chunks, f"d {d.dsl}", "relative-date", "relative-date.word", d.mods)


def gen_relative_offset(rng):
    d = offset_date(rng)
    chunks = label_date(d.chunks, d.dsl)
    return Ex(chunks, f"d {d.dsl}", "relative-offset", f"relative-offset.{d.form}", d.mods)


def gen_weekday(rng):
    d = weekday_ref(rng)
    chunks = label_date(d.chunks, d.dsl)
    tag = "weekday-bare" if d.form == "bare" else "weekday-relative"
    return Ex(chunks, f"d {d.dsl}", tag, f"{tag}.{d.form}", d.mods)


PERIODS = {
    "week": "W", "month": "M", "year": "Y", "wk": "W", "mth": "M", "yr": "Y",
}  # fmt: skip


def gen_period(rng):
    unit = pick(rng, ["week", "month", "year", "wk"], [45, 35, 15, 5])
    mods: set[str] = set()
    which = pick(
        rng, ["next", "this", "last", "nxt", "coming", "past", "previous"], [35, 25, 25, 3, 4, 4, 4]
    )
    n = {"next": 1, "nxt": 1, "coming": 1, "this": 0, "last": -1, "past": -1, "previous": -1}[which]
    if which == "nxt":
        mods.add("abbreviation")
    if unit == "wk":
        mods.add("abbreviation")
    dsl = f"{PERIODS[unit]}{'+' if n >= 0 else ''}{n}"
    chunks = [C(which), C(unit, f"d {dsl}", kind="kw")]
    if rng.random() < 0.1:
        chunks = [C("during")] + chunks
    return Ex(chunks, f"d {dsl}", "period-relative", f"period-relative.{which}", mods)


def gen_month_year_only(rng):
    mods: set[str] = set()
    if rng.random() < 0.7:
        m = rng.randint(1, 12)
        mon = month_text(rng, m, mods)
        dsl = f"M@{p2(m)}"
        pre = pick(rng, [[], [C("in")], [C("during")], [C("the month of")]], [70, 15, 5, 10])
        chunks = pre + [C(mon, f"d {dsl}", kind="month")]
        return Ex(chunks, f"d {dsl}", "month-or-year-only", "month-only", mods)
    y = rng.randint(2024, 2034)
    dsl = f"Y@{y}"
    pre = pick(rng, [[], [C("in")], [C("year")]], [70, 20, 10])
    chunks = pre + [C(str(y), f"d {dsl}")]
    return Ex(chunks, f"d {dsl}", "month-or-year-only", "year-only", mods)


def gen_nth_weekday(rng):
    mods: set[str] = set()
    wd = rng.choice(WD_CODES)
    m = rng.randint(1, 12)
    k = pick(rng, [1, 2, 3, 4, -1], [24, 20, 20, 12, 24])
    ordw = "last" if k == -1 else (ORD_WORDS[k] if rng.random() < 0.65 else ordinal(k))
    if k != -1 and ordw == ORD_WORDS[k]:
        mods.add("word-numbers")
    prep = pick(rng, ["of", "in"], [70, 30])
    dsl = f"{wd}#{k}@{p2(m)}"
    chunks = [C(ordw), C(wd_text(rng, wd, mods), kind="weekday"), C(prep)]
    pre = [C("the")] if rng.random() < 0.2 else []
    chunks = pre + chunks + [C(month_text(rng, m, mods), f"d {dsl}", kind="month")]
    return Ex(chunks, f"d {dsl}", "nth-weekday-of-month", "nth-weekday.of", mods)


HOLIDAYS_FIXED = {
    "christmas": "12-25", "xmas": "12-25", "christmas day": "12-25",
    "christmas eve": "12-24", "xmas eve": "12-24",
    "new years eve": "12-31", "new year's eve": "12-31", "nye": "12-31",
    "new years day": "01-01", "new year's day": "01-01", "new years": "01-01",
    "halloween": "10-31", "valentines day": "02-14", "valentine's day": "02-14",
    "independence day": "07-04", "fourth of july": "07-04", "juneteenth": "06-19",
    "st patricks day": "03-17", "st patrick's day": "03-17", "cinco de mayo": "05-05",
}  # fmt: skip
HOLIDAYS_NTH = {
    "thanksgiving": "th#4@11", "memorial day": "mo#-1@05", "labor day": "mo#1@09",
    "mlk day": "mo#3@01", "presidents day": "mo#3@02", "mothers day": "su#2@05",
    "mother's day": "su#2@05", "fathers day": "su#3@06", "father's day": "su#3@06",
    "columbus day": "mo#2@10", "thanksgiving day": "th#4@11",
}  # fmt: skip


def gen_holiday(rng):
    table = HOLIDAYS_FIXED if rng.random() < 0.6 else HOLIDAYS_NTH
    name = rng.choice(list(table))
    dsl = table[name]
    mods = {"abbreviation"} if name in ("xmas", "xmas eve", "nye") else set()
    pre = pick(rng, [[], [C("on")], [C("for")]], [80, 12, 8])
    chunks = pre + [C(w, kind="kw") for w in name.split(" ")]
    chunks[-1] = Chunk(chunks[-1].text, f"d {dsl}", True, "kw")
    return Ex(chunks, f"d {dsl}", "named-holiday", "named-holiday", mods)


def gen_weekend(rng):
    which = pick(
        rng,
        ["this weekend", "the weekend", "weekend", "this wknd", "sat to sun"],
        [50, 15, 12, 5, 4],
    )
    mods = {"abbreviation"} if "wknd" in which else set()
    ws = which.split(" ")
    chunks = [C(w, kind="kw") for w in ws]
    chunks[-1] = Chunk(chunks[-1].text, "d sa>su", True, "kw")
    return Ex(chunks, "d sa>su", "fuzzy-period", "fuzzy.weekend", mods)


def gen_time_only(rng):
    t = time_any(rng, 0.35)
    pre = pick(rng, [[], [C("at")], [C("@")], [C("around")]], [60, 28, 8, 4])
    if t.form in ("noon", "midnight"):
        pre = pick(rng, [[], [C("at")]], [75, 25])
    chunks = pre + label_time(t.chunks, t.dsl, "t ")
    return Ex(chunks, f"t {t.dsl}", "time-only", f"time-only.{t.form}", t.mods)


def _end_after(rng, start_min: int) -> int:
    dur = pick(
        rng, [15, 30, 45, 60, 90, 120, 180, 240, 300, 480], [6, 22, 6, 24, 8, 12, 6, 4, 2, 10]
    )
    end = start_min + dur
    return end if end < 24 * 60 else start_min + 30 if start_min + 30 < 24 * 60 else start_min


SEPS = ["to", "-", "–", "until", "till", "through", "thru", "—"]


def sep_chunks(rng: random.Random) -> tuple[list[Chunk], bool]:
    """Return separator chunks and whether it is glued (no spaces)."""
    s = pick(rng, SEPS, [50, 22, 3, 8, 5, 3, 2, 2])
    if s in ("-", "–", "—") and rng.random() < 0.5:
        return [C(s, glue=False)], True
    return [C(s)], False


def time_range_parts(rng: random.Random) -> tuple[list[Chunk], str, str, set[str]]:
    """Return chunks (labels are None), the DSL body `a>b` and a template name."""
    kind = pick(rng, ["amb", "both_known", "trail_mer", "h24", "word_end"], [30, 30, 22, 12, 6])
    mods: set[str] = set()
    sep, glued = sep_chunks(rng)
    if kind == "amb":
        sh = rng.randint(7, 18)
        smi = pick(rng, [0, 30, 15, 45], [60, 25, 8, 7])
        e = _end_after(rng, sh * 60 + smi)
        eh, emi = divmod(e, 60)
        a = time_amb(rng, sh % 12 or 12, smi)
        b = time_amb(rng, eh % 12 or 12, emi)
        mods.add("ampm-ambiguous")
        # amb times in a range often omit ":00"
        return a.chunks + sep + b.chunks, f"{a.dsl}>{b.dsl}", "amb", mods
    if kind == "both_known":
        sh = rng.randint(5, 20)
        smi = pick(rng, [0, 30, 15, 45], [60, 25, 8, 7])
        e = _end_after(rng, sh * 60 + smi)
        eh, emi = divmod(e, 60)
        a = time_known(rng, sh, smi)
        b = time_known(rng, eh, emi)
        # avoid dayparts inside ranges
        a = (
            time_known(rng, sh, smi)
            if a.form != "daypart"
            else TimeR(
                [C(f"{sh % 12 or 12}{'am' if sh < 12 else 'pm'}")], a.dsl, "ampm", set(), False
            )
        )
        b = (
            b
            if b.form != "daypart"
            else TimeR(
                [C(f"{eh % 12 or 12}{'am' if eh < 12 else 'pm'}")], b.dsl, "ampm", set(), False
            )
        )
        return a.chunks + sep + b.chunks, f"{a.dsl}>{b.dsl}", "known", mods
    if kind == "trail_mer":
        end24 = rng.randint(9, 21)
        emi = pick(rng, [0, 30], [70, 30])
        dur = pick(rng, [60, 90, 120, 180, 240], [30, 15, 25, 15, 15])
        start_total = end24 * 60 + emi - dur
        if start_total < 0:
            end24, emi, start_total = 14, 0, 14 * 60 - 120
        s24, smi = divmod(start_total, 60)
        suffix = "am" if end24 < 12 else "pm"
        if (s24 < 12) != (end24 < 12):
            # start and end in different halves: need explicit meridiems, use both_known text
            a = time_known(rng, s24, smi)
            b = time_known(rng, end24, emi)
            return a.chunks + sep + b.chunks, f"{a.dsl}>{b.dsl}", "known", mods
        sh12 = s24 % 12 or 12
        eh12 = end24 % 12 or 12
        at = _hm_text(sh12, smi, rng)
        bt = _hm_text(eh12, emi, rng)
        end_chunks = [C(bt + suffix)] if rng.random() < 0.7 else [C(bt), C(suffix)]
        dsl = f"{p2(s24)}:{p2(smi)}>{p2(end24)}:{p2(emi)}"
        return [C(at)] + sep + end_chunks, dsl, "trail", mods
    if kind == "h24":
        sh = rng.randint(0, 22)
        smi = pick(rng, [0, 30, 15, 45], [60, 25, 8, 7])
        e = _end_after(rng, sh * 60 + smi)
        eh, emi = divmod(e, 60)
        a, b = f"{p2(sh)}:{p2(smi)}", f"{p2(eh)}:{p2(emi)}"
        return [C(a)] + sep + [C(b)], f"{a}>{b}", "h24", mods
    # word_end: noon to 1, 9 to noon
    if rng.random() < 0.5:
        eh = rng.randint(1, 6)
        b = time_amb(rng, eh, pick(rng, [0, 30], [80, 20]))
        return [C("noon")] + sep + b.chunks, f"12:00>{b.dsl}", "noon_start", {"ampm-ambiguous"}
    sh = rng.randint(8, 11)
    a = time_amb(rng, sh, pick(rng, [0, 30], [80, 20]))
    return a.chunks + sep + [C("noon")], f"{a.dsl}>12:00", "noon_end", {"ampm-ambiguous"}


def wrap_range(rng: random.Random, chunks: list[Chunk], first_label_idx: int | None = None):
    pre = pick(rng, ["", "from", "between"], [70, 22, 8])
    return pre


def gen_time_range(rng):
    chunks, body, form, mods = time_range_parts(rng)
    pre = pick(rng, ["", "from", "between"], [70, 22, 8])
    if pre == "between":
        # replace the separator with "and"
        for c in chunks:
            if c.text in SEPS:
                c.text = "and"
                c.glue = True
    if pre:
        chunks = [C(pre)] + chunks
    # labels: single time before separator, full range at end
    sep_i = next(i for i, c in enumerate(chunks) if c.text in SEPS or c.text == "and")
    start_dsl = body.split(">")[0]
    n = len(chunks)
    for _i, c in enumerate(chunks):
        c.label = None
    chunks[sep_i - 1].label = f"t {start_dsl}"
    chunks[sep_i].label = f"t {start_dsl}"
    chunks[n - 1].label = f"t {body}"
    return Ex(chunks, f"t {body}", "time-range", f"time-range.{form}.{pre or 'plain'}", mods)


def gen_datetime(rng):
    d = date_any(rng)
    t = time_any(rng, 0.25)
    conn = pick(rng, ["", "at", "@", "on_rev", "rev"], [30, 40, 5, 10, 15])
    mods = d.mods | t.mods
    dsl = f"dt {d.dsl} {t.dsl}"
    date_chunks = label_date(d.chunks, d.dsl)  # labels: d <date>
    if conn in ("on_rev", "rev"):
        tc = label_time(t.chunks, t.dsl, "t ")
        glue = [C("on" if conn == "on_rev" else "")] if conn == "on_rev" else []
        dch = [Chunk(c.text, c.label, c.glue, c.kind) for c in date_chunks]
        dch[-1] = Chunk(dch[-1].text, dsl, dch[-1].glue, dch[-1].kind)
        return Ex(tc + glue + dch, dsl, "datetime", f"datetime.{conn}.{d.form}", mods)
    mid = [C(conn)] if conn else []
    tc = [Chunk(c.text, c.label, c.glue, c.kind) for c in t.chunks]
    tc[-1] = Chunk(tc[-1].text, dsl, tc[-1].glue, tc[-1].kind)
    for c in tc[:-1]:
        c.label = f"d {d.dsl}"
    return Ex(date_chunks + mid + tc, dsl, "datetime", f"datetime.{conn or 'plain'}.{d.form}", mods)


def gen_date_range(rng):
    mods: set[str] = set()
    r = rng.random()
    sep_word = pick(
        rng, ["to", "-", "through", "until", "thru", "till", "–"], [45, 22, 10, 8, 4, 3, 8]
    )
    style = pick(rng, ["", "from", "between"], [70, 22, 8])
    if r < 0.62:
        m = rng.randint(1, 12)
        d1 = rng.randint(1, 26)
        span = rng.randint(1, 20)
        total = d1 + span
        m2, d2 = m, total
        dim = DAYS_IN_MONTH[m - 1] if m != 2 else 28
        shared = rng.random() < 0.45
        if total > dim:
            m2, d2 = (m % 12) + 1, total - dim
            shared = False
        a = md_date(rng, m, d1)
        dsl = f"{p2(m)}-{p2(d1)}>{p2(m2)}-{p2(d2)}"
        mods |= a.mods
        if shared:
            form = "shared_month"
            mon = month_text(rng, m, mods)
            glued = sep_word in ("-", "–") and rng.random() < 0.5
            e1 = day_text(rng, d1, mods)
            e2 = day_text(rng, d2, mods)
            chunks = [C(mon, f"d M@{p2(m)}", kind="month"), C(e1, f"d {p2(m)}-{p2(d1)}")]
            sc = C(sep_word, f"d {p2(m)}-{p2(d1)}", glue=not glued)
            chunks += [sc, C(e2, f"d {dsl}", glue=not glued)]
            tag = "date-range-shared-month"
        else:
            b = md_date(rng, m2, d2)
            mods |= b.mods
            form = f"abs_{a.form}_{b.form}"
            la = label_date(a.chunks, a.dsl)
            lb = label_date(b.chunks, b.dsl)
            for c in lb[:-1]:
                c.label = f"d {a.dsl}"
            lb[-1].label = f"d {dsl}"
            la[-1].label = f"d {a.dsl}"
            glued = sep_word in ("-", "–") and rng.random() < 0.3 and len(la) == 1 and len(lb) == 1
            sc = [C(sep_word, f"d {a.dsl}", glue=not glued)]
            if glued:
                lb[0].glue = False
            chunks = la + sc + lb
            tag = "basic-date-range"
    else:
        a = pick(rng, [rel_day, weekday_ref, md_date], [30, 40, 30])(rng)
        # end: later weekday or date
        if a.dsl.startswith("+") or a.dsl.startswith("-"):
            b = weekday_ref(rng) if rng.random() < 0.7 else md_date(rng)
        elif len(a.dsl) <= 4:  # weekday style
            b = weekday_ref(rng)
        else:
            b = md_date(rng)
        for dd in (a, b):
            mods |= dd.mods
        # keep ends plausible: bare weekday ends are most natural
        if b.form in ("last", "past", "previous", "lst"):
            b = weekday_ref(rng)
        la = label_date(a.chunks, a.dsl)
        lb = label_date(b.chunks, b.dsl)
        dsl = f"{a.dsl}>{b.dsl}"
        la[-1].label = f"d {a.dsl}"
        for c in lb[:-1]:
            c.label = f"d {a.dsl}"
        lb[-1].label = f"d {dsl}"
        sc = [C(sep_word, f"d {a.dsl}")]
        chunks = la + sc + lb
        form = f"rel_{a.form}_{b.form}"
        tag = "basic-date-range"
    if style == "between":
        for c in chunks:
            if c.text == sep_word:
                c.text = "and"
    if style:
        chunks = [C(style)] + chunks
    return Ex(chunks, f"d {dsl}", tag, f"{tag}.{style or 'plain'}.{form}", mods)


def gen_datetime_range(rng):
    mods: set[str] = set()
    if rng.random() < 0.55:
        # one date, time range: "friday 2-4pm", "oct 2 from 9 to 5"
        d = date_any(rng)
        tchunks, body, form, tmods = time_range_parts(rng)
        mods |= d.mods | tmods
        start_t = body.split(">")[0]
        dsl = f"dt {d.dsl} {body}"
        dch = label_date(d.chunks, d.dsl)
        conn = pick(rng, ["", "from", "at"], [60, 30, 10])
        mid = [C(conn)] if conn else []
        sep_i = next(i for i, c in enumerate(tchunks) if c.text in SEPS)
        for c in tchunks:
            c.label = None
        tchunks[sep_i - 1].label = f"dt {d.dsl} {start_t}"
        tchunks[sep_i].label = f"dt {d.dsl} {start_t}"
        tchunks[-1].label = dsl
        for c in tchunks[: sep_i - 1]:
            c.label = f"d {d.dsl}"
        return Ex(
            dch + mid + tchunks, dsl, "datetime-range", f"datetime-range.one-date.{form}", mods
        )
    a = date_any(rng)
    if a.dsl[0] in "+-" or len(a.dsl) <= 4:
        b = pick(rng, [weekday_ref, rel_day], [60, 40])(rng)
    else:
        b = md_date(rng)
    if b.form in ("last", "past", "previous", "lst"):
        b = weekday_ref(rng, None)
    ta = time_any(rng, 0.2)
    tb = time_any(rng, 0.2)
    if ta.amb != tb.amb:
        tb = (
            time_amb(rng, rng.randint(1, 12), 0)
            if ta.amb
            else time_known(rng, rng.randint(8, 20), 0)
        )
    mods |= a.mods | b.mods | ta.mods | tb.mods
    sa = f"{a.dsl} {ta.dsl}"
    sb = f"{b.dsl} {tb.dsl}"
    dsl = f"dt {sa}>{sb}"
    sep_word = pick(rng, ["to", "-", "until", "through"], [60, 20, 12, 8])
    chunks = label_date(a.chunks, a.dsl)
    chunks[-1].label = f"d {a.dsl}"
    t1 = label_time(ta.chunks, ta.dsl, "")
    for c in t1[:-1]:
        c.label = None
    t1[-1].label = f"dt {sa}"
    chunks += t1 + [C(sep_word, f"dt {sa}")]
    d2 = label_date(b.chunks, b.dsl)
    for c in d2[:-1]:
        c.label = f"dt {sa}"
    d2[-1].label = f"dt {sa}"
    t2 = label_time(tb.chunks, tb.dsl, "")
    for c in t2[:-1]:
        c.label = f"dt {sa}"
    t2[-1].label = dsl
    chunks += d2 + t2
    pre = pick(rng, [[], [C("from")]], [75, 25])
    return Ex(pre + chunks, dsl, "datetime-range", "datetime-range.two-dates", mods)


# ---------------------------------------------------------------- recurrence


def rec_dsl(freq, interval, days=None, nth=None, monthdays=None, yearday=None,
            count=None, until=None, time=None, start=None) -> str:  # fmt: skip
    parts = ["R", f"{freq}/{interval}"]
    if days:
        parts.append(",".join(sorted(days, key=CANON.index)))
    if nth:
        parts.append(nth)
    if monthdays:
        parts.append(",".join(f"d{d}" for d in monthdays))
    if yearday:
        parts.append(yearday)
    if count:
        parts.append(f"n{count}")
    if until:
        parts.append(f"u{until}")
    if time:
        parts.append(time)
    if start:
        parts.append(f"s{start}")
    return ("dt " if time else "d ") + " ".join(parts)


def _wd_list_text(rng: random.Random, days: list[str], mods: set[str]) -> list[Chunk]:
    order = days[:]
    if rng.random() < 0.25:
        rng.shuffle(order)
    names = [wd_text(rng, d, mods) for d in order]
    style = pick(rng, ["and", "comma", "slash"], [40, 45, 15])
    if len(names) == 1:
        return [C(names[0], kind="weekday")]
    chunks = []
    for i, n in enumerate(names):
        if style == "comma" and i < len(names) - 1:
            chunks.append(C(n + ",", kind="weekday"))
        elif style == "slash" and i < len(names) - 1:
            chunks.append(C(n + "/", glue=i == 0, kind="weekday"))
        else:
            if i > 0 and style == "and":
                chunks.append(C("and"))
            chunks.append(C(n, glue=not (style == "slash" and i > 0), kind="weekday"))
    return chunks


def gen_recurrence(rng):
    mods: set[str] = set()
    kind = pick(
        rng,
        [
            "daily",
            "weekdays",
            "weekly",
            "interval_wd",
            "interval_n",
            "monthly_day",
            "monthly_nth",
            "yearly",
        ],
        [10, 8, 28, 14, 7, 12, 10, 6],
    )
    chunks: list[Chunk] = []
    freq = "w"
    interval = 1
    days = nth = monthdays = yearday = None
    tag = "recurrence-weekly"
    form = kind
    if kind == "daily":
        tag = "recurrence-daily"
        freq = "d"
        w = pick(
            rng,
            ["every day", "daily", "everyday", "each day", "every single day"],
            [45, 30, 8, 12, 5],
        )
        chunks = [C(x, kind="kw") for x in w.split(" ")]
        if rng.random() < 0.3:
            interval, tag = rng.choice([2, 3, 4, 5, 7, 10]), "recurrence-interval"
            n = interval
            nt = num_text(rng, n, mods)
            chunks = [C("every"), C(nt), C("days", kind="kw")]
    elif kind == "weekdays":
        tag = "recurrence-daily"
        freq, days = "d", WEEKDAYS5
        w = pick(
            rng,
            [
                "every weekday",
                "weekdays",
                "every work day",
                "every business day",
                "every workday",
                "mon-fri",
            ],
            [45, 25, 6, 6, 6, 12],
        )
        if w == "mon-fri":
            mods.add("abbreviation")
        chunks = [C(x, kind="kw") for x in w.split(" ")]
    elif kind == "weekly":
        n = pick(rng, [1, 1, 1, 2, 3], [60, 15, 5, 12, 8])
        days = rng.sample(WD_CODES, n)
        lead = pick(rng, ["every", "each", "weekly on", "", "every"], [50, 5, 12, 22, 8])
        wl = _wd_list_text(rng, days, mods)
        if lead == "" and n == 1:
            # plural: "tuesdays"
            wd = days[0]
            w = WD_FULL[WD_CODES.index(wd)] + "s"
            chunks = [C(w, kind="weekday")]
        elif lead == "":
            chunks = wl
        else:
            chunks = [C(x) for x in lead.split(" ")] + wl
        if lead == "every" and n == 1 and rng.random() < 0.15:
            chunks[-1].text += "s"  # "every tuesdays": common slip
    elif kind == "interval_wd":
        tag = "recurrence-interval"
        interval = pick(rng, [2, 3, 4], [70, 20, 10])
        days = [rng.choice(WD_CODES)]
        wd = wd_text(rng, days[0], mods)
        if interval == 2 and rng.random() < 0.6:
            lead = pick(
                rng, ["every other", "every second", "alternate", "every 2nd"], [60, 15, 10, 15]
            )
            chunks = [C(x) for x in lead.split(" ")] + [C(wd, kind="weekday")]
        elif interval == 2 and rng.random() < 0.15:
            chunks = [C("biweekly"), C("on"), C(wd, kind="weekday")]
        else:
            nt = num_text(rng, interval, mods)
            tail = [C("on"), C(wd, kind="weekday")]
            chunks = [C("every"), C(nt), C("weeks")] + tail
    elif kind == "interval_n":
        tag = "recurrence-interval"
        interval = pick(rng, [2, 3, 4, 6], [75, 12, 8, 5])
        if interval == 2 and rng.random() < 0.5:
            chunks = [C("every"), C("other"), C("week")]
        else:
            chunks = [C("every"), C(num_text(rng, interval, mods)), C("weeks")]
    elif kind == "monthly_day":
        tag = "recurrence-monthly-yearly"
        freq = "m"
        dd = pick(
            rng,
            [1, 15, 5, 10, 20, 25, 30, 28, rng.randint(1, 28), -1],
            [8, 10, 5, 5, 4, 4, 2, 2, 6, 8],
        )
        interval = pick(rng, [1, 1, 1, 2, 3], [70, 10, 5, 8, 7])
        if dd == -1:
            monthdays = [-1]
            pre = pick(
                rng,
                [
                    "last day of every month",
                    "last day of each month",
                    "end of every month",
                    "last day of the month",
                ],
                [50, 15, 10, 25],
            )
            chunks = [C(x) for x in pre.split(" ")]
        else:
            monthdays = [dd]
            o = ordinal(dd) if rng.random() < 0.75 else str(dd)
            if interval == 1:
                lead = pick(
                    rng,
                    [
                        "monthly on the",
                        "every month on the",
                        "on the",
                        "every month on",
                        "monthly on",
                    ],
                    [35, 25, 20, 10, 10],
                )
                chunks = [C(x) for x in lead.split(" ")] + [C(o)]
                if lead == "on the":
                    chunks += [C("of"), C("every"), C("month")]
            else:
                chunks = [C("every"), C(str(interval)), C("months"), C("on"), C("the"), C(o)]
    elif kind == "monthly_nth":
        tag = "recurrence-monthly-yearly"
        freq = "m"
        wd = rng.choice(WD_CODES)
        k = pick(rng, [1, 2, 3, 4, -1], [28, 18, 16, 8, 30])
        nth = f"{wd}#{k}"
        ow = "last" if k == -1 else (ORD_WORDS[k] if rng.random() < 0.6 else ordinal(k))
        if k != -1 and ow == ORD_WORDS[k]:
            mods.add("word-numbers")
        tail = pick(
            rng,
            ["of every month", "of each month", "every month", "of the month"],
            [50, 15, 20, 15],
        )
        chunks = [C(ow), C(wd_text(rng, wd, mods), kind="weekday")] + [
            C(x) for x in tail.split(" ")
        ]
        if rng.random() < 0.15:
            chunks = [C("every")] + chunks
    else:  # yearly
        tag = "recurrence-monthly-yearly"
        freq = "y"
        m = rng.randint(1, 12)
        d = rng.randint(1, 28)
        yearday = f"{p2(m)}-{p2(d)}"
        mon = month_text(rng, m, mods)
        dt = day_text(rng, d, mods)
        lead = pick(rng, ["every", "annually on", "yearly on", "every year on"], [45, 20, 20, 15])
        chunks = [C(x) for x in lead.split(" ")] + [C(mon, kind="month"), C(dt)]
    base_dsl = rec_dsl(freq, interval, days, nth, monthdays, yearday)
    for c in chunks:
        c.label = None
    chunks[-1].label = base_dsl
    state: dict = {}

    def cur() -> str:
        return rec_dsl(freq, interval, days, nth, monthdays, yearday, **state)

    def extend(extra: list[Chunk], **kw) -> None:
        prev = cur()
        state.update(kw)
        for c in extra[:-1]:
            c.label = None if any(ch.isdigit() for ch in c.text) else prev
        extra[-1].label = cur()
        chunks.extend(extra)

    r = rng.random()
    if r < 0.28:
        t = time_any(rng, 0.3)
        lead = pick(rng, ["at", "", "@"], [60, 35, 5])
        if any(ch.isdigit() for ch in chunks[-1].text) and not lead:
            lead = "at"
        extra = ([C(lead)] if lead else []) + [
            Chunk(c.text, None, c.glue, c.kind) for c in t.chunks
        ]
        extend(extra, time=t.dsl)
        mods |= t.mods
    elif r < 0.36:
        t1, tb, _f, tm = time_range_parts(rng)
        if any(ch.isdigit() for ch in chunks[-1].text):
            t1 = [C(rng.choice(["at", "from"]))] + t1
        sepi = next(i for i, c in enumerate(t1) if c.text in SEPS)
        for c in t1:
            c.label = None
        start_t = tb.split(">")[0]
        t1[sepi - 1].label = rec_dsl(freq, interval, days, nth, monthdays, yearday, time=start_t)
        t1[sepi].label = t1[sepi - 1].label
        extend(t1, time=tb)
        mods |= tm
    r = rng.random()
    if r < 0.14:
        if freq == "d":
            n = pick(rng, [2, 3, 5, 7, 10, 14], [10, 15, 20, 15, 10, 10])
            extend([C("for"), C(num_text(rng, n, mods)), C("days")], count=n)
        else:
            n = pick(rng, [2, 3, 4, 5, 6, 8, 10, 12], [10, 10, 15, 10, 15, 10, 15, 15])
            tail = pick(rng, ["times", "x", "weeks"], [60, 10, 30])
            if tail == "x":
                extend([C(f"x{n}")], count=n)
            elif tail == "weeks" and freq == "w" and interval == 1 and days and len(days) == 1:
                extend([C("for"), C(num_text(rng, n, mods)), C("weeks")], count=n)
            else:
                extend([C("for"), C(num_text(rng, n, mods)), C("times")], count=n)
    elif r < 0.26:
        d = md_date(rng)
        kw = pick(rng, ["until", "till", "through", "ending"], [60, 10, 15, 15])
        extend([C(kw)] + [Chunk(c.text, None, c.glue, c.kind) for c in d.chunks], until=d.dsl)
        mods |= d.mods
    elif r < 0.34:
        d = md_date(rng)
        kw = pick(rng, ["starting", "from", "beginning", "starting on"], [50, 20, 15, 15])
        extend(
            [C(x) for x in kw.split(" ")] + [Chunk(c.text, None, c.glue, c.kind) for c in d.chunks],
            start=d.dsl,
        )
        mods |= d.mods
    dsl = cur()
    return Ex(chunks, dsl, tag, f"{tag}.{form}", mods)


# ---------------------------------------------------------------- noise inputs (null output)

NON_DATE = [
    "buy milk", "hello", "asdf", "lorem ipsum", "test", "the", "meeting notes", "call mom",
    "what is this", "help", "1 adult", "25", "palm", "foo bar", "abc", "n/a", "tbd", "none",
    "john smith", "https://example.com", "email me", "remind me", "project plan", "q", "lol",
    "yes", "no", "ok thanks", "pizza", "random text here", "my birthday", "the march of progress",
    "may i ask", "sunny day", "mondays are the worst", "dinner", "weekly report", "see you", "new meeting",
    "2 people", "3 items", "size 10", "room 4", "5 stars", "version 2", "100", "42", "$5", "10%",
]  # fmt: skip


def gen_noise(rng):
    r = rng.random()
    if r < 0.6:
        text = rng.choice(NON_DATE)
    elif r < 0.8:
        k = rng.randint(3, 10)
        text = "".join(rng.choice("abcdefghijklmnopqrstuvwxyz") for _ in range(k))
    else:
        text = " ".join(rng.choice(NON_DATE).split(" ")[0] for _ in range(rng.randint(2, 3)))
    return Ex([C(text, "x")], "x", "non-date-noise", "non-date-noise", set())


GENERATORS: list[tuple[str, Callable, float]] = [
    ("basic-date", gen_basic_date, 7),
    ("basic-date-year", gen_basic_date_year, 3),
    ("relative-date", gen_relative_date, 4),
    ("relative-offset", gen_relative_offset, 5),
    ("weekday", gen_weekday, 9),
    ("period-relative", gen_period, 4),
    ("month-or-year-only", gen_month_year_only, 2),
    ("nth-weekday-of-month", gen_nth_weekday, 3),
    ("named-holiday", gen_holiday, 3),
    ("fuzzy-period", gen_weekend, 1),
    ("time-only", gen_time_only, 7),
    ("time-range", gen_time_range, 8),
    ("datetime", gen_datetime, 9),
    ("date-range", gen_date_range, 9),
    ("datetime-range", gen_datetime_range, 7),
    ("recurrence", gen_recurrence, 17),
    ("non-date-noise", gen_noise, 3),
]
