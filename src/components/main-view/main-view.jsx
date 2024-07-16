import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://moviemate-mk9e.onrender.com/movies",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => response.json())
      .then((data) => {

        const movieFromAPI = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            description: doc.description,
            directorName: doc.director.name,
            directorBio: doc.director.biography,
            directorBirth: doc.director.birth,
            directorDeath: doc.director.death,
            genreName: doc.genre.name,
            genreDescription: doc.genre.description,
            imagePath: doc.imagePath,
            actors: doc.actors.join(', '),
            year: doc.year,
            age: doc.age,
            rating: doc.rating,
            length: doc.length
          };
        });
        setMovie(movieFromAPI);
      }).catch((error) => {
        console.error("Error fetching movies: ", error);
      });
  }, [token]);


  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    let similarMovies = movie.filter((movie) => movie.genreName === selectedMovie.genreName);
    let similarMoviesFiltered = similarMovies.filter((movie) => movie.title !== selectedMovie.title);
    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <hr />
        <h3>Similar Movies</h3>
        <div>
          {similarMoviesFiltered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }} />
          ))}
        </div>
      </>
    )
  }

  if (movie.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <>
      <div>
        {movie.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }} />
        ))}
      </div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
        Logout
      </button>
    </>

  );
};