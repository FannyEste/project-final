import React from "react";
import "./CyclePage.css";
import recipe1 from "../../assets/recipe1.jpeg";
import recipe2 from "../../assets/recipe2.jpeg";
import recipe3 from "../../assets/recipe3.jpeg";
import exercise1 from "../../assets/exercise1.jpeg";
import exercise2 from "../../assets/exercise2.jpeg";
import exercise3 from "../../assets/exercise3.jpeg";
import follicularPhaseImg from "../../assets/follicular-phase.svg"; // New image import

const Follicular = () => {
  return (
    <div className="cycle-page">
      {/* Hero Section with Image */}
      <div className="cycles-hero-section">
        <div className="hero-text">
          <h2>Follicular Phase (Days 6-14)</h2>
          <p>
            Welcome to the spring of your body! This is your glow-up phase. Your energy is rising, 
            creativity is sparking, and you might feel unstoppable.
          </p>
        </div>
        <div className="hero-image">
          <img src={follicularPhaseImg} alt="Follicular Phase Illustration" />
        </div>
      </div>

      {/* The rest remains unchanged */}
    </div>
  );
};

export default Follicular;
