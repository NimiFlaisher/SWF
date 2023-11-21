import React from "react";

function MovieItem({ movie, onMovieSelect }) {
  return (
    <div key={movie.episode_id}>
      <button onClick={() => onMovieSelect(movie)}>View {movie.title}</button>
    </div>
  );
}

export default MovieItem;
