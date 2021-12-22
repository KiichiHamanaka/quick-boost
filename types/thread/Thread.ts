import { GameMode, PlayStyle, Position, ThreadStyle } from "../Union";
import { User, UserID } from "../User";

export interface Thread {
  _id: ThreadID;
  threadAuthor: User;
  title: string;
  body: string;
  playStyle: PlayStyle;
  threadStyle: ThreadStyle;
  isVC: boolean;
  isPlaying: boolean;
  allowUsers?: Array<UserID>;
  useMS?: Array<number>;
  position: Position;
  gameMode: GameMode;
  tagCode: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  finishedAt: string;
}

export type ThreadID = {
  value: string;
  _meta: "ThreadID";
};

export const applyThreadID = (str: string): ThreadID => {
  return {
    value: str,
    _meta: "ThreadID",
  };
};
