import { ThreadType } from "../types/thread/ThreadType";
import { GameMode, Position } from "../types/Union";

type Sort = "ASC" | "DESC";

export type ThreadState = {
  threads: ThreadType[];
  startedAt: Date | null;
  finishedAt: Date | null;
  useMS: Array<number>;
  gameMode: GameMode;
  position: Position;
  sort: Sort;
};

export const threadInitialState: ThreadState = {
  threads: [],
  startedAt: null,
  finishedAt: null,
  useMS: [],
  gameMode: "何でも",
  position: "どちらでも",
  sort: "DESC",
};

export type ThreadAction =
  | { type: "fetch"; threads: ThreadType[] }
  | { type: "sort"; sort: Sort }
  | { type: "startedAt"; startedAt: Date | null | "reset" }
  | { type: "finishedAt"; finishedAt: Date | null | "reset" }
  | { type: "gameMode"; gameMode: GameMode }
  | { type: "position"; position: Position }
  | { type: "reset"; state: ThreadState }
  | { type: "filterMS"; msids: number[] };

export const threadReducer = (
  state: ThreadState,
  action: ThreadAction
): ThreadState => {
  switch (action.type) {
    case "fetch": // reset all state
      return {
        ...state,
        threads: action.threads,
      };
    case "sort": // sort by date
      return {
        ...state,
        threads: state.threads.sort((a, b) => {
          if (a.startedAt < b.startedAt) return -1; //numberかdateならワンライナー
          if (a.startedAt < b.startedAt) return 1;
          return 0;
        }),
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
