import { useEffect, useRef } from "react";
import { fmtTime, timeOptions } from "./dates";

interface Props {
  start?: string;
  end?: string;
  /** Time to scroll to. */
  active?: string;
  /** One-sided range: highlight every option after `start` or before `end`. */
  open?: "start" | "end";
  onPick: (time: string) => void;
}

export function TimeList({ start, end, active, open, onPick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const options = timeOptions([start, end]);

  useEffect(() => {
    const box = ref.current;
    const el = active ? box?.querySelector<HTMLElement>(`[data-time="${active}"]`) : null;
    if (!box || !el) return;
    const top = el.offsetTop - box.clientHeight / 2 + el.offsetHeight / 2;
    const left = el.offsetLeft - box.clientWidth / 2 + el.offsetWidth / 2;
    const calm = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo?.({ top, left, behavior: calm ? "auto" : "smooth" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement;
    const move = e.key === "ArrowDown" || e.key === "ArrowRight" ? t.nextElementSibling : e.key === "ArrowUp" || e.key === "ArrowLeft" ? t.previousElementSibling : null;
    if (move) {
      e.preventDefault();
      (move as HTMLElement).focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      t.click();
    }
  };

  const tabbable = options.includes(active ?? "") ? active : options[16];
  // Closed range: color the whole span. An overnight range (end before start) fills down from start and down to end.
  const closed = !open && !!start && !!end;
  const overnight = closed && end! < start!;
  const rangeOf = (t: string): "start" | "end" | "mid" | "single" | undefined => {
    if (!closed) return undefined;
    if (start === end && t === start) return "single";
    if (t === start) return "start";
    if (t === end) return "end";
    if (overnight ? t > start! || t < end! : t > start! && t < end!) return "mid";
    return undefined;
  };
  return (
    <div className="td-list" role="listbox" aria-label="Time" ref={ref} onKeyDown={onKeyDown}>
      {options.map((t) => (
        <div
          key={t}
          role="option"
          data-time={t}
          className="td-opt"
          aria-selected={t === start || t === end}
          data-range={rangeOf(t)}
          data-in={(open === "end" && !!start && t > start) || (open === "start" && !!end && t < end) || undefined}
          tabIndex={t === tabbable ? 0 : -1}
          onClick={() => onPick(t)}
        >
          {fmtTime(t)}
        </div>
      ))}
    </div>
  );
}
