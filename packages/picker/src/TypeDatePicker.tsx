import { localToday, occurrences, resolveDsl, toRRule } from "@type-date/core";
import type { Resolved } from "@type-date/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar } from "./Calendar";
import type { Selection } from "./Calendar";
import { TimeList } from "./TimeList";
import { describeRecurrence, fmtDate, fmtDuration, fmtShort, fmtShortDay, fmtTime, monthNames, viewIndex, viewOf } from "./dates";
import type { View } from "./dates";
import { flipMeridiem, pickDate, pickTime, summarize } from "./edit";
import type { Target } from "./edit";
import { CalendarIcon, SearchIcon } from "./icons";

export interface TypeDatePickerProps {
  /** Turns typed text into a DSL line. */
  parse: (text: string) => Promise<string>;
  value?: Resolved;
  onChange?: (r: Resolved) => void;
  /** Called on Enter with the current result. */
  onConfirm?: (r: Resolved | null) => void;
  /** Called on Escape when the picker is already empty. */
  onEscape?: () => void;
  /** Called when the picker is cleared (Escape, or the text emptied). */
  onClear?: () => void;
  /** YYYY-MM-DD. Defaults to the local date. */
  today?: string;
  weekStart?: 0 | 1;
  debounceMs?: number;
  theme?: "light" | "dark" | "system";
  placeholder?: string;
  defaultText?: string;
  className?: string;
}

/** Sets inert on collapsed panels. React 18 has no inert prop. */
const inertRef = (open: boolean) => (el: HTMLElement | null) => {
  if (!el) return;
  if (open) el.removeAttribute("inert");
  else el.setAttribute("inert", "");
};

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  const last = useRef(children);
  if (open) last.current = children;
  return (
    <div className="td-collapse" data-open={open} aria-hidden={!open}>
      <div className="td-collapse-in" ref={inertRef(open)}>
        {last.current}
      </div>
    </div>
  );
}

function Field(props: { icon?: boolean; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className="td-field" data-active={props.active || undefined} onClick={props.onClick}>
      {props.icon && <CalendarIcon />}
      {props.children}
    </button>
  );
}

/** "Mar 1", or "Mar 1, 2027" when the year is not the current one. */
const fmtBound = (d: string, today: string) => (d.slice(0, 4) === today.slice(0, 4) ? fmtShort(d) : fmtDate(d));

export function TypeDatePicker(props: TypeDatePickerProps) {
  const { parse, value, theme = "system", weekStart = 0, debounceMs = 120 } = props;
  const today = useMemo(() => props.today ?? localToday(), [props.today]);
  const [text, setText] = useState(props.defaultText ?? "");
  const [result, setResult] = useState<Resolved | null>(value ?? null);
  const [pending, setPending] = useState(false);
  const [muted, setMuted] = useState(false);
  const [target, setTarget] = useState<Target>("start");
  const [anchor, setAnchor] = useState<string | null>(null);
  const [view, setView] = useState<View & { dir: -1 | 0 | 1 }>({ ...viewOf(today), dir: 0 });
  const seq = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const latest = useRef({ result, onChange: props.onChange });
  latest.current = { result, onChange: props.onChange };
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  // Soft keyboard: size the card to the visual viewport and keep the input in view.
  useEffect(() => {
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (!vv) return;
    const fit = () => card.current?.style.setProperty("--td-vvh", `${vv.height}px`);
    const onResize = () => {
      fit();
      if (root.current?.contains(document.activeElement) && matchMedia("(max-width: 520px)").matches) {
        root.current.scrollIntoView({ block: "start" });
      }
    };
    fit();
    vv.addEventListener("resize", onResize);
    return () => vv.removeEventListener("resize", onResize);
  }, []);
  const keepVisible = () => {
    if (typeof matchMedia === "function" && matchMedia("(max-width: 520px)").matches) {
      setTimeout(() => root.current?.scrollIntoView?.({ block: "start", behavior: "smooth" }), 250);
    }
  };

  const show = useCallback((v: View) => {
    setView((old) => {
      const diff = viewIndex(v) - viewIndex(old);
      return { ...v, dir: Math.abs(diff) === 1 ? (Math.sign(diff) as -1 | 1) : 0 };
    });
  }, []);

  const commit = useCallback(
    (r: Resolved, notify = true) => {
      latest.current.result = r;
      setResult(r);
      setTarget("start");
      const d = r.recurrence?.dtstart ?? r.dates?.[0] ?? r.start?.date ?? r.end?.date;
      if (d) show(viewOf(d));
      if (notify) latest.current.onChange?.(r);
    },
    [show],
  );

  const run = useCallback(
    (t: string): Promise<void> => {
      const id = ++seq.current;
      if (!t.trim()) {
        setPending(false);
        setMuted(false);
        return Promise.resolve();
      }
      setPending(true);
      return parse(t).then(
        (dsl) => {
          if (id !== seq.current) return;
          setPending(false);
          const r = resolveDsl(dsl, { today, weekStart });
          if (r.mode === "x") return setMuted(true);
          setMuted(false);
          setAnchor(null);
          commit(r);
        },
        () => {
          if (id !== seq.current) return;
          setPending(false);
          setMuted(true);
        },
      );
    },
    [parse, today, weekStart, commit],
  );

  useEffect(() => {
    if (value && value !== latest.current.result) commit(value, false);
  }, [value, commit]);

  useEffect(() => {
    if (props.defaultText) run(props.defaultText);
    // Parse the initial text once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      seq.current++;
    },
    [],
  );

  const resetRef = useRef<() => void>(() => {});
  /** Clear text, selected dates and times, the assumed AM/PM, any anchor, and go back to today's month. */
  const reset = () => {
    clearTimeout(timer.current);
    seq.current++;
    setText("");
    setResult(null);
    latest.current.result = null;
    setPending(false);
    setMuted(false);
    setAnchor(null);
    setTarget("start");
    show(viewOf(today));
    props.onClear?.();
  };

  resetRef.current = reset;

  const onText = (t: string) => {
    if (!t.trim()) return reset();
    setText(t);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => run(t), debounceMs);
  };

  // Escape clears the picker from anywhere inside it, or when nothing has focus (after a click on a day or
  // on empty space). The text input has its own handler below.
  const textRef = useRef(text);
  textRef.current = text;
  const resultRef = useRef(result);
  resultRef.current = result;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      const el = document.activeElement;
      const target = e.target as Element | null;
      if (target?.closest("dialog, input, textarea, select, [contenteditable]") && !root.current?.contains(target)) return;
      if (target instanceof HTMLInputElement && root.current?.contains(target)) return;
      if (el && el !== document.body && !root.current?.contains(el)) return;
      if (textRef.current || resultRef.current) {
        resetRef.current();
        root.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
      } else props.onEscape?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clearTimeout(timer.current);
      run(text).then(() => props.onConfirm?.(latest.current.result));
    } else if (e.key === "Escape") {
      if (text || result) reset();
      else props.onEscape?.();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      root.current?.querySelector<HTMLElement>('[role="gridcell"] [tabindex="0"], [role=option][tabindex="0"]')?.focus();
    }
  };

  const mode = result && result.mode !== "x" ? result.mode : "d";
  const showCal = mode !== "t";
  const showTime = mode !== "d";
  const rec = result?.recurrence;

  const sel: Selection = useMemo(() => {
    if (!result) return { lo: null, hi: null, occ: new Set() };
    if (rec) {
      return { lo: null, hi: null, occ: new Set(occurrences(rec, 400, weekStart)) };
    }
    if (result.kind === "list" && result.dates) {
      return { lo: result.dates[0] ?? null, hi: null, occ: new Set(), multi: new Set(result.dates) };
    }
    if (result.open) {
      const lo = result.start?.date ?? null;
      const hi = result.end?.date ?? null;
      return { lo, hi, occ: new Set(), open: result.open };
    }
    const a = result.start?.date;
    const b = result.kind === "range" ? (result.end?.date ?? a) : a;
    if (!a || !b) return { lo: null, hi: null, occ: new Set() };
    return { lo: a < b ? a : b, hi: a < b ? b : a, occ: new Set() };
  }, [result, rec, weekStart]);

  const edit = (r: Resolved) => {
    commit(r);
  };
  const onPickDate = (d: string) => {
    const [r, a] = pickDate(result, d, anchor);
    edit(r);
    setAnchor(a);
  };
  const onPickTime = (t: string) => {
    if (!result) return;
    const r = pickTime(result, t, target);
    latest.current.result = r;
    setResult(r);
    latest.current.onChange?.(r);
    if (result.kind === "range" && !result.open && !result.durationMin && target === "start") setTarget("end");
  };

  const isList = result?.kind === "list";
  const startTime = rec ? rec.time?.start : isList ? result?.time : result?.start?.time;
  const endTime = rec ? rec.time?.end : result?.end?.time;
  const open = result?.open;
  const tgt: Target = open === "start" ? "end" : open === "end" ? "start" : target;
  const activeTime = result?.kind === "range" && tgt === "end" ? endTime : startTime;
  const meridiem = startTime ? (Number(startTime.slice(0, 2)) < 12 ? "AM" : "PM") : undefined;
  const summary = muted ? `No date found. Showing last result: ${summarize(result)}` : summarize(result);
  const dateOf = (k: Target) => (k === "start" ? (result?.start?.date ?? result?.dates?.[0]) : result?.end?.date);
  const isRange = result?.kind === "range";
  const jump = (k: Target) => {
    setTarget(k);
    const d = dateOf(k);
    if (d) show(viewOf(d));
  };

  const chip = open
    ? summarize(result)
    : isList && result?.dates
      ? `${result.dates.length} dates`
      : result?.durationMin
        ? `${fmtDuration(result.durationMin)}${result.endNextDay ? ", ends next day" : ""}`
        : null;
  const upcoming = [...sel.occ].filter((d) => d >= today);
  const nextList = (upcoming.length ? upcoming : [...sel.occ].slice(-3)).slice(0, 3);
  const bound = rec?.from && rec.until ? `${fmtBound(rec.from, today)} - ${fmtBound(rec.until, today)}` : null;

  const dark = theme === "dark" ? "dark" : theme === "light" ? "light" : undefined;

  return (
    <div
      ref={root}
      className={`td-root${props.className ? ` ${props.className}` : ""}`}
      data-theme={dark}
      data-mode={mode}
      data-kind={result?.kind ?? "none"}
      data-pending={pending || undefined}
      data-muted={muted || undefined}
    >
      <div className="td-card" ref={card}>
      <div className="td-search">
        <SearchIcon />
        <input
          type="text"
          value={text}
          placeholder={props.placeholder ?? "Try “every other sunday” or “oct 2 to oct 5”"}
          aria-label="Date and time"
          aria-describedby="td-status"
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => onText(e.target.value)}
          onKeyDown={onInputKey}
          onFocus={keepVisible}
          enterKeyHint="done"
        />
        <span className="td-busy" aria-hidden />
      </div>

      <Collapse open={!!result}>
        <div className="td-fields">
          {result?.kind === "recurrence" && rec ? (
            <Field active onClick={() => jump("start")}>
              {describeRecurrence(rec)}
            </Field>
          ) : isList && result?.dates ? (
            <div className="td-fg">
              <Field icon active onClick={() => jump("start")}>
                {result.dates.length} dates
              </Field>
              {showTime && startTime && <Field active onClick={() => setTarget("start")}>{fmtTime(startTime)}</Field>}
            </div>
          ) : (
            <>
              <div className="td-fg">
                {showCal && dateOf("start") && (
                  <Field icon active={mode === "d" && !isRange} onClick={() => jump("start")}>
                    {fmtDate(dateOf("start")!)}
                  </Field>
                )}
                {showTime && startTime && (
                  <Field active={tgt === "start"} onClick={() => setTarget("start")}>
                    {fmtTime(startTime)}
                  </Field>
                )}
              </div>
              {isRange && open !== "end" && (
                <div className="td-fg">
                  {!open && <span className="td-to">to</span>}
                  {showTime && endTime && (
                    <Field active={tgt === "end"} onClick={() => setTarget("end")}>
                      {fmtTime(endTime)}
                      {result?.endNextDay ? " (+1 day)" : ""}
                    </Field>
                  )}
                  {showCal && dateOf("end") && (mode === "d" || dateOf("end") !== dateOf("start") || !showTime) && (
                    <Field icon onClick={() => jump("end")}>
                      {fmtDate(dateOf("end")!)}
                    </Field>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </Collapse>

      <div className="td-body" data-cal={showCal} data-time={showTime}>
        <div className="td-panel td-panel-cal" aria-hidden={!showCal} ref={inertRef(showCal)}>
          <div className="td-panel-in">
            <Calendar
              view={view}
              dir={view.dir}
              sel={sel}
              today={today}
              weekStart={weekStart}
              onView={show}
              onPick={onPickDate}
            />
          </div>
        </div>
        <div className="td-panel td-panel-time" aria-hidden={!showTime} ref={inertRef(showTime)}>
          <div className="td-panel-in">
            <TimeList start={startTime} end={endTime} active={activeTime} open={open} onPick={onPickTime} />
          </div>
        </div>
      </div>

      <Collapse open={!!rec || !!chip || (!!result?.ambiguous && showTime) || muted || !!anchor}>
        <div className="td-extras">
          {muted && <span className="td-note">No date found. Showing the last result.</span>}
          {anchor && !muted && <span className="td-note">Tap an end date</span>}
          {chip && <span className="td-chip">{chip}</span>}
          {rec && (
            <div className="td-rec">
              <code className="td-rrule">
                {toRRule(rec)
                  .split(";")
                  .map((part, i, all) => (
                    <span key={part}>
                      {part}
                      {i < all.length - 1 ? ";" : ""}
                      <wbr />
                    </span>
                  ))}
              </code>
              {rec.months && <span className="td-chip">Every {monthNames(rec.months)}</span>}
              {bound && <span className="td-chip">{bound}</span>}
              <span className="td-next">
                {upcoming.length || !sel.occ.size ? "Upcoming dates:" : "Most recent dates:"}{" "}
                {nextList.length ? nextList.map(fmtShortDay).join(" · ") : "none"}
              </span>
            </div>
          )}
          {result?.ambiguous && showTime && (
            <div className="td-ampm" role="group" aria-label="Assumed AM or PM">
              <span>Assumed</span>
              {(["AM", "PM"] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  aria-pressed={meridiem === m}
                  onClick={() => result && meridiem !== m && edit(flipMeridiem(result))}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </Collapse>

      <div className="td-foot">
        <span className="td-hint">
          <kbd>↑</kbd>
          <kbd>↓</kbd>
          navigate
        </span>
        <span className="td-hint">
          <kbd>↵</kbd>
          confirm
        </span>
        <span className="td-hint">
          <kbd>esc</kbd>
          clear
        </span>
      </div>
      </div>
      <div id="td-status" className="td-sr" role="status" aria-live="polite">
        {summary}
      </div>
    </div>
  );
}
