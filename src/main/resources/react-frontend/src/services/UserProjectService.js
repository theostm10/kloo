import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/user-projects';

class UserProjectService {
  static async getUsersByProjectId(projectId) {
    try {
      const response = await axios.get(`${API_URL}/by-project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching users for project ID ${projectId}:`, error);
      throw error;
    }
  }

  static async assignUserToProject(userProjectDto) {
    try {
      const response = await axios.post(API_URL, userProjectDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error assigning user to project:', error);
      throw error;
    }
  }
}

export default UserProjectService;
