const p = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const SearchIcon = () => (
  <svg {...p} width={18} height={18}>
    <circle cx="7" cy="7" r="4.6" />
    <path d="m10.5 10.5 3 3" />
  </svg>
);
export const CalendarIcon = () => (
  <svg {...p}>
    <rect x="2.5" y="3.5" width="11" height="10" rx="2" />
    <path d="M2.5 6.5h11M5.5 2v2.5M10.5 2v2.5" />
  </svg>
);
export const ChevronIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg {...p}>
    <path d={dir === "left" ? "m9.5 4-4 4 4 4" : "m6.5 4 4 4-4 4"} />
  </svg>
);
