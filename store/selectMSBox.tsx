import { MobileSuit } from "../types/MobileSuit";
import { Cost } from "../types/Union";
import { MSDict } from "../db/data/MSDict";
import { nonNullable } from "../types/util";

export type State = {
  mobileSuits: MobileSuit[];
  cost: Cost;
  useMS: number[];
  seriesId: number | null;
  msName: string | null;
  selectMobileSuitsIds: number[];
};

export type MSBoxAction =
  | { type: "cost"; cost: Cost }
  | { type: "seriesId"; seriesId: number | null }
  | { type: "msName"; msName: string | null }
  | { type: "useMS"; useMS: number };

export const msBoxReducer = (state: State, action: MSBoxAction) => {
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

export const msBoxInitialState: State = {
  mobileSuits: Object.values(MSDict).filter(nonNullable),
  useMS: [],
  cost: "ALL",
  seriesId: null,
  msName: "",
  selectMobileSuitsIds: [],
};
