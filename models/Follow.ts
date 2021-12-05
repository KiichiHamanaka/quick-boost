import { Schema, model } from "mongoose";

export const FollowSchema: Schema = new Schema({
  followId: Number,
});

const Follow = model("Grade", FollowSchema);

export default Follow;
