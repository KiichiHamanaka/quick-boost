import axios from "axios";
import UserCreateDTO from "../../types/dto/UserCreateDTO";
import CommentCreateDTO from "../../types/dto/CommentCreateDTO";
import ThreadCreateDTO from "../../types/dto/ThreadCreateDTO";

export const createUser = (user: UserCreateDTO) => {
  axios.post("/api/user", user).then((res) => {
    console.log("response body:", res.data);
  });
};

export const createThread = (thread: ThreadCreateDTO) => {
  axios.post("/api/thread", thread).then((res) => {
    console.log("response body:", res.data);
  });
};

export const createComment = (comment: CommentCreateDTO) => {
  axios.post("/api/comment", comment).then((res) => {
    console.log("response body:", res.data);
  });
};
