import { MobileSuit } from "../types/MobileSuit";
import { Series } from "../types/Series";
import { Cost } from "../types/Union";
import { getSeriesName } from "./returnValue";

export const MSImagePath = (MS: MobileSuit) => {
  return `Assets/Image/MS/${getSeriesName(MS.series)}/${MS.name}`;
};

export const seriesImagePath = (series: Series) => {
  return `Assets/Image/Series/logo_${series.name}`;
};

export const costsImagePath = (cost: Cost) => {
  return `Assets/Image/costs/cost_${cost}`;
};
