import { MobileSuit } from "../../types/MobileSuit";

export const MSDict: { [K in number]?: MobileSuit } = {
  1: {
    id: 1,
    name: "ガンダム",
    cost: "2000",
    series: 1,
  },
  2: {
    id: 1,
    name: "ガンダム",
    cost: "2000",
    series: 1,
  },
};

// MSDict[MSID.value]みたいな取得方法
