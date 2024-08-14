import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ favMovies, user, onFavoriteAdded, onFavoriteRemoved }) => {
  return (
    <div>
      <>
        <Row>
          <Col>
            <h1>Favorite Movies</h1>
          </Col>
        </Row>
        <Row md={12}>
          {favMovies.length === 0 ? (
            <p>No favorite movies yet.</p>
          ) : (
            favMovies.map((movie) => (
              <Col sm={12} md={6} lg={4} xl={3} key={movie.id} className="favorite-movie">
                <MovieCard
                  movie={movie}
                  user={user}
                  onFavoriteAdded={onFavoriteAdded}
                  onFavoriteRemoved={onFavoriteRemoved}
                />
              </Col>
            ))
          )}
        </Row>
      </>
    </div>

  );
}