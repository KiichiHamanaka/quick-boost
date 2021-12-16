import { Schema } from "mongoose";

export type CommentID = {
  value: Schema.Types.ObjectId;
  _meta: "CommentID";
};

//いる
export type Comment = {
  value: string;
  _meta: "Comment";
};

// export type CommentAuthor = {
//   value: UserID;
//   _meta: "CommentAuthor";
// };
