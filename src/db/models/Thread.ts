import { Document, Model, model, models, Schema } from "mongoose";
import { GameMode, PlayStyle, Position, ThreadStyle } from "../../types/Union";
import { User } from "./User";
import { Comment } from "./Comment";

export interface Thread extends Document {
  threadAuthor: User;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  useMS: Array<number>;
  position: Position;
  gameMode: GameMode;
  comments: Comment;
  tagCode: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  finishedAt: string;
}

export const ThreadSchema: Schema = new Schema(
  {
    threadAuthor: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, max: 20 },
    body: { type: String, required: true, max: 140 },
    playStyle: {
      type: String,
      enum: ["ガチ", "エンジョイ", "どちらでも"],
      required: true,
    },
    threadStyle: { type: String, enum: ["相方募集", "プラベ"], required: true },
    isVC: { type: Boolean, required: true },
    isPlaying: { type: Boolean, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    useMS: [{ type: Number }],
    position: {
      type: String,
      enum: ["前衛", "後衛", "どちらでも"],
      required: true,
    },
    gameMode: {
      type: String,
      enum: ["カジュアル", "ランクマッチ", "クロブフェス", "何でも"],
      required: true,
    },
    tagCode: { type: String, required: true },
    startedAt: { type: String, required: true },
    finishedAt: { type: String, required: true },
  },
  { timestamps: true }
);

interface ThreadModel extends Model<Thread> {}

export default models.Thread
  ? (models.Thread as ThreadModel)
  : model<Thread, ThreadModel>("Thread", ThreadSchema);
