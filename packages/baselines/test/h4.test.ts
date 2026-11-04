import { describe, expect, it } from "vitest";
import { h4, parseH3, parseH4 } from "../src";

// Short phrases h3 handles must not change.
const same = ["oct 2 to oct 5", "last friday", "every other sunday", "tomorrow at 3pm", "next monday 9am to 5pm", "in 2 weeks", "first monday of march", "monthly on the 15th", "pls book fri 3pm", "tonight at 11", "7a to 3p", "buy milk", "mondays are the worst", "5 stars", "room 214 b"];

const cases: [string, string][] = [
  // dates and times in pasted messages
  ["Wedding: Emily & Jacob, Saturday October 9, 2027, ceremony at 4:00 in the afternoon", "dt 2027-10-09 16:00"],
  ["Estimated delivery date: Monday, November 23rd, 2026 by 8pm", "dt 2026-11-23 20:00"],
  ["Swim meet Saturday, Oct 31, warmups 7:30 AM, first event 8:15 AM", "d 10-31"],
  ["Kindergarten field trip: Wednesday, May 6, depart 9:15 AM, return 1:30 PM", "dt 05-06 09:15>13:30"],
  ["Seat reservation: Coach 6, Seat 41, Amtrak 177, Tue 11/17, dep 2:15p arr 5:48p", "dt 11-17 14:15>17:48"],
  ["Rental confirmation #R-55031: pickup 12/22/26 8:00 AM, dropoff 1/3/27 8:00 AM", "dt 2026-12-22 08:00>2027-01-03 08:00"],
  ["Hotel: arrival Thu 4/16/26, departure Sun 4/19/26, 3 nights", "d 2026-04-16>2026-04-19"],
  ["Thank you for your RSVP! See you at Camp Willow, July 10 - 12, 2026", "d 2026-07-10>2026-07-12"],
  ["Doc appt moved 2 weeks out to Fri 11/20 at 10:15, same office", "dt 11-20 10:15?"],
  ["Please note new pickup time: 3:05 PM instead of 3:15, effective Mon, Oct 6", "dt 10-06 15:05"],
  // not dates
  ["Contact the church office at 555-0142 or email office@stmarks.example for questions", "x"],
  ["pick up at gate 5", "x"],
  ["Booking cancelled. A refund of $142.50 will post in 5-7 business days.", "x"],
  ["Winter break, everyone: enjoy the rest, and see you in the new year", "x"],
  // recurrences
  ["Saturdays 10-11 a.m., June 6 through July 25", "dt R w/1 sa u07-25 10:00>11:00 s06-06"],
  ["Fish fry every Friday during Lent (Feb 18 - Apr 3), 4:30 PM until 7:30 PM", "dt R w/1 fr u04-03 16:30>19:30 s02-18"],
  ["mon wed fri for 4 weeks", "d R w/1 mo,we,fr n12"],
  ["tuesdays at 7 for the next 8 weeks", "dt R w/1 tu n8 7?"],
  ["daily except sundays at 6 am", "dt R d/1 mo,tu,we,th,fr,sa 06:00"],
  ["m/w/f 7a-9a", "dt R w/1 mo,we,fr 07:00>09:00"],
  ["tu+th 2:30p", "dt R w/1 tu,th 14:30"],
  ["each 15th and 30th", "d R m/1 d15,d30"],
  ["weekends only, 10 to noon", "dt R w/1 sa,su 10?>12:00"],
  ["Meeting of the finance committee, 4th Thursday, 5:15 PM (or as called by the chair)", "dt R m/1 th#4 17:15"],
  ["Daily devotional hour 6:00-7:00 AM Monday through Friday in the prayer room", "dt R d/1 mo,tu,we,th,fr 06:00>07:00"],
  // calendar phrases
  ["a week from tomorrow", "d +8d"],
  ["friday after next", "d fr+2"],
  ["monday of next week at 7:05", "dt mo+1 7:05?"],
  ["fri the 13th", "d 11-13"],
  ["the day before christmas eve", "d 12-23"],
  ["two days after the 1st of december", "d 12-03"],
  ["a quarter to midnight", "t 23:45"],
  ["ten past noon", "t 12:10"],
  ["half past noon friday", "dt fr 12:30"],
  ["after work tues", "d tu"],
  ["until noon", "t 12:00"],
];

describe("h4", () => {
  for (const t of same) it(`keeps ${t}`, () => expect(parseH4(t)).toBe(parseH3(t)));
  for (const [text, dsl] of cases) it(`${text} -> ${dsl}`, () => expect(parseH4(text)).toBe(dsl));
  it("uses the reference day for phrases that need the calendar", () => {
    expect(parseH4("fri the 13th", "2026-11-03")).toBe("d 11-13");
    expect(parseH4("the 10th of next month", "2026-11-03")).toBe("d 12-10");
  });
  it("implements the Engine interface", async () => {
    await h4.load({ baseUrl: "" });
    expect((await h4.predict("Oct   2")).dsl).toBe("d 10-02");
  });
});
