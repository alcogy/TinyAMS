import Button from "../components/timecard/Button";
import { getDayClass, weekOfDay } from "../common/lib";
import { useTimecard } from "../hooks/useTimecard";
import Layout from "../components/Layout";

export default function Timecard() {
  const {
    timecard,
    currentTime,
    onClickWorkIn,
    onClickWorkOut,
    onClickBreakIn,
    onClickBreakOut,
  } = useTimecard();

  return (
    <Layout>
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
            onClick={onClickWorkIn}
            disabled={timecard.workIn !== null}
          />
          <Button
            label="Work Out"
            onClick={onClickWorkOut}
            disabled={!(timecard.workIn !== null && timecard.workOut === null)}
          />
          <Button
            label="Break In"
            onClick={onClickBreakIn}
            disabled={
              !(
                timecard.workIn !== null &&
                timecard.workOut === null &&
                timecard.breakIn === null
              )
            }
          />
          <Button
            label="Break Out"
            onClick={onClickBreakOut}
            disabled={
              !(
                timecard.workIn !== null &&
                timecard.workOut === null &&
                timecard.breakIn !== null &&
                timecard.breakOut === null
              )
            }
          />
        </div>
      </main>
    </Layout>
  );
}
