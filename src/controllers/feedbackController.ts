import { Request, Response } from "express";
import { CreationAttributes } from "sequelize";
import Feedback from "../models/feedback.model";
import User from "../models/user.model";
import Application from "../models/application.model";

// ✅ Add a new feedback
export const addFeedback = async (req: Request, res: Response) : Promise<void> => {
    try {
      const { userId, applicationId, note, rating } = req.body;
  
      if (!userId || !applicationId || !rating) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
  
      // ✅ Corrected type inference
      const feedbackData: CreationAttributes<Feedback> = {
        userId,
        applicationId,
        note,
        rating,
      };
  
      const feedback = await Feedback.create(feedbackData);
  
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Error creating feedback", error });
    }
  };

// ✅ Get all feedback
export const getAllFeedback = async (_req: Request, res: Response) : Promise<void> => {
  try {
    const feedbackList = await Feedback.findAll({
      include: [User, Application],
    });

    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};