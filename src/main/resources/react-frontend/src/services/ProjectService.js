import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/projects';

class ProjectService {
  // Fetch all projects
  static async getAllProjects() {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all projects:', error);
      throw error;
    }
  }

  // Fetch a project by ID
  static async getProjectById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
  }

  // Fetch projects by user ID
  static async getProjectsByUser(userId) {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching projects for user ID ${userId}:`, error);
      throw error;
    }
  }

  // Create a new project
  static async createProject(projectDto) {
    try {
      const response = await axios.post(API_URL, projectDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update an existing project
  static async updateProject(id, projectDto) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, projectDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating project with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a project by ID
  static async deleteProject(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting project with ID ${id}:`, error);
      throw error;
    }
  }
}

export default ProjectService;
