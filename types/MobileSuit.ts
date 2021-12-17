import { Cost } from "./Union";
import { SeriesId } from "./SeriesVO";
import { MSID } from "./MobileSuitVO";

export type MobileSuit = {
  id: MSID;
  name: string;
  cost: Cost;
  series: SeriesId;
};
