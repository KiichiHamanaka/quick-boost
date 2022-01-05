import { SeriesDict } from "../db/data/SeriesDict";

export type Series = {
  seriesId: number;
  name: string;
};

export const findSeriesFromSeriesID = (sid: number): Series => {
  return Object.values(SeriesDict)[sid];
};

export const seriesImagePath = (series: Series) => {
  return `/assets/Image/Series/logo_${series.name}`;
};

export const getSeriesName = (id: number): string | undefined => {
  return Object.values(SeriesDict)[id - 1]?.name;
};
