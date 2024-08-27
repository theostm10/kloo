import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskService from '../services/TaskService';
import CommentService from '../services/CommentService';
import AttachmentService from '../services/AttachmentService';
import '../styles/TaskDetail.css';

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newAttachment, setNewAttachment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const taskData = await TaskService.getTaskById(id);
      setTask(taskData);

      const commentsData = await CommentService.getCommentsByTaskId(id);
      setComments(commentsData);

      const attachmentsData = await AttachmentService.getAttachmentsByTaskId(id);
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
    try {
      const formData = new FormData();
      formData.append('file', newAttachment);
      formData.append('taskId', id);

      await AttachmentService.uploadAttachment(formData);
      setNewAttachment(null);
      fetchTaskDetails();
    } catch (err) {
      setError('Failed to upload attachment.');
      console.error('Error uploading attachment:', err);
    }
  };

  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { ...task };
      await TaskService.updateTask(id, updatedTask);
      fetchTaskDetails();
    } catch (err) {
      setError('Failed to update task.');
      console.error('Error updating task:', err);
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
                <option value="TO_DO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
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
                <option value="BUG">Bug</option>
                <option value="FEATURE">Feature</option>
                <option value="TASK">Task</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Update Task</button>
          </form>

          <section className="attachments-section">
            <h2>Attachments</h2>
            <form onSubmit={handleAttachmentUpload}>
              <input
                type="file"
                onChange={(e) => setNewAttachment(e.target.files[0])}
                required
              />
              <button type="submit" className="btn btn-primary">Upload Attachment</button>
            </form>
            <ul>
              {attachments.map(attachment => (
                <li key={attachment.id}>
                  <a href={attachment.file_path} target="_blank" rel="noopener noreferrer">
                    {attachment.file_path}
                  </a>
                  <p><small>Uploaded by User {attachment.user} on {new Date(attachment.uploaded_date).toLocaleString()}</small></p>
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
              <button type="submit" className="btn btn-primary">Add Comment</button>
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
                      className="btn btn-danger delete-comment-btn"
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
