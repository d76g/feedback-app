import express from "express";
import { getApplications, getFeedbackByApplication } from "../controllers/applicationController";
const router = express.Router();

// ✅ Application Routes
router.get("/applications", getApplications);
router.get("/application/:applicationId", getFeedbackByApplication);

export default router;