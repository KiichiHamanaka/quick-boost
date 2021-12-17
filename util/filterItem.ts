import { MobileSuit } from "../types/MobileSuit";
import { Cost } from "../types/Union";
import { SeriesId } from "../types/SeriesVO";
import { nonNullable } from "../types/util";

export const filterMSsFromSeries = (
  dict: (MobileSuit | undefined)[],
  seriesId: SeriesId
): MobileSuit[] => {
  return Object.values(dict)
    .filter((MS) => MS && seriesId === MS.series)
    .filter(nonNullable);
};

export const filteredMSsFromMSName = (
  dict: (MobileSuit | undefined)[],
  msName: string
): MobileSuit[] => {
  return Object.values(dict)
    .filter((MS) => MS && msName.includes(MS.name))
    .filter(nonNullable);
};

// コストフィルタ
export const filteredMSsFromMSCost = (
  dict: (MobileSuit | undefined)[],
  msCost: Cost
): MobileSuit[] => {
  return Object.values(dict)
    .filter((MS) => {
      if (
        msCost !== "ALL" &&
        msCost !== "RANDOM" &&
        msCost !== undefined &&
        MS !== undefined
      ) {
        return msCost === MS.cost;
      }
    })
    .filter(nonNullable);
};
