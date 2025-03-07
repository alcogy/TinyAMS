import { useState } from "react";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUserName] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  async function onSubmitLogin() {
    // TODO: submit to api
    navigate("/timecard");
  }

  return (
    <div className="bg-gray-200 flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-8 bg-white w-[560px] items-center py-8 px-[72px]">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Attendance Management
        </h1>
        <Textbox
          value={username}
          label="Username"
          onChange={(v) => setUserName(v)}
        />
        <Textbox
          value={pass}
          label="Password"
          type="password"
          onChange={(v) => setPass(v)}
        />
        <div>
          <Button label={"Login"} onClick={onSubmitLogin} />
        </div>
      </div>
    </div>
  );
}
