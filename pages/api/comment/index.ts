import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "../../../db/models/Comment";
import connectDB from "../../../db/atlas";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        const threads = await Comment.find().populate("threadAuthor");
        res.status(200).json(threads);
        break;
      } catch (err) {
        console.error(err);
        break;
      }
    }
    case "POST": {
      try {
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
        console.log(res);
        break;
      } catch (e) {
        console.log(e);
        break;
      }
    }
    case "PUT": {
      try {
        console.log("put");
        console.log(res);
        const thread = await Comment.create(req.body);
        res.status(200).json(thread);
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
