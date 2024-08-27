import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserProjectService from '../services/UserProjectService';
import UserService from '../services/UserService';
import '../styles/AssignUser.css';

function AssignUser() {
  const { id } = useParams(); // Project ID
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [projectUsers, setProjectUsers] = useState([]); // Store users already assigned to the project
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch all users when the component mounts
    UserService.getAllUsers()
      .then(response => setUsers(response))
      .catch(err => {
        setError('Failed to load users.');
        console.error('Error fetching users:', err);
      });

    // Fetch users already assigned to the project
    UserProjectService.getUsersByProjectId(id)
      .then(response => setProjectUsers(response))
      .catch(err => {
        setError('Failed to load project users.');
        console.error('Error fetching project users:', err);
      });
  }, [id]);

  const isUserAlreadyInProject = (userId) => {
    return projectUsers.some(user => user.user.id === userId);
  };

  const handleAssignUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isUserAlreadyInProject(selectedUser)) {
      setError('This user is already assigned to the project.');
      return;
    }

    try {
      const userProjectDto = {
        user: selectedUser,
        project: id,
      };

      await UserProjectService.assignUserToProject(userProjectDto);
      setSuccess('User assigned successfully!');

      // Redirect to the project detail page after assignment
      setTimeout(() => {
        history.push(`/projects/${id}`);
      }, 2000);

    } catch (error) {
      if (error.response && error.response.status === 409) { // 409 Conflict
        setError('User is already assigned to this project.');
      } else if (error.response && error.response.data) {
        setError(error.response.data.message || 'Failed to assign user. Please try again.');
      } else {
        setError('Failed to assign user. Please try again.');
      }
      console.error('Error assigning user:', error);
    }
  };

  return (
    <div className="assign-user-container">
      <h1>Assign User to Project</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleAssignUser} className="assign-user-form">
        <div className="input-group">
          <label htmlFor="user">Select User</label>
          <select 
            id="user" 
            value={selectedUser} 
            onChange={(e) => setSelectedUser(e.target.value)} 
            required
          >
            <option value="">Select a User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isUserAlreadyInProject(selectedUser)}
        >
          Assign User
        </button>
        {isUserAlreadyInProject(selectedUser) && (
          <p className="info-message">User is already assigned to this project.</p>
        )}
      </form>
    </div>
  );
}

export default AssignUser;
