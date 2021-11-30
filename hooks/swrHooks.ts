import useSWR from "swr";
import * as fetcher from "../lib/fetcher";

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
