import React from "react";
import "./MovieItem.css";

function MovieItem({ movie, onMovieSelect, isSelected }) {
  return (
    <div
      key={movie.episode_id}
      className={`movie-card ${isSelected ? "movie-card-selected" : ""}`}
      onClick={() => onMovieSelect(movie)}
    >
      <img src={movie.image_url} alt={movie.title} className="movie-image" />
      <div className="movie-title">{movie.title}</div>
    </div>
  );
}

export default MovieItem;
