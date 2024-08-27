import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/TaskBoard.css';

function TaskBoard() {
  const { projectId } = useParams(); // Get project ID from URL parameters
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch tasks associated with the project when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/tasks`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError('Unable to load tasks');
      setLoading(false);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="task-board">
      <h2>Task Board</h2>
      <div className="task-columns">
        <TaskColumn title="To Do" tasks={getTasksByStatus('To Do')} />
        <TaskColumn title="In Progress" tasks={getTasksByStatus('In Progress')} />
        <TaskColumn title="Done" tasks={getTasksByStatus('Done')} />
      </div>
    </div>
  );
}

function TaskColumn({ title, tasks }) {
  return (
    <div className="task-column">
      <h3>{title}</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskBoard;
