import { Link } from "react-router";
import Layout from "../components/admin/Layout";
import { User, users } from "../common/models";
import UserEditDialog from "../components/admin/UserEditDialog";
import { useState } from "react";

export default function List() {
  const [opan, setOpen] = useState<Boolean>(false);
  const [user, setUser] = useState<User>();

  const onClickAdd = () => {
    setUser(undefined);
    setOpen(true);
  };
  const onClickEdit = (user: User) => {
    setUser(user);
    setOpen(true);
  };
  const onClose = () => {
    setUser(undefined);
    setOpen(false);
  };

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
        {opan && <UserEditDialog data={user} onClose={onClose} />}
      </div>
    </Layout>
  );
}
