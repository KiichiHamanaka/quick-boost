import axios from "axios";
import { Find } from "../models/Find";
import { User } from "../models/User";

export const createUser = (user: User) => {
  axios.post("/api/user", user).then((res) => {
    console.log("response body:", res.data);
  });
};

export const createFind = (find: Find) => {
  axios.put("/api/find", find).then((res) => {
    console.log("response body:", res.data);
  });
};
