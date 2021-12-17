import { CommentID } from "./CommentVO";
import { ThreadID } from "./ThreadVO";
import { UserID } from "../UserVO";

export type Comment = {
  _id: CommentID;
  threadId: ThreadID;
  comment: string;
  commentAuthor: UserID;
  createdAt: string;
  updatedAt: string;
};
