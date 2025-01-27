import React from "react";
import "./CyclePage.css";
import follicularhero from "../../assets/follicular-hero.svg";

const Follicular = () => {
  return (
    <div className="cycle-page">
      {/* Hero Section */}
      <div className="hero-section">
        <img
          src={follicularhero}
          alt="Follicular Phase"
          className="hero-image"
        />
        <div className="hero-title">
          <h1>FOLLICULAR</h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h2>Follicular Phase (Days 6-14)</h2>
        <p>
          Welcome to the spring of your body! This is your glow-up phase. Your
          energy is rising, creativity is sparking, and you might feel
          unstoppable. Your hormones are like, ‘Let’s build something amazing!’
          (literally, your body is prepping an egg, but hey, this energy is
          yours to use however you want). It’s the perfect time to try new
          projects, hit the gym, or plan a fun night out.
        </p>
      </div>

      {/* Food Section */}
      <div className="food-section">
        <h3>FOOD FOR FOLLICULAR PHASE</h3>
        <p>
          Go for light, fresh foods like salads, smoothies, and lean proteins.
          Think colorful fruits and veggies to fuel your growing energy and
          help hormone production. Add seeds to ease PMS symptoms.
        </p>
        <div className="food-images">
          <div className="image-box"></div>
          <div className="image-box"></div>
          <div className="image-box"></div>
        </div>
      </div>

      {/* Music Section */}
      <div className="music-section">
        <h3>SPOTIFY PLAYLIST FOR FOLLICULAR PHASE</h3>
        <div className="music-box">
          <iframe
            src="https://open.spotify.com/embed/playlist/YOUR_SPOTIFY_PLAYLIST_ID"
            width="100%"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Playlist"
          ></iframe>
        </div>
      </div>

      {/* Exercise Section */}
      <div className="exercise-section">
        <h3>EXERCISES FOR FOLLICULAR PHASE</h3>
        <p>
          Use your energy for cardio, strength training, or group fitness
          classes. This is a great time to push yourself and try new things.
        </p>
        <div className="exercise-images">
          <div className="image-box"></div>
          <div className="image-box"></div>
          <div className="image-box"></div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <a href="#top" className="footer-link">
          Back to Top
        </a>
        <a href="/" className="footer-link">
          Home
        </a>
      </footer>
    </div>
  );
};

export default Follicular;
