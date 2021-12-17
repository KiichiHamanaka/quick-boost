import useSWR from "swr";
import * as fetcher from "../pages/api/fetcher";
import { User } from "../types/User";
import { Thread } from "../types/thread/Thread";
import { UserID } from "../types/UserVO";
import { ThreadID } from "../types/thread/ThreadVO";

export const useThread = (tid: ThreadID) => {
  const { data, error } = useSWR(`/api/thread/${tid.value}`, fetcher.fetchGet);
  const thread: Thread = data;
  return {
    thread,
    isLoadingThread: !error && !data,
    isErrorThread: error,
  };
};

export const useThreads = () => {
  const { data, error } = useSWR(`/api/thread`, fetcher.fetchGet);
  const threads: Array<Thread> = data;
  return {
    threads,
    isLoadingThreads: !error && !data,
    isErrorThreads: error,
  };
};

export const useUser = (uid: UserID) => {
  const { data, error } = useSWR(`/api/user/${uid.value}`, fetcher.fetchGet);
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
