import React, { useState } from 'react';
import './App.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Client-side validation
    if (username.trim() === '') {
      setErrorMessage('Username cannot be empty');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!password.match(passwordRegex)) {
      setErrorMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol');
      return;
    }

    // need to add logic if both password and username is correct 
  };

  const handleForgotPassword = () => {
    // Need to add logic for Forgot password page redirect

  };

  const handleSignUp = () => {
    // Need to add logic for sign up page redirect

  };

  return (
    <div className="login-page">
      <h1> Hoosier Room</h1>
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="additional-options">
          <button onClick={handleForgotPassword}>Forgot Password</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
