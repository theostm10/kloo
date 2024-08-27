import React, { useState } from 'react';
import { formatISO } from 'date-fns';
import { useHistory, useParams } from 'react-router-dom';
import SprintService from '../services/SprintService';
import '../styles/CreateSprint.css';

function CreateSprintPage() {
  const { id } = useParams(); // Project ID
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const handleCreateSprint = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        const sprintDto = {
            project: id,  // Ensure this is being set correctly
            name,
            start_date: formatISO(new Date(startDate)),
            end_date: formatISO(new Date(endDate)),
        };

        await SprintService.createSprint(sprintDto);
        setSuccess('Sprint created successfully!');

        // Redirect to the project detail page after creation
        setTimeout(() => {
            history.push(`/projects/${id}`);
        }, 2000);

    } catch (error) {
        setError('Failed to create sprint. Please try again.');
        console.error('Error creating sprint:', error);
    }
};

  return (
    <div className="create-sprint-container">
      <h1>Create New Sprint</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleCreateSprint} className="create-sprint-form">
        <div className="input-group">
          <label htmlFor="name">Sprint Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Sprint</button>
      </form>
    </div>
  );
}

export default CreateSprintPage;
