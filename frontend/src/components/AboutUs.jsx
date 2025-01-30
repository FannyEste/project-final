import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-section" id="about-us">
      <h2 className="about-title">ABOUT US</h2>
      <div className="about-content">
        {/* Left Side: Image */}
        <div className="about-image">
          {/* Use direct public path */}
          <img 
            src="/about-image.jpg" 
            alt="About Hormonal Heaven" 
            className="about-img" 
            onError={(e) => e.target.src = "https://via.placeholder.com/300"} 
          />
        </div>

        {/* Right Side: Text */}
        <div className="about-text">
          <p>
            <strong>Hormonal Heaven</strong> is a safe space designed to help people understand their hormones, their menstrual cycle, and the impact it has on their mental and physical well-being. We believe that <strong>knowledge is power</strong>, and learning about our cycle can help us make informed decisions about our health.
          </p>
          <p>
            Our platform provides <strong>insightful articles</strong>, <strong>cycle tracking tips</strong>, and a <strong>supportive community</strong> where you can share experiences and learn from others. Hormonal fluctuations influence <strong>mood, energy levels, sleep, and overall well-being</strong>—yet they are often overlooked in mainstream health discussions.
          </p>
          <p>
            Many of us experience mood swings, fatigue, anxiety, or other symptoms but don't fully understand why. Our goal is to bridge this knowledge gap by offering **science-backed information** and **real-life experiences** from people who share the same struggles.  
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
