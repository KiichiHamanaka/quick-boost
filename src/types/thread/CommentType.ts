import mongoose from "mongoose";

export type CommentType = {
  _id: mongoose.Types.ObjectId;
  threadId: mongoose.Types.ObjectId;
  comment: string;
  commentAuthor: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
