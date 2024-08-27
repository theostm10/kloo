import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import TaskService from '../services/TaskService';
import SprintService from '../services/SprintService';
import UserService from '../services/UserService';
import '../styles/AllTasksPage.css';

function AllTasksPage() {
  const { id } = useParams(); // Project ID
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchAllTasks();
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

  const fetchSprintDetails = async (task) => {
    try {
      const sprintData = await SprintService.getSprintById(task.sprint);
      task.sprint = sprintData;
    } catch (err) {
      console.error(`Failed to fetch sprint details for sprint ID ${task.sprint}`, err);
    }
  };

  const fetchUserDetails = async (task) => {
    try {
      const userData = await UserService.getUserById(task.assigned_to);
      task.assigned_to = userData; // Assuming the response has firstName and lastName fields
    } catch (err) {
      console.error(`Failed to fetch user details for user ID ${task.assigned_to}`, err);
      task.assigned_to = 'Unknown User';
    }
  };

  const fetchAllTasks = async () => {
    try {
      const tasksData = await TaskService.getTasksByProjectId(id);

      await Promise.all(tasksData.map(task => fetchSprintDetails(task)));
      await Promise.all(tasksData.map(task => fetchUserDetails(task)));
      setTasks(tasksData);
      setFilteredTasks(tasksData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tasks.');
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    history.push(`/projects/${id}/add-task`);
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="all-tasks-container">
      <h1>All Tasks for Project</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleCreateTask} className="btn btn-primary create-task-button">
          Add Task
        </button>
      </div>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Sprint</th> {/* New Sprint column */}
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td><Link to={`/projects/${id}/tasks/${task.id}`} className="task-link">{task.title}</Link></td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.assigned_to ? `${task.assigned_to.firstName} ${task.assigned_to.lastName}` : 'Unassigned'}</td>
              <td>{task.sprint ? task.sprint.name : 'No Sprint'}</td> {/* Display sprint name or 'No Sprint' */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllTasksPage;
