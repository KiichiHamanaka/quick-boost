import { MobileSuit } from "../types/MobileSuit";
import { Series } from "../types/Series";

export const MSImagePath = (MS: MobileSuit) => {
  return `Assets/Image/MS/${MS.series.name}/${MS.name}`;
};

export const seriesImagePath = (series: Series) => {
  return `Assets/Image/Series/logo_${series.name}`;
};
