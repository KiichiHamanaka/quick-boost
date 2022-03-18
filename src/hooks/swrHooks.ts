import useSWR from "swr";
import * as fetcher from "../pages/api/fetcher";
import { UserType } from "../types/UserType";
import { ThreadType } from "../types/thread/ThreadType";
import { CommentType } from "../types/thread/CommentType";
import { useMemo, useReducer } from "react";
import {
  threadInitialState,
  threadReducer,
  ThreadState,
} from "../reducers/thread";
import useSelectMSBox from "./useSelectMSBox";
import dayjs from "dayjs";
import { MsBoxContext } from "../contexts/MsBoxContext";
import { PartnerMsBoxContext } from "../contexts/PartnerMsBoxContext";

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
  const threads: Array<ThreadType> = useMemo(() => {
    return data || [];
  }, [data]);
  const [threadState, threadDispatch] = useReducer(
    threadReducer,
    threadInitialState
  );
  const { useMS, partnerUseMS } = useSelectMSBox(
    MsBoxContext,
    PartnerMsBoxContext
  );
  const threadFilter = (
    threads: ThreadType[],
    tState: ThreadState,
    useMS: number[]
  ) => {
    let tmp = threads;
    if (tState.gameMode !== "何でも") {
      tmp = tmp.filter(
        (t) => t.gameMode === tState.gameMode || t.gameMode === "何でも"
      );
    }
    if (tState.startedAt !== null) {
      tmp = tmp.filter((t) => dayjs(t.startedAt).isAfter(tState.startedAt!));
    }
    if (tState.finishedAt !== null) {
      tmp = tmp.filter((t) => dayjs(t.finishedAt).isBefore(tState.finishedAt!));
    }
    if (tState.position !== "どちらでも") {
      tmp = tmp.filter(
        (t) => t.position === tState.position || t.position === "どちらでも"
      );
    }
    if (tState.playStyle !== "どちらでも") {
      tmp = tmp.filter(
        (t) => t.playStyle === tState.playStyle || t.playStyle === "どちらでも"
      );
    }
    if (useMS.length) {
      tmp = tmp.filter(
        (t) => t.useMS.some((ms) => useMS.includes(ms)) || t.useMS.length === 0
      );
    }
    if (partnerUseMS.length) {
      tmp = tmp.filter(
        (t) => t.useMS.some((ms) => useMS.includes(ms)) || t.useMS.length === 0
      );
    }
    if (tState.sortDesc) {
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
    return tmp;
  };

  const filterResult = useMemo(() => {
    return threadFilter(threads, threadState, useMS);
  }, [useMS, threadState, threads]);

  return {
    threads,
    filterResult,
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
