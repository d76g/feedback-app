import WebSocket from "ws";
import FeedbackService from "../services/feedback.service";

export const handleNewFeedback = async (data: any, ws: WebSocket, wss: WebSocket.Server) => {
    try {
        console.log("📩 New feedback received:", data);

        if (!data.userId || !data.applicationId || !data.rating) {
            ws.send(JSON.stringify({ error: "❌ Missing required fields: userId, applicationId, rating" }));
            return;
        }

        // ✅ Save feedback in the database
        const newFeedback = await FeedbackService.createFeedback(data);

        console.log("✅ Feedback saved:", newFeedback.toJSON());

        // ✅ Broadcast new feedback to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: "updateFeedback", data: newFeedback }));
            }
        });
    } catch (error) {
        console.error("❌ Error processing feedback:", error);
        ws.send(JSON.stringify({ error: "❌ Could not save feedback." }));
    }
};