import { GameMode, PlayStyle, Position, ThreadStyle } from "../Union";
import { UserType } from "../UserType";
import mongoose from "mongoose";

export interface ThreadType {
  _id: mongoose.Types.ObjectId;
  threadAuthor: mongoose.Types.ObjectId;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  useMS: Array<number>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  startedAt: Date;
  finishedAt: Date;
}
