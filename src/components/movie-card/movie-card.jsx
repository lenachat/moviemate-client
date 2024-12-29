import PropTypes from "prop-types";
import React from 'react';
import { Button, ButtonGroup, ToggleButton, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, onFavoriteAdded, onFavoriteRemoved }) => {

  const { isFavorite, handleToggleFavorite } = useFavorites(movie, user, onFavoriteAdded, onFavoriteRemoved);

  return (
    <Card bg="primary" text="text-primary">
      <Card.Img className="card-img" variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genreName}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
          <Button variant="outline-secondary" className="details-button">View details</Button>
        </Link>
        <br />
        <ButtonGroup>
          <ToggleButton className="toggle-favorite"
            id="toggle-favorite"
            type="checkbox"
            variant="outline-secondary"
            checked={isFavorite}
            value="1"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </ToggleButton>
        </ButtonGroup>
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
    actors: PropTypes.string,
    year: PropTypes.string,
    age: PropTypes.string,
    rating: PropTypes.string,
    length: PropTypes.string,
  }).isRequired,
    onFavoriteAdded: PropTypes.func.isRequired,
    onFavoriteRemoved: PropTypes.func.isRequired
};