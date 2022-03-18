import { GameMode, PlayStyle, Position, ThreadStyle } from "../Union";
import mongoose from "mongoose";
import { UserType } from "../UserType";

export interface ThreadType {
  _id: mongoose.Types.ObjectId;
  threadAuthor: mongoose.Types.ObjectId | UserType;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  useMS: Array<number>;
  partnerUseMS: Array<number>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  startedAt: Date;
  finishedAt: Date;
}
