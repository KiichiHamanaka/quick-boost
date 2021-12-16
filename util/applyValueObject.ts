import { MSID, MSName } from "../ValueObject/MobileSuitVO";
import { DiscordID } from "../ValueObject/UserVO";
import { SeriesId } from "../ValueObject/SeriesVO";

export const applyDiscordID = (str: string): DiscordID => {
  return {
    value: str,
    _meta: "DiscordID",
  };
};

// export const applyTwitterID = (str: string): TwitterID => {
//   return {
//     value: str,
//     _meta: "TwitterID",
//   };
// };
//
// export const applyTwitterName = (str: string): TwitterName => {
//   return {
//     value: str,
//     _meta: "TwitterName",
//   };
// };

export const applyMSID = (num: number): MSID => {
  return {
    value: num,
    _meta: "MSID",
  };
};

export const applySeriesId = (num: number): SeriesId => {
  return {
    value: num,
    _meta: "SeriesId",
  };
};

export const applyMSName = (str: string): MSName => {
  return {
    value: str,
    _meta: "MSName",
  };
};

// export const applyMSCost = (cost: Cost): MSCost => {
//   return {
//     value: cost,
//     _meta: "MSCost",
//   };
// };
