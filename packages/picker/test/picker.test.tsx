import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createRef } from "react";
import type { Ref } from "react";
import { TypeDatePicker } from "../src";
import type { TypeDatePickerHandle } from "../src";
import type { TypeDatePickerProps } from "../src";
import { blockShape } from "../src/Calendar";

/** The rule is split at semicolons for line breaking, so match on the element's text. */
function ruleText(rule: string): HTMLElement | null {
  const el = document.querySelector<HTMLElement>(".td-rrule");
  return el && el.textContent === rule ? el : null;
}

afterEach(cleanup);

const TODAY = "2026-09-14";
const DB = 5;

function setup(parse: TypeDatePickerProps["parse"], extra: Partial<TypeDatePickerProps> & { ref?: Ref<TypeDatePickerHandle> } = {}) {
  const utils = render(<TypeDatePicker parse={parse} today={TODAY} debounceMs={DB} showRule {...extra} />);
  const input = screen.getByLabelText("Date and time") as HTMLInputElement;
  const type = (v: string) => fireEvent.change(input, { target: { value: v } });
  return { ...utils, input, type, root: utils.container.querySelector(".td-root") as HTMLElement };
}
const table = (m: Record<string, string>) => async (t: string) => m[t] ?? "x";

describe("formats", () => {
  it("shows 24-hour times and day-first dates when asked", async () => {
    const { type } = setup(table({ c: "dt 09-21 15:30" }), { timeFormat: "24h", dateFormat: "dmy" });
    type("c");
    await waitFor(() => expect(screen.getByRole("option", { name: "15:30" }).getAttribute("aria-selected")).toBe("true"));
    expect(screen.getAllByText("21 Sep 2026").length).toBeGreaterThan(0);
  });
});

describe("selected-day blocks", () => {
  it("joins neighbors only when both are in the month or both are outside it", async () => {
    // Daily: every day of September is solid, and the trailing days of August and October are faded.
    const { type } = setup(table({ a: "d R d/1" }), { weekStart: 0 });
    type("a");
    await waitFor(() => expect(document.querySelector('[aria-selected="true"]')).toBeTruthy());
    const join = (d: string) => document.querySelector(`[data-date="${d}"]`)!.parentElement!.getAttribute("data-join");
    // Sep 30 (Wed): solid. Left is solid and joins. Right is Oct 1, faded, so no "r".
    expect(join("2026-09-30")).toContain("l");
    expect(join("2026-09-30")).not.toContain("r");
    // Oct 1 (Thu): faded. Left is Sep 30, solid, so no "l". Right is Oct 2, faded, so "r".
    expect(join("2026-10-01")).not.toContain("l");
    expect(join("2026-10-01")).toContain("r");
  });
});

describe("inside corners", () => {
  it("adds a filler at the inside corner of each block, on the tile opposite the missing one", async () => {
    // Monday start. Sep 23 has Sep 24 to its right and Sep 30 below, but Oct 1 (faded) diagonal, so it owns the
    // solid block's inside corner. The faded block has the mirror corner, owned by Oct 8.
    const { type } = setup(table({ a: "d R d/1 mo,tu,we,th,fr" }), { weekStart: 1 });
    type("a");
    await waitFor(() => expect(document.querySelector('[aria-selected="true"]')).toBeTruthy());
    const found = Array.from(document.querySelectorAll(".td-fillet[data-on]")).map(
      (f) => `${f.parentElement!.querySelector("button")!.getAttribute("data-date")} ${f.getAttribute("data-at")}`,
    );
    expect(found.sort()).toEqual(["2026-09-23 br", "2026-10-08 tl"]);
  });
});

describe("block shape", () => {
  // Nov 2026, Sunday start: the grid runs Nov 1 to Dec 12. Days are "in" (solid) or "out" (faded) by month.
  const grid = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(Date.UTC(2026, 10, 1 + i));
    return d.toISOString().slice(0, 10);
  });
  const shapeOf = (picked: string[]) => {
    const set = new Set(picked);
    const plain = (d: string | undefined) => !!d && set.has(d);
    const same = (a: string, b: string) => (a.slice(0, 7) === "2026-11") === (b.slice(0, 7) === "2026-11");
    const shapes = blockShape(grid, plain, (a, b) => plain(b) && same(a, b!), (a, b) => plain(b) && !same(a, b!));
    return (d: string) => shapes[grid.indexOf(d)]!;
  };
  // The layout from a user report: Nov 23, 25 to 30 (no 29), Dec 1 to 5, 7, 8.
  const report = ["11-23", "11-25", "11-26", "11-27", "11-28", "11-30", "12-01", "12-02", "12-03", "12-04", "12-05", "12-07", "12-08"].map(
    (d) => `2026-${d}`,
  );

  it("shares a gutter inset down a column of joined tiles", () => {
    const s = shapeOf(report);
    // Nov 30 is next to Dec 1 (faded), so it is inset on the right. Nov 23 above it takes the same inset, so the
    // column has a straight right side and its bridge needs no extra inset.
    expect(s("2026-11-30").gap).toBe("r");
    expect(s("2026-11-23").gap).toBe("r");
    expect(s("2026-11-23").join).toBe("d");
    expect(s("2026-11-23").bridge).toBeUndefined();
  });

  it("stops sharing the inset at a tile joined on that side, and the inside-corner filler meets the inset side", () => {
    const s = shapeOf(report);
    // Dec 1 is inset on the left (Nov 30 is solid). Dec 8 below it is joined to Dec 7, so it stays full width; the
    // step is the inside corner owned by Dec 8, whose vertical arm (Dec 1) is inset.
    expect(s("2026-12-01").gap).toBe("l");
    expect(s("2026-12-08").gap).toBeUndefined();
    expect(s("2026-12-08").fillets).toEqual({ tl: true });
    // Dec 1 owns the corner above Dec 9. Its vertical arm (Dec 8) is not inset on the right.
    expect(s("2026-12-01").fillets).toEqual({ br: false });
  });

  it("insets a lone tile below an inset one, so the column stays straight", () => {
    const s = shapeOf(["2026-11-30", "2026-12-01", "2026-12-08"]);
    expect(s("2026-12-08").gap).toBe("l");
    expect(s("2026-12-01").bridge).toBeUndefined();
  });

  it("insets the bridge when the tile below is inset and this one is joined on that side", () => {
    // Nov 23 and 24 are joined, so Nov 23 is full width on the right; Nov 30 below is inset next to Dec 1.
    const s = shapeOf(["2026-11-23", "2026-11-24", "2026-11-30", "2026-12-01"]);
    expect(s("2026-11-23").gap).toBeUndefined();
    expect(s("2026-11-23").bridge).toBe("r");
    expect(s("2026-11-23").fillets).toEqual({ br: true });
  });

  it("gives unselected days and lone tiles no shape", () => {
    const s = shapeOf(["2026-11-10", "2026-11-18"]);
    expect(s("2026-11-11")).toEqual({ fillets: {} });
    expect(s("2026-11-10")).toEqual({ join: undefined, gap: undefined, bridge: undefined, fillets: {} });
  });
});

describe("range and multi selection", () => {
  const day = (d: string) => document.querySelector(`[data-date="${d}"]`) as HTMLElement;
  const selected = () =>
    Array.from(document.querySelectorAll('[aria-selected="true"] button')).map((b) => b.getAttribute("data-date"));
  const start = async () => {
    const u = setup(table({ a: "d 09-21", t: "dt 09-21 15:00" }));
    u.type("a");
    await waitFor(() => expect(selected()).toEqual(["2026-09-21"]));
    return u;
  };

  it("shift-click extends from the selected day to a range", async () => {
    await start();
    fireEvent.click(day("2026-09-24"), { shiftKey: true });
    expect(selected()).toEqual(["2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24"]);
    // Shift-click before the start makes the range run backward from the anchor.
    fireEvent.click(day("2026-09-19"), { shiftKey: true });
    expect(selected()).toEqual(["2026-09-19", "2026-09-20", "2026-09-21"]);
  });

  it("drags from one day to another", async () => {
    await start();
    fireEvent.pointerDown(day("2026-09-15"), { button: 0 });
    fireEvent.pointerEnter(day("2026-09-16"));
    fireEvent.pointerEnter(day("2026-09-17"));
    expect(selected()).toEqual(["2026-09-15", "2026-09-16", "2026-09-17"]);
    // Dragging back to the first day leaves that single day.
    fireEvent.pointerEnter(day("2026-09-15"));
    expect(selected()).toEqual(["2026-09-15"]);
    fireEvent.pointerUp(window);
    // After release, moving over days changes nothing.
    fireEvent.pointerEnter(day("2026-09-18"));
    expect(selected()).toEqual(["2026-09-15"]);
  });

  it("keeps the time when a range is made", async () => {
    const { type } = await start();
    type("t");
    await waitFor(() => expect(screen.getByRole("option", { name: "3:00 PM" }).getAttribute("aria-selected")).toBe("true"));
    fireEvent.click(day("2026-09-23"), { shiftKey: true });
    expect(screen.getAllByRole("option", { name: "3:00 PM" }).length).toBeGreaterThan(0);
    expect(selected()).toEqual(["2026-09-21", "2026-09-22", "2026-09-23"]);
  });

  it("cmd-click after a range starts a fresh list from the clicked day", async () => {
    await start();
    fireEvent.click(day("2026-09-24"), { shiftKey: true });
    fireEvent.click(day("2026-09-10"), { metaKey: true });
    expect(selected()).toEqual(["2026-09-10"]);
    fireEvent.click(day("2026-09-12"), { metaKey: true });
    expect(selected()).toEqual(["2026-09-10", "2026-09-12"]);
  });

  it("shift-click after cmd-click adds the days from the last click to the list", async () => {
    await start();
    fireEvent.click(day("2026-09-23"), { metaKey: true });
    fireEvent.click(day("2026-09-28"), { metaKey: true });
    fireEvent.click(day("2026-09-30"), { shiftKey: true });
    expect(selected()).toEqual(["2026-09-21", "2026-09-23", "2026-09-28", "2026-09-29", "2026-09-30"]);
    // The next shift-click extends from Sep 30.
    fireEvent.click(day("2026-10-02"), { shiftKey: true });
    expect(selected()).toContain("2026-10-02");
    expect(selected()).toContain("2026-10-01");
  });

  it("cmd-click builds a list of dates and toggles days in it", async () => {
    await start();
    fireEvent.click(day("2026-09-23"), { metaKey: true });
    fireEvent.click(day("2026-09-28"), { ctrlKey: true });
    expect(selected()).toEqual(["2026-09-21", "2026-09-23", "2026-09-28"]);
    fireEvent.click(day("2026-09-23"), { metaKey: true });
    expect(selected()).toEqual(["2026-09-21", "2026-09-28"]);
  });
});

describe("assumed AM/PM", () => {
  it("flips every weekday time of a per-weekday recurrence", async () => {
    // "tuesdays at 1:30 and thursdays at 3": both times were guessed as PM. Choosing AM moves both.
    const { type } = setup(table({ a: "dt R w/1 tu@1:30?,th@3?" }));
    type("a");
    await waitFor(() => expect(screen.getByText("Assumed")).toBeTruthy());
    expect(document.body.textContent).toContain("Tue at 1:30 PM, Thu at 3:00 PM");
    fireEvent.click(screen.getByRole("button", { name: "AM" }));
    expect(document.body.textContent).toContain("Tue at 1:30 AM, Thu at 3:00 AM");
  });
});

describe("ref handle", () => {
  it("setText replaces the text and parses it without remounting", async () => {
    const ref = createRef<TypeDatePickerHandle>();
    const { input, root } = setup(table({ a: "d 09-21", b: "d 09-24" }), { ref });
    const el = root;
    act(() => ref.current!.setText("a"));
    await waitFor(() => expect(input.value).toBe("a"));
    await waitFor(() => expect(document.querySelectorAll('[aria-selected="true"]').length).toBe(1));
    act(() => ref.current!.setText("b"));
    await waitFor(() => expect(document.querySelector('[data-date="2026-09-24"]')!.parentElement!.getAttribute("aria-selected")).toBe("true"));
    expect(document.querySelector(".td-root")).toBe(el);
    expect(screen.getByLabelText("Date and time")).toBe(input);
    // The same text again re-parses, which resets a selection made by clicking.
    fireEvent.click(document.querySelector('[data-date="2026-09-10"]')!);
    act(() => ref.current!.setText("b"));
    await waitFor(() => expect(document.querySelector('[data-date="2026-09-24"]')!.parentElement!.getAttribute("aria-selected")).toBe("true"));
    act(() => ref.current!.setText(""));
    await waitFor(() => expect(input.value).toBe(""));
  });
});

describe("escape", () => {
  it("returns to today's month when the picker is already empty", () => {
    const { input } = setup(table({}));
    fireEvent.click(screen.getByLabelText("Next month"));
    fireEvent.click(screen.getByLabelText("Next month"));
    expect(screen.getByRole("grid").getAttribute("aria-label")).toContain("November");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.getByRole("grid").getAttribute("aria-label")).toContain("September");
  });
});

describe("mode switching", () => {
  it("shows the calendar for d, the time list for t, both for dt", async () => {
    const { type, root } = setup(table({ a: "d 09-21", b: "t 12:00", c: "dt 09-21 10:00" }));
    type("a");
    await waitFor(() => expect(screen.getByRole("grid")).toBeTruthy());
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(root.dataset.mode).toBe("d");

    type("b");
    await waitFor(() => expect(screen.getByRole("listbox")).toBeTruthy());
    expect(screen.queryByRole("grid")).toBeNull();
    expect(root.dataset.mode).toBe("t");

    type("c");
    await waitFor(() => expect(root.dataset.mode).toBe("dt"));
    expect(screen.getByRole("grid")).toBeTruthy();
    expect(screen.getByRole("listbox")).toBeTruthy();
  });

  it("marks the selected time option", async () => {
    const { type } = setup(table({ c: "dt 09-21 10:00" }));
    type("c");
    await waitFor(() => expect(screen.getByRole("option", { name: "10:00 AM" }).getAttribute("aria-selected")).toBe("true"));
  });
});

describe("rendering", () => {
  it("fills a date range across weeks", async () => {
    const { type } = setup(table({ r: "d 10-02>10-05" }), { weekStart: 1 });
    type("r");
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-label")).toBe("October 2026"));
    const cells = screen.getAllByRole("gridcell").filter((c) => c.dataset.range);
    expect(cells.map((c) => c.dataset.range)).toEqual(["start", "mid", "mid", "end"]);
    expect(cells.map((c) => c.textContent)).toEqual(["2", "3", "4", "5"]);
  });

  it("shows the day for an Easter-relative date and for a weekday of a relative week (h11 forms)", async () => {
    const { type } = setup(table({ e: "d E-2", w: "d tu@W+1" }));
    type("e");
    // Good Friday 2027 is 2027-03-26
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-label")).toBe("March 2027"));
    expect(screen.getAllByRole("gridcell").filter((c) => c.getAttribute("aria-selected") === "true" || c.dataset.selected).map((c) => c.textContent)).toContain("26");
    type("w");
    // Today is Monday 2026-09-14; Tuesday of next week is 2026-09-22
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-label")).toBe("September 2026"));
    expect(screen.getAllByRole("gridcell").some((c) => c.textContent === "22" && (c.getAttribute("aria-selected") === "true" || !!c.dataset.selected))).toBe(true);
  });

  it("renders a time range with two selected options", async () => {
    const { type } = setup(table({ t: "t 4?>4:30?" }));
    type("t");
    await waitFor(() => expect(screen.getAllByRole("option", { selected: true })).toHaveLength(2));
    expect(screen.getByText("Assumed")).toBeTruthy();
  });

  it("marks recurrence occurrences and shows the rule", async () => {
    const { type } = setup(table({ e: "d R w/2 su" }), { weekStart: 1 });
    type("e");
    await waitFor(() => expect(ruleText("FREQ=WEEKLY;INTERVAL=2;BYDAY=SU")).toBeTruthy());
    const marked = screen.getAllByRole("gridcell").filter((c) => c.dataset.occ);
    expect(marked.map((c) => c.textContent)).toContain("20");
    expect(marked.map((c) => c.textContent)).not.toContain("27");
  });

  it("announces the summary in a live region", async () => {
    const { type } = setup(table({ a: "d 09-21" }));
    type("a");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Sep 21, 2026"));
  });
});

describe("async handling", () => {
  it("debounces rapid input into one parse call", async () => {
    const parse = vi.fn(async () => "d 09-21");
    const { type } = setup(parse, { debounceMs: 30 });
    type("a");
    type("ab");
    type("abc");
    await waitFor(() => expect(parse).toHaveBeenCalledTimes(1));
    expect(parse).toHaveBeenCalledWith("abc");
  });

  it("discards stale results", async () => {
    const gates: Record<string, (v: string) => void> = {};
    const parse = (t: string) => new Promise<string>((res) => (gates[t] = res));
    const { type, root } = setup(parse);
    type("one");
    await waitFor(() => expect(gates.one).toBeTruthy());
    type("two");
    await waitFor(() => expect(gates.two).toBeTruthy());
    await act(async () => gates.two!("d 09-22"));
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Sep 22, 2026"));
    await act(async () => gates.one!("d 09-21"));
    expect(screen.getByRole("status").textContent).toBe("Sep 22, 2026");
    expect(root.dataset.pending).toBeUndefined();
  });

  it("keeps the last good result while pending and on x", async () => {
    let release: (v: string) => void = () => {};
    const parse = (t: string) =>
      t === "a" ? Promise.resolve("d 09-21") : t === "b" ? new Promise<string>((r) => (release = r)) : Promise.resolve("x");
    const { type, root } = setup(parse);
    type("a");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Sep 21, 2026"));
    type("b");
    await waitFor(() => expect(root.dataset.pending).toBe("true"));
    expect(screen.getAllByRole("gridcell").filter((c) => c.getAttribute("aria-selected") === "true")).toHaveLength(1);
    await act(async () => release("x"));
    await waitFor(() => expect(root.dataset.muted).toBe("true"));
    expect(screen.getAllByRole("gridcell").filter((c) => c.getAttribute("aria-selected") === "true")).toHaveLength(1);
    expect(screen.getByRole("status").textContent).toContain("Sep 21, 2026");
  });
});

describe("direct edits", () => {
  it("clicking a day updates the value", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: "d 09-21" }), { onChange });
    type("a");
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Sep 23, 2026" }));
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ start: { date: "2026-09-23" } }));
  });

  it("clicking two days builds a range", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ r: "d 10-02>10-05" }), { onChange });
    type("r");
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Oct 8, 2026" }));
    fireEvent.click(screen.getByRole("button", { name: "Oct 12, 2026" }));
    const last = onChange.mock.calls.at(-1)![0];
    expect(last.start.date).toBe("2026-10-08");
    expect(last.end.date).toBe("2026-10-12");
  });

  it("clicking a time updates the start time, and the AM/PM chip flips it", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: "dt 09-21 9?" }), { onChange });
    type("a");
    await waitFor(() => expect(screen.getByText("Assumed")).toBeTruthy());
    fireEvent.click(screen.getByRole("button", { name: "PM" }));
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ start: { date: "2026-09-21", time: "21:00" }, ambiguous: false }));
    fireEvent.click(screen.getByRole("option", { name: "11:30 AM" }));
    expect(onChange.mock.calls.at(-1)![0].start.time).toBe("11:30");
  });

  it("Enter confirms with the parsed result", async () => {
    const onConfirm = vi.fn();
    const { input, type } = setup(table({ a: "d 09-21" }), { onConfirm, debounceMs: 500 });
    type("a");
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(onConfirm).toHaveBeenCalled());
    expect(onConfirm.mock.calls[0]![0].start.date).toBe("2026-09-21");
  });
});

describe("mobile structure", () => {
  it("renders the time options in one listbox and day buttons as 7 columns", async () => {
    const { type } = setup(table({ c: "dt 09-21 10:00" }));
    type("c");
    await waitFor(() => expect(screen.getByRole("listbox")).toBeTruthy());
    expect(screen.getAllByRole("option").length).toBeGreaterThanOrEqual(48);
    expect(screen.getAllByRole("row").every((r) => r.children.length === 7)).toBe(true);
  });

  it("shows a hint after the first tap of a range", async () => {
    const { type } = setup(table({ r: "d 10-02>10-05" }));
    type("r");
    // The grid renders before the parse resolves, so wait for the range itself.
    await waitFor(() => expect(screen.getAllByRole("gridcell").filter((c) => c.dataset.range)).toHaveLength(4));
    fireEvent.click(screen.getByRole("button", { name: "Oct 8, 2026" }));
    expect(screen.getByText("Tap an end date")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Oct 10, 2026" }));
    await waitFor(() => expect(screen.getAllByRole("gridcell").filter((c) => c.dataset.range === "mid")).toHaveLength(1));
  });

  it("keeps the picker input and ships touch and safe-area CSS", async () => {
    const { readFileSync, readdirSync } = await import("node:fs");
    const dir = `${process.cwd()}/src/styles`;
    const css = readdirSync(dir).map((f) => readFileSync(`${dir}/${f}`, "utf8")).join("\n");
    expect(css).toContain("env(safe-area-inset-bottom)");
    expect(css).toContain("100dvh");
    expect(css).toContain("touch-action: manipulation");
    expect(css).toContain("@media (hover: hover)");
    expect(css).toContain("@container (max-width: 461px)");
  });
});

describe("DSL v2 results", () => {
  const chipEl = (text: string) => screen.getAllByText(text).find((e) => e.classList.contains("td-chip"))!;
  const cells = (pred: (c: HTMLElement) => boolean) => screen.getAllByRole("gridcell").filter(pred).map((c) => c.textContent);

  it("open end date: fill runs to the end of the visible month", async () => {
    const { type } = setup(table({ a: "d 09-21>" }), { weekStart: 1 });
    type("a");
    await waitFor(() => expect(screen.getAllByRole("gridcell").some((c) => c.dataset.range === "start")).toBe(true));
    const filled = cells((c) => !!c.dataset.range);
    expect(filled[0]).toBe("21");
    expect(filled.at(-1)).toBe("30");
    expect(filled).toHaveLength(10);
    const last = screen.getAllByRole("gridcell").filter((c) => c.dataset.edge);
    expect(last.map((c) => c.dataset.edge)).toEqual(["end"]);
    expect(last[0]!.textContent).toBe("30");
    expect(chipEl("After Sep 21, 2026")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe("After Sep 21, 2026");
  });

  it("open start date: fill starts at the first day of the month", async () => {
    const { type } = setup(table({ a: "d >09-18" }), { weekStart: 1 });
    type("a");
    await waitFor(() => expect(screen.getAllByRole("gridcell").some((c) => c.dataset.range === "end")).toBe(true));
    const filled = cells((c) => !!c.dataset.range);
    expect(filled[0]).toBe("1");
    expect(filled.at(-1)).toBe("18");
    expect(screen.getAllByRole("gridcell").filter((c) => c.dataset.edge).map((c) => c.dataset.edge)).toEqual(["start"]);
    expect(chipEl("Before Sep 18, 2026")).toBeTruthy();
  });

  it("open range in another month fills the whole visible month", async () => {
    const { type } = setup(table({ a: "d 08-10>" }));
    type("a");
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-label")).toBe("August 2027"));
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-label")).toBe("September 2027"));
    expect(cells((c) => !!c.dataset.range)).toHaveLength(30);
  });

  it("open end time: highlights the list after the start and shows a chip", async () => {
    const { type } = setup(table({ a: "t 14:00>" }));
    type("a");
    await waitFor(() => expect(chipEl("After 2:00 PM")).toBeTruthy());
    expect(screen.getAllByRole("option", { selected: true })).toHaveLength(1);
    const inRange = screen.getAllByRole("option").filter((o) => o.hasAttribute("data-in")).map((o) => o.textContent);
    expect(inRange[0]).toBe("2:30 PM");
    expect(inRange.at(-1)).toBe("11:30 PM");
    expect(screen.queryByRole("grid")).toBeNull();
    expect(screen.queryByText("to")).toBeNull();
  });

  it("closed time range: colors every row from start to end", async () => {
    const { type } = setup(table({ a: "t 13:00>15:00" }));
    type("a");
    await waitFor(() => expect(screen.getAllByRole("option", { selected: true })).toHaveLength(2));
    const marks = screen.getAllByRole("option").filter((o) => o.hasAttribute("data-range")).map((o) => `${o.textContent}:${o.getAttribute("data-range")}`);
    expect(marks).toEqual(["1:00 PM:start", "1:30 PM:mid", "2:00 PM:mid", "2:30 PM:mid", "3:00 PM:end"]);
  });

  it("open start time: highlights the list before the end", async () => {
    const { type } = setup(table({ a: "t >12:00" }));
    type("a");
    await waitFor(() => expect(chipEl("Before 12:00 PM")).toBeTruthy());
    const inRange = screen.getAllByRole("option").filter((o) => o.hasAttribute("data-in")).map((o) => o.textContent);
    expect(inRange[0]).toBe("12:00 AM");
    expect(inRange.at(-1)).toBe("11:30 AM");
    expect(screen.getByRole("option", { name: "12:00 PM" }).getAttribute("aria-selected")).toBe("true");
  });

  it("open start with a date and time", async () => {
    const { type } = setup(table({ a: "dt >+0d 21:00" }));
    type("a");
    await waitFor(() => expect(chipEl("Before Sep 14, 2026 9:00 PM")).toBeTruthy());
    expect(screen.getByRole("grid")).toBeTruthy();
    expect(screen.getByRole("listbox")).toBeTruthy();
  });

  it("clicking a time on an open range edits the known side and keeps it open", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: "t >12:00", b: "t 14:00>" }), { onChange });
    type("a");
    await waitFor(() => expect(chipEl("Before 12:00 PM")).toBeTruthy());
    fireEvent.click(screen.getByRole("option", { name: "10:00 AM" }));
    expect(onChange.mock.calls.at(-1)![0]).toMatchObject({ open: "start", end: { time: "10:00" } });
    expect(onChange.mock.calls.at(-1)![0].start).toBeUndefined();
    type("b");
    await waitFor(() => expect(chipEl("After 2:00 PM")).toBeTruthy());
    fireEvent.click(screen.getByRole("option", { name: "4:00 PM" }));
    expect(onChange.mock.calls.at(-1)![0]).toMatchObject({ open: "end", start: { time: "16:00" } });
  });

  it("clicking a day on an open range moves its bound", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: "d 09-21>" }), { onChange });
    type("a");
    await waitFor(() => expect(chipEl("After Sep 21, 2026")).toBeTruthy());
    fireEvent.click(screen.getByRole("button", { name: "Sep 25, 2026" }));
    expect(onChange.mock.calls.at(-1)![0]).toMatchObject({ open: "end", start: { date: "2026-09-25" } });
    expect(onChange.mock.calls.at(-1)![0].end).toBeUndefined();
  });

  it("duration: shows start, end and the length", async () => {
    const { type } = setup(table({ a: "t 15:00>+2h" }));
    type("a");
    await waitFor(() => expect(screen.getByText("2 h")).toBeTruthy());
    expect(screen.getAllByRole("option", { selected: true }).map((o) => o.textContent)).toEqual(["3:00 PM", "5:00 PM"]);
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual(expect.arrayContaining(["3:00 PM", "5:00 PM"]));
    expect(screen.getByRole("status").textContent).toBe("3:00 PM to 5:00 PM (2 h)");
  });

  it("duration: minutes and mixed units, and the end date for dt", async () => {
    const { type } = setup(table({ a: "dt 09-21 09:00>+90m", b: "dt 09-21 23:00>+2h" }));
    type("a");
    await waitFor(() => expect(screen.getByText("1 h 30 min")).toBeTruthy());
    expect(screen.getByRole("status").textContent).toBe("Sep 21, 2026, 9:00 AM to 10:30 AM (1 h 30 min)");
    type("b");
    await waitFor(() => expect(screen.getByText("2 h")).toBeTruthy());
    expect(screen.getAllByRole("button", { name: "Sep 22, 2026" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("status").textContent).toContain("Sep 22, 2026 1:00 AM");
  });

  it("duration across midnight in time mode says the end is the next day", async () => {
    const { type } = setup(table({ a: "t 23:00>+2h" }));
    type("a");
    await waitFor(() => expect(screen.getByText("2 h, ends next day")).toBeTruthy());
    expect(Array.from(document.querySelectorAll(".td-field")).some((e) => e.textContent === "1:00 AM+1 day")).toBe(true);
  });

  it("duration: moving the start keeps the length", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: "t 15:00>+2h" }), { onChange });
    type("a");
    await waitFor(() => expect(screen.getByText("2 h")).toBeTruthy());
    fireEvent.click(screen.getByRole("option", { name: "10:30 AM" }));
    expect(onChange.mock.calls.at(-1)![0]).toMatchObject({ start: { time: "10:30" }, end: { time: "12:30" }, durationMin: 120 });
    fireEvent.click(screen.getByRole("option", { name: "11:00 PM" }));
    expect(onChange.mock.calls.at(-1)![0]).toMatchObject({ end: { time: "01:00" }, endNextDay: true });
  });

  it("duration: picking the end drops the length", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: "t 15:00>+2h" }), { onChange });
    type("a");
    await waitFor(() => expect(screen.getByText("2 h")).toBeTruthy());
    fireEvent.click(screen.getAllByRole("button").find((b) => b.textContent === "5:00 PM")!);
    fireEvent.click(screen.getByRole("option", { name: "6:00 PM" }));
    const last = onChange.mock.calls.at(-1)![0];
    expect(last.end.time).toBe("18:00");
    expect(last.durationMin).toBeUndefined();
  });

  it("day of month is a single date", async () => {
    const { type } = setup(table({ a: "d D@15" }));
    type("a");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Sep 15, 2026"));
    expect(screen.getAllByRole("gridcell").filter((c) => c.getAttribute("aria-selected") === "true")).toHaveLength(1);
    expect(screen.getAllByRole("gridcell").filter((c) => c.dataset.range && c.dataset.range !== "single")).toHaveLength(0);
  });

  it("business day offset and anchored offset are single dates", async () => {
    const { type } = setup(table({ a: "d +3b", b: "d 12-25~-3d" }));
    type("a");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Sep 17, 2026"));
    type("b");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Dec 22, 2026"));
  });

  it("quarter is a range", async () => {
    const { type } = setup(table({ a: "d Q+0" }));
    type("a");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Jul 1, 2026 to Sep 30, 2026"));
  });

  it("date list: several selected days, no range fill, count chip", async () => {
    const { type } = setup(table({ a: "d 09-16,09-18,09-25" }));
    type("a");
    await waitFor(() => expect(chipEl("3 dates")).toBeTruthy());
    const sel = screen.getAllByRole("gridcell").filter((c) => c.getAttribute("aria-selected") === "true");
    expect(sel.map((c) => c.textContent)).toEqual(["16", "18", "25"]);
    expect(sel.every((c) => !c.dataset.range)).toBe(true);
    expect(screen.getByRole("status").textContent).toBe("3 dates: Sep 16, Sep 18, Sep 25");
  });

  it("date list with a time shows the time list and keeps it on toggle", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: "dt 09-16,09-18 15:00" }), { onChange });
    type("a");
    await waitFor(() => expect(screen.getByRole("option", { name: "3:00 PM" }).getAttribute("aria-selected")).toBe("true"));
    fireEvent.click(screen.getByRole("button", { name: "Sep 25, 2026" }));
    expect(onChange.mock.calls.at(-1)![0]).toMatchObject({ kind: "list", dates: ["2026-09-16", "2026-09-18", "2026-09-25"], time: "15:00" });
    fireEvent.click(screen.getByRole("option", { name: "4:00 PM" }));
    expect(onChange.mock.calls.at(-1)![0]).toMatchObject({ kind: "list", time: "16:00" });
  });

  it("date list: tapping toggles days, and one left becomes a single date", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: "d 09-16,09-18" }), { onChange });
    type("a");
    await waitFor(() => expect(chipEl("2 dates")).toBeTruthy());
    fireEvent.click(screen.getByRole("button", { name: "Sep 18, 2026" }));
    expect(onChange.mock.calls.at(-1)![0]).toMatchObject({ kind: "single", start: { date: "2026-09-16" } });
  });

  it("recurrence with period bounds: dots in the bounded span and a bound note", async () => {
    const { type } = setup(table({ a: "d R w/1 tu uM@03 sM@03" }), { weekStart: 1 });
    type("a");
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-label")).toBe("March 2027"));
    const dots = screen.getAllByRole("gridcell").filter((c) => c.dataset.occ && !c.dataset.out).map((c) => c.textContent);
    expect(dots).toEqual(["2", "9", "16", "23", "30"]);
    expect(screen.getByText("Mar 1, 2027 - Mar 31, 2027")).toBeTruthy();
    expect(ruleText("FREQ=WEEKLY;BYDAY=TU;UNTIL=20270331")).toBeTruthy();
  });

  it("recurrence that started in the past shows dots in past months", async () => {
    const { type } = setup(table({ a: "d R w/1 mo,tu,we s-6w u-1w" }), { weekStart: 1 });
    type("a");
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-label")).toBe("August 2026"));
    expect(screen.getByText("Aug 3 - Sep 7")).toBeTruthy();
    const dots = screen.getAllByRole("gridcell").filter((c) => c.dataset.occ && !c.dataset.out).map((c) => c.textContent);
    expect(dots).toContain("4");
  });

  it("month filter: note and rule", async () => {
    const { type } = setup(table({ a: "d R d/1 mo,tu,we,th,fr M@08" }));
    type("a");
    await waitFor(() => expect(screen.getByText("Every August")).toBeTruthy());
    expect(ruleText("FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR;BYMONTH=8")).toBeTruthy();
  });

  it("selected days next to each other join into one block", async () => {
    const { type } = setup(table({ a: "d R d/1 mo,tu,we,th,fr" }), { weekStart: 0 });
    type("a");
    await waitFor(() => expect(screen.getAllByRole("gridcell").some((c) => c.dataset.join)).toBe(true));
    const cell = (date: string) => screen.getAllByRole("gridcell").find((c) => c.querySelector("button")?.dataset.date === date)!;
    // Wednesday Sep 23 2026: neighbors left and right (Tue, Thu) and above and below (Wed 16, Wed 30).
    expect(cell("2026-09-23").dataset.join).toBe("lrud");
    // Saturdays and Sundays are not selected and carry no join.
    expect(cell("2026-09-19").dataset.join).toBeUndefined();
  });

  it("nth list is described and exported", async () => {
    const { type } = setup(table({ a: "d R m/1 tu#1,tu#3" }));
    type("a");
    await waitFor(() => expect(ruleText("FREQ=MONTHLY;BYDAY=1TU,3TU")).toBeTruthy());
    expect(screen.getByRole("status").textContent).toBe("Every month on the 1st Tue, 3rd Tue");
  });

  it("recurrence time with a duration reads as a span", async () => {
    const { type } = setup(table({ a: "dt R d/1 09:30>+15m" }));
    type("a");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Every day at 9:30 - 9:45 AM"));
    expect(screen.getAllByRole("option", { selected: true })).toHaveLength(2);
  });
});

describe("recurrence rule", () => {
  it("is hidden unless showRule is set", async () => {
    const { type, container } = setup(table({ a: "d R w/2 su" }), { showRule: false });
    type("a");
    await waitFor(() => expect(container.querySelector(".td-root")?.getAttribute("data-kind")).toBe("recurrence"));
    expect(container.querySelector(".td-rrule")).toBeNull();
  });
});

describe("a time per weekday", () => {
  const dsl = "dt R w/1 tu@13:30,th@15:00";

  it("describes each weekday with its time and shows one chip per weekday", async () => {
    const { type } = setup(table({ a: dsl }));
    type("a");
    await waitFor(() => expect(screen.getAllByText("Every week on Tue at 1:30 PM, Thu at 3:00 PM").length).toBeGreaterThan(0));
    expect(screen.getByRole("button", { name: "Tue 1:30 PM" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Thu 3:00 PM" })).toBeTruthy();
  });

  it("changes only the chosen weekday when a time is picked", async () => {
    const onChange = vi.fn();
    const { type } = setup(table({ a: dsl }), { onChange });
    type("a");
    await waitFor(() => screen.getByRole("button", { name: "Thu 3:00 PM" }));
    fireEvent.click(screen.getByRole("button", { name: "Thu 3:00 PM" }));
    fireEvent.click(screen.getByRole("option", { name: "4:00 PM" }));
    const last = onChange.mock.calls.at(-1)![0];
    expect(last.recurrence.dayTimes).toEqual([
      { wd: "tu", start: "13:30" },
      { wd: "th", start: "16:00" },
    ]);
  });
});

describe("time zones", () => {
  it("shows the zone and the time in the user's zone when they differ", async () => {
    const { type } = setup(table({ a: "t 15:00 @America/New_York" }), { zone: "America/Los_Angeles" });
    type("a");
    await waitFor(() => expect(document.querySelector("[data-zone]")?.textContent).toBe("EDT"));
    expect(Array.from(document.querySelectorAll("[data-zone]")).map((e) => e.textContent)).toEqual(["EDT", "12:00 PM your time"]);
  });

  it("shows only the zone name when the zone is the user's", async () => {
    const { type } = setup(table({ a: "t 15:00 @America/New_York" }), { zone: "America/New_York" });
    type("a");
    await waitFor(() => expect(document.querySelector("[data-zone]")).toBeTruthy());
    expect(document.querySelectorAll("[data-zone]").length).toBe(1);
  });

  it("names a fixed offset and converts it, marking a change of day", async () => {
    const { type } = setup(table({ a: "t 17:00 @+05:30", b: "t 23:00 @America/Los_Angeles" }), { zone: "America/New_York" });
    type("a");
    await waitFor(() => expect(Array.from(document.querySelectorAll("[data-zone]")).map((e) => e.textContent)).toEqual(["UTC+5:30", "7:30 AM your time"]));
    type("b");
    await waitFor(() => expect(Array.from(document.querySelectorAll("[data-zone]")).map((e) => e.textContent).join("|")).toContain("(+1 day) your time"));
  });

  it("shows no zone chip when the text names none", async () => {
    const { type } = setup(table({ a: "t 15:00" }), { zone: "America/New_York" });
    type("a");
    await waitFor(() => expect(screen.getAllByText("3:00 PM").length).toBeGreaterThan(0));
    expect(document.querySelector("[data-zone]")).toBeNull();
  });
});

describe("clear button", () => {
  it("is hidden when empty and clears the text and result in one tap", async () => {
    const onClear = vi.fn();
    const { input, type, root } = setup(table({ c: "d 09-21" }), { onClear });
    const btn = root.querySelector<HTMLButtonElement>(".td-clear")!;
    expect(btn.hidden).toBe(true);
    type("c");
    await waitFor(() => expect(root.dataset.kind).not.toBe("none"));
    expect(btn.hidden).toBe(false);
    fireEvent.click(btn);
    expect(input.value).toBe("");
    expect(root.dataset.kind).toBe("none");
    expect(btn.hidden).toBe(true);
    expect(document.activeElement).toBe(input);
    expect(onClear).toHaveBeenCalled();
  });
});

describe("recurrence text", () => {
  it("names weekday, weekend and every-day sets", async () => {
    const { describeRecurrence } = await import("../src/dates");
    const base = { freq: "w" as const, interval: 1, dtstart: "2026-09-14", time: { start: "09:00" } };
    expect(describeRecurrence({ ...base, days: ["mo", "tu", "we", "th", "fr"] })).toBe("Every weekday at 9:00 AM");
    expect(describeRecurrence({ ...base, days: ["sa", "su"] })).toBe("Every weekend at 9:00 AM");
    expect(describeRecurrence({ ...base, freq: "d", days: ["su", "mo", "tu", "we", "th", "fr", "sa"] })).toBe("Every day at 9:00 AM");
    expect(describeRecurrence({ ...base, days: ["mo", "we"] })).toBe("Every week on Mon, Wed at 9:00 AM");
    expect(describeRecurrence({ ...base, interval: 2, days: ["mo", "tu", "we", "th", "fr"] })).toBe("Every 2 weeks on Mon, Tue, Wed, Thu, Fri at 9:00 AM");
  });
});

describe("calendar on phones", () => {
  it("drops trailing weeks with no day of the month when trimmed", async () => {
    const { Calendar } = await import("../src/Calendar");
    const sel = { lo: null, hi: null, occ: new Set<string>() };
    const props = { dir: 0 as const, sel, today: TODAY, weekStart: 1 as const, onView: () => {}, onPick: () => {}, onRange: () => {} };
    // September 2026 starts on a Tuesday: 5 weeks hold its days (Mon Aug 31 to Sun Oct 4).
    const weeks = (trim: boolean) => {
      const { container, unmount } = render(<Calendar {...props} view={{ y: 2026, m: 9 }} trim={trim} />);
      const n = container.querySelectorAll(".td-weeks [role=row]").length;
      unmount();
      return n;
    };
    expect(weeks(false)).toBe(6);
    expect(weeks(true)).toBe(5);
  });

  it("changes month on a horizontal touch swipe", async () => {
    const { Calendar } = await import("../src/Calendar");
    const onView = vi.fn();
    const sel = { lo: null, hi: null, occ: new Set<string>() };
    const { container } = render(
      <Calendar dir={0} sel={sel} today={TODAY} weekStart={1} view={{ y: 2026, m: 9 }} onView={onView} onPick={() => {}} onRange={() => {}} />,
    );
    const weeks = container.querySelector(".td-weeks")!;
    // jsdom has no PointerEvent; a MouseEvent with the pointer fields is enough for React.
    if (typeof window.PointerEvent === "undefined") {
      class PE extends MouseEvent {
        pointerId: number;
        pointerType: string;
        isPrimary: boolean;
        constructor(type: string, init: PointerEventInit = {}) {
          super(type, init);
          this.pointerId = init.pointerId ?? 0;
          this.pointerType = init.pointerType ?? "";
          this.isPrimary = init.isPrimary ?? false;
        }
      }
      vi.stubGlobal("PointerEvent", PE);
    }
    const swipe = (x0: number, x1: number, y1 = 100) => {
      fireEvent.pointerDown(weeks, { pointerType: "touch", isPrimary: true, pointerId: 1, clientX: x0, clientY: 100 });
      fireEvent.pointerUp(weeks, { pointerType: "touch", isPrimary: true, pointerId: 1, clientX: x1, clientY: y1 });
    };
    swipe(300, 200);
    expect(onView).toHaveBeenLastCalledWith({ y: 2026, m: 10 });
    swipe(100, 200);
    expect(onView).toHaveBeenLastCalledWith({ y: 2026, m: 8 });
    onView.mockClear();
    swipe(100, 120); // too short
    swipe(100, 160, 220); // mostly vertical
    expect(onView).not.toHaveBeenCalled();
  });
});

describe("soft keyboard scroll", () => {
  function stubViewport(coarse: boolean) {
    const vv = Object.assign(new EventTarget(), { width: 400, height: 800 });
    vi.stubGlobal("visualViewport", vv);
    // The picker is narrow by its own width (useNarrow), not the window's: give it a phone-sized layout box.
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ width: 360, height: 600 } as DOMRect);
    vi.stubGlobal("matchMedia", (q: string) => ({
      matches: q.includes("coarse") ? coarse : false,
      addEventListener() {},
      removeEventListener() {},
    }));
    const resize = (w: number, h: number) => {
      vv.width = w;
      vv.height = h;
      vv.dispatchEvent(new Event("resize"));
    };
    return resize;
  }
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("scrolls the picker into view when the keyboard opens on a touch phone", () => {
    const resize = stubViewport(true);
    const { input, root } = setup(table({}));
    const spy = vi.fn();
    root.scrollIntoView = spy;
    input.focus();
    resize(400, 450);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("does not scroll on a window resize, even below phone width with the input focused", () => {
    const resize = stubViewport(false);
    const { input, root } = setup(table({}));
    const spy = vi.fn();
    root.scrollIntoView = spy;
    input.focus();
    resize(380, 800);
    resize(380, 600);
    resize(1200, 800);
    expect(spy).not.toHaveBeenCalled();
  });
});
