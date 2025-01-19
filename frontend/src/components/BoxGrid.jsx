import React from "react";
import "./BoxGrid.css";
import TestImage from "../assets/test-image.svg";

const BoxGrid = () => {
  const phases = [
    { name: "FOLLICULAR", image: TestImage },
    { name: "OVULATORY", image: TestImage },
    { name: "LUTEAL", image: TestImage },
    { name: "MENSTRUAL", image: TestImage },
  ];

  return (
    <section className="cycles-section">
      {/* Section Title */}
      <h2 className="cycles-title">What phase of your cycle are you in?</h2>
      
      {/* Grid of Boxes */}
      <div className="box-grid">
        {phases.map((phase) => (
          <div key={phase.name} className="box">
            <img src={phase.image} alt={phase.name} className="box-image" />
            <h3 className="box-title">{phase.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoxGrid;
