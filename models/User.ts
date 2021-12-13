import { model, Schema, Document, Model, models } from "mongoose";
import { Rank } from "./Rank";
import { Grade } from "./Grade";
import { MobileSuit, MobileSuitSchema } from "./MobileSuit";

export interface User extends Document {
  twitterId: string;
  twitterName: string;
  grade?: Schema.Types.ObjectId | string;
  rank?: Schema.Types.ObjectId | string;
  discordId?: string;
  openSNS: "Open" | "FriendsOnly" | "No";
  favoriteMS?: [MobileSuit];
  bio?: string;
}

export const UserSchema: Schema = new Schema(
  {
    twitterId: {
      type: String,
      required: true,
    },
    twitterName: {
      type: String,
      required: true,
    },
    grade: { type: Schema.Types.ObjectId, ref: "Grade" },
    rank: { type: Schema.Types.ObjectId, ref: "Rank" },
    discordId: String,
    openSNS: {
      type: String,
      enum: ["Open", "FriendsOnly", "No"],
      required: true,
    },
    favoriteMS: [{ type: MobileSuitSchema, ref: "MobileSuit" }],
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

interface UserModel extends Model<User> {}

export default models.User
  ? (models.User as UserModel)
  : model<User, UserModel>("User", UserSchema);
