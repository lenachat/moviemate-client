import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Button, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
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

        const moviesFromAPI = data.map((doc) => {
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
        setMovies(moviesFromAPI);
      }).catch((error) => {
        console.error("Error fetching movies: ", error);
      });
  }, [token, user]);

  const handleAddToFavorites = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleRemoveFromFavorites = (updatedUser) => {
    setUser(updatedUser);
  };

  const MovieDetail = () => {
    const { movieTitle } = useParams();
    const selectedMovie = movies.find((m) => m.title === movieTitle);

    const similarMovies = movies.filter(
      (movie) => movie.genreName === selectedMovie.genreName && movie.title !== selectedMovie.title
    );

    return (
      <Row md={2}>
        {similarMovies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }}
              user={user}
              onFavoriteAdded={handleAddToFavorites}
              onFavoriteRemoved={handleRemoveFromFavorites}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
      <Row className="justify-content-center movies-container">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/movies" />
                ) : (
                  <Col xs={12} md={10} lg={8} xl={6}>
                    <SignupView />
                  </Col>
                )
                }
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/movies" />
                ) : (
                  <Col xs={12} md={10} lg={8} xl={6} >
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                  </Col>
                )
                }
              </>
            }
          />
          <Route
            path="/movies/:movieTitle"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col className="main-view">The list is empty!</Col>
                ) : (
                  <Col xs={12} md={10} lg={8} xl={6}>
                    <MovieView
                      movies={movies}
                    />
                    <hr />
                    <h3>Similar Movies</h3>
                    <MovieDetail />
                  </Col>
                )
                }
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                {!user ?
                  (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col className="main-view">The list is empty!</Col>
                  ) : (
                    <>
                      <Row className="justify-content-center">
                        {movies.map((movie) => (
                          <Col xs={12} sm={6} md={4} lg={3} className="cols" key={movie.id}>
                            <MovieCard
                              movie={movie}
                              user={user}
                              onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }}
                              onFavoriteAdded={handleAddToFavorites}
                              onFavoriteRemoved={handleRemoveFromFavorites}
                            />
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
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ?
                  (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col className="main-view">The list is empty!</Col>
                  ) : (
                    <>
                      <Col xs={12} md={10} lg={8} xl={6}>
                        <ProfileView user={user} movies={movies} />
                      </Col>
                    </>
                  )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};