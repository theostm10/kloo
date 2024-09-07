import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TeamService from '../services/TeamService';
import TeamMemberService from '../services/TeamMemberService';
import '../styles/NewTeam.css';

function NewTeamPage() {
  const {userId} = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const teamData = { name };
      const createdTeam = await TeamService.createTeam(teamData);

      const teamMemberDto = {
        team: createdTeam.id,
        user: userId,
      };

      if (userId) {
        await TeamMemberService.addTeamMember(teamMemberDto);
      }
      setSuccess('Team created successfully!');
      
      // Redirect to the team details page or teams list
      setTimeout(() => {
        history.push(`/teams/${createdTeam.id}`);
      }, 2000);

    } catch (error) {
      setError('Failed to create team. Please try again.');
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className="new-team-container">
      <h1>Create New Team</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleCreateTeam} className="new-team-form">
        <div className="input-group">
          <label htmlFor="name">Team Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button-create-team">Create Team</button>
      </form>
    </div>
  );
}

export default NewTeamPage;
