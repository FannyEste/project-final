// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import ProfileInfo from "./ProfileInfo";
import PeriodCalendar from "./PeriodCalendar";
import HormonalPhase from "./HormonalPhase";
import { calculatePhases } from "../../utils/cycleUtils";
import "./Dashboard.css";
import OvulatoryPhase from "../../assets/eggs.svg";

const Dashboard = () => {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();
    
    const [phases, setPhases] = useState({
        menstrual: [],
        follicular: [],
        ovulatory: [],
        luteal: [],
    });
    const [startDate, setStartDate] = useState(null);
    const [periodDuration, setPeriodDuration] = useState(5);
    const [cycleLength, setCycleLength] = useState(28);
    const [currentPhase, setCurrentPhase] = useState("Select your period start date to track your phase");

    useEffect(() => {
        if (startDate && cycleLength && periodDuration) {
            const calculatedPhases = calculatePhases(
                startDate,
                cycleLength,
                periodDuration
            );
            setPhases(calculatedPhases);
            determineCurrentPhase(calculatedPhases);
        }
    }, [startDate, cycleLength, periodDuration]);

    const determineCurrentPhase = (phases) => {
        const today = new Date().toDateString();
        if (phases.menstrual.some(date => date.toDateString() === today)) {
            setCurrentPhase("Menstrual Phase");
        } else if (phases.follicular.some(date => date.toDateString() === today)) {
            setCurrentPhase("Follicular Phase");
        } else if (phases.ovulatory.some(date => date.toDateString() === today)) {
            setCurrentPhase("Ovulatory Phase");
        } else if (phases.luteal.some(date => date.toDateString() === today)) {
            setCurrentPhase("Luteal Phase");
        } else {
            setCurrentPhase("No phase detected");
        }
    };

    const handleTrackCycle = () => {
        if (startDate) {
            const calculatedPhases = calculatePhases(startDate, cycleLength, periodDuration);
            setPhases(calculatedPhases);
            determineCurrentPhase(calculatedPhases);
        }
    };

    return (
      <div className="dashboard-container">
          <h1 className="dashboard-title">Welcome, {user?.name || "User"}!</h1>
  
          <div className="dashboard-layout">
              {/* Configure Your Cycle Box */}
              <div className="dashboard-content">
                  <h2>Configure Your Cycle</h2>
                  <label>How many days did your period last?</label>
                  <select onChange={(e) => setPeriodDuration(Number(e.target.value))}>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>{day} days</option>
                      ))}
                  </select>
  
                  <label>How long is your menstrual cycle?</label>
                  <select onChange={(e) => setCycleLength(Number(e.target.value))}>
                      {Array.from({ length: 15 }, (_, i) => i + 21).map(day => (
                          <option key={day} value={day}>{day} days</option>
                      ))}
                  </select>
              </div>
  
              {/* Calendar Component */}
              <div className="calendar-container">
                  <h2>Select when your last period started</h2>
                  <PeriodCalendar phases={phases} onStartDateSelect={setStartDate} />
              </div>
          </div>
  
          {/* Current Phase */}
          <div className="current-phase-container">
              <h3>Current Phase: {currentPhase}</h3>
              <p>{currentPhase === "Menstrual Phase" ? "Your body is shedding the uterine lining. You may experience cramps and fatigue." : ""}</p>
              <p>{currentPhase === "Follicular Phase" ? "Your body is preparing for ovulation, and estrogen levels rise." : ""}</p>
              <p>{currentPhase === "Ovulatory Phase" ? "Ovulation occurs, and fertility is at its peak." : ""}</p>
              <p>{currentPhase === "Luteal Phase" ? "Your body prepares for a potential pregnancy, and progesterone levels increase." : ""}</p>
              <img src={currentPhase === "Menstrual Phase" ? "/images/menstrual.png" :
                        currentPhase === "Follicular Phase" ? "/images/follicular.png" :
                        currentPhase === "Ovulatory Phase" ? OvulatoryPhase :
                        currentPhase === "Luteal Phase" ? "/images/luteal.png" : ""} 
                   alt="Current Phase" className="current-phase-image"/>
          </div>
  
          {/* Footer Buttons */}
          <div className="footer-buttons">
              <button onClick={() => navigate("/home")}>Home</button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to Top</button>
          </div>
      </div>
  );  
};

export default Dashboard;
