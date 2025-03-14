import express from "express";
import { addFeedback, getAllFeedback } from "../controllers/feedbackController";

const router = express.Router();

// ✅ Feedback Routes
router.post("/feedback", addFeedback);
router.get("/feedback", getAllFeedback);

export default router;