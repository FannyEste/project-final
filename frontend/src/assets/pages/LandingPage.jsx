import React from "react";
import { Link } from "react-router-dom";
import BoxGrid from "../../components/BoxGrid"; // Import the BoxGrid component

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <p>Welcome to Hormonice!</p>
      
      {/* Navigation Links */}
      <nav>
        <Link to="/login">Go to Login</Link> | <Link to="/signup">Sign Up</Link>
      </nav>
      
      {/* BoxGrid Component */}
      <BoxGrid />
    </div>
  );
};

export default LandingPage;
