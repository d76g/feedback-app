import { Request, Response } from "express";
import Comment from "../models/comment.model";
import { CreationAttributes } from "sequelize";

// using promise<void> to handle async functions
export const postComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, feedbackId, text } = req.body;

    if (!userId || !feedbackId || !text) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const commentData: CreationAttributes<Comment> = {
      userId,
      feedbackId,
      text,
    };

    const comment = await Comment.create(commentData);

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error posting comment", error });
  }
};

export const getCommentsByFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { feedbackId } = req.params;

    const comments = await Comment.findAll({
      where: { feedbackId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

export const upvoteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    await comment.increment("upVotes");

    res.status(200).json({ message: "Upvoted successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Error upvoting comment", error });
  }
};

export const downvoteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    await comment.increment("downVotes");

    res.status(200).json({ message: "Downvoted successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Error downvoting comment", error });
  }
};