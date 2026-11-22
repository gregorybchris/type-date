import { useEffect, useLayoutEffect, useState } from "react";
import type { RefObject } from "react";

/**
 * The picker is "narrow" when its own width is at most this many pixels. The CSS uses the same number in
 * `@container (max-width: 461px)`, so JS and CSS always agree on the layout. Keep the two in sync.
 */
export const NARROW_MAX = 461;

const hasWindow = typeof window !== "undefined";
const mm = (q: string) => hasWindow && typeof window.matchMedia === "function" && window.matchMedia(q).matches;

/** Whether a media query matches, kept up to date. False where `matchMedia` is missing (tests, SSR). */
export function useMedia(query: string): boolean {
  const [on, setOn] = useState(() => mm(query));
  useEffect(() => {
    if (!hasWindow || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(query);
    const onChange = () => setOn(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [query]);
  return on;
}

/** Whether the element is at most NARROW_MAX wide. Measured before paint, then kept up to date. */
export function useNarrow(ref: RefObject<HTMLElement | null>): boolean {
  const [narrow, setNarrow] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Width 0 means no layout (jsdom, display: none): not narrow.
    const check = () => {
      const w = el.getBoundingClientRect().width;
      setNarrow(w > 0 && w <= NARROW_MAX);
    };
    check();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return narrow;
}

/**
 * Soft keyboard on a narrow touch screen. Sizes the card to the visual viewport (`--td-vvh`) and scrolls the picker
 * to the top of the page when the keyboard opens. A desktop window resize must never scroll the page: the keyboard
 * case is a touch device whose visible height shrank while its width stayed the same.
 *
 * Returns `keepVisible`, called when the input gains focus.
 */
export function useSoftKeyboard(
  root: RefObject<HTMLElement | null>,
  card: RefObject<HTMLElement | null>,
  narrow: boolean,
): () => void {
  useEffect(() => {
    const vv = hasWindow ? window.visualViewport : null;
    if (!vv) return;
    const fit = () => card.current?.style.setProperty("--td-vvh", `${vv.height}px`);
    let last = { w: vv.width, h: vv.height };
    const onResize = () => {
      fit();
      const keyboard = vv.width === last.w && vv.height < last.h && mm("(pointer: coarse)");
      last = { w: vv.width, h: vv.height };
      if (keyboard && narrow && root.current?.contains(document.activeElement)) root.current.scrollIntoView({ block: "start" });
    };
    fit();
    vv.addEventListener("resize", onResize);
    return () => vv.removeEventListener("resize", onResize);
  }, [root, card, narrow]);

  return () => {
    if (narrow) setTimeout(() => root.current?.scrollIntoView?.({ block: "start", behavior: "smooth" }), 250);
  };
}

/** Selector for the element that holds keyboard focus inside the calendar or the time list. */
export const FOCUS_TARGET = '[role="gridcell"] [tabindex="0"], [role=option][tabindex="0"]';

/**
 * Window-level keys for the picker:
 * - Escape clears it from anywhere inside it, or when nothing has focus (after a click on a day or on empty space).
 *   When it is already empty, Escape calls `onEscapeEmpty`. The text input handles its own Escape.
 * - After the picker was clicked or focused, arrows and Page Up/Down move through the calendar or the time list even
 *   when the browser left the focus on the page (Safari does not focus a button on click), and Enter confirms.
 *   Clicking outside the picker turns this off.
 *
 * `state` is read at event time, so pass a ref that the component updates on every render.
 */
export function useGlobalKeys(
  root: RefObject<HTMLElement | null>,
  card: RefObject<HTMLElement | null>,
  state: RefObject<{ empty: boolean; clear: () => void; onEscapeEmpty: () => void; confirm: (() => void) | null }>,
): void {
  useEffect(() => {
    let engaged = false;
    const inside = (n: EventTarget | Node | null) => !!n && !!root.current?.contains(n as Node);
    const onDown = (e: Event) => {
      engaged = inside(e.target);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const el = document.activeElement;
      if (e.key === "Escape") {
        const target = e.target as Element | null;
        if (target?.closest?.("dialog, input, textarea, select, [contenteditable]") && !inside(target)) return;
        if (target instanceof HTMLInputElement && inside(target)) return;
        if (el && el !== document.body && !inside(el)) return;
        if (!state.current.empty) {
          state.current.clear();
          root.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
        } else state.current.onEscapeEmpty();
        return;
      }
      if (!engaged || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const idle = !el || el === document.body || el === document.documentElement || el === root.current || el === card.current;
      if (!idle) return;
      if (e.key === "Enter" && state.current.confirm) {
        e.preventDefault();
        state.current.confirm();
        return;
      }
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown"].includes(e.key)) return;
      const target = root.current?.querySelector<HTMLElement>(FOCUS_TARGET);
      if (!target) return;
      e.preventDefault();
      target.focus({ preventScroll: true });
      target.dispatchEvent(new KeyboardEvent("keydown", { key: e.key, bubbles: true, cancelable: true }));
    };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("focusin", onDown, true);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("focusin", onDown, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [root, card, state]);
}
