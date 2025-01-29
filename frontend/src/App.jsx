import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./assets/pages/LandingPage";
import LoginPage from "./assets/pages/LoginPage";
import SignupPage from "./assets/pages/SignupPage";
import Community from "./assets/pages/Community";
import Dashboard from "./assets/pages/Dashboard";
import FollicularPage from "./assets/pages/FollicularPage";
import OvulatoryPage from "./assets/pages/OvulatoryPage";
import LutealPage from "./assets/pages/LutealPage";
import MenstrualPage from "./assets/pages/MenstrualPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/authContext";
import "./index.css";

const App = () => {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  // Prevent rendering until authentication state is determined
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />} />

        {/* Protected Community Routes */}
        <Route
          path="/community"
          element={isAuthenticated ? <Community /> : <Navigate to="/login" />}
        />
        
        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Public Cycle Pages */}
        <Route path="/cycles/follicular" element={<FollicularPage />} />
        <Route path="/cycles/ovulatory" element={<OvulatoryPage />} />
        <Route path="/cycles/luteal" element={<LutealPage />} />
        <Route path="/cycles/menstrual" element={<MenstrualPage />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
