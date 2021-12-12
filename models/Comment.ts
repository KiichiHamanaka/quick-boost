import { model, Schema, Document, Model, models } from "mongoose";
import { User } from "./User";
import { Thread } from "./Thread";

export interface Comment extends Document {
  threadId: Schema.Types.ObjectId | string;
  comment: string;
  commentAuthor: Schema.Types.ObjectId | string;
}

export const CommentSchema: Schema = new Schema(
  {
    threadId: { type: Schema.Types.ObjectId, ref: "Thread", required: "true" },
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
