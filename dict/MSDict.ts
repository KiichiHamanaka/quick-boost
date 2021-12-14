import { MobileSuit } from "../types/MobileSuit";

export const MSDict: { [K in number]?: MobileSuit } = {
  1: {
    name: "ガンダム",
    cost: 2000,
    series: {
      name: "機動戦士ガンダム",
    },
  },
  2: {
    name: "シャア専用ザク",
    cost: 2000,
    series: {
      name: "機動戦士ガンダム",
    },
  },
};
