import { Schema, model } from "mongoose";
import { MobileSuiteSchema } from "./MobileSuite";
import { RankSchema } from "./Rank";
import { FollowSchema } from "./Follow";
import { GradeSchema } from "./Grade";

export const UserSchema: Schema = new Schema({
  twitter: {
    type: String,
    required: true,
  },
  handleName: {
    type: String,
    required: true,
  },
  grade: { type: GradeSchema },
  rank: { type: RankSchema },
  discordName: String,
  openSNSName: {
    type: String,
    enum: ["Open", "FriendsOnly", "No"],
    required: true,
  },
  favoriteMS: [MobileSuiteSchema],
  message: String,
  created_at: { type: Date, default: Date.now },
  good: Number,
  friends: [FollowSchema],
});

const User = model("User", UserSchema);

export default User;
