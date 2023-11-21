import React from "react";
import "./MovieDetails.css";

function MovieDetails({ movie, onFavoriteToggle, favorites }) {
  if (!movie) return null;

  return (
    <div className="movie-details">
      <div className="movie-image-container">
        <img
          src={movie.image_url}
          alt={movie.title}
          className="movie-details-image"
        />
      </div>
    </div>
  );
}

export default MovieDetails;
