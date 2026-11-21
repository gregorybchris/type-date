import { describe, expect, it } from "vitest";
import { inUserZone, zoneLabel, zoneOffsetMin, zonedInstant } from "../src/dates";

describe("zone helpers", () => {
  it("finds offsets, with daylight saving", () => {
    expect(zoneOffsetMin("America/Los_Angeles", new Date("2026-01-15T12:00:00Z"))).toBe(-480);
    expect(zoneOffsetMin("America/Los_Angeles", new Date("2026-07-15T12:00:00Z"))).toBe(-420);
    expect(zoneOffsetMin("Asia/Kolkata", new Date("2026-07-15T12:00:00Z"))).toBe(330);
    expect(zoneOffsetMin("+05:30", new Date())).toBe(330);
    expect(zoneOffsetMin("-08:00", new Date())).toBe(-480);
    expect(zoneOffsetMin("UTC", new Date())).toBe(0);
    expect(zoneOffsetMin("Nowhere/Land", new Date())).toBeNull();
  });
  it("turns a wall-clock time in a zone into an instant", () => {
    expect(zonedInstant("2026-11-04", "09:00", "America/Los_Angeles")?.toISOString()).toBe("2026-11-04T17:00:00.000Z");
    expect(zonedInstant("2026-07-04", "09:00", "America/Los_Angeles")?.toISOString()).toBe("2026-07-04T16:00:00.000Z");
    expect(zonedInstant("2026-11-04", "17:00", "+05:30")?.toISOString()).toBe("2026-11-04T11:30:00.000Z");
  });
  it("shows a time in the user's zone, across a day change", () => {
    expect(inUserZone("2026-11-04", "09:00", "America/Los_Angeles", "Europe/London")).toEqual({ date: "2026-11-04", time: "17:00" });
    expect(inUserZone("2026-11-04", "22:00", "America/Los_Angeles", "UTC")).toEqual({ date: "2026-11-05", time: "06:00" });
    expect(inUserZone("2026-11-04", "01:00", "Asia/Tokyo", "America/New_York")).toEqual({ date: "2026-11-03", time: "11:00" });
    expect(inUserZone("2026-11-04", "09:00", "Nowhere/Land", "UTC")).toBeNull();
  });
  it("labels zones", () => {
    expect(zoneLabel("America/Los_Angeles", "2026-01-15")).toBe("PST");
    expect(zoneLabel("America/Los_Angeles", "2026-07-15")).toBe("PDT");
    expect(zoneLabel("UTC")).toBe("UTC");
    expect(zoneLabel("+05:30")).toBe("UTC+5:30");
    expect(zoneLabel("-08:00")).toBe("UTC-8");
    expect(zoneLabel("Asia/Kolkata", "2026-07-15")).toBe("UTC+5:30");
    expect(zoneLabel("Asia/Tokyo", "2026-07-15")).toBe("UTC+9");
  });
});
