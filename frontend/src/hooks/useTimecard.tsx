import { useEffect, useState } from "react";
import {
  API_HOST,
  TimecardData,
  User,
  initialTimeCard,
} from "../common/models";
import { useNavigate } from "react-router";
import { getApiHeaders } from "../common/lib";
import { workerData } from "worker_threads";

export function useTimecard() {
  const nav = useNavigate();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timecard, setTimeCard] = useState<TimecardData>(initialTimeCard);
  const [user, setUser] = useState<User>();

  async function onClockWorkIn() {
    const headers = getApiHeaders();
    const res = await fetch(API_HOST + "timecard/workin", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ attendanceId: timecard.id }),
    });
    const data = await res.json();
    const result = data["result"];
    setTimeCard({ ...timecard, workIn: new Date(result["workIn"]) });
  }

  async function onClockWorkOut() {
    const headers = getApiHeaders();
    const res = await fetch(API_HOST + "timecard/workout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ attendanceId: timecard.id }),
    });
    const data = await res.json();
    const result = data["result"];
    setTimeCard({ ...timecard, workOut: new Date(result["workOut"]) });
  }

  async function onClockBreakIn() {
    const breakIns = timecard.breakIn;
    breakIns.push(new Date());
    setTimeCard({ ...timecard, breakIn: breakIns });
  }
  async function onClockBreakOut() {
    const breakOuts = timecard.breakOut;
    breakOuts.push(new Date());
    setTimeCard({ ...timecard, breakOut: breakOuts });
  }

  async function LogOut() {
    // TODO
    localStorage.clear();
    nav("/login");
  }

  useEffect(() => {
    const headers = getApiHeaders();
    (async () => {
      // Get Timecard info.
      const res = await fetch(
        API_HOST + "timecard?date=" + new Date().toLocaleDateString(),
        {
          headers: headers,
        }
      );
      const data = await res.json();
      setTimeCard(data["timecard"] as TimecardData);

      // Set user info.
      const strage = JSON.parse(localStorage.getItem("user") as string) as User;
      if (strage == null) {
        nav("/login");
        return;
      }

      setUser(strage);

      // Set Time.
      setInterval(() => setCurrentTime(new Date()), 5000);
    })();
  }, []);

  return {
    user,
    timecard,
    currentTime,
    onClockWorkIn,
    onClockWorkOut,
    onClockBreakIn,
    onClockBreakOut,
    LogOut,
  };
}
