import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js"; // Import useAuth
import ProfileInfo from "./ProfileInfo"; // Import ProfileInfo Component
import PeriodCalendar from "./PeriodCalendar"; // Import PeriodCalendar Component
import HormonalPhase from "./HormonalPhase"; // Import HormonalPhase Component
import { calculatePhases } from "../../utils/cycleUtils"; // Import calculatePhases utility
import "./Dashboard.css";

const Dashboard = () => {
  const { user, loading, logout } = useAuth(); // Use useAuth
  const navigate = useNavigate();

  // State to store calculated phases and current hormonal phase
  const [phases, setPhases] = useState({
    menstrual: [],
    follicular: [],
    ovulatory: [],
    luteal: [],
  });
  const [currentPhase, setCurrentPhase] = useState("");

  // Fetch and calculate data after component mounts
  useEffect(() => {
    const fetchAndCalculatePhases = async () => {
      try {
        if (user && user.startDate && user.cycleLength && user.periodDuration) {
          // Calculate the phases based on user's cycle data
          const calculatedPhases = calculatePhases(
            user.startDate,
            user.cycleLength,
            user.periodDuration
          );
          setPhases(calculatedPhases);

          // Fetch current hormonal phase from the backend (optional)
          const phaseData = await fetch("/api/cycles/current-phase").then((res) =>
            res.json()
          );
          setCurrentPhase(phaseData.phase);
        } else {
          console.error("User data is incomplete. Missing startDate, cycleLength, or periodDuration.");
        }
      } catch (error) {
        console.error("Error fetching or calculating phases:", error);
      }
    };

    fetchAndCalculatePhases();
  }, [user]); // Recalculate when user data changes

  // Handle profile updates
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const startDate = user.startDate || new Date().toISOString().split("T")[0];
      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedProfile, startDate }),
      });

      // Update the user object and recalculate phases
      user.startDate = startDate;
      user.cycleLength = updatedProfile.cycleLength;
      user.periodDuration = updatedProfile.periodDuration;

      const recalculatedPhases = calculatePhases(
        startDate,
        updatedProfile.cycleLength,
        updatedProfile.periodDuration
      );
      setPhases(recalculatedPhases);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    console.log("Loading user...");
    return <div>Loading your profile...</div>;
  }

  if (!user) {
    console.log("No user detected, redirecting to login...");
    navigate("/login"); // Redirect to login if not authenticated
    return null;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <p>Your email: {user.email}</p>

      {/* Profile Info Section */}
      <ProfileInfo user={user} onUpdate={handleProfileUpdate} />

      {/* Period Calendar Section */}
      <PeriodCalendar phases={phases} onDateClick={() => {}} />

      {/* Hormonal Phase Section */}
      <HormonalPhase currentPhase={currentPhase} />

      {/* Logout Button */}
      <button
        onClick={() => {
          logout(); // Call logout function
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
