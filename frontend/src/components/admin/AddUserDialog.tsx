import Dialog from "../Dialog";
import Textbox from "../../components/Textbox";
import Button from "../../components/Button";

interface Props {
  onClose: () => void;
}

export default function AddUserDialog({ onClose }: Props) {
  return (
    <Dialog title="Add Staff" onClose={onClose}>
      <div className="flex flex-col gap-5 mt-5 items-center px-4 w-[480px]">
        <Textbox label="ID" value="" onChange={(v) => console.log(v)} />
        <Textbox label="Name" value="" onChange={(v) => console.log(v)} />
        <Textbox
          label="Password"
          type="password"
          value=""
          onChange={(v) => console.log(v)}
        />
        <Textbox
          label="PAssword (Confirm)"
          type="password"
          value=""
          onChange={(v) => console.log(v)}
        />
        <div className="w-15">
          <Button label="Create" onClick={() => onClose()} />
        </div>
      </div>
    </Dialog>
  );
}
