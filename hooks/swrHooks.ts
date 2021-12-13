import useSWR from "swr";
import * as fetcher from "../lib/fetcher";
import { User } from "../models/User";
import { Thread } from "../models/Thread";
import { MobileSuit } from "../models/MobileSuit";

export const useThread = (id: string) => {
  const { data, error } = useSWR(`/api/thread/${id}`, fetcher.fetchGet);
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

export const useUser = (id: string) => {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher.fetchGet);
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

export const useMobileSuits = () => {
  const { data, error } = useSWR(`/api/MS/`, fetcher.fetchGet);
  const res: Array<MobileSuit> = data;
  return {
    res,
    isLoading: !error && !data,
    isError: error,
  };
};
