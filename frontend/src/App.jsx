import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar component
import LandingPage from "./assets/pages/LandingPage";
import LoginPage from "./assets/pages/LoginPage";
import SignupPage from "./assets/pages/SignupPage";
import Community from "./assets/pages/Community";
import CreateDiscussion from "./assets/pages/CreateDiscussion"; // Import the new CreateDiscussion component
import DiscussionDetails from "./assets/pages/DiscussionDetails"; // Import DiscussionDetails component
import Dashboard from "./assets/pages/Dashboard";
import FollicularPage from "./assets/pages/FollicularPage";
import OvulatoryPage from "./assets/pages/OvulatoryPage";
import LutealPage from "./assets/pages/LutealPage";
import MenstrualPage from "./assets/pages/MenstrualPage";
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute for secure pages
import { useAuth } from "./hooks/useAuth"; // Auth hook for user authentication
import "./index.css";


const App = () => {
  const { user, loading } = useAuth(); // Access the authenticated user
  const isAuthenticated = !!user; // Convert user object to a boolean for authentication state

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Community Routes */}
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
        <Route
          path="/community/new"
          element={
            isAuthenticated ? <CreateDiscussion /> : <LoginPage />
          }
        />
        <Route
          path="/community/discussion/:discussionId"
          element={
            isAuthenticated ? <DiscussionDetails /> : <LoginPage />
          }
        />

        {/* Dashboard */}
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
