import express from "express";
import {
  postComment,
  upvoteComment,
  downvoteComment,
  getCommentsByFeedbackId,
} from "../controllers/commentController";

const router = express.Router();

// ✅ Comment Routes
router.post("/comment/:feedbackId", postComment);
router.post("/comment/:commentId/upvote", upvoteComment);
router.post("/comment/:commentId/downvote", downvoteComment);
router.get("/comment/:feedbackId", getCommentsByFeedbackId);

export default router;