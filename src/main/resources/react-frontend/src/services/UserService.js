import axios from 'axios';

class UserService {
  static async getAllUsers() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/users/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log("users", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  static async updateUser(id, user) {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/email`, {
            params: { email },  // Sending email as a query parameter
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
  }

}

export default UserService;
