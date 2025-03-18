import { useEffect, useState } from "react";
import { User } from "../common/models";
import { useNavigate } from "react-router";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const nav = useNavigate();
  const [user, setUser] = useState<User>();

  async function logout() {
    localStorage.clear();
    nav("/login");
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === null) return;
    setUser(JSON.parse(user) as User);
  }, []);

  return (
    <>
      <header className="flex justify-between h-14 px-5 items-center bg-gray-600">
        <div>
          <h1 className="text-white text-2xl font-bold">
            <a href="/timecard">Bushmills</a>
          </h1>
        </div>
        <div className="flex gap-5 items-center">
          <p className="text-white text-sm text-right">
            <a
              href="/detail"
              className="py-2 px-3 hover:bg-gray-500 rounded-md"
            >
              {user?.name} ({user?.id})
            </a>
          </p>
          <button
            className="bg-gray-200 px-2 py-1 rounded-md font-bold hover:bg-gray-100"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex justify-center mt-8">{children}</main>
    </>
  );
}
