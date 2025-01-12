import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../context/userStore"; // Adjust the path if needed

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);

  // Redirect to /login if the user is not authenticated
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
