import { MobileSuit } from "../../types/MobileSuit";

export const MSDict: { [K in number]?: MobileSuit } = {
  1: {
    id: { value: 1, _meta: "MSID" },
    name: "ガンダム",
    cost: "2000",
    series: { value: 1, _meta: "SeriesId" },
  },
  2: {
    id: { value: 2, _meta: "MSID" },
    name: "ガンダム",
    cost: "2000",
    series: { value: 1, _meta: "SeriesId" },
  },
};

// MSDict[MSID.value]みたいな取得方法
