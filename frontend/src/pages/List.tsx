import { useEffect, useState } from "react";
import { Link } from "react-router";
import Layout from "../components/admin/Layout";
import { User } from "../common/models";
import UserEditDialog from "../components/admin/UserEditDialog";

export default function List() {
  const [opan, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();

  const onClickAdd = () => {
    setUser(undefined);
    setIsEdit(false);
    setOpen(true);
  };
  const onClickEdit = (user: User) => {
    setUser(user);
    setIsEdit(true);
    setOpen(true);
  };
  const onClose = () => {
    setUser(undefined);
    setIsEdit(false);
    setOpen(false);
  };

  const onSubmit = async (user: User) => {
    const res = await fetch("http://localhost:8000/user", {
      method: isEdit ? "PUT" : "POST",
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 200) {
      // TODO: update user list.
    }

    setUser(undefined);
    setIsEdit(false);
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/users");
      if (res.status !== 200) {
        // TODO: Error
        return;
      }
      const data = await res.json();
      if (data["users"] === undefined) {
        // TODO: Error
        return;
      }
      setUsers(data["users"] as User[]);
    })();
  }, []);

  return (
    <Layout>
      <div className="w-[600px]">
        <table className="border-collapse w-full">
          <caption>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold mb-3">Staffs</p>
              <button
                className="bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-md"
                onClick={onClickAdd}
              >
                Add
              </button>
            </div>
          </caption>
          <thead>
            <tr>
              <th className="border border-gray-400 p-2 bg-gray-100">ID</th>
              <th className="border border-gray-400 p-2 bg-gray-100">Name</th>
              <th className="border border-gray-400 p-2 bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((v) => (
              <tr key={v.id}>
                <td className="border border-gray-400 p-2">
                  <Link
                    to={`/detail/${v.id}`}
                    className="text-blue-500 font-bold hover:underline"
                  >
                    {v.id}
                  </Link>
                </td>
                <td className="border border-gray-400 p-2">{v.name}</td>
                <td className="border border-gray-400 p-2 w-1">
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white rounded-md"
                      onClick={() => onClickEdit(v)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-400 px-2 py-1 text-white rounded-md">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {opan && (
          <UserEditDialog
            data={user}
            onSubmit={onSubmit}
            onClose={onClose}
            isEdit={isEdit}
          />
        )}
      </div>
    </Layout>
  );
}
