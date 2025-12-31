const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const checkApiKey = () => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error("Invalid API Key: Please set VITE_TMDB_API_KEY in your .env file");
  }
};

export const getPopularMovies = async () => {
  try {
    checkApiKey();
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch popular movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error; // Re-throw to handle in component
  }
};

export const getTrendingMovies = async () => {
  try {
    checkApiKey();
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch trending movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getTopRatedMovies = async () => {
  try {
    checkApiKey();
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error("Failed to fetch top rated movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    checkApiKey();
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&language=en-US&page=1&include_adult=false`
    );
    if (!response.ok) throw new Error("Failed to search movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    checkApiKey();
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,recommendations`
    );
    if (!response.ok) throw new Error("Failed to fetch movie details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
