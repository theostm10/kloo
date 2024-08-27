import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProjectService from '../services/ProjectService';
import '../styles/ProjectList.css';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch the projects when the component is mounted
    ProjectService.getAllProjects()
      .then(response => {
        setProjects(response);
      })
      .catch(err => {
        setError('Failed to load projects.');
        console.error('Error fetching projects:', err);
      });
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      await ProjectService.deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      setError('Failed to delete project. Please try again.');
      console.error('Error deleting project:', error);
    }
  };

  const handleCreateProject = () => {
    history.push('/projects/new');
  };

  return (
    <div className="projects-page-container">
      <h1>Your Projects</h1>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleCreateProject} className="btn btn-primary create-project-button">
        Create New Project
      </button>
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-actions">
              <Link to={`/projects/${project.id}`} className="btn btn-secondary">View Project</Link>
              <button onClick={() => handleDeleteProject(project.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
