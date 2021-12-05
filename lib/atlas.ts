import mongoose from "mongoose";
const connectDB = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(process.env.MASTER_URL);
    console.log("connect is successful");
  } catch (err) {
    console.log("DB接続失敗してるわ");
    console.log(err);
  }
};

export default connectDB;
