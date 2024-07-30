import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import { Button, Row, Col } from "react-bootstrap";

import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!user || !token) {
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
            directorDeath: doc.director.death ? doc.director.death : "-",
            genreName: doc.genre.name,
            genreDescription: doc.genre.description,
            imagePath: doc.imagePath,
            actors: Array.isArray(doc.actors) ? doc.actors.join(", ") : doc.actors,
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
  }, [token, user]);

  const similarMovies = selectedMovie ? movie.filter((movie) => movie.genreName === selectedMovie.genreName) : [];
  const similarMoviesFiltered = similarMovies.filter((movie) => movie.title !== selectedMovie.title);

  return (
    <Row className="justify-content-center">
      {!user ? (
        <Col xs={12} md={10} lg={8} xl={6} >
          <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
          <br />
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col xs={12} md={10} lg={8} xl={6}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
          <hr />
          <h3>Similar Movies</h3>
          <Row md={2}>
            {similarMoviesFiltered.map((movie) => (
              <Col key={movie.id}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }}
                />
              </Col>
            ))}
          </Row>
        </Col>
      ) : movie.length === 0 ? (
        <div className="main-view">The list is empty!</div>
      ) : (
        <>
          <Row className="justify-content-center">
            {movie.map((movie) => (
              <Col xs={12} sm={6} md={4} lg={3} className="cols" key={movie.id}>
                <MovieCard
                  movie={movie} onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }} />
              </Col>
            ))}
          </Row>
          <br />
          <Col xs="auto" className="cols">
            <Button variant="outline-secondary" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
              Logout
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};