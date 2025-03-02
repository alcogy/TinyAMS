import { getFormatDate } from "../../common/lib";
import Dialog from "../Dialog";

interface Props {
  onClose: () => void;
}

export default function BreakDialog({ onClose }: Props) {
  return (
    <Dialog title="Break Time" onClose={onClose}>
      <table className="border-collapse w-[280px]">
        <caption className="mb-2">
          {getFormatDate(new Date("2025-02-01"))}
        </caption>
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Break In</th>
            <th className="border border-gray-400 p-2">Break Out</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2 text-right">12:00</td>
            <td className="border border-gray-400 p-2 text-right">13:00</td>
          </tr>
        </tbody>
      </table>
    </Dialog>
  );
}
