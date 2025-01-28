import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Updated import for Navbar
import LandingPage from "./assets/pages/LandingPage";
import LoginPage from "./assets/pages/LoginPage";
import SignupPage from "./assets/pages/SignupPage";
import Community from "./assets/pages/Community";
import Dashboard from "./assets/pages/Dashboard";
import FollicularPage from "./assets/pages/FollicularPage";
import OvulatoryPage from "./assets/pages/OvulatoryPage";
import LutealPage from "./assets/pages/LutealPage";
import MenstrualPage from "./assets/pages/MenstrualPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure your ProtectedRoute is properly implemented
import { useAuth } from "./hooks/useAuth"; // Import useAuth for authentication checks
import "./index.css";

const App = () => {
  const { user } = useAuth(); // Access the authenticated user
  const isAuthenticated = !!user; // Convert user object to a boolean for authentication state

  return (
    <>
      {/* Navbar is always displayed */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Community Route: Redirects to login if not authenticated */}
        <Route
          path="/community"
          element={
            isAuthenticated ? (
              <Community isAuthenticated={isAuthenticated} />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Dashboard (Protected Route Example) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Cycle Pages */}
        <Route path="/cycles/follicular" element={<FollicularPage />} />
        <Route path="/cycles/ovulatory" element={<OvulatoryPage />} />
        <Route path="/cycles/luteal" element={<LutealPage />} />
        <Route path="/cycles/menstrual" element={<MenstrualPage />} />
      </Routes>
    </>
  );
};

export default App;
