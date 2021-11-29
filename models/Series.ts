import {model, Schema} from "mongoose";

const SeriesSchema :Schema = new Schema({
    name: String,
})

const Series = model('User', SeriesSchema);

export default Series