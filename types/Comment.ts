import {
  CommentAuthorValue,
  CommentID,
  CommentValue,
} from "../ValueObject/CommentVO";
import { ThreadID } from "../ValueObject/ThreadVO";

export type Comment = {
  _id: CommentID;
  threadId: ThreadID;
  comment: CommentValue;
  commentAuthor: CommentAuthorValue;
  createdAt: string;
  updatedAt: string;
};
