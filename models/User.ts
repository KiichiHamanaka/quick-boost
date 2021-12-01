import { Schema, model } from "mongoose";
import MobileSuite from "./MobileSuite";

const UserSchema: Schema = new Schema({
  Twitter: String,
  handleName: String,
  grade: Boolean,
  rank: { type: Date, default: Date.now },
  favoriteMS: [MobileSuite],
  profile: String,
  created_at: { type: Date, default: Date.now },
  good: Number,
});

const User = model("User", UserSchema);

export default User;
