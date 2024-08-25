import { useState } from 'react';
import { Form, Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

import "./login-view.scss";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    fetch('https://moviemate-mk9e.onrender.com/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("Login failed");
        }
      }).catch((error) => {
        alert('Error:', error.message);
      });
  };

  return (
    <Card border="secondary">
      <Card.Body>
        <Card.Title>Log in</Card.Title>
        <Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username:
                <Form.Control type="text" className="custom-input-text-color"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="2"
                />
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:
                <Form.Control type="password" className="custom-input-text-color"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8" />
              </Form.Label>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
          <Link to={`/signup`} className="link">
            <p>Don't have an account? Sign up here.</p>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};


