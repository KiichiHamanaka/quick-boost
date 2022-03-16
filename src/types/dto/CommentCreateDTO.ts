import mongoose from "mongoose";

interface CommentCreateDTO {
  threadId: mongoose.Types.ObjectId;
  comment: string;
  commentAuthor: mongoose.Types.ObjectId;
}

export default CommentCreateDTO;
