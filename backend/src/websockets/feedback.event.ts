import { Server } from "socket.io";

export const handleNewFeedback = async (data: any, io: Server) => {
  try {
    console.log("📩 New feedback received:", data);

    if (!data.userId || !data.applicationId || !data.rating) {
      return;
    }

    // Broadcast new feedback to all connected clients
    io.emit("updateFeedback", data);
  } catch (error) {
    console.error("❌ Error processing feedback:", error);
  }
};