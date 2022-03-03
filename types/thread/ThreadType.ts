import { GameMode, PlayStyle, Position, ThreadStyle } from "../Union";
import { User } from "../User";
import mongoose from "mongoose";

export interface ThreadType {
  _id?: mongoose.Types.ObjectId;
  threadAuthor: mongoose.Types.ObjectId;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  allowUsers: Array<User>;
  useMS: Array<number>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  startedAt: Date;
  finishedAt: Date;
}
