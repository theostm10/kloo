import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProjectService from '../services/ProjectService';
import '../styles/NewProject.css';
import UserProjectService from '../services/UserProjectService';
import UserService from '../services/UserService';


function NewProject() {
  const {userId} = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const projectDto = {
        name,
        description,
        // Add other fields if necessary
      };

      const createdProject = await ProjectService.createProject(projectDto);

      const userProjectDto = {
        user: userId,
        project: createdProject.id,
      };

      if (userId) {
        await UserProjectService.assignUserToProject(userProjectDto);
      }

      setSuccess('Project created successfully!');
      
      // Redirect to the project details page or projects list
      setTimeout(() => {
        history.push(`/projects/${createdProject.id}`);
      }, 2000);

    } catch (error) {
      setError('Failed to create project. Please try again.');
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="new-project-container">
      <h1>Create New Project</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleCreateProject} className="new-project-form">
        <div className="input-group">
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button-create-project">Create Project</button>
      </form>
    </div>
  );
}

export default NewProject;
