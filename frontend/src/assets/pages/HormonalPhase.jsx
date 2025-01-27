import React from "react";

const HormonalPhase = ({ currentPhase }) => {
  const phases = {
    follicular: "Energy is higher. Focus on strength training.",
    ovulatory: "Peak fertility. Great time for communication.",
    luteal: "Self-care is key. Avoid overexertion.",
    menstrual: "Rest and recover. Stay hydrated and eat iron-rich foods.",
  };

  return (
    <div className="hormonal-phase">
      <h2>Hormonal Phase</h2>
      <p>Current Phase: {currentPhase}</p>
      <p>{phases[currentPhase]}</p>
    </div>
  );
};

export default HormonalPhase;
