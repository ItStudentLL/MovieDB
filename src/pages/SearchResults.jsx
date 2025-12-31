import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = query ? await searchMovies(query) : [];
        setMovies(results);
      } catch (error) {
        console.error("Search error", error);
        setError(error.message || "Failed to search movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchInput)}`);
  };

  return (
    <div>
      {/* Search Header */}
      <section className="search-header">
        <form className="search-bar-inline" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for movies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => setSearchInput("")}
            >
              ✕
            </button>
          )}
        </form>
        {query && (
          <p className="search-results-count">
            Showing results for <strong>"{query}"</strong>
          </p>
        )}
      </section>

      {/* Results Section */}
      <section className="results-section">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="results-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-content">
              <span className="empty-icon">🔍</span>
              <h2>No results found</h2>
              <p>
                We couldn't find any movies matching "{query}". Try different
                keywords.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
