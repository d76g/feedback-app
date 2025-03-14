import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import feedbackRoutes from "./routes/feedback.route";
import commentRoutes from "./routes/comment.route";
import setupWebSocketServer from "./websockets/websocket";

dotenv.config();

const app = express();
const server = http.createServer(app);
setupWebSocketServer(server);
// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api", feedbackRoutes);
app.use("/api", commentRoutes);
app.get("/", (_req, res) => {
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