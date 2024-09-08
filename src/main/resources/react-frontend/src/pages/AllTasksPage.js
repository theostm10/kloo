import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import TaskService from '../services/TaskService';
import SprintService from '../services/SprintService';
import UserService from '../services/UserService';
import UserProjectService from '../services/UserProjectService';
import '../styles/AllTasksPage.css';

function AllTasksPage() {
  const { id } = useParams(); // Project ID
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]); // For user filter
  const [sprints, setSprints] = useState([]); // For sprint filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(''); // Selected user filter
  const [selectedStatus, setSelectedStatus] = useState(''); // Selected status filter
  const [selectedPriority, setSelectedPriority] = useState(''); // Selected priority filter
  const [selectedSprint, setSelectedSprint] = useState(''); // Selected sprint filter
  const history = useHistory();

  useEffect(() => {
    fetchAllTasks();
    fetchUsers(); // Fetch users for the filter dropdown
    fetchSprints(); // Fetch sprints for the filter dropdown
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedUser, selectedStatus, selectedPriority, selectedSprint, tasks]);

  const fetchUsers = async () => {
    try {
      const usersData = await UserProjectService.getUsersByProjectId(id); // Assuming you have this method
      setUsers(usersData);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchSprints = async () => {
    try {
      const sprintsData = await SprintService.getSprintsByProjectId(id); // Assuming you have this method
      setSprints(sprintsData);
    } catch (err) {
      console.error('Failed to fetch sprints:', err);
    }
  };

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
      task.assigned_to = null; // Set it to null if the user is not found
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

  const applyFilters = () => {
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(task => task.status === selectedStatus);
    }

    if (selectedPriority) {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    if (selectedSprint) {
      if (selectedSprint === 'no_sprint') {
        filtered = filtered.filter(task => !task.sprint); // Show tasks with no sprint
      } else {
        filtered = filtered.filter(task => task.sprint && task.sprint.id === selectedSprint);
      }
    }

    if (selectedUser) {
      if (selectedUser === 'unassigned') {
        filtered = filtered.filter(task => !task.assigned_to); // Show tasks with no assigned user
      } else {
        filtered = filtered.filter(task => task.assigned_to && task.assigned_to.id === selectedUser);
      }
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = () => {
    history.push(`/projects/${id}/add-task`);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await TaskService.deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId)); // Update state after deletion
        setFilteredTasks(filteredTasks.filter(task => task.id !== taskId));
      } catch (err) {
        setError('Failed to delete task.');
        console.error('Error deleting task:', err);
      }
    }
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
      <div className="controls-task-list">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar-project-all-tasks"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-dropdown-all-tasks"
        >
          <option value="">Filter by Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="IN_TEST">To Test</option>
          <option value="DONE">Done</option>
        </select>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="filter-dropdown-all-tasks"
        >
          <option value="">Filter by Priority</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <select
          value={selectedSprint}
          onChange={(e) => setSelectedSprint(e.target.value)}
          className="filter-dropdown-all-tasks"
        >
          <option value="">Filter by Sprint</option>
          <option value="no_sprint">No Sprint</option>
          {sprints.map(sprint => (
            <option key={sprint.id} value={sprint.id}>
              {sprint.name}
            </option>
          ))}
        </select>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="filter-dropdown-all-tasks"
        >
          <option value="">Filter by Assigned To</option>
          <option value="unassigned">Unassigned</option>
          {users.map(user => (
            <option key={user.user.id} value={user.user.id}>
              {user.user.firstName} {user.user.lastName}
            </option>
          ))}
        </select>
        <button onClick={handleCreateTask} className="create-task-button">
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
            <th>Sprint</th>
            <th className="action-column">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td><Link to={`/projects/${id}/tasks/${task.id}`} className="task-link">{task.title}</Link></td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.assigned_to ? `${task.assigned_to.firstName} ${task.assigned_to.lastName}` : <>&nbsp;</>}</td>
              <td>{task.sprint ? task.sprint.name : <>&nbsp;</>}</td>
              <td className="action-column">
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn btn-danger delete-task-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllTasksPage;
