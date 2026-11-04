import { useEffect, useRef } from "react";
import { fmtTime, timeOptions } from "./dates";

interface Props {
  start?: string;
  end?: string;
  /** Time to scroll to. */
  active?: string;
  onPick: (time: string) => void;
}

export function TimeList({ start, end, active, onPick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const options = timeOptions([start, end]);

  useEffect(() => {
    const box = ref.current;
    const el = active ? box?.querySelector<HTMLElement>(`[data-time="${active}"]`) : null;
    if (!box || !el) return;
    const top = el.offsetTop - box.clientHeight / 2 + el.offsetHeight / 2;
    const calm = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo?.({ top, behavior: calm ? "auto" : "smooth" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement;
    const move = e.key === "ArrowDown" ? t.nextElementSibling : e.key === "ArrowUp" ? t.previousElementSibling : null;
    if (move) {
      e.preventDefault();
      (move as HTMLElement).focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      t.click();
    }
  };

  const tabbable = options.includes(active ?? "") ? active : options[16];
  return (
    <div className="td-list" role="listbox" aria-label="Time" ref={ref} onKeyDown={onKeyDown}>
      {options.map((t) => (
        <div
          key={t}
          role="option"
          data-time={t}
          className="td-opt"
          aria-selected={t === start || t === end}
          tabIndex={t === tabbable ? 0 : -1}
          onClick={() => onPick(t)}
        >
          {fmtTime(t)}
        </div>
      ))}
    </div>
  );
}
