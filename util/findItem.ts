import { MobileSuit } from "../types/MobileSuit";
import { MSID, MSName } from "../types/ValueObject";

export const findMSFromId = (
  dict: { [K in number]?: MobileSuit },
  msid: MSID
): MobileSuit | undefined => {
  return dict[msid.value];
};

export const findMSsFromMSName = (
  msArray: (MobileSuit | undefined)[],
  msName: MSName
): MobileSuit | undefined => {
  return msArray.find((MS) => {
    if (MS !== undefined) {
      return MS.name.value.includes(msName.value);
    } else {
      return undefined;
    }
  });
};
