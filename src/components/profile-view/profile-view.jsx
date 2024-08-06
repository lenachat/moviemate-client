import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";

export const ProfileView = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const [formValues, setFormValues] = useState({
    username: user.username,
    password: '',
    email: user.email,
    birthday: user.birthday,
  });

  useEffect(() => {
    fetch(`https://moviemate-mk9e.onrender.com/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
        setFormValues({
          username: data.username,
          password: data.password,
          email: data.email,
          birthday: data.birthday
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userId = userData._id;
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
    </>
  );
};