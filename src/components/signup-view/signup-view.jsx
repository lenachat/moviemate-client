import { useState } from 'react';

export const SignupView = ({ onSignedUp }) => {
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

    fetch('https://moviemate-mk9e.onrender.com', {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });

  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minlength="2"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minlength="8"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};
