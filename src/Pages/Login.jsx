import { useState } from "react";
import Register from "./Register";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [error, setError] = useState("");
  //   const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Background Image */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://r4.wallpaperflare.com/wallpaper/582/443/760/white-design-room-sofa-wallpaper-22b1b2205de6ce5b0af8a2c5b0686922.jpg')",
        }}
      />

      {/* Right Side: Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-gradient-to-b from-orange-200 to-slate-300">
        <div className="bg-transparent shadow-md rounded-lg px-12 py-10 max-w-lg w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-700">Welcome Back</h1>
            <p className="text-sm text-gray-500">Log in to your account</p>
          </div>

          <form className="space-y-6 mt-8">
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-300 focus:border-amber-300"
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-300 focus:border-amber-300"
              />
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-hovermain text-white font-semibold rounded-md shadow-md hover:bg-orange-200 transition-colors"
              >
                Login
              </button>
            </div>
          </form>

          {/* Extra Links */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Dont have an account?
              <Link
                to="/Register"
                className="text-hovermain hover:text-orange-200 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
