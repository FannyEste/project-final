import React from "react";
import "./CyclePage.css";
import ovulatoryhero from "../../assets/hero-test.svg";
import recipe1 from "../../assets/recipe1.jpeg";
import recipe2 from "../../assets/recipe2.jpeg";
import recipe3 from "../../assets/recipe3.jpeg";
import exercise1 from "../../assets/hiit-fol.jpeg";
import exercise2 from "../../assets/exercise2.jpeg";
import exercise3 from "../../assets/exercise3.jpeg";

const Ovulatory = () => {
  return (
    <div className="cycle-page">
      <div className="cycles-hero-section">
        <img src={ovulatoryhero} alt="Ovulatory Phase" className="hero-image" />
        <div className="hero-title">
          <h1>OVULATORY</h1>
        </div>
      </div>

      <div className="description-section">
        <h2>Ovulatory Phase (Days 15-17)</h2>
        <p>
          This is your peak! Your confidence is high, and you're feeling social and magnetic. 
          It's a great time for important meetings, social gatherings, and high-energy workouts.
        </p>
      </div>

      <div className="food-section">
        <h3>FOOD FOR OVULATORY PHASE</h3>
        <p>
          Focus on anti-inflammatory foods like fresh fruits, vegetables, and lean proteins. 
          Keep your energy stable with healthy fats.
        </p>
        <div className="food-images">
          <img src={recipe1} alt="Recipe 1" className="food-image" />
          <img src={recipe2} alt="Recipe 2" className="food-image" />
          <img src={recipe3} alt="Recipe 3" className="food-image" />
        </div>
      </div>

      <div className="exercise-section">
        <h3>EXERCISES FOR OVULATORY PHASE</h3>
        <p>Your energy is at its highest, so take advantage of high-intensity workouts.</p>
        <div className="exercise-content">
          <div className="exercise-item">
            <img src={exercise1} alt="HIIT" className="exercise-image" />
            <div className="exercise-text">
              <h4>HIIT</h4>
              <p>Maximize your energy with short, intense bursts of movement.</p>
            </div>
          </div>
          <div className="exercise-item">
            <img src={exercise2} alt="Cycling" className="exercise-image" />
            <div className="exercise-text">
              <h4>Cycling</h4>
              <p>Great for endurance and taking advantage of peak energy levels.</p>
            </div>
          </div>
          <div className="exercise-item">
            <img src={exercise3} alt="Power Yoga" className="exercise-image" />
            <div className="exercise-text">
              <h4>Power Yoga</h4>
              <p>Enhances flexibility and strength while keeping you active.</p>
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

export default Ovulatory;
