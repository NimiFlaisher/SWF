import React from "react";
import "./MovieItem.css";

function MovieItem({ movie, onMovieSelect }) {
  return (
    <div
      key={movie.episode_id}
      className="movie-card"
      onClick={() => onMovieSelect(movie)}
    >
      <img src={movie.image_url} alt={movie.title} className="movie-image" />
    </div>
  );
}

export default MovieItem;
