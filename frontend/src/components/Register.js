import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from './api';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetchRegister({ email, password, name });

      if (response.success) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Create Your Account</h2>
        {error && <div className="register-error">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form-body">
          <div className="register-input-group">
            <label htmlFor="name" className="register-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="register-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="email" className="register-label">Email</label>
            <input
              type="email"
              id="email"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="password" className="register-label">Password</label>
            <input
              type="password"
              id="password"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>

        <div>
          <button type="submit" onClick={() => navigate('/login')} className="register-button regieter-logout">Login</button>
        </div>

      </div>
    </div>
  );
};

export default Register;
