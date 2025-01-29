import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext"; // Adjust the path if needed

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Use the new useAuth hook

  console.log("ProtectedRoute - User:", user);
  console.log("ProtectedRoute - Loading:", loading);

  // While loading, render a spinner or placeholder
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to /login if the user is not authenticated
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
