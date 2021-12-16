import useSWR from "swr";
import * as fetcher from "../lib/fetcher";
import { User } from "../types/User";
import { Thread } from "../types/Thread";
import { UserID } from "../ValueObject/UserVO";
import { ThreadID } from "../ValueObject/ThreadVO";

export const useThread = (tid: ThreadID) => {
  const { data, error } = useSWR(`/api/thread/${tid.value}`, fetcher.fetchGet);
  const res: Thread = data;
  return {
    res,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useThreads = () => {
  const { data, error } = useSWR(`/api/thread`, fetcher.fetchGet);
  const res: Array<Thread> = data;
  return {
    res,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUser = (uid: UserID) => {
  const { data, error } = useSWR(`/api/user/${uid.value}`, fetcher.fetchGet);
  const res: User = data;
  return {
    res,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUsers = () => {
  const { data, error } = useSWR(`/api/user`, fetcher.fetchGet);
  const res: Array<User> = data;
  return {
    res,
    isLoading: !error && !data,
    isError: error,
  };
};
