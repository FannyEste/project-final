import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the token and user info are in localStorage
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    console.log("Token in useAuth:", token); // Debug
    console.log("User in useAuth:", storedUser); // Debug

    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user data
    }
    setLoading(false);
  }, []);

  // Add login function
  const login = (token, user) => {
    console.log("Saving token and user:", token, user); // Add this
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user); // Update the user state
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, loading, login, logout };
};
