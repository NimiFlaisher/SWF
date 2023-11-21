import React, { useState, useEffect } from "react";
import MovieList from "@/components/MovieList/MovieList";
import MovieDetails from "@/components/MovieDetails/MovieDetails";
import "./App.css";

function App() {
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(initialFavorites);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const getBackgroundImageUrl = () => {
    return selectedMovie
      ? selectedMovie.image_url
      : `${process.env.PUBLIC_URL}/assets/DefaultBackground.jpg`;
  };

  const handleFavorite = (movie) => {
    if (favorites.some((fav) => fav.episode_id === movie.episode_id)) {
      setFavorites(
        favorites.filter((fav) => fav.episode_id !== movie.episode_id)
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  function handleMovieSelect(movie) {
    setSelectedMovie(movie);
  }

  return (
    <div>
      <div
        className="background-container"
        style={{
          backgroundImage: `url(${getBackgroundImageUrl()})`,
          filter: isLoading ? "none" : "blur(8px)",
        }}
      />
      <div className="app-container">
        <MovieDetails
          movie={selectedMovie}
          onFavoriteToggle={handleFavorite}
          favorites={favorites}
        />
        <MovieList
          onMovieSelect={handleMovieSelect}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
