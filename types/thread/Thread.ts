import { GameMode, PlayStyle, Position, ThreadStyle } from "../Union";
import { UserID } from "../User";
import mongoose from "mongoose";

export interface Thread {
  _id?: ThreadID;
  threadAuthor: UserID;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  allowUsers: Array<UserID>;
  useMS: Array<number>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  startedAt: Date;
  finishedAt: Date;
}

export type ThreadID = {
  _id: mongoose.Types.ObjectId;
  _meta: "ThreadID";
};

export const newThreadID = (): ThreadID => {
  return {
    _id: new mongoose.Types.ObjectId(),
    _meta: "ThreadID",
  };
};

export const applyThreadID = (str: string): ThreadID => {
  return {
    _id: new mongoose.Types.ObjectId(str),
    _meta: "ThreadID",
  };
};
