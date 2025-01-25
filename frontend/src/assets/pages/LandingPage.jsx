import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../assets/hero-test.svg";
import BoxGrid from "../../components/BoxGrid";
import "./LandingPage.css"; // Your custom CSS file

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <img
          src={HeroImage}
          alt="Hero"
          className="hero-image"
        />
        <div className="hero-text">
          <h1 className="hero-title">
            WELCOME TO HORMONAL HEAVEN
          </h1>
          <p className="hero-subtitle">
            SAFE SPACE. MESSY THOUGHTS. REAL TALK.
          </p>
          <Link to="/signup" className="hero-button">
            Get Started
          </Link>
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
