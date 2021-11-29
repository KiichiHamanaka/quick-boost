import {model, Schema} from "mongoose";
import Series from "./Series";

const MobileSuiteSchema:Schema = new Schema({
    name: { String, required: true } ,
    cost : { type: Number, enum: [1500, 2000, 2500, 3000] ,required: true},
    series : { type: Series },
})

const MobileSuite = model('User', MobileSuiteSchema);

export default MobileSuite