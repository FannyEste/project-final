import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";
import HeroImage from "../../assets/hero-test.svg";
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
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1 className="hero-title">
            WELCOME TO <span className="hero-highlight">HORMONAL HEAVEN</span>
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

      {/* 🔹 News Section (Now Before About Us) */}
      <NewsSection />

      {/* 🔹 About Us Section (Moved to Before Footer) */}
      <AboutUs />

      {/* 🔹 Footer (Now After About Us) */}
      <Footer />
    </div>
  );
};

export default LandingPage;
