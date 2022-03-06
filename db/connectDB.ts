import mongoose from "mongoose";

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
      };
      cached.promise = mongoose
        .connect(process.env.DATABASE_URL!, opts)
        .then((mongoose) => mongoose);
      cached.conn = await cached.promise;
      require("./models/Thread");
      require("./models/User");
      require("./models/Comment");
      return cached.conn;
    }
  } catch (err) {
    console.log("DB接続失敗してるわ");
    console.log(err);
  }
};

export default connectDB;
