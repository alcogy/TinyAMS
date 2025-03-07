import { useParams } from "react-router";
import Layout from "../components/admin/Layout";
import { useEffect, useState } from "react";
import { users, Attendance } from "../common/models";
import { getFormatDate, getTimeString, getDayClass } from "../common/lib";
import BreakDialog from "../components/admin/BreakDialog";
import Textbox from "../components/Textbox";

export default function Detail() {
  const [targetMonth, setTargetMonth] = useState<Date>(new Date());
  const [list, setList] = useState<Attendance[]>([]);
  const [open, setOpen] = useState<Boolean>(false);

  const { id } = useParams();
  const user = users.find((v) => v.id === id);

  useEffect(() => {
    const date: Attendance[] = [];
    for (let i = 1; i <= 28; i++) {
      const d = new Date(`2025-02-${i.toString().padStart(2, "0")}`);
      date.push({
        date: d,
        workIn: [0, 6].includes(d.getDay())
          ? null
          : new Date(`2025-02-${i.toString().padStart(2, "0")} 09:00:00`),
        workOut: [0, 6].includes(d.getDay())
          ? null
          : new Date(`2025-02-${i.toString().padStart(2, "0")} 18:00:00`),
        breakingHours: [0, 6].includes(d.getDay()) ? 0.0 : 1.0,
        workingHours: [0, 6].includes(d.getDay()) ? 0.0 : 8.0,
        remark: "",
      });
    }

    setList(date);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-8 w-[720px]">
        <div className="flex gap-9 justify-center items-end">
          <button className="rounded-full px-5 py-1 bg-blue-500 text-white hover:bg-blue-400">
            Prev
          </button>
          <p className="text-5xl font-bold text-gray-600">
            {targetMonth.getFullYear()} /{" "}
            {(targetMonth.getMonth() + 1).toString().padStart(2, "0")}
          </p>
          <button className="rounded-full px-5 py-1 bg-blue-500 text-white hover:bg-blue-400">
            Next
          </button>
        </div>
        <div className="py-3">
          <table className="border-collapse w-full">
            <caption className="text-lg mb-2">
              {user?.name} ({user?.id})
            </caption>
            <thead>
              <tr>
                <th className="border border-gray-400 p-2 bg-gray-100">Date</th>
                <th className="border border-gray-400 p-2 bg-gray-100 text-nowrap w-1">
                  Work In
                </th>
                <th className="border border-gray-400 p-2 bg-gray-100 text-nowrap w-1">
                  Work Out
                </th>
                <th className="border border-gray-400 p-2 bg-gray-100 text-nowrap w-1">
                  Break Hours
                </th>
                <th className="border border-gray-400 p-2 bg-gray-100 text-nowrap w-1">
                  Work Hours
                </th>
                <th className="border border-gray-400 p-2 bg-gray-100">
                  Remark
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((v, i) => (
                <tr key={i}>
                  <td className="border border-gray-400 p-2 text-nowrap w-1">
                    <span className={`${getDayClass(v.date)}`}>
                      {getFormatDate(v.date)}
                    </span>
                  </td>
                  <td className="border border-gray-400 p-2 text-nowrap w-1">
                    <input type="time" value={getTimeString(v.workIn)} />
                  </td>
                  <td className="border border-gray-400 p-2 text-nowrap w-1">
                    <input type="time" value={getTimeString(v.workOut)} />
                  </td>
                  <td className="border border-gray-400 p-2 text-nowrap text-right">
                    <button
                      className="underline text-blue-500"
                      onClick={() => setOpen(true)}
                    >
                      {v.breakingHours > 0 && v.breakingHours.toFixed(2)}
                    </button>
                  </td>
                  <td className="border border-gray-400 p-2 text-nowrap text-right">
                    {v.workingHours > 0 && v.workingHours.toFixed(2)}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <Textbox
                      value={v.remark}
                      onChange={(v) => console.log(v)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {open && <BreakDialog onClose={() => setOpen(false)} />}
    </Layout>
  );
}
