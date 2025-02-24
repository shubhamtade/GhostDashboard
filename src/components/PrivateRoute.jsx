import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  if (session === undefined) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return session ? children : <Navigate to="/" />;
};

export default PrivateRoute;
