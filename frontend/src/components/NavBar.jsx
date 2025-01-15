import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/Hormoniceblack.svg";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Connects to your authentication system
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
      <img src={Logo} alt="Logo" />


      </Link>

      {/* Navigation Links */}
      <nav className="navbar-menu">
        <Link to="/" className="navbar-link">
          HOME
        </Link>
        <div className="navbar-dropdown">
          <span className="navbar-link">CYCLES</span>
          <div className="dropdown-menu">
            <Link to="/cycles/follicular" className="dropdown-item">
              FOLLICULAR
            </Link>
            <Link to="/cycles/ovulatory" className="dropdown-item">
              OVULATORY
            </Link>
            <Link to="/cycles/luteal" className="dropdown-item">
              LUTEAL
            </Link>
            <Link to="/cycles/menstrual" className="dropdown-item">
              MENSTRUAL
            </Link>
          </div>
        </div>
        <Link to="/community" className="navbar-link">
          COMMUNITY
        </Link>
        <Link to="/blog" className="navbar-link">
          BLOG
        </Link>
        <Link to="/news" className="navbar-link">
          NEWS
        </Link>
      </nav>

      {/* Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
        <button className="search-icon">
          🔍
        </button>
      </div>

      {/* Login Icon */}
      <div className="navbar-login" onClick={handleLoginClick}>
        <span>🔑</span>
      </div>
    </header>
  );
};

export default Navbar;
