import { Document, Model, model, models, Schema, Types } from "mongoose";
import { User } from "./User";
import { MobileSuit } from "./MobileSuit";
import { Post, PostSchema } from "./Post";

export interface Find extends Document {
  id: number;
  author: Types.ObjectId;
  message: string;
  body: string;
  enjoyType: "ガチ" | "エンジョイ";
  isVC: boolean;
  isPlaying: boolean;
  allowUsers?: Array<Types.ObjectId>;
  wantToUse?: Array<Types.ObjectId>;
  position: "前衛" | "後衛" | "どちらでも";
  created_at: string;
  start_at: string;
  end_at: string;
  Posts?: Post;
  tagCode?: string;
}

export const FindSchema: Schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  body: { type: String, required: true, max: 140 },
  enjoyType: { type: String, enum: ["ガチ", "エンジョイ"], required: true },
  isVC: { type: Boolean, required: true },
  isPlaying: { type: Boolean, required: true },
  allowUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  wantToUse: [{ type: Schema.Types.ObjectId, ref: "MobileSuit" }],
  position: {
    type: String,
    enum: ["前衛", "後衛", "どちらでも"],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  start_at: { type: Date, required: true },
  end_at: { type: Date, required: true },
  Posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  tagCode: { type: String, required: false },
});

interface FindModel extends Model<Find> {}

export default models.Find
  ? (models.Find as FindModel)
  : model<Find, FindModel>("Find", FindSchema);
