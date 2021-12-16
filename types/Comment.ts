import { CommentID } from "../ValueObject/CommentVO";
import { ThreadID } from "../ValueObject/ThreadVO";
import { UserID } from "../ValueObject/UserVO";

export type Comment = {
  _id: CommentID;
  threadId: ThreadID;
  comment: string;
  commentAuthor: UserID;
  createdAt: string;
  updatedAt: string;
};
