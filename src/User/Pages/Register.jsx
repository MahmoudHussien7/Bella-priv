import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/Slices/AuthSlice";
import { toast } from "react-toastify";

const Register = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (data) => {
        dispatch(
            registerUser({
                userEmail: data.userEmail,
                password: data.password,
                userName: data.userName,
                cartProducts: data.cartProducts || [],
                favoriteProducts: data.favoriteProducts || [],
            })
        )
            .unwrap()
            .then(() => {
                toast.success("Registration successful!", {
                    position: "bottom-right",
                });
                navigate("/");
            })
            .catch((error) => {
                const errorMsg =
                    error.code === "auth/invalid-credential"
                        ? "The credentials provided are invalid,Please check your input and try again."
                        : "An unexpected error occurred , Please try again later.";
                toast.error(errorMsg, {
                    position: "bottom-right",
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
            <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-center items-center gap-3 mb-6">
                    <h1 className="text-3xl font-semibold text-gray-700">
                        Sign up
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* User Name Input */}
                    <div>
                        <label
                            htmlFor="userName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            User Name
                        </label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            {...register("userName", {
                                required: "User Name is required",
                                pattern: {
                                    value: /^[a-zA-Z]+$/i,
                                    message:
                                        "User Name can only contain letters",
                                },
                                minLength: {
                                    value: 3,
                                    message:
                                        "User Name must be at least 3 characters long",
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-mainColor focus:ring-1 focus:ring-mainColor transition-colors"
                        />
                        {errors.userName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.userName.message}
                            </p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="userEmail"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            id="userEmail"
                            name="userEmail"
                            type="email"
                            {...register("userEmail", {
                                required: "Email Address is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-mainColor focus:ring-1 focus:ring-mainColor transition-colors"
                        />
                        {errors.userEmail && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.userEmail.message}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters long",
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-mainColor focus:ring-1 focus:ring-mainColor transition-colors"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            {...register("confirmPassword", {
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords do not match",
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-mainColor focus:ring-1 focus:ring-mainColor transition-colors"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-[#B48E61] text-white font-semibold rounded-md shadow-md hover:bg-mainColor-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor"
                        >
                            {loading ? "Registering..." : "Sign up"}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Already have an account?
                        <Link
                            to="/login"
                            className="ml-1 text-mainColor hover:text-mainColor font-montserrat transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
