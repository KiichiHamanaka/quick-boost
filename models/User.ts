import { model, Schema, Document, Model, models, Types } from "mongoose";
import { Rank, RankSchema } from "./Rank";
import { Grade, GradeSchema } from "./Grade";
import { MobileSuit, MobileSuitSchema } from "./MobileSuit";

export interface User extends Document {
  twitter: string;
  handleName: string;
  grade?: Grade;
  rank?: Rank;
  discordName?: string;
  openSNSName: "Open" | "FriendsOnly" | "No";
  favoriteMS?: [MobileSuit];
  message?: string;
  created_at: string;
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
  grade: { type: Schema.Types.ObjectId, ref: "Grade" },
  rank: { type: Schema.Types.ObjectId, ref: "Rank" },
  discordName: String,
  openSNSName: {
    type: String,
    enum: ["Open", "FriendsOnly", "No"],
    required: true,
  },
  favoriteMS: [{ type: Schema.Types.ObjectId, ref: "MobileSuit" }],
  message: String,
  created_at: { type: Date, default: Date.now },
  token: { type: String, require: true },
});

interface UserModel extends Model<User> {}

export default models.User
  ? (models.User as UserModel)
  : model<User, UserModel>("User", UserSchema);
