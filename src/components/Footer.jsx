import { Link } from "react-router-dom";
import { FaFilm } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-icon"><FaFilm /></span>
            <span className="logo-text">MovieDB</span>
          </Link>
          <p className="footer-desc">
            Your ultimate destination for discovering movies. Explore millions
            of films, track your favorites, and stay updated with the latest
            trends.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/search">Discover</Link>
            <Link to="/watchlist">Watchlist</Link>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} MovieDB. Powered by TMDB API. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
