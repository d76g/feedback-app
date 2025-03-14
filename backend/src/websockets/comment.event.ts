import WebSocket from "ws";
import CommentService from "../services/comment.service";

export const handleNewComment = async (data: any, ws: WebSocket, wss: WebSocket.Server) => {
    try {
        console.log("💬 New comment received:", data);

        if (!data.userId || !data.feedbackId || !data.text) {
            ws.send(JSON.stringify({ error: "❌ Missing required fields: userId, feedbackId, text" }));
            return;
        }

        // ✅ Save comment in the database
        const newComment = await CommentService.createComment(data);

        console.log("✅ Comment saved:", newComment.toJSON());

        // ✅ Broadcast new comment to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: "updateComment", data: newComment }));
            }
        });
    } catch (error) {
        console.error("❌ Error processing comment:", error);
        ws.send(JSON.stringify({ error: "❌ Could not save comment." }));
    }
};
// ✅ Handle Upvote
export const handleUpvoteComment = async (data: any, ws: WebSocket, wss: WebSocket.Server) => {
    try {
        console.log("👍 Upvote received:", data);

        if (!data.commentId) {
            ws.send(JSON.stringify({ error: "❌ Missing required field: commentId" }));
            return;
        }

        // ✅ Increment upvote in the database
        const updatedComment = await CommentService.incrementUpvote(data.commentId);

        console.log("✅ Comment upvoted:", updatedComment.toJSON());

        // ✅ Broadcast updated comment to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: "updateComment", data: updatedComment }));
            }
        });
    } catch (error) {
        console.error("❌ Error upvoting comment:", error);
        ws.send(JSON.stringify({ error: "❌ Could not upvote comment." }));
    }
};

// ✅ Handle Downvote
export const handleDownvoteComment = async (data: any, ws: WebSocket, wss: WebSocket.Server) => {
    try {
        console.log("👎 Downvote received:", data);

        if (!data.commentId) {
            ws.send(JSON.stringify({ error: "❌ Missing required field: commentId" }));
            return;
        }

        // ✅ Increment downvote in the database
        const updatedComment = await CommentService.incrementDownvote(data.commentId);

        console.log("✅ Comment downvoted:", updatedComment.toJSON());

        // ✅ Broadcast updated comment to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: "updateComment", data: updatedComment }));
            }
        });
    } catch (error) {
        console.error("❌ Error downvoting comment:", error);
        ws.send(JSON.stringify({ error: "❌ Could not downvote comment." }));
    }
};