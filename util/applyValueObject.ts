import { MSID, MSName } from "../types/MobileSuitVO";
import { DiscordID, UserID } from "../types/UserVO";
import { SeriesId } from "../types/SeriesVO";
import { ThreadID } from "../types/thread/ThreadVO";
import { Schema } from "mongoose";

export const applyUserID = (str: string): UserID => {
  const objId = new Schema.Types.ObjectId(str);
  return {
    value: objId,
    _meta: "UserID",
  };
};

export const applyThreadID = (str: string): ThreadID => {
  const objId = new Schema.Types.ObjectId(str);
  return {
    value: objId,
    _meta: "ThreadID",
  };
};

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
