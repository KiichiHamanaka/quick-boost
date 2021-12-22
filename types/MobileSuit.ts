import { Cost } from "./Union";
import { nonNullable } from "./util";
import { MSDict } from "../db/data/MSDict";
import { getSeriesName } from "./Series";

export type MobileSuit = {
  id: number;
  name: string;
  cost: Cost;
  series: number;
};

export const filterMSsFromSeries = (
  dict: (MobileSuit | undefined)[],
  seriesId: number
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

export const findMobileSuitFromMSID = (
  msid: number
): MobileSuit | undefined => {
  return Object.values(MSDict)[msid];
};

export const costsImagePath = (cost: Cost) => {
  return `Assets/Image/costs/cost_${cost}`;
};

export const MSImagePath = (MS: MobileSuit) => {
  return `Assets/Image/MS/${getSeriesName(MS.series)}/${MS.name}`;
};

export const getMSNameFromMSID = (id: number): string | undefined => {
  return Object.values(MSDict)[id]?.name;
};
