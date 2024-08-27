import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectOverview.css';

function ProjectOverview({ projects }) {
  return (
    <div className="project-overview">
      <h2>Your Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectOverview;
