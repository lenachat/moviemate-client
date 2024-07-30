import { useState } from 'react';
import "./signup-view.scss";

import { Form, Button, Card } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch('https://moviemate-mk9e.onrender.com/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Signup response: ", data);
        if (data) {
          alert("Signup successful");
          window.location.reload();
        } else {
          response.json().then((data) => {
            alert("Signup failed " + data.message);
          });
        }
      }).catch((error) => {
        alert('Error:', error.message);
      });
  };

  return (
    <Card border="secondary">
      <Card.Body>
        <Card.Title>Sign up</Card.Title>
        <Card.Text>
          <Form onSubmit={handleSignup}>
            <Form.Group>
              <Form.Label>
                Username:
                <Form.Control className="name-input custom-input-text-color"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="2"
                />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Password:
                <Form.Control className="password-input custom-input-text-color"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  pattern="\w{8,30}"
                />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Email:
                <Form.Control className="email-input custom-input-text-color"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Date of Birth:
                <Form.Control className="custom-input-text-color"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder='YYYY-MM-DD'
                />
              </Form.Label>
            </Form.Group>
            <Button type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
