import { useEffect, useState } from "react";
import Button from "../components/timecard/Button";
import { getDayClass, weekOfDay } from "../common/lib";
import { TimecardData, User, initialTimeCard } from "../common/models";
import { useNavigate } from "react-router";

export default function Timecard() {
  const nav = useNavigate();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timecard, setTimeCard] = useState<TimecardData>(initialTimeCard);
  const [user, setUser] = useState<User>();

  async function onClockWorkIn() {
    setTimeCard({ ...timecard, workIn: new Date() });
  }
  async function onClockWorkOut() {
    setTimeCard({ ...timecard, workOut: new Date() });
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
    localStorage.removeItem("user");
    nav("/login");
  }

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 5000);
    // TODO
    const strage = JSON.parse(localStorage.getItem("user") as string) as User;
    if (strage == null) {
      nav("/login");
      return;
    }
    setUser(strage);
  }, []);

  return (
    <>
      <header className="flex justify-between h-14 px-5 items-center bg-sky-600">
        <div>
          <h1 className="text-white text-xl font-bold">Bushmills</h1>
        </div>
        <div className="flex gap-5 items-center">
          <p className="text-white text-sm text-right">
            {user?.name} ({user?.id})
          </p>
          <button
            className="bg-gray-200 px-2 py-1 rounded-md font-bold hover:bg-gray-100"
            onClick={LogOut}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-5 flex items-center flex-col gap-24 mt-12">
        <div className="text-center">
          <p className={`${getDayClass(currentTime)}`}>
            <span className="text-2xl">{currentTime.toLocaleDateString()}</span>
            <span className="text-sm ml-2">
              ({currentTime && weekOfDay(currentTime?.getDay())})
            </span>
          </p>
          <p className="text-9xl font-bold">
            {currentTime.toLocaleTimeString("ja-JP", { timeStyle: "short" })}
          </p>
        </div>
        <div className="flex gap-16">
          <Button
            label="Work In"
            onClick={onClockWorkIn}
            disabled={timecard.workIn !== null}
          />
          <Button
            label="Work Out"
            onClick={onClockWorkOut}
            disabled={!(timecard.workIn !== null && timecard.workOut === null)}
          />
          <Button
            label="Break In"
            onClick={onClockBreakIn}
            disabled={
              !(
                timecard.workIn !== null &&
                timecard.workOut === null &&
                (timecard.breakIn.length === 0 ||
                  timecard.breakIn.length <= timecard.breakOut.length)
              )
            }
          />
          <Button
            label="Break Out"
            onClick={onClockBreakOut}
            disabled={
              !(
                timecard.workIn !== null &&
                timecard.workOut === null &&
                timecard.breakIn.length > timecard.breakOut.length
              )
            }
          />
        </div>
      </main>
    </>
  );
}
