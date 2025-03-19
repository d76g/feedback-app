import { Request, Response } from "express";
import db from "../models"; 

const  {Feedback} = db;// Import centralized db
// ✅ Add a new feedback
export const addFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, applicationId, note, rating } = req.body;

    if (!userId || !applicationId || !rating) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newFeedback = await Feedback.create({
      userId,
      applicationId,
      note,
      rating,
    });

    const feedbackWithUser = await Feedback.findByPk(newFeedback.id, {
      include: [
        { model: db.User, attributes: ["id", "username"] },
        { model: db.Comment },
      ],
    });

    // Broadcast via WebSocket
    const io = req.app.get("io");
    io.emit("updateFeedback", feedbackWithUser);

    //  Respond to API
    res.status(201).json(feedbackWithUser);
  } catch (error) {
    console.error("❌ Error creating feedback:", error);
    res.status(500).json({ message: "Error creating feedback", error });
  }
};


