import { Schema } from "mongoose";
import { UserID } from "./UserVO";

export type CommentID = {
  value: Schema.Types.ObjectId;
  _meta: "CommentID";
};

export type CommentValue = {
  value: string;
  _meta: "CommentValue";
};

export type CommentAuthorValue = {
  value: UserID;
  _meta: "CommentAuthor";
};
