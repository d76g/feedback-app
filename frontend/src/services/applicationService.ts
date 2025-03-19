import axios from 'axios';


const API_URL = 'http://localhost:3000/api/application';

export default {

  async getFeedbackByApplication(applicationId: string) {
    try {
      const response = await axios.get(`${API_URL}/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching feedbacks:", error);
      return [];
    }
  },

  async fetchApplications() {
    try {
      const response = await axios.get('http://localhost:3000/api/applications');
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching applications:", error);
      return [];
    }
  }
}
