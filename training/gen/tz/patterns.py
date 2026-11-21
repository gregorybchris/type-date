"""Timezone round: split the collected phrases into pool and sealed, then count zone constructions in the pool only.

Usage: python3 patterns.py split      # write split.json (counts only)
       python3 patterns.py stats      # construction counts on pool rows
       python3 patterns.py residual N # N pool rows that match no construction
Sealed: writers 4 and 5, and every web source whose sha1 mod 10 is below 3.
"""

import glob
import hashlib
import json
import random
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

EXT = Path(__file__).resolve().parents[1] / "external"
norm = lambda t: re.sub(r"\s+", " ", t.lower().strip())  # noqa: E731


def load():
    rows = []
    for f in sorted(glob.glob(str(EXT / "tz-w*-inputs.jsonl"))):
        w = Path(f).name.split("-inputs")[0]
        for l in open(f):
            r = json.loads(l)
            rows.append(
                {
                    "text": r["text"],
                    "origin": w,
                    "family": r.get("family"),
                    "note": r.get("note"),
                    "sealed": w in ("tz-w4", "tz-w5"),
                    "source": w,
                }
            )
    for n in (12, 13, 14):
        for l in open(EXT / f"web-{n}.jsonl"):
            r = json.loads(l)
            h = int(hashlib.sha1(r["source"].encode()).hexdigest(), 16) % 10
            rows.append(
                {
                    "text": r["text"],
                    "origin": f"web-{n}",
                    "family": None,
                    "note": r.get("note"),
                    "sealed": h < 3,
                    "source": r["source"],
                }
            )
    seen, out = set(), []
    for r in rows:
        k = norm(r["text"])
        if k in seen:
            continue
        seen.add(k)
        out.append(r)
    return out


ABBR = (
    r"utc|gmt|ut|z|[ecmp][sd]t|akst|akdt|hst|hast|hadt|ast|adt|nst|ndt|bst|cet|cest|eet|eest|wet|west|ist|jst|kst|sgt|hkt|"
    r"pkt|msk|sast|wat|cat|eat|aest|aedt|aet|acst|acdt|awst|nzst|nzdt|brt|brst|art|pht|wib|wita|wit|gst|irst|npt|"
    r"mez|mesz|aoe|ct|et|pt|mt|pdt|pst"
)
ABBR_RE = re.compile(rf"(?<![A-Za-z])({ABBR})(?![A-Za-z])", re.I)
OFFSET_RE = re.compile(
    r"(?:utc|gmt)\s*[+\-\u2212\u2013\u2014]\s*\d{1,2}(?::?\d{2})?|(?<![\d:/])[+\-\u2212]\d{2}:?\d{2}\b|(?<=\d)z\b|(?<=\d)Z\b",
    re.I,
)
IANA_RE = re.compile(
    r"\b(?:America|Europe|Asia|Africa|Australia|Pacific|Atlantic|Indian|Antarctica|Etc|Arctic)/[A-Za-z_+\-0-9/]+"
)
NAME_RE = re.compile(
    r"\b(pacific|eastern|central|mountain|atlantic|alaska(?:n)?|hawaii(?:an|-aleutian)?|newfoundland|greenwich|"
    r"british summer|central european|eastern european|western european|india(?:n)? standard|japan(?:ese)? standard|"
    r"china standard|australian eastern|east africa|west africa|singapore|moscow|gulf)\b[^.,;]{0,25}?\b(time|standard|daylight)\b",
    re.I,
)
PLACE_TIME_RE = re.compile(
    r"\b([A-Z][a-z]+(?: [A-Z][a-z]+)?|london|tokyo|paris|berlin|sydney|new york|nyc|la|sf|beijing|lagos|mumbai|delhi|dubai|manila)\s+(?:local\s+)?time\b",
    re.I,
)
LOCAL_RE = re.compile(
    r"\b(?:local(?: venue)?|your|my|their|his|her|our|server|game|host(?:'s)?|home|venue|office)\s+(?:local\s+)?time\b|\blocal\b|\bhere\b",
    re.I,
)
WINDOWS_RE = re.compile(r"\((?:utc|gmt)\s*[+\-\u2212]\d{2}:\d{2}\)", re.I)
CONV_RE = re.compile(
    r"\b(?:in|to|vs\.?|versus|into|convert|what(?:'s| is)?)\b|=|->|<->|\u2192|\u21d4", re.I
)
TIME_RE = re.compile(
    r"\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?|a|p)\b|\b\d{1,2}:\d{2}|\bnoon\b|\bmidnight\b|\b\d{3,4}\s*(?:hrs|h|z)?\b",
    re.I,
)
REC_RE = re.compile(
    r"\b(?:every|each|daily|weekly|monthly|biweekly|weekdays?|mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays|until|till|through|starting|beginning)\b",
    re.I,
)
RANGE_RE = re.compile(r"\d\s*(?:-|\u2013|to|until|till)\s*\d", re.I)
DATE_RE = re.compile(
    r"\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{1,2}|\b\d{1,2}(?:st|nd|rd|th)?\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|\d{4}-\d\d-\d\d|\d{1,2}/\d{1,2}",
    re.I,
)
NONASCII_RE = re.compile(r"[^\x00-\x7f\u2212\u2013\u2014\u2192\u21d4]")
GLUED_RE = re.compile(
    r"\d(?:am|pm|AM|PM)?(?:UTC|GMT|[ECMP][SD]T|IST|BST|CET|CEST|JST|KST|WIB|SGT|MSK|AEST|AEDT|NZST|NZDT|PT|ET|CT|MT)\b|\b(?:UTC|GMT|[ECMP][SD]T|IST|BST|CET|JST|KST|WIB|PT|ET)\d"
)
SLASH_ZONES_RE = re.compile(rf"\b(?:{ABBR})\s*/\s*(?:{ABBR})\b", re.I)
GLOBAL_RE = re.compile(
    r"\ball times\b|\btimes? (?:are|shown|in)\b|\btime ?zone\s*:|\bTZ=|\bTZID=", re.I
)
DST_RE = re.compile(
    r"\b(?:dst|daylight|standard time|summer time|clocks? (?:go|back|forward)|spring forward|fall back|not (?:est|edt|pst|pdt))\b",
    re.I,
)


BARE_REGION_RE = re.compile(
    r"(?:\d|noon|midnight)\s*(?:a\.?m\.?|p\.?m\.?)?\s*,?\s*(pacific|eastern|central|mountain|atlantic|alaska(?:n)?|hawaii(?:an)?|greenwich)\b(?!\s+(?:time|standard|daylight|ocean|rim|park|market|team|street|avenue))|\b(pacific|eastern|central|mountain)\s+\d",
    re.I,
)
ISO_OFFSET_RE = re.compile(
    r"(?<=\d)(?:[+\-\u2212]\d{2}(?::?\d{2})?)(?:\[[^\]]*\])?\s*$|(?<=\d)[+\-\u2212]\d{2}:\d{2}(?!\d)"
)
DOTTED_RE = re.compile(r"\b(?:[A-Za-z]\.){2,4}(?=\s|$|,)")
IN_PLACE_RE = re.compile(
    r"(?:\d|noon|midnight)\s*(?:am|pm|a\.m\.|p\.m\.)?\s+in\s+(?!the\b)[A-Za-z]+|\bin\s+(?:la|sf|nyc|london|tokyo|paris|berlin|sydney|toronto|singapore|dubai|delhi|mumbai|lagos|manila|chicago|seattle)\b",
    re.I,
)
GENERIC_TZ_RE = re.compile(
    r"\b(?:my|your|their|our) (?:tz|time ?zone)\b|\btime ?zones?\b|\btz\b", re.I
)
LOOKALIKE_RE = re.compile(
    r"\b(?:mountain (?:view|dew)|central (?:park|team|station|london|office)|eastern (?:market|europe|shore)|pacific (?:rim|ocean|beach)|western union|atlantic city|east (?:village|coast)|greenwich village|cat at|pst me)\b",
    re.I,
)


def zones(t):
    abbr = [
        m.group(1).upper()
        for m in ABBR_RE.finditer(t)
        if m.group(1).upper() not in ("CAT", "EAT", "WIT", "ART", "UT", "Z")
        or re.search(rf"\d\s*{m.group(1)}\b|\b{m.group(1)}\s*\d", t, re.I)
    ]
    off = OFFSET_RE.findall(t)
    iana = IANA_RE.findall(t)
    names = [m.group(0) for m in NAME_RE.finditer(t)]
    place = PLACE_TIME_RE.findall(t)
    return abbr, off, iana, names, place


def constructions(t):
    abbr, off, iana, names, place = zones(t)
    c = []
    if abbr:
        c.append("abbreviation")
    if off:
        c.append("numeric offset")
    if iana:
        c.append("IANA name")
    if names:
        c.append("zone name or generic")
    if place:
        c.append("place + time")
    if LOCAL_RE.search(t) and not (abbr or off or iana or names):
        c.append("local/relative-to-speaker")
    if re.search(r"\bAoE\b|anywhere on earth", t, re.I):
        c.append("anywhere on Earth")
    if WINDOWS_RE.search(t):
        c.append("Windows display string")
    n = len(set(a for a in abbr)) + len(off) + len(iana) + len(names) + len(place)
    if n >= 2:
        c.append("two or more zones")
    if SLASH_ZONES_RE.search(t):
        c.append("slash-joined zones (CET/CEST)")
    if GLUED_RE.search(t) and (abbr or off):
        c.append("zone glued to digits")
    if (
        re.search(
            rf"(?:^|[\s(,;:])(?:{ABBR}|utc[+\-]\d+)\s*\(?\d{{1,2}}(?::\d{{2}})?\s*(?:am|pm|a\.m\.|p\.m\.)?\)?(?!\d)",
            t,
            re.I,
        )
        and (abbr or off)
        and not re.search(rf"\d\s*(?:{ABBR})\b", t, re.I)
    ):
        c.append("zone before the time")
    if re.search(r"\([^)]*(?:" + ABBR + r"|utc|gmt)[^)]*\)", t, re.I):
        c.append("zone in parentheses")
    if re.search(r"\[[^\]]*(?:/|[+\-]\d\d:\d\d|utc)[^\]]*\]", t, re.I):
        c.append("bracketed zone suffix")
    if GLOBAL_RE.search(t):
        c.append("page-level zone statement")
    if CONV_RE.search(t) and n >= 2:
        c.append("conversion / comparison")
    if REC_RE.search(t) and (abbr or off or iana or names or place):
        c.append("recurrence or bound + zone")
    if RANGE_RE.search(t) and (abbr or off or names or place):
        c.append("time range + zone")
    if DATE_RE.search(t) and (abbr or off or names or place):
        c.append("date + time + zone")
    if DST_RE.search(t):
        c.append("daylight saving wording")
    if re.search(r"\b(?:\d{4})\s*z\b|\b\d{4}\s*(?:utc|gmt)\b", t, re.I):
        c.append("compact 4-digit time + zone")
    if re.search(
        r"\b(?:est|edt|pst|pdt|cst|cdt|mst|mdt|ist|bst|cet|cest|aest|aedt)\b.{0,25}\b(?:china|india|israel|ireland|cuba|australia|british|summer|bangladesh)\b|\b(?:china|india|israel|ireland|cuba|australia|british|bangladesh)\b.{0,25}\b(?:est|edt|pst|cst|ist|bst|aest)\b",
        t,
        re.I,
    ):
        c.append("disambiguating gloss")
    if NONASCII_RE.search(t):
        c.append("non-ASCII (other language or symbol)")
    if re.search(r"\b(?:ish|about|around|approx|approximately)\b", t, re.I) and (
        abbr or off or names
    ):
        c.append("fuzzy time + zone")
    if BARE_REGION_RE.search(t) and not names:
        c.append("bare zone word (no 'time')")
    if ISO_OFFSET_RE.search(t) and not off:
        c.append("ISO offset after seconds/fraction")
    if DOTTED_RE.search(t) and ABBR_RE.search(t.replace(".", "")):
        c.append("dotted abbreviation (P.S.T.)")
    if IN_PLACE_RE.search(t):
        c.append("'in <place>' after a time")
    if GENERIC_TZ_RE.search(t):
        c.append("'time zone' / 'tz' mentioned")
    if LOOKALIKE_RE.search(t):
        c.append("zone-like word that is not a zone")
    if not c:
        c.append("NO ZONE FOUND")
    return c


def main():
    rows = load()
    mode = sys.argv[1] if len(sys.argv) > 1 else "stats"
    if mode == "split":
        pool = [r for r in rows if not r["sealed"]]
        print(
            json.dumps(
                {
                    "total": len(rows),
                    "pool": len(pool),
                    "sealed": len(rows) - len(pool),
                    "by_origin_pool": Counter(r["origin"] for r in pool),
                    "by_origin_sealed": Counter(r["origin"] for r in rows if r["sealed"]),
                },
                indent=1,
            )
        )
        return
    pool = [r for r in rows if not r["sealed"]]
    if mode == "stats":
        by = defaultdict(Counter)
        tot = Counter()
        for r in pool:
            kind = "writer" if r["origin"].startswith("tz-w") else "web"
            tot[kind] += 1
            for c in constructions(r["text"]):
                by[c][kind] += 1
        print(f"pool rows: writers {tot['writer']}, web {tot['web']}")
        print(f"{'construction':42}{'writers':>9}{'%':>7}{'web':>8}{'%':>7}")
        for c, k in sorted(by.items(), key=lambda x: -(x[1]["writer"] + x[1]["web"])):
            print(
                f"{c:42}{k['writer']:>9}{100 * k['writer'] / tot['writer']:>6.1f}%{k['web']:>8}{100 * k['web'] / tot['web']:>6.1f}%"
            )
    if mode == "residual":
        n = int(sys.argv[2]) if len(sys.argv) > 2 else 40
        res = [r for r in pool if constructions(r["text"]) == ["NO ZONE FOUND"]]
        print(
            "pool rows with no zone found:",
            len(res),
            "of",
            len(pool),
            Counter(r["origin"] for r in res),
        )
        random.seed(5)
        for r in random.sample(res, min(n, len(res))):
            print(f"  [{r['origin']}] {r['text']!r}")
    if mode == "abbr":
        c = Counter()
        for r in pool:
            for a in zones(r["text"])[0]:
                c[a] += 1
        print(c.most_common(45))
    if mode == "sample":
        key = sys.argv[2]
        n = int(sys.argv[3]) if len(sys.argv) > 3 else 12
        xs = [r for r in pool if key in constructions(r["text"])]
        random.seed(7)
        print(key, len(xs))
        for r in random.sample(xs, min(n, len(xs))):
            print(f"  [{r['origin']}] {r['text']!r}")


if __name__ == "__main__":
    main()
