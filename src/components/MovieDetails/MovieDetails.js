import React, { useState, useEffect } from "react";
import "./MovieDetails.css";

function MovieDetails({ movie, onFavoriteToggle, favorites }) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (movie) {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="movie-details">
      <div className="movie-image-container">
        <img
          key={animationKey}
          src={movie.image_url}
          alt={movie.title}
          className="movie-details-image"
        />
      </div>
    </div>
  );
}

export default MovieDetails;
