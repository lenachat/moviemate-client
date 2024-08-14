import { useState, useEffect } from "react";

export const useFavorites = (movie, user, onFavoriteAdded, onFavoriteRemoved) => {
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

  return { isFavorite, handleToggleFavorite };
}