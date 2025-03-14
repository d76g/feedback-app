import Comment from "../models/comment.model";

class CommentService {
    static async createComment(data: { userId: number, feedbackId: number, text: string }) {
        return await Comment.create({
            userId: data.userId,
            feedbackId: data.feedbackId,
            text: data.text
        });
    }

    static async getAllCommentsForFeedback(feedbackId: number) {
        return await Comment.findAll({ where: { feedbackId } });
    }
    // ✅ Increment upvotes
    static async incrementUpvote(commentId: number) {
        const comment = await Comment.findByPk(commentId);
        if (!comment) throw new Error("Comment not found");

        await comment.increment("upVotes");
        return comment.reload();
    }

    // ✅ Increment downvotes
    static async incrementDownvote(commentId: number) {
        const comment = await Comment.findByPk(commentId);
        if (!comment) throw new Error("Comment not found");

        await comment.increment("downVotes");
        return comment.reload();
    }
}

export default CommentService;