import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "../../../db/models/Comment";
import connectDB from "../../../db/atlas";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET": {
      try {
        const tid = new mongoose.Types.ObjectId(id as string);
        console.log(tid);
        const find = await Comment.find({
          threadId: tid,
        });
        res.status(200).json(find);
        break;
      } catch (e) {
        console.error(e);
        break;
      }
    }
    case "PUT": {
      try {
        const find = await Comment.create(req.body); //mongooseでcreateではなくupdateがあるか調べる
        res.status(201).json({ find });
        break;
      } catch (e) {
        break;
      }
    }
    case "DELETE": {
      try {
        const { val1, val2 } = req.body;
        const result = val1 + val2;
        res.status(200).json({ result });
        break;
      } catch (e) {
        break;
      }
    }
    default: {
      res.status(403).end();
    }
  }
};

export default handler;
