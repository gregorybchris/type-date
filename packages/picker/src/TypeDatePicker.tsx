import { localToday, occurrences, resolveDsl, toRRule } from "@type-date/core";
import type { Resolved } from "@type-date/core";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Calendar } from "./Calendar";
import type { Selection } from "./Calendar";
import { TimeList } from "./TimeList";
import type { DateFormat, TimeFormat } from "./dates";
import { fmtDate, inUserZone, zoneLabel, zoneOffsetMin, zonedInstant, setFormats, fmtDuration, fmtShort, fmtTime, monthNames, viewIndex, viewOf } from "./dates";
import type { View } from "./dates";
import { extendList, flipMeridiem, pickDate, pickRange, pickTime, rangeAnchor, summarize, toggleListDate } from "./edit";
import type { Target } from "./edit";
import { derive, fieldModel } from "./fields";
import type { FieldAction } from "./fields";
import { FOCUS_TARGET, useGlobalKeys, useMedia, useNarrow, useSoftKeyboard } from "./hooks";
import { ClearIcon, SearchIcon } from "./icons";
import { parse as builtInParse, preload } from "./parse";
import { Collapse, Fields, inertRef } from "./ui";

export interface TypeDatePickerProps {
  /** Turns typed text into a DSL line. Defaults to the built-in parser. */
  parse?: (text: string) => Promise<string>;
  value?: Resolved;
  onChange?: (r: Resolved) => void;
  /** Show the RFC 5545 recurrence rule (FREQ=WEEKLY;...) for repeating results. Off by default. */
  showRule?: boolean;
  /** Called on Enter with the current result. */
  onConfirm?: (r: Resolved | null) => void;
  /** Called on Escape when the picker is already empty. */
  onEscape?: () => void;
  /** Called when the picker is cleared (Escape, or the text emptied). */
  onClear?: () => void;
  /** YYYY-MM-DD. Defaults to the local date. */
  today?: string;
  weekStart?: 0 | 1;
  /** The user's IANA time zone, for example `America/New_York`. Defaults to the browser's. The built-in parser uses it, with `locale`, to pick among ambiguous zone abbreviations (IST, CST, BST), and the picker uses it to show a time typed in another zone in the user's time. */
  zone?: string;
  /** The user's locale, for example `en-IN`. Defaults to the browser's. */
  locale?: string;
  /** "12h" (3:30 PM) or "24h" (15:30). Default "12h". */
  timeFormat?: TimeFormat;
  /** "mdy" (Oct 2, 2027), "dmy" (2 Oct 2027) or "iso" (2027-10-02). Default "mdy". */
  dateFormat?: DateFormat;
  debounceMs?: number;
  theme?: "light" | "dark" | "system";
  placeholder?: string;
  defaultText?: string;
  className?: string;
  /** Focus the text input on mount. Off by default. */
  autoFocus?: boolean;
}


/** The browser's IANA zone, or undefined where it is hidden (some privacy modes report none). */
function browserZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch {
    return undefined;
  }
}

/** "Mar 1", or "Mar 1, 2027" when the year is not the current one. */
const fmtBound = (d: string, today: string) => (d.slice(0, 4) === today.slice(0, 4) ? fmtShort(d) : fmtDate(d));

/** Methods on the ref of `TypeDatePicker`. */
export interface TypeDatePickerHandle {
  /** Replace the text and parse it now. The picker keeps its state and shows the new result like typed text. */
  setText: (text: string) => void;
  /** Focus the text input. */
  focus: () => void;
}

export const TypeDatePicker = forwardRef<TypeDatePickerHandle, TypeDatePickerProps>(function TypeDatePicker(props, ref) {
  const { value, theme = "system", weekStart = 0, debounceMs = 120 } = props;
  setFormats(props.timeFormat ?? "12h", props.dateFormat ?? "mdy");
  const today = useMemo(() => props.today ?? localToday(), [props.today]);
  const customParse = props.parse;
  const userZone = props.zone ?? browserZone();
  const userLocale = props.locale ?? (typeof navigator !== "undefined" ? navigator.language : undefined);
  const parse = useMemo(
    () => customParse ?? ((t: string) => builtInParse(t, today, { zone: userZone, locale: userLocale })),
    [customParse, today, userZone, userLocale],
  );
  const [text, setText] = useState(props.defaultText ?? "");
  const [result, setResult] = useState<Resolved | null>(value ?? null);
  const [pending, setPending] = useState(false);
  const [muted, setMuted] = useState(false);
  const [target, setTarget] = useState<Target>("start");
  /** With a time per weekday: which weekday the time list edits. */
  const [dayIdx, setDayIdx] = useState(0);
  const [anchor, setAnchor] = useState<string | null>(null);
  const [view, setView] = useState<View & { dir: -1 | 0 | 1 }>({ ...viewOf(today), dir: 0 });
  const seq = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const latest = useRef({ result, onChange: props.onChange, onConfirm: props.onConfirm });
  latest.current = { result, onChange: props.onChange, onConfirm: props.onConfirm };
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  /** The picker's own width is at most NARROW_MAX: one column, phone layout. Same test as the CSS container query. */
  const narrow = useNarrow(root);
  const touch = useMedia("(pointer: coarse)");
  /** The text input has focus. On a touch phone the calendar folds away while the soft keyboard is up. */
  const [typing, setTyping] = useState(false);
  const inputEl = () => root.current?.querySelector<HTMLInputElement>(".td-search input");

  const keepVisible = useSoftKeyboard(root, card, narrow);

  const show = useCallback((v: View) => {
    setView((old) => {
      const diff = viewIndex(v) - viewIndex(old);
      return { ...v, dir: Math.abs(diff) === 1 ? (Math.sign(diff) as -1 | 1) : 0 };
    });
  }, []);

  const commit = useCallback(
    (r: Resolved, notify = true, moveView = true) => {
      latest.current.result = r;
      setResult(r);
      setTarget("start");
      setDayIdx(0);
      const d = r.recurrence?.dtstart ?? r.dates?.[0] ?? r.start?.date ?? r.end?.date;
      if (d && moveView) show(viewOf(d));
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
    setDayIdx(0);
    show(viewOf(today));
    props.onClear?.();
  };


  const onText = (t: string) => {
    if (!t.trim()) return reset();
    setText(t);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => run(t), debounceMs);
  };

  useImperativeHandle(ref, () => ({
    setText: (t: string) => {
      clearTimeout(timer.current);
      setAnchor(null);
      setDayIdx(0);
      if (!t.trim()) return reset();
      setText(t);
      void run(t);
    },
    focus: () => root.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true }),
  }));

  // Warm the built-in parser's lazy rule sets, so the first parse is as fast as the rest.
  useEffect(() => {
    if (!customParse) preload();
  }, [customParse]);

  // Escape, arrows and Enter at window level (see useGlobalKeys). Read at event time through this ref.
  const keys = useRef({ empty: true, clear: () => {}, onEscapeEmpty: () => {}, confirm: null as (() => void) | null });
  keys.current = {
    empty: !text && !result,
    clear: reset,
    onEscapeEmpty: () => {
      show(viewOf(today));
      props.onEscape?.();
    },
    confirm: result ? () => latest.current.onConfirm?.(latest.current.result) : null,
  };
  useGlobalKeys(root, card, keys);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clearTimeout(timer.current);
      run(text).then(() => props.onConfirm?.(latest.current.result));
      // The "done" key closes the soft keyboard, which brings the calendar back.
      if (touch && narrow) e.currentTarget.blur();
    } else if (e.key === "Escape") {
      if (text || result) reset();
      else {
        show(viewOf(today));
        props.onEscape?.();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      root.current?.querySelector<HTMLElement>(FOCUS_TARGET)?.focus();
    }
  };

  const { mode, showCal, showTime, isList, startTime, endTime, tgt } = derive(result, target, dayIdx);
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
  // The last day clicked. Shift-click on a list of dates extends from it.
  const lastPicked = useRef<string | null>(null);
  const onPickDate = (d: string, mods = { shift: false, multi: false }) => {
    const prev = lastPicked.current;
    lastPicked.current = d;
    const cur = latest.current.result;
    if (mods.shift && cur?.kind === "list" && cur.dates?.length) {
      const from = prev && cur.dates.includes(prev) ? prev : cur.dates[cur.dates.length - 1]!;
      commit(extendList(cur, from, d), true, false);
      setAnchor(null);
      return;
    }
    // Cmd or ctrl-click builds a list of dates, without moving the visible month.
    if (mods.multi) {
      commit(toggleListDate(latest.current.result, d), true, false);
      setAnchor(null);
      return;
    }
    // Shift-click extends from the selected day, or from the start of the selected range.
    const from = mods.shift ? rangeAnchor(result) : null;
    if (from) {
      onRange(from, d);
      return;
    }
    const [r, a] = pickDate(result, d, anchor);
    edit(r);
    setAnchor(a);
  };
  // Drag and shift-click set a range without moving the visible month, since both start from days on screen.
  const onRange = (a: string, b: string) => {
    lastPicked.current = b;
    const [lo, hi] = a <= b ? [a, b] : [b, a];
    const cur = latest.current.result;
    if (cur && cur.kind === (lo === hi ? "single" : "range") && cur.start?.date === lo && (lo === hi || cur.end?.date === hi) && !cur.open) return;
    commit(pickRange(latest.current.result, a, b), true, false);
    setAnchor(null);
  };
  const onPickTime = (t: string) => {
    if (!result) return;
    const r = pickTime(result, t, target, dayIdx);
    latest.current.result = r;
    setResult(r);
    latest.current.onChange?.(r);
    if (result.kind === "range" && !result.open && !result.durationMin && target === "start") setTarget("end");
  };

  const open = result?.open;
  const activeTime = result?.kind === "range" && tgt === "end" ? endTime : startTime;
  const meridiem = startTime ? (Number(startTime.slice(0, 2)) < 12 ? "AM" : "PM") : undefined;
  const summary = muted ? `No date found. Showing last result: ${summarize(result)}` : summarize(result);
  const onField = (a: FieldAction) => {
    if (a.type === "day") {
      setDayIdx(a.idx);
      setTarget("start");
      return;
    }
    setTarget(a.target);
    if (a.type === "jump") {
      const d = a.target === "start" ? (result?.start?.date ?? result?.dates?.[0]) : result?.end?.date;
      if (d) show(viewOf(d));
    }
  };

  const chip = open
    ? summarize(result)
    : isList && result?.dates
      ? `${result.dates.length} dates`
      : result?.durationMin
        ? `${fmtDuration(result.durationMin)}${result.endNextDay ? ", ends next day" : ""}`
        : null;
  // a time zone named in the text: its short name, and the time in the user's zone when that differs
  const zoneChips: string[] = [];
  if (result?.zone) {
    const when = result.start?.date ?? rec?.dtstart ?? result.dates?.[0] ?? today;
    zoneChips.push(zoneLabel(result.zone, when));
    if (userZone && startTime && result.zone !== userZone) {
      const inst = zonedInstant(when, startTime, result.zone);
      const a = inst && zoneOffsetMin(result.zone, inst);
      const b = inst && zoneOffsetMin(userZone, inst);
      const c = a !== b ? inUserZone(when, startTime, result.zone, userZone) : null;
      if (c) zoneChips.push(`${fmtTime(c.time)}${c.date > when ? " (+1 day)" : c.date < when ? " (-1 day)" : ""} your time`);
    }
  }
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
      data-typing={typing || undefined}
    >
      <div className="td-card" ref={card}>
      <div
        className="td-search"
        // A tap anywhere in the row (icon, padding) focuses the input.
        onPointerDown={(e) => {
          const t = e.target as HTMLElement;
          if (t.closest("input, button")) return;
          e.preventDefault();
          inputEl()?.focus({ preventScroll: true });
        }}
      >
        <SearchIcon />
        <input
          type="text"
          value={text}
          placeholder={props.placeholder ?? (narrow ? "Try “next friday 3pm”" : "Try “every other sunday” or “oct 2 to oct 5”")}
          aria-label="Date and time"
          aria-describedby="td-status"
          autoComplete="off"
          spellCheck={false}
          autoFocus={props.autoFocus}
          onChange={(e) => onText(e.target.value)}
          onKeyDown={onInputKey}
          onFocus={() => {
            setTyping(true);
            keepVisible();
          }}
          onBlur={() => setTyping(false)}
          enterKeyHint="done"
        />
        <span className="td-busy" aria-hidden />
        <button
          type="button"
          className="td-clear"
          aria-label="Clear"
          hidden={!text}
          // Keep focus (and the soft keyboard) on the input.
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => {
            reset();
            inputEl()?.focus({ preventScroll: true });
          }}
        >
          <ClearIcon />
        </button>
      </div>

      <Collapse open={!!result}>
        <Fields model={fieldModel(result, target, dayIdx)} onAction={onField} />
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
              trim={narrow}
              onView={show}
              onPick={onPickDate}
              onRange={onRange}
            />
          </div>
        </div>
        <div className="td-panel td-panel-time" aria-hidden={!showTime} ref={inertRef(showTime)}>
          <div className="td-panel-in">
            <TimeList start={startTime} end={endTime} active={activeTime} open={open} onPick={onPickTime} />
          </div>
        </div>
      </div>

      <Collapse open={(!!rec && (!!props.showRule || !!rec.months || !!bound)) || !!chip || zoneChips.length > 0 || (!!result?.ambiguous && showTime) || muted || !!anchor}>
        <div className="td-extras">
          {muted && <span className="td-note">No date found. Showing the last result.</span>}
          {anchor && !muted && <span className="td-note">Tap an end date</span>}
          {chip && <span className="td-chip">{chip}</span>}
          {zoneChips.map((z) => (
            <span key={z} className="td-chip" data-zone>{z}</span>
          ))}
          {rec && (props.showRule || rec.months || bound) && (
            <div className="td-rec">
              {props.showRule && (
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
              )}
              {rec.months && <span className="td-chip">Every {monthNames(rec.months)}</span>}
              {bound && <span className="td-chip">{bound}</span>}
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
});
