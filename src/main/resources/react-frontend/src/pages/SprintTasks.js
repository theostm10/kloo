import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import SprintService from '../services/SprintService';
import TaskService from '../services/TaskService';
import '../styles/SprintTasks.css';

function SprintTasks() {
  const { sprintId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [sprint, setSprint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchSprintTasks();
  }, []);

  const fetchSprintTasks = async () => {
    try {
      const sprintData = await SprintService.getSprintById(sprintId);
      setSprint(sprintData);

      const tasksData = await TaskService.getTasksBySprintId(sprintId);
      setTasks(tasksData);

      setLoading(false);
    } catch (err) {
      setError('Failed to load sprint tasks.');
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    history.push(`/sprints/${sprintId}/create-task`);
  };

  if (loading) {
    return <div className="loading">Loading sprint tasks...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="sprint-tasks-container">
      <h1>{sprint.name} - Tasks</h1>
      <button onClick={handleCreateTask} className="btn btn-primary create-task-button">
        Create New Task
      </button>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Priority</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.priority}</td>
              <td><Link to={`/tasks/${task.id}`} className="task-link">{task.title}</Link></td>
              <td>{task.type}</td>
              <td>{task.status}</td>
              <td>{task.assigned_to ? `${task.assigned_to.firstName} ${task.assigned_to.lastName}` : 'Unassigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SprintTasks;
