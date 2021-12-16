import { MSID } from "../ValueObject/MobileSuitVO";
import { MSDict } from "../dict/MSDict";
import { SeriesDict } from "../dict/SeriesDict";
import { SeriesId } from "../ValueObject/SeriesVO";

export const getMSNameFromMSID = (msid: MSID): string | undefined => {
  const arr = Object.values(MSDict);
  return arr[msid.value]?.name;
};

export const getSeriesName = (sid: SeriesId): string | undefined => {
  const arr = Object.values(SeriesDict);
  return arr[sid.value]?.name;
};
