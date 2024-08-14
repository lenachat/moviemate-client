import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //loads user data whenever token changes (on login)
  useEffect(() => {
    if (user && token) {
      fetch(`https://moviemate-mk9e.onrender.com/users/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [token]);

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
        setFilteredMovies(moviesFromAPI);
      }).catch((error) => {
        console.error("Error fetching movies: ", error);
      });
  }, [token, user]);

  const handleAddToFavorites = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleRemoveFromFavorites = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const onSearchMovie = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (!searchValue) {
      setFilteredMovies(movies); // Show all movies if search is cleared
      return;
    }

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchValue)
    );

    setFilteredMovies(filtered); // Update the filtered movies state
  };

  const SimilarMovies = () => {
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
      <NavigationBar user={user} movies={movies}
        onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }}
        onSearchMovie={onSearchMovie} />
      <Row className="justify-content-center movies-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {user ? (
                  <Navigate to="/movies" />
                ) : (
                  <Navigate to="/login" />
                )
                }
              </>
            }
          />
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
                    <LoginView onLoggedIn={handleLogin} />
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
                    <SimilarMovies />
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
                        {filteredMovies.map((movie) => (
                          <Col sm={12} md={6} lg={4} xl={3} className="cols" key={movie.id}>
                            <MovieCard
                              movie={movie}
                              user={user}
                              onFavoriteAdded={handleAddToFavorites}
                              onFavoriteRemoved={handleRemoveFromFavorites}
                            />
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
              </>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <>
                {!user ?
                  (
                    <Navigate to="/login" replace />
                  ) : (
                    <>
                      <Col xs={12} md={10} >
                        <ProfileView user={user} movies={movies} 
                         onFavoriteAdded={handleAddToFavorites}
                         onFavoriteRemoved={handleRemoveFromFavorites}
                        />
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