import React from "react";
import "./BoxGrid.css";
import { Link } from "react-router-dom";

import FollicularIcon from "../assets/follicular-icon.svg";
import OvulatoryIcon from "../assets/ovulatory-icon.svg";
import LutealIcon from "../assets/luteal-icon.svg";
import MenstrualIcon from "../assets/menstrual-icon.svg";

const BoxGrid = () => {
  const phases = [
    { name: "FOLLICULAR", link: "/cycles/follicular", color: "#E5D4F6", icon: FollicularIcon },
    { name: "OVULATORY", link: "/cycles/ovulatory", color: "#FFD59E", icon: OvulatoryIcon },
    { name: "LUTEAL", link: "/cycles/luteal", color: "#F15A28", icon: LutealIcon },
    { name: "MENSTRUAL", link: "/cycles/menstrual", color: "#B49DD9", icon: MenstrualIcon },
  ];

  return (
    <div className="cycles-section">
      <h2 className="cycles-title">First things first: Know your cycle</h2>
      <div className="box-grid">
        {phases.map((phase) => (
          <Link to={phase.link} key={phase.name}>
            <div className="box">
              <div className="circle" style={{ backgroundColor: phase.color }}>
                <img src={phase.icon} alt={`${phase.name} Icon`} className="hover-icon" />
              </div>
              <h3 className="box-title">{phase.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoxGrid;
