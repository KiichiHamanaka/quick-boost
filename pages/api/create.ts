import axios from "axios";
import { Thread } from "../../types/thread/Thread";
import { User } from "../../types/User";

export const createUser = (user: User) => {
  axios.post("/api/user", user).then((res) => {
    console.log("response body:", res.data);
  });
};

export const createThread = (thread: Thread) => {
  axios.post("/api/thread", thread).then((res) => {
    console.log("response body:", res.data);
  });
};
