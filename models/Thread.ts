import { Document, Model, model, models, Schema } from "mongoose";
import { User, UserSchema } from "./User";
import { MobileSuit } from "../types/MobileSuit";
import { PlayStyle } from "../ValueObject/ThreadVO";

export interface Thread extends Document {
  id: string;
  threadAuthor: User;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  allowUsers?: Array<Schema.Types.ObjectId>;
  useMS?: Array<MobileSuit>; // IDじゃないとだめな理由ってなんですか? カードコンポーネントでとってくるときどうすりゃいいかわからん
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
    threadAuthor: { type: UserSchema, ref: "User", required: true },
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
