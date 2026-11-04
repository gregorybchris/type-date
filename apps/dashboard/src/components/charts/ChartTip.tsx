/** Card for chart details. Opens on hover and on tap; stays until another target is tapped. */
export function ChartTip({ left, top, width = 232, bound, children, onClose }: { left: number; top: number; width?: number; bound: number; children: React.ReactNode; onClose?: () => void }) {
  const x = left + 14 + width > bound ? Math.max(4, left - 14 - width) : left + 14;
  return (
    <div className="absolute z-10 rounded-card border border-border bg-surface p-3 text-[12px] shadow-pop" style={{ left: x, top: Math.max(4, top), width }}>
      {onClose && (
        <button onClick={onClose} aria-label="Close details" className="absolute right-1 top-1 flex size-8 cursor-pointer items-center justify-center rounded-field text-subtle hover:bg-hover md:hidden">×</button>
      )}
      {children}
    </div>
  );
}
