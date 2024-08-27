import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/tasks';

class TaskService {
  static async getTasksByProjectId(projectId) {
    try {
      const response = await axios.get(`${API_URL}/by-project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching tasks for project ID ${projectId}:`, error);
      throw error;
    }
  }

  static async getTaskById(taskId) {
    try {
      const response = await axios.get(`${API_URL}/by-project/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error finding task with Id ${taskId}:`, error);
      throw error;
    }
  }

  static async createTask(taskDto) {
    try {
      const response = await axios.post(API_URL, taskDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task', error);
      throw error;
    }
  }

  static async getTasksBySprintId(sprintId) {
    try {
      const response = await axios.get(`${API_URL}/by-sprint/${sprintId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching tasks for sprint ID ${sprintId}:`, error);
      throw error;
    }
  }
}

export default TaskService;
