import React from "react";
import { useUserStore } from "../../context/userStore";
import LogoutButton from "../../components/LogoutButton";
import "./Dashboard.css";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      {user ? (
        <div className="dashboard-content">
          <p className="dashboard-welcome">Welcome, <span className="dashboard-username">{user.name}</span>!</p>
          <LogoutButton />
        </div>
      ) : (
        <p className="dashboard-loading">Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
