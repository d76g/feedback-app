import type { User } from "./feedback";

export interface Comment {
  id: number;
  feedbackId: number;
  text: string;
  upVotes: number;
  downVotes: number;
  createdAt: string;
  updatedAt?: string;
  User:User;
}
