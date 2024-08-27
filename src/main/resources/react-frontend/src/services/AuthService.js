import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthService {
  static async register(registerData) {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', registerData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  
  static async login(loginData) {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', loginData);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      // Decode the access token to get user information
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.userId;

      // Store tokens and user information in local storage
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user_email', loginData.email);
      localStorage.setItem('user_id', userId);
      // Set the default Authorization header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
    delete axios.defaults.headers.common['Authorization'];
  }

  static getAccessToken() {
    return localStorage.getItem('access_token');
  }

  static getUserEmail() {
    return localStorage.getItem('user_email');
  }

  static getUserId() {
    return localStorage.getItem('user_id');
  }

  static isAuthenticated() {
    return !!this.getAccessToken();
  }

  static getUserRole() {
    const token = this.getAccessToken();
    if (!token) return null;
    
    const decodedToken = jwtDecode(token);
    return decodedToken.roles ? decodedToken.roles[0] : null; // assuming roles is an array
  }
}

// Set the token if it exists in local storage when the app initializes
const token = AuthService.getAccessToken();
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default AuthService;