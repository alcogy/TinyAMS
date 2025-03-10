import Dialog from "../Dialog";
import Textbox from "../Textbox";
import Button from "../Button";
import { User } from "../../common/models";
import { useEffect, useState } from "react";

interface Props {
  data?: User;
  isEdit?: boolean;
  onSubmit: (user: User) => void;
  onClose: () => void;
}

export default function UserEditDialog({
  data,
  isEdit = false,
  onSubmit,
  onClose,
}: Props) {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const title = isEdit ? "Edit" : "Create";

  const submit = () => {
    onSubmit({
      id: id,
      name: name,
      password: pass,
    });
  };

  useEffect(() => {
    if (data) {
      setId(data.id);
      setName(data.name);
    }
  }, []);

  return (
    <Dialog title={`${title} Staff`} onClose={onClose}>
      <div className="flex flex-col gap-5 mt-5 items-center px-4 w-[480px]">
        <Textbox
          label="ID"
          value={id}
          onChange={(v) => setId(v)}
          disabled={isEdit}
        />
        <Textbox label="Name" value={name} onChange={(v) => setName(v)} />
        <Textbox
          label="Password"
          type="password"
          value={pass}
          onChange={(v) => setPass(v)}
        />
        <div className="w-15">
          <Button label="Submit" onClick={() => submit()} />
        </div>
      </div>
    </Dialog>
  );
}
