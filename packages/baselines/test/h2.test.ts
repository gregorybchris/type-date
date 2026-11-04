import { describe, expect, it } from "vitest";
import { h2, parseH1, parseH2 } from "../src";

// Everything h1 handles must still work, plus the new phrasings.
const same = ["oct 2 to oct 5", "last friday", "every other sunday", "4 to 4:30", "tomorrow at 3pm", "next monday 9am to 5pm", "in 2 weeks", "first monday of march", "monthly on the 15th", "from 2pm tomorrow to 4pm friday", "every other friday until dec 31", "labor day", "nextwednesday2Pm", "decenber 16", "oct 2 t", "every tu", "asdf"];

const cases: [string, string][] = [
  ["can we do three in the afternoon", "t 15:00"],
  ["lets do tomorrow at 3pm", "dt +1d 15:00"],
  ["roughly 5pm", "t 17:00"],
  ["seven oh five am", "t 07:05"],
  ["from 5 until 5 30", "t 5?>5:30?"],
  ["sundays 1 40 ending may 31st", "dt R w/1 su u05-31 1:40?"],
  ["1.15-6.15", "t 1:15?>6:15?"],
  ["2.30 to 5.30pm", "t 14:30>17:30"],
  ["26th sep 4.30 in the arvo", "dt 09-26 16:30"],
  ["tmrw at 3 in the pm", "dt +1d 15:00"],
  ["quarter past two", "t 2:15?"],
  ["final sunday of october", "d su#-1@10"],
  ["apr last sun", "d su#-1@04"],
  ["sunday 3 in august", "d su#3@08"],
  ["2nd frid in aug", "d fr#2@08"],
  ["christmas day 2031", "d 2031-12-25"],
  ["the week coming", "d W+1"],
  ["sat coming", "d sa"],
  ["6 weeks time", "d +6w"],
  ["6 days prior", "d -6d"],
  ["yest through nxt weds", "d -1d>we+1"],
  ["every 2nd week", "d R w/2"],
  ["each quarter the 25th", "d R m/3 d25"],
  ["3wkly mondays x3", "d R w/3 mo n3"],
  ["bimonthly 28th until 24 nov", "d R m/2 d28 u11-24"],
  ["month end every month 6:30pm", "dt R m/1 d-1 18:30"],
  ["march 5 every year", "d R y/1 03-05"],
  ["from 6th may every 3 wks", "d R w/3 s05-06"],
  ["every mon, thu & sun", "d R w/1 mo,th,su"],
  ["mon to fri until 25 may", "d R d/1 mo,tu,we,th,fr u05-25"],
  ["every 3rd weds monthly 17:45 to 18:00", "dt R m/1 we#3 17:45>18:00"],
  ["Wednesddays at 14:15 until 18th april", "dt R w/1 we u04-18 14:15"],
  ["wensday", "d we"],
];

describe("h2", () => {
  for (const t of same) it(`keeps ${t}`, () => expect(parseH2(t)).toBe(parseH1(t)));
  for (const [text, dsl] of cases) it(`${text} -> ${dsl}`, () => expect(parseH2(text)).toBe(dsl));
  it("implements the Engine interface", async () => {
    await h2.load({ baseUrl: "" });
    expect((await h2.predict("Oct   2")).dsl).toBe("d 10-02");
  });
});
