import { model, Schema, Document, Model, models } from "mongoose";

export interface Rank extends Document {
  name: string;
  power: number;
}

export const RankSchema: Schema = new Schema({
  name: String,
  power: Number,
});

interface RankModel extends Model<Rank> {}

export default models.Rank
  ? (models.Rank as RankModel)
  : model<Rank, RankModel>("Rank", RankSchema);
