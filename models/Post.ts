import { model, Schema, Document, Model, models } from "mongoose";
import { User, UserSchema } from "./User";

export interface Post extends Document {
  message: string;
  author: User;
}

export const PostSchema: Schema = new Schema({
  message: String,
  author: UserSchema,
});

interface PostModel extends Model<Post> {}

export default models.Post
  ? (models.Post as PostModel)
  : model<Post, PostModel>("Post", PostSchema);
