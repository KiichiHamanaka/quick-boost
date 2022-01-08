import { Thread } from "../types/thread/Thread";

type Sort = "ASC" | "DESC";

type State = {
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
  | { type: "reset"; state: State }
  | { type: "filterMS"; msid: number };

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
    case "reset": // reset all state
      state = action.state;
      return state;
    case "filterMS":
      return {
        ...state,
        threads: state.threads.filter((thread) => {
          thread.useMS.includes(action.msid);
        }),
      };
    default:
      return state;
  }
};
