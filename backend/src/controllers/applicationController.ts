import { Request, Response } from "express";
import db from "../models";

const { Application, Feedback, User, Comment } = db;

export const getApplications = async (_req: Request, res: Response): Promise<void> => {
    try {
  
      const applications = await Application.findAll({
        order: [["createdAt", "DESC"]],
      });
  
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching application", error });
    }
  };

// ✅ Get feedback by application ID
export const getFeedbackByApplication = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { applicationId } = req.params;
    const feedbackList = await Feedback.findAll({
      where: { applicationId },
      include: [User, Comment ],
    });

    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
}
