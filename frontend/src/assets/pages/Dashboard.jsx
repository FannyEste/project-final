import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token);
    
        const response = await axios.get("http://localhost:8080/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response data:", response.data);
    
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err.response || err.message);
        setError("Failed to load user data.");
        setLoading(false);
      }
    };
    

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading your profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <p>Your email: {user.email}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token"); // Log out by clearing token
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
