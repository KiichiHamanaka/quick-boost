import { model, Schema } from "mongoose";
import { UserSchema } from "./User";

export const PostSchema: Schema = new Schema({
  message: { type: String, required: true },
  author: { type: UserSchema, required: true },
});

const Post = model("User", PostSchema);

export default Post;
