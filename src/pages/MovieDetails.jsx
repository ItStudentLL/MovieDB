import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useWatchlist } from "../contexts/WatchlistContext";
import MovieCard from "../components/MovieCard";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching details", error);
        setError(error.message || "Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[var(--accent-primary)] text-white rounded hover:bg-[var(--accent-hover)]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!movie) return <div className="text-center py-20">Movie not found</div>;

  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div>
      {/* Movie Hero Section */}
      <section
        className="movie-hero"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        }}
      >
        <div className="movie-hero-overlay">
          <div className="movie-hero-content">
            <div className="movie-poster-large">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="movie-details">
              <h1 className="movie-details-title">
                {movie.title}{" "}
                <span className="year">
                  ({movie.release_date?.split("-")[0]})
                </span>
              </h1>
              <div className="movie-meta-line">
                <span className="rating-large">
                  ⭐ {movie.vote_average?.toFixed(1)}/10
                </span>
                <span className="separator">•</span>
                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
                <span className="separator">•</span>
                <span>{movie.adult ? "R" : "PG-13"}</span>
              </div>
              <div className="genre-tags">
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
              {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
              <div className="action-buttons">
                <button className="btn-primary">▶ Watch Trailer</button>
                <button
                  className="btn-secondary"
                  onClick={() =>
                    inWatchlist
                      ? removeFromWatchlist(movie.id)
                      : addToWatchlist(movie)
                  }
                >
                  {inWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="content-section">
        <h2 className="content-title">Overview</h2>
        <p className="overview-text">{movie.overview}</p>
      </section>

      {/* Info Grid */}
      <section className="content-section alt-bg">
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Status</span>
            <span className="info-value">{movie.status}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Release Date</span>
            <span className="info-value">{movie.release_date}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Budget</span>
            <span className="info-value">
              ${movie.budget?.toLocaleString()}
            </span>
          </div>
          <div className="info-card">
            <span className="info-label">Revenue</span>
            <span className="info-value">
              ${movie.revenue?.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      <section className="content-section">
        <h2 className="content-title">Top Billed Cast</h2>
        <div className="cast-row">
          {movie.credits?.cast?.slice(0, 10).map((person) => (
            <div key={person.id} className="cast-card">
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : "https://via.placeholder.com/185x185?text=No+Image"
                }
                alt={person.name}
                className="cast-photo"
              />
              <p className="cast-name">{person.name}</p>
              <p className="cast-character">{person.character}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      {movie.recommendations?.results?.length > 0 && (
        <section className="movie-section alt-bg">
          <div className="section-header">
            <h2 className="section-title">Recommendations</h2>
          </div>
          <div className="movie-row">
            {movie.recommendations.results.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetails;
