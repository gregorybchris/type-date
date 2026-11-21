import { addDays, addMonths, daysInMonth } from "@type-date/core";
import { useEffect, useRef, useState } from "react";
import { DOW, fmtDate, fromIndex, gridDays, monthLabel, ymd, viewIndex, viewOf } from "./dates";
import type { View } from "./dates";
import { ChevronIcon } from "./icons";

export interface Selection {
  /** Range or single bounds. Null for recurrences and no selection. */
  lo: string | null;
  hi: string | null;
  /** Recurrence occurrence dates. */
  occ: Set<string>;
  /** One-sided range: the fill runs to the edge of the visible month on the open side. */
  open?: "start" | "end";
  /** Date list: each day is selected on its own, with no range fill. */
  multi?: Set<string>;
}

interface Props {
  view: View;
  dir: -1 | 0 | 1;
  sel: Selection;
  today: string;
  weekStart: 0 | 1;
  onView: (v: View) => void;
  /** `shift`: extend a range. `multi`: cmd or ctrl, add to a list of dates. */
  onPick: (date: string, mods: { shift: boolean; multi: boolean }) => void;
  /** Drag from one day to another. Called as the pointer enters each day. */
  onRange: (from: string, to: string) => void;
}

export function Calendar({ view, dir, sel, today, weekStart, onView, onPick, onRange }: Props) {
  const days = gridDays(view, weekStart);
  const rootRef = useRef<HTMLDivElement>(null);
  const wantFocus = useRef(false);
  const first = sel.lo ?? [...sel.occ][0];
  const [focus, setFocus] = useState(first ?? today);
  useEffect(() => {
    if (first) setFocus(first);
  }, [first]);
  const inGrid = days.includes(focus) && focus.slice(0, 7) === ymd(view.y, view.m, 1).slice(0, 7);
  const tabDate = inGrid ? focus : ymd(view.y, view.m, 1);

  useEffect(() => {
    if (!wantFocus.current) return;
    wantFocus.current = false;
    rootRef.current?.querySelector<HTMLElement>(`[data-date="${tabDate}"]`)?.focus();
  });

  // Drag to select: press on a day, move over others. A click that ends on another day does not fire on either
  // button, so a drag never also picks a single day. Mouse and pen only, so touch scrolling still works.
  const dragFrom = useRef<string | null>(null);
  useEffect(() => {
    const end = () => {
      dragFrom.current = null;
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, []);

  const nav = (n: number) => onView(fromIndex(viewIndex(view) + n));

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step: Record<string, string> = {
      ArrowLeft: addDays(tabDate, -1),
      ArrowRight: addDays(tabDate, 1),
      ArrowUp: addDays(tabDate, -7),
      ArrowDown: addDays(tabDate, 7),
      PageUp: addMonths(tabDate, -1),
      PageDown: addMonths(tabDate, 1),
    };
    const next = step[e.key];
    if (!next) return;
    e.preventDefault();
    wantFocus.current = true;
    setFocus(next);
    if (next.slice(0, 7) !== tabDate.slice(0, 7)) onView(viewOf(next));
  };

  const mStart = ymd(view.y, view.m, 1);
  const mEnd = ymd(view.y, view.m, daysInMonth(view.y, view.m));
  const open = sel.open;
  const lo = open === "start" ? mStart : sel.lo;
  const hi = open === "end" ? mEnd : sel.hi;
  const rows = Array.from({ length: 6 }, (_, r) => days.slice(r * 7, r * 7 + 7));
  const viewKey = `${view.y}-${String(view.m).padStart(2, "0")}`;
  const posOf = (d: string): string | undefined => {
    const out = d.slice(0, 7) !== viewKey;
    if (!(lo && hi && d >= lo && d <= hi && !(open && out))) return undefined;
    const trueLo = open !== "start" && d === lo;
    const trueHi = open !== "end" && d === hi;
    let pos = trueLo && trueHi ? "single" : trueLo ? "start" : trueHi ? "end" : "mid";
    if (open && !trueLo && !trueHi && lo === hi) pos = "mid";
    return pos;
  };
  // Selected days that are not part of a range (recurrences, lists).
  const plain = (d: string | undefined) => !!d && !posOf(d) && (!!sel.multi?.has(d) || sel.occ.has(d));
  // Neighbors join into one block only when they look the same: both in this month (solid) or both outside it (faded).
  // A corner is then rounded exactly when neither of its two sides joins a neighbor, so every block and every
  // solid/faded boundary gets rounded outer corners without special cases.
  const sameLook = (a: string, b: string) => (a.slice(0, 7) !== viewKey) === (b.slice(0, 7) !== viewKey);
  const joined = (a: string, b: string | undefined) => plain(b) && sameLook(a, b!);
  // Side neighbors that are selected but look different (solid next to faded). They are separated by the same 2px
  // gutter that already separates rows, so a solid block and a faded block always read as two shapes.
  const apart = (a: string, b: string | undefined) => plain(b) && !sameLook(a, b!);
  const label = monthLabel(view);

  return (
    <div className="td-cal" ref={rootRef}>
      <div className="td-cal-head">
        <button type="button" className="td-icon-btn" aria-label="Previous month" onClick={() => nav(-1)}>
          <ChevronIcon dir="left" />
        </button>
        <span className="td-month" key={label}>
          {label}
        </span>
        <button type="button" className="td-icon-btn" aria-label="Next month" onClick={() => nav(1)}>
          <ChevronIcon dir="right" />
        </button>
      </div>
      <div role="grid" aria-label={label} onKeyDown={onKeyDown}>
        <div role="row" className="td-row td-dow">
          {Array.from({ length: 7 }, (_, i) => (
            <span role="columnheader" key={i}>
              {DOW[(i + weekStart) % 7]}
            </span>
          ))}
        </div>
        <div className="td-weeks" key={`${view.y}-${view.m}`} data-dir={dir}>
          {rows.map((row, r) => (
            <div role="row" className="td-row" key={r}>
              {row.map((d, c) => {
                const out = d.slice(0, 7) !== viewKey;
                const pos = posOf(d);
                const edge = pos === "mid" && open && (open === "end" ? d === mEnd : d === mStart) ? open : undefined;
                const occ = sel.occ.has(d);
                const selected = !!pos || sel.multi?.has(d) || occ;
                const i = r * 7 + c;
                const join = plain(d)
                  ? [c > 0 && joined(d, days[i - 1]) ? "l" : "", c < 6 && joined(d, days[i + 1]) ? "r" : "", r > 0 && joined(d, days[i - 7]) ? "u" : "", r < 5 && joined(d, days[i + 7]) ? "d" : ""].join("") || undefined
                  : undefined;
                const gap = plain(d)
                  ? [c > 0 && apart(d, days[i - 1]) ? "l" : "", c < 6 && apart(d, days[i + 1]) ? "r" : ""].join("") || undefined
                  : undefined;
                // The tile below may be inset by the gutter rule. The bridge that joins the two tiles is inset the same way.
                const below = join?.includes("d") ? days[i + 7] : undefined;
                const bridge =
                  below
                    ? [c > 0 && apart(below, days[i + 6]) ? "l" : "", c < 6 && apart(below, days[i + 8]) ? "r" : ""].join("") || undefined
                    : undefined;
                // Inside corners. A tile whose right and lower neighbors are both joined, but whose diagonal neighbor is
                // not, sits at the inside corner of an L. A filler there rounds the corner (see .td-fillet). Only the
                // tile opposite the missing one qualifies, so each inside corner is drawn once.
                const fillets = plain(d)
                  ? ([
                      ["tl", -1, -1, 0, 0],
                      ["tr", 1, -1, 0, 6],
                      ["bl", -1, 1, 0, 0],
                      ["br", 1, 1, 6, 6],
                    ] as const)
                      .filter(([, dx, dy]) => {
                        const nc = c + dx;
                        const nr = r + dy;
                        if (nc < 0 || nc > 6 || nr < 0 || nr > 5) return false;
                        return (
                          joined(d, days[i + dx]) && joined(d, days[i + dy * 7]) && !joined(d, days[i + dy * 7 + dx])
                        );
                      })
                      .map(([k]) => k)
                  : [];
                return (
                  <div
                    role="gridcell"
                    key={d}
                    className="td-cell"
                    aria-selected={selected}
                    data-range={pos}
                    data-edge={edge}
                    data-out={out || undefined}
                    data-today={d === today || undefined}
                    data-occ={occ || undefined}
                    data-join={join}
                    data-gap={gap}
                    data-bridge={bridge}
                  >
                    <button
                      type="button"
                      tabIndex={d === tabDate ? 0 : -1}
                      data-date={d}
                      aria-label={fmtDate(d)}
                      onFocus={() => setFocus(d)}
                      onPointerDown={(e) => {
                        if (!e.button && e.pointerType !== "touch" && !e.shiftKey && !e.metaKey && !e.ctrlKey) dragFrom.current = d;
                      }}
                      onPointerEnter={() => {
                        if (dragFrom.current) onRange(dragFrom.current, d);
                      }}
                      onClick={(e) => onPick(d, { shift: e.shiftKey, multi: e.metaKey || e.ctrlKey })}
                    >
                      {Number(d.slice(8))}
                    </button>
                    {fillets.map((k) => (
                      <i key={k} className="td-fillet" data-at={k} aria-hidden="true" />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
