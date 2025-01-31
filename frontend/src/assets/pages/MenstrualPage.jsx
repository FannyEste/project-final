import React from "react";
import "./CyclePage.css";
import menstrualhero from "../../assets/hero-test.svg";
import recipe1 from "../../assets/recipe1.jpeg";
import recipe2 from "../../assets/recipe2.jpeg";
import recipe3 from "../../assets/recipe3.jpeg";
import exercise1 from "../../assets/exercise1.jpeg";
import exercise2 from "../../assets/exercise2.jpeg";
import exercise3 from "../../assets/exercise3.jpeg";

const Menstrual = () => {
  return (
    <div className="cycle-page">
      <div className="cycles-hero-section">
        <img src={menstrualhero} alt="Menstrual Phase" className="hero-image" />
        <div className="hero-title">
          <h1>MENSTRUAL</h1>
        </div>
      </div>

      <div className="description-section">
        <h2>Menstrual Phase (Days 1-5)</h2>
        <p>
          Your body needs rest and recovery. This is the time for reflection, relaxation, and 
          listening to your body's needs.
        </p>
      </div>

      <div className="food-section">
        <h3>FOOD FOR MENSTRUAL PHASE</h3>
        <p>
          Iron-rich foods like spinach, lentils, and hearty soups to replenish lost nutrients.
        </p>
        <div className="food-images">
          <img src={recipe1} alt="Recipe 1" className="food-image" />
          <img src={recipe2} alt="Recipe 2" className="food-image" />
          <img src={recipe3} alt="Recipe 3" className="food-image" />
        </div>
      </div>

      <div className="exercise-section">
        <h3>EXERCISES FOR MENSTRUAL PHASE</h3>
        <p>Gentle movements help reduce cramps and improve circulation.</p>
        <div className="exercise-content">
          <div className="exercise-item">
            <img src={exercise1} alt="Gentle Yoga" className="exercise-image" />
            <div className="exercise-text">
              <h4>Gentle Yoga</h4>
              <p>Helps with cramps and promotes relaxation.</p>
            </div>
          </div>
          <div className="exercise-item">
            <img src={exercise2} alt="Breathwork" className="exercise-image" />
            <div className="exercise-text">
              <h4>Breathwork</h4>
              <p>Encourages deep relaxation and stress relief.</p>
            </div>
          </div>
          <div className="exercise-item">
            <img src={exercise3} alt="Light Stretching" className="exercise-image" />
            <div className="exercise-text">
              <h4>Light Stretching</h4>
              <p>Keeps circulation flowing without over-exertion.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-buttons">
          <button onClick={() => window.location.href = "/"}>Home</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</button>
        </div>
      </footer>
    </div>
  );
};

export default Menstrual;
