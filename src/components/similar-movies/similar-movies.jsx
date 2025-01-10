import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const SimilarMovies = ({ user, movies, onFavoriteAdded, onFavoriteRemoved }) => {
  const { movieTitle } = useParams();
  console.log(movieTitle);
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
            onFavoriteAdded={onFavoriteAdded}
            onFavoriteRemoved={onFavoriteRemoved}
          />
        </Col>
      ))}
    </Row>
  );
};