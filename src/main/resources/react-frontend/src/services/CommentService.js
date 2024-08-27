import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/comments';

class CommentService {
  static async getCommentsByTaskId(taskId) {
    try {
      const response = await axios.get(`${API_URL}/by-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for task ID ${taskId}:`, error);
      throw error;
    }
  }

  static async createComment(commentDto) {
    try {
      const response = await axios.post(API_URL, commentDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  static async updateComment(commentId, commentDto) {
    try {
      const response = await axios.put(`${API_URL}/${commentId}`, commentDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating comment with ID ${commentId}:`, error);
      throw error;
    }
  }

  static async deleteComment(commentId) {
    try {
      await axios.delete(`${API_URL}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting comment with ID ${commentId}:`, error);
      throw error;
    }
  }
}

export default CommentService;
