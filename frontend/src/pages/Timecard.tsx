import Button from "../components/timecard/Button";
import { getDayClass, weekOfDay } from "../common/lib";
import { useTimecard } from "../hooks/useTimecard";

export default function Timecard() {
  const {
    user,
    timecard,
    currentTime,
    onClockWorkIn,
    onClockWorkOut,
    onClockBreakIn,
    onClockBreakOut,
    LogOut,
  } = useTimecard();

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
