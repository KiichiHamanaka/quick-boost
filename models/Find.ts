import {model, Schema} from "mongoose";
import User from "./User";
import MobileSuite from "./MobileSuite";
import Post from "./Post";

const FindSchema:Schema = new Schema({
    author: { type: User, required: true } ,
    body: {type:String,required:true},
    wantToUse: [{type:MobileSuite}],
    findTime: {type:Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    Posts:[Post]
})

const Find = model('User', FindSchema);

export default Find