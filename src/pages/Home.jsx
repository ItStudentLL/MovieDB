import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
} from "../services/api";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [trendingData, popularData, topRatedData] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
        ]);
        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
      } catch (error) {
        console.error("Error loading movies:", error);
        setError(error.message || "Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">⚠️ Error Loading Movies</h2>
        <p className="text-lg mb-4">{error}</p>
        {error.includes("API Key") && (
          <div className="bg-gray-800 p-6 rounded-lg max-w-md text-left text-gray-300">
            <p className="mb-2">To fix this:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Get an API Key from <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">TMDB</a>.</li>
              <li>Open the <code className="bg-gray-900 px-2 py-1 rounded">.env</code> file in your project root.</li>
              <li>Replace <code className="bg-gray-900 px-2 py-1 rounded">YOUR_API_KEY_HERE</code> with your actual key.</li>
              <li>Restart the development server.</li>
            </ol>
          </div>
        )}
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 px-6 py-2 bg-[var(--accent-primary)] text-white rounded-full hover:bg-[var(--accent-hover)] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Favorite Movie</h1>
          <p className="hero-subtitle">
            Explore millions of movies, create your watchlist, and find your
            next binge-worthy film.
          </p>
          <form className="search-bar-large" onSubmit={handleSearch}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for movies, actors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="movie-section">
        <div className="section-header">
          <h2 className="section-title">🔥 Trending Now</h2>
          <button onClick={() => navigate("/search")} className="view-all">
            View All →
          </button>
        </div>
        <div className="movie-row">
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Popular Movies */}
      <section className="movie-section alt-bg">
        <div className="section-header">
          <h2 className="section-title">✨ Popular Hits</h2>
          <button onClick={() => navigate("/search")} className="view-all">
            View All →
          </button>
        </div>
        <div className="movie-row">
          {popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="movie-section">
        <div className="section-header">
          <h2 className="section-title">🏆 Top Rated</h2>
          <button onClick={() => navigate("/search")} className="view-all">
            View All →
          </button>
        </div>
        <div className="movie-row">
          {topRated.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
