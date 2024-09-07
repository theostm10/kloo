import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectService from '../services/ProjectService';
import { useAuth } from '../contexts/AuthContext';
import TaskService from '../services/TaskService';
import SprintService from '../services/SprintService';
import UserProject from '../services/UserProjectService';
import '../styles/ProjectDetail.css';

function ProjectDetail() {
  const {userId} = useAuth();
  const { id } = useParams(); // Get project ID from URL parameters
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [userProject, setUserProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch project details, tasks, sprints, and team members when the component mounts
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const projectData = await ProjectService.getProjectById(id);
      setProject(projectData);

      const tasksData = await TaskService.getTasksByProjectId(id);
      setTasks(tasksData);

      const sprintsData = await SprintService.getSprintsByProjectId(id);
      setSprints(sprintsData);

      const usersData = await UserProject.getUsersByProjectId(id);
      setUserProject(usersData);

      setLoading(false);
    } catch (err) {
      setError('Unable to load project details');
      setLoading(false);
    }
  };

  const userTasks = tasks.filter(task => task.assigned_to === userId);

  if (loading) {
    return <div className="loading">Loading project details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="project-detail-container">
      {project && (
        <>
          <h1 className="project-title">{project.name}</h1>
          <p className="project-description">{project.description}</p>

          <div className="columns-container">
            <div className="column">
              <h2 className="section-title">My Tasks</h2>
              <ul className="item-list">
                {userTasks.map((task) => (
                  <li key={task.id} className="item">
                    <Link to={`/projects/${id}/tasks/${task.id}`} className="item-link">{task.title}</Link>
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = `/projects/${id}/add-task`} className="btn btn-primary">Create Task</button>
            </div>

            <div className="column">
              <h2 className="section-title">Sprints</h2>
              <ul className="item-list">
                {sprints.map((sprint) => (
                  <li key={sprint.id} className="item">
                    <Link to={`/projects/${id}/sprints/${sprint.id}/tasks`} className="item-link">
                      {sprint.name} ({new Date(sprint.start_date).toLocaleDateString()} - {new Date(sprint.end_date).toLocaleDateString()})
                    </Link>
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = `/projects/${id}/add-sprint`} className="btn btn-primary">Create Sprint</button>
            </div>
            
            <div className="column">
              <h2 className="section-title">Users </h2>
              <ul className="item-list">
                {userProject.map((member) => (
                  <li key={member.id} className="item">
                    {member.user.firstName} {member.user.lastName} - {member.user.role.code}
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = `/projects/${id}/assign-user`} className="btn btn-primary">Assign User</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectDetail;
