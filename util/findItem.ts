import { MobileSuit } from "../types/MobileSuit";
import { MSID } from "../types/MobileSuitVO";
import { MSDict } from "../db/data/MSDict";
import { SeriesId } from "../types/SeriesVO";
import { Series } from "../types/Series";
import { SeriesDict } from "../db/data/SeriesDict";

// DB干渉しない部分だけでいいかも 干渉部分はSWRで

// MSIDを引数にとりMSを返す関数
export const findMobileSuitFromMSID = (msid: MSID): MobileSuit | undefined => {
  return Object.values(MSDict)[msid.value];
};

// MSIDを引数にとりSeriesを返す関数
export const findSeriesFromSeriesID = (sid: SeriesId): Series | undefined => {
  return Object.values(SeriesDict)[sid.value];
};
