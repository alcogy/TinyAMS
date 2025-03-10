export function getRangeMonthStartEnd(date?: Date): [Date, Date] {
  const getDate = date || new Date();
  const fromDate = new Date(getDate.getFullYear(), getDate.getMonth(), 1);
  const endDate = new Date(getDate.getFullYear(), getDate.getMonth() + 1, 0);

  return [fromDate, endDate];
}

export function genMonthDateList(date: Date): Date[] {
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const end = endDate.getDate();
  const result: Date[] = [];
  for (let i = 1; i <= end; i++) {
    result.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return result;
}
