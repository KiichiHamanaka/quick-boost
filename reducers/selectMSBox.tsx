import { MobileSuit } from "../types/MobileSuit";
import { Cost } from "../types/Union";
import { MSDict } from "../db/data/MSDict";
import { nonNullable } from "../types/util";

export type msBoxState = {
  mobileSuits: MobileSuit[];
  cost: Cost;
  useMS: number[];
  seriesId: number | null;
  msName: string | null;
};

export type MSBoxAction =
  | { type: "cost"; cost: Cost }
  | { type: "seriesId"; seriesId: number | null }
  | { type: "msName"; msName: string | null }
  | { type: "useMS"; useMS: number | "reset" };

export const msBoxReducer = (state: msBoxState, action: MSBoxAction) => {
  switch (action.type) {
    case "cost":
      switch (action.cost) {
        case "ALL":
          return {
            ...state,
            cost: action.cost,
          };
        default:
          return state;
      }
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
  useMS: [],
  cost: "ALL",
  seriesId: null,
  msName: "",
};
