import { model, Schema, Document, Model, models } from "mongoose";
import { Grade } from "../types/Grade";
import { Rank } from "../types/Rank";
import { MobileSuit } from "../types/MobileSuit";

import { MSIdSchema, UserIdSchema } from "./Id";
import { OpenSNS } from "../types/Union";

export interface User extends Document {
  twitterId: string;
  twitterName: string;
  grade?: Grade;
  rank?: Rank;
  discordId?: string;
  openSNS: OpenSNS;
  favoriteMS?: Array<MobileSuit>;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export const UserSchema: Schema = new Schema(
  {
    _id: { type: UserIdSchema, required: true },
    twitterId: {
      type: String,
      required: true,
    },
    twitterName: {
      type: String,
      required: true,
    },
    grade: { type: Number }, //直す
    rank: { type: Number }, //直す
    discordId: String,
    openSNS: {
      type: String,
      enum: ["Open", "FriendsOnly", "No"],
      required: true,
    },
    favoriteMS: [{ type: MSIdSchema, required: true }],
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
