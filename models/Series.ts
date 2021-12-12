import { model, Schema, Document, Model, models } from "mongoose";

export interface Series extends Document {
  sortNum: number;
  name: string;
}

export const SeriesSchema: Schema = new Schema({
  sortNum: { type: Number, required: true },
  name: { type: String, required: true },
});

interface SeriesModel extends Model<Series> {}

export default models.Series
  ? (models.Series as SeriesModel)
  : model<Series, SeriesModel>("Series", SeriesSchema);
