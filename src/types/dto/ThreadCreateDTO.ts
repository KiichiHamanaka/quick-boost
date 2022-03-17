import { GameMode, PlayStyle, Position, ThreadStyle } from "../Union";
import mongoose from "mongoose";

interface UserCreateDTO {
  threadAuthor: mongoose.Types.ObjectId;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  useMS: Array<number>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  startedAt: Date;
  finishedAt: Date;
}

export default UserCreateDTO;
