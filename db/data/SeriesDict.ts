import { Series } from "../../types/Series";

export const SeriesDict: { [K in number]?: Series } = {
  1: {
    seriesId: { value: 1, _meta: "SeriesId" },
    name: "機動戦士ガンダム",
  },
  2: {
    seriesId: { value: 2, _meta: "SeriesId" },
    name: "機動戦士Zガンダム",
  },
};
