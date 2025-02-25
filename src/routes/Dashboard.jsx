import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle between dark and light themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply the theme to the document root
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

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
    <div
      className={`min-h-screen p-5 ${
        theme === "dark" ? " text-white" : "bg-gray-100 text-gray-900"
      }`}
      style={
        theme === "dark"
          ? {
              background: "rgb(32,0,60)" /* fallback for old browsers */,
              background:
                "-webkit-linear-gradient(to right, #f2fcfe, #fff)" /* Chrome 10-25, Safari 5.1-6 */,
              background:
                "linear-gradient(59deg, rgba(32,0,60,1) 0%, rgba(46,46,46,1) 100%)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
            }
          : {
              background: "rgb(212, 236, 255)" /* fallback for old browsers */,
              background:
                "-webkit-linear-gradient(to right, #f2fcfe, #fff)" /* Chrome 10-25, Safari 5.1-6 */,
              background:
                "linear-gradient(59deg, rgba(212,236,255,1) 0%, rgba(252,252,252,1) 100%)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
            }
      }
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {theme === "dark" ? (
              <img
                src="https://cdn.prod.website-files.com/66bcc6176bc9596c06805bd7/66c18811955d1df2716711d6_Group%204.svg"
                alt="PandaMatch.io Logo"
                className="h-10"
              />
            ) : (
              <img src={Logo} className="h-[40px] w-10" />
            )}
            <h1 className="text-3xl font-bold">PandaMatch.io</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <p className="text-xl">
            Welcome,{" "}
            <span className="font-semibold">{session?.user?.email}</span>!
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p className="text-gray-600 dark:text-gray-400">
              View and edit your profile information.
            </p>
            <a
              href="/profile"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Go to Profile →
            </a>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings.
            </p>
            <a
              href="/settings"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Go to Settings →
            </a>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check your notifications.
            </p>
            <a
              href="/notifications"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Go to Notifications →
            </a>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
