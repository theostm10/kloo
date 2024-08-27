import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TeamService from '../services/TeamService';
import '../styles/TeamList.css';

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  useEffect(() => {
    TeamService.getAllTeams()
      .then(response => {
        setTeams(response);
        setFilteredTeams(response); // Initializează filteredTeams cu toate echipele
      })
      .catch(err => {
        setError('Failed to load teams.');
        console.error('Error fetching teams:', err);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTeams(filtered);
    } else {
      setFilteredTeams(teams);
    }
  }, [searchQuery, teams]);

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
        <div className="controls">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button onClick={handleCreateTeam} className="btn btn-primary create-team-button">
            + Create New Team
          </button>
        </div>
      </header>
      {error && <p className="error-message">{error}</p>}
      <div className="teams-list">
        {filteredTeams.map(team => (
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
