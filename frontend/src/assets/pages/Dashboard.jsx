import React from "react";
import { useUserStore } from "../../context/userStore";
import LogoutButton from "../../components/LogoutButton";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
        <p>Welcome, {user.name}!</p>
        <LogoutButton /> {/* Add LogoutButton here */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
