import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <p>Welcome to Hormonice!</p>
      <nav>
        <Link to="/login">Go to Login</Link> | <Link to="/signup">Sign Up</Link>
      </nav>
    </div>
  );
};

export default LandingPage;
