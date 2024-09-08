import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import SprintService from '../services/SprintService';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AllSprintsPage.css';

function AllSprintsPage() {
  const {isAdmin, isProjectManager} = useAuth();
  const { id } = useParams(); // Project ID from the URL
  const [sprints, setSprints] = useState([]);
  const [filteredSprints, setFilteredSprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchAllSprints();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = sprints.filter(sprint =>
        sprint.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSprints(filtered);
    } else {
      setFilteredSprints(sprints);
    }
  }, [searchQuery, sprints]);

  const fetchAllSprints = async () => {
    try {
      const sprintsData = await SprintService.getSprintsByProjectId(id);
      setSprints(sprintsData);
      setFilteredSprints(sprintsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load sprints.');
      setLoading(false);
    }
  };

  const handleDeleteSprint = async (sprintId) => {
    if (window.confirm('Are you sure you want to delete this sprint?')) {
      try {
        await SprintService.deleteSprint(sprintId);
        setSprints(sprints.filter(sprint => sprint.id !== sprintId)); // Update state after deletion
        setFilteredSprints(filteredSprints.filter(sprint => sprint.id !== sprintId));
      } catch (err) {
        setError('Failed to delete sprint.');
        console.error('Error deleting sprint:', err);
      }
    }
  };

  const handleCreateSprint = () => {
    history.push(`/projects/${id}/add-sprint`);
  };

  if (loading) {
    return <div className="loading">Loading sprints...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="all-sprints-container">
      <h1>All Sprints for Project</h1>
      <div className="controls-task-list">
        <input
          type="text"
          placeholder="Search sprints..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar-project-all-tasks"
        />
        {(isAdmin || isProjectManager) && (
        <button onClick={handleCreateSprint} className="create-sprint-button">
          Add Sprint
        </button>
        )}
      </div>
      <table className="sprints-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            {(isAdmin || isProjectManager) && (
            <th className="action-column">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredSprints.map((sprint, index) => (
            <tr key={sprint.id}>
              <td>{index + 1}</td>
              <td><Link to={`/projects/${id}/sprints/${sprint.id}/tasks`} className="sprint-link">{sprint.name}</Link></td>
              <td>{new Date(sprint.start_date).toLocaleDateString()}</td>
              <td>{new Date(sprint.end_date).toLocaleDateString()}</td>
              {(isAdmin || isProjectManager) && (
              <td className="action-column">
                <button
                  onClick={() => handleDeleteSprint(sprint.id)}
                  className="btn btn-danger delete-task-button"
                >
                  Delete
                </button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllSprintsPage;
