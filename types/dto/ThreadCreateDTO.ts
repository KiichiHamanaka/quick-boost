import {
  GameMode,
  OpenSNSSettings,
  PlayStyle,
  Position,
  ThreadStyle,
} from "../Union";
import mongoose from "mongoose";
import { UserType } from "../UserType";

interface UserCreateDTO {
  threadAuthor: mongoose.Types.ObjectId;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  allowUsers: Array<UserType>;
  useMS: Array<number>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  startedAt: Date;
  finishedAt: Date;
}

export default UserCreateDTO;
