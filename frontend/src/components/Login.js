import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from './api';  // Make sure the API function is correctly imported
import './Login.css';  // Import the CSS file for login page

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous error messages

    try {
      // Call the login function and pass email and password
      const response = await fetchLogin({ email, password });

      if (response.success) {
        // If login is successful, trigger onLogin
        onLogin();
        navigate('/add-task');  // Redirect to the tasks page
      } else {
        setError('Wrong credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form-body">
          <div className="login-input-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <button type="submit" onClick={() => navigate('/register')} className="login-button">Register</button>
      </div>
    </div>
  );
};

export default Login;
