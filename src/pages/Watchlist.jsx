import { Link } from "react-router-dom";
import { useWatchlist } from "../contexts/WatchlistContext";
import { FaStar, FaFilm } from "react-icons/fa";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">My Watchlist</h1>
        <p className="page-subtitle">
          {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} saved
          to watch later
        </p>
      </header>

      <section className="watchlist-section">
        {watchlist.length > 0 ? (
          <div className="watchlist-grid">
            {watchlist.map((movie) => (
              <div key={movie.id} className="watchlist-card">
                <div className="movie-poster">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Poster"
                    }
                    alt={movie.title}
                  />
                </div>
                <div className="watchlist-info">
                  <Link to={`/movie/${movie.id}`} className="movie-title">
                    {movie.title}
                  </Link>
                  <p className="movie-meta">
                    {movie.release_date?.split("-")[0]} • <FaStar className="text-yellow-500" />{" "}
                    {movie.vote_average?.toFixed(1)}
                  </p>
                  <p className="movie-overview">{movie.overview}</p>
                  <div className="watchlist-actions">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="btn-small btn-primary"
                    >
                      View Details
                    </Link>
                    <button
                      className="btn-small btn-danger"
                      onClick={() => removeFromWatchlist(movie.id)}
                    >
                      Remove from Watchlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-content">
              <span className="empty-icon"><FaFilm /></span>
              <h2>Your watchlist is empty</h2>
              <p>
                Explore movies and add them to your watchlist to keep track of
                what you want to watch.
              </p>
              <Link
                to="/search"
                className="btn-primary"
                style={{ display: "inline-block", marginTop: "24px" }}
              >
                Discover Movies
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Watchlist;
