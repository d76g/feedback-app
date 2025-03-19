import axios from 'axios';
import type { Comment } from '@/types/comment';

const API_URL = 'http://localhost:3000/api/comment'; // Update with your backend URL

export default {
  async getCommentsByFeedbackId(feedbackId: Number): Promise<Comment[]> {
    const response = await axios.get(`${API_URL}/${feedbackId}`);
    return response.data;
  },

  async postComment(comment: Partial<Comment>) {
    return await axios.post(`${API_URL}/${comment.feedbackId}`, comment);
  },

  async updateComment(id: Number, updatedData: Partial<Comment>) {
    return await axios.put(`${API_URL}/${id}`, updatedData);
  },

  async deleteComment(id: Number) {
    return await axios.delete(`${API_URL}/${id}`);
  }
};
