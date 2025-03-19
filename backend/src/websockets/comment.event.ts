import { Server } from "socket.io";
import CommentService from "../services/comment.service";

// Handle new comment
export const handleNewComment = async (data: any, io: Server) => {
  try {
    console.log("💬 New comment received:", data);

    if (!data.userId || !data.feedbackId || !data.text) {
      return;
    }

    // Broadcast new comment to all connected clients
    io.emit("updateComment", data);
  } catch (error) {
    console.error("❌ Error processing comment:", error);
  }
};

// Handle upvotes
export const handleUpvoteComment = async (data: any, io: Server) => {
  try {
    console.log("👍 Upvote received:", data);

    if (!data.commentId) {
      return;
    }

    // Increment upvote in database
    const updatedComment = await CommentService.incrementUpvote(data.commentId);
    console.log("✅ Comment upvoted:", updatedComment.toJSON());

    // Broadcast updated comment
    io.emit("updateComment", updatedComment);
  } catch (error) {
    console.error("❌ Error upvoting comment:", error);
  }
};

// Handle downvotes
export const handleDownvoteComment = async (data: any, io: Server) => {
  try {
    console.log("👎 Downvote received:", data);

    if (!data.commentId) {
      return;
    }

    // Increment downvote in database
    const updatedComment = await CommentService.incrementDownvote(data.commentId);
    console.log("✅ Comment downvoted:", updatedComment.toJSON());

    // Broadcast updated comment
    io.emit("updateComment", updatedComment);
  } catch (error) {
    console.error("❌ Error downvoting comment:", error);
  }
};