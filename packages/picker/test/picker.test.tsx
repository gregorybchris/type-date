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
    await waitFor(() => expect(screen.getByRole("grid")).toBeTruthy());
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
