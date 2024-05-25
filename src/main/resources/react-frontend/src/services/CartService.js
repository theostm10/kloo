// src/services/CartService.js
import axios from 'axios';

class CartService {
  static async addToCart(userId, cartItem) {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/carts/${userId}/add`, cartItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  static async updateCartItem(userId, cartItemId, quantity) {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/carts/${userId}/update/${cartItemId}`, { quantity }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  static async removeCartItem(userId, cartItemId) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/carts/${userId}/remove/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  }

  static async getCart(userId) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/carts/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }
}

export default CartService;
