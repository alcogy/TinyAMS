import Dialog from "../Dialog";
import Textbox from "../Textbox";
import Button from "../Button";
import { User } from "../../common/models";

interface Props {
  data?: User;
  onClose: () => void;
}

export default function UserEditDialog({ data, onClose }: Props) {
  const title = data ? "Edit" : "Create";
  return (
    <Dialog title={`${title} Staff`} onClose={onClose}>
      <div className="flex flex-col gap-5 mt-5 items-center px-4 w-[480px]">
        <Textbox
          label="ID"
          value={data ? data.id : ""}
          onChange={(v) => console.log(v)}
          disabled={data !== undefined}
        />
        <Textbox
          label="Name"
          value={data ? data.name : ""}
          onChange={(v) => console.log(v)}
        />
        <Textbox
          label="Password"
          type="password"
          value=""
          onChange={(v) => console.log(v)}
        />
        <Textbox
          label="Password (Confirm)"
          type="password"
          value=""
          onChange={(v) => console.log(v)}
        />
        <div className="w-15">
          <Button label="Submit" onClick={() => onClose()} />
        </div>
      </div>
    </Dialog>
  );
}
