import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import SprintService from '../services/SprintService';
import TaskService from '../services/TaskService';
import UserService from '../services/UserService'
import '../styles/SprintTasks.css';

function SprintTasks() {
  const { id, sprintId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sprint, setSprint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchSprintTasks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  const fetchUserDetails = async (task) => {
    try {
      const userData = await UserService.getUserById(task.assigned_to);
      task.assigned_to = userData; // Assuming the response has firstName and lastName fields
    } catch (err) {
      console.error(`Failed to fetch user details for user ID ${task.assigned_to}`, err);
      task.assigned_to = 'Unknown User';
    }
  };

  const fetchSprintTasks = async () => {
    try {
      const sprintData = await SprintService.getSprintById(sprintId);
      setSprint(sprintData);

      const tasksData = await TaskService.getTasksBySprintId(sprintId);
      await Promise.all(tasksData.map(task => fetchUserDetails(task)));
      setTasks(tasksData);
      setFilteredTasks(tasksData);

      setLoading(false);
    } catch (err) {
      setError('Failed to load sprint tasks.');
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    history.push(`/projects/${id}/sprints/${sprintId}/add-task`);
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
      <div className="controls-sprint-tasks">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleCreateTask} className="create-task-button">
          Add Task
        </button>
      </div>
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
          {filteredTasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.priority}</td>
              <td><Link to={`/projects/${id}/tasks/${task.id}`} className="task-link">{task.title}</Link></td>
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
