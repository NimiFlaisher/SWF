import React, { useState, useEffect } from "react";
import "./MovieDetails.css";

function MovieDetails({ movie, onFavoriteToggle, favorites }) {
  const [animationKey, setAnimationKey] = useState(0);
  const [animateStar, setAnimateStar] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (movie) {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [movie]);

  if (!movie) return null;

  const titleWords = movie.title.split(" ");

  const handleFavoriteClick = () => {
    if (buttonDisabled) return;

    setButtonDisabled(true);
    setAnimateStar(true);
    setTimeout(() => {
      onFavoriteToggle(movie);
      setAnimateStar(false);
      setButtonDisabled(false);
    }, 500);
  };

  const isFavorite =
    movie && favorites.some((fav) => fav.episode_id === movie.episode_id);

  return (
    <div className="movie-details">
      <div className="movie-image-container">
        <div className="movie-title-overlay">
          {titleWords.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </div>
        <img
          key={animationKey}
          src={movie.image_url}
          alt={movie.title}
          className="movie-details-image"
        />
        <button
          className={`movie-details-favorite-button ${
            isFavorite ? "movie-details-favorite-button--active" : ""
          } ${animateStar ? "animate-star" : ""}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "★" : "☆"}{" "}
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
