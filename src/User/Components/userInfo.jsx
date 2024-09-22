import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Slices/AuthSlice";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useForm } from "react-hook-form";

function UserInfo() {
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Update form fields from user details or auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setValue("userName", user.displayName || userDetails?.userName || "");
        setValue("userEmail", user.email || userDetails?.userEmail || "");
        setValue("phone", userDetails?.phone || "");
        setValue("address", userDetails?.address || "");
        setValue("city", userDetails?.city || "");
      } else {
        console.log("No user is authenticated");
      }
    });

    return () => unsubscribe();
  }, [setValue, userDetails]);

  // Form submission handler
  const onSubmit = (data) => {
    if (!data.userName || !data.userEmail) {
      console.log("Please fill in all required fields.");
      return;
    }

    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        console.log("User updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row-span-10 flex max-w-3xl mx-auto p-6 md:p-3"
    >
      <div className="flex flex-wrap justify-center items-center">
        <div className="avatar flex justify-start items-center w-full mb-8">
          <div className="flex-col content-center justify-center px-3">
            <h2 className="text-titleColor text-[1.2rem] font-semibold">
              {userDetails?.userName}
            </h2>
            <p className="test-textColor text-[12px]">
              {userDetails?.userEmail}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col w-full">
              <input
                type="text"
                placeholder="Name"
                {...register("userName", { required: "Name is required" })}
                className="input input-bordered w-full focus:bg-white"
              />
              {errors.userName && (
                <p className="text-red-500">{errors.userName.message}</p>
              )}
            </div>

            <input
              type="email"
              placeholder="Email Address"
              {...register("userEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
              })}
              className="input input-bordered w-full max-w-4xl focus:bg-white"
            />
            {errors.userEmail && (
              <p className="text-red-500">{errors.userEmail.message}</p>
            )}

            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number is not valid",
                },
              })}
              className="input input-bordered w-full max-w-4xl focus:bg-white"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full mb-4">
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className="input input-bordered w-full focus:bg-white"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  placeholder="City"
                  {...register("city", { required: "City is required" })}
                  className="input input-bordered w-full focus:bg-white"
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          <button
            className="bg-hovermain text-white max-w-4xl mt-20 text-[1rem] px-9 py-3 rounded-lg border shadow-sm
              border-hovermain hover:bg-white hover:text-hovermain"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserInfo;
