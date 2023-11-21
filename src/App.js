import React, { useState, useEffect, useRef } from "react";
import MovieList from "@/components/MovieList/MovieList";
import MovieDetails from "@/components/MovieDetails/MovieDetails";
import "./App.css";

function App() {
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(initialFavorites);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

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

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  function handleMovieSelect(movie) {
    setSelectedMovie(movie);
  }

  return (
    <div>
      <audio ref={audioRef} src="/assets/Theme.mp3" loop />
      <button className="play-button" onClick={togglePlayPause}>
        {isPlaying ? "🔊" : "🔈"}
      </button>
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
