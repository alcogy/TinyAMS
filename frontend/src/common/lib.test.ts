import { weekOfDay, getDayClass, getTimeString, getFormatDate } from "./lib";

test("Get week of day string", () => {
  expect(weekOfDay(0)).toMatch("Sun.");
  expect(weekOfDay(1)).toMatch("Mon.");
  expect(weekOfDay(2)).toMatch("Tue.");
  expect(weekOfDay(3)).toMatch("Wed.");
  expect(weekOfDay(4)).toMatch("Thu.");
  expect(weekOfDay(5)).toMatch("Fri.");
  expect(weekOfDay(6)).toMatch("Sat.");
  expect(weekOfDay(7)).toMatch("");
  expect(weekOfDay(-1)).toMatch("");
  expect(weekOfDay(1.1)).toMatch("");
});

test("Get day class string", () => {
  expect(getDayClass(new Date("2025-03-01"))).toMatch("text-blue-800");
  expect(getDayClass(new Date("2025-03-02"))).toMatch("text-red-500");
  expect(getDayClass(new Date("2025-03-03"))).toMatch("");
});

test("Format Time string", () => {
  expect(getTimeString(new Date("2025-03-01T02:00:00"))).toMatch("02:00");
  expect(getTimeString(new Date("2025-03-02T19:23:00"))).toMatch("19:23");
  expect(getTimeString(null)).toMatch("");
});

test("Format Date string", () => {
  expect(getFormatDate(new Date("2025-03-01T02:00:00"))).toMatch("3/1");
  expect(getFormatDate(new Date("2025-03-02T19:23:00"))).toMatch("3/2");
});
