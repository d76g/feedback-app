import type { Comment } from "./comment";

export interface User {
  id: number;
  username: string;
}

export interface Feedback {
  id: number;
  applicationId: number;
  rating: number; // 1 to 5
  note: null | string; // optional
  createdAt: string;
  updatedAt: string;
  userId: number;
  User: User;
  Comments?: Comment[]; // optional
}
