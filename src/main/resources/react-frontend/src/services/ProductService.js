import axios from 'axios';

class ProductService {
  static async getAllProducts() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/products/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log("products", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async createProduct(product) {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/products/', product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log("createProduct ", response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async updateProduct(id, product) {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
}

export default ProductService;
