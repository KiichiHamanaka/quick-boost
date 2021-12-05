import { model, Schema } from "mongoose";

export const SeriesSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Series = model("Series", SeriesSchema);

export default Series;
