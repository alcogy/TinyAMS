import { useState } from "react";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  async function onSubmitLogin() {
    // TODO: submit to api
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, password: pass }),
    });
    if (res.status !== 200) {
      alert("Login error.");
      return;
    }
    const data = await res.json();
    const token = data["token"] as string;
    if (token === undefined || token === null) {
      alert("Login error.");
      return;
    }
    // TODO set token to cookie.
    localStorage.setItem("user", JSON.stringify(data["user"]));

    navigate("/timecard");
  }

  return (
    <div className="bg-gray-200 flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-8 bg-white w-[560px] items-center py-8 px-[72px]">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Attendance Management
        </h1>
        <Textbox value={id} label="User ID" onChange={(v) => setId(v)} />
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
