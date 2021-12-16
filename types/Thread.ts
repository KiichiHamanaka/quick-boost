import { Document } from "mongoose";
import { UserID } from "../ValueObject/UserVO";
import { ThreadID } from "../ValueObject/ThreadVO";
import { GameMode, PlayStyle, Position, ThreadStyle } from "./Union";
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
  useMS?: Array<MSID>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  finishedAt: string;
}
