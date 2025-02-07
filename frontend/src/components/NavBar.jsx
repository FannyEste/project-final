import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import "./NavBar.css";
import LoginIcon from "../assets/login-icon.svg"; // Import your custom icon

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cyclesDropdownOpen, setCyclesDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrollToNews, setScrollToNews] = useState(false); // Track NEWS click intent

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
      setScrollToNews(true); // Mark intent to scroll
      navigate("/"); // Navigate to home
    } else {
      scrollToNewsSection(); // Scroll immediately if already on home
    }
    setMenuOpen(false);
  };

  // 🔹 Scroll to News Section
  const scrollToNewsSection = () => {
    const newsSection = document.getElementById("news-section");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
      setScrollToNews(false); // Reset intent after scrolling
    }
  };

  // 🔹 After navigation, scroll to NEWS if needed
  useEffect(() => {
    if (scrollToNews && window.location.pathname === "/") {
      setTimeout(scrollToNewsSection, 500); // Wait to ensure page is loaded before scrolling
    }
  }, [scrollToNews, window.location.pathname]);

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
              <Link to="/cycles/menstrual" className="dropdown-item" onClick={() => { 
                setMenuOpen(false); 
                setCyclesDropdownOpen(false); 
              }}>
                MENSTRUAL
              </Link>
              <Link to="/cycles/follicular" className="dropdown-item" onClick={() => { 
                setMenuOpen(false); 
                setCyclesDropdownOpen(false); 
              }}>
                FOLLICULAR
              </Link>
              <Link to="/cycles/ovulatory" className="dropdown-item" onClick={() => { 
                setMenuOpen(false); 
                setCyclesDropdownOpen(false); 
              }}>
                OVULATORY
              </Link>
              <Link to="/cycles/luteal" className="dropdown-item" onClick={() => { 
                setMenuOpen(false); 
                setCyclesDropdownOpen(false); 
              }}>
                LUTEAL
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