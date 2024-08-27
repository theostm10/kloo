import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/teams';

class TeamService {
  static async getAllTeams() {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }

  static async createTeam(teamData) {
    try {
      const response = await axios.post(API_URL, teamData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  }

  static async deleteTeam(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting team with ID ${id}:`, error);
      throw error;
    }
  }

  static async getTeamById(teamId) {
    try {
      const response = await axios.get(`${API_URL}/${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching team with ID ${teamId}:`, error);
      throw error;
    }
  }

  static async getTeamMembers(teamId) {
    try {
      const response = await axios.get(`${API_URL}/${teamId}/members`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching members for team ID ${teamId}:`, error);
      throw error;
    }
  }

}

export default TeamService;
