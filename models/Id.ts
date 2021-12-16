import { Schema } from "mongoose";

export const ThreadIdSchema: Schema = new Schema({
  value: Schema.Types.ObjectId,
  _meta: "ThreadId",
});

export const UserIdSchema: Schema = new Schema({
  value: Schema.Types.ObjectId,
  _meta: "UserID",
});

export const MSIdSchema: Schema = new Schema({
  value: Number,
  _meta: "MSID",
});
