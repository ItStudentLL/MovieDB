import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">MovieDB</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link
            to="/search"
            className={`nav-link ${isActive("/search") ? "active" : ""}`}
          >
            Discover
          </Link>
          <Link
            to="/watchlist"
            className={`nav-link ${isActive("/watchlist") ? "active" : ""}`}
          >
            Watchlist
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/search" className="icon-btn" title="Search">
            🔍
          </Link>
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
        <Link
          to="/"
          className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/search"
          className={`mobile-nav-link ${isActive("/search") ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Discover
        </Link>
        <Link
          to="/watchlist"
          className={`mobile-nav-link ${
            isActive("/watchlist") ? "active" : ""
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Watchlist
        </Link>
        <button
          className="mobile-nav-link"
          style={{
            textAlign: "left",
            background: "none",
            border: "none",
            width: "100%",
          }}
          onClick={() => {
            toggleTheme();
            setIsMobileMenuOpen(false);
          }}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
