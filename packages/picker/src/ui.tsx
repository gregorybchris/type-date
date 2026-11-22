import { useRef } from "react";
import type { FieldAction, FieldModel, FieldSeg } from "./fields";
import { CalendarIcon } from "./icons";

/** Sets inert on collapsed panels. React 18 has no inert prop. */
export const inertRef = (open: boolean) => (el: HTMLElement | null) => {
  if (!el) return;
  if (open) el.removeAttribute("inert");
  else el.setAttribute("inert", "");
};

/** A row that folds to zero height. Keeps showing its last children while it closes. */
export function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
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

function Field({ seg, onAction }: { seg: FieldSeg; onAction: (a: FieldAction) => void }) {
  return (
    <button
      type="button"
      className="td-field"
      data-active={seg.active || undefined}
      data-time={seg.kind === "time" || undefined}
      onClick={() => onAction(seg.action)}
    >
      {seg.kind === "date" && <CalendarIcon />}
      {seg.label}
      {seg.nextDay && <small>+1 day</small>}
    </button>
  );
}

/** The result fields above the calendar, drawn from `fieldModel`. */
export function Fields({ model, onAction }: { model: FieldModel; onAction: (a: FieldAction) => void }) {
  return (
    <div className="td-fields" data-stack={model.stack || undefined}>
      {model.boxes.map((box) => {
        const fields = box.segs.map((seg, i) => (
          <FieldWithDash key={seg.key} seg={seg} dash={box.dashAfter === i - 1} onAction={onAction} />
        ));
        if (!box.boxed) {
          return box.days ? (
            <div key={box.key} className="td-fg td-days">
              {fields}
            </div>
          ) : (
            fields
          );
        }
        return (
          <div key={box.key} className="td-fg">
            {box.to && <span className="td-to">to</span>}
            <div className="td-seg">{fields}</div>
          </div>
        );
      })}
    </div>
  );
}

function FieldWithDash({ seg, dash, onAction }: { seg: FieldSeg; dash: boolean; onAction: (a: FieldAction) => void }) {
  return (
    <>
      {dash && (
        <span className="td-dash" aria-hidden>
          –
        </span>
      )}
      <Field seg={seg} onAction={onAction} />
    </>
  );
}
