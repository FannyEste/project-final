import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";
// Removed the HeroImage import since it’s no longer used
import BoxGrid from "../../components/BoxGrid";
import NewsSection from "../../components/NewsSection";
import Footer from "../../components/Footer";
import AboutUs from "../../components/AboutUs";  // Import About Us
import "./LandingPage.css";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/account");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">
            WELCOME TO <br />
             <span className="hero-highlight">HORMONAL HEAVEN</span>
          </h1>
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

      {/* News Section */}
      <NewsSection />

      {/* About Us Section */}
      <AboutUs />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
