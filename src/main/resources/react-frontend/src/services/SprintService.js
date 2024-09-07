import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/sprints';

class SprintService {
  static async getSprintsByProjectId(projectId) {
    try {
      const response = await axios.get(`${API_URL}/by-project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching sprints for project ID ${projectId}:`, error);
      throw error;
    }
  }

  static async createSprint(sprintDto) {
    try {
      const response = await axios.post(API_URL, sprintDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating sprint:', error);
      throw error;
    }
  }
  static async getSprintById(sprintId) {
    try {
      const response = await axios.get(`${API_URL}/${sprintId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching sprint with ID ${sprintId}:`, error);
      throw error;
    }
  }
  static async deleteSprint(sprintId) {
    try {
      const response = await axios.delete(`${API_URL}/${sprintId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Ensure the user is authenticated
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting sprint:', error);
      throw error;
    }
  }
}

export default SprintService;
