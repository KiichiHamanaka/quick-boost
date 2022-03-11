import useSWR from "swr";
import * as fetcher from "../pages/api/fetcher";
import { UserType } from "../types/UserType";
import { ThreadType } from "../types/thread/ThreadType";
import { CommentType } from "../types/thread/CommentType";
import { useEffect, useReducer, useState } from "react";
import { threadInitialState, threadReducer } from "../reducers/thread";
import useSelectMSBox from "./useSelectMSBox";

export const useThread = (tid: string) => {
  const { data, error } = useSWR(`/api/thread/${tid}`, fetcher.fetchGet);
  const thread: ThreadType = data;
  return {
    thread,
    isLoadingThread: !error && !data,
    isErrorThread: error,
  };
};

export const useThreads = (fallbackData: ThreadType[]) => {
  const { data, error } = useSWR(`/api/thread`, fetcher.fetchGet, {
    fallbackData,
  });
  const threads: Array<ThreadType> = data || [];
  const [threadState, threadDispatch] = useReducer(
    threadReducer,
    threadInitialState
  );
  const [result, setResult] = useState<ThreadType[]>(data);
  const { useMS } = useSelectMSBox();

  useEffect(() => {
    let tmp = threads;
    if (threadState.gameMode !== "何でも") {
      tmp = tmp.filter(
        (t) => t.gameMode === threadState.gameMode || t.gameMode === "何でも"
      );
    }
    if (threadState.startedAt !== null) {
      tmp = tmp.filter((t) => t.startedAt >= threadState.startedAt!);
    }
    if (threadState.finishedAt !== null) {
      tmp = tmp.filter((t) => t.finishedAt >= threadState.finishedAt!);
    }
    if (threadState.position !== "どちらでも") {
      tmp = tmp.filter(
        (t) =>
          t.position === threadState.position || t.position === "どちらでも"
      );
    }
    if (threadState.playStyle !== "どちらでも") {
      tmp = tmp.filter(
        (t) =>
          t.playStyle === threadState.playStyle || t.playStyle === "どちらでも"
      );
    }
    if (useMS.length) {
      tmp = tmp.filter(
        (t) => t.useMS.some((ms) => useMS.includes(ms)) || t.useMS.length === 0
      );
    }
    if (threadState.sortDesc) {
      tmp = tmp.sort((a, b) => {
        if (a.startedAt > b.startedAt) return -1;
        if (a.startedAt > b.startedAt) return 1;
        return 0;
      });
    } else {
      tmp = tmp.sort((a, b) => {
        if (a.startedAt < b.startedAt) return -1;
        if (a.startedAt < b.startedAt) return 1;
        return 0;
      });
    }
    setResult(tmp);
  }, [useMS, threadState, threads]);

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
  const comments: Array<CommentType> = data;

  return {
    comments,
    isLoadingComments: !error && !data,
    isErrorComments: error,
  };
};

export const useUser = (uid: string) => {
  const { data, error } = useSWR(`/api/user/${uid}`, fetcher.fetchGet);
  const user: UserType = data;
  return {
    user,
    isLoadingUser: !error && !data,
    isErrorUser: error,
  };
};

export const useUserFromName = (uid: number) => {
  const { data, error } = useSWR(`/api/uid/${uid}`, fetcher.fetchGet);
  const user: UserType = data;
  return {
    user,
    isLoadingUser: !error && !data,
    isErrorUser: error,
  };
};

export const useUsers = () => {
  const { data, error } = useSWR(`/api/user`, fetcher.fetchGet);
  const users: Array<UserType> = data;
  return {
    users,
    isLoadingUsers: !error && !data,
    isErrorUsers: error,
  };
};
