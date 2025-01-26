import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Import the useAuth hook
import HeroImage from "../../assets/hero-test.svg";
import BoxGrid from "../../components/BoxGrid";
import "./LandingPage.css"; // Your custom CSS file

const LandingPage = () => {
  const { user } = useAuth(); // Get user info from useAuth
  const navigate = useNavigate(); // For programmatic navigation

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard"); // Redirect to Dashboard if logged in
    } else {
      navigate("/signup"); // Redirect to Signup if not logged in
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1 className="hero-title">WELCOME TO HORMONAL HEAVEN</h1>
          <p className="hero-subtitle">SAFE SPACE. MESSY THOUGHTS. REAL TALK.</p>
          <button onClick={handleGetStarted} className="hero-button">
            Get Started
          </button>
        </div>
      </div>

      {/* BoxGrid Section */}
      <div className="boxgrid-container">
        <BoxGrid />
      </div>
    </div>
  );
};

export default LandingPage;
