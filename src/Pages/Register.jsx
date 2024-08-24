import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center items-center gap-3 mb-6">
            <h1 className="text-3xl font-semibold text-gray-700">Sign up </h1>
          </div>

          <form className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-hovermain focus:ring-1 focus:ring-hovermain focus-visible:outline-none transition-colors"
                aria-label="Full Name"
                aria-required="true"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-hovermain focus:ring-1 focus:ring-hovermain focus-visible:outline-none transition-colors"
                aria-label="Email Address"
                aria-required="true"
              />
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-hovermain focus:ring-1 focus:ring-hovermain focus-visible:outline-none transition-colors"
                aria-label="Password"
                aria-required="true"
              />
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
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-hovermain focus:ring-1 focus:ring-hovermain focus-visible:outline-none transition-colors"
                aria-label="Confirm Password"
                aria-required="true"
              />
            </div>

            {/* Register Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-hovermain text-white font-semibold rounded-md shadow-md hover:bg-hovermain-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hovermain"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Extra Links */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="ml-1 text-hovermain hover:text-hovermain-light transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
