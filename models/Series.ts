import { model, Schema, Document, Model, models } from "mongoose";

export interface Series extends Document {
  name: string;
}

export const SeriesSchema: Schema = new Schema({
  name: String,
});

interface SeriesModel extends Model<Series> {}

export default models.Series
  ? (models.Series as SeriesModel)
  : model<Series, SeriesModel>("Series", SeriesSchema);
