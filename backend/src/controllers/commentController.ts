import { Request, Response } from "express";
import db from "../models"; 

const { Comment } = db;
// using promise<void> to handle async functions
export const postComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, feedbackId, text } = req.body;

    if (!userId || !feedbackId || !text) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    

    const comment = await Comment.create({
      userId,
      feedbackId,
      text,
    });

    const commentWithUser = await Comment.findByPk(comment.id, {
      include: [{ model: db.User, attributes: ["id", "username"] }],
    });
    const io = req.app.get("io");
    io.emit("newComment", commentWithUser);
    res.status(201).json(commentWithUser);
  } catch (error) {
    res.status(500).json({ message: "Error posting comment", error });
  }
};
// get all comments by feedback id
export const getCommentsByFeedbackId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { feedbackId } = req.params;

    if (!feedbackId) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const comments = await Comment.findAll({
      where: { feedbackId },
      include: [{ model: db.User, attributes: ["id", "username"] }],
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error getting comments", error });
  }
};
export const upvoteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId, {
      include: [{ model: db.User, attributes: ["id", "username"] }],
    });
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    await comment.increment("upVotes"); 
    const io = req.app.get("io");
    io.emit("updateComment", comment);

    res.status(200).json({ message: "Upvoted successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Error upvoting comment", error });
  }
};

export const downvoteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId, {
      include: [{ model: db.User, attributes: ["id", "username"] }],
    });
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    await comment.increment("downVotes");
    const io = req.app.get("io");
    io.emit("updateComment", comment);

    res.status(200).json({ message: "Downvoted successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Error downvoting comment", error });
  }
};