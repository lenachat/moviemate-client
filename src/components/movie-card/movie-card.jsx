import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, ToggleButton, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";
import { useEffect, useState } from "react";

export const MovieCard = ({ movie, user, onFavoriteAdded, onFavoriteRemoved }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.favorites) {
      setIsFavorite(user.favorites.includes(movie.id));
    }
  }, [user, movie.id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFromFavorites();
    } else {
      handleAddToFavorites();
    }
    setIsFavorite(!isFavorite);
  }

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
        setIsFavorite(true);
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
        setIsFavorite(false);
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
        <br />
        <ButtonGroup>
          <ToggleButton
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
  // onFavoriteAdded: PropTypes.func.isRequired,
  // onFavoriteRemoved: PropTypes.func.isRequired
};