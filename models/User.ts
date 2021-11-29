import {Schema,model} from "mongoose";
import MobileSuite from "./MobileSuite";

const UserSchema :Schema = new Schema({
    Twitter: String,
    handleName: String,
    password: String, //bcryptで処理した結果を入れる
    grade:  Boolean,
    rank: { type: Date, default: Date.now },
    favoriteMS: [MobileSuite],
    profile: String,
    created_at: { type: Date, default: Date.now },
    good: Number
})

const User = model('User', UserSchema);

export default User