import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./assets/pages/LandingPage";
import Account from "./assets/pages/Account";
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

      {/* Routes for navigation */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/account" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Account />} />
        <Route path="/community" element={isAuthenticated ? <Community /> : <Navigate to="/account" />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
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
