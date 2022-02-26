import useSWR from "swr";
import * as fetcher from "../pages/api/fetcher";
import { User } from "../types/User";
import { Thread } from "../types/thread/Thread";
import { useEffect, useReducer, useState } from "react";
import { threadInitialState, threadReducer } from "../reducers/thread";
import useSelectMSBox from "./useSelectMSBox";

export const useThread = (tid: string) => {
  const { data, error } = useSWR(`/api/thread/${tid}`, fetcher.fetchGet);
  const thread: Thread = data;
  return {
    thread,
    isLoadingThread: !error && !data,
    isErrorThread: error,
  };
};

export const useThreads = () => {
  const { data, error } = useSWR(`/api/thread`, fetcher.fetchGet);
  const threads: Array<Thread> = data || [];
  const [threadState, threadDispatch] = useReducer(
    threadReducer,
    threadInitialState
  );
  const [result, setResult] = useState<Thread[]>(data || []);
  const { state, useMS } = useSelectMSBox();

  useEffect(() => {
    let tmp = threads;
    if (threadState.gameMode !== "何でも") {
      tmp = tmp.filter((t) => t.gameMode === threadState.gameMode);
    }
    // if (threadState.startedAt !== null) {
    //   result = result.filter((t) => t.startedAt >= threadState.startedAt);
    // }
    // if (threadState.finishedAt !== null) {
    //   result = result.filter((t) => t.finishedAt <= threadState.finishedAt);
    // }
    if (threadState.position !== "どちらでも") {
      tmp = tmp.filter((t) => t.position === threadState.position);
    }
    if (useMS.length) {
      tmp = tmp.filter((t) => t.useMS.some((ms) => useMS.includes(ms)));
    }
    // if (threadState.sort === "ASC") {
    //   result = result.sort((a, b) => {
    //     if (a.startedAt < b.startedAt) return -1;
    //     if (a.startedAt < b.startedAt) return 1;
    //     return 0;
    //   });
    // }
    setResult(tmp);
  }, [state.useMS, threadState, data]);

  return {
    threads,
    result,
    isLoadingThreads: !error && !data,
    isErrorThreads: error,
    threadState,
    threadDispatch,
  };
};

export const useComments = (tid: string) => {
  const { data, error } = useSWR(`/api/comment/${tid}`, fetcher.fetchGet);
  const comments: Comment = data;
  return {
    comments,
    isLoadingComments: !error && !data,
    isErrorComments: error,
  };
};

export const useUser = (uid: string) => {
  const { data, error } = useSWR(`/api/user/${uid}`, fetcher.fetchGet);
  const user: User = data;
  return {
    user,
    isLoadingUser: !error && !data,
    isErrorUser: error,
  };
};

export const useUsers = () => {
  const { data, error } = useSWR(`/api/user`, fetcher.fetchGet);
  const users: Array<User> = data;
  return {
    users,
    isLoadingUsers: !error && !data,
    isErrorUsers: error,
  };
};
