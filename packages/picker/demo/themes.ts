/** Demo color themes. Each theme is a full palette taken from a popular editor or app scheme. */
export interface Theme {
  id: string;
  name: string;
  mode: "light" | "dark";
  /** Page background behind the picker. */
  page: string;
  /** Picker card and dialog background. */
  card: string;
  /** Main text color. */
  fg: string;
  /** Highlight color for selected days and the caret. */
  accent: string;
}

export const THEMES: Theme[] = [
  { id: "paper", name: "Paper", mode: "light", page: "#f5f4f0", card: "#ffffff", fg: "#171717", accent: "#4f46e5" },
  { id: "solarized-light", name: "Solarized", mode: "light", page: "#eee8d5", card: "#fdf6e3", fg: "#586e75", accent: "#268bd2" },
  { id: "latte", name: "Latte", mode: "light", page: "#e6e9ef", card: "#eff1f5", fg: "#4c4f69", accent: "#8839ef" },
  { id: "rose-dawn", name: "Rosé Dawn", mode: "light", page: "#faf4ed", card: "#fffaf3", fg: "#575279", accent: "#b4637a" },
  { id: "github-light", name: "GitHub", mode: "light", page: "#f6f8fa", card: "#ffffff", fg: "#1f2328", accent: "#0969da" },
  { id: "gruvbox-light", name: "Gruvbox", mode: "light", page: "#ebdbb2", card: "#fbf1c7", fg: "#3c3836", accent: "#af3a03" },
  { id: "nord-snow", name: "Nord Snow", mode: "light", page: "#e5e9f0", card: "#eceff4", fg: "#2e3440", accent: "#5e81ac" },
  { id: "everforest-light", name: "Everforest", mode: "light", page: "#efebd4", card: "#fdf6e3", fg: "#5c6a72", accent: "#8da101" },

  { id: "warm-dark", name: "Warm Dark", mode: "dark", page: "#141413", card: "#202020", fg: "#f5f5f5", accent: "#c9a45c" },
  { id: "dracula", name: "Dracula", mode: "dark", page: "#21222c", card: "#282a36", fg: "#f8f8f2", accent: "#bd93f9" },
  { id: "nord", name: "Nord", mode: "dark", page: "#242933", card: "#2e3440", fg: "#eceff4", accent: "#88c0d0" },
  { id: "tokyo-night", name: "Tokyo Night", mode: "dark", page: "#16161e", card: "#1a1b26", fg: "#c0caf5", accent: "#7aa2f7" },
  { id: "mocha", name: "Mocha", mode: "dark", page: "#181825", card: "#1e1e2e", fg: "#cdd6f4", accent: "#fab387" },
  { id: "gruvbox-dark", name: "Gruvbox", mode: "dark", page: "#1d2021", card: "#282828", fg: "#ebdbb2", accent: "#fe8019" },
  { id: "rose-pine", name: "Rosé Pine", mode: "dark", page: "#191724", card: "#1f1d2e", fg: "#e0def4", accent: "#ebbcba" },
  { id: "github-dimmed", name: "GitHub Dim", mode: "dark", page: "#1c2128", card: "#22272e", fg: "#adbac7", accent: "#539bf5" },
];

export const DEFAULT_THEME = "rose-dawn";

export function findTheme(id: string | null | undefined): Theme | undefined {
  if (id === "light") return THEMES.find((t) => t.id === "paper");
  if (id === "dark") return THEMES.find((t) => t.id === "warm-dark");
  return THEMES.find((t) => t.id === id);
}

function luminance(hex: string): number {
  const c = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!;
}

/** CSS variables the demo stylesheet turns into picker and page colors. */
export function themeVars(t: Theme): Record<string, string> {
  return {
    "--t-page": t.page,
    "--t-card": t.card,
    "--t-fg": t.fg,
    "--t-accent": t.accent,
    "--t-on-accent": luminance(t.accent) > 0.4 ? "#1c1c1c" : "#ffffff",
  };
}
