import express from "express";
import { addFeedback } from "../controllers/feedbackController";

const router = express.Router();

// ✅ Feedback Routes
router.post("/feedback", addFeedback);
export default router;