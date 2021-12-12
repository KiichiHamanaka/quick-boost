import { model, Schema, Document, Model, models } from "mongoose";
import { Series } from "./Series";

export interface MobileSuit extends Document {
  name: string;
  cost: 1500 | 2000 | 2500 | 3000;
  series: Schema.Types.ObjectId | string;
}

export const MobileSuitSchema: Schema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, enum: [1500, 2000, 2500, 3000], required: true },
  series: { type: Schema.Types.ObjectId, ref: "Series" },
});

interface MobileSuitModel extends Model<MobileSuit> {}

export default models.MobileSuit
  ? (models.MobileSuit as MobileSuitModel)
  : model<MobileSuit, MobileSuitModel>("MobileSuit", MobileSuitSchema);
