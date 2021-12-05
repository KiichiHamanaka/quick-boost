import { model, Schema, Document, Model, models } from "mongoose";
import { Rank, RankSchema } from "./Rank";
import { Grade, GradeSchema } from "./Grade";
import { MobileSuit, MobileSuitSchema } from "./MobileSuit";

export interface User extends Document {
  twitter: string;
  handleName: string;
  grade: Grade;
  rank: Rank;
  discordName: string;
  openSNSName: "Open" | "FriendsOnly" | "No";
  favoriteMS: Array<MobileSuit>;
  message: string;
  created_at: string;
  good: number;
  token: string;
}

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
  favoriteMS: [MobileSuitSchema],
  message: String,
  created_at: { type: Date, default: Date.now },
  good: Number,
  token: { type: String, require: true },
});

interface UserModel extends Model<User> {}

export default models.User
  ? (models.User as UserModel)
  : model<User, UserModel>("User", UserSchema);
