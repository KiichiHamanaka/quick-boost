import useSWR from "swr";
import * as fetcher from "../lib/fetcher";
import { User } from "../models/User";

export const useFind = (id: number) => {
  const { data, error } = useSWR(`/api/find/${id}`, fetcher.fetchGet);

  return {
    find: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFinds = () => {
  const { data, error } = useSWR(`/api/find`, fetcher.fetchGet);

  return {
    finds: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUser = (id: string) => {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher.fetchGet);
  const user: User = data;

  return {
    user,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUsers = () => {
  const { data, error } = useSWR(`/api/user`, fetcher.fetchGet);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};
