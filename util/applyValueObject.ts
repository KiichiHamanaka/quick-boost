import { Cost, MSCost, MSID, MSName } from "../ValueObject/MobileSuitVO";
import { DiscordID, TwitterID, TwitterName } from "../ValueObject/UserVO";
import { SeriesName } from "../ValueObject/SeriesVO";

export const applyDiscordID = (str: string): DiscordID => {
  return {
    value: str,
    _meta: "DiscordID",
  };
};

export const applyTwitterID = (str: string): TwitterID => {
  return {
    value: str,
    _meta: "TwitterID",
  };
};

export const applyTwitterName = (str: string): TwitterName => {
  return {
    value: str,
    _meta: "TwitterName",
  };
};

export const applyMSID = (num: number): MSID => {
  return {
    value: num,
    _meta: "MSID",
  };
};

export const applySeriesName = (str: string): SeriesName => {
  return {
    value: str,
    _meta: "SeriesName",
  };
};

export const applyMSName = (str: string): MSName => {
  return {
    value: str,
    _meta: "MSName",
  };
};

export const applyMSCost = (cost: Cost): MSCost => {
  return {
    value: cost,
    _meta: "MSCost",
  };
};
