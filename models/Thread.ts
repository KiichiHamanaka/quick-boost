import { Document, Model, model, models, Schema } from "mongoose";
import { User } from "./User";
import { MobileSuit } from "./MobileSuit";
import { Comment } from "./Comment";

export interface Thread extends Document {
  threadAuthor: Schema.Types.ObjectId | string;
  title: string;
  body: string;
  playStyle: "ガチ" | "エンジョイ";
  threadStyle: "相方募集" | "プラベ";
  isVC: boolean;
  isPlaying: boolean;
  allowUsers?: Array<Schema.Types.ObjectId | string>;
  useMS?: Array<Schema.Types.ObjectId | string>;
  position: "前衛" | "後衛" | "どちらでも";
  tagCode: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  finishedAt: string;
  gameMode: "カジュアル" | "ランクマッチ" | "クロブフェス" | "どちらでも";
  comments?: Array<Schema.Types.ObjectId | string>;
}

export const ThreadSchema: Schema = new Schema(
  {
    threadAuthor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, max: 20 },
    body: { type: String, required: true, max: 140 },
    playStyle: { type: String, enum: ["ガチ", "エンジョイ"], required: true },
    threadStyle: { type: String, enum: ["相方募集", "プラベ"], required: true },
    isVC: { type: Boolean, required: true },
    isPlaying: { type: Boolean, required: true },
    allowUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    useMS: [{ type: Schema.Types.ObjectId, ref: "MobileSuit" }],
    position: {
      type: String,
      enum: ["前衛", "後衛", "どちらでも"],
      required: true,
    },
    tagCode: { type: String, required: true },
    startedAt: { type: String, required: true },
    finishedAt: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

interface ThreadModel extends Model<Thread> {}

export default models.Thread
  ? (models.Thread as ThreadModel)
  : model<Thread, ThreadModel>("Thread", ThreadSchema);
