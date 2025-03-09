import React from "react";
import "./CyclePage.css";
import recipe1 from "../../assets/recipe1.jpeg";
import recipe2 from "../../assets/recipe2.jpeg";
import recipe3 from "../../assets/recipe3.jpeg";
import exercise1 from "../../assets/exercise1.jpeg";
import exercise2 from "../../assets/exercise2.jpeg";
import exercise3 from "../../assets/exercise3.jpeg";
import lutealPhaseImg from "../../assets/luteal-phase.svg"; // Import the new image

const Luteal = () => {
  return (
    <div className="cycle-page">
      {/* Hero Section (With Text Left & Circular Image Right) */}
      <div className="cycles-hero-section">
        <div className="hero-text">
          <h2>Luteal Phase (Days 18-28)</h2>
          <p>
            Your energy starts to slow down. This is a great time to focus on self-care, 
            organization, and gentler workouts. You may feel the need for more rest.
          </p>
        </div>
        <div className="hero-image">
          <img src={lutealPhaseImg} alt="Luteal Phase Illustration" />
        </div>
      </div>

      {/* Food Section */}
      <div className="food-section">
        <h3>FOOD FOR LUTEAL PHASE</h3>
        <p>
          Warm, nutrient-dense foods like roasted vegetables, whole grains, and magnesium-rich options 
          to support hormone balance.
        </p>
        <div className="food-images">
          <img src={recipe1} alt="Recipe 1" className="food-image" />
          <img src={recipe2} alt="Recipe 2" className="food-image" />
          <img src={recipe3} alt="Recipe 3" className="food-image" />
        </div>
      </div>

      {/* Music Section */}
      <div className="music-section">
        <h3>CURATED PLAYLIST FOR YOUR LUTEAL PHASE</h3>
        <div className="spotify-container">
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
        <h3>EXERCISES FOR LUTEAL PHASE</h3>
        <p>Focus on lower-impact workouts to align with your body’s natural rhythm.</p>
        <div className="exercise-content">
          <div className="exercise-item">
            <img src={exercise1} alt="Pilates" className="exercise-image" />
            <div className="exercise-text">
              <h4>Pilates</h4>
              <p>Supports strength and stability as your body shifts into a slower phase.</p>
            </div>
          </div>
          <div className="exercise-item">
            <img src={exercise2} alt="Walking" className="exercise-image" />
            <div className="exercise-text">
              <h4>Walking</h4>
              <p>A great way to move your body without overexertion.</p>
            </div>
          </div>
          <div className="exercise-item">
            <img src={exercise3} alt="Stretching" className="exercise-image" />
            <div className="exercise-text">
              <h4>Stretching</h4>
              <p>Gentle movement to keep muscles relaxed and limber.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-buttons">
          <button onClick={() => window.location.href = "/"}>Home</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top</button>
        </div>
      </footer>
    </div>
  );
};

export default Luteal;