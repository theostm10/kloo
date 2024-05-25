import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Register.css'; // Import the CSS styles

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register({ email, password, firstName, lastName, role });
      // Redirect logic here
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>

      <form onSubmit={handleRegister} className="register-form">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            className="form-input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            className="form-input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            className="form-input"
            placeholder="Email Address"
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
        <div className="input-group">
          <FaLock className="input-icon" />
          <select 
            className="form-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_CLIENT">Client</option>
            <option value="ROLE_DEPOSIT_MANAGER">Manager Depozit</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-create-account">Create Account</button>
      </form>
      
      <div className="login-link">
        Have an account? <a href="/login">Log In</a>
      </div>
    </div>
  );
}

export default Register;
