import React, { useEffect, useState } from 'react';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';
import { DeleteUser } from './delete-user';

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
      <UserInfo username={user.username} email={user.email} />
      <FavoriteMovies favMovies={favMovies} />
      <UpdateUser handleUpdate={handleUpdate} handleInputChange={handleInputChange} formValues={formValues} />
      <DeleteUser deleteUser={deleteUser} />
    </>
  );
};