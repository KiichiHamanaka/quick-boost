import { Document, model, Model, models, Schema } from "mongoose";
import { OpenSNSSettings } from "../../types/Union";

export interface User extends Document {
  twitterUID: number;
  twitterId: string;
  twitterName: string;
  grade?: string;
  rank?: string;
  discordId?: string;
  openSNSSettings: OpenSNSSettings;
  favoriteMSIDs?: Array<number>;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export const UserSchema: Schema = new Schema(
  {
    twitterUID: {
      type: String,
      required: true,
    },
    twitterId: {
      type: String,
      required: true,
    },
    twitterName: {
      type: String,
      required: true,
    },
    grade: { type: String },
    rank: { type: String },
    discordId: String,
    openSNSSettings: {
      type: String,
      enum: ["Open", "FriendsOnly", "No"],
      required: true,
    },
    favoriteMS: [Number],
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
