import { model, Schema, Document, Model, models, Types } from "mongoose";
import { User } from "./User";

export interface Post extends Document {
  message: string;
  author: Types.ObjectId;
}

export const PostSchema: Schema = new Schema({
  message: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

interface PostModel extends Model<Post> {}

export default models.Post
  ? (models.Post as PostModel)
  : model<Post, PostModel>("Post", PostSchema);
