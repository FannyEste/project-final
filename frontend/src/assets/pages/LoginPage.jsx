import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext"; // Import useAuth hook
import "./LoginPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_URL } from "../config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); // Use login function from useAuth
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login response data:", data); // Debugging log

            if (data.token) {
                localStorage.setItem("token", data.token); // Store token in localStorage
                console.log("Stored token:", localStorage.getItem("token")); // Debug log
                login(data.token, data.user); // Call login function
                navigate("/dashboard"); // Redirect to Dashboard
            } else {
                console.error("No token received from server.");
                alert("Authentication failed. No token received.");
            }
        } else {
            alert("Invalid login credentials");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Unable to connect to the server.");
    }
};


  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label className="login-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <label className="login-label">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input password-input"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
