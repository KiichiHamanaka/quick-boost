import { Cost } from "./Union";
import { SeriesId } from "../ValueObject/SeriesVO";
import { MSID } from "../ValueObject/MobileSuitVO";

export type MobileSuit = {
  id: MSID;
  name: string;
  cost: Cost;
  series: SeriesId;
};
