import { useState } from "react";

export const MainView = () => {
  const [movies, setMovies] = useState([

    { id: 1, title: "Inception", description: "desc1", image: "image1", genre: "genre1", director: "director1", actors: "actors1" },
    { id: 2, title: "The Shawshank Redemption", description: "desc2", image: "image2", genre: "genre2", director: "director2", actors: "actors2" },
    { id: 3, title: "The Godfather", description: "desc3", image: "image3", genre: "genre3", director: "director3", actors: "actors3" }

  ]);

  return (
    <div>
      {movies.map((movies) => {
        return <div key={movies.id}>{movies.title}</div>;
      })}
    </div>
  );
};