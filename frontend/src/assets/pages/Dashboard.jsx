import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js"; // Import useAuth
import "./Dashboard.css";

const Dashboard = () => {
  const { user, loading, logout } = useAuth(); // Use useAuth
  const navigate = useNavigate();

  if (loading) {
    console.log("Loading user...");
    return <div>Loading your profile...</div>;
  }

  if (!user) {
    console.log("No user detected, redirecting to login...");
    navigate("/login"); // Redirect to login if not authenticated
    return null;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <p>Your email: {user.email}</p>
      <button
        onClick={() => {
          logout(); // Call logout function
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
