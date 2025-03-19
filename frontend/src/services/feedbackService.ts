import axios from 'axios';
import type { Feedback } from '@/types/feedback';

const API_URL = 'http://localhost:3000/api/feedback'; // Update with your backend URL

export default {
  async getAllFeedback(): Promise<Feedback[]> {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async getFeedbackById(id: string): Promise<Feedback> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  async postFeedback(feedback: Partial<Feedback>) {
    console.log('Posting feedback:', feedback);

    try
    {
      return await axios.post(API_URL, feedback);
    }
    catch (error)
    {
      console.error('Error posting feedback:', error);
    }
  },

  async updateFeedback(id: string, updatedData: Partial<Feedback>) {
    return await axios.put(`${API_URL}/${id}`, updatedData);
  },

  async deleteFeedback(id: string) {
    return await axios.delete(`${API_URL}/${id}`);
  }
};
