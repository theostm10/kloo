import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProjectService from '../services/ProjectService';
import '../styles/ProjectList.css';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  useEffect(() => {
    ProjectService.getAllProjects()
      .then(response => {
        setProjects(response);
        setFilteredProjects(response);
      })
      .catch(err => {
        setError('Failed to load projects.');
        console.error('Error fetching projects:', err);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchQuery, projects]);

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
      <div className="controls">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleCreateProject} className="btn btn-primary create-project">
          Create New Project
        </button>
      </div>
      <div className="projects-list">
        {filteredProjects.map(project => (
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
