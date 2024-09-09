import React from "react";
import { useSelector } from "react-redux";

function UserInfo() {
  const { userDetails } = useSelector((state) => state.auth);

  if (!userDetails)
    return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
        User Information
      </h2>
      <div className="border-t border-gray-200 mt-4"></div>
      <div className="mt-6 space-y-4">
        <p className="text-lg font-semibold text-gray-700">
          <strong>Name:</strong> {userDetails.userName}
        </p>
        <p className="text-lg font-semibold text-gray-700">
          <strong>Email:</strong> {userDetails.userEmail}
        </p>
        <p className="text-lg font-semibold text-gray-700">
          <strong>Phone Number:</strong> {userDetails.phone || "N/A"}
        </p>
        <p className="text-lg font-semibold text-gray-700">
          <strong>Address:</strong> {userDetails.address || "N/A"}
        </p>
        <p className="text-lg font-semibold text-gray-700">
          <strong>City:</strong> {userDetails.city || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default UserInfo;
