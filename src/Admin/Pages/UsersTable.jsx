import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../Components/DataTable";
import HeaderWithSubPath from "../Components/HeaderWithSubPath";
import {
  fetchUsers,
  deleteUser,
  updateUserDetails,
} from "../../Redux/Slices/AuthSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleUpdateUser = (userId) => {
    const userData = {
      role: "admin", // Example, you could also get this data from a form
    };
    console.log("Updating user:", userId, userData); // Debugging
    dispatch(updateUserDetails({ userId, userData }));
  };

  const userColumns = [
    {
      header: "Name",
      accessor: "userName",
      render: (name, user) => (
        <div className="flex items-center">
          <img src={user.image} alt={name} className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <div className="text-sm font-medium font-montserrat text-mainColor">
              {name}
            </div>
            <div className="text-xs text-gray-600">{user.userEmail}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Join Date",
      accessor: "createdAt",
      responsive: "hidden sm:table-cell",
    },
    { header: "Role", accessor: "role", responsive: "hidden sm:table-cell" },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, user) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdateUser(user.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center object-centerw-full mt-[25%]">
        <div className="">
          <span className="loading loading-infinity loading-lg text-mainColor"></span>
        </div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6">
        <HeaderWithSubPath title="Users" className="text-2xl font-bold mb-4" />
        <div className="bg-white p-6 shadow-md rounded-lg">
          <DataTable
            columns={userColumns}
            data={users}
            className="w-full table-auto text-left text-sm text-gray-700"
            rowClassName="hover:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
