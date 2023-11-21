import React, { useState, useEffect } from "react";
import { fetchMovies } from "@/services/api";
import MovieItem from "@/components/MovieItem/MovieItem";
import Loading from "@/components/Loading/Loading";
import "./MovieList.css";

function MovieList({ onMovieSelect }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    async function getMovies() {
      try {
        const data = await fetchMovies();

        const sortOrder = [1, 4, 2, 3, 5, 6];

        data.sort(
          (a, b) =>
            sortOrder.indexOf(a.episode_id) - sortOrder.indexOf(b.episode_id)
        );

        const updatedMovies = data.map((movie) => {
          return {
            ...movie,
            image_url: `/assets/${encodeURIComponent(movie.title)}.jpg`,
          };
        });
        setMovies(updatedMovies);
      } catch (error) {
        console.error("Failed fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovieId(movie.episode_id);
    onMovieSelect(movie);
  };

  return (
    <div className="movie-list">
      {isLoading ? (
        <Loading message="Loading Movies..." />
      ) : (
        movies.map((movie) => (
          <MovieItem
            key={movie.episode_id}
            movie={movie}
            onMovieSelect={handleMovieClick}
            isSelected={selectedMovieId === movie.episode_id}
          />
        ))
      )}
    </div>
  );
}

export default MovieList;
