import { useState } from 'react';

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
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data);
        } else {
          alert("Login failed");
        }
      }).catch((error) => {
        alert('Error:', error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:
        <input type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="2" />
      </label>
      <label>Password:
        <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};


