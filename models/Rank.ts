import { Schema, model } from "mongoose";

export const RankSchema: Schema = new Schema({
  power: Number,
  name: String,
});

const Rank = model("Rank", RankSchema);

export default Rank;
