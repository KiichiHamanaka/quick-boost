import mongoose, { model, Schema, Document, Model, models } from "mongoose";
import { User } from "./User";

export interface Comment extends Document {
  threadId: mongoose.Types.ObjectId;
  comment: string;
  commentAuthor: User;
  createdAt: string;
  updatedAt: string;
}

export const CommentSchema: Schema = new Schema(
  {
    threadId: { type: Schema.Types.ObjectId, required: "true" },
    comment: { type: String, required: true, max: 20 },
    commentAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "true",
    },
  },
  { timestamps: true }
);

interface CommentModel extends Model<Comment> {}

export default models.Comment
  ? (models.Comment as CommentModel)
  : model<Comment, CommentModel>("Comment", CommentSchema);
