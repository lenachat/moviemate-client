import { useState } from 'react';
import "./signup-view.scss";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    <>
      <div class="welcome-message-container">
        <h1>Welcome to MovieMate!</h1>
        <h5>This is your ultimate companion for exploring the world of cinema!</h5>
      </div>

      <Card border="secondary">
        <Card.Body>
          <Card.Title>Sign up</Card.Title>
          <Card.Text>
            <Form onSubmit={handleSignup}>
              <Form.Group>
                <Form.Label>
                  Username:
                  <Form.Control className="name-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="2"
                    placeholder="required, min. 2 characters"
                  />
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Password:
                  <Form.Control className="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    pattern="\w{8,30}"
                    placeholder="required, min. 8 characters"
                  />
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Email:
                  <Form.Control className="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="required"
                  />
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Date of Birth:
                  <Form.Control className="birthday-input"
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
            <Link to={`/login`} className="link">
              <p>Already have an account? Login here.</p>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
