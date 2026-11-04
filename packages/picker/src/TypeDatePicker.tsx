import { localToday, occurrences, resolveDsl, toRRule } from "@type-date/core";
import type { Resolved } from "@type-date/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar } from "./Calendar";
import type { Selection } from "./Calendar";
import { TimeList } from "./TimeList";
import { describeRecurrence, fmtDate, fmtShort, fmtTime, viewIndex, viewOf } from "./dates";
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
  /** Called on Escape when the input is already empty. */
  onEscape?: () => void;
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
      const d = r.recurrence?.dtstart ?? r.start?.date ?? r.end?.date;
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

  const onText = (t: string) => {
    setText(t);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => run(t), debounceMs);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clearTimeout(timer.current);
      run(text).then(() => props.onConfirm?.(latest.current.result));
    } else if (e.key === "Escape") {
      if (text) onText("");
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
      return { lo: null, hi: null, occ: new Set(occurrences(rec, 120, weekStart)) };
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
    if (result.kind === "range" && target === "start") setTarget("end");
  };

  const startTime = rec ? rec.time?.start : result?.start?.time;
  const endTime = rec ? rec.time?.end : result?.end?.time;
  const activeTime = result?.kind === "range" && target === "end" ? endTime : startTime;
  const meridiem = startTime ? (Number(startTime.slice(0, 2)) < 12 ? "AM" : "PM") : undefined;
  const summary = muted ? `No date found. Showing last result: ${summarize(result)}` : summarize(result);
  const dateOf = (k: Target) => result?.[k]?.date;
  const isRange = result?.kind === "range";
  const jump = (k: Target) => {
    setTarget(k);
    const d = dateOf(k);
    if (d) show(viewOf(d));
  };

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
          ) : (
            <>
              <div className="td-fg">
                {showCal && dateOf("start") && (
                  <Field icon active={mode === "d" && !isRange} onClick={() => jump("start")}>
                    {fmtDate(dateOf("start")!)}
                  </Field>
                )}
                {showTime && startTime && (
                  <Field active={target === "start"} onClick={() => setTarget("start")}>
                    {fmtTime(startTime)}
                  </Field>
                )}
              </div>
              {isRange && (
                <div className="td-fg">
                  <span className="td-to">to</span>
                  {showTime && endTime && (
                    <Field active={target === "end"} onClick={() => setTarget("end")}>
                      {fmtTime(endTime)}
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
            <TimeList start={startTime} end={endTime} active={activeTime} onPick={onPickTime} />
          </div>
        </div>
      </div>

      <Collapse open={!!rec || (!!result?.ambiguous && showTime) || muted || !!anchor}>
        <div className="td-extras">
          {muted && <span className="td-note">No date found. Showing the last result.</span>}
          {anchor && !muted && <span className="td-note">Tap an end date</span>}
          {rec && (
            <div className="td-rec">
              <code className="td-rrule">{toRRule(rec)}</code>
              <span className="td-next">
                Next {sel.occ.size ? [...sel.occ].slice(0, 3).map(fmtShort).join(" · ") : "none"}
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
