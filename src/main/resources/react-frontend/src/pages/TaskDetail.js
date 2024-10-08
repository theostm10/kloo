import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskService from '../services/TaskService';
import CommentService from '../services/CommentService';
import AttachmentService from '../services/AttachmentService';
import UserProjectService from '../services/UserProjectService';
import SprintService from '../services/SprintService';
import UserService from '../services/UserService';
import '../styles/TaskDetail.css';

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newAttachment, setNewAttachment] = useState(null);
  const [users, setUsers] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [error, setError] = useState('');
  const [attachmentError, setAttachmentError] = useState('');  // Separate state for attachment errors
  const [successMessage, setSuccessMessage] = useState('');  // State for success messages

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchUserCommentDetails = async (comment) => {
    try {
      const userData = await UserService.getUserById(comment.user);
      comment.user = userData; // Assuming the response has firstName and lastName fields
    } catch (err) {
      console.error(`Failed to fetch user details for user ID ${comment.user}`, err);
      comment.user = 'Unknown User';
    }
  };

  const fetchUserAttachmentDetails = async (attachment) => {
    try {
      const userData = await UserService.getUserById(attachment.user);
      attachment.user = userData; // Assuming the response has firstName and lastName fields
    } catch (err) {
      console.error(`Failed to fetch user details for user ID ${attachment.user}`, err);
      attachment.user = 'Unknown User';
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const taskData = await TaskService.getTaskById(id);
      setTask(taskData);

      const usersResponse = await UserProjectService.getUsersByProjectId(taskData.project);
      setUsers(usersResponse);
      const sprintsResponse = await SprintService.getSprintsByProjectId(taskData.project);
      setSprints(sprintsResponse);

      const commentsData = await CommentService.getCommentsByTaskId(id);
      await Promise.all(commentsData.map(comment => fetchUserCommentDetails(comment)));
      setComments(commentsData);

      const attachmentsData = await AttachmentService.getAttachmentsByTaskId(id);
      await Promise.all(attachmentsData.map(attachment => fetchUserAttachmentDetails(attachment)));
      setAttachments(attachmentsData);
    } catch (err) {
      setError('Failed to load task details.');
      console.error('Error fetching task details:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await CommentService.createComment({
        text: newComment,
        task: id,
        user: localStorage.getItem('user_id'),
      });
      setNewComment('');
      fetchTaskDetails();
    } catch (err) {
      setError('Failed to add comment.');
      console.error('Error adding comment:', err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) return; 
  
    try {
      await CommentService.deleteComment(commentId);
      fetchTaskDetails();
    } catch (err) {
      setError('Failed to delete comment.');
      console.error('Error deleting comment:', err);
    }
  };

  const handleAttachmentUpload = async (e) => {
    e.preventDefault();

    if (!newAttachment) {
        setAttachmentError('Please select a file to upload.');
        return;
    }

    // Check if the attachment already exists
    const existingAttachment = attachments.find(
        attachment => attachment.file_path.split('/').pop() === newAttachment.name
    );

    if (existingAttachment) {
        setAttachmentError('This attachment already exists.');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', newAttachment);
        formData.append('taskId', id);
        formData.append('userId', localStorage.getItem('user_id'));

        await AttachmentService.createAttachment(formData);
        setNewAttachment(null);
        fetchTaskDetails(); // Refresh task details to get the latest attachments
        setAttachmentError('');  // Clear any previous attachment errors
    } catch (err) {
        setAttachmentError('Failed to upload attachment.');
        console.error('Error uploading attachment:', err);
    }
};

  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { ...task };
      await TaskService.updateTask(id, updatedTask);
      setSuccessMessage('Task Updated');
      setTimeout(() => {
        setSuccessMessage('');  
        window.location.reload(); 
      }, 2000); 
    } catch (err) {
      setError('Failed to update task.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteAttachment = async (attachmentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this attachment?');
    if (!confirmDelete) return; 
  
    try {
      await AttachmentService.deleteAttachment(attachmentId);
      fetchTaskDetails(); 
    } catch (err) {
      setError('Failed to delete attachment.');
      console.error('Error deleting attachment:', err);
    }
  };

  return (
    <div className="task-detail-container">
      {error && <p className="error-message">{error}</p>}
      {task && (
        <>
          <form onSubmit={handleTaskUpdate} className="task-info">
            <div className="input-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
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
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                required
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={task.type}
                onChange={(e) => setTask({ ...task, type: e.target.value })}
                required
              >
                <option value="">Select Type</option>
                <option value="TASK_BUG">Bug</option>
                <option value="TASK_STORY">Task</option>
                <option value="TASK_INVESTIGATION">Investigation</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="assignedTo">Assigned To</label>
              <select
                id="assignedTo"
                value={task.assigned_to} // Value from task data
                onChange={(e) => setTask({ ...task, assigned_to: e.target.value })}
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
                value={task.sprint} // Value from task data
                onChange={(e) => setTask({ ...task, sprint: e.target.value })}
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
            <div className="update-task-container">
              <button type="submit" className="btn btn-primary">Update Task</button>
              {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
          </form>

          <section className="attachments-section">
            <h2>Attachments</h2>
            <form onSubmit={handleAttachmentUpload}>
                <input
                    type="file"
                    onChange={(e) => setNewAttachment(e.target.files[0])}
                    required
                />
                 <div className="upload-attachment-container">
                  <button onClick={handleAttachmentUpload} className="btn btn-primary">Upload Attachment</button>
                </div>
            </form>
            {attachmentError && <p className="error-message">{attachmentError}</p>} {/* Display attachment-specific error here */}
            <ul>
                {attachments.map(attachment => (
                    <li key={attachment.id} className="attachment-item">
                        <div className="attachment-info">
                            <a href={`/${attachment.file_path}`} download className="attachment-name">
                                {attachment.file_path.split('/').pop()}
                            </a>
                            <p className="attachment-meta">
                                Uploaded by {attachment.user.firstName} {attachment.user.lastName} on {new Date(attachment.uploaded_date).toLocaleString()}
                            </p>
                        </div>
                        <button 
                            onClick={() => handleDeleteAttachment(attachment.id)} 
                            className="btn-delete-attachment">
                            ✖
                        </button>
                    </li>
                ))}
            </ul>
          </section>

          <section className="comments-section">
            <h2>Comments</h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <div className="add-comment-container">
                <button onClick={handleCommentSubmit} className="btn btn-primary">Add Comment</button>
              </div>
            </form>
            <div className="comments-list">
              <ul>
                {comments.map(comment => (
                  <li key={comment.id} className="comment-item">
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-meta">
                      <span className="comment-date">{new Date(comment.created_date).toLocaleString()}</span>
                      <span className="comment-user">By {comment.user.firstName} {comment.user.lastName}</span>
                    </div>
                    <button
                      onClick={() => handleCommentDelete(comment.id)}
                      className="delete-comment-btn"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default TaskDetail;
