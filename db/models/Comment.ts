import { model, Schema, Document, Model, models } from "mongoose";
import { User, UserIdSchema } from "./User";
import { ThreadID } from "../../types/thread/Thread";
import { ThreadIdSchema } from "./Thread";

export interface Comment extends Document {
  threadId: ThreadID;
  comment: string;
  commentAuthor: User;
  createdAt: string;
  updatedAt: string;
}

export const CommentSchema: Schema = new Schema(
  {
    threadId: { type: ThreadIdSchema, required: "true" },
    comment: { type: String, required: true, max: 20 },
    commentAuthor: {
      type: UserIdSchema,
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
