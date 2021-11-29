import {model, Schema} from "mongoose";
import User from "./User";

const PostSchema:Schema = new Schema({
    Body: String!,
    author: { type:User, required: true } ,
})


const Post = model('User', PostSchema);

export default Post