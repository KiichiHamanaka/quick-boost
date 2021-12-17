import {Document, model, Model, models, Schema} from "mongoose";

import {MSIdSchema, UserIdSchema} from "./Id";
import {OpenSNSSettings} from "../../types/Union";
import {MSID} from "../../types/MobileSuitVO";

export interface User extends Document {
  twitterId: string;
  twitterName: string;
  grade?: string;
  rank?: string;
  discordId?: string;
  openSNSSettings: OpenSNSSettings;
  favoriteMSIDs: Array<MSID>;
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
