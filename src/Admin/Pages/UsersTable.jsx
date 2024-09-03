import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../Components/DataTable";
import HeaderWithSubPath from "../Components/HeaderWithSubPath";
import { fetchUsers } from "../../Redux/Slices/AuthSlice"; // Adjust the path as needed

const userColumns = [
  {
    header: "Name",
    accessor: "fullName",
    render: (name, user) => (
      <div className="flex items-center">
        <img src={user.image} alt={name} className="w-10 h-10 rounded-full" />
        <div className="ml-3">
          <div className="text-sm font-medium font-montserrat text-mainColor">
            {name}
          </div>
          <div className="text-xs text-gray-600">{user.phone}</div>
        </div>
      </div>
    ),
  },
  {
    header: "Join Date",
    accessor: "createdAt",
    responsive: "hidden sm:table-cell",
  },
  {
    header: "Position",
    accessor: "position",
    responsive: "hidden sm:table-cell",
  },
  { header: "Gender", accessor: "gender", responsive: "hidden lg:table-cell" },
  { header: "Age", accessor: "age", responsive: "hidden lg:table-cell" },
];

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <HeaderWithSubPath title="Users" />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataTable columns={userColumns} data={users} />
      )}
    </div>
  );
};

export default UsersTable;
