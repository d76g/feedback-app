import express from "express";
import {
  postComment,
  getCommentsByFeedback,
  upvoteComment,
  downvoteComment,
} from "../controllers/commentController";

const router = express.Router();

// ✅ Comment Routes
router.post("/feedback/:feedbackId/comment", postComment);
router.get("/feedback/:feedbackId/comments", getCommentsByFeedback);
router.post("/comment/:commentId/upvote", upvoteComment);
router.post("/comment/:commentId/downvote", downvoteComment);

export default router;