import { SeriesDict } from "../db/data/SeriesDict";

export type Series = {
  seriesId: number;
  name: string;
  title: string;
};

export const findSeriesFromSeriesID = (sid: number): Series => {
  return Object.values(SeriesDict)[sid - 1];
};

export const seriesImagePath = (series: Series) => {
  return `/assets/Image/Series/logo_${series.name}.png`;
};

export const getSeriesName = (id: number): string | undefined => {
  return Object.values(SeriesDict)[id - 1]?.name;
};
