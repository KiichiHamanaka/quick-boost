import type { NextApiRequest, NextApiResponse } from "next";
import Thread from "../../../db/models/Thread";
import connectDB from "../../../db/connectDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET": {
      try {
        const tid = id as string;
        const find = await Thread.findById(tid).populate("threadAuthor");
        console.log(find);
        res.status(200).json(find);
        break;
      } catch (e) {
        console.error(e);
        break;
      }
    }
    case "PUT": {
      try {
        const find = await Thread.create(req.body); //mongooseでcreateではなくupdateがあるか調べる
        res.status(201).json({ find });
        break;
      } catch (e) {
        break;
      }
    }
    case "DELETE": {
      try {
        const tid = id as string;
        const result = await Thread.findByIdAndDelete(tid);
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
