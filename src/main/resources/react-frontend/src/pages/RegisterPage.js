import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Register.css'; // Import the CSS styles
import { Modal, Alert } from 'react-bootstrap';

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const role = 'ROLE_UNASSIGNED'; // Set role to 'unassigned' by default
    try {
      await AuthService.register({ email, password, firstName, lastName, role });
      setShowSuccessModal(true); // Show the success modal
      setTimeout(() => {
        setShowSuccessModal(false); // Hide the modal after 3 seconds
        history.push('/login');  
      }, 2500); 
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
        <button type="submit" className="btn-primary btn-create-account-register">Register</button>

        {error && <Alert variant="danger">{error}</Alert>}

        <Modal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          dialogClassName="success-modal-dialog"
        >
        <Modal.Header closeButton className="success-modal-header">
          <Modal.Title>Registration Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="success-modal-body">
          <p>Congratulations! Your account has been created successfully.</p>
          <p>You will be redirected to the login page shortly.</p>
        </Modal.Body>
      </Modal>
      </form>
      
      <div className="login-link">
        Have an account? <a href="/login">Log In</a>
      </div>
    </div>
  );
}

export default Register;
