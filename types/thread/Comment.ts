import { ThreadID } from "./Thread";
import { UserID } from "../User";

export type Comment = {
  _id: CommentID;
  threadId: ThreadID;
  comment: string;
  commentAuthor: UserID;
  createdAt: string;
  updatedAt: string;
};

export type CommentID = {
  value: string;
  _meta: "CommentID";
};
