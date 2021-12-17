import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("connect is successful");
  } catch (err) {
    console.log("DB接続失敗してるわ");
    console.log(err);
  }
};

export default connectDB;
