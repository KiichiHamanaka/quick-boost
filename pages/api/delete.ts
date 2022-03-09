import axios from "axios";
import UserCreateDTO from "../../types/dto/UserCreateDTO";
import CommentCreateDTO from "../../types/dto/CommentCreateDTO";
import ThreadCreateDTO from "../../types/dto/ThreadCreateDTO";
import Thread from "../../db/models/Thread";

export const deleteUser = (user: UserCreateDTO) => {
  axios.post("/api/user", user).then((res) => {
    console.log("response body:", res.data);
  });
};

export const deleteThread = async (tid: string) => {
  axios.delete(`/api/thread/${tid}`).then((res) => {
    console.log("response body:", res.data);
  });
  return Promise;
};

export const createComment = (comment: CommentCreateDTO) => {
  axios.post("/api/comment", comment).then((res) => {
    console.log("response body:", res.data);
  });
};
