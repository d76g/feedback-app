import express from "express";
import http from "http";
import dotenv from "dotenv";
import sequelize from "./config/database";
import feedbackRoutes from "./routes/feedback.route";
import commentRoutes from "./routes/comment.route";
import applicationRoutes from "./routes/application.route";
import authRoutes from "./routes/auth.route";
import { Server } from "socket.io";
import {
  handleDownvoteComment,
  handleNewComment,
  handleUpvoteComment,
} from "./websockets/comment.event";
import cors from "cors";
dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to access the API
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies/auth headers if needed
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend connection
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("newComment", async (data) => {
    await handleNewComment(data, io);
  });

  socket.on("upvoteComment", async (data) => {
    await handleUpvoteComment(data, io);
  });

  socket.on("downvoteComment", async (data) => {
    await handleDownvoteComment(data, io);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});
// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api", feedbackRoutes);
app.use("/api", commentRoutes);
app.use("/api", applicationRoutes);
app.use("/api", authRoutes);
app.get("/api", (_req, res) => {
  res.send("🚀 Server is running!");
});

// ✅ Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    await sequelize.sync({ force: false });
    console.log("✅ Database models synced!");

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

// Start Server
startServer();
