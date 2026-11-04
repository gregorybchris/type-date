import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TypeDatePicker } from "../src";
import type { TypeDatePickerProps } from "../src";

afterEach(cleanup);

const TODAY = "2026-09-14";
const DB = 5;

function setup(parse: TypeDatePickerProps["parse"], extra: Partial<TypeDatePickerProps> = {}) {
  const utils = render(<TypeDatePicker parse={parse} today={TODAY} debounceMs={DB} {...extra} />);
  const input = screen.getByLabelText("Date and time") as HTMLInputElement;
  const type = (v: string) => fireEvent.change(input, { target: { value: v } });
  return { ...utils, input, type, root: utils.container.querySelector(".td-root") as HTMLElement };
}
const table = (m: Record<string, string>) => async (t: string) => m[t] ?? "x";

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

  it("renders a time range with two selected options", async () => {
    const { type } = setup(table({ t: "t 4?>4:30?" }));
    type("t");
    await waitFor(() => expect(screen.getAllByRole("option", { selected: true })).toHaveLength(2));
    expect(screen.getByText("Assumed")).toBeTruthy();
  });

  it("marks recurrence occurrences and shows the rule", async () => {
    const { type } = setup(table({ e: "d R w/2 su" }), { weekStart: 1 });
    type("e");
    await waitFor(() => expect(screen.getByText("FREQ=WEEKLY;INTERVAL=2;BYDAY=SU")).toBeTruthy());
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
    const { readFileSync } = await import("node:fs");
    const css = readFileSync(`${process.cwd()}/src/styles.css`, "utf8");
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
    expect(screen.getByText("1:00 AM (+1 day)")).toBeTruthy();
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
    expect(screen.getByText("FREQ=WEEKLY;BYDAY=TU;UNTIL=20270331")).toBeTruthy();
  });

  it("recurrence that started in the past shows dots in past months", async () => {
    const { type } = setup(table({ a: "d R w/1 mo,tu,we s-6w u-1w" }), { weekStart: 1 });
    type("a");
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-label")).toBe("August 2026"));
    expect(screen.getByText("Aug 3 - Sep 7")).toBeTruthy();
    const dots = screen.getAllByRole("gridcell").filter((c) => c.dataset.occ && !c.dataset.out).map((c) => c.textContent);
    expect(dots).toContain("4");
    expect(screen.getByText(/^Last/)).toBeTruthy();
  });

  it("month filter: note and next occurrences", async () => {
    const { type } = setup(table({ a: "d R d/1 mo,tu,we,th,fr M@08" }));
    type("a");
    await waitFor(() => expect(screen.getByText("Every August")).toBeTruthy());
    expect(screen.getByText("FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR;BYMONTH=8")).toBeTruthy();
    expect(screen.getByText("Next Aug 2 · Aug 3 · Aug 4")).toBeTruthy();
  });

  it("nth list is described and exported", async () => {
    const { type } = setup(table({ a: "d R m/1 tu#1,tu#3" }));
    type("a");
    await waitFor(() => expect(screen.getByText("FREQ=MONTHLY;BYDAY=1TU,3TU")).toBeTruthy());
    expect(screen.getByRole("status").textContent).toBe("Every month on the 1st Tue, 3rd Tue");
  });

  it("recurrence time with a duration reads as a span", async () => {
    const { type } = setup(table({ a: "dt R d/1 09:30>+15m" }));
    type("a");
    await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Every day at 9:30 - 9:45 AM"));
    expect(screen.getAllByRole("option", { selected: true })).toHaveLength(2);
  });
});
