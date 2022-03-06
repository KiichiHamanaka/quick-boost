import axios from "axios";
import { ThreadType } from "../../types/thread/ThreadType";
import UserCreateDTO from "../../types/dto/UserCreateDTO";
import CommentCreateDTO from "../../types/dto/CommentCreateDTO";

export const createUser = (user: UserCreateDTO) => {
  axios.post("/api/user", user).then((res) => {
    console.log("response body:", res.data);
  });
};

export const createThread = (thread: ThreadType) => {
  axios.post("/api/thread", thread).then((res) => {
    console.log("response body:", res.data);
  });
};

export const createComment = (comment: CommentCreateDTO) => {
  axios.post("/api/comment", comment).then((res) => {
    console.log("response body:", res.data);
  });
};
