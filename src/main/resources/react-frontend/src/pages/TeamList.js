import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TeamService from '../services/TeamService';
import '../styles/TeamList.css';

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch the teams when the component is mounted
    TeamService.getAllTeams()
      .then(response => {
        setTeams(response);
      })
      .catch(err => {
        setError('Failed to load teams.');
        console.error('Error fetching teams:', err);
      });
  }, []);

  const handleDeleteTeam = async (id) => {
    try {
      await TeamService.deleteTeam(id);
      setTeams(teams.filter(team => team.id !== id));
    } catch (error) {
      setError('Failed to delete team. Please try again.');
      console.error('Error deleting team:', error);
    }
  };

  const handleCreateTeam = () => {
    history.push('/teams/new');
  };

  return (
    <div className="teams-page-container">
      <header className="teams-page-header">
        <h1>Your Teams</h1>
        <button onClick={handleCreateTeam} className="btn btn-primary create-team-button">
          + Create New Team
        </button>
      </header>
      {error && <p className="error-message">{error}</p>}
      <div className="teams-list">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <h3 className="team-name">{team.name}</h3>
            <div className="team-actions">
              <Link to={`/teams/${team.id}`} className="btn btn-secondary">View</Link>
              <button onClick={() => handleDeleteTeam(team.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamsPage;
