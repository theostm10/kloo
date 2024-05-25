import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      history.push('/'); // Redirect to the homepage or dashboard
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-login">Login</button>
      </form>
      <div className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default withRouter(Login);
