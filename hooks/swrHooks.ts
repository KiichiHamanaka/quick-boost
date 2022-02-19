import useSWR from "swr";
import * as fetcher from "../pages/api/fetcher";
import { User, UserID } from "../types/User";
import { Thread, ThreadID } from "../types/thread/Thread";
import { useReducer } from "react";
import { threadInitialState, threadReducer } from "../reducers/thread";

export const useThread = (tid: ThreadID) => {
  const { data, error } = useSWR(`/api/thread/${tid._id}`, fetcher.fetchGet);
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
  return {
    threads,
    isLoadingThreads: !error && !data,
    isErrorThreads: error,
    threadState,
    threadDispatch,
  };
};

export const useComments = (tid: ThreadID) => {
  const { data, error } = useSWR(`/api/comment/${tid._id}`, fetcher.fetchGet);
  const comments: Comment = data;
  return {
    comments,
    isLoadingComments: !error && !data,
    isErrorComments: error,
  };
};

export const useUser = (uid: UserID) => {
  const { data, error } = useSWR(`/api/user/${uid._id}`, fetcher.fetchGet);
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
