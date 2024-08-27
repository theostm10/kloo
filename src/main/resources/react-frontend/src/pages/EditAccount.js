import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../services/UserService';
import '../styles/EditAccount.css';

function EditAccountPage() {
  const { userEmail } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch the current user details and pre-fill the form fields
    UserService.getUserByEmail(email)
      .then(response => {
        const user = response.data;
        setFirstName(user.firstName);
        setLastName(user.lastName);
      })
      .catch(err => {
        console.error('Failed to fetch user details:', err);
      });
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      await UserService.updateUser({
        firstName,
        lastName,
        email,
        currentPassword,
        newPassword
      });
      setSuccess('Account updated successfully.');
    } catch (err) {
      setError('Failed to update account.');
      console.error('Account update failed:', err);
    }
  };

  return (
    <div className="edit-account-container">
      <h1>Edit My Account</h1>
      <form onSubmit={handleSubmit} className="edit-account-form">
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled
          />
        </div>
        <div className="input-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditAccountPage;
