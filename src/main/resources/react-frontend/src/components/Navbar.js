import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, userEmail, logout, isAdmin } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  // Check if the current route is the ProjectDetail page
  const isProjectDetailPage = location.pathname.startsWith('/projects/');
  
  // Check if the current route is the NewProject page
  const isNewProjectPage = location.pathname === '/projects/new';

  // Extract the project ID from the URL (assuming the URL is in the form /projects/:id)
  const projectId = location.pathname.split('/')[2];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <img src="/uploads/k.png" alt="Your App Logo" />
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
            {/* Show these links only if it's a project detail page and not the new project page */}
            {isProjectDetailPage && !isNewProjectPage && (
              <>
                <li><Link to={`/projects/${projectId}/tasks`} className="sidebar-item">All Tasks</Link></li>
                <li><Link to={`/projects/${projectId}/sprints`} className="sidebar-item">All Sprints</Link></li>
              </>
            )}
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
