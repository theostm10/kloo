import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, userEmail, logout, isAdmin } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <img src="/your-logo.png" alt="Your App Logo" />
        </Link>
      </div>
      <ul className="sidebar-menu">
        {!isAuthenticated ? (
          <>
            <li><Link to="/login" className="sidebar-item">Log In</Link></li>
            <li><Link to="/register" className="sidebar-item">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/projects" className="sidebar-item">Projects</Link></li>
            <li><Link to="/teams" className="sidebar-item">Teams</Link></li>
            {isAdmin && (
              <li><Link to="/admin/users" className="sidebar-item">Manage Users</Link></li>
            )}
          </>
        )}
      </ul>
      {isAuthenticated && (
        <div className="sidebar-footer">
          <div className="user-info">
            <Link to="/edit-account" className="user-email">{userEmail}</Link>
          </div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
