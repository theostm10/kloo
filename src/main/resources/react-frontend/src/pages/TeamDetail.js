import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeamMemberService from '../services/TeamMemberService';
import { useAuth } from '../contexts/AuthContext';
import '../styles/TeamDetail.css';

function TeamDetailPage() {
  const {isAdmin, isTeamLeader} = useAuth();
  const { id: teamId } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await TeamMemberService.getTeamMembersByTeamId(teamId);
      setTeamMembers(response);
    } catch (err) {
      setError('Failed to load team members.');
      console.error('Error fetching team members:', err);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this project? All related tasks, sprints, and user assignments will be deleted.")) {
      try {
        await TeamMemberService.removeTeamMember(memberId);
        fetchTeamMembers(); // Refresh the team members list after deletion
      } catch (error) {
        setError('Failed to remove team member. Please try again.');
        console.error('Error removing team member:', error);
      }
    }
  };

  return (
    <div className="team-detail-container">
      <h1>Team Members</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="table-container">
      <table className="team-members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.length > 0 ? (
            teamMembers.map(member => (
              <tr key={member.id}>
                <td>{member.user.firstName} {member.user.lastName}</td>
                <td>{member.user.email}</td>
                <td>{member.user.role.code}</td>
                <td>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="button-remove-member"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No team members yet.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      {(isAdmin || isTeamLeader) && (
      <button onClick={() => window.location.href = `/teams/${teamId}/add-member`} className="add-member-button">Assign User</button>
      )}
    </div>
  );
}

export default TeamDetailPage;
