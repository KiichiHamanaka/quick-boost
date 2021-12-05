import { Series } from "../models/Series";

export const MSImagePath = (name: string, series: Series) => {
  return `/MS/${series}/${name}`;
};

export const seriesImagePath = (series: string) => {
  return `/Series/logo_${series}`;
};
