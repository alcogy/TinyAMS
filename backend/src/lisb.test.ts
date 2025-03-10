import { genMonthDateList, getRangeMonthStartEnd } from "./lib";

test("Date from/to in march 2025", async () => {
  const date = new Date("2025-03-14");
  const [from, to] = getRangeMonthStartEnd(date);
  expect(from.toLocaleDateString()).toBe(
    new Date("2025-03-01").toLocaleDateString()
  );
  expect(to.toLocaleDateString()).toBe(
    new Date("2025-03-31").toLocaleDateString()
  );
});

test("Date from/to in feb 2025", async () => {
  const date = new Date("2025-02-02");
  const [from, to] = getRangeMonthStartEnd(date);
  expect(from.toLocaleDateString()).toBe(
    new Date("2025-02-01").toLocaleDateString()
  );
  expect(to.toLocaleDateString()).toBe(
    new Date("2025-02-28").toLocaleDateString()
  );
});

test("Date list in march 2025", async () => {
  const date = new Date("2025-03-14");
  const result = await genMonthDateList(date);
  expect(result.length).toBe(31);
});

test("Date list in feb 2025", async () => {
  const date = new Date("2025-02-01");
  const result = await genMonthDateList(date);
  expect(result.length).toBe(28);
});
