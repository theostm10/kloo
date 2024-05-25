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
}



export default UserService;
