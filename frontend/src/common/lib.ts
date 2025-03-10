export function weekOfDay(day: number): string {
  switch (day) {
    case 0:
      return "Sun.";
    case 1:
      return "Mon.";
    case 2:
      return "Tue.";
    case 3:
      return "Wed.";
    case 4:
      return "Thu.";
    case 5:
      return "Fri.";
    case 6:
      return "Sat.";
  }
  return "";
}

export function getDayClass(date: Date): string {
  const day = date.getDay();

  if (day === 0) return "text-red-500";
  if (day === 6) return "text-blue-800";

  return "";
}

export function getTimeString(datetime: Date | null): string {
  if (datetime === null) return "";
  return `${datetime.getHours().toString().padStart(2, "0")}:${datetime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function getFormatDate(datetime: Date): string {
  return `${datetime.getMonth() + 1}/${datetime.getDate()} ${weekOfDay(
    datetime.getDay()
  )}`;
}

export function getApiHeaders() {
  return {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  };
}
