import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WatchlistProvider } from "./contexts/WatchlistContext";

function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;
