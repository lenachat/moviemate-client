import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movie, setMovie] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://moviemate-mk9e.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {

        const movieFromAPI = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            description: doc.description,
            director: doc.director.name,
            genre: doc.genre.name
          };
        });
        setMovie(movieFromAPI);
      });
  }, []);

  if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;

  if (movie.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div>
      {movie.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }} />
      ))}
    </div>
  );
};