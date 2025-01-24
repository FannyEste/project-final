import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// src/index.js or src/App.jsx
import './styles/Global.css';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons from react-icons


const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        console.log("User registered successfully!");
        navigate("/login");
      } else if (response.status === 400) {
        console.error("User already exists");
        alert("A user with this email already exists. Please use a different email.");
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSignup} className="signup-form">
        <label className="signup-label">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="signup-input"
        />
        <label className="signup-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup-input"
        />
        <label className="signup-label">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password types
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input password-input"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="signup-footer">
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="signup-link">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
