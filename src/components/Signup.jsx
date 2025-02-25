import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
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
        <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
          <h2 className="font-bold pb-2">Sign up today!</h2>
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-blue-500">
              Sign in
            </Link>
          </p>
          <div className="flex flex-col py-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 mt-2"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col py-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 mt-2"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
