import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TaskService from '../services/TaskService';
import UserProjectService from '../services/UserProjectService'; // Make sure you import UserService
import SprintService from '../services/SprintService'; // Make sure you import SprintService
import '../styles/CreateTask.css';

function CreateTaskPage() {
  const { id, sprintid } = useParams(); // Project ID
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assigned_to, setAssignedTo] = useState('');
  const [sprint, setSprint] = useState('');
  const [users, setUsers] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  // Function to fetch users and sprints
  const fetchUsersAndSprints = async () => {
    try {
      const usersResponse = await UserProjectService.getUsersByProjectId(id);
      const sprintsResponse = await SprintService.getSprintsByProjectId(id);

      console.log("Fetched Users:", usersResponse);
      console.log("Fetched Sprints:", sprintsResponse);

      setUsers(usersResponse);
      setSprints(sprintsResponse);
    } catch (err) {
      setError('Failed to load users or sprints.');
      console.error('Error fetching users or sprints:', err);
    }
  };

  // Fetch users and sprints when the component mounts
  useEffect(() => {
    fetchUsersAndSprints();
  }, []); // Empty dependency array means this runs once on mount

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userId = localStorage.getItem('user_id');

    if (!userId) {
      setError('User not logged in or user ID not found.');
      return;
    }

    try {
      const taskDto = {
        title,
        description,
        type,
        status,
        priority,
        assigned_to, // The user assigned to the task
        sprint,     // The sprint to which the task belongs
        project: id,
        //created_by: userId,
      };

      await TaskService.createTask(taskDto);
      setSuccess('Task created successfully!');

      // Redirect to the project detail page after creation
      setTimeout(() => {
        history.push(`/projects/${id}`);
      }, 2000);

    } catch (error) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="create-task-container">
      <h1>Create New Task</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleCreateTask} className="create-task-form">
        <div className="input-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <div className="input-group">
          <label htmlFor="type">Type</label>
          <select 
            id="type" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            required
          >
            <option value="">Select Type</option>
            <option value="TASK_BUG">Bug</option>
            <option value="TASK_STORY">Task</option>
            <option value="TASK_INVESTIGATION">Invvestigation</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="status">Status</label>
          <select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            required
          >
            <option value="">Select Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="IN_TEST">To Test</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="priority">Priority</label>
          <select 
            id="priority" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            required
          >
            <option value="">Select Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="assigned_To">Assigned To</label>
          <select 
            id="assigned_To" 
            value={assigned_to} 
            onChange={(e) => setAssignedTo(e.target.value)} 
            required
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.user.id} value={user.user.id}>
                {user.user.firstName} {user.user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="sprint">Sprint</label>
          <select 
            id="sprint" 
            value={sprint} 
            onChange={(e) => setSprint(e.target.value)} 
            required
          >
            <option value="">Select Sprint</option>
            {sprints.map(sprint => (
              <option key={sprint.id} value={sprint.id}>
                {sprint.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTaskPage;
