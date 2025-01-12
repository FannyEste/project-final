import React from "react";
import { useUserStore } from "../context/userStore";

const LogoutButton = () => {
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Clear the user state and remove token
    window.location.href = "/login"; // Redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
