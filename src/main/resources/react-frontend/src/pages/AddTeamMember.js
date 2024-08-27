import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TeamMemberService from '../services/TeamMemberService';
import UserService from '../services/UserService';
import '../styles/AddTeamMember.css';

function AddTeamMember() {
  const { teamId } = useParams();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch available users
    UserService.getAllUsers()
      .then(response => setUsers(response))
      .catch(err => {
        setError('Failed to load users.');
        console.error('Error fetching users:', err);
      });

    // Fetch current team members
    TeamMemberService.getTeamMembersByTeamId(teamId)
      .then(response => {
        setTeamMembers(response);
      })
      .catch(err => {
        setError('Failed to load team members.');
        console.error('Error fetching team members:', err);
      });
  }, [teamId]);

  const isUserAlreadyInTeam = (userId) => {
    return teamMembers.some(member => member.user.id === userId);
  };

  const handleAddTeamMember = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isUserAlreadyInTeam(selectedUserId)) {
      setError('This user is already a member of the team.');
      return;
    }

    try {
      const teamMemberDto = {
        team:  teamId,
        user: selectedUserId,
      };

      await TeamMemberService.addTeamMember(teamMemberDto);
      setSuccess('Team member added successfully!');

      // Redirect to the team detail page after adding the member
      setTimeout(() => {
        history.push(`/teams/${teamId}`);
      }, 2000);
    } catch (error) {
      setError('Failed to add team member. Please try again.');
      console.error('Error adding team member:', error);
    }
  };

  return (
    <div className="add-team-member-container">
      <h1>Add Team Member</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleAddTeamMember} className="add-team-member-form">
        <div className="input-group">
          <label htmlFor="user">Select User</label>
          <select
            id="user"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">--Select User--</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUserAlreadyInTeam(selectedUserId)}>
          Add Member
        </button>
      </form>
    </div>
  );
}

export default AddTeamMember;
