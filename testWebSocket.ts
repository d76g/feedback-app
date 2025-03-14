const WebSocketClient = require("ws");

const ws = new WebSocketClient("ws://localhost:3000");

ws.on("open", () => {
    console.log("✅ Connected to WebSocket server!");
    ws.send(JSON.stringify({ event: "newFeedback", data: { note: "Test from WebSocket client" } }));
});

ws.on("message", (message) => {
    console.log("📩 Received:", message.toString());
});

ws.on("error", (error) => {
    console.error("❌ WebSocket Error:", error);
});

ws.on("close", () => {
    console.log("🔌 WebSocket Disconnected");
});