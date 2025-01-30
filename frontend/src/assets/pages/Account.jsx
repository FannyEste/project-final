import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext"; // Import auth hook
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Account.css"; // Ensure styles are consistent

const Account = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for Signup
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔹 Handles login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          login(data.token, data.user);
          navigate("/dashboard");
        } else {
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

  // 🔹 Handles signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert("User registered successfully!");
        setIsLogin(true); // Switch to login after successful signup
      } else if (response.status === 400) {
        alert("A user with this email already exists. Please use a different email.");
      } else {
        alert("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="account-container">
      <h1 className="account-title">{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={isLogin ? handleLogin : handleSignup} className="account-form">
        {/* Show Name field only for Signup */}
        {!isLogin && (
          <>
            <label className="account-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="account-input"
            />
          </>
        )}

        <label className="account-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="account-input"
        />

        <label className="account-label">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="account-input password-input"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button type="submit" className="account-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* 🔹 Add Toggle Text Below Form */}
      <div className="account-footer">
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className="account-link">
            {isLogin ? "Create one here." : "Log in here."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Account;
