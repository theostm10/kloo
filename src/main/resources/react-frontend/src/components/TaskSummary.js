import React from 'react';
import '../styles/TaskSummary.css';

function TaskSummary({ tasks }) {
  const taskCount = (status) => tasks.filter(task => task.status === status).length;

  return (
    <div className="task-summary">
      <h2>Task Summary</h2>
      <div className="task-summary-grid">
        <div className="task-summary-item">
          <h3>To Do</h3>
          <p>{taskCount('To Do')}</p>
        </div>
        <div className="task-summary-item">
          <h3>In Progress</h3>
          <p>{taskCount('In Progress')}</p>
        </div>
        <div className="task-summary-item">
          <h3>Done</h3>
          <p>{taskCount('Done')}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskSummary;
