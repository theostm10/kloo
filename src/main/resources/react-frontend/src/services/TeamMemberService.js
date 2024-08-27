import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/team-members';

class TeamMemberService {
  static async getTeamMembersByTeamId(teamId) {
    try {
      const response = await axios.get(`${API_URL}/by-team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching team members for team ID ${teamId}:`, error);
      throw error;
    }
  }

  static async addTeamMember(teamMemberDto) {
    try {
      const response = await axios.post(API_URL, teamMemberDto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  }

  static async removeTeamMember(memberId) {
    try {
      await axios.delete(`${API_URL}/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error('Error removing team member:', error);
      throw error;
    }
  }
}

export default TeamMemberService;
