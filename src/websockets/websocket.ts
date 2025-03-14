import WebSocket from "ws";
import { handleNewFeedback } from "./feedback.event";
import { handleDownvoteComment, handleNewComment, handleUpvoteComment } from "./comment.event";

const setupWebSocketServer = (server: any) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws: WebSocket) => {
        console.log("🔌 New client connected");

        ws.on("message", async (message: string) => {
            try {
                const parsedMessage = JSON.parse(message);
                const { event, data } = parsedMessage;

                switch (event) {
                    case "newFeedback":
                        await handleNewFeedback(data, ws, wss);
                        break;
                    case "newComment":
                        await handleNewComment(data, ws, wss);
                        break;
                    case "upvoteComment":
                        await handleUpvoteComment(data, ws, wss);
                        break;
                    case "downvoteComment":
                        await handleDownvoteComment(data, ws, wss);
                        break;
                    default:
                        ws.send(JSON.stringify({ error: "❌ Unknown event received." }));
                        break;
                }
            } catch (error) {
                console.error("❌ Error processing message:", error);
                ws.send(JSON.stringify({ error: "❌ Invalid message format." }));
            }
        });

        ws.on("close", () => console.log("❌ Client disconnected."));
        ws.on("error", (err) => console.error("❌ WebSocket Error:", err));
    });

    return wss;
};

export default setupWebSocketServer;