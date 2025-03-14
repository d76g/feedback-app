import Feedback from "../models/feedback.model";

class FeedbackService {
    static async createFeedback(data: { userId: number, applicationId: number, note?: string, rating: number }) {
        return await Feedback.create({
            userId: data.userId,
            applicationId: data.applicationId,
            note: data.note || null,
            rating: data.rating
        });
    }

    static async getAllFeedback() {
        return await Feedback.findAll();
    }
}

export default FeedbackService;