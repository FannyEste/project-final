import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import "./NavBar.css";
import LoginIcon from "../assets/login-icon.svg"; // Import your custom icon

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cyclesDropdownOpen, setCyclesDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/account");
    }
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCyclesDropdown = () => {
    setCyclesDropdownOpen(!cyclesDropdownOpen);
  };

  // 🔹 Scroll to News Section (Navigate First If Needed)
  const handleScrollToNews = () => {
    if (window.location.pathname !== "/") {
      navigate("/"); // Navigate to home first
      setTimeout(() => {
        const newsSection = document.getElementById("news-section");
        if (newsSection) {
          newsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Wait for page transition before scrolling
    } else {
      const newsSection = document.getElementById("news-section");
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`line ${menuOpen ? "open" : ""}`}></span>
        <span className={`line ${menuOpen ? "open" : ""}`}></span>
        <span className={`line ${menuOpen ? "open" : ""}`}></span>
      </div>

      <nav className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
          HOME
        </Link>
        <div className="navbar-dropdown">
          <span className="navbar-link" onClick={toggleCyclesDropdown}>
            CYCLES
          </span>
          {cyclesDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/cycles/follicular" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                FOLLICULAR
              </Link>
              <Link to="/cycles/ovulatory" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                OVULATORY
              </Link>
              <Link to="/cycles/luteal" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                LUTEAL
              </Link>
              <Link to="/cycles/menstrual" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                MENSTRUAL
              </Link>
            </div>
          )}
        </div>
        <Link to="/community" className="navbar-link" onClick={() => setMenuOpen(false)}>
          COMMUNITY
        </Link>
        {/* 🔹 Clicking "News" navigates and scrolls */}
        <span className="navbar-link" onClick={handleScrollToNews}>
          NEWS
        </span>
      </nav>

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
