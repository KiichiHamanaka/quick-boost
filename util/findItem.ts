import { MobileSuit } from "../types/MobileSuit";
import { MSID } from "../ValueObject/MobileSuitVO";
import { MSDict } from "../dict/MSDict";
import { SeriesId } from "../ValueObject/SeriesVO";
import { Series } from "../types/Series";
import { SeriesDict } from "../dict/SeriesDict";

// DB干渉しない部分だけでいいかも 干渉部分はSWRで

// MSIDを引数にとりMSを返す関数
export const findMobileSuitFromMSID = (msid: MSID): MobileSuit | undefined => {
  return Object.values(MSDict)[msid.value];
};

// MSIDを引数にとりSeriesを返す関数
export const findSeriesFromSeriesID = (sid: SeriesId): Series | undefined => {
  return Object.values(SeriesDict)[sid.value];
};
