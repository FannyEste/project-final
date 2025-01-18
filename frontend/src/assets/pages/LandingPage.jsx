import React from "react";
import { Link } from "react-router-dom";
import BoxGrid from "../../components/BoxGrid"; // Import the BoxGrid component
import "./LandingPage.css"; // Import CSS for the hero image and page styles
import HeroImage from "../../assets/hero-test.svg"; // Import the hero image (adjust the path if needed)


const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1>WELCOME TO HORMONAL HEAVEN</h1>
          <p>SAFE SPACE. MESSY THOUGHTS. REAL TALK.</p>
          <Link to="/signup" className="hero-button">
            Get Started
          </Link>
        </div>
      </div>

      {/* BoxGrid Section */}
      <BoxGrid />
    </div>
  );
};

export default LandingPage;
