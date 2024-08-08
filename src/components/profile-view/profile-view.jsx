import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ movies, user }) => {
  const [userData, setUserData] = useState(user);
  const [formValues, setFormValues] = useState({
    username: user.username,
    password: '',
    email: user.email,
    birthday: user.birthday,
  });
  const [favMovies, setFavMovies] = useState([]);
  const userId = userData._id;

  useEffect(() => {
    fetch(`https://moviemate-mk9e.onrender.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log('Fetched user data: ', data);
        setFormValues({
          username: data.username,
          email: data.email,
          birthday: data.birthday
        });
        let favoriteMovies = String(data.favorites);
        console.log('Favorite movies: ', favoriteMovies);
        let filteredMovies = movies.filter((movie) => favoriteMovies.includes(movie.id));
        setFavMovies(filteredMovies);
        console.log('Filtered movies: ', filteredMovies);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [user._id, movies]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    //update object only with changed fields
    const updatedValues = {};
    if (formValues.username !== user.username) {
      updatedValues.username = formValues.username;
    }
    if (formValues.password) { updatedValues.password = formValues.password; }
    if (formValues.email !== user.email) {
      updatedValues.email = formValues.email;
    }
    if (formValues.birthday !== user.birthday) { updatedValues.birthday = formValues.birthday; }


    fetch(`https://moviemate-mk9e.onrender.com/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedValues),
    }).then((response) => response.json())
      .then((data) => {
        alert('Profile updated successfully');
        setUserData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
    user.username = formValues.username;
    user.email = formValues.email;
  };

  const deleteUser = () => {
    fetch(`https://moviemate-mk9e.onrender.com/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.text())
      .then(() => {
        alert('User deleted successfully');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/signup', '_self');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      <div className="profile-view">
        <h1>Profile</h1>
        {user ? (
          <div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
      <div>
        <h1>Favorite Movies</h1>
        {favMovies.length === 0 ? (
          <p>No favorite movies yet.</p>
        ) : (
          favMovies.map((movie) => (
            <div key={movie.id} className="favorite-movie">
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>
      <div>
        <h1>Update User data</h1>
        <Form onSubmit={handleUpdate}>
          <Form.Group>
            <Form.Label>
              Username:
              <Form.Control className="custom-input-text-color"
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
                minLength="2"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Password:
              <Form.Control className="custom-input-text-color"
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                minLength="8"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Email:
              <Form.Control className="custom-input-text-color"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Date of Birth:
              <Form.Control className="custom-input-text-color"
                type="date"
                name="birthday"
                value={formValues.birthday}
                onChange={handleInputChange}
              />
            </Form.Label>
          </Form.Group>
          <Button type="submit">
            Update
          </Button>
        </Form>
      </div>
      <div>
        <h1>Delete User Account</h1>
        <Button onClick={deleteUser}>
          Delete
        </Button>
      </div>
    </>
  );
};