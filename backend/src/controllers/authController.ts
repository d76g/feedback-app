import { Request, Response } from "express";
import db from "../models";

const { User } = db;

// login using username
export const login = async (req: Request, res: Response): Promise<void> => {
    try {

        const  username  = req.body.username;
        const user = await User.findOne({ where: { username } });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};