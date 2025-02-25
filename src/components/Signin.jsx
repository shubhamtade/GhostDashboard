import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import StarBorder from "./atoms/StarBorder ";
// import "./Signin.css"; // Ensure to import the CSS file

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signInUser, signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { success, error } = await signInUser(email, password);

    if (success) {
      navigate("/dashboard"); // Redirect on success
    } else {
      setError(error);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const { success, error } = await signInWithGoogle();

    if (success) {
      navigate("/dashboard"); // Redirect after Google login
    } else {
      setError(error);
    }
  };

  return (
    <div
      className="bg-[#000] h-screen flex justify-center items-center px-5"
      style={{
        backgroundImage:
          "url('https://images5.alphacoders.com/351/351885.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/50   border-2 w-full px-2 md:w-[80%] lg:w-[50%] h-[80%] text-white">
        <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
          <h2 className="font-bold pb-2">Sign in</h2>
          <p>
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
          <div className="flex flex-col py-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 mt-2"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col py-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 mt-2"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <p className="px-4 text-gray-500">or</p>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Google Sign-in Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <svg
                className="c-eSSyNk w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="21px"
                height="21px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>

          {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signin;
