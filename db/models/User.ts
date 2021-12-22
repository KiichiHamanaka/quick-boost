import { Document, model, Model, models, Schema } from "mongoose";

import { OpenSNSSettings } from "../../types/Union";

export const UserIdSchema: Schema = new Schema({
  value: Schema.Types.ObjectId,
  _meta: "UserID",
});

export interface User extends Document {
  twitterId: string;
  twitterName: string;
  grade?: string;
  rank?: string;
  discordId?: string;
  openSNSSettings: OpenSNSSettings;
  favoriteMSIDs: Array<number>;
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
