import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/LandingPage.css';

function LandingPage() {
  const { isAuthenticated } = useAuth(); // Get the authentication status

  return (
    <div className="landing-page-wrapper">
      <div className="landing-page">
        <h1 className="landing-title">Welcome to Kloo</h1>
        <p className="landing-subtitle">
          Manage your projects efficiently and effectively with Kloo.
        </p>
        {!isAuthenticated && ( // Conditionally render buttons if not authenticated
          <div className="landing-buttons">
            <a href="/login" className="cta-button login-button">Log In</a>
            <a href="/register" className="cta-button register-button">Sign Up</a>
          </div>
        )}
        <div className="landing-info">
          <p>Kloo is your ultimate solution for project management. Whether you're working alone or with a team, Kloo provides all the tools you need to plan, track, and deliver projects on time.</p>
          <p>Join us and take control of your projects today!</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
