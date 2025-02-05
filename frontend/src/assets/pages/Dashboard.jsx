import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext.jsx";
import PeriodCalendar from "./PeriodCalendar";
import { calculatePhases } from "../../utils/cycleUtils";
import axios from "axios";
import "./Dashboard.css";
import OvulatoryPhase from "../../assets/eggs.svg";
import FollicularPhase from "../../assets/follicular-phase.svg";
import LutealPhase from "../../assets/luteal-phase.svg";
import MenstrualPhase from "../../assets/menstrual-phase.svg";
import NoDataImage from "../../assets/hero-test.svg"; // Placeholder image for no data
import { API_URL } from "../../config";

const Dashboard = () => {
    const { user } = useAuth();
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
    const [currentPhase, setCurrentPhase] = useState("No phase detected");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCycleData = async () => {
            if (!user) return;
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}/api/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data;

                setStartDate(data.startDate);
                setPeriodDuration(data.periodDuration);
                setCycleLength(data.cycleLength);
                setPhases(data.phases);
                determineCurrentPhase(data.phases);
            } catch (error) {
                console.error("Failed to fetch cycle data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCycleData();
    }, [user]);

    const saveCycleData = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${API_URL}/api/dashboard/update-cycle`,
                { phases, startDate, periodDuration, cycleLength },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Cycle data saved successfully!");
        } catch (error) {
            console.error("Failed to save cycle data:", error);
            alert("Failed to save cycle data.");
        }
    };

    useEffect(() => {
        if (startDate && cycleLength && periodDuration) {
            const updatedPhases = calculatePhases(startDate, cycleLength, periodDuration);
            setPhases(updatedPhases);
            determineCurrentPhase(updatedPhases);
        }
    }, [startDate, cycleLength, periodDuration]);

    const determineCurrentPhase = (phases) => {
        const today = new Date().toDateString();
        if (phases.menstrual.some(date => new Date(date).toDateString() === today)) {
            setCurrentPhase("Menstrual Phase");
        } else if (phases.follicular.some(date => new Date(date).toDateString() === today)) {
            setCurrentPhase("Follicular Phase");
        } else if (phases.ovulatory.some(date => new Date(date).toDateString() === today)) {
            setCurrentPhase("Ovulatory Phase");
        } else if (phases.luteal.some(date => new Date(date).toDateString() === today)) {
            setCurrentPhase("Luteal Phase");
        } else {
            setCurrentPhase("No phase detected");
        }
    };

    if (loading) return <p>Loading your cycle data...</p>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome, {user?.name || "User"}!</h1>

            {/* Current Phase Box */}
            <div className="current-phase-container">
                <h3>Current Phase: {currentPhase}</h3>
                
                {/* Show description based on the phase */}
                <p>{currentPhase === "Menstrual Phase" ? "Your body is shedding the uterine lining." : ""}</p>
                <p>{currentPhase === "Follicular Phase" ? "Your body is preparing for ovulation." : ""}</p>
                <p>{currentPhase === "Ovulatory Phase" ? "Ovulation occurs, and fertility is at its peak." : ""}</p>
                <p>{currentPhase === "Luteal Phase" ? "Your body prepares for a potential pregnancy." : ""}</p>

                {/* Show Image Based on the Phase */}
                <img 
                    src={
                        currentPhase === "Menstrual Phase" ? MenstrualPhase :
                        currentPhase === "Follicular Phase" ? FollicularPhase :
                        currentPhase === "Ovulatory Phase" ? OvulatoryPhase :
                        currentPhase === "Luteal Phase" ? LutealPhase :
                        NoDataImage // 👈 Show this if no phase is detected
                    } 
                    alt="Current Phase" 
                    className="current-phase-image"
                />

                {/* Invitation message when no data is logged */}
                {currentPhase === "No phase detected" && (
                    <div className="no-phase-message">
                        <p>You haven’t logged your cycle data yet.</p>
                        <p>Start tracking your cycle to receive accurate phase updates!</p>
                    </div>
                )}
            </div>

            {/* Configure Your Cycle and Calendar */}
            <div className="dashboard-layout">
                <div className="dashboard-content">
                    <h2>Configure Your Cycle</h2>

                    <label>How many days did your period last?</label>
                    <select value={periodDuration} onChange={(e) => setPeriodDuration(Number(e.target.value))}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>{day} days</option>
                        ))}
                    </select>

                    <label>How long is your menstrual cycle?</label>
                    <select value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))}>
                        {Array.from({ length: 15 }, (_, i) => i + 21).map(day => (
                            <option key={day} value={day}>{day} days</option>
                        ))}
                    </select>

                    <button onClick={saveCycleData} className="save-button">Save Data</button>
                </div>

                <div className="calendar-container">
                    <h2>Select when your last period started</h2>
                    <PeriodCalendar phases={phases} onStartDateSelect={setStartDate} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
