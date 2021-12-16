import { MobileSuit } from "../types/MobileSuit";
import { Cost } from "../types/Union";
import { SeriesId } from "../ValueObject/SeriesVO";
import { nonNullable } from "../types/util";

export const filterMSsFromSeries = (
  dict: (MobileSuit | undefined)[],
  seriesId: SeriesId
): MobileSuit[] => {
  // const sidValue: Array<number> = seriesId.map((sid) => sid.value);
  return Object.values(dict)
    .filter((MS) => {
      if (MS !== undefined) {
        return seriesId === MS.series;
      } else {
        return;
      }
    })
    .filter(nonNullable);
};

// MS名でフィルタ input
export const filteredMSsFromMSName = (
  dict: (MobileSuit | undefined)[],
  msName: string
): MobileSuit[] => {
  return Object.values(dict)
    .filter((MS) => {
      if (MS !== undefined) {
        return msName.includes(MS.name);
      } else {
        return;
      }
    })
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
      } else {
        return;
      }
    })
    .filter(nonNullable);
};
