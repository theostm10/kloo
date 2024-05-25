// src/services/OrderService.js
import axios from 'axios';

class OrderService {
  static async convertCartToOrder(userId) {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/orders/convert-cart/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error converting cart to order:', error);
      throw error;
    }
  }

  static async getOrderById(orderId) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/orders/${orderId}/update-status`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  static async getOrdersByUserId(userId) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders by user ID:', error);
      throw error;
    }
  }
}

export default OrderService;
