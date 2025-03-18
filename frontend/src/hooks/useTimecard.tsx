import { useEffect, useState } from "react";
import {
  API_HOST,
  TimecardData,
  User,
  initialTimeCard,
} from "../common/models";
import { useNavigate } from "react-router";
import { getApiHeaders } from "../common/lib";

export function useTimecard() {
  const nav = useNavigate();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timecard, setTimeCard] = useState<TimecardData>(initialTimeCard);
  const [user, setUser] = useState<User>();

  /**
   * Post work in.
   */
  async function onClickWorkIn() {
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

  /**
   * Post work out.
   */
  async function onClickWorkOut() {
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

  /**
   * Post break in.
   */
  async function onClickBreakIn() {
    const headers = getApiHeaders();
    const res = await fetch(API_HOST + "timecard/breakin", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ attendanceId: timecard.id }),
    });
    setTimeCard({ ...timecard, breakIn: new Date() });
  }

  /**
   * Post work out.
   */
  async function onClickBreakOut() {
    const headers = getApiHeaders();
    const res = await fetch(API_HOST + "timecard/breakout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ attendanceId: timecard.id }),
    });
    setTimeCard({ ...timecard, breakOut: new Date() });
  }

  useEffect(() => {
    const headers = getApiHeaders();
    // Set user info.
    const strage = JSON.parse(localStorage.getItem("user") as string) as User;
    if (strage == null) {
      nav("/login");
      return;
    }
    setUser(strage);

    // Set Time.
    setInterval(() => setCurrentTime(new Date()), 5000);

    (async () => {
      // Get Timecard info.
      const res = await fetch(
        API_HOST + "timecard?date=" + new Date().toLocaleDateString(),
        {
          headers: headers,
        }
      );
      if (res.status !== 200) {
        alert("Fetch error.");
        return;
      }
      const data = await res.json();

      setTimeCard(data["timecard"] as TimecardData);
    })();
  }, []);

  return {
    user,
    timecard,
    currentTime,
    onClickWorkIn,
    onClickWorkOut,
    onClickBreakIn,
    onClickBreakOut,
  };
}
