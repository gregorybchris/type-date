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
  /** Drop trailing weeks that hold no day of the month (phones), so the grid is 4 to 6 rows instead of always 6. */
  trim?: boolean;
  onView: (v: View) => void;
  /** `shift`: extend a range. `multi`: cmd or ctrl, add to a list of dates. */
  onPick: (date: string, mods: { shift: boolean; multi: boolean }) => void;
  /** Drag from one day to another. Called as the pointer enters each day. */
  onRange: (from: string, to: string) => void;
}

export function Calendar({ view, dir, sel, today, weekStart, trim, onView, onPick, onRange }: Props) {
  const all = gridDays(view, weekStart);
  const lastIdx = all.indexOf(ymd(view.y, view.m, 1)) + daysInMonth(view.y, view.m) - 1;
  const days = trim ? all.slice(0, Math.ceil((lastIdx + 1) / 7) * 7) : all;
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

  // Drag to select: press on a day, move over others. With a mouse or pen each day gets pointerenter, and a click that
  // ends on another day does not fire on either button. A touch pointer stays captured by the day it pressed, so the
  // grid finds the day under the finger (onTouchDrag) and drops the click that may follow a drag, so a drag never also
  // picks a single day. Day buttons have touch-action: none (calendar.css): a drag on the days does not scroll.
  const dragFrom = useRef<string | null>(null);
  const dragTo = useRef<string | null>(null);
  const dropClick = useRef(false);
  // Where the grid was when the drag started. Picking the first day opens the result fields above the calendar on a
  // phone, which moves the grid down under the finger; each lookup adds the grid's move since the start.
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const weeksRef = useRef<HTMLDivElement>(null);
  const onTouchDrag = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch" || !dragFrom.current) return;
    const r = weeksRef.current?.getBoundingClientRect();
    if (r && !dragOrigin.current) dragOrigin.current = { x: r.left, y: r.top };
    const o = dragOrigin.current;
    const [dx, dy] = r && o ? [r.left - o.x, r.top - o.y] : [0, 0];
    const el = document.elementFromPoint(e.clientX + dx, e.clientY + dy)?.closest<HTMLElement>("[data-date]");
    const d = el && rootRef.current?.contains(el) ? el.dataset.date : undefined;
    if (!d || d === dragTo.current) return;
    dragTo.current = d;
    if (d !== dragFrom.current) dropClick.current = true;
    onRange(dragFrom.current, d);
  };
  useEffect(() => {
    const end = () => {
      dragFrom.current = null;
      dragTo.current = null;
      dragOrigin.current = null;
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, []);

  const nav = (n: number) => onView(fromIndex(viewIndex(view) + n));

  // Swipe left or right on the month name to change month. Touch only. The days take drags for ranges instead.
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);
  const onSwipeStart = (e: React.PointerEvent) => {
    swipe.current = e.pointerType === "touch" && e.isPrimary ? { x: e.clientX, y: e.clientY, id: e.pointerId } : null;
  };
  const onSwipeEnd = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) >= 48 && Math.abs(dx) > 1.5 * Math.abs(dy)) nav(dx < 0 ? 1 : -1);
  };

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
  const rows = Array.from({ length: days.length / 7 }, (_, r) => days.slice(r * 7, r * 7 + 7));
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
  const shape = blockShape(days, plain, joined, apart);
  // A range whose start and end are next to each other in one row ("thursday and friday") is one block: the two ends
  // join like list tiles, when they look the same (both in this month or both outside it).
  const rangeJoin = (d: string, c: number, pos: string | undefined): string | undefined => {
    const next = addDays(d, 1);
    const prev = addDays(d, -1);
    if (pos === "start" && c < 6 && posOf(next) === "end" && sameLook(d, next)) return "r";
    if (pos === "end" && c > 0 && posOf(prev) === "start" && sameLook(d, prev)) return "l";
    return undefined;
  };

  return (
    <div className="td-cal" ref={rootRef}>
      <div className="td-cal-head">
        <button type="button" className="td-icon-btn" aria-label="Previous month" onClick={() => nav(-1)}>
          <ChevronIcon dir="left" />
        </button>
        <span
          className="td-month"
          key={label}
          onPointerDown={onSwipeStart}
          onPointerUp={onSwipeEnd}
          onPointerCancel={() => (swipe.current = null)}
        >
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
        <div
          className="td-weeks"
          ref={weeksRef}
          key={`${view.y}-${view.m}`}
          data-dir={dir}
          onPointerMove={onTouchDrag}
        >
          {rows.map((row, r) => (
            <div role="row" className="td-row" key={r}>
              {row.map((d, c) => {
                const out = d.slice(0, 7) !== viewKey;
                const pos = posOf(d);
                const edge = pos === "mid" && open && (open === "end" ? d === mEnd : d === mStart) ? open : undefined;
                const occ = sel.occ.has(d);
                const selected = !!pos || sel.multi?.has(d) || occ;
                const { join, gap, bridge, fillets } = shape[r * 7 + c]!;
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
                    data-join={join ?? rangeJoin(d, c, pos)}
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
                        dropClick.current = false;
                        if (!e.button && e.isPrimary !== false && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
                          dragFrom.current = d;
                          dragTo.current = d;
                          const r = weeksRef.current?.getBoundingClientRect();
                          dragOrigin.current = r ? { x: r.left, y: r.top } : null;
                        }
                      }}
                      onPointerEnter={(e) => {
                        if (dragFrom.current && e.pointerType !== "touch") onRange(dragFrom.current, d);
                      }}
                      onClick={(e) => {
                        if (dropClick.current) {
                          dropClick.current = false;
                          return;
                        }
                        onPick(d, { shift: e.shiftKey, multi: e.metaKey || e.ctrlKey });
                      }}
                    >
                      {Number(d.slice(8))}
                    </button>
                    {(["tl", "tr", "bl", "br"] as const).map((k) => (
                      <i
                        key={k}
                        className="td-fillet"
                        data-at={k}
                        data-on={k in fillets || undefined}
                        data-inset={fillets[k] || undefined}
                        aria-hidden="true"
                      />
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

type Corner = "tl" | "tr" | "bl" | "br";

export interface CellShape {
  /** Sides joined to a neighbor of the same look: any of "l", "r", "u", "d". */
  join?: string;
  /** Sides inset by 1px for the gutter between a solid and a faded block: "l", "r". */
  gap?: string;
  /** Sides where the bridge to the tile below is inset 1px more than this tile, because the tile below is inset there. */
  bridge?: string;
  /** Inside corners this tile draws, each with whether the vertical arm of the corner is inset on that side. */
  fillets: Partial<Record<Corner, boolean>>;
}

/**
 * Shape of every cell in a 7-column grid of selected-day blocks (lists and recurrences, not range fill).
 *
 * Rules:
 * - Join: a side is joined when the neighbor there is selected and has the same look (`joined`).
 * - Gap: a side is inset 1px when the neighbor there is selected but looks different (`apart`), so a solid block and
 *   a faded block are split by the same 2px gutter as two rows. The inset is shared down a column: tiles joined
 *   above or below take the same inset, so a column of joined tiles has straight sides. The sharing stops at a tile
 *   that is joined on that side (it is full width there, and the step is rounded by an inside-corner filler).
 * - Bridge: fills the row gap between a tile and the joined tile below, with the width of the tile below.
 * - Fillets: a tile whose side and vertical neighbors are joined but whose diagonal is not owns that inside corner.
 */
export function blockShape(
  days: string[],
  plain: (d: string | undefined) => boolean,
  joined: (a: string, b: string | undefined) => boolean,
  apart: (a: string, b: string | undefined) => boolean,
): CellShape[] {
  const rows = Math.ceil(days.length / 7);
  const at = (i: number, dx: number, dy: number): number | undefined => {
    const c = (i % 7) + dx;
    const r = Math.floor(i / 7) + dy;
    return c < 0 || c > 6 || r < 0 || r >= rows ? undefined : r * 7 + c;
  };
  const nb = (i: number, dx: number, dy: number) => {
    const k = at(i, dx, dy);
    return k === undefined ? undefined : days[k];
  };
  const isJoined = (i: number, dx: number, dy: number) => plain(days[i]) && joined(days[i]!, nb(i, dx, dy));
  const isApart = (i: number, dx: number) => plain(days[i]) && apart(days[i]!, nb(i, dx, 0));
  const insetOf = (i: number, dx: -1 | 1): boolean => {
    if (!plain(days[i]) || isJoined(i, dx, 0)) return false;
    if (isApart(i, dx)) return true;
    for (const dy of [-1, 1]) {
      let k = i;
      while (isJoined(k, 0, dy)) {
        k = at(k, 0, dy)!;
        if (isJoined(k, dx, 0)) break;
        if (isApart(k, dx)) return true;
      }
    }
    return false;
  };
  const inset = days.map((_, i) => ({ l: insetOf(i, -1), r: insetOf(i, 1) }));
  const sides = (l: boolean, r: boolean) => (l ? "l" : "") + (r ? "r" : "") || undefined;
  const corners = [
    ["tl", -1, -1],
    ["tr", 1, -1],
    ["bl", -1, 1],
    ["br", 1, 1],
  ] as const;
  return days.map((d, i) => {
    if (!plain(d)) return { fillets: {} };
    const join =
      [isJoined(i, -1, 0) ? "l" : "", isJoined(i, 1, 0) ? "r" : "", isJoined(i, 0, -1) ? "u" : "", isJoined(i, 0, 1) ? "d" : ""].join(
        "",
      ) || undefined;
    const below = isJoined(i, 0, 1) ? at(i, 0, 1)! : undefined;
    const bridge =
      below === undefined ? undefined : sides(inset[below]!.l && !inset[i]!.l, inset[below]!.r && !inset[i]!.r);
    const fillets: CellShape["fillets"] = {};
    for (const [k, dx, dy] of corners) {
      if (isJoined(i, dx, 0) && isJoined(i, 0, dy) && !isJoined(i, dx, dy)) {
        const arm = inset[at(i, 0, dy)!]!;
        fillets[k] = dx < 0 ? arm.l : arm.r;
      }
    }
    return { join, gap: sides(inset[i]!.l, inset[i]!.r), bridge, fillets };
  });
}
