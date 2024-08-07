import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";
import { useState } from "react";

export const MovieCard = ({ movie, user, onFavoriteAdded, onFavoriteRemoved }) => {

  const handleAddToFavorites = () => {
    fetch(`https://moviemate-mk9e.onrender.com/users/${user._id}/favorites/${movie.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => response.json())
      .then((data) => {
        onFavoriteAdded(data);
        console.log('Movie added to favorites: ', data);
      }).catch((error) => {
        console.error('Error adding movie to favorites: ', error.message);
      });
  };

  const handleRemoveFromFavorites = () => {
    fetch(`https://moviemate-mk9e.onrender.com/users/${user._id}/favorites/${movie.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => response.json())
      .then((data) => {
        onFavoriteRemoved(data);
        console.log('Movie removed from favorites: ', data);
      }).catch((error) => {
        console.error('Error removing movie from favorites: ', error.message);
      });
  };

  return (
    <Card bg="primary" text="text-primary">
      <Card.Img className="card-img" variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genreName}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
          <Button variant="outline-secondary">View details</Button>
        </Link> <br />
        <Link>
          <Button variant="outline-secondary" onClick={handleAddToFavorites}>
            Add to favorites
          </Button>
        </Link> <br />
        <Link>
          <Button variant="outline-secondary" onClick={handleRemoveFromFavorites}>
            Remove from favorites
          </Button>
        </Link>
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