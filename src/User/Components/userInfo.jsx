// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";

function UserInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row-span-10 flex justify-center items-center max-w-3xl mx-auto p-6 md:p-3"
      >
        <div className="flex flex-wrap justify-center items-center">
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

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full mb-4">
            <div className="flex flex-col w-full">
              <input
                type="text"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="input input-bordered w-full focus:bg-white"
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName", { required: "Last name is required" })}
                className="input input-bordered w-full focus:bg-white"
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
              })}
              className="input input-bordered w-full max-w-4xl focus:bg-white"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-11]+$/,
                  message: "Phone number is not valid",
                },
              })}
              className="input input-bordered w-full max-w-4xl focus:bg-white"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
            <input
              type="text"
              placeholder="Location"
              {...register("location", { required: "Location is required" })}
              className="input input-bordered w-full max-w-4xl focus:bg-white"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>

          <button
            className="bg-hovermain text-white max-w-4xl mt-20 text-[1rem] px-9 py-3 rounded-lg border shadow-sm
              border-hovermain hover:bg-white hover:text-hovermain"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
