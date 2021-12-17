import { Document, Model, model, models, Schema } from "mongoose";
import { MSIdSchema, ThreadIdSchema, UserIdSchema } from "./Id";
import { ThreadID } from "../ValueObject/ThreadVO";
import { UserID } from "../ValueObject/UserVO";
import { GameMode, PlayStyle, Position, ThreadStyle } from "../types/Union";
import { MSID } from "../ValueObject/MobileSuitVO";

export interface Thread extends Document {
  _id: ThreadID;
  threadAuthor: UserID;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  allowUsers?: Array<UserID>;
  useMS: Array<MSID>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  finishedAt: string;
}

export const ThreadSchema: Schema = new Schema(
  {
    _id: { type: ThreadIdSchema, required: true },
    threadAuthor: { type: UserIdSchema, required: true },
    title: { type: String, required: true, max: 20 },
    body: { type: String, required: true, max: 140 },
    playStyle: { type: String, enum: ["ガチ", "エンジョイ"], required: true },
    threadStyle: { type: String, enum: ["相方募集", "プラベ"], required: true },
    isVC: { type: Boolean, required: true },
    isPlaying: { type: Boolean, required: true },
    allowUsers: [{ type: UserIdSchema, required: true }],
    useMS: [{ type: MSIdSchema, required: true }],
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
