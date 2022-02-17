import { Thread } from "../types/thread/Thread";

type Sort = "ASC" | "DESC";

export type State = {
  threads: Thread[];
  startedAt: Date | null;
  finishedAt: Date | null;
  useMS: Array<number>;
  sort: Sort;
};

export const threadInitialState: State = {
  threads: [],
  startedAt: null,
  finishedAt: null,
  useMS: [],
  sort: "DESC",
};

export type ThreadAction =
  | { type: "fetch"; threads: Thread[] }
  | { type: "sort"; sort: Sort }
  | { type: "startedAt"; startedAt: Date | "reset" }
  | { type: "finishedAt"; finishedAt: Date | "reset" }
  | { type: "reset"; state: State }
  | { type: "filterMS"; msids: number[] };

export const threadReducer = (state: State, action: ThreadAction): State => {
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
      }
      return {
        ...state,
        threads: state.threads.filter(
          (thread) => thread.startedAt > action.startedAt
        ),
      };
    case "finishedAt":
      if (action.finishedAt === "reset") {
        return {
          ...state,
          finishedAt: threadInitialState.finishedAt,
        };
      }
      return {
        ...state,
        threads: state.threads.filter(
          (thread) => thread.finishedAt > action.finishedAt
        ),
      };
    case "reset": // reset all state
      return threadInitialState;
    case "filterMS":
      return {
        ...state,
        threads: state.threads.filter((thread) => {
          thread.useMS.some((msid) => action.msids.includes(msid));
        }),
      };
    default:
      return state;
  }
};
