import axios from "axios";
import { User } from "../../db/models/User";
import { Thread } from "../../types/thread/Thread";

export const createUser = (user: User) => {
  axios.post("/api/user", user).then((res) => {
    console.log("response body:", res.data);
  });
};

export const createThread = (thread: Thread) => {
  axios.put("/api/thread", thread).then((res) => {
    console.log("response body:", res.data);
  });
};
