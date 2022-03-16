import { MobileSuit } from "../types/MobileSuit";
import { Cost } from "../types/Union";
import { MSDict } from "../db/data/MSDict";
import { nonNullable } from "../types/util";

export type msBoxState = {
  mobileSuits: MobileSuit[];
  cost: Cost;
  useMS: number[];
  seriesId: number | "ALL";
  msName: string;
};

export type MSBoxAction =
  | { type: "cost"; cost: Cost }
  | { type: "seriesId"; seriesId: number | "ALL" }
  | { type: "msName"; msName: string }
  | { type: "mobileSuits"; mobileSuits: MobileSuit[] }
  | { type: "useMS"; useMS: number | "reset" };

export const msBoxReducer = (state: msBoxState, action: MSBoxAction) => {
  switch (action.type) {
    case "cost":
      return {
        ...state,
        cost: action.cost,
      };
    case "seriesId":
      return {
        ...state,
        seriesId: action.seriesId,
      };
    case "useMS":
      if (action.useMS === "reset") {
        return {
          ...state,
          useMS: [],
        };
      }
      const useMSList: Array<number> = state.useMS.includes(action.useMS)
        ? state.useMS.filter((id) => id !== action.useMS)
        : [...state.useMS, action.useMS];
      return {
        ...state,
        useMS: useMSList,
      };
    case "mobileSuits":
      return {
        ...state,
        mobileSuits: action.mobileSuits,
      };
    case "msName":
      return {
        ...state,
        msName: action.msName,
      };
    default:
      return state;
  }
};

export const msBoxInitialState: msBoxState = {
  mobileSuits: Object.values(MSDict).filter(nonNullable),
  cost: "ALL",
  useMS: [],
  seriesId: "ALL",
  msName: "",
};
