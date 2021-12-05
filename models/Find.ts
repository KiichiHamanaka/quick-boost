import { Document, Model, model, models, Schema } from "mongoose";
import { User, UserSchema } from "./User";
import { MobileSuit, MobileSuitSchema } from "./MobileSuit";
import { Post, PostSchema } from "./Post";

export interface Find extends Document {
  id: number;
  author: User;
  message: string;
  body: string;
  enjoyType: "ガチ" | "エンジョイ";
  isVC: boolean;
  isPlaying: boolean;
  allowUsers?: Array<User>;
  wantToUse?: Array<MobileSuit>;
  position: "前衛" | "後衛" | "どちらでも";
  created_at: string;
  start_at: string;
  end_at: string;
  Posts?: Post;
}

export const FindSchema: Schema = new Schema({
  author: { type: UserSchema, required: true },
  message: { type: String, required: true },
  body: { type: String, required: true, max: 140 },
  enjoyType: { type: String, enum: ["ガチ", "エンジョイ"], required: true },
  isVC: { type: Boolean, required: true },
  isPlaying: { type: Boolean, required: true },
  allowUsers: [{ type: UserSchema, required: true }],
  wantToUse: [{ type: MobileSuitSchema }],
  position: {
    type: String,
    enum: ["前衛", "後衛", "どちらでも"],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  start_at: { type: Date, required: true },
  end_at: { type: Date, required: true },
  Posts: [{ type: PostSchema }],
});

interface FindModel extends Model<Find> {}

export default models.Find
  ? (models.Find as FindModel)
  : model<Find, FindModel>("Find", FindSchema);
