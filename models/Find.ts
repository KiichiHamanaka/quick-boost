import { model, Schema } from "mongoose";
import { UserSchema } from "./User";
import { MobileSuiteSchema } from "./MobileSuite";
import { PostSchema } from "./Post";

export const FindSchema: Schema = new Schema({
  author: { type: UserSchema, required: true },
  message: { type: String, required: true },
  body: { type: String, required: true, max: 140 },
  enjoyType: { type: String, enum: ["ガチ", "エンジョイ"], required: true },
  isVC: { type: Boolean, required: true },
  isPlaying: { type: Boolean, required: true },
  allowUsers: [{ type: UserSchema, required: true }],
  wantToUse: [{ type: MobileSuiteSchema }],
  position: {
    type: String,
    enum: ["前衛", "後衛", "どちらでも"],
    required: true,
  },
  findTime: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  start_at: { type: Date, required: true },
  end_at: { type: Date, required: true },
  Posts: [{ type: PostSchema }],
});

const Find = model("User", FindSchema);

export default Find;
