import axios from 'axios';

class UploadService {
  static async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}

export default UploadService;