import { Series } from "../types/Series";

export type Cost = 1500 | 2000 | 2500 | 3000;

export type MSID = {
  value: number;
  _meta: "MSID";
};

export type MSName = {
  value: string;
  _meta: "MSName";
};

export type MSCost = {
  value: Cost;
  _meta: "MSCost";
};

export type MSSeries = {
  value: Series;
  _meta: "MSSeries";
};
