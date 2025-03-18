import { useEffect, useState } from "react";
import { API_HOST, Attendance, User } from "../common/models";

export function useDetail() {
  const [targetMonth, setTargetMonth] = useState<Date>(new Date());
  const [list, setList] = useState<Attendance[]>([]);
  const [user, setUser] = useState<User>();
  const [changed, setChanged] = useState<boolean>(false);

  /**
   * Event Handler for changing to next month.
   */
  function nextTargetDate() {
    changeTargetDate(targetMonth.getMonth() + 1);
  }

  /**
   * Event Handler for changing to last month.
   */
  function prevTargetDate() {
    changeTargetDate(targetMonth.getMonth() - 1);
  }

  /**
   * Change month to target month.
   */
  function changeTargetDate(month: number) {
    const d = new Date(targetMonth.getFullYear(), month, 1);
    setTargetMonth(d);
  }

  /**
   * Fetching Data;
   * @returns
   */
  async function fetchData() {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${API_HOST}detail/${targetMonth.getFullYear()}-${
        targetMonth.getMonth() + 1
      }-1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.status !== 200) {
      return;
    }
    const data = (await res.json()) as Attendance[];

    const attendances: Attendance[] = [];
    const end = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth() + 1,
      0
    );

    for (let i = 1; i <= end.getDate(); i++) {
      const d = new Date(
        `${end.getFullYear()}-${(
          end.getMonth() + 1
        ).toString()}-${i.toString()}`
      );
      const timecard = data.find((v) => new Date(v.date).getDate() === i);
      attendances.push({
        id: timecard ? timecard.id : 0,
        date: d,
        workIn: timecard?.workIn || null,
        workOut: timecard?.workOut || null,
        breakIn: timecard?.breakIn || null,
        breakOut: timecard?.breakOut || null,
        workingHours: timecard ? calcWorkingHours(timecard) : 0,
        remark: timecard?.remark || "",
      });
    }

    setList(attendances);
  }

  /**
   * Calcuration working hours.
   * @param timecard
   * @returns
   */
  function calcWorkingHours(timecard: Attendance): number {
    let dif = 0;
    if (timecard.workIn === null || timecard.workOut === null) return 0;
    if (timecard.breakIn !== null && timecard.breakOut === null) return 0;
    const workIn = new Date(timecard.workIn).getTime();
    const workOut = new Date(timecard.workOut).getTime();
    dif = workOut - workIn;

    if (timecard.breakIn !== null && timecard.breakOut !== null) {
      const breakIn = new Date(timecard.breakIn).getTime();
      const breakOut = new Date(timecard.breakOut).getTime();
      dif = dif - (breakOut - breakIn);
    }
    dif = dif / 1000 / 60 / 60;
    return dif;
  }

  /**
   * Chaning list data.
   * @param index
   * @param data
   */
  function onChangeData(index: number, data: Attendance) {
    const s = [...list];
    s[index] = { ...data };
    s[index].workingHours = calcWorkingHours(s[index]);
    setList(s);
    setChanged(true);
  }

  /**
   * Blur from input.
   * @param index
   * @returns
   */
  async function onBlur(index: number) {
    if (!changed) return;

    const token = localStorage.getItem("token");
    const res = await fetch(API_HOST + "detail/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ data: list[index] }),
    });
    setChanged(false);

    if (list[index].id !== 0) return;
    const data = await res.json();
    const s = [...list];
    s[index].id = data["id"];
    setList(s);
  }

  /**
   * Formatting Time string.
   * @param date
   * @param time
   * @returns
   */
  function genTimeFormat(date: Date, time: string): Date | null {
    if (time === "") return null;
    const [h, m] = time.split(":");
    const d = new Date(date);
    d.setHours(Number(h));
    d.setMinutes(Number(m));

    return d;
  }

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString !== null) setUser(JSON.parse(userString) as User);
    const run = async () => await fetchData();
    run();
  }, []);

  useEffect(() => {
    if (user === undefined) return;
    const run = async () => await fetchData();
    run();
  }, [targetMonth]);

  return {
    targetMonth,
    list,
    nextTargetDate,
    prevTargetDate,
    onChangeData,
    onBlur,
    genTimeFormat,
  };
}
