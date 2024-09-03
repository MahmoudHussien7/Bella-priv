// eslint-disable-next-line no-unused-vars
import React from "react";

function UserInfo() {


  return (
        <div className="flex flex-wrap justify-center items-center max-w-3xl mx-auto p-6 md:p-3">
          <div className="avatar flex justify-start items-center w-full mb-8">
            <div className="w-[15%] rounded-full shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1679611978819-f10168367155?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
              />
            </div>
            <div className="flex-col content-center justify-center px-3">
              <h2 className="text-titleColor text-[1.2rem] font-semibold">
                Lance Reis
              </h2>
              <p className="test-textColor text-[12px]">Cairo, Egypt</p>
            </div>
          </div>

    </div>
  );
}

export default UserInfo;