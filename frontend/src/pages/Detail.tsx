import Layout from "../components/Layout";
import { getFormatDate, getTimeString, getDayClass } from "../common/lib";
import Textbox from "../components/Textbox";
import { useDetail } from "../hooks/useDetail";

export default function Detail() {
  const {
    targetMonth,
    list,
    nextTargetDate,
    prevTargetDate,
    onChangeData,
    onBlur,
    genTimeFormat,
  } = useDetail();

  return (
    <Layout>
      <div className="flex flex-col gap-8 w-[880px]">
        <div className="flex gap-9 justify-center items-end">
          <button
            className="rounded-full px-5 py-1 bg-blue-500 text-white hover:bg-blue-400"
            onClick={prevTargetDate}
          >
            Prev
          </button>
          <p className="text-5xl font-bold text-gray-600">
            {targetMonth.getFullYear()}/
            {(targetMonth.getMonth() + 1).toString().padStart(2, "0")}
          </p>
          <button
            className="rounded-full px-5 py-1 bg-blue-500 text-white hover:bg-blue-400"
            onClick={nextTargetDate}
          >
            Next
          </button>
        </div>
        <div className="py-3">
          <table className="border-collapse w-full">
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
                  Break In
                </th>
                <th className="border border-gray-400 p-2 bg-gray-100 text-nowrap w-1">
                  Break Out
                </th>
                <th className="border border-gray-400 p-2 bg-gray-100 text-nowrap w-1">
                  Working Hours
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
                    <input
                      type="time"
                      value={getTimeString(v.workIn)}
                      onChange={(e) =>
                        onChangeData(i, {
                          ...v,
                          workIn: genTimeFormat(v.date, e.target.value),
                        })
                      }
                      onBlur={(v) => onBlur(i)}
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-nowrap w-1">
                    <input
                      type="time"
                      value={getTimeString(v.workOut)}
                      onChange={(e) =>
                        onChangeData(i, {
                          ...v,
                          workOut: genTimeFormat(v.date, e.target.value),
                        })
                      }
                      onBlur={(v) => onBlur(i)}
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-nowrap text-right">
                    <input
                      type="time"
                      value={getTimeString(v.breakIn)}
                      onChange={(e) =>
                        onChangeData(i, {
                          ...v,
                          breakIn: genTimeFormat(v.date, e.target.value),
                        })
                      }
                      onBlur={(v) => onBlur(i)}
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-nowrap text-right">
                    <input
                      type="time"
                      value={getTimeString(v.breakOut)}
                      onChange={(e) =>
                        onChangeData(i, {
                          ...v,
                          breakOut: genTimeFormat(v.date, e.target.value),
                        })
                      }
                      onBlur={(v) => onBlur(i)}
                    />
                  </td>
                  <td className="border border-gray-400 p-2 text-nowrap text-right">
                    {v.workingHours.toFixed(2)}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <Textbox
                      value={v.remark}
                      onChange={(value) =>
                        onChangeData(i, { ...v, remark: value })
                      }
                      onBlur={(v) => onBlur(i)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
