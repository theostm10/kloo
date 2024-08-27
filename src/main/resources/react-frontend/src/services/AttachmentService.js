import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/attachments';

class AttachmentService {
  static async getAttachmentsByTaskId(taskId) {
    try {
      const response = await axios.get(`${API_URL}/by-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching attachments for task ID ${taskId}:`, error);
      throw error;
    }
  }

  static async createAttachment(formData) {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading attachment:', error);
      throw error;
    }
  }

  static async deleteAttachment(attachmentId) {
    try {
      await axios.delete(`${API_URL}/${attachmentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting attachment with ID ${attachmentId}:`, error);
      throw error;
    }
  }
}

export default AttachmentService;
