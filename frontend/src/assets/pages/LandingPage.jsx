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
          <h1>Welcome to Hormonice</h1>
          <p>Track your cycles and embrace your wellness journey.</p>
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
