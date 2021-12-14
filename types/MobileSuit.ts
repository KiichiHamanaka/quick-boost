import { MSCost, MSName, MSSeries } from "../ValueObject/MobileSuitVO";

export type MobileSuit = {
  name: MSName;
  cost: MSCost;
  series: MSSeries;
};
