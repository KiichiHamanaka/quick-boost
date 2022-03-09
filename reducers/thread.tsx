import { ThreadType } from "../types/thread/ThreadType";
import { GameMode, PlayStyle, Position } from "../types/Union";

export type ThreadState = {
  threads: ThreadType[];
  startedAt: Date | null;
  finishedAt: Date | null;
  useMS: Array<number>;
  gameMode: GameMode;
  playStyle: PlayStyle;
  position: Position;
  sortDesc: boolean;
};

export const threadInitialState: ThreadState = {
  threads: [],
  startedAt: null,
  finishedAt: null,
  useMS: [],
  playStyle: "どちらでも",
  gameMode: "何でも",
  position: "どちらでも",
  sortDesc: true,
};

export type ThreadAction =
  | { type: "fetch"; threads: ThreadType[] }
  | { type: "sortDesc" }
  | { type: "startedAt"; startedAt: Date | null | "reset" }
  | { type: "finishedAt"; finishedAt: Date | null | "reset" }
  | { type: "gameMode"; gameMode: GameMode }
  | { type: "playStyle"; playStyle: PlayStyle }
  | { type: "position"; position: Position }
  | { type: "reset"; state: ThreadState }
  | { type: "filterMS"; msids: number[] };

export const threadReducer = (
  state: ThreadState,
  action: ThreadAction
): ThreadState => {
  switch (action.type) {
    case "sortDesc":
      return {
        ...state,
        sortDesc: !state.sortDesc,
      };
    case "startedAt":
      if (action.startedAt === "reset") {
        return {
          ...state,
          startedAt: threadInitialState.startedAt,
        };
      } else {
        return {
          ...state,
          startedAt: action.startedAt,
        };
      }
    case "finishedAt":
      if (action.finishedAt === "reset") {
        return {
          ...state,
          finishedAt: threadInitialState.finishedAt,
        };
      } else {
        return {
          ...state,
          finishedAt: action.finishedAt,
        };
      }
    case "filterMS":
      return {
        ...state,
        threads: state.threads.filter((thread) => {
          thread.useMS.some((msid) => action.msids.includes(msid));
        }),
      };
    case "playStyle":
      return {
        ...state,
        playStyle: action.playStyle,
      };
    case "gameMode":
      return {
        ...state,
        gameMode: action.gameMode,
      };
    case "position":
      return {
        ...state,
        position: action.position,
      };
    default:
      return state;
  }
};
