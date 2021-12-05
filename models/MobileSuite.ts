import { model, Schema } from "mongoose";
import { SeriesSchema } from "./Series";

export const MobileSuiteSchema: Schema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, enum: [1500, 2000, 2500, 3000], required: true },
  series: { type: SeriesSchema, required: false },
});

const MobileSuite = model("MobileSuite", MobileSuiteSchema);

export default MobileSuite;
