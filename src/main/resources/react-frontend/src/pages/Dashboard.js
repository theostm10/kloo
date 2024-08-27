import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      // Fetch the user's projects and tasks after verifying that the user is logged in
      fetchProjects();
      fetchTasks();
    }
  }, [currentUser]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <div>Loading user information...</div>;
  }

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard, {currentUser.email}!</h1>

      <div className="dashboard-section">
        <h2>Your Projects</h2>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        ) : (
          <p>No projects available</p>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Your Tasks</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
