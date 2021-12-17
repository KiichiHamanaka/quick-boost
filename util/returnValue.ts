import { MSID } from "../types/MobileSuitVO";
import { MSDict } from "../db/data/MSDict";
import { SeriesDict } from "../db/data/SeriesDict";
import { SeriesId } from "../types/SeriesVO";

export const getMSNameFromMSID = (msid: MSID): string | undefined => {
  const arr = Object.values(MSDict);
  return arr[msid.value]?.name;
};

export const getSeriesName = (sid: SeriesId): string | undefined => {
  const arr = Object.values(SeriesDict);
  return arr[sid.value]?.name;
};
