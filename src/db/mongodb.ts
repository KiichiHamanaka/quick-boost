// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.DATABASE_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!);
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri!);
  clientPromise = client.connect();
}

export default clientPromise;
