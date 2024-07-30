import PropTypes from "prop-types";
import { Button, Container, Card } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card bg="primary" text="text-primary">
      <Card.Img className="card-img" variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genreName}</Card.Text>
        <Button variant="outline-secondary" onClick={() => onMovieClick(movie)}>View details</Button>{' '}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      biograpyh: PropTypes.string,
      birth: PropTypes.string,
      death: PropTypes.string
    }),
    imagePath: PropTypes.string,
    actors: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.string,
    age: PropTypes.string,
    rating: PropTypes.string,
    length: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};