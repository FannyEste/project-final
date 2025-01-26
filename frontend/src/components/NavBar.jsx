import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Import useAuth hook
import "./Navbar.css";
import Logo from "../assets/logo.svg";
import LoginIcon from "../assets/login-icon.svg"; // Import your custom icon

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const [cyclesDropdownOpen, setCyclesDropdownOpen] = useState(false); // State for CYCLES dropdown
  const { user, logout } = useAuth(); // Get user and logout function from useAuth
  const navigate = useNavigate();

  const handleAccountClick = () => {
    console.log("User in Navbar:", user); // Add this
    if (user) {
      navigate("/dashboard"); // Redirect to Dashboard if logged in
    } else {
      navigate("/login"); // Redirect to Login if not logged in
    }
    setMenuOpen(false); // Close menu on navigation
  };

  const handleLogout = () => {
    logout(); // Clear token and user state
    navigate("/"); // Redirect to the homepage
    setMenuOpen(false); // Close menu on navigation
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle hamburger menu
  };

  const toggleCyclesDropdown = () => {
    setCyclesDropdownOpen(!cyclesDropdownOpen); // Toggle CYCLES dropdown
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </Link>

      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`line ${menuOpen ? "open" : ""}`}></span>
        <span className={`line ${menuOpen ? "open" : ""}`}></span>
        <span className={`line ${menuOpen ? "open" : ""}`}></span>
      </div>

      {/* Navigation Menu */}
      <nav className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
          HOME
        </Link>
        <div className="navbar-dropdown">
          <span
            className="navbar-link"
            onClick={toggleCyclesDropdown} // Toggle dropdown on click
          >
            CYCLES
          </span>
          {cyclesDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/cycles/follicular"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                FOLLICULAR
              </Link>
              <Link
                to="/cycles/ovulatory"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                OVULATORY
              </Link>
              <Link
                to="/cycles/luteal"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                LUTEAL
              </Link>
              <Link
                to="/cycles/menstrual"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                MENSTRUAL
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/community"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          COMMUNITY
        </Link>
        <Link
          to="/blog"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          BLOG
        </Link>
        <Link
          to="/news"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          NEWS
        </Link>
      </nav>

      {/* Account Section */}
      <div className="navbar-account">
        {user ? (
          <>
            <div className="navbar-login" onClick={handleAccountClick}>
              <img src={LoginIcon} alt="Account Icon" className="login-icon" />
              <span className="login-text">Profile</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <div className="navbar-login" onClick={handleAccountClick}>
            <img src={LoginIcon} alt="Login Icon" className="login-icon" />
            <span className="login-text">Account</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
