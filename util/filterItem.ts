//シリーズ名でフィルタ select
import { MobileSuit } from "../types/MobileSuit";
import { MSCost, MSName, SeriesName } from "../types/ValueObject";

// ジェネリクスなんもわからん
const nonNullable = <T>(value: T): value is NonNullable<T> => value != null;

export const filterMSsFromSeries = (
  dict: { [K in number]?: MobileSuit },
  sname: SeriesName
): MobileSuit[] => {
  return Object.values(dict)
    .filter((MS) => {
      if (MS !== undefined) {
        return MS.series.name === sname.value;
      } else {
        return;
      }
    })
    .filter(nonNullable);
};

//MS名でフィルタ input
export const filteredMSsFromMSName = (
  dict: (MobileSuit | undefined)[],
  msName: MSName
): MobileSuit[] => {
  return Object.values(dict)
    .filter((MS) => {
      if (MS !== undefined) {
        return MS.series.name.includes(msName.value);
      } else {
        return;
      }
    })
    .filter(nonNullable);
};

// コストでフィルタ
const filteredMSsFromMSCost = (
  dict: (MobileSuit | undefined)[],
  msCost: MSCost
): MobileSuit[] => {
  return Object.values(dict)
    .filter((MS) => {
      if (MS !== undefined) {
        return MS.cost === msCost.value;
      } else {
        return;
      }
    })
    .filter(nonNullable);
};
