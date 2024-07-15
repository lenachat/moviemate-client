import { useState } from 'react';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      access: username,
      secret: password,
    };

    fetch('https://moviemate-mk9e.onrender.com', {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:
        <input type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minlength="2" />
      </label>
      <label>Password:
        <input type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minlength="8" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};


