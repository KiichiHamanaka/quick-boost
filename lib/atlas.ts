import mongoose from "mongoose";
import * as URI from "../config";
const connectDB = async () => {
  try {
    await mongoose.connect(URI.masterDB);
    console.log("connect is successful");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
