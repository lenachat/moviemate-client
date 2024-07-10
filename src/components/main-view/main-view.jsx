import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movie, setMovie] = useState([

    { id: 1, title: "Inception", description: "desc1", image: "image1", genre: "genre1", director: "director1", actors: "actors1" },
    { id: 2, title: "The Shawshank Redemption", description: "desc2", image: "image2", genre: "genre2", director: "director2", actors: "actors2" },
    { id: 3, title: "The Godfather", description: "desc3", image: "image3", genre: "genre3", director: "director3", actors: "actors3" }

  ]);


  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) return <MovieView movie={selectedMovie} />;

  if (movie.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div>
      {movie.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }} />
      ))}
    </div>
  );
};