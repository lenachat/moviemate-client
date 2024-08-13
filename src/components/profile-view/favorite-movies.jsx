import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ favMovies, user }) => {
  return (
    <div>
      <>
        <Row>
          <Col>
            <h1>Favorite Movies</h1>
          </Col>
        </Row>
        <Row>
          {favMovies.length === 0 ? (
            <p>No favorite movies yet.</p>
          ) : (
            favMovies.map((movie) => (
              <Col sm={12} md={3} key={movie.id} className="favorite-movie">
                <MovieCard 
                movie={movie} 
                user={user} 
              />
              </Col>
            ))
          )}
        </Row>
      </>
    </div>

  );
}