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
  onPick: (date: string) => void;
}

export function Calendar({ view, dir, sel, today, weekStart, onView, onPick }: Props) {
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
              {row.map((d) => {
                const out = d.slice(0, 7) !== `${view.y}-${String(view.m).padStart(2, "0")}`;
                let pos: string | undefined;
                if (lo && hi && d >= lo && d <= hi && !(open && out)) {
                  const trueLo = open !== "start" && d === lo;
                  const trueHi = open !== "end" && d === hi;
                  pos = trueLo && trueHi ? "single" : trueLo ? "start" : trueHi ? "end" : "mid";
                  if (open && !trueLo && !trueHi && lo === hi) pos = "mid";
                }
                const edge = pos === "mid" && open && (open === "end" ? d === mEnd : d === mStart) ? open : undefined;
                const occ = sel.occ.has(d);
                const selected = !!pos || sel.multi?.has(d) || (occ && d === [...sel.occ][0]);
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
                  >
                    <button
                      type="button"
                      tabIndex={d === tabDate ? 0 : -1}
                      data-date={d}
                      aria-label={fmtDate(d)}
                      onFocus={() => setFocus(d)}
                      onClick={() => onPick(d)}
                    >
                      {Number(d.slice(8))}
                    </button>
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
