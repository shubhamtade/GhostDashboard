import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Fix: Define error state

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="p-5 h-screen">
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full h-full relative">
          <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
          <p className="text-center">Welcome, {session?.user?.email}!</p>
          <button
            onClick={handleSignOut}
            className=" bg-red-500 text-white p-2 rounded  hover:bg-red-600 absolute top-2 right-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
