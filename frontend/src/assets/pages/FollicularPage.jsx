import React from "react";
import "./CyclePage.css";
import recipe1 from "../../assets/recipe1.jpeg";
import recipe2 from "../../assets/recipe2.jpeg";
import recipe3 from "../../assets/recipe3.jpeg";
import exercise1 from "../../assets/exercise1.jpeg";
import exercise2 from "../../assets/exercise2.jpeg";
import exercise3 from "../../assets/exercise3.jpeg";

const Follicular = () => {
  return (
    <div className="cycle-page">
      {/* Hero Section */}
      <div className="cycles-hero-section">
        <div className="hero-title">
          <h1>FOLLICULAR</h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h2>Follicular Phase (Days 6-14)</h2>
        <p>
          Welcome to the spring of your body! This is your glow-up phase. Your energy is rising, creativity is sparking, and you might feel unstoppable. Your hormones are like, ‘Let’s build something amazing!’ It’s the perfect time to try new projects, hit the gym, or plan a fun night out.
        </p>
      </div>

      {/* Food Section */}
      <div className="food-section">
        <h3>FOOD FOR FOLLICULAR PHASE</h3>
        <p>
          Go for light, fresh foods like salads, smoothies, and lean proteins. Think colorful fruits and veggies to fuel your growing energy and help hormone production.
        </p>
        <div className="food-images">
          <a href="https://plantbasedbre.substack.com/p/follicular-phase-meal-plan-no-2?utm_medium=reader2" target="_blank" rel="noopener noreferrer">
            <img src={recipe1} alt="Recipe 1" className="food-image" />
          </a>
          <a href="https://hollyemakesahome.com/2023/11/29/14-follicular-phase-dinners-easy-delicious/" target="_blank" rel="noopener noreferrer">
            <img src={recipe2} alt="Recipe 2" className="food-image" />
          </a>
          <a href="https://almondmilkandcookies.com/follicular-phase-seed-cycling-cups-days-1-14-paleo/" target="_blank" rel="noopener noreferrer">
            <img src={recipe3} alt="Recipe 3" className="food-image" />
          </a>
        </div>
      </div>

      {/* Music Section */}
      <div className="music-section">
        <h3>CURATED PLAYLIST FOR YOUR FOLLICULAR PHASE</h3>
        <div className="spotify-container centered">
          <iframe
            src="https://open.spotify.com/embed/playlist/11DVNTiYQqCmSwY7pGZfTu?si=1OYalZktT9eHqxjHtUWr0g"
            width="80%"
            height="180"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          ></iframe>
        </div>
      </div>

      {/* Exercise Section */}
      <div className="exercise-section">
        <h3>EXERCISES FOR FOLLICULAR PHASE</h3>
        <p>
          Your energy is building, so try cardio, dancing, or fun workouts that get your heart pumping and creativity flowing.
        </p>
        <div className="exercise-content">
          <div className="exercise-item">
            <img src={exercise1} alt="Cardio" className="exercise-image" />
            <div className="exercise-text">
              <h4>Cardio</h4>
              <p>Boosts your endurance and aligns with your increasing energy levels.</p>
            </div>
          </div>
          <div className="exercise-item">
            <img src={exercise2} alt="Dancing" className="exercise-image" />
            <div className="exercise-text">
              <h4>Dancing</h4>
              <p>Engages the whole body and fuels your creativity and coordination.</p>
            </div>
          </div>
          <div className="exercise-item">
            <img src={exercise3} alt="Strength Training" className="exercise-image" />
            <div className="exercise-text">
              <h4>Strength Training</h4>
              <p>Helps build muscle while your body is primed for high performance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-buttons">
          <button onClick={() => window.location.href = "/"}>Home</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</button>
        </div>
      </footer>
    </div>
  );
};

export default Follicular;
