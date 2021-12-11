import { model, Schema, Document, Model, models } from "mongoose";

export interface Series extends Document {
  releaseDate: number; //ソート用ナンバーにした方がいいかも 並び順がリリース日じゃないかもしれん
  name: string;
}

export const SeriesSchema: Schema = new Schema({
  releaseDate: Number,
  name: String,
});

interface SeriesModel extends Model<Series> {}

export default models.Series
  ? (models.Series as SeriesModel)
  : model<Series, SeriesModel>("Series", SeriesSchema);
