import mongoose from "mongoose";

export type Comment = {
  _id: mongoose.Types.ObjectId;
  threadId: mongoose.Types.ObjectId;
  comment: string;
  commentAuthor: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
};

export type CommentID = {
  _id: string;
  _meta: "CommentID";
};
